"use client";

import { useState } from "react";
import Link from "next/link";

const PRESETS = [
  { label: "$25",  amount: 2500,  desc: "Seed a spark" },
  { label: "$50",  amount: 5000,  desc: "Fund a concept" },
  { label: "$100", amount: 10000, desc: "Back a brand" },
  { label: "$250", amount: 25000, desc: "Launch a vision" },
];

const COLLABS = [
  {
    title: "Networking Intro",
    desc: "Connect us with the right people — an introduction is sometimes the most powerful thing.",
    cta: "Offer a Connection",
  },
  {
    title: "Business Meeting",
    desc: "Book a strategy session. Bring your expertise to the table and help shape the next move.",
    cta: "Schedule a Meeting",
  },
  {
    title: "Creative Collaboration",
    desc: "Partner on a project — design, content, music, photography, architecture, whatever you bring.",
    cta: "Propose a Collab",
  },
];

function CreativesCard() {
  return (
    <div className="creatives-card relative w-full max-w-sm rounded-2xl p-7 select-none" style={{ aspectRatio: "1.586" }}>
      <div className="card-stripe" />

      <div className="relative z-10 flex h-full flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div>
            <div className="font-display text-[11px] uppercase tracking-[0.35em] text-[#b8945a]/70">
              Original IP
            </div>
            <div className="mt-0.5 font-display text-lg uppercase leading-none tracking-[0.08em] text-white">
              Creatives Club
            </div>
          </div>
          {/* Contactless icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-40">
            <path d="M5 12a7 7 0 0 0 7 7" stroke="#b8945a" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8 12a4 4 0 0 0 4 4" stroke="#b8945a" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M2 12a10 10 0 0 0 10 10" stroke="#b8945a" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Chip */}
        <div className="card-chip" />

        {/* Bottom */}
        <div>
          <div className="mb-3 font-mono text-[15px] tracking-[0.22em] text-white/80">
            4BCC &nbsp;2024 &nbsp;0001 &nbsp;GIVE
          </div>
          <div className="flex items-end justify-between">
            <div>
              <div className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#b8945a]/50">
                Member Since
              </div>
              <div className="font-mono text-[12px] tracking-[0.15em] text-white/70">
                01/24
              </div>
            </div>
            <div className="text-right">
              <div className="text-[8px] font-semibold uppercase tracking-[0.25em] text-[#b8945a]/50">
                Black Creatives
              </div>
              <div className="font-display text-[11px] uppercase tracking-[0.2em] text-[#b8945a]">
                For Everyone
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function GivePage() {
  const [customAmount, setCustomAmount] = useState("");
  const [loading, setLoading] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function donate(cents: number) {
    setLoading(cents);
    setError("");
    try {
      const res = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cents }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setError(data.error ?? "Something went wrong.");
    } catch {
      setError("Could not connect. Try again.");
    } finally {
      setLoading(null);
    }
  }

  function handleCustom() {
    const parsed = parseFloat(customAmount.replace(/[^0-9.]/g, ""));
    if (isNaN(parsed) || parsed < 1) {
      setError("Enter a valid amount ($1 minimum).");
      return;
    }
    donate(Math.round(parsed * 100));
  }

  return (
    <main className="min-h-screen bg-[#080808]">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="px-5 pb-16 pt-28 md:px-6 md:pt-36">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Copy */}
            <div>
              <div className="mb-4 inline-block rounded-full border border-[#b8945a]/30 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8945a]">
                Black Creatives Club
              </div>
              <h1 className="font-display text-[clamp(3rem,9vw,6rem)] uppercase leading-[0.88] text-white">
                Fund a<br />Vision.
              </h1>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-white/45">
                For Black creatives building brands, launching projects, and writing new legacies. Your support — financial or otherwise — moves the culture forward.
              </p>
              <p className="mt-3 text-[13px] font-semibold uppercase tracking-[0.2em] text-[#b8945a]/70">
                For Black creatives. For everyone.
              </p>
            </div>

            {/* Card */}
            <div className="flex justify-center lg:justify-end">
              <CreativesCard />
            </div>
          </div>
        </div>
      </section>

      {/* ── Fund a Vision ─────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] px-5 py-16 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8945a]">
            Financial Support
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] uppercase leading-none text-white">
            Fund a Vision
          </h2>
          <p className="mt-3 text-sm text-white/35">
            Every dollar goes directly toward helping a Black creative get their brand or project off the ground.
          </p>

          {/* Preset amounts */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {PRESETS.map(({ label, amount, desc }) => (
              <button
                key={amount}
                onClick={() => donate(amount)}
                disabled={loading !== null}
                className="group flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-6 text-center transition-all hover:border-[#b8945a]/50 hover:bg-white/[0.08] disabled:opacity-50"
              >
                <span className="font-display text-3xl uppercase text-white group-hover:text-[#b8945a] transition-colors">
                  {loading === amount ? "…" : label}
                </span>
                <span className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">
                  {desc}
                </span>
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="mt-4 flex gap-3">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/30">$</span>
              <input
                type="number"
                min="1"
                placeholder="Custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setError(""); }}
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-3.5 pl-8 pr-5 text-sm text-white placeholder:text-white/20 outline-none focus:border-[#b8945a]/50"
              />
            </div>
            <button
              onClick={handleCustom}
              disabled={loading !== null}
              className="rounded-full bg-[#b8945a] px-6 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-85 disabled:opacity-50"
            >
              Give
            </button>
          </div>

          {error && (
            <p className="mt-3 text-[12px] text-red-400">{error}</p>
          )}
        </div>
      </section>

      {/* ── More Ways to Support ───────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] px-5 py-16 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#b8945a]">
            Beyond Money
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,3rem)] uppercase leading-none text-white">
            More Ways to Give
          </h2>
          <p className="mt-3 text-sm text-white/35">
            The right introduction can change everything. So can showing up.
          </p>

          <div className="mt-8 space-y-3">
            {COLLABS.map(({ title, desc, cta }) => (
              <a
                key={title}
                href={`mailto:Hello@wedesignsstudio.com?subject=${encodeURIComponent(`Black Creatives Club — ${title}`)}&body=${encodeURIComponent(`Hi,\n\nI'd like to offer: ${title}\n\n`)}`}
                className="group flex items-start gap-5 rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all hover:border-[#b8945a]/40 hover:bg-white/[0.06]"
              >
                <div className="flex-1">
                  <div className="font-display text-lg uppercase leading-none text-white">
                    {title}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-white/40">{desc}</p>
                </div>
                <div className="shrink-0 self-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#b8945a]/60 transition-colors group-hover:text-[#b8945a]">
                  {cta} →
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer note ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/[0.06] px-5 py-12 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-white/25">
            Black Creatives Club is a Cooper Supply Co. initiative. Questions?{" "}
            <a href="mailto:Hello@wedesignsstudio.com" className="text-[#b8945a]/60 underline-offset-2 hover:text-[#b8945a]">
              Hello@wedesignsstudio.com
            </a>
          </p>
        </div>
      </section>
    </main>
  );
}
