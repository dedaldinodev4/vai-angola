import { Hero } from "@/features/home/components/hero";
import { FeaturedDestinations } from "@/features/home/components/featured-destinations";
import { ProvinceDiscovery } from "@/features/home/components/province-discovery";
import { ExperiencesSection } from "@/features/home/components/experiences-section";
import { EventsSection } from "@/features/home/components/events-section";
import { StoriesSection } from "@/features/home/components/stories-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedDestinations />
      <ProvinceDiscovery />
      <ExperiencesSection />
      <EventsSection />
      <StoriesSection />
    </>
  );
}
