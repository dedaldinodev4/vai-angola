import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { DemoArt } from "@/components/media/demo-art";
import { getDestinationBySlug, getPublishedDestinations } from "@/features/destinations/services/destinations.service";

/** Página básica. A ficha completa (galeria, informação prática, relacionados) chega na Fase 3. */
export function generateStaticParams() {
  return getPublishedDestinations().map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const destination = getDestinationBySlug(slug);
  return destination
    ? { title: destination.name, description: destination.shortDescription }
    : { title: "Destino não encontrado" };
}

export default async function DestinationPage(props: PageProps<"/destinations/[slug]">) {
  const { slug } = await props.params;
  const destination = getDestinationBySlug(slug);
  if (!destination) notFound();

  return (
    <Container className="py-12 md:py-20">
      <Link href="/explore" className="font-semibold text-terracotta-deep underline underline-offset-4">
        Voltar a explorar
      </Link>
      <div className="mt-8 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="font-semibold text-olive-deep">{destination.province}</p>
          <h1 className="mt-2">{destination.name}</h1>
          <p className="mt-6 max-w-[56ch] text-lg text-ink/85">{destination.description}</p>
          <p className="mt-8 text-sm text-ink/70">
            Conteúdo de demonstração, ainda não verificado. A ficha completa chega numa próxima fase.
          </p>
        </div>
        <DemoArt
          scene={destination.art.scene}
          tone={destination.art.tone}
          label={destination.name}
          className="aspect-4/3 w-full rounded-sm lg:col-span-6"
        />
      </div>
    </Container>
  );
}
