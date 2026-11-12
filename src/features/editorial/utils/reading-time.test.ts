import { describe, expect, it } from "vitest";
import { articles } from "@/mocks/articles";
import { countWords, estimateReadingMinutes } from "./reading-time";

describe("estimateReadingMinutes", () => {
  it("tem mínimo de 1 minuto", () => {
    expect(estimateReadingMinutes([])).toBe(1);
    expect(estimateReadingMinutes(["uma frase curta"])).toBe(1);
  });

  it("arredonda para cima", () => {
    const words = (n: number) => Array(n).fill("palavra").join(" ");
    expect(estimateReadingMinutes([words(200)])).toBe(1);
    expect(estimateReadingMinutes([words(201)])).toBe(2);
    expect(estimateReadingMinutes([words(300), words(300)])).toBe(3);
  });

  it("ignora espaços a mais", () => {
    expect(countWords(["  um   dois \n três  "])).toBe(3);
  });

  it("todos os artigos de demonstração têm corpo e tempo calculável", () => {
    for (const a of articles) {
      expect(a.body.length).toBeGreaterThan(1);
      expect(estimateReadingMinutes(a.body)).toBeGreaterThanOrEqual(1);
    }
  });
});
