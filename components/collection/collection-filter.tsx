"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/lib/types";

type Section = { label: string; items: Product[] };

type Props = {
  allProducts: Product[];
  subcategories: string[];
  collections: string[];
  initialSections: Section[];
};

type Chip = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function ChipRow({ label, chips }: { label: string; chips: Chip[] }) {
  return (
    <div>
      <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
        {label}
      </div>
      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.label}
            onClick={c.onClick}
            className={
              c.active
                ? "rounded-full bg-black px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white"
                : "rounded-full border border-black/10 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-black/50 transition-colors hover:border-black/25 hover:text-black"
            }
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function CollectionFilter({ allProducts, subcategories, collections, initialSections }: Props) {
  const [activeSub, setActiveSub] = useState("All");
  const [activeCol, setActiveCol] = useState("All");

  const isFiltered = activeSub !== "All" || activeCol !== "All";

  const sections: Section[] = useMemo(() => {
    const filtered = allProducts.filter((p) => {
      if (activeSub !== "All" && p.subcategory !== activeSub) return false;
      if (activeCol !== "All" && p.collection !== activeCol) return false;
      return true;
    });

    if (activeSub !== "All") {
      // Single selected subcategory — flat list under that label
      return [{ label: activeSub, items: filtered }];
    }

    // Group by subcategory in original order, filtered by collection
    const order = [...new Set(filtered.map((p) => p.subcategory))];
    return order.map((sub) => ({
      label: sub,
      items: filtered.filter((p) => p.subcategory === sub),
    })).filter((s) => s.items.length > 0);
  }, [allProducts, activeSub, activeCol]);

  const subChips: Chip[] = [
    { label: "All", active: activeSub === "All", onClick: () => setActiveSub("All") },
    ...subcategories.map((s) => ({
      label: s,
      active: activeSub === s,
      onClick: () => setActiveSub(activeSub === s ? "All" : s),
    })),
  ];

  const colChips: Chip[] = [
    { label: "All Collections", active: activeCol === "All", onClick: () => setActiveCol("All") },
    ...collections.map((c) => ({
      label: c,
      active: activeCol === c,
      onClick: () => setActiveCol(activeCol === c ? "All" : c),
    })),
  ];

  const totalVisible = sections.reduce((n, s) => n + s.items.length, 0);

  return (
    <div>
      {/* Filters */}
      <div className="mb-10 space-y-4 rounded-2xl border border-black/8 bg-white p-5">
        {subcategories.length > 1 && (
          <ChipRow label="Type" chips={subChips} />
        )}
        {collections.length > 1 && (
          <ChipRow label="Collection" chips={colChips} />
        )}
        {isFiltered && (
          <div className="flex items-center justify-between border-t border-black/8 pt-3">
            <span className="text-[11px] text-black/40">
              {totalVisible} item{totalVisible !== 1 ? "s" : ""}
            </span>
            <button
              onClick={() => { setActiveSub("All"); setActiveCol("All"); }}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/35 underline-offset-2 hover:text-black hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Subcategory sections */}
      {sections.length === 0 ? (
        <div className="py-12 text-center">
          <p className="font-display text-3xl uppercase text-black/20">No products matched.</p>
        </div>
      ) : (
        <div className="space-y-14">
          {sections.map(({ label, items }) => (
            <div key={label}>
              <div className="mb-5 flex items-center gap-4">
                <h2 className="font-display text-2xl uppercase leading-none">{label}</h2>
                <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-black/30">
                  {items.length} item{items.length !== 1 ? "s" : ""}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
