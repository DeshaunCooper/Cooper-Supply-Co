import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { routeSupplierOrders } from "@/lib/suppliers";
import type { CartItem, Supplier } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature");

  if (!signature) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { expand: ["data.price.product"] });

    const cartItems: CartItem[] = lineItems.data.map((line) => {
      const product = line.price?.product as { metadata?: Record<string, string>; name?: string };
      const meta = product.metadata || {};
      return {
        productId: meta.productId || "unknown",
        slug: "",
        name: product.name || line.description || "Cooper item",
        size: meta.size || "One Size",
        quantity: line.quantity || 1,
        price: (line.amount_total || 0) / 100 / (line.quantity || 1),
        supplier: (meta.supplier as Supplier) || "Printful",
        sku: meta.sku || "",
        image: "",
      };
    });

    const grouped = {
      Printful: cartItems.filter((x) => x.supplier === "Printful"),
      Printify: cartItems.filter((x) => x.supplier === "Printify"),
      Artsadd: cartItems.filter((x) => x.supplier === "Artsadd"),
    } as Record<Supplier, CartItem[]>;

    const shipping = {
      name: session.customer_details?.name || "",
      email: session.customer_details?.email || "",
      address1: session.customer_details?.address?.line1 || "",
      city: session.customer_details?.address?.city || "",
      state_code: session.customer_details?.address?.state || "",
      country_code: session.customer_details?.address?.country || "US",
      zip: session.customer_details?.address?.postal_code || "",
    };

    await routeSupplierOrders(grouped, shipping);
  }

  return NextResponse.json({ received: true });
}
