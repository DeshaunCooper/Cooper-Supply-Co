"use client";

export function CreativesClubCard() {
  return (
    <div
      className="creatives-card relative w-full max-w-sm rounded-2xl p-7 select-none"
      style={{ aspectRatio: "1.586" }}
    >
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
