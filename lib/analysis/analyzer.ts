import { analyzeKeywords } from "./keywordMatcher";
import { AnalysisResult } from "@/types/analysis";

export function analyzeResume(
  resumeText: string,
  jobDescriptionText: string,
): AnalysisResult {
  const keywordAnalysis = analyzeKeywords(
    resumeText,
    jobDescriptionText,
  );

  const strengths =
    keywordAnalysis.matchedKeywords.length > 0
      ? [
          `Matched ${keywordAnalysis.matchedKeywords.length} important keyword(s).`,
        ]
      : [];

  const recommendations =
    keywordAnalysis.missingKeywords.length > 0
      ? [
          "Consider adding relevant experience for the missing keywords where appropriate.",
        ]
      : ["Great alignment with the job description."];

  return {
    overallScore: keywordAnalysis.keywordMatchScore,
    keywordMatchScore: keywordAnalysis.keywordMatchScore,
    matchedKeywords: keywordAnalysis.matchedKeywords,
    missingKeywords: keywordAnalysis.missingKeywords,
    strengths,
    recommendations,
  };
}