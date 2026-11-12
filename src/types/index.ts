import type { CategoryId } from "@/lib/constants/categories";
import type { ProvinceName } from "@/lib/constants/provinces";

export type DemoScene = "falls" | "cliffs" | "moon" | "coast" | "fort" | "rocks";
export type DemoTone = 0 | 1 | 2;

//* Destinations *//
export type DestinationCategory = CategoryId;

export type Destination = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  province: ProvinceName;
  categories: DestinationCategory[];
  activities: string[];
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
  date: string;
  province: ProvinceName;
  summary: string;
  description: string;
  destinationSlug?: string;
  isDemo: true;
};

export type EventStatus = "upcoming" | "today" | "past";

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


