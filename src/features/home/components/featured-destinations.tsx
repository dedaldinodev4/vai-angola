import { Container } from "@/components/layout/container";

import { DestinationCard } from "@/features/destinations/components/destination-card";
import { getFeaturedDestinations } from "@/features/destinations/services/destinations.service";
import { SectionHeading } from "./section-heading";

/** Composição assimétrica: tamanho e deslocamento por posição (só em ecrãs largos). */
const LAYOUT = [
  { wrapper: "lg:col-span-7", image: "aspect-[4/3]", large: true },
  { wrapper: "lg:col-span-5 lg:mt-24", image: "aspect-[4/5]", large: false },
  { wrapper: "lg:col-span-4", image: "aspect-[4/5]", large: false },
  { wrapper: "lg:col-span-4 lg:mt-12", image: "aspect-square", large: false },
  { wrapper: "lg:col-span-4 lg:mt-24", image: "aspect-[4/5]", large: false },
] as const;

export function FeaturedDestinations() {
  const featured = getFeaturedDestinations().slice(0, LAYOUT.length);

  return (
    <section aria-labelledby="destaques-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="destaques-title"
          title="Lugares para começar"
          description="Cinco destinos de demonstração para dar o tom da revista."
          href="/explore"
          linkLabel="Ver todos os destinos"
        />
        <div className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-12">
          {featured.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              imageClassName={LAYOUT[index].image}
              large={LAYOUT[index].large}
              className={LAYOUT[index].wrapper}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
