export const dynamic = "force-dynamic";

import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/lib/products";
import { SectionLabel } from "@/components/shared/section-label";

const BRANDS = [
  {
    slug: "collegiate-hbcu",
    name: "Collegiate HBCU",
    collection: "Collegiate HBCU",
    tagline: "Represent the legacy.",
    description: "HBCU-inspired collegiate pieces celebrating Black excellence, culture, and heritage.",
    accentBg: "bg-[#1a2b4a]",
    accentText: "text-[#4a7cc7]",
  },
  {
    slug: "child-of-god",
    name: "Child of God",
    collection: "Child of God",
    tagline: "Rooted in faith. Built for the streets.",
    description: "Faith-forward apparel and accessories — original IP for those who move with purpose.",
    accentBg: "bg-[#2C4A2E]",
    accentText: "text-[#7ab87c]",
  },
];

export default async function BrandsPage() {
  const allProducts = await getProducts();

  return (
    <main>
      <section className="bg-black px-5 pb-12 pt-28 text-white md:px-6 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel light>Original IP</SectionLabel>
          <h1 className="font-display text-[clamp(3.5rem,12vw,8rem)] uppercase leading-[0.88]">
            The Brands
          </h1>
          <p className="mt-4 max-w-sm text-sm text-white/40">
            Cooper Supply Co. originals. Each brand is its own world — shop the full lineup.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 md:px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2">
            {BRANDS.map((brand) => {
              const brandProducts = allProducts.filter(
                (p) => p.collection?.toLowerCase() === brand.collection.toLowerCase()
              );
              const preview = brandProducts[0];
              const isEmpty = brandProducts.length === 0;

              return (
                <Link
                  key={brand.slug}
                  href={`/brands/${brand.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white transition-shadow hover:shadow-lg"
                >
                  {/* Header band */}
                  <div className={`${brand.accentBg} relative flex h-52 items-end overflow-hidden p-6`}>
                    {preview?.images[0] && (
                      <Image
                        src={preview.images[0]}
                        alt={brand.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover opacity-20 transition duration-500 group-hover:opacity-30 group-hover:scale-105"
                      />
                    )}
                    <div className="relative z-10">
                      <div className="font-display text-[clamp(2rem,5vw,3rem)] uppercase leading-none text-white">
                        {brand.name}
                      </div>
                      <p className="mt-1 text-xs text-white/50">{brand.tagline}</p>
                    </div>
                    {isEmpty && (
                      <div className="absolute right-4 top-4 rounded-full bg-black/50 px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white/60">
                        Dropping Soon
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-5">
                    <p className="text-sm leading-relaxed text-black/50">{brand.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                        {isEmpty ? "Coming Soon" : `Shop ${brand.name} →`}
                      </div>
                      {!isEmpty && (
                        <div className="rounded-full border border-black/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/40">
                          {brandProducts.length} item{brandProducts.length !== 1 ? "s" : ""}
                        </div>
                      )}
                    </div>
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
