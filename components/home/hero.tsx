"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { MascotInline } from "@/components/mascot/mascot-inline";
import { useGsapHero } from "@/hooks/use-gsap-hero";

const ProductWheel = dynamic(
  () => import("@/components/home/product-wheel").then((m) => m.ProductWheel),
  { ssr: false }
);

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  useGsapHero(ref);

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-black px-4 pb-20 pt-32 text-white md:px-8">
      <div data-hero-overlay className="absolute inset-0 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(166,124,82,0.28),transparent_24%),radial-gradient(circle_at_75%_30%,rgba(178,58,58,0.22),transparent_24%),linear-gradient(180deg,#000,#0b0b0b_60%,#111)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/70">
            Drop 01 — The Cooper Classics
          </div>
          <h1 data-headline className="max-w-3xl text-6xl font-black uppercase leading-[0.9] tracking-[0.02em] sm:text-7xl lg:text-[6.6rem]">
            Cooper Supply Company — Drop 01
          </h1>
          <p data-subhead className="mt-6 max-w-xl text-base text-white/72 md:text-lg">
            Streetwear built for movement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link data-cta href="/shop" className="rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-black">
              Shop Drop
            </Link>
            <Link data-cta href="/lookbook" className="rounded-full border border-white/18 bg-white/6 px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white">
              View Lookbook
            </Link>
          </div>
          <div data-mascot className="mt-10">
            <MascotInline />
          </div>
        </div>
        <div data-wheel>
          <ProductWheel />
        </div>
      </div>
    </section>
  );
}
