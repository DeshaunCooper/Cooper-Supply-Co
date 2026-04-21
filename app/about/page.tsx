import { SectionLabel } from "@/components/shared/section-label";

const PRINCIPLES = [
  "Unrestricted by default.",
  "Black-led and culture-first.",
  "Made for people who move different.",
  "Supply on our terms.",
];

export default function AboutPage() {
  return (
    <main>
      <section className="bg-black px-5 pb-16 pt-28 text-white md:px-6 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <SectionLabel light>Our Story</SectionLabel>
          <h1 className="font-display text-[clamp(3.5rem,12vw,8rem)] uppercase leading-[0.88]">
            No rules.<br />No ceiling.<br />Just us.
          </h1>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>The Origin</SectionLabel>
          <p className="max-w-2xl text-lg font-medium leading-relaxed md:text-xl">
            Cooper Supply Co. started because we needed somewhere to sell what we actually make — not broken up across five different platforms, not filtered through somebody else's rules.
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-black/50 md:text-xl">
            One place. Ours.
          </p>
        </div>
      </section>

      <section className="bg-black px-5 py-16 text-white md:px-6">
        <div className="mx-auto max-w-4xl">
          <SectionLabel light>Who We Are</SectionLabel>
          <h2 className="font-display text-[clamp(2.5rem,8vw,5.5rem)] uppercase leading-[0.9]">
            Black Creatives<br />With Nerd-Like<br />Tendencies.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
            That's the team. Design nerds who move fast, think deep, and don't follow templates. We pull from culture the way crates get flipped — selectively, carefully, with real love.
          </p>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/50 md:text-base">
            You'll see it in the hats. The graphics. The details that don't need an explanation.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>The Principles</SectionLabel>
          <div className="mt-2 divide-y divide-black/8">
            {PRINCIPLES.map((p, i) => (
              <div key={i} className="flex items-center gap-5 py-5">
                <span className="w-8 shrink-0 text-[10px] font-semibold uppercase tracking-[0.3em] text-black/25">
                  0{i + 1}
                </span>
                <span className="font-display text-2xl uppercase md:text-3xl">{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-16 text-white md:px-6">
        <div className="mx-auto max-w-4xl">
          <SectionLabel light>Why We Built This</SectionLabel>
          <p className="max-w-xl text-sm leading-relaxed text-white/50 md:text-base">
            Why start an independent brand? Why build it from scratch when it's easier not to?
          </p>
          <h2 className="mt-8 font-display text-[clamp(3rem,10vw,6rem)] uppercase leading-[0.88]">
            Because<br />Why Not.
          </h2>
          <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/45 md:text-base">
            We wanted this to exist. So we built it. If it helps someone feel more seen, more represented, more proud — that's a bonus. We didn't need permission to start.
          </p>
        </div>
      </section>
    </main>
  );
}
