"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

export function Header() {
  const { count, setOpen, hydrated } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/10 bg-black/78 px-5 py-3 text-white shadow-2xl backdrop-blur-xl">
        <Link href="/" className="text-lg font-black uppercase tracking-[0.05em]">Cooper Supply Co.</Link>
        <nav className="hidden items-center gap-6 text-xs font-semibold uppercase tracking-[0.22em] md:flex">
          <Link href="/shop">Shop</Link>
          <Link href="/drops">Drops</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/lookbook">Lookbook</Link>
          <Link href="/about">About</Link>
        </nav>
        <button onClick={() => setOpen(true)} className="rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
          Cart ({hydrated ? count : 0})
        </button>
      </div>
    </header>
  );
}
