import { describe, expect, it } from "vitest";
import { destinations } from "@/mocks/destinations";
import { experiences } from "@/mocks/experiences";

import { DEFAULT_EXPERIENCE_FILTERS, filterExperiences } from "./filters";
import { parseExperienceFilters } from "./parse-filters";

const slugs = (list: { destinationSlug: string }[]) => list.map((e) => e.destinationSlug);

describe("filterExperiences", () => {
  it("sem filtros devolve tudo", () => {
    expect(filterExperiences(experiences, destinations, DEFAULT_EXPERIENCE_FILTERS)).toHaveLength(experiences.length);
  });

  it("filtra pela província do destino", () => {
    const result = filterExperiences(experiences, destinations, { province: "malanje", categories: [] });
    expect(slugs(result).sort()).toEqual(["pedras-negras-de-pungo-andongo", "quedas-de-kalandula"]);
  });

  it("filtra pelas categorias do destino (basta uma)", () => {
    const result = filterExperiences(experiences, destinations, { province: null, categories: ["beach"] });
    expect(slugs(result).sort()).toEqual(["ilha-do-mussulo", "praia-morena"]);
  }); 

  it("combina província e categoria", () => {
    const result = filterExperiences(experiences, destinations, { province: "luanda", categories: ["beach"] });
    expect(slugs(result)).toEqual(["ilha-do-mussulo"]);
  });

  it("combinação sem resultados devolve vazio", () => {
    expect(filterExperiences(experiences, destinations, { province: "huila", categories: ["beach"] })).toEqual([]);
  });

  it("experiência com destino desconhecido só aparece sem filtros", () => {
    const orphan = [{ ...experiences[0], destinationSlug: "nao-existe" }];
    expect(filterExperiences(orphan, destinations, DEFAULT_EXPERIENCE_FILTERS)).toHaveLength(1);
    expect(filterExperiences(orphan, destinations, { province: "luanda", categories: [] })).toEqual([]);
  });
});

describe("parseExperienceFilters", () => {
  it("lê e valida", () => {
    expect(parseExperienceFilters({ province: "luanda", category: ["beach", "xx"] })).toEqual({
      province: "luanda",
      categories: ["beach"],
    });
    expect(parseExperienceFilters({ province: "xx" })).toEqual(DEFAULT_EXPERIENCE_FILTERS);
  });
});
