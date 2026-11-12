export const CATEGORIES = [
  { id: "natureza", label: "Natureza" },
  { id: "praia", label: "Praia" },
  { id: "cultura", label: "Cultura" },
  { id: "historia", label: "História" },
  { id: "aventura", label: "Aventura" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function isCategoryId(value: string): value is CategoryId {
  return CATEGORIES.some((c) => c.id === value);
}

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
