import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { PRINTIFY_CACHE_TAG } from "@/lib/printify/client";

// Events that should bust the product cache
const REVALIDATE_EVENTS = new Set([
  "product:publish:succeeded",
  "product:publish:failed",
  "product:delete",
  "product:updated",
]);

export async function POST(req: Request) {
  const secret = process.env.PRINTIFY_WEBHOOK_SECRET;
  if (secret) {
    const { searchParams } = new URL(req.url);
    if (searchParams.get("secret") !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  let body: { type?: string } = {};
  try {
    body = await req.json();
  } catch {
    // malformed body — still revalidate to be safe
  }

  if (!body.type || REVALIDATE_EVENTS.has(body.type)) {
    revalidateTag(PRINTIFY_CACHE_TAG, "default");
  }

  return NextResponse.json({ received: true });
}
