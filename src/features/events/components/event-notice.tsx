import { getToday } from "@/lib/utils/today";
import { listAllEvents } from "../utils/query-events";
import {
  daysBetween, getEventStatus,
  listEvents, DEFAULT_EVENT_FILTERS
} from "../utils/status";
import { EventRow } from "./event-row";

/** Estado do evento face ao dia de hoje (em Luanda). Dentro de <Suspense>. */
export async function EventStatusNotice({ date }: { date: string }) {
  const today = await getToday();
  const status = getEventStatus(date, today);
  const days = daysBetween(today, date);

  const text =
    status === "past"
      ? "Este evento já terminou."
      : status === "today"
        ? "Acontece hoje."
        : days === 1
          ? "Acontece amanhã."
          : `Faltam ${days} dias.`;

  return (
    <p
      className={`mt-6 inline-block border-l-4 py-1 pl-4 font-semibold ${status === "past" ? "border-ink/40 text-ink/75" : "border-terracotta-deep text-ink"
        }`}
    >
      {text}
    </p>
  );
}

export function EventStatusFallback() {
  return <p className="mt-6 min-h-8 text-sm text-ink/70">A confirmar o estado do evento...</p>;
}

/** Até dois outros eventos que ainda não aconteceram. Dentro de <Suspense>. */
export async function OtherEvents({ currentSlug }: { currentSlug: string }) {
  const today = await getToday();
  const all = await listAllEvents();
  const others = listEvents(all, DEFAULT_EVENT_FILTERS, today)
    .upcoming.filter((e) => e.slug !== currentSlug)
    .slice(0, 2);

  if (others.length === 0) return null;

  return (
    <section aria-labelledby="outros-eventos-title" className="mt-20">
      <h2 id="outros-eventos-title" className="text-3xl">
        Outros eventos
      </h2>
      <ul className="mt-6">
        {others.map((event) => (
          <EventRow key={event.id} event={event} status={getEventStatus(event.date, today)} />
        ))}
      </ul>
    </section>
  );
}
