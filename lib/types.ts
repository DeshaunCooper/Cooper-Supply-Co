export type Supplier = "Printful" | "Printify" | "Artsadd";
export type Category = "Headwear" | "Outerwear" | "Tops" | "Bags" | "Accessories";

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  price: number;
  sku: string;
  supplier: Supplier;
  category: Category;
  tag: string;
  badge: string;
  color: string;
  accent: string;
  images: string[];
  sizes: string[];
  materials: string[];
  featured?: boolean;
  wheel?: boolean;
  externalProductId?: string;
  externalVariantIds?: Record<string, number>;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  size: string;
  quantity: number;
  price: number;
  supplier: Supplier;
  sku: string;
  image: string;
  externalProductId?: string;
  variantId?: number;
};
