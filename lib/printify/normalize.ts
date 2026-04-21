import type { PrintifyProduct, PrintifyVariant } from "./types";
import type { CatalogEntry } from "@/data/catalog";
import type { Product } from "@/lib/types";

function stripHtml(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function getEnabledVariants(variants: PrintifyVariant[]) {
  return variants.filter((v) => v.is_enabled);
}

function getBasePrice(variants: PrintifyVariant[]): number {
  const enabled = getEnabledVariants(variants);
  if (!enabled.length) return 0;
  return Math.min(...enabled.map((v) => v.price)) / 100;
}

function getImages(pfy: PrintifyProduct): string[] {
  const sorted = [...pfy.images].sort((a, b) => {
    if (a.is_default && !b.is_default) return -1;
    if (!a.is_default && b.is_default) return 1;
    const order = ["front", "right", "back", "left"];
    return (order.indexOf(a.position) ?? 99) - (order.indexOf(b.position) ?? 99);
  });

  const seen = new Set<string>();
  return sorted
    .filter((img) => {
      if (seen.has(img.src)) return false;
      seen.add(img.src);
      return true;
    })
    .slice(0, 8)
    .map((img) => img.src);
}

function getSizes(variants: PrintifyVariant[]): string[] {
  return [...new Set(getEnabledVariants(variants).map((v) => v.title))];
}

function getVariantIdMap(variants: PrintifyVariant[]): Record<string, number> {
  const map: Record<string, number> = {};
  getEnabledVariants(variants).forEach((v) => {
    map[v.title] = v.id;
  });
  return map;
}

export function normalizePrintifyProduct(
  pfy: PrintifyProduct,
  entry: CatalogEntry
): Product {
  return {
    id:               entry.id,
    slug:             entry.slug,
    name:             pfy.title,
    shortName:        entry.shortName,
    description:      stripHtml(pfy.description),
    price:            getBasePrice(pfy.variants),
    sku:              entry.sku,
    supplier:         "Printify",
    category:         entry.category,
    subcategory:      entry.subcategory,
    collection:       entry.collection,
    drop:             entry.drop,
    tags:             entry.tags,
    tag:              entry.tag,
    badge:            entry.badge,
    color:            entry.color,
    accent:           entry.accent,
    images:           getImages(pfy),
    sizes:            getSizes(pfy.variants),
    materials:        entry.materials ?? [],
    available:        pfy.visible,
    featured:         entry.featured,
    wheel:            entry.wheel,
    externalProductId:   pfy.id,
    externalVariantIds:  getVariantIdMap(pfy.variants),
  };
}
