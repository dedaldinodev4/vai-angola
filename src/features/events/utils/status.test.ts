import { describe, expect, it } from "vitest";

import { events } from "@/mocks/events";
import { parseEventFilters, buildEventsHref } from "./event-filters";
import { DEFAULT_EVENT_FILTERS, daysBetween, getEventStatus, listEvents } from "./status";

const TODAY = "2026-11-11";

describe("getEventStatus", () => {
  it("distingue passado, hoje e futuro", () => {
    expect(getEventStatus("2026-11-10", TODAY)).toBe("past");
    expect(getEventStatus("2026-11-11", TODAY)).toBe("today");
    expect(getEventStatus("2026-11-12", TODAY)).toBe("upcoming");
  });

  it("funciona na viragem de ano", () => {
    expect(getEventStatus("2026-12-31", "2027-01-01")).toBe("past");
  });
});

describe("listEvents", () => {
  it("separa próximos (por ordem de data) e esconde os terminados por omissão", () => {
    const result = listEvents(events, DEFAULT_EVENT_FILTERS, TODAY);
    expect(result.upcoming.map((e) => e.slug)).toEqual([
      "festival-musica-da-costa",
      "feira-gastronomia-do-planalto",
      "encontro-fotografia-de-viagem",
      "rota-das-quedas-caminhada",
    ]);
    expect(result.past).toEqual([]);
    expect(result.pastCount).toBe(1);
  });

  it("mostra terminados quando pedido", () => {
    const result = listEvents(events, { ...DEFAULT_EVENT_FILTERS, includePast: true }, TODAY);
    expect(result.past.map((e) => e.slug)).toEqual(["mostra-de-artesanato-da-baia"]);
  });

  it("um evento hoje conta como próximo", () => {
    const result = listEvents(events, DEFAULT_EVENT_FILTERS, "2027-03-13");
    expect(result.upcoming[0].slug).toBe("festival-musica-da-costa");
  });

  it("filtra por província", () => {
    const result = listEvents(events, { province: "benguela", includePast: true }, TODAY);
    expect(result.upcoming.map((e) => e.slug)).toEqual(["encontro-fotografia-de-viagem"]);
    expect(result.past.map((e) => e.slug)).toEqual(["mostra-de-artesanato-da-baia"]);
  });

  it("depois de todos os eventos, não há próximos", () => {
    const result = listEvents(events, DEFAULT_EVENT_FILTERS, "2030-01-01");
    expect(result.upcoming).toEqual([]);
    expect(result.pastCount).toBe(events.length);
  });

  it("não altera a lista original", () => {
    const copy = [...events];
    listEvents(events, { province: null, includePast: true }, TODAY);
    expect(events).toEqual(copy);
  });
});

describe("parse/build dos filtros de eventos", () => {
  it("lê valores válidos e ignora inválidos", () => {
    expect(parseEventFilters({ province: "huila", pastEvents: "1" })).toEqual({ province: "huila", includePast: true });
    expect(parseEventFilters({ province: "xx", pastEvents: "sim" })).toEqual(DEFAULT_EVENT_FILTERS);
    expect(parseEventFilters({})).toEqual(DEFAULT_EVENT_FILTERS);
  });

  it("constrói o URL sem valores padrão", () => {
    expect(buildEventsHref()).toBe("/events");
    expect(buildEventsHref({ province: "luanda", includePast: true })).toBe("/events?province=luanda&pastEvents=1");
  });
});

describe("daysBetween", () => {
  it("conta dias de calendário", () => {
    expect(daysBetween("2026-11-11", "2026-11-11")).toBe(0);
    expect(daysBetween("2026-11-11", "2026-11-14")).toBe(3);
    expect(daysBetween("2026-12-30", "2027-01-02")).toBe(3);
    expect(daysBetween("2026-11-12", "2026-11-11")).toBe(-1);
  });
});
