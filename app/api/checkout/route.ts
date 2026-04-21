import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import type { CartItem } from "@/lib/types";

type CheckoutBody = {
  items: CartItem[];
  couponCode?: string;
};

function siteUrl(): string {
  return (
    env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000")
  );
}

export async function POST(req: Request) {
  try {
    const { items, couponCode } = (await req.json()) as CheckoutBody;

    if (!items?.length) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const stripe = getStripe();
    const base = siteUrl();

    // Resolve discount config.
    // If a coupon code is provided, look it up server-side and apply it directly.
    // Otherwise, let Stripe show its native promo-code field in checkout.
    type DiscountConfig =
      | { allow_promotion_codes: true }
      | { discounts: Array<{ promotion_code: string }> };

    let discountConfig: DiscountConfig = { allow_promotion_codes: true };

    if (couponCode?.trim()) {
      const code = couponCode.trim().toUpperCase();
      const promoCodes = await stripe.promotionCodes.list({
        code,
        active: true,
        limit: 1,
      });

      if (!promoCodes.data.length) {
        return NextResponse.json(
          { error: `Promo code "${couponCode}" is not valid or has expired.` },
          { status: 400 }
        );
      }

      discountConfig = { discounts: [{ promotion_code: promoCodes.data[0].id }] };
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      ...discountConfig,

      line_items: items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(item.price * 100),
          product_data: {
            name: item.name,
            ...(item.image ? { images: [item.image] } : {}),
            metadata: {
              productId: item.productId,
              supplier:  item.supplier,
              size:      item.size,
              sku:       item.sku,
            },
          },
        },
      })),

      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      phone_number_collection: { enabled: true },
      automatic_tax: { enabled: false },

      success_url: `${base}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:  `${base}/checkout/cancel`,

      metadata: {
        itemCount: String(items.length),
        totalQty:  String(items.reduce((n, i) => n + i.quantity, 0)),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Checkout failed. Please try again.";
    console.error("[checkout]", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
