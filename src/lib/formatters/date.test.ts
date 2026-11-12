import { describe, expect, it } from "vitest";
import { eventDateParts, formatFullDate, formatLongDate, todayInLuanda } from "./date";

describe("todayInLuanda", () => {
  it("devolve a data de calendário em Luanda (UTC+1)", () => {
    expect(todayInLuanda(new Date("2026-11-11T12:00:00Z"))).toBe("2026-11-11");
  });

  it("passa para o dia seguinte quando em Luanda já passou a meia-noite", () => {
    expect(todayInLuanda(new Date("2026-11-11T23:30:00Z"))).toBe("2026-11-12");
  });

  it("não passa para o dia seguinte antes das 23h UTC", () => {
    expect(todayInLuanda(new Date("2026-11-11T22:59:00Z"))).toBe("2026-11-11");
  });
});

describe("formatadores de data", () => {
  it("não depende do fuso do servidor", () => {
    expect(eventDateParts("2027-03-13")).toMatchObject({ day: "13", month: "mar" });
    expect(formatLongDate("2026-10-02")).toBe("2 de outubro de 2026");
    expect(formatFullDate("2027-03-13")).toContain("2027");
  });
});
