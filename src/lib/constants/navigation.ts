export type NavItem = {
  href: string;
  label: string;
};

export const MAIN_NAV: readonly NavItem[] = [
  { href: "/explore", label: "Explorar" },
  { href: "/experiences", label: "Experiências" },
  { href: "/events", label: "Eventos" },
  { href: "/stories", label: "Histórias" },
] as const;

export const PERSONAL_NAV: readonly NavItem[] = [
  { href: "/favorites", label: "Favoritos" },
  { href: "/itineraries", label: "Roteiros" },
] as const;
