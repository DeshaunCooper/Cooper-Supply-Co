import type { PrintifyProduct, PrintifyProductsPage } from "./types";

const BASE = "https://api.printify.com/v1";
const CACHE_TAG = "printify-products";

function apiKey() {
  const key = process.env.PRINTIFY_API_KEY;
  if (!key) throw new Error("PRINTIFY_API_KEY is not set");
  return key;
}

function shopId() {
  const id = process.env.PRINTIFY_SHOP_ID;
  if (!id) throw new Error("PRINTIFY_SHOP_ID is not set");
  return id;
}

async function pfyFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      Authorization: `Bearer ${apiKey()}`,
      "User-Agent": "CooperSupplyCo/1.0",
    },
    next: {
      revalidate: 3600,         // refresh at most every hour
      tags: [CACHE_TAG],        // busted by webhook / manual sync
    },
  });

  if (!res.ok) {
    throw new Error(`Printify API ${res.status}: ${path}`);
  }

  return res.json() as Promise<T>;
}

export async function fetchAllProducts(): Promise<PrintifyProduct[]> {
  const all: PrintifyProduct[] = [];
  let page = 1;

  while (true) {
    const data = await pfyFetch<PrintifyProductsPage>(
      `/shops/${shopId()}/products.json?limit=50&page=${page}`
    );
    all.push(...data.data);
    if (data.current_page >= data.last_page) break;
    page++;
  }

  return all;
}

export async function fetchProduct(productId: string): Promise<PrintifyProduct> {
  return pfyFetch<PrintifyProduct>(
    `/shops/${shopId()}/products/${productId}.json`
  );
}

export { CACHE_TAG as PRINTIFY_CACHE_TAG };
