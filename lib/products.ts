import type { Product } from "@/lib/types";
import { catalog } from "@/data/catalog";
import { fetchAllProducts, fetchProduct as pfyFetchProduct } from "@/lib/printify/client";
import { normalizePrintifyProduct } from "@/lib/printify/normalize";
import { products as staticProducts } from "@/data/products";

function hasPrintifyKey(): boolean {
  return !!process.env.PRINTIFY_API_KEY;
}

export async function getProducts(): Promise<Product[]> {
  if (!hasPrintifyKey()) return staticProducts;

  try {
    const pfyProducts = await fetchAllProducts();
    const merged = pfyProducts
      .map((pfy) => {
        const entry = catalog[pfy.id];
        if (!entry) return null;
        return normalizePrintifyProduct(pfy, entry);
      })
      .filter((p): p is Product => p !== null);
    return merged.length > 0 ? merged : staticProducts;
  } catch {
    return staticProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  if (!hasPrintifyKey()) {
    return staticProducts.find((p) => p.slug === slug);
  }

  // Find the catalog entry for this slug to get the Printify ID
  const entry = Object.values(catalog).find((e) => e.slug === slug);
  if (!entry) return undefined;

  // Find the Printify product ID from the catalog map
  const printifyId = Object.entries(catalog).find(([, e]) => e.slug === slug)?.[0];
  if (!printifyId) return undefined;

  const pfy = await pfyFetchProduct(printifyId);
  return normalizePrintifyProduct(pfy, entry);
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await getProducts();
  return products.find((p) => p.id === id);
}
