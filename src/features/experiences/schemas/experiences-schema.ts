import { z } from "zod";
import { isCategoryId, type CategoryId } from "@/lib/constants/categories";
import { isProvinceSlug, type ProvinceSlug } from "@/lib/constants/provinces";

export const experienceSchema = z.object({
  province: z
    .string()
    .optional()
    .transform((v): ProvinceSlug | null => (v !== undefined && isProvinceSlug(v) ? v : null)),
  category: z.array(z.string()).transform((values): CategoryId[] => [...new Set(values.filter(isCategoryId))]),
});
