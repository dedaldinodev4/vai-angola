import type { AppEvent } from "@/types";

/** Eventos FICTÍCIOS, com datas fixas para manter o resultado determinístico. */
export const events: readonly AppEvent[] = [
  {
    id: "evt-001",
    slug: "festival-musica-da-costa",
    title: "Festival de Música da Costa",
    date: "2027-03-13",
    province: "Luanda",
    summary: "Concertos ao ar livre à beira-mar, com artistas de várias regiões.",
    description:
      "Evento fictício criado para demonstrar a página de detalhe. Imagina uma tarde de concertos junto ao mar, com palcos pequenos, comida partilhada e gente a chegar de barco. Nada disto está confirmado.",
    destinationSlug: "ilha-do-mussulo",
    isDemo: true,
  },
  {
    id: "evt-002",
    slug: "feira-gastronomia-do-planalto",
    title: "Feira de Gastronomia do Planalto",
    date: "2027-04-17",
    province: "Huíla",
    summary: "Produtores e cozinheiros locais numa feira de sabores da região.",
    description:
      "Evento fictício. Uma feira pensada como exemplo: bancas de produtores, cozinheiros a mostrar receitas da região e conversas sobre ingredientes. Datas, locais e participantes são ilustrativos.",
    destinationSlug: "fenda-da-tundavala",
    isDemo: true,
  },
  {
    id: "evt-003",
    slug: "encontro-fotografia-de-viagem",
    title: "Encontro de Fotografia de Viagem",
    date: "2027-05-22",
    province: "Benguela",
    summary: "Exposições e conversas sobre olhar o país através da fotografia.",
    description:
      "Evento fictício. Um encontro de exemplo com pequenas exposições e conversas sobre como fotografar lugares sem os reduzir a postais. Programa e convidados não existem.",
    destinationSlug: "praia-morena",
    isDemo: true,
  },
  {
    id: "evt-004",
    slug: "rota-das-quedas-caminhada",
    title: "Rota das Quedas: caminhada em grupo",
    date: "2027-06-05",
    province: "Malanje",
    summary: "Um percurso guiado entre miradouros e quedas de água.",
    description:
      "Evento fictício. Uma caminhada em grupo imaginada para o interior, com paragens para fotografia e descanso. Percurso, duração e preparação são apenas exemplos.",
    destinationSlug: "quedas-de-kalandula",
    isDemo: true,
  },
  {
    id: "evt-005",
    slug: "mostra-de-artesanato-da-baia",
    title: "Mostra de Artesanato da Baía",
    date: "2026-09-12",
    province: "Benguela",
    summary: "Artesãos e pequenos ateliês numa mostra de fim de semana.",
    description:
      "Evento fictício com data já passada, incluído de propósito para demonstrar como a plataforma trata eventos terminados. Não aconteceu.",
    isDemo: true,
  },
];
