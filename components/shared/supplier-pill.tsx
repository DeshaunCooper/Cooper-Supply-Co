import clsx from "clsx";
import type { Supplier } from "@/lib/types";

export function SupplierPill({ supplier }: { supplier: Supplier }) {
  const tone =
    supplier === "Printful"
      ? "bg-[#111] text-white"
      : supplier === "Printify"
      ? "bg-[#6B705C] text-white"
      : "bg-[#A67C52] text-white";

  return <span className={clsx("rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]", tone)}>{supplier}</span>;
}
