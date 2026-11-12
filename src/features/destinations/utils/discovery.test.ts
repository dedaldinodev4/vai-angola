import { describe, expect, it } from "vitest";
import { destinations } from "@/mocks/destinations";
import {
  DEFAULT_QUERY,
  discover,
  filterDestinations,
  hasActiveFilters, 
  normalizeText,
  paginate, 
  searchDestinations,
  sortDestinations,
} from "./discovery";

const all = [...destinations];
const names = (items: { name: string }[]) => items.map((d) => d.name);

describe("normalizeText", () => {
  it("remove acentos, maiúsculas e espaços", () => {
    expect(normalizeText("  Huíla ")).toBe("huila");
    expect(normalizeText("HISTÓRIA")).toBe("historia");
  });
});

describe("searchDestinations", () => {
  it("devolve tudo quando a pesquisa está vazia", () => {
    expect(searchDestinations(all, "   ")).toHaveLength(all.length);
  });

  it("ignora acentos e maiúsculas", () => {
    expect(names(searchDestinations(all, "HUILA"))).toEqual(
      expect.arrayContaining(["Fenda da Tundavala", "Serra da Leba"]),
    );
  });

  it("exige todas as palavras", () => {
    expect(names(searchDestinations(all, "queda kalandula"))).toEqual(["Quedas de Kalandula"]);
    expect(searchDestinations(all, "kalandula praia")).toEqual([]);
  });

  it("encontra por atividade e por categoria", () => {
    expect(names(searchDestinations(all, "passeio de barco"))).toContain("Ilha do Mussulo");
    expect(names(searchDestinations(all, "história"))).toContain("Fortaleza de São Miguel");
  });

  it("não altera a lista original", () => {
    const copy = [...all];
    searchDestinations(all, "queda");
    expect(all).toEqual(copy);
  });
});

describe("filterDestinations", () => {
  it("filtra por província", () => {
    const result = filterDestinations(all, { province: "luanda", categories: [] });
    expect(result.every((d) => d.province === "Luanda")).toBe(true);
    expect(result).toHaveLength(3);
  });

  it("categorias: basta uma (OU)", () => {
    const result = filterDestinations(all, { province: null, categories: ["beach", "history"] });
    expect(names(result)).toEqual(
      expect.arrayContaining(["Ilha do Mussulo", "Praia Morena", "Fortaleza de São Miguel"]),
    );
  });

  it("combina província e categoria (E)", () => {
    const result = filterDestinations(all, { province: "luanda", categories: ["beach"] });
    expect(names(result)).toEqual(["Ilha do Mussulo"]);
  });

  it("sem filtros devolve tudo", () => {
    expect(filterDestinations(all, { province: null, categories: [] })).toHaveLength(all.length);
  });

  it("província sem destinos devolve lista vazia", () => {
    expect(filterDestinations(all, { province: "cabinda", categories: [] })).toEqual([]);
  });
});

describe("sortDestinations", () => {
  it("ordena por nome com collation portuguesa", () => {
    const sorted = names(sortDestinations(all, "name"));
    expect(sorted).toEqual([...sorted].sort((a, b) => a.localeCompare(b, "pt", { sensitivity: "base" })));
  });

  it("destaque coloca os em destaque primeiro", () => {
    const sorted = sortDestinations(all, "discovery");
    const firstNonFeatured = sorted.findIndex((d) => !d.featured);
    expect(sorted.slice(firstNonFeatured).every((d) => !d.featured)).toBe(true);
  });

  it("ordena por província e depois por nome", () => {
    const sorted = sortDestinations(all, "province");
    expect(sorted[0].province).toBe("Benguela");
  });

  it("não altera a lista original", () => {
    const copy = [...all];
    sortDestinations(all, "name");
    expect(all).toEqual(copy);
  });
});

describe("paginate", () => {
  const items = Array.from({ length: 8 }, (_, i) => i + 1);

  it("divide em páginas", () => {
    expect(paginate(items, 1, 6)).toMatchObject({ items: [1, 2, 3, 4, 5, 6], page: 1, totalPages: 2, totalItems: 8 });
    expect(paginate(items, 2, 6).items).toEqual([7, 8]);
  });

  it("limita páginas fora do intervalo", () => {
    expect(paginate(items, 99, 6).page).toBe(2);
    expect(paginate(items, 0, 6).page).toBe(1);
    expect(paginate(items, Number.NaN, 6).page).toBe(1);
  });

  it("lista vazia tem uma página", () => {
    expect(paginate([], 1, 6)).toMatchObject({ items: [], page: 1, totalPages: 1, totalItems: 0 });
  });
});

describe("discover (filtros combinados)", () => {
  it("aplica pesquisa, província, categoria, ordem e página", () => {
    const result = discover(all, { ...DEFAULT_QUERY, q: "fotografia", province: "malanje", categories: ["nature"], sort: "name" });
    expect(names(result.items)).toEqual(["Pedras Negras de Pungo Andongo", "Quedas de Kalandula"]);
    expect(result.totalItems).toBe(2);
  });

  it("com a pesquisa padrão devolve a primeira página completa", () => {
    const result = discover(all, DEFAULT_QUERY);
    expect(result.items).toHaveLength(6);
    expect(result.totalPages).toBe(2);
  });

  it("limpar filtros volta ao conjunto completo", () => {
    const filtered = discover(all, { ...DEFAULT_QUERY, province: "huila" });
    const cleared = discover(all, DEFAULT_QUERY);
    expect(filtered.totalItems).toBeLessThan(cleared.totalItems);
    expect(cleared.totalItems).toBe(all.length);
  });

  it("combinação sem resultados devolve vazio", () => {
    expect(discover(all, { ...DEFAULT_QUERY, province: "huila", categories: ["beach"] }).totalItems).toBe(0);
  });
});

describe("hasActiveFilters", () => {
  it("deteta filtros ativos", () => {
    expect(hasActiveFilters(DEFAULT_QUERY)).toBe(false);
    expect(hasActiveFilters({ ...DEFAULT_QUERY, q: " x " })).toBe(true);
    expect(hasActiveFilters({ ...DEFAULT_QUERY, province: "luanda" })).toBe(true);
    expect(hasActiveFilters({ ...DEFAULT_QUERY, categories: ["beach"] })).toBe(true);
    expect(hasActiveFilters({ ...DEFAULT_QUERY, sort: "name" })).toBe(false);
  });
});
