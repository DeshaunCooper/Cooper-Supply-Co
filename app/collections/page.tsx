export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { SectionLabel } from "@/components/shared/section-label";

type CategoryCard = {
  name: string;
  slug: string;
  description: string;
};

const CATEGORIES: CategoryCard[] = [
  {
    name: "Headwear",
    slug: "headwear",
    description: "Structured caps, dad hats, and statement pieces. Heritage and everyday in the same lineup.",
  },
  {
    name: "Outerwear",
    slug: "outerwear",
    description: "Hoodies, jackets, varsity builds, and workwear. Made to move in.",
  },
  {
    name: "Bags",
    slug: "bags",
    description: "Totes, duffels, crossbody, and everyday carry. Built for movement.",
  },
  {
    name: "Accessories",
    slug: "accessories",
    description: "Premium woven blankets, throw pieces, and collectibles.",
  },
  {
    name: "Home",
    slug: "home",
    description: "Rugs, art prints, and home goods rooted in culture.",
  },
];

export default async function CollectionsPage() {
  const products = await getProducts();

  return (
    <main>
      <section className="bg-black px-5 pb-12 pt-28 text-white md:px-6 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel light>Collections</SectionLabel>
          <h1 className="font-display text-[clamp(3.5rem,12vw,8rem)] uppercase leading-[0.88]">
            Shop by<br />category.
          </h1>
        </div>
      </section>

      <section className="px-5 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {CATEGORIES.map((cat) => {
              const catProducts = products.filter(
                (p) => p.category.toLowerCase() === cat.name.toLowerCase()
              );
              const preview = catProducts[0];
              const isEmpty = catProducts.length === 0;

              return (
                <Link
                  key={cat.slug}
                  href={`/collections/${cat.slug}`}
                  className={`group relative overflow-hidden rounded-2xl border border-black/8 bg-white transition-shadow hover:shadow-md ${isEmpty ? "pointer-events-none opacity-60" : ""}`}
                  tabIndex={isEmpty ? -1 : undefined}
                  aria-disabled={isEmpty}
                >
                  <div className="relative h-56 overflow-hidden bg-[#F5F0E6]">
                    {preview?.images[0] ? (
                      <Image
                        src={preview.images[0]}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <span className="font-display text-4xl uppercase text-black/10">{cat.name}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {isEmpty && (
                      <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white/70">
                        Coming Soon
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-display text-2xl uppercase leading-none">{cat.name}</div>
                      {!isEmpty && (
                        <div className="shrink-0 rounded-full border border-black/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                          {catProducts.length} item{catProducts.length !== 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-black/50">{cat.description}</p>
                    {!isEmpty && (
                      <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                        Browse {cat.name} →
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
