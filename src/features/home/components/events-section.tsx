import { Container } from "@/components/layout/container";

import { EventRow } from "@/features/events/components/event-row";
import { listAllEvents } from "@/features/events/utils/query-events";
import { 
  DEFAULT_EVENT_FILTERS, 
  getEventStatus, 
  listEvents 
} from "@/features/events/utils/status";

import { getToday } from "@/lib/utils/today";

import { SectionHeading } from "./section-heading";


function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section aria-labelledby="eventos-title" className="bg-sand/45 py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHeading
            id="eventos-title"
            title="Na agenda"
            description="Eventos fictícios, criados para demonstrar o layout. Não correspondem a acontecimentos reais."
            href="/events"
            linkLabel="Ver todos os eventos"
          />
        </div>
        <div className="lg:col-span-8">{children}</div>
      </Container>
    </section>
  );
}

export async function EventsSection() {
  const today = await getToday();
  const all = await listAllEvents();
  const { upcoming } = listEvents(all, DEFAULT_EVENT_FILTERS, today);

  return (
    <Shell>
      {upcoming.length === 0 ? (
        <p className="text-lg text-ink/80">Não há eventos próximos de momento.</p>
      ) : (
        <ul>
          {upcoming.slice(0, 4).map((event) => (
            <EventRow key={event.id} event={event} status={getEventStatus(event.date, today)} />
          ))}
        </ul>
      )}
    </Shell>
  );
}

export function EventsSectionFallback() {
  return (
    <Shell>
      <p role="status" className="text-ink/70">
        A carregar eventos...
      </p>
    </Shell>
  );
}
