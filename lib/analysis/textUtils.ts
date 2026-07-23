const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "have",
  "in",
  "is",
  "it",
  "of",
  "on",
  "or",
  "that",
  "the",
  "this",
  "to",
  "will",
  "with",
  "you",
  "your",
]);

export function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}+#.\s-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function tokenizeText(text: string): string[] {
  return normalizeText(text)
    .split(" ")
    .map((word) => word.trim())
    .filter((word) => word.length > 1)
    .filter((word) => !STOP_WORDS.has(word));
}

export function getUniqueWords(text: string): string[] {
  return Array.from(new Set(tokenizeText(text)));
}

export function calculateWordFrequency(
  text: string,
): Record<string, number> {
  const frequency: Record<string, number> = {};

  for (const word of tokenizeText(text)) {
    frequency[word] = (frequency[word] ?? 0) + 1;
  }

  return frequency;
}