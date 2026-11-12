import { first, type RawSearchParams } from "@/lib/utils/search-params";
import { DEFAULT_EVENT_FILTERS, type EventFilters } from "./status";
import { eventSchema } from "../schemas/events-schema";


export function parseEventFilters(raw: RawSearchParams): EventFilters {
  const parsed = eventSchema.parse({ province: first(raw.province), pastEvents: first(raw.pastEvents) });
  return { province: parsed.province, includePast: parsed.pastEvents };
}

export function buildEventsHref(filters: Partial<EventFilters> = {}): string {
  const params = new URLSearchParams();
  if (filters.province) params.set("province", filters.province);
  if (filters.includePast) params.set("pastEvents", "1");
  const qs = params.toString();
  return qs ? `/events?${qs}` : "/events";
}

export { DEFAULT_EVENT_FILTERS };
