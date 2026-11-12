import Link from "next/link";
import { Container } from "@/components/layout/container";

import { destinationRepository } from "@/features/destinations/repositories/destination-repository";
import { summarizeProvinces } from "@/features/destinations/utils/provinces";
import { buildExploreHref } from "@/features/destinations/utils/search-params";


export async function ProvinceDiscovery() {
  const provinces = summarizeProvinces(await destinationRepository.list());

  return (
    <section aria-labelledby="provincias-title" className="bg-sand/45 py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <h2 id="provincias-title">Explorar por província</h2>
          <p className="mt-4 max-w-md text-lg text-ink/80">
            {provinces.length} províncias com destinos de demonstração. Os filtros usam a lista das 21
            províncias; os destinos são todos de demonstração.
          </p>
        </div>
        <ul className="lg:col-span-7">
          {provinces.map((province) => (
            <li key={province.slug} className="border-t border-ink/25 last:border-b">
              <Link
                href={buildExploreHref({ province: province.slug })}
                className="group flex items-baseline justify-between gap-6 py-5 md:py-6"
              >
                <span className="font-display text-[clamp(1.75rem,1.2rem+2.4vw,3rem)] leading-none decoration-terracotta decoration-2 underline-offset-8 group-hover:underline">
                  {province.name}
                </span>
                <span className="text-sm text-ink/75">
                  {province.count} {province.count === 1 ? "destino" : "destinos"}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
