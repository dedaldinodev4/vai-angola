import { z } from "zod";
import { isProvinceSlug, type ProvinceSlug } from "@/lib/constants/provinces";


export const eventSchema = z.object({
  province: z
    .string()
    .optional()
    .transform((v): ProvinceSlug | null => (v !== undefined && isProvinceSlug(v) ? v : null)),
  pastEvents: z.string().optional().transform((v) => v === "1"),
});

