import { Hero } from "@/components/home/hero";
import { EssentialsSection, MascotStorySection, NewsletterSection } from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <EssentialsSection />
      <MascotStorySection />
      <NewsletterSection />
    </>
  );
}
