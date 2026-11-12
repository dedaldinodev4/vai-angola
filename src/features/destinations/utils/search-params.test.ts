import { describe, expect, it } from "vitest";
import { DEFAULT_QUERY } from "./discovery";
import { buildExploreHref, parseDiscoveryQuery } from "./search-params";

describe("parseDiscoveryQuery", () => {
  it("devolve o padrão sem parâmetros", () => {
    expect(parseDiscoveryQuery({})).toEqual(DEFAULT_QUERY);
  });

  it("lê parâmetros válidos", () => {
    expect(
      parseDiscoveryQuery({ q: " queda ", province: "malanje", category: ["nature", "beach"], order: "name", page: "2" }),
    ).toEqual({ q: "queda", province: "malanje", categories: ["nature", "beach"], sort: "name", page: 2 });
  });

  it("aceita uma só categoria como texto", () => {
    expect(parseDiscoveryQuery({ category: "beach" }).categories).toEqual(["beach"]);
  });

  it("ignora valores inválidos", () => {
    const result = parseDiscoveryQuery({
      province: "atlantida",
      category: ["beach", "xyz", "beach"],
      order: "aleatorio",
      page: "-3",
    });
    expect(result.province).toBeNull();
    expect(result.categories).toEqual(["beach"]);
    expect(result.sort).toBe("discovery");
    expect(result.page).toBe(1);
  });

  it("trata página não numérica e demasiado grande", () => {
    expect(parseDiscoveryQuery({ page: "abc" }).page).toBe(1);
    expect(parseDiscoveryQuery({ page: "99999" }).page).toBe(1);
    expect(parseDiscoveryQuery({ page: "1.5" }).page).toBe(1);
  });

  it("limita o tamanho da pesquisa", () => {
    expect(parseDiscoveryQuery({ q: "a".repeat(500) }).q).toHaveLength(80);
  });

  it("usa o primeiro valor quando um parâmetro escalar se repete", () => {
    expect(parseDiscoveryQuery({ province: ["luanda", "huila"] }).province).toBe("luanda");
  });
});

describe("buildExploreHref", () => {
  it("devolve /explore sem filtros", () => {
    expect(buildExploreHref()).toBe("/explore");
    expect(buildExploreHref(DEFAULT_QUERY)).toBe("/explore");
  });

  it("omite valores padrão e inclui os restantes", () => {
    expect(buildExploreHref({ province: "huila", categories: ["nature", "beach"], sort: "name", page: 2 })).toBe(
      "/explore?province=huila&category=nature&category=beach&order=name&page=2",
    );
  });

  it("codifica a pesquisa", () => {
    expect(buildExploreHref({ q: "queda de água" })).toBe("/explore?q=queda+de+%C3%A1gua");
  });

  it("é inverso de parseDiscoveryQuery", () => {
    const query = { q: "mar", province: "luanda" as const, categories: ["beach" as const], sort: "province" as const, page: 2 };
    const url = new URL(buildExploreHref(query), "http://x");
    const raw = { q: url.searchParams.get("q") ?? undefined, province: url.searchParams.get("province") ?? undefined, category: url.searchParams.getAll("category"), order: url.searchParams.get("order") ?? undefined, page: url.searchParams.get("page") ?? undefined };
    expect(parseDiscoveryQuery(raw)).toEqual(query);
  });
});
