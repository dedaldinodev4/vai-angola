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
    isDemo: true,
  },
  {
    id: "evt-002",
    slug: "feira-gastronomia-do-planalto",
    title: "Feira de Gastronomia do Planalto",
    date: "2027-04-17",
    province: "Huíla",
    summary: "Produtores e cozinheiros locais numa feira de sabores da região.",
    isDemo: true,
  },
  {
    id: "evt-003",
    slug: "encontro-fotografia-de-viagem",
    title: "Encontro de Fotografia de Viagem",
    date: "2027-05-22",
    province: "Benguela",
    summary: "Exposições e conversas sobre olhar o país através da fotografia.",
    isDemo: true,
  },
  {
    id: "evt-004",
    slug: "rota-das-quedas-caminhada",
    title: "Rota das Quedas: caminhada em grupo",
    date: "2027-06-05",
    province: "Malanje",
    summary: "Um percurso guiado entre miradouros e quedas de água.",
    isDemo: true,
  },
];
