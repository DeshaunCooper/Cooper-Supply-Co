import Link from "next/link";
import { drops } from "@/data/drops";
import { SectionLabel } from "@/components/shared/section-label";
import { DropNotifyForm } from "@/components/drops/drop-notify-form";

const liveDrops = drops.filter((d) => d.status === "live");
const archiveDrops = drops.filter((d) => d.status === "archive");
const upcomingDrops = drops.filter((d) => d.status === "upcoming");
const hasAnyDrop = drops.length > 0;

export default function DropsPage() {
  return (
    <main>
      <section className="bg-black px-5 pb-12 pt-28 text-white md:px-6 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <SectionLabel light>Drops</SectionLabel>
          <h1 className="font-display text-[clamp(3.5rem,12vw,8rem)] uppercase leading-[0.88]">
            {liveDrops.length > 0 ? "Live Now." : "Something's\nComing."}
          </h1>
        </div>
      </section>

      {/* Empty state — no drops at all */}
      {!hasAnyDrop && (
        <section className="px-5 py-20 md:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-black/8 bg-white p-10 md:p-14">
              <SectionLabel>Drop Signal</SectionLabel>
              <h2 className="font-display text-[clamp(2rem,7vw,4rem)] uppercase leading-[0.9]">
                Nothing dropped yet.<br />Be first to know.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/45">
                We don't spam. We just signal when it matters — limited runs, new collections, and Cooper-exclusive releases.
              </p>
              <DropNotifyForm />
            </div>
          </div>
        </section>
      )}

      {/* Upcoming drops */}
      {upcomingDrops.length > 0 && (
        <section className="px-5 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>Upcoming</SectionLabel>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingDrops.map((drop) => (
                <div key={drop.id} className="rounded-2xl border border-black/8 bg-white p-6">
                  {drop.coverImage && (
                    <div className="mb-4 h-48 overflow-hidden rounded-xl bg-[#F5F0E6]" />
                  )}
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">
                    {new Date(drop.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </div>
                  <div className="mt-2 font-display text-2xl uppercase leading-none">{drop.name}</div>
                  <p className="mt-2 text-sm leading-relaxed text-black/50">{drop.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Live drops */}
      {liveDrops.length > 0 && (
        <section className="px-5 py-16 md:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionLabel>Live Now</SectionLabel>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {liveDrops.map((drop) => (
                <Link key={drop.id} href={`/shop?drop=${drop.slug}`} className="group rounded-2xl border border-black/8 bg-white p-6 transition-shadow hover:shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-black/35">Live</div>
                  </div>
                  <div className="mt-3 font-display text-2xl uppercase leading-none">{drop.name}</div>
                  <p className="mt-2 text-sm leading-relaxed text-black/50">{drop.description}</p>
                  <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-black">Shop Drop →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Archive drops */}
      {archiveDrops.length > 0 && (
        <section className="bg-black px-5 py-16 text-white md:px-6">
          <div className="mx-auto max-w-6xl">
            <SectionLabel light>Archive</SectionLabel>
            <div className="mt-2 divide-y divide-white/8">
              {archiveDrops.map((drop) => (
                <div key={drop.id} className="flex items-center justify-between gap-4 py-5">
                  <div>
                    <div className="font-display text-xl uppercase leading-none">{drop.name}</div>
                    <div className="mt-1 text-[11px] text-white/35">
                      {new Date(drop.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </div>
                  </div>
                  <div className="shrink-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30">Archived</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
