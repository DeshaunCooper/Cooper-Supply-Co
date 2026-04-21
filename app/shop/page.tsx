import { products } from "@/data/products";
import { ProductGrid } from "@/components/product/product-grid";

export default function ShopPage() {
  return (
    <section className="px-4 pb-24 pt-32 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-5xl font-black uppercase leading-none md:text-7xl">Shop the drop.</h1>
        <ProductGrid products={products} />
      </div>
    </section>
  );
}
