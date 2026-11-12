import { provinceSlugOf, type ProvinceName, type ProvinceSlug } from "@/lib/constants/provinces";
import type { Destination } from "@/types";

export type ProvinceSummary = {
  name: Destination["province"];
  slug: ProvinceSlug;
  count: number;
};

/** Províncias que têm destinos, ordenadas alfabeticamente (pt). */
export function summarizeProvinces(items: readonly Destination[]): ProvinceSummary[] {
  const counts = new Map<Destination["province"], number>();
  for (const item of items) {
    counts.set(item.province, (counts.get(item.province) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: provinceSlugOf(name as ProvinceName), count }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt"));
}
