import type { ProvinceSlug } from "@/lib/constants/provinces";
import { provinceSlugOf } from "@/lib/constants/provinces";
import type { AppEvent, EventStatus } from "@/types";

export type EventFilters = {
  province: ProvinceSlug | null;
  includePast: boolean;
};

export const DEFAULT_EVENT_FILTERS: EventFilters = { province: null, includePast: false };

/** Datas ISO (AAAA-MM-DD) comparam-se corretamente como texto. `today` vem de quem chama. */
export function getEventStatus(date: string, today: string): EventStatus {
  if (date < today) return "past";
  if (date === today) return "today";
  return "upcoming";
}

export type EventListing = {
  upcoming: AppEvent[];
  past: AppEvent[];
  pastCount: number;
};

export function listEvents(events: readonly AppEvent[], filters: EventFilters, today: string): EventListing {
  const inProvince = events.filter((e) => filters.province === null || provinceSlugOf(e.province) === filters.province);
  const upcoming = inProvince.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const allPast = inProvince.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));

  return {
    upcoming,
    past: filters.includePast ? allPast : [],
    pastCount: allPast.length
  };
}

/** Dias de calendário entre duas datas ISO (negativo se `to` for anterior a `from`). */
export function daysBetween(from: string, to: string): number {
  const ms = Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`);
  return Math.round(ms / 86_400_000);
}
