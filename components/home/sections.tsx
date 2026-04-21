import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionLabel } from "@/components/shared/section-label";

export function EssentialsSection() {
  const featured = products.filter((p) => p.featured);
  return (
    <section className="px-5 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <div>
            <SectionLabel>Essentials Grid</SectionLabel>
            <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] uppercase leading-none">
              The Cooper Classics
            </h2>
          </div>
          <Link
            href="/shop"
            className="hidden text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45 transition-colors hover:text-black md:block"
          >
            View All →
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MascotStorySection() {
  return (
    <section className="bg-black px-5 py-16 text-white md:px-6">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionLabel light>Brand System</SectionLabel>
          <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] uppercase leading-none">
            Vintage charm.<br />Modern pressure.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
            The mascot is a box logo with a pulse. Rubber-hose energy, streetwear authority, and quiet motion cues — alive without getting corny.
          </p>
        </div>
        <div className="rounded-2xl border border-white/8 bg-[#0d0d0d] p-6">
          <div className="flex items-center gap-5">
            <div className="shrink-0 overflow-hidden rounded-xl border border-white/8 bg-black">
              <Image
                src="/images/mascot/mascot-idle.png"
                alt="Cooper Supply mascot"
                width={100}
                height={100}
                className="rounded-xl"
              />
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/30">
                Brand Character System
              </div>
              <div className="mt-2 font-display text-2xl uppercase leading-tight">
                The mascot is the memory device.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="px-5 py-16 md:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-black/8 bg-white p-7 md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <SectionLabel>Newsletter</SectionLabel>
              <h2 className="font-display text-[clamp(2rem,5vw,3rem)] uppercase leading-none">
                Get the drop signal.
              </h2>
              <p className="mt-2 max-w-sm text-sm text-black/45">
                Early access, limited releases, and clean brand updates.
              </p>
            </div>
            <div className="flex w-full max-w-sm flex-col gap-2.5 sm:flex-row">
              <input
                className="flex-1 rounded-full border border-black/10 bg-[#F5F0E6] px-5 py-2.5 text-sm outline-none placeholder:text-black/30"
                placeholder="Email address"
              />
              <button className="rounded-full bg-black px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
