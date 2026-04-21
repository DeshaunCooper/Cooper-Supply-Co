import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import type { CartItem } from "@/lib/types";

export async function POST(req: Request) {
  const { items } = (await req.json()) as { items: CartItem[] };

  if (!items?.length) {
    return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
  }

  const siteUrl = env.NEXT_PUBLIC_SITE_URL
    ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${siteUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/checkout/cancel`,
    line_items: items.map((item) => ({
      quantity: item.quantity,
      price_data: {
        currency: "usd",
        unit_amount: Math.round(item.price * 100),
        product_data: {
          name: item.name,
          metadata: {
            productId: item.productId,
            supplier: item.supplier,
            size: item.size,
            sku: item.sku,
          },
        },
      },
    })),
    shipping_address_collection: {
      allowed_countries: ["US"],
    },
    automatic_tax: { enabled: false },
  });

  return NextResponse.json({ url: session.url });
}
