import { describe, expect, it } from "vitest";
import { destinations } from "@/mocks/destinations";
import { getRelatedDestinations } from "./related";
import { summarizeProvinces } from "./provinces";

const bySlug = (slug: string) => destinations.find((d) => d.slug === slug)!;

describe("getRelatedDestinations", () => {
  it("não inclui o próprio destino", () => {
    const current = bySlug("quedas-de-kalandula");
    expect(getRelatedDestinations(destinations, current).some((d) => d.id === current.id)).toBe(false);
  });

  it("dá prioridade à mesma província e a categorias partilhadas", () => {
    const related = getRelatedDestinations(destinations, bySlug("quedas-de-kalandula"));
    expect(related[0].slug).toBe("pedras-negras-de-pungo-andongo");
  });

  it("respeita o limite e não devolve destinos sem nada em comum", () => {
    const current = bySlug("praia-morena");
    const related = getRelatedDestinations(destinations, current, 2);
    expect(related.length).toBeLessThanOrEqual(2);
    expect(related.every((d) => d.province === current.province || d.categories.some((c) => current.categories.includes(c)))).toBe(true);
  });
});

describe("summarizeProvinces", () => {
  it("conta destinos por província, por ordem alfabética", () => {
    const summary = summarizeProvinces(destinations);
    expect(summary.map((s) => s.name)).toEqual(["Benguela", "Huíla", "Luanda", "Malanje"]);
    expect(summary.find((s) => s.name === "Luanda")).toMatchObject({ count: 3, slug: "luanda" });
  });
});
