import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/products";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPurchasePanel } from "@/components/product/product-purchase-panel";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <section className="px-4 pb-24 pt-32 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <ProductGallery product={product} />
        <ProductPurchasePanel product={product} />
      </div>
    </section>
  );
}
