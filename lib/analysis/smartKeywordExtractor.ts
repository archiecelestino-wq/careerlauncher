import {
  BUSINESS_SKILLS,
  CERTIFICATIONS,
  METHODOLOGIES,
  TECHNOLOGIES,
} from "./keywordLibrary";
import { normalizeText } from "./textUtils";

const ALL_RECOGNIZED_KEYWORDS = [
  ...TECHNOLOGIES,
  ...BUSINESS_SKILLS,
  ...METHODOLOGIES,
  ...CERTIFICATIONS,
];

export function extractSmartKeywords(text: string): string[] {
  const normalizedText = normalizeText(text);

  return ALL_RECOGNIZED_KEYWORDS.filter((keyword) =>
    normalizedText.includes(keyword),
  );
}