import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionLabel } from "@/components/shared/section-label";
import { CollectionFilter } from "@/components/collection/collection-filter";
import type { Product } from "@/lib/types";

type CategoryMeta = {
  name: string;
  description: string;
};

const CATEGORY_META: Record<string, CategoryMeta> = {
  headwear: {
    name: "Headwear",
    description: "Structured caps, dad hats, and statement pieces.",
  },
  outerwear: {
    name: "Outerwear",
    description: "Hoodies, jackets, varsity builds, and workwear.",
  },
  bags: {
    name: "Bags",
    description: "Totes, duffels, crossbody, and everyday carry.",
  },
  accessories: {
    name: "Accessories",
    description: "Premium woven blankets and collectibles.",
  },
  home: {
    name: "Home",
    description: "Rugs, art prints, and home goods.",
  },
};

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_META).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const meta = CATEGORY_META[category.toLowerCase()];
  if (!meta) notFound();

  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === meta.name.toLowerCase()
  );

  // Derive unique subcategories in insertion order
  const subcategories = [...new Set(categoryProducts.map((p) => p.subcategory))];

  // Derive unique collections in this category
  const collections = [
    ...new Set(categoryProducts.map((p) => p.collection).filter(Boolean) as string[]),
  ];

  // Build subcategory sections for SSR render (full unfiltered view)
  const sections = subcategories.map((sub) => ({
    label: sub,
    items: categoryProducts.filter((p) => p.subcategory === sub),
  }));

  return (
    <main>
      <section className="bg-black px-5 pb-12 pt-28 text-white md:px-6 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/collections"
            className="mb-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35 transition-colors hover:text-white/60"
          >
            ← Collections
          </Link>
          <SectionLabel light>{meta.name}</SectionLabel>
          <h1 className="font-display text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.88]">
            {meta.name}
          </h1>
          <p className="mt-3 max-w-sm text-sm text-white/45">{meta.description}</p>
        </div>
      </section>

      <section className="px-5 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          {categoryProducts.length === 0 ? (
            <div className="rounded-2xl border border-black/8 bg-white p-12 text-center">
              <div className="font-display text-3xl uppercase text-black/20">Coming Soon</div>
              <p className="mt-2 text-sm text-black/40">
                New {meta.name.toLowerCase()} arriving. Check back soon.
              </p>
              <Link
                href="/collections"
                className="mt-6 inline-block text-[10px] font-bold uppercase tracking-[0.25em] text-black/40 underline-offset-2 hover:text-black"
              >
                ← Back to Collections
              </Link>
            </div>
          ) : (
            <CollectionFilter
              allProducts={categoryProducts}
              subcategories={subcategories}
              collections={collections}
              initialSections={sections}
            />
          )}
        </div>
      </section>
    </main>
  );
}
