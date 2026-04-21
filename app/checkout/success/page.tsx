"use client";

import { Suspense, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart/cart-provider";
import { SectionLabel } from "@/components/shared/section-label";

function SuccessInner() {
  const { clearCart } = useCart();
  const params = useSearchParams();
  const sessionId = params.get("session_id");

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-32">
      <div className="mx-auto w-full max-w-lg text-center">
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-black">
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <path d="M1 8L8 15L21 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <SectionLabel>Order Confirmed</SectionLabel>
        <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.9]">
          You&apos;re all set.
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-black/50">
          Payment received. You&apos;ll get a confirmation email once your order is on its way.
        </p>

        {sessionId && (
          <p className="mt-3 font-mono text-[11px] text-black/25">
            ref: {sessionId.slice(-12)}
          </p>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="rounded-full bg-black px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-75"
          >
            Keep Shopping
          </Link>
          <Link
            href="/"
            className="rounded-full border border-black/15 px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-black/55 transition-colors hover:text-black"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessInner />
    </Suspense>
  );
}
