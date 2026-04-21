import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionLabel } from "@/components/shared/section-label";
import type { Product } from "@/lib/types";

type SubcategoryGroup = {
  label: string;
  tags: string[];
};

type CategoryConfig = {
  name: string;
  description: string;
  subcategories: SubcategoryGroup[];
};

const CATEGORY_CONFIG: Record<string, CategoryConfig> = {
  headwear: {
    name: "Headwear",
    description: "Structured caps, dad hats, and statement pieces.",
    subcategories: [
      { label: "Everyday Essentials", tags: ["Signature Hat", "Everyday Hat", "Daily Rotation"] },
      { label: "Statement Pieces", tags: ["Statement Hat"] },
      { label: "Heritage Series", tags: ["Heritage Series"] },
    ],
  },
  outerwear: {
    name: "Outerwear",
    description: "Jackets and hoodies built for movement.",
    subcategories: [
      { label: "Hoodies", tags: ["Daily Layer"] },
      { label: "Jackets & Workwear", tags: ["Heavy Duty", "Utility"] },
      { label: "Varsity", tags: ["Heritage Series"] },
    ],
  },
  accessories: {
    name: "Accessories",
    description: "Premium graphic goods and collectibles.",
    subcategories: [
      { label: "Home Goods", tags: ["Home Goods"] },
    ],
  },
};

type Props = {
  params: Promise<{ category: string }>;
};

export function generateStaticParams() {
  return Object.keys(CATEGORY_CONFIG).map((category) => ({ category }));
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const config = CATEGORY_CONFIG[category.toLowerCase()];
  if (!config) notFound();

  const categoryProducts = products.filter(
    (p) => p.category.toLowerCase() === config.name.toLowerCase()
  );

  // Build subcategory sections; collect matched product IDs to catch any leftovers
  const matched = new Set<string>();

  const sections: { label: string; items: Product[] }[] = config.subcategories
    .map(({ label, tags }) => {
      const items = categoryProducts.filter((p) => tags.includes(p.tag));
      items.forEach((p) => matched.add(p.id));
      return { label, items };
    })
    .filter((s) => s.items.length > 0);

  // Any products not matched by a subcategory go into "Other"
  const unmatched = categoryProducts.filter((p) => !matched.has(p.id));
  if (unmatched.length > 0) sections.push({ label: "Other", items: unmatched });

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
          <SectionLabel light>{config.name}</SectionLabel>
          <h1 className="font-display text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.88]">
            {config.name}
          </h1>
          <p className="mt-3 text-sm text-white/45">{config.description}</p>
        </div>
      </section>

      <section className="px-5 py-12 md:px-6">
        <div className="mx-auto max-w-6xl space-y-16">
          {sections.map(({ label, items }) => (
            <div key={label}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="font-display text-2xl uppercase leading-none">{label}</h2>
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/30">
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
