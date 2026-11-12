import { first, many, type RawSearchParams } from "@/lib/utils/search-params";
import type { ExperienceFilters } from "./filters";
import { experienceSchema } from "../schemas/experiences-schema";


export function parseExperienceFilters(raw: RawSearchParams): ExperienceFilters {
  const parsed = experienceSchema.parse({ province: first(raw.province), category: many(raw.category) });
  return {
    province: parsed.province,
    categories: parsed.category
  };
}
