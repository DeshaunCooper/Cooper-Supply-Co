"use client";

import { useCart } from "@/components/cart/cart-provider";
import { money } from "@/lib/money";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  async function handleCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });

    const data = await res.json();
    if (data.url) window.location.href = data.url;
  }

  return (
    <section className="px-4 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">Checkout</h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-xl font-black uppercase">Customer details</div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {['First name', 'Last name', 'Email', 'Phone', 'Address', 'City', 'State', 'ZIP'].map((field) => (
                <input key={field} placeholder={field} className="rounded-full border border-black/10 bg-[#F5F0E6] px-5 py-4 text-sm outline-none" />
              ))}
            </div>
          </div>
          <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm">
            <div className="text-xl font-black uppercase">Order summary</div>
            <div className="mt-5 space-y-3">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}`} className="flex items-center justify-between rounded-[1.25rem] border border-black/10 bg-[#F5F0E6] p-4">
                  <div>
                    <div className="text-sm font-black uppercase">{item.name}</div>
                    <div className="mt-1 text-xs uppercase text-black/45">{item.size} • {item.quantity}x</div>
                  </div>
                  <div className="font-black">{money(item.price * item.quantity)}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
              <span className="font-black uppercase">Total</span>
              <span className="font-black">{money(subtotal)}</span>
            </div>
            <button onClick={handleCheckout} className="mt-6 w-full rounded-full bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white">
              Continue to Stripe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
