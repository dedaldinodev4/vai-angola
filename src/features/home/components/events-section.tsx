import { Container } from "@/components/layout/container";

import { eventDateParts } from "@/lib/formatters/date";
import { events } from "@/mocks/events";

import { SectionHeading } from "./section-heading";

export function EventsSection() {
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
        <ul className="lg:col-span-8">
          {events.map((event) => {
            const { day, month, weekday } = eventDateParts(event.date);
            return (
              <li
                key={event.id}
                className="grid grid-cols-[4.5rem_1fr] gap-6 border-t border-ink/25 py-6 last:border-b md:grid-cols-[6rem_1fr]"
              >
                <time dateTime={event.date} className="block">
                  <span className="block font-display text-5xl leading-none md:text-6xl">{day}</span>
                  <span className="mt-1 block text-sm text-ink/75">{month}</span>
                </time>
                <div>
                  <h3 className="text-2xl">{event.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-olive-deep">
                    {event.province}, {weekday}
                  </p>
                  <p className="mt-2 max-w-xl text-ink/80">{event.summary}</p>
                  <p className="mt-2 text-sm text-ink/70">Evento fictício</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
