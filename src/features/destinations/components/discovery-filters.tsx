import Link from "next/link";

import { CATEGORIES } from "@/lib/constants/categories";
import { PROVINCES } from "@/lib/constants/provinces";

import { SORT_OPTIONS, hasActiveFilters, type DiscoveryQuery } from "../utils/discovery";


const fieldClass =
  "mt-1 block min-h-11 w-full rounded-md border border-ink/40 bg-white px-3 text-ink";


export function DiscoveryFilters({ query }: { query: DiscoveryQuery }) {
  const active = hasActiveFilters(query);

  return (
    <form method="get" action="/explore" role="search" aria-label="Filtrar destinos" className="space-y-6">
      <div className="grid gap-5 md:grid-cols-12">
        <div className="md:col-span-5">
          <label htmlFor="f-q" className="font-semibold">
            Pesquisar
          </label>
          <input
            id="f-q"
            type="search"
            name="q"
            defaultValue={query.q}
            maxLength={80}
            placeholder="Nome, atividade ou província"
            className={fieldClass}
          />
        </div>
        <div className="md:col-span-4">
          <label htmlFor="f-provincia" className="font-semibold">
            Província
          </label>
          <select id="f-provincia" name="provincia" defaultValue={query.province ?? ""} className={fieldClass}>
            <option value="">Todas as províncias</option>
            {PROVINCES.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-3">
          <label htmlFor="f-ordem" className="font-semibold">
            Ordenar por
          </label>
          <select id="f-ordem" name="ordem" defaultValue={query.sort} className={fieldClass}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.id} value={o.id}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <fieldset>
        <legend className="font-semibold">Categorias</legend>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
          {CATEGORIES.map((c) => (
            <label key={c.id} className="flex min-h-11 items-center gap-2">
              <input
                type="checkbox"
                name="categoria"
                value={c.id}
                defaultChecked={query.categories.includes(c.id)}
                className="size-5 accent-terracotta-deep"
              />
              {c.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center rounded-md bg-terracotta-deep px-7 font-semibold text-white transition-colors duration-(--duration-fast) hover:bg-ink"
        >
          Aplicar filtros
        </button>
        {active && (
          <Link
            href="/explore"
            className="font-semibold underline decoration-terracotta decoration-2 underline-offset-4 hover:text-terracotta-deep"
          >
            Limpar filtros
          </Link>
        )}
      </div>
    </form>
  );
}
