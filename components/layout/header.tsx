"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/cart/cart-provider";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/drops", label: "Drops" },
  { href: "/collections", label: "Collections" },
  { href: "/brands/collegiate-hbcu", label: "Collegiate HBCU" },
  { href: "/brands/child-of-god", label: "Child of God" },
  { href: "/give", label: "Give" },
  { href: "/custom", label: "Custom" },
  { href: "/about", label: "About" },
];

export function Header() {
  const { count, setOpen, hydrated } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-4 py-3 md:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/80 px-5 py-2.5 text-white shadow-xl backdrop-blur-xl">
          <Link href="/" className="font-display text-xl uppercase tracking-[0.03em] leading-none">
            Cooper Supply Co.
          </Link>

          <nav className="hidden items-center gap-4 md:flex lg:gap-6">
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

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/15"
            >
              Cart ({hydrated ? count : 0})
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white transition-colors hover:bg-white/15 md:hidden"
              aria-label="Open menu"
            >
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none" aria-hidden="true">
                <rect width="15" height="1.5" rx="0.75" fill="currentColor" />
                <rect y="4.75" width="15" height="1.5" rx="0.75" fill="currentColor" />
                <rect y="9.5" width="15" height="1.5" rx="0.75" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div className="animate-menu-in fixed inset-0 z-[100] flex flex-col bg-black px-6 pb-8 pt-6">
          {/* Top row */}
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="font-display text-xl uppercase tracking-[0.03em] leading-none text-white"
            >
              Cooper Supply Co.
            </Link>
            <button
              onClick={() => setMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/8 text-white"
              aria-label="Close menu"
            >
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="mt-8 flex flex-col divide-y divide-white/8">
            {NAV.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="py-5 font-display text-[2.5rem] uppercase leading-none text-white"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Cart at bottom */}
          <div className="mt-auto pt-8">
            <button
              onClick={() => { setMenuOpen(false); setOpen(true); }}
              className="w-full rounded-full border border-white/15 bg-white/8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-colors active:bg-white/15"
            >
              Cart ({hydrated ? count : 0})
            </button>
          </div>
        </div>
      )}
    </>
  );
}
