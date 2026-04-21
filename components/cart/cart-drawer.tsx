"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "./cart-provider";
import { money } from "@/lib/money";

export function CartDrawer() {
  const { open, setOpen, items, subtotal, updateQty, removeItem, hydrated, count } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleCheckout() {
    if (!items.length) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Something went wrong."); return; }
      if (data.url) window.location.href = data.url;
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
    >
      <div className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-[#F5F0E6]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-black/8 px-6 py-5">
          <div>
            <div className="font-display text-2xl uppercase leading-none">Your Bag</div>
            {hydrated && count > 0 && (
              <div className="mt-0.5 text-[11px] font-medium text-black/40">
                {count} item{count !== 1 ? "s" : ""}
              </div>
            )}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white text-black/60 transition-colors hover:bg-black hover:text-white"
            aria-label="Close cart"
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M1 1L12 12M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {!hydrated ? null : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="font-display text-3xl uppercase text-black/20">Empty.</div>
              <p className="mt-2 text-sm text-black/35">Add something to get started.</p>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className="mt-5 rounded-full bg-black px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] text-white"
              >
                Shop the Drop
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex items-start gap-3 rounded-2xl border border-black/8 bg-white p-4"
                >
                  {item.image ? (
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[#F5F0E6]">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                  ) : (
                    <div className="h-16 w-16 shrink-0 rounded-xl bg-[#F5F0E6]" />
                  )}

                  <div className="min-w-0 flex-1">
                    <div className="font-display text-base uppercase leading-none">{item.name}</div>
                    <div className="mt-1 text-[11px] font-medium uppercase tracking-[0.18em] text-black/40">
                      {item.size}
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.quantity - 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-[#F5F0E6] text-sm font-medium text-black/60 hover:border-black/25"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}
                        className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-[#F5F0E6] text-sm font-medium text-black/60 hover:border-black/25"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.productId, item.size)}
                        className="ml-auto text-[11px] font-medium text-black/30 underline-offset-2 hover:text-black/60 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="shrink-0 text-sm font-medium text-black/60">
                    {money(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {hydrated && items.length > 0 && (
          <div className="border-t border-black/8 bg-white px-6 py-5">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Subtotal</span>
              <span className="font-semibold">{money(subtotal)}</span>
            </div>
            <p className="mt-1 text-[11px] text-black/35">
              Shipping and taxes at checkout.
            </p>

            {error && (
              <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
                {error}
              </div>
            )}

            <div className="mt-4 flex flex-col gap-2.5">
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full rounded-full bg-black py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-80 disabled:opacity-40"
              >
                {loading ? "Redirecting…" : "Checkout →"}
              </button>
              <Link
                href="/checkout"
                onClick={() => setOpen(false)}
                className="w-full rounded-full border border-black/10 py-3 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-black/55 transition-colors hover:border-black/25 hover:text-black"
              >
                Review Order
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
