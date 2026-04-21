import { env } from "@/lib/env";
import type { CartItem } from "@/lib/types";

const PRINTIFY_BASE = "https://api.printify.com/v1";

export async function createPrintifyOrder(items: CartItem[], shipping: Record<string, string>) {
  if (!env.PRINTIFY_API_KEY || !env.PRINTIFY_SHOP_ID) {
    return { provider: "Printify", mode: "not-configured", items, shipping };
  }

  const payload = {
    external_id: `cooper-${Date.now()}`,
    line_items: items.map((item) => ({
      product_id: item.externalProductId,
      variant_id: item.variantId,
      quantity: item.quantity,
    })),
    shipping_method: 1,
    send_shipping_notification: true,
    address_to: shipping,
  };

  const res = await fetch(`${PRINTIFY_BASE}/shops/${env.PRINTIFY_SHOP_ID}/orders.json`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.PRINTIFY_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Printify order creation failed");
  return res.json();
}
