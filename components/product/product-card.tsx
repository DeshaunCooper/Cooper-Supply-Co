import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { money } from "@/lib/money";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product.slug}`} className="group relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-5 shadow-sm">
      <div className="relative h-80 overflow-hidden rounded-[1.5rem] bg-[#F5F0E6]">
        <Image src={product.images[0]} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-4">
        <div className="text-[11px] uppercase tracking-[0.28em] text-black/50">{product.category}</div>
        <div className="mt-2 text-2xl font-black uppercase leading-none">{product.shortName}</div>
        <div className="mt-3 text-sm font-medium text-black/65">{money(product.price)}</div>
      </div>
    </Link>
  );
}
