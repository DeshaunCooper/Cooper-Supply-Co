import { env } from "@/lib/env";
import type { CartItem } from "@/lib/types";

export async function createArtsaddOrder(items: CartItem[], shipping: Record<string, string>) {
  return {
    provider: "Artsadd",
    mode: env.ARTSADD_API_KEY ? "custom-api-placeholder" : "manual-or-csv",
    items,
    shipping,
  };
}
