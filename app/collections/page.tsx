import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";

export default function CollectionsPage() {
  return (
    <section className="px-4 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">Collections</h1>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
}
