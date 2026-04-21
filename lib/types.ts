export type Supplier = "Printful" | "Printify" | "Artsadd";
export type Category = "Headwear" | "Outerwear" | "Tops" | "Bags" | "Accessories" | "Home";

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
  subcategory: string;   // e.g. "Dad Hats", "Hoodies", "Varsity", "Tote Bags"
  collection?: string;   // brand grouping, e.g. "The Everyday", "Heritage Series"
  drop?: string;         // drop assignment, e.g. "Drop 01"
  tags: string[];        // searchable/filterable keywords
  tag: string;           // single display label for badges/search
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
