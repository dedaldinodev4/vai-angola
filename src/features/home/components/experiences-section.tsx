import Link from "next/link";
import { Container } from "@/components/layout/container";
import { DemoArt } from "@/components/media/demo-art";

import { getDestinationBySlug } from "@/features/destinations/services/destinations.service";
import { experiences } from "@/mocks/experiences";

import { SectionHeading } from "./section-heading";

const OFFSETS = ["", "lg:mt-12", "", "lg:mt-12"] as const;

export function ExperiencesSection() {
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
          {experiences.map((experience, index) => {
            const destination = getDestinationBySlug(experience.destinationSlug);
            return (
              <li key={experience.id} className={OFFSETS[index % OFFSETS.length]}>
                <DemoArt
                  scene={experience.art.scene}
                  tone={experience.art.tone}
                  label={experience.title}
                  className="aspect-3/4 w-full rounded-sm"
                />
                <h3 className="mt-4 text-2xl">{experience.title}</h3>
                <p className="mt-2 text-ink/80">{experience.summary}</p>
                {destination && (
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="mt-3 inline-block font-semibold text-terracotta-deep underline decoration-2 underline-offset-4 hover:text-ink"
                  >
                    Ver {destination.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
