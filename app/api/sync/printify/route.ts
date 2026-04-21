import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { PRINTIFY_CACHE_TAG } from "@/lib/printify/client";

export async function POST(req: Request) {
  const secret = process.env.PRINTIFY_WEBHOOK_SECRET;
  if (secret) {
    const { searchParams } = new URL(req.url);
    if (searchParams.get("secret") !== secret) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  revalidateTag(PRINTIFY_CACHE_TAG, "default");
  return NextResponse.json({ revalidated: true, tag: PRINTIFY_CACHE_TAG });
}
