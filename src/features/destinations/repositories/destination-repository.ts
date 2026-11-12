import { destinations } from "@/mocks/destinations";
import type { Destination } from "@/types";


export interface DestinationRepository {
  list(): Promise<Destination[]>;
  listFeatured(): Promise<Destination[]>;
  getBySlug(slug: string): Promise<Destination | undefined>;
}

export const mockDestinationRepository: DestinationRepository = {
  async list() {
    return destinations.filter((d) => d.published);
  },
  async listFeatured() {
    return destinations.filter((d) => d.published && d.featured);
  },
  async getBySlug(slug) {
    return destinations.find((d) => d.published && d.slug === slug);
  },
};

export const destinationRepository: DestinationRepository = mockDestinationRepository;
