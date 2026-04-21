import clsx from "clsx";

export function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={clsx("mb-4 text-[10px] font-semibold uppercase tracking-[0.35em]", light ? "text-white/40" : "text-black/40")}>
      {children}
    </div>
  );
}
