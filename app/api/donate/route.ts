import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function POST(req: Request) {
  const { amount } = await req.json() as { amount: number };

  if (!amount || amount < 100) {
    return NextResponse.json({ error: "Minimum donation is $1" }, { status: 400 });
  }

  const stripe = getStripe();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: {
            name: "Black Creatives Club — Fund a Vision",
            description: "Supporting Black creatives in building brands, projects, and legacies.",
            images: [],
          },
        },
        quantity: 1,
      },
    ],
    success_url: `${SITE_URL}/give/thank-you`,
    cancel_url: `${SITE_URL}/give`,
    metadata: { type: "donation" },
  });

  return NextResponse.json({ url: session.url });
}
