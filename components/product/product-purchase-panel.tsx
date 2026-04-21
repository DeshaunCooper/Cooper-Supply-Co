"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { money } from "@/lib/money";
import { useCart } from "@/components/cart/cart-provider";
import { AffirmPromo } from "@/components/affirm/affirm-promo";
import { SupplierPill } from "@/components/shared/supplier-pill";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const { addItem } = useCart();

  return (
    <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-sm md:p-8">
      <SupplierPill supplier={product.supplier} />
      <h1 className="mt-5 text-4xl font-black uppercase leading-none md:text-5xl">{product.name}</h1>
      <div className="mt-4 text-2xl font-black">{money(product.price)}</div>
      <div className="mt-2">
        <AffirmPromo amountInCents={product.price * 100} />
      </div>
      <p className="mt-5 text-sm leading-7 text-black/68">{product.description}</p>
      <div className="mt-8 flex flex-wrap gap-2">
        {product.sizes.map((s) => (
          <button key={s} onClick={() => setSize(s)} className={size === s ? "rounded-full bg-black px-4 py-2 text-xs font-bold uppercase text-white" : "rounded-full border border-black/10 px-4 py-2 text-xs font-bold uppercase"}>
            {s}
          </button>
        ))}
      </div>
      <button
        onClick={() =>
          addItem({
            productId: product.id,
            slug: product.slug,
            name: product.name,
            size,
            quantity: 1,
            price: product.price,
            supplier: product.supplier,
            sku: product.sku,
            externalProductId: product.externalProductId,
            variantId: product.externalVariantIds?.[size],
            image: product.images[0],
          })
        }
        className="mt-8 rounded-full bg-black px-6 py-4 text-xs font-black uppercase tracking-[0.2em] text-white"
      >
        Add to cart
      </button>
    </div>
  );
}
