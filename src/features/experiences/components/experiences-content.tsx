import Link from "next/link";
import { fieldClass, primaryButtonClass, textLinkClass } from "@/components/ui/styles";

import { destinationRepository } from "@/features/destinations/repositories/destination-repository";

import { CATEGORIES } from "@/lib/constants/categories";
import { PROVINCES } from "@/lib/constants/provinces";
import type { RawSearchParams } from "@/lib/utils/search-params";

import { filterExperiences } from "../utils/filters";
import { listExperiences } from "../utils/queries";
import { parseExperienceFilters } from "../utils/parse-filters";

import { ExperienceCard } from "./experience-card";


export async function ExperiencesContent({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const filters = parseExperienceFilters(await searchParams);

  const [experiences, destinations] = await Promise.all([listExperiences(), destinationRepository.list()]);

  const result = filterExperiences(experiences, destinations, filters);

  const bySlug = new Map(destinations.map((d) => [d.slug, d]));

  const active = filters.province !== null || filters.categories.length > 0;

  return (
    <>
      <form method="get" action="/experiences" role="search" aria-label="Filtrar experiências" className="mt-10 space-y-6 border-y border-ink/20 py-8">
        <div className="max-w-md">
          <label htmlFor="x-provincia" className="font-semibold">
            Província
          </label>
          <select id="x-provincia" name="province" defaultValue={filters.province ?? ""} className={fieldClass}>
            <option value="">Todas as províncias</option>
            {PROVINCES.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <fieldset>
          <legend className="font-semibold">Categorias</legend>
          <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
            {CATEGORIES.map((c) => (
              <label key={c.id} className="flex min-h-11 items-center gap-2">
                <input
                  type="checkbox"
                  name="category"
                  value={c.id}
                  defaultChecked={filters.categories.includes(c.id)}
                  className="size-5 accent-terracotta-deep"
                />
                {c.label}
              </label>
            ))}
          </div>
        </fieldset>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <button type="submit" className={primaryButtonClass}>
            Aplicar filtros
          </button>
          {active && (
            <Link href="/experiences" className={textLinkClass}>
              Limpar filtros
            </Link>
          )}
        </div>
      </form>

      <p role="status" className="mt-8 text-ink/80">
        {result.length === 0
          ? "Nenhuma experiência encontrada."
          : `${result.length} ${result.length === 1 ? "experiência encontrada" : "experiências encontradas"}.`}
      </p>

      {result.length === 0 ? (
        <div className="mt-8 max-w-xl">
          <h2 className="text-3xl">Nada com estes filtros</h2>
          <p className="mt-3 text-lg text-ink/80">Experimenta outra província ou menos categorias.</p>
          <Link href="/experiences" className={`${primaryButtonClass} mt-6`}>
            Limpar filtros
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {result.map((experience) => (
            <li key={experience.id}>
              <ExperienceCard experience={experience} destination={bySlug.get(experience.destinationSlug)} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export function ExperiencesFallback() {
  return (
    <p role="status" className="mt-10 text-ink/70">
      A carregar experiências...
    </p>
  );
}
