import Image from "next/image";
import type { Product } from "@/lib/types";

export function ProductGallery({ product }: { product: Product }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {product.images.map((src) => (
        <div key={src} className="relative h-[28rem] overflow-hidden rounded-[2rem] border border-black/10 bg-white">
          <Image src={src} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
