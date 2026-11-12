import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout/container";
import { DemoArt } from "@/components/media/demo-art";
import { DestinationCard } from "./destination-card";

import { getRelatedDestinations } from "@/features/destinations/utils/related";
import { destinationRepository } from "@/features/destinations/repositories/destination-repository";
import { buildExploreHref } from "@/features/destinations/utils/search-params";

import { categoryLabel } from "@/lib/constants/categories";
import { provinceSlugOf } from "@/lib/constants/provinces";

interface DestinationContentProps {
  params: Promise<{ slug: string }>;
}

export default async function DestinationContent({
  params,
}: DestinationContentProps) {
  const { slug } = await params;

  const destination = await destinationRepository.getBySlug(slug);

  if (!destination) notFound();

  const all = await destinationRepository.list();
  const related = getRelatedDestinations(all, destination);

  return (
    <>
      <Container className="py-12 md:py-20">
        <nav aria-label="Localização">
          <Link
            href="/explore"
            className="font-semibold text-terracotta-deep underline underline-offset-4 hover:text-ink"
          >
            Todos os destinos
          </Link>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-semibold text-olive-deep">
              <Link
                href={buildExploreHref({ province: provinceSlugOf(destination.province) })}
                className="underline-offset-4 hover:underline"
              >
                {destination.province}
              </Link>
            </p>
            <h1 className="mt-2">{destination.name}</h1>
            <p className="mt-6 max-w-[56ch] text-lg text-ink/85">{destination.description}</p>

            <dl className="mt-10 space-y-6 border-t border-ink/20 pt-6">
              <div>
                <dt className="font-semibold">Categorias</dt>
                <dd className="mt-1 text-ink/85">
                  {destination.categories.map((id, i) => (
                    <span key={id}>
                      {i > 0 && ", "}
                      <Link
                        href={buildExploreHref({ categories: [id] })}
                        className="underline decoration-terracotta decoration-2 underline-offset-4 hover:text-terracotta-deep"
                      >
                        {categoryLabel(id)}
                      </Link>
                    </span>
                  ))}
                </dd>
              </div>
              <div>
                <dt className="font-semibold">O que fazer</dt>
                <dd className="mt-1">
                  <ul className="space-y-1 text-ink/85">
                    {destination.activities.map((activity) => (
                      <li key={activity}>{activity}</li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <p className="mt-10 max-w-md text-sm text-ink/70">
              Conteúdo de demonstração, ainda não verificado. Horários, preços, acessos e informação prática serão
              adicionados apenas quando confirmados.
            </p>
          </div>

          <DemoArt
            scene={destination.art.scene}
            tone={destination.art.tone}
            label={destination.name}
            className="aspect-4/5 w-full rounded-sm lg:col-span-7 lg:aspect-5/6"
          />
        </div>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="relacionados-title" className="bg-sand/45 py-20">
          <Container>
            <h2 id="relacionados-title">Para continuar</h2>
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <DestinationCard destination={item} imageClassName="aspect-[4/3]" />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}