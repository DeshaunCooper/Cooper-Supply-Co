"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useGsapHero(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-hero-overlay]", { opacity: 1 }, { opacity: 0, duration: 0.45 })
        .from("[data-headline]", { y: 28, opacity: 0, duration: 0.65 }, "<+0.05")
        .from("[data-mascot]", { x: 36, opacity: 0, duration: 0.65 }, "<-0.2")
        .from("[data-subhead]", { y: 18, opacity: 0, duration: 0.5 }, "<+0.12")
        .from("[data-cta]", { y: 10, opacity: 0, stagger: 0.07, duration: 0.38 }, "<+0.08");
    },
    { scope }
  );
}
