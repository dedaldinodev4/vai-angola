import type { Metadata } from "next";
import { Suspense } from "react";

import { destinationRepository } from "@/features/destinations/repositories/destination-repository";

import DestinationSkeleton from "@/features/destinations/components/destination-skeleton";
import DestinationContent from "@/features/destinations/components/destination-content";


export async function generateStaticParams() {
  const all = await destinationRepository.list();
  return all.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(props: PageProps<"/destinations/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const destination = await destinationRepository.getBySlug(slug);
  return destination
    ? { title: destination.name, description: destination.shortDescription }
    : { title: "Destino não encontrado" };
}

export default async function DestinationPage(props: PageProps<"/destinations/[slug]">) {
  
  return (
    <Suspense fallback={<DestinationSkeleton />}>
      <DestinationContent params={props.params} />
    </Suspense>
  );
}
