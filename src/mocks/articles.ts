import type { Article } from "@/types";

/** Artigos de demonstração: títulos, resumos, datas e tempos de leitura são ilustrativos. */
export const articles: readonly Article[] = [
  {
    id: "art-001",
    slug: "fim-de-semana-lento-no-mussulo",
    title: "Um fim de semana lento no Mussulo",
    excerpt:
      "Do barco à mesa, um roteiro sem pressa para quem quer trocar o trânsito da cidade por maré e areia.",
    publishedAt: "2026-10-02",
    readingMinutes: 6,
    author: "Redação Vai Angola (demonstração)",
    destinationSlug: "ilha-do-mussulo",
    art: { scene: "coast", tone: 0 },
    isDemo: true,
  },
  {
    id: "art-002",
    slug: "a-estrada-para-a-tundavala",
    title: "Ao encontro do planalto: a estrada para a Tundavala",
    excerpt: "Paragens, paisagens e o que esperar quando a serra se abre para a planície.",
    publishedAt: "2026-09-18",
    readingMinutes: 8,
    author: "Redação Vai Angola (demonstração)",
    destinationSlug: "fenda-da-tundavala",
    art: { scene: "cliffs", tone: 1 },
    isDemo: true,
  },
  {
    id: "art-003",
    slug: "a-cidade-vista-da-baia",
    title: "A cidade vista da baía",
    excerpt: "Uma leitura da história de Luanda a partir das muralhas da fortaleza.",
    publishedAt: "2026-08-27",
    readingMinutes: 5,
    author: "Redação Vai Angola (demonstração)",
    destinationSlug: "fortaleza-de-sao-miguel",
    art: { scene: "fort", tone: 2 },
    isDemo: true,
  },
];
