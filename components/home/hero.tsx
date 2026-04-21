"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useGsapHero } from "@/hooks/use-gsap-hero";

const TICKER = "COOPER SUPPLY CO. — DROP 01 — BUILT FOR MOVEMENT — NO RESTRICTIONS — NO BOUNDARIES — BY BLACK CREATIVES — ";

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  useGsapHero(ref);

  return (
    <section ref={ref} className="relative overflow-hidden bg-black text-white">
      <div data-hero-overlay className="absolute inset-0 z-10 bg-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,rgba(166,124,82,0.13),transparent),radial-gradient(ellipse_40%_40%_at_15%_70%,rgba(178,58,58,0.08),transparent)]" />

      <div className="relative z-0 mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-6 px-5 pb-16 pt-28 md:grid-cols-[1fr_1fr] md:gap-8 md:pt-32 lg:pt-36">
        {/* Text col */}
        <div className="order-2 md:order-1">
          <div
            data-cta
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#A67C52]" />
            Drop 01 — The Cooper Classics
          </div>

          <h1
            data-headline
            className="font-display text-[clamp(4rem,11vw,7.5rem)] uppercase leading-[0.88] tracking-[0.01em]"
          >
            Cooper<br />Supply<br />Co.
          </h1>

          <p data-subhead className="mt-5 max-w-xs text-sm leading-relaxed text-white/55 md:text-[15px]">
            Built by Black creatives with nerd-like tendencies.<br />
            No restrictions. No boundaries.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              data-cta
              href="/shop"
              className="rounded-full bg-[#F5F0E6] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-85"
            >
              Shop Drop
            </Link>
            <Link
              data-cta
              href="/custom"
              className="rounded-full border border-white/20 px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/8"
            >
              Custom Work
            </Link>
          </div>
        </div>

        {/* Mascot col */}
        <div data-mascot className="order-1 flex justify-center md:order-2 md:justify-end">
          <Image
            src="/images/mascot/mascot-idle.png"
            alt="Cooper Supply mascot"
            width={320}
            height={320}
            priority
            sizes="(max-width: 768px) 240px, 320px"
            className="rounded-[2rem] object-cover"
          />
        </div>
      </div>

      {/* Marquee ticker */}
      <div className="relative z-0 overflow-hidden border-t border-white/8 py-3">
        <div className="flex animate-marquee whitespace-nowrap">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="shrink-0 font-display text-[13px] uppercase tracking-[0.18em] text-white/30"
            >
              {TICKER.repeat(5)}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
