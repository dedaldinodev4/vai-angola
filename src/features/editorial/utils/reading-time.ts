const WORDS_PER_MINUTE = 200;

export function countWords(paragraphs: readonly string[]): number {
  return paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
}

/** Minutos de leitura, arredondados para cima, com mínimo de 1. */
export function estimateReadingMinutes(paragraphs: readonly string[], wpm: number = WORDS_PER_MINUTE): number {
  return Math.max(1, Math.ceil(countWords(paragraphs) / wpm));
}
