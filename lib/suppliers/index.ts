import type { CartItem, Supplier } from "@/lib/types";
import { createPrintfulOrder } from "./printful";
import { createPrintifyOrder } from "./printify";
import { createArtsaddOrder } from "./artsadd";

export async function routeSupplierOrders(
  grouped: Record<Supplier, CartItem[]>,
  shipping: Record<string, string>
) {
  const jobs: Promise<unknown>[] = [];

  if (grouped.Printful?.length) jobs.push(createPrintfulOrder(grouped.Printful, shipping));
  if (grouped.Printify?.length) jobs.push(createPrintifyOrder(grouped.Printify, shipping));
  if (grouped.Artsadd?.length) jobs.push(createArtsaddOrder(grouped.Artsadd, shipping));

  return Promise.all(jobs);
}
