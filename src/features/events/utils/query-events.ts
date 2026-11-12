import { events } from "@/mocks/events";
import type { AppEvent } from "@/types";

export async function listAllEvents(): Promise<AppEvent[]> {
  return [...events];
}

export async function getEventBySlug(slug: string): Promise<AppEvent | undefined> {
  return events.find((e) => e.slug === slug);
}
