import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { ExploreContent, ExploreFallback } from "@/features/destinations/components/explore-content";

export const metadata: Metadata = {
  title: "Explorar destinos",
  description: "Pesquisa e filtra destinos de demonstração por província e categoria.",
};

export default function ExplorePage(props: PageProps<"/explore">) {
  return (
    <Container className="py-12 md:py-20">
      <h1 className="max-w-3xl">Explorar destinos</h1>
      <p className="mt-5 max-w-xl text-lg text-ink/80">
        Pesquisa por nome ou atividade e combina província e categoria. Todos os destinos são de demonstração.
      </p>
      <Suspense fallback={<ExploreFallback />}>
        <ExploreContent searchParams={props.searchParams} />
      </Suspense>
    </Container>
  );
}
