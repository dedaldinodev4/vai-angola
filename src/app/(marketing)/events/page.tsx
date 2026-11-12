import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/layout/container";
import { EventsContent, EventsFallback } from "@/features/events/components/events-content";

export const metadata: Metadata = {
  title: "Eventos",
  description: "Agenda de eventos de demonstração por província, com tratamento de eventos já terminados.",
};

export default function EventsPage(props: PageProps<"/events">) {
  return (
    <Container className="py-12 md:py-20">
      <h1 className="max-w-3xl">Eventos</h1>
      <p className="mt-5 max-w-xl text-lg text-ink/80">
        Uma agenda para marcar o calendário. Todos os eventos são fictícios e servem para demonstrar a página.
      </p>
      <Suspense fallback={<EventsFallback />}>
        <EventsContent searchParams={props.searchParams} />
      </Suspense>
    </Container>
  );
}
