export const CATEGORIES = [
  { id: "nature", label: "Natureza" },
  { id: "beach", label: "Praia" },
  { id: "culture", label: "Cultura" },
  { id: "history", label: "História" },
  { id: "adventure", label: "Aventura" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];

export function isCategoryId(value: string): value is CategoryId {
  return CATEGORIES.some((c) => c.id === value);
}

export function categoryLabel(id: CategoryId): string {
  return CATEGORIES.find((c) => c.id === id)?.label ?? id;
}
