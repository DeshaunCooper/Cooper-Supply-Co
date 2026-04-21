import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto]">
          <div>
            <div className="font-display text-3xl uppercase leading-none">Cooper Supply Co.</div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/45">
              Built by Black creatives with nerd-like tendencies. No restrictions. No boundaries.
            </p>
          </div>
          <div className="space-y-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">Shop</div>
            <nav className="flex flex-col gap-2.5 text-sm text-white/60">
              <Link href="/shop" className="transition-colors hover:text-white">All Products</Link>
              <Link href="/collections" className="transition-colors hover:text-white">Collections</Link>
              <Link href="/drops" className="transition-colors hover:text-white">Drops</Link>
            </nav>
          </div>
          <div className="space-y-3">
            <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">Brand</div>
            <nav className="flex flex-col gap-2.5 text-sm text-white/60">
              <Link href="/about" className="transition-colors hover:text-white">About</Link>
              <Link href="/custom" className="transition-colors hover:text-white">Custom Work</Link>
            </nav>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-1.5 border-t border-white/8 pt-6 text-[10px] uppercase tracking-[0.22em] text-white/30 md:flex-row md:justify-between">
          <span>© 2025 Cooper Supply Company</span>
          <span>Built for movement.</span>
        </div>
      </div>
    </footer>
  );
}
