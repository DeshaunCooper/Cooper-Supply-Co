"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/cart-provider";
import { money } from "@/lib/money";
import { SectionLabel } from "@/components/shared/section-label";

export default function CheckoutPage() {
  const { items, subtotal, count } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    if (!items.length) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          couponCode: couponCode.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      if (data.url) window.location.href = data.url;
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!items.length) {
    return (
      <main className="flex min-h-screen items-center justify-center px-5 py-32">
        <div className="text-center">
          <SectionLabel>Checkout</SectionLabel>
          <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.9]">
            Your cart<br />is empty.
          </h1>
          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-black px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-75"
          >
            Shop the Drop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main>
      <section className="bg-black px-5 pb-10 pt-28 text-white md:px-6 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <SectionLabel light>Checkout</SectionLabel>
          <h1 className="font-display text-[clamp(3rem,10vw,6rem)] uppercase leading-[0.88]">
            Order<br />Review
          </h1>
        </div>
      </section>

      <section className="px-5 py-12 md:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

            {/* Line items */}
            <div className="space-y-3">
              <div className="mb-5 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
                {count} item{count !== 1 ? "s" : ""} in your cart
              </div>
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex items-center gap-4 rounded-2xl border border-black/8 bg-white p-4"
                >
                  {item.image ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F5F0E6]">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                  ) : (
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-[#F5F0E6]" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-lg uppercase leading-none">{item.name}</div>
                    <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-black/40">
                      {item.size} · Qty {item.quantity}
                    </div>
                  </div>
                  <div className="shrink-0 font-medium text-black/70">
                    {money(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary + promo + CTA */}
            <div className="h-fit rounded-2xl border border-black/8 bg-white p-6">
              <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
                Summary
              </div>

              <div className="mt-4 space-y-2">
                {items.map((item) => (
                  <div
                    key={`${item.productId}-${item.size}`}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-black/55">
                      {item.name} × {item.quantity}
                    </span>
                    <span>{money(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-black/8 pt-4">
                <span className="text-sm font-semibold">Subtotal</span>
                <span className="font-semibold">{money(subtotal)}</span>
              </div>

              <p className="mt-1 text-[11px] text-black/35">
                Shipping and taxes calculated at checkout.
              </p>

              {/* Promo code */}
              <div className="mt-5 space-y-2">
                <label className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-black/40">
                  Promo code
                </label>
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => {
                    setCouponCode(e.target.value);
                    setError(null);
                  }}
                  placeholder="Enter code (optional)"
                  className="w-full rounded-full border border-black/10 bg-[#F5F0E6] px-4 py-2.5 text-sm uppercase tracking-wider outline-none placeholder:text-black/25 placeholder:normal-case focus:border-black/25"
                />
                <p className="text-[11px] text-black/35">
                  Or enter your code directly on the Stripe checkout page.
                </p>
              </div>

              {error && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className="mt-5 w-full rounded-full bg-black py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80 disabled:opacity-40"
              >
                {loading ? "Redirecting…" : "Proceed to Checkout →"}
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-black/30">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <rect x="1" y="5" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M3.5 5V3.5a2.5 2.5 0 0 1 5 0V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span>Secured by Stripe</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
