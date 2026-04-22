import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#080808] px-5 text-center">
      <div className="mb-6 text-5xl">🖤</div>
      <div className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#b8945a]">
        Black Creatives Club
      </div>
      <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.9] text-white">
        Thank you.
      </h1>
      <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/40">
        Your support helps a Black creative build something real. The culture thanks you.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full border border-[#b8945a]/30 bg-[#b8945a]/10 px-8 py-3.5 text-[11px] font-bold uppercase tracking-[0.25em] text-[#b8945a] transition-colors hover:bg-[#b8945a]/20"
      >
        Back to Cooper Supply Co.
      </Link>
    </main>
  );
}
