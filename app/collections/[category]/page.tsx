import { notFound } from "next/navigation";
import Link from "next/link";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionLabel } from "@/components/shared/section-label";

const CATEGORY_META: Record<string, { name: string; description: string }> = {
  headwear: {
    name: "Headwear",
    description: "Structured caps, dad hats, and statement pieces.",
  },
  outerwear: {
    name: "Outerwear",
    description: "Jackets and hoodies built for movement.",
  },
  accessories: {
    name: "Accessories",
    description: "Premium graphic goods and collectibles.",
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

  const filtered = products.filter(
    (p) => p.category.toLowerCase() === meta.name.toLowerCase()
  );

  return (
    <main>
      <section className="bg-black px-5 pb-12 pt-28 text-white md:px-6 md:pt-32">
        <div className="mx-auto max-w-4xl">
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
          <p className="mt-3 text-sm text-white/45">{meta.description}</p>
        </div>
      </section>

      <section className="px-5 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-black/35">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
