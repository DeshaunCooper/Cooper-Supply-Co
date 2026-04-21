import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { SectionLabel } from "@/components/shared/section-label";
import Image from "next/image";

export function EssentialsSection() {
  return (
    <section className="px-4 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Essentials Grid</SectionLabel>
        <h2 className="text-4xl font-black uppercase leading-none md:text-6xl">The Cooper Classics</h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.filter((p) => p.featured).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function MascotStorySection() {
  return (
    <section className="bg-black px-4 py-24 text-white md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div>
          <SectionLabel light>Mascot Story</SectionLabel>
          <h2 className="text-4xl font-black uppercase leading-none md:text-6xl">Vintage charm. Modern pressure.</h2>
          <p className="mt-5 max-w-lg text-white/72">The mascot works like a box logo with a pulse. Rubber-hose energy, streetwear authority, and quiet motion cues keep it alive without getting corny.</p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,#1a1a1a,#0d0d0d)] p-8 shadow-2xl">
          <div className="flex items-center gap-8">
            <div className="rounded-[2rem] border border-white/10 bg-black p-4">
              <Image src="/images/mascot/mascot-idle.png" alt="Cooper Supply mascot" width={200} height={200} className="rounded-[1.5rem]" />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/45">Brand Character System</div>
              <div className="mt-3 text-2xl font-black uppercase leading-tight">The mascot is the memory device.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  return (
    <section className="px-4 py-24 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2rem] border border-black/10 bg-white p-8 shadow-[0_12px_50px_rgba(0,0,0,0.06)] md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div>
          <SectionLabel>Newsletter</SectionLabel>
          <h2 className="text-4xl font-black uppercase leading-none md:text-6xl">Get the drop signal.</h2>
          <p className="mt-3 max-w-xl text-black/65">Early access, limited releases, mascot mail, and clean brand updates.</p>
        </div>
        <div className="flex w-full max-w-xl flex-col gap-3 sm:flex-row">
          <input className="flex-1 rounded-full border border-black/10 bg-[#F5F0E6] px-5 py-4 text-sm outline-none" placeholder="Email address" />
          <button className="rounded-full bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white">Join</button>
        </div>
      </div>
    </section>
  );
}
