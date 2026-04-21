export type PrintifyImage = {
  src: string;
  variant_ids: number[];
  position: string;
  is_default: boolean;
};

export type PrintifyVariant = {
  id: number;
  title: string;
  price: number;      // retail price in cents (what you set as selling price)
  cost: number;       // base/wholesale cost in cents
  is_enabled: boolean;
  is_available: boolean;
  is_default: boolean;
  sku: string;
  options: number[];
};

export type PrintifyOptionValue = {
  id: number;
  title: string;
};

export type PrintifyOption = {
  name: string;
  type: string;
  values: PrintifyOptionValue[];
};

export type PrintifyProduct = {
  id: string;
  title: string;
  description: string;     // may contain HTML
  images: PrintifyImage[];
  variants: PrintifyVariant[];
  options: PrintifyOption[];
  visible: boolean;        // false = unpublished
  is_locked: boolean;
};

export type PrintifyProductsPage = {
  current_page: number;
  last_page: number;
  data: PrintifyProduct[];
};
