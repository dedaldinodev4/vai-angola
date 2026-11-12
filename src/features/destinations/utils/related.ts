import type { Destination } from "@/types";

/** Destinos parecidos: mesma província pesa mais do que categorias partilhadas. Só devolve os que têm algo em comum. */
export function getRelatedDestinations(
  all: readonly Destination[],
  current: Destination,
  limit = 3,
): Destination[] {
  const collator = new Intl.Collator("pt", { sensitivity: "base" });
  return all
    .filter((d) => d.id !== current.id)
    .map((d) => ({
      d,
      score:
        (d.province === current.province ? 2 : 0) + d.categories.filter((c) => current.categories.includes(c)).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || collator.compare(a.d.name, b.d.name))
    .slice(0, limit)
    .map(({ d }) => d);
}
