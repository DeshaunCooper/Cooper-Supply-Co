"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";
import { money } from "@/lib/money";

export function CartDrawer() {
  const { open, setOpen, items, subtotal, updateQty, removeItem, hydrated } = useCart();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-black/60">
      <div className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-[#F5F0E6] shadow-2xl">
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
          <div className="text-2xl font-black uppercase">Your bag</div>
          <button onClick={() => setOpen(false)}>Close</button>
        </div>
        <div className="flex-1 overflow-auto px-6 py-5">
          {!hydrated ? null : items.length === 0 ? (
            <div className="rounded-[1.5rem] border border-black/10 bg-white p-4">Cart is empty.</div>
          ) : items.map((item) => (
            <div key={`${item.productId}-${item.size}`} className="mb-4 rounded-[1.5rem] border border-black/10 bg-white p-4">
              <div className="text-sm font-black uppercase">{item.name}</div>
              <div className="mt-1 text-xs uppercase text-black/45">{item.size}</div>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => updateQty(item.productId, item.size, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQty(item.productId, item.size, item.quantity + 1)}>+</button>
                <button onClick={() => removeItem(item.productId, item.size)} className="ml-auto text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-black/10 bg-white px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-black">{money(subtotal)}</span>
          </div>
          <Link href="/checkout" className="block rounded-full bg-black px-6 py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-white">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
