import clsx from "clsx";

export function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={clsx("mb-5 text-[11px] font-semibold uppercase tracking-[0.35em]", light ? "text-white/50" : "text-black/50")}>
      {children}
    </div>
  );
}
