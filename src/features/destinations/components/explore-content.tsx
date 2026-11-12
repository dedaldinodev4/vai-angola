import Link from "next/link";

import { destinationRepository } from "../repositories/destination-repository";

import { DEFAULT_QUERY, discover } from "../utils/discovery";
import { parseDiscoveryQuery, type RawSearchParams } from "../utils/search-params";

import { DestinationCard } from "./destination-card";
import { DiscoveryFilters } from "./discovery-filters";
import { Pagination } from "./pagination";

/** Lê os parâmetros do URL, por isso tem de ficar dentro de <Suspense> (cacheComponents). */
export async function ExploreContent({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const query = parseDiscoveryQuery(await searchParams);
  const all = await destinationRepository.list();
  const result = discover(all, query);
  // Se a página pedida estava fora do alcance, usa a página corrigida na paginação.
  const current = { ...query, page: result.page };

  return (
    <>
      <div className="mt-10 border-y border-ink/20 py-8">
        <DiscoveryFilters query={query} />
      </div>

      <p role="status" className="mt-8 text-ink/80">
        {result.totalItems === 0
          ? "Nenhum destino encontrado."
          : `${result.totalItems} ${result.totalItems === 1 ? "destino encontrado" : "destinos encontrados"}.`}
      </p>

      {result.totalItems === 0 ? (
        <div className="mt-8 max-w-xl">
          <h2 className="text-3xl">Nada com estes filtros</h2>
          <p className="mt-3 text-lg text-ink/80">
            Experimenta outra palavra, outra província ou menos categorias. Os destinos de demonstração são poucos.
          </p>
          <Link
            href="/explore"
            className="mt-6 inline-flex min-h-12 items-center rounded-md bg-terracotta-deep px-7 font-semibold text-white transition-colors duration-(--duration-fast) hover:bg-ink"
          >
            Limpar filtros
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {result.items.map((destination) => (
              <li key={destination.id}>
                <DestinationCard destination={destination} imageClassName="aspect-[4/5]" />
              </li>
            ))}
          </ul>
          <Pagination query={current} page={result.page} totalPages={result.totalPages} />
        </>
      )}
      {query.page !== DEFAULT_QUERY.page && query.page !== result.page && (
        <p className="mt-4 text-sm text-ink/70">A página pedida não existe; a mostrar a página {result.page}.</p>
      )}
    </>
  );
}

export function ExploreFallback() {
  return (
    <p role="status" className="mt-10 text-ink/70">
      A carregar destinos...
    </p>
  );
}
