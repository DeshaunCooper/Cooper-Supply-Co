export const dynamic = "force-dynamic";

import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product/product-grid";
import { SectionLabel } from "@/components/shared/section-label";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main>
      <section className="bg-black px-5 pb-12 pt-28 text-white md:px-6 md:pt-32">
        <div className="mx-auto max-w-6xl">
          <SectionLabel light>Drop 01</SectionLabel>
          <h1 className="font-display text-[clamp(3.5rem,12vw,8rem)] uppercase leading-[0.88]">
            The Cooper<br />Classics
          </h1>
        </div>
      </section>

      <section className="px-5 py-12 md:px-6">
        <div className="mx-auto max-w-6xl">
          <ProductGrid products={products} />
        </div>
      </section>
    </main>
  );
}
