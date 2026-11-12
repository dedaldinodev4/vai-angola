
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { Container } from "@/components/layout/container";
import { DestinationCard } from "@/features/destinations/components/destination-card";
import { destinationRepository } from "@/features/destinations/repositories/destination-repository";

import { EventStatusFallback, EventStatusNotice, OtherEvents } from "@/features/events/components/event-notice";
import { getEventBySlug } from "@/features/events/utils/query-events";
import { buildEventsHref } from "@/features/events/utils/event-filters";

import { formatFullDate } from "@/lib/formatters/date";
import { provinceSlugOf } from "@/lib/constants/provinces";

interface DestinationContentProps {
  params: Promise<{ slug: string }>;
}


export default async function EventDetail({ params }: DestinationContentProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const destination = event.destinationSlug ? await destinationRepository.getBySlug(event.destinationSlug) : undefined;

  return (
    <Container className="py-12 md:py-20">
      <nav aria-label="Localização">
        <Link href="/events" className="font-semibold text-terracotta-deep underline underline-offset-4 hover:text-ink">
          Todos os eventos
        </Link>
      </nav>

      <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <p className="font-semibold text-olive-deep">
            <Link
              href={buildEventsHref({ province: provinceSlugOf(event.province) })}
              className="underline-offset-4 hover:underline"
            >
              {event.province}
            </Link>
          </p>
          <h1 className="mt-2">{event.title}</h1>

          <p className="mt-6 font-display text-2xl">
            <time dateTime={event.date}>{formatFullDate(event.date)}</time>
          </p>
          <Suspense fallback={<EventStatusFallback />}>
            <EventStatusNotice date={event.date} />
          </Suspense>

          <p className="mt-8 max-w-[56ch] text-lg text-ink/85">{event.description}</p>
          <p className="mt-8 max-w-md text-sm text-ink/70">
            Evento fictício, criado para demonstração. Local exato e direções só serão mostrados quando existirem dados
            verificados.
          </p>
        </div>

        {destination && (
          <aside aria-labelledby="local-title" className="lg:col-span-5">
            <h2 id="local-title" className="text-2xl">
              Em ou perto de
            </h2>
            <DestinationCard destination={destination} imageClassName="aspect-[4/3]" className="mt-5" />
          </aside>
        )}
      </div>

      <Suspense fallback={null}>
        <OtherEvents currentSlug={event.slug} />
      </Suspense>
    </Container>
  );
}
