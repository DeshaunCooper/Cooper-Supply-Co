import { env } from "@/lib/env";
import type { CartItem } from "@/lib/types";

const PRINTFUL_BASE = "https://api.printful.com";

export async function createPrintfulOrder(items: CartItem[], shipping: Record<string, string>) {
  if (!env.PRINTFUL_API_KEY) {
    return { provider: "Printful", mode: "not-configured", items, shipping };
  }

  const payload = {
    recipient: shipping,
    items: items.map((item) => ({
      variant_id: item.sku,
      quantity: item.quantity,
      retail_price: String(item.price),
      name: item.name,
    })),
    confirm: false,
  };

  const res = await fetch(`${PRINTFUL_BASE}/orders`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.PRINTFUL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Printful order creation failed");
  return res.json();
}
