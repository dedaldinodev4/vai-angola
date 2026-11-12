
export type DemoScene = "falls" | "cliffs" | "moon" | "coast" | "fort" | "rocks";
export type DemoTone = 0 | 1 | 2;

//* Destinations *//
export type DestinationCategory = "natureza" | "praia" | "cultura" | "historia" | "aventura";

export type Destination = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  province: string;
  categories: DestinationCategory[];
  activities: string[];
  /** Ilustração de demonstração; passa a `coverImage`/`gallery` com fotografias reais. */
  art: { scene: DemoScene; tone: DemoTone };
  featured: boolean;
  published: boolean;
  isDemo: true;
};

//* Events *//
export type AppEvent = {
  id: string;
  slug: string;
  title: string;
  /** Data ISO (AAAA-MM-DD), interpretada em UTC. */
  date: string;
  province: string;
  summary: string;
  /** Evento fictício criado para demonstração. */
  isDemo: true;
};

//* Experiences *//
export type Experience = {
  id: string;
  title: string;
  summary: string;
  destinationSlug: string;
  art: { scene: DemoScene; tone: DemoTone };
  isDemo: true;
};

//* Articles *//

export type Article = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Data ISO (AAAA-MM-DD). */
  publishedAt: string;
  readingMinutes: number;
  author: string;
  destinationSlug: string;
  art: { scene: DemoScene; tone: DemoTone };
  isDemo: true;
};


