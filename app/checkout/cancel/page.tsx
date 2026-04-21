import Link from "next/link";
import { SectionLabel } from "@/components/shared/section-label";

export default function CheckoutCancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-32">
      <div className="mx-auto w-full max-w-lg text-center">
        <SectionLabel>Checkout Canceled</SectionLabel>
        <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.9]">
          No problem.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-black/50">
          Your cart is still saved. Pick up where you left off whenever you're ready.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/checkout"
            className="rounded-full bg-black px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-white transition-opacity hover:opacity-75"
          >
            Back to Cart
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-black/15 px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] text-black/55 transition-colors hover:text-black"
          >
            Keep Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
