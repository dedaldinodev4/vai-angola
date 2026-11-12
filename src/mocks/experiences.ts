import type { Experience } from "@/types";

export const experiences: readonly Experience[] = [
  {
    id: "exp-001",
    title: "Pôr do sol nas ravinas",
    summary: "Chegar ao fim da tarde e ver as cores da terra mudarem com a luz.",
    destinationSlug: "miradouro-da-lua",
    art: { scene: "moon", tone: 1 },
    isDemo: true,
  },
  {
    id: "exp-002",
    title: "Travessia de barco até ao Mussulo",
    summary: "Atravessar a baía e passar o dia entre areia, mar calmo e mesa partilhada.",
    destinationSlug: "ilha-do-mussulo",
    art: { scene: "coast", tone: 2 },
    isDemo: true,
  },
  {
    id: "exp-003",
    title: "Visita guiada pelas muralhas",
    summary: "Seguir a história da cidade pelas muralhas e pelos espaços de memória.",
    destinationSlug: "fortaleza-de-sao-miguel",
    art: { scene: "fort", tone: 0 },
    isDemo: true,
  },
  {
    id: "exp-004",
    title: "Caminhada entre rochas escuras",
    summary: "Subir devagar pelas formações de pedra e ler a paisagem lá de cima.",
    destinationSlug: "pedras-negras-de-pungo-andongo",
    art: { scene: "rocks", tone: 1 },
    isDemo: true,
  },
];
