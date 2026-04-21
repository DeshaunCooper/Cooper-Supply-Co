"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function useGsapHero(scope: React.RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo("[data-hero-overlay]", { opacity: 1 }, { opacity: 0, duration: 0.6 })
        .from("[data-mascot]", { x: -120, opacity: 0, duration: 0.9 }, "<")
        .from("[data-wheel]", { opacity: 0, scale: 0.94, duration: 0.8 }, "<+0.1")
        .from("[data-headline]", { y: 40, opacity: 0, duration: 0.7 }, "<+0.05")
        .from("[data-subhead]", { y: 20, opacity: 0, duration: 0.55 }, "<+0.1")
        .from("[data-cta]", { y: 14, opacity: 0, stagger: 0.08, duration: 0.45 }, "<+0.05");
    },
    { scope }
  );
}
