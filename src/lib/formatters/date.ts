const LOCALE = "pt-AO";
const base = { timeZone: "UTC" } as const;

const dayFmt = new Intl.DateTimeFormat(LOCALE, { ...base, day: "numeric" });
const monthFmt = new Intl.DateTimeFormat(LOCALE, { ...base, month: "short" });
const weekdayFmt = new Intl.DateTimeFormat(LOCALE, { ...base, weekday: "long" });
const longFmt = new Intl.DateTimeFormat(LOCALE, { ...base, day: "numeric", month: "long", year: "numeric" });
const fullFmt = new Intl.DateTimeFormat(LOCALE, { ...base, weekday: "long", day: "numeric", month: "long", year: "numeric" });
const luandaDayFmt = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Africa/Luanda",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

function parse(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
}

export function eventDateParts(iso: string) {
  const date = parse(iso);
  return {
    day: dayFmt.format(date),
    month: monthFmt.format(date).replace(".", ""),
    weekday: weekdayFmt.format(date),
  };
}

export function formatLongDate(iso: string): string {
  return longFmt.format(parse(iso));
}

export function formatFullDate(iso: string): string {
  return fullFmt.format(parse(iso));
}

/** Data de calendário (AAAA-MM-DD) em Luanda para um instante. Pura: o relógio é passado por quem chama. */
export function todayInLuanda(now: Date): string {
  return luandaDayFmt.format(now);
}

