export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { getProducts } from "@/lib/products";
import { SectionLabel } from "@/components/shared/section-label";
import { ProductGrid } from "@/components/product/product-grid";

type BrandMeta = {
  name: string;
  collection: string;
  tagline: string;
  description: string;
  accentBg: string;
};

const BRANDS: Record<string, BrandMeta> = {
  "collegiate-hbcu": {
    name: "Collegiate HBCU",
    collection: "Collegiate HBCU",
    tagline: "Represent the legacy.",
    description: "HBCU-inspired collegiate pieces celebrating Black excellence, culture, and heritage. Wearable pride.",
    accentBg: "bg-[#1a2b4a]",
  },
  "child-of-god": {
    name: "Child of God",
    collection: "Child of God",
    tagline: "Rooted in faith. Built for the streets.",
    description: "Faith-forward apparel and accessories. Original IP designed for those who move with purpose.",
    accentBg: "bg-[#2C4A2E]",
  },
};

type Props = { params: Promise<{ brand: string }> };

export default async function BrandPage({ params }: Props) {
  const { brand } = await params;
  const meta = BRANDS[brand];
  if (!meta) notFound();

  const allProducts = await getProducts();
  const brandProducts = allProducts.filter(
    (p) => p.collection?.toLowerCase() === meta.collection.toLowerCase()
  );

  const subcategories = [...new Set(brandProducts.map((p) => p.subcategory))];
  const categories = [...new Set(brandProducts.map((p) => p.category))];

  return (
    <main>
      <section className={`${meta.accentBg} px-5 pb-12 pt-28 text-white md:px-6 md:pt-32`}>
        <div className="mx-auto max-w-6xl">
          <Link
            href="/brands"
            className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35 transition-colors hover:text-white/60"
          >
            ← Brands
          </Link>
          <SectionLabel light>{meta.name}</SectionLabel>
          <h1 className="font-display text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.88]">
            {meta.name}
          </h1>
          <p className="mt-3 max-w-md text-sm text-white/55">{meta.tagline}</p>
          <p className="mt-2 max-w-sm text-xs text-white/35">{meta.description}</p>
        </div>
      </section>

      <section className="px-5 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          {brandProducts.length === 0 ? (
            <div className="rounded-2xl border border-black/8 bg-white p-16 text-center">
              <div className="font-display text-4xl uppercase text-black/15">Dropping Soon</div>
              <p className="mt-3 text-sm text-black/35">
                The {meta.name} collection is being built. Check back soon.
              </p>
              <Link
                href="/brands"
                className="mt-6 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 underline-offset-2 hover:text-black"
              >
                ← Back to Brands
              </Link>
            </div>
          ) : (
            <ProductGrid products={brandProducts} />
          )}
        </div>
      </section>
    </main>
  );
}
