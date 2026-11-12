import type { Metadata } from "next";
import { Suspense } from "react";

import { getEventBySlug, listAllEvents } from "@/features/events/utils/query-events";
import EventSkeleton from "@/features/events/components/event-skeleton";
import EventDetail from "@/features/events/components/event-details";

export async function generateStaticParams() {
  const all = await listAllEvents();
  return all.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: PageProps<"/events/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const event = await getEventBySlug(slug);
  return event
    ? { title: event.title, description: `${event.summary} (evento fictício de demonstração)` }
    : { title: "Evento não encontrado" };
}

export default async function EventPage(props: PageProps<"/events/[slug]">) {

  return (
    <Suspense fallback={<EventSkeleton />}>
      <EventDetail params={props.params} />
    </Suspense>
  );
}
