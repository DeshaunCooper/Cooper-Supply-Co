export const dynamic = "force-dynamic";

import { Hero } from "@/components/home/hero";
import { EssentialsSection, MascotStorySection, CreativesClubSection, NewsletterSection } from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EssentialsSection />
      <MascotStorySection />
      <CreativesClubSection />
      <NewsletterSection />
    </>
  );
}
