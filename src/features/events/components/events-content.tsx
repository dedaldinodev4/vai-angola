import Link from "next/link";

import { fieldClass, primaryButtonClass, textLinkClass } from "@/components/ui/styles";

import { PROVINCES } from "@/lib/constants/provinces";
import { getToday } from "@/lib/utils/today";
import type { RawSearchParams } from "@/lib/utils/search-params";

import { listAllEvents } from "../utils/query-events";
import { buildEventsHref, parseEventFilters } from "../utils/event-filters";
import { getEventStatus, listEvents } from "../utils/status";

import { EventRow } from "./event-row";

/** Lê o URL e o relógio: tem de ficar dentro de <Suspense> (cacheComponents). */
export async function EventsContent({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const filters = parseEventFilters(await searchParams);
  const today = await getToday();
  const all = await listAllEvents();
  const { upcoming, past, pastCount } = listEvents(all, filters, today);
  const active = filters.province !== null || filters.includePast;

  return (
    <>
      <form method="get" action="/events" role="search" aria-label="Filtrar eventos" className="mt-10 border-y border-ink/20 py-8">
        <div className="grid gap-5 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <label htmlFor="e-provincia" className="font-semibold">
              Província
            </label>
            <select id="e-provincia" name="province" defaultValue={filters.province ?? ""} className={fieldClass}>
              <option value="">Todas as províncias</option>
              {PROVINCES.map((p) => (
                <option key={p.slug} value={p.slug}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <label className="flex min-h-11 items-center gap-2 md:col-span-4">
            <input
              type="checkbox"
              name="pastEvents"
              value="1"
              defaultChecked={filters.includePast}
              className="size-5 accent-terracotta-deep"
            />
            Mostrar também eventos terminados
          </label>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 md:col-span-3">
            <button type="submit" className={primaryButtonClass}>
              Aplicar
            </button>
            {active && (
              <Link href="/events" className={textLinkClass}>
                Limpar filtros
              </Link>
            )}
          </div>
        </div>
      </form>

      <section aria-labelledby="proximos-title" className="mt-12">
        <h2 id="proximos-title" className="text-3xl">
          Próximos
        </h2>
        {upcoming.length === 0 ? (
          <p className="mt-4 max-w-xl text-lg text-ink/80">
            Não há eventos próximos{filters.province ? " nesta província" : ""}.
          </p>
        ) : (
          <ul className="mt-6">
            {upcoming.map((event) => (
              <EventRow key={event.id} event={event} status={getEventStatus(event.date, today)} />
            ))}
          </ul>
        )}
        {!filters.includePast && pastCount > 0 && (
          <p className="mt-6 text-ink/80">
            Há {pastCount} {pastCount === 1 ? "evento terminado" : "eventos terminados"}.{" "}
            <Link href={buildEventsHref({ ...filters, includePast: true })} className={textLinkClass}>
              Mostrar
            </Link>
          </p>
        )}
      </section>

      {past.length > 0 && (
        <section aria-labelledby="terminados-title" className="mt-16">
          <h2 id="terminados-title" className="text-3xl">
            Já aconteceram
          </h2>
          <ul className="mt-6">
            {past.map((event) => (
              <EventRow key={event.id} event={event} status="past" />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export function EventsFallback() {
  return (
    <p role="status" className="mt-10 text-ink/70">
      A carregar eventos...
    </p>
  );
}
