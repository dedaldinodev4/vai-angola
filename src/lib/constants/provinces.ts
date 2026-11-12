
export const PROVINCES = [
  { name: "Bengo", slug: "bengo" },
  { name: "Benguela", slug: "benguela" },
  { name: "Bié", slug: "bie" },
  { name: "Cabinda", slug: "cabinda" },
  { name: "Cuando", slug: "cuando" },
  { name: "Cuando Cubango", slug: "cuando-cubango" },
  { name: "Cuanza Norte", slug: "cuanza-norte" },
  { name: "Cuanza Sul", slug: "cuanza-sul" },
  { name: "Cunene", slug: "cunene" },
  { name: "Huambo", slug: "huambo" },
  { name: "Huíla", slug: "huila" },
  { name: "Icolo e Bengo", slug: "icolo-e-bengo" },
  { name: "Luanda", slug: "luanda" },
  { name: "Lunda Norte", slug: "lunda-norte" },
  { name: "Lunda Sul", slug: "lunda-sul" },
  { name: "Malanje", slug: "malanje" },
  { name: "Moxico", slug: "moxico" },
  { name: "Moxico Leste", slug: "moxico-leste" },
  { name: "Namibe", slug: "namibe" },
  { name: "Uíge", slug: "uige" },
  { name: "Zaire", slug: "zaire" },
] as const;

export type ProvinceName = (typeof PROVINCES)[number]["name"];
export type ProvinceSlug = (typeof PROVINCES)[number]["slug"];

export function isProvinceSlug(value: string): value is ProvinceSlug {
  return PROVINCES.some((p) => p.slug === value);
}

export function provinceSlugOf(name: ProvinceName): ProvinceSlug {
  const found = PROVINCES.find((p) => p.name === name);
  if (!found) throw new Error(`Província desconhecida: ${name}`);
  return found.slug;
}

export function provinceNameOf(slug: ProvinceSlug): ProvinceName {
  const found = PROVINCES.find((p) => p.slug === slug);
  if (!found) throw new Error(`Província desconhecida: ${slug}`);
  return found.name;
}
