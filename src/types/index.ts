
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


