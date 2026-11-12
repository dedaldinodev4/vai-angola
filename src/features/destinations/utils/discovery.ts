import { categoryLabel, type CategoryId } from "@/lib/constants/categories";
import { provinceSlugOf, type ProvinceName, type ProvinceSlug } from "@/lib/constants/provinces";
import type { Destination } from "@/types";

export const SORT_OPTIONS = [
  { id: "discovery", label: "Em destaque" },
  { id: "name", label: "Nome (A a Z)" },
  { id: "province", label: "Província" },
] as const;

export type SortId = (typeof SORT_OPTIONS)[number]["id"];

export function isSortId(value: string): value is SortId {
  return SORT_OPTIONS.some((o) => o.id === value);
}

export const PAGE_SIZE = 6;

export type DiscoveryQuery = {
  q: string;
  province: ProvinceSlug | null;
  categories: CategoryId[];
  sort: SortId;
  page: number;
};

export const DEFAULT_QUERY: DiscoveryQuery = {
  q: "",
  province: null,
  categories: [],
  sort: "discovery",
  page: 1,
};

/** Minúsculas, sem acentos, sem espaços nas pontas. */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function searchableText(d: Destination): string {
  return normalizeText(
    [d.name, d.shortDescription, d.description, d.province, ...d.activities, ...d.categories.map(categoryLabel)].join(
      " ",
    ),
  );
}

/** Todas as palavras da pesquisa têm de aparecer (ignora acentos e maiúsculas). */
export function searchDestinations(items: readonly Destination[], q: string): Destination[] {
  const terms = normalizeText(q).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [...items];
  return items.filter((d) => {
    const text = searchableText(d);
    return terms.every((term) => text.includes(term));
  });
}

/** Província e categorias combinam com E; dentro das categorias basta uma (OU). */
export function filterDestinations(
  items: readonly Destination[],
  filters: Pick<DiscoveryQuery, "province" | "categories">,
): Destination[] {
  const { province, categories } = filters;
  return items.filter((d) => {
    const provinceOk = province === null || provinceSlugOf(d.province as ProvinceName) === province;
    const categoryOk = categories.length === 0 || d.categories.some((c) => categories.includes(c));
    return provinceOk && categoryOk;
  });
}

export function sortDestinations(items: readonly Destination[], sort: SortId): Destination[] {
  const collator = new Intl.Collator("pt", { sensitivity: "base" });
  const byName = (a: Destination, b: Destination) => collator.compare(a.name, b.name);
  const copy = [...items];
  switch (sort) {
    case "name":
      return copy.sort(byName);
    case "province":
      return copy.sort((a, b) => collator.compare(a.province, b.province) || byName(a, b));
    case "discovery":
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured) || byName(a, b));
  }
}

export type Page<T> = {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
};

/** Limita `page` ao intervalo válido, para que páginas fora do alcance não fiquem vazias. */
export function paginate<T>(items: readonly T[], page: number, pageSize: number): Page<T> {
  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Number.isFinite(page) ? Math.floor(page) : 1;
  const current = Math.min(Math.max(1, safePage), totalPages);
  const start = (current - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), page: current, totalPages, totalItems };
}

export function discover(
  items: readonly Destination[],
  query: DiscoveryQuery,
  pageSize: number = PAGE_SIZE,
): Page<Destination> {
  const matched = filterDestinations(searchDestinations(items, query.q), query);
  return paginate(sortDestinations(matched, query.sort), query.page, pageSize);
}

export function hasActiveFilters(query: DiscoveryQuery): boolean {
  return query.q.trim() !== "" || query.province !== null || query.categories.length > 0;
}
