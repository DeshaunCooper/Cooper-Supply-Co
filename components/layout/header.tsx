"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/drops", label: "Drops" },
  { href: "/collections", label: "Collections" },
  { href: "/custom", label: "Custom" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { count, setOpen, hydrated } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/80 px-5 py-2.5 text-white shadow-xl backdrop-blur-xl">
        <Link href="/" className="font-display text-xl uppercase tracking-[0.03em] leading-none">
          Cooper Supply Co.
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {NAV.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen(true)}
          className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/15"
        >
          Cart ({hydrated ? count : 0})
        </button>
      </div>
    </header>
  );
}
