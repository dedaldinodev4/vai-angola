import type { Destination } from "@/types";

export type ProvinceSummary = {
  name: string;
  slug: string;
  count: number;
};

/** "Huíla" -> "huila" */
export function provinceSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
}

/** Províncias que têm destinos, ordenadas alfabeticamente (pt). */
export function summarizeProvinces(items: readonly Destination[]): ProvinceSummary[] {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item.province, (counts.get(item.province) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, slug: provinceSlug(name), count }))
    .sort((a, b) => a.name.localeCompare(b.name, "pt"));
}
