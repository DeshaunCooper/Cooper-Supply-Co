import { SectionLabel } from "@/components/shared/section-label";
import { CustomInquiryForm } from "@/components/custom/custom-inquiry-form";

const SERVICES = [
  {
    label: "Hat Design",
    description: "Custom embroidery, patches, and colorways. Built for your crew or your brand.",
    from: "$45",
  },
  {
    label: "Apparel Graphics",
    description: "Screen-print-ready artwork, hoodie designs, and full apparel system graphics.",
    from: "$120",
  },
  {
    label: "Brand Identity",
    description: "Logo, wordmark, color system, and brand guide. Clean, contemporary, culture-forward.",
    from: "$350",
  },
  {
    label: "Event Merch",
    description: "Custom drops for concerts, launches, pop-ups, and milestones. Full run coordination.",
    from: "$200",
  },
];

export default function CustomPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-black px-5 pb-16 pt-28 text-white md:px-6 md:pt-32">
        <div className="mx-auto max-w-4xl">
          <SectionLabel light>Custom Work</SectionLabel>
          <h1 className="font-display text-[clamp(3.5rem,12vw,8rem)] uppercase leading-[0.88]">
            Your vision.<br />Our build.
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50 md:text-base">
            We do custom design work — hats, apparel, brand identity, and event merch. You bring the idea, we bring the execution.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>What We Build</SectionLabel>
          <div className="mt-2 grid gap-4 sm:grid-cols-2">
            {SERVICES.map((s, i) => (
              <div key={i} className="rounded-2xl border border-black/8 bg-white p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="font-display text-2xl uppercase leading-none">{s.label}</div>
                  <div className="shrink-0 rounded-full border border-black/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/45">
                    From {s.from}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-black/50">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Name your price */}
      <section className="bg-black px-5 py-16 text-white md:px-6">
        <div className="mx-auto max-w-4xl">
          <SectionLabel light>Pricing</SectionLabel>
          <h2 className="font-display text-[clamp(2.5rem,8vw,5rem)] uppercase leading-[0.9]">
            Name your<br />budget.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50 md:text-base">
            We don't gate scope behind mystery pricing. Tell us what you're working with and we'll figure out what we can build together. No lowballing, no padding — just honest scope.
          </p>
        </div>
      </section>

      {/* Inquiry form */}
      <section className="px-5 py-16 md:px-6">
        <div className="mx-auto max-w-4xl">
          <SectionLabel>Start Here</SectionLabel>
          <h2 className="font-display text-[clamp(2rem,6vw,3.5rem)] uppercase leading-[0.9]">
            Tell us about<br />your project.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-black/45">
            Fill this out and we'll hit your inbox within 48 hours.
          </p>
          <CustomInquiryForm />
        </div>
      </section>
    </main>
  );
}
