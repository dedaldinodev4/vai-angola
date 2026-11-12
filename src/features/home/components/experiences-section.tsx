import { Container } from "@/components/layout/container";

import { destinationRepository } from "@/features/destinations/repositories/destination-repository";
import { ExperienceCard } from "@/features/experiences/components/experience-card";
import { listExperiences } from "@/features/experiences/utils/queries";

import { SectionHeading } from "./section-heading";


const OFFSETS = ["", "lg:mt-12", "", "lg:mt-12"] as const;

export async function ExperiencesSection() {
  const [experiences, destinations] = await Promise.all([listExperiences(), destinationRepository.list()]);
  const bySlug = new Map(destinations.map((d) => [d.slug, d]));

  return (
    <section aria-labelledby="experiencias-title" className="py-20 md:py-28">
      <Container>
        <SectionHeading
          id="experiencias-title"
          title="Para fazer lá"
          description="Ideias de experiências ligadas a cada destino. Descrições ilustrativas, sem preços nem horários."
          href="/experiences"
          linkLabel="Ver todas as experiências"
        />
        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.slice(0, 4).map((experience, index) => (
            <li key={experience.id} className={OFFSETS[index % OFFSETS.length]}>
              <ExperienceCard experience={experience} destination={bySlug.get(experience.destinationSlug)} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

