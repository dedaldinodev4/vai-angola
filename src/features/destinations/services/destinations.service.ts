import { destinations } from "@/mocks/destinations";
import type { Destination } from "@/types";

/** Acesso aos dados de demonstração. Na Fase 3 passa a repositório. */
export function getPublishedDestinations(): Destination[] {
  return destinations.filter((d) => d.published);
}

export function getFeaturedDestinations(): Destination[] {
  return getPublishedDestinations().filter((d) => d.featured);
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return getPublishedDestinations().find((d) => d.slug === slug);
}
