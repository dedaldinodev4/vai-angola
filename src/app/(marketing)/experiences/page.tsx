import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/layout/container";

import {
  ExperiencesContent,
  ExperiencesFallback,
} from "@/features/experiences/components/experiences-content";

export const metadata: Metadata = {
  title: "Experiências",
  description: "Ideias de experiências de demonstração, filtradas por província e categoria.",
};

export default function ExperiencesPage(props: PageProps<"/experiences">) {
  return (
    <Container className="py-12 md:py-20">
      <h1 className="max-w-3xl">Experiências</h1>
      <p className="mt-5 max-w-xl text-lg text-ink/80">
        Atividades e vivências ligadas a cada destino. Descrições ilustrativas, sem preços nem horários.
      </p>
      <Suspense fallback={<ExperiencesFallback />}>
        <ExperiencesContent searchParams={props.searchParams} />
      </Suspense>
    </Container>
  );
}
