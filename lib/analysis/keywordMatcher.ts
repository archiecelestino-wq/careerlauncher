import { normalizeText } from "./textUtils";
import { extractSmartKeywords } from "./smartKeywordExtractor";

export interface KeywordAnalysis {
  matchedKeywords: string[];
  missingKeywords: string[];
  keywordMatchScore: number;
}

function containsKeyword(
  normalizedResumeText: string,
  keyword: string,
): boolean {
  return normalizedResumeText.includes(keyword);
}

export function analyzeKeywords(
  resumeText: string,
  jobDescriptionText: string,
): KeywordAnalysis {
  const normalizedResumeText = normalizeText(resumeText);
  const jobKeywords = extractSmartKeywords(jobDescriptionText);

  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  for (const keyword of jobKeywords) {
    if (containsKeyword(normalizedResumeText, keyword)) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  }

  const keywordMatchScore =
    jobKeywords.length === 0
      ? 0
      : Math.round(
          (matchedKeywords.length / jobKeywords.length) * 100,
        );

  return {
    matchedKeywords,
    missingKeywords,
    keywordMatchScore,
  };
}