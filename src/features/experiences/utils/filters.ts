import type { Destination, Experience } from "@/types";
import type { CategoryId } from "@/lib/constants/categories";
import { provinceSlugOf, type ProvinceSlug } from "@/lib/constants/provinces";


export type ExperienceFilters = {
  province: ProvinceSlug | null;
  categories: CategoryId[];
};

export const DEFAULT_EXPERIENCE_FILTERS: ExperienceFilters = { province: null, categories: [] };

/** Província e categorias vêm do destino da experiência. Província E categorias; categorias: basta uma. */
export function filterExperiences(
  experiences: readonly Experience[],
  destinations: readonly Destination[],
  filters: ExperienceFilters,
): Experience[] {
  const bySlug = new Map(destinations.map((d) => [d.slug, d]));
  const noFilters = filters.province === null && filters.categories.length === 0;
  
  return experiences.filter((experience) => {
    if (noFilters) 
      return true;
    
    const destination = bySlug.get(experience.destinationSlug);
    if (!destination) 
      return false; 
    
    const provinceOk = 
      filters.province === null || provinceSlugOf(destination.province) === filters.province;
    
    const categoryOk =
      filters.categories.length === 0 || destination.categories.some((c) => filters.categories.includes(c));
    
    return provinceOk && categoryOk;
  });
}
