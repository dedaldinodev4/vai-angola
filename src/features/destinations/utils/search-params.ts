import { z } from "zod";
import { isCategoryId, type CategoryId } from "@/lib/constants/categories";
import { isProvinceSlug, type ProvinceSlug } from "@/lib/constants/provinces";
import { DEFAULT_QUERY, isSortId, type DiscoveryQuery, type SortId } from "./discovery";

export type RawSearchParams = Record<string, string | string[] | undefined>;

const MAX_QUERY_LENGTH = 80;
const MAX_PAGE = 1000;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value);
const many = (value: string | string[] | undefined) =>
  value === undefined ? [] : Array.isArray(value) ? value : [value];

const schema = z.object({
  q: z
    .string()
    .optional()
    .transform((v) => (v ?? "").trim().slice(0, MAX_QUERY_LENGTH)),
  province: z
    .string()
    .optional()
    .transform((v): ProvinceSlug | null => (v !== undefined && isProvinceSlug(v) ? v : null)),
  category: z.array(z.string()).transform((values): CategoryId[] => [...new Set(values.filter(isCategoryId))]),
  order: z
    .string()
    .optional()
    .transform((v): SortId => (v !== undefined && isSortId(v) ? v : DEFAULT_QUERY.sort)),
  page: z.coerce.number().int().min(1).max(MAX_PAGE).catch(1),
});

/** Converte parâmetros do URL (não confiáveis) numa pesquisa válida. Valores inválidos viram o padrão. */
export function parseDiscoveryQuery(raw: RawSearchParams): DiscoveryQuery {
  const parsed = schema.parse({
    q: first(raw.q),
    province: first(raw.province),
    category: many(raw.category),
    order: first(raw.order),
    page: first(raw.page),
  });
  return {
    q: parsed.q,
    province: parsed.province,
    categories: parsed.category,
    sort: parsed.order,
    page: parsed.page,
  };
}

/** Constrói o URL de /explore, omitindo valores padrão. */
export function buildExploreHref(query: Partial<DiscoveryQuery> = {}): string {
  const params = new URLSearchParams();
  const q = query.q?.trim();
  if (q) params.set("q", q);
  if (query.province) params.set("province", query.province);
  for (const category of query.categories ?? []) params.append("category", category);
  if (query.sort && query.sort !== DEFAULT_QUERY.sort) params.set("order", query.sort);
  if (query.page && query.page > 1) params.set("page", String(query.page));
  const qs = params.toString();
  return qs ? `/explore?${qs}` : "/explore";
}
