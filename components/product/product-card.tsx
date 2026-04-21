import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { money } from "@/lib/money";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white transition-shadow hover:shadow-md"
    >
      <div className="relative h-64 overflow-hidden bg-[#F5F0E6]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute left-3 top-3 rounded-full bg-black px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-white">
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">{product.category}</div>
        <div className="mt-1.5 font-display text-xl uppercase leading-none">{product.shortName}</div>
        <div className="mt-2.5 text-sm font-medium text-black/55">{money(product.price)}</div>
      </div>
    </Link>
  );
}
