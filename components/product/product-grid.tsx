"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

function uniq(arr: (string | undefined)[]): string[] {
  return [...new Set(arr.filter(Boolean))] as string[];
}

type Filters = {
  query: string;
  category: string;
  subcategory: string;
  collection: string;
  drop: string;
};

const EMPTY: Filters = {
  query: "",
  category: "All",
  subcategory: "All",
  collection: "All",
  drop: "All",
};

function chipClass(active: boolean) {
  return active
    ? "rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
    : "rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/50 transition-colors hover:border-black/25 hover:text-black";
}

export function ProductGrid({ products }: { products: Product[] }) {
  const [f, setF] = useState<Filters>(EMPTY);

  function set<K extends keyof Filters>(key: K, value: string, resets?: (keyof Filters)[]) {
    setF((prev) => {
      const next = { ...prev, [key]: value };
      resets?.forEach((k) => { next[k] = "All"; });
      return next;
    });
  }

  // Derive available option lists contextually
  const byCategory = f.category === "All" ? products : products.filter((p) => p.category === f.category);

  const allCategories  = uniq(products.map((p) => p.category));
  const allSubcats     = uniq(byCategory.map((p) => p.subcategory));
  const allCollections = uniq(byCategory.map((p) => p.collection));
  const allDrops       = uniq(products.map((p) => p.drop));

  const showSubcats     = f.category !== "All" && allSubcats.length > 1;
  const showCollections = allCollections.length > 1;
  const showDrops       = allDrops.length > 1;

  // Apply all active filters
  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (f.category    !== "All" && p.category    !== f.category)    return false;
      if (f.subcategory !== "All" && p.subcategory !== f.subcategory) return false;
      if (f.collection  !== "All" && p.collection  !== f.collection)  return false;
      if (f.drop        !== "All" && p.drop        !== f.drop)        return false;
      if (f.query) {
        const q = f.query.trim().toLowerCase();
        const text = [
          p.name, p.shortName, p.category, p.subcategory,
          p.collection, p.drop, p.tag, ...p.tags,
        ].filter(Boolean).join(" ").toLowerCase();
        if (!text.includes(q)) return false;
      }
      return true;
    });
  }, [products, f]);

  // Active filter pills (excluding query)
  type Pill = { key: keyof Filters; label: string };
  const pills: Pill[] = (
    [
      f.category    !== "All" && { key: "category"    as const, label: f.category },
      f.subcategory !== "All" && { key: "subcategory" as const, label: f.subcategory },
      f.collection  !== "All" && { key: "collection"  as const, label: f.collection },
      f.drop        !== "All" && { key: "drop"        as const, label: f.drop },
    ] as (Pill | false)[]
  ).filter(Boolean) as Pill[];

  const anyFilter = pills.length > 0 || f.query !== "";

  return (
    <div>
      {/* ── Filter panel ─────────────────────────────────────────── */}
      <div className="mb-8 space-y-4 rounded-2xl border border-black/8 bg-white p-5">

        {/* Search */}
        <input
          value={f.query}
          onChange={(e) => setF((prev) => ({ ...prev, query: e.target.value }))}
          placeholder="Search products, tags, collections…"
          className="w-full rounded-full border border-black/10 bg-[#F5F0E6] px-5 py-2.5 text-sm outline-none placeholder:text-black/30 focus:border-black/25"
        />

        {/* Category */}
        <div>
          <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">Category</div>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => set("category", "All", ["subcategory", "collection", "drop"])} className={chipClass(f.category === "All")}>
              All
            </button>
            {allCategories.map((c) => (
              <button key={c} onClick={() => set("category", c, ["subcategory", "collection"])} className={chipClass(f.category === c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Subcategory — contextual */}
        {showSubcats && (
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">Type</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => set("subcategory", "All")} className={chipClass(f.subcategory === "All")}>All</button>
              {allSubcats.map((s) => (
                <button key={s} onClick={() => set("subcategory", s)} className={chipClass(f.subcategory === s)}>{s}</button>
              ))}
            </div>
          </div>
        )}

        {/* Collection */}
        {showCollections && (
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">Collection</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => set("collection", "All")} className={chipClass(f.collection === "All")}>All Collections</button>
              {allCollections.map((c) => (
                <button key={c} onClick={() => set("collection", c)} className={chipClass(f.collection === c)}>{c}</button>
              ))}
            </div>
          </div>
        )}

        {/* Drop */}
        {showDrops && (
          <div>
            <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">Drop</div>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => set("drop", "All")} className={chipClass(f.drop === "All")}>All Drops</button>
              {allDrops.map((d) => (
                <button key={d} onClick={() => set("drop", d)} className={chipClass(f.drop === d)}>{d}</button>
              ))}
            </div>
          </div>
        )}

        {/* Active pills + results count */}
        {anyFilter && (
          <div className="flex flex-wrap items-center gap-2 border-t border-black/8 pt-3">
            <span className="text-[11px] text-black/40">
              {filtered.length} of {products.length} products
            </span>
            {pills.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => set(key, "All")}
                className="flex items-center gap-1.5 rounded-full border border-black/15 bg-[#F5F0E6] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-black/60 hover:border-black/30"
              >
                {label}
                <span className="text-black/35">×</span>
              </button>
            ))}
            <button
              onClick={() => setF(EMPTY)}
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/30 underline-offset-2 hover:text-black hover:underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* ── Results ──────────────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-display text-3xl uppercase text-black/20">Nothing matched.</p>
          <button onClick={() => setF(EMPTY)} className="mt-4 text-sm text-black/40 underline-offset-2 hover:text-black hover:underline">
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
