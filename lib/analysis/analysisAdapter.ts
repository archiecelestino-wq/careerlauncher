import type { AnalysisResult } from "@/types/analysis";
import type {
  SkillScoreContribution,
  SkillScoreResult,
} from "./scoring";

const MAX_STRENGTHS = 5;
const MAX_RECOMMENDATIONS = 5;

function getUniqueSkillNames(
  contributions: SkillScoreContribution[],
): string[] {
  return Array.from(
    new Set(
      contributions.map(
        (contribution) => contribution.jobSkill.name,
      ),
    ),
  );
}

function createDirectMatchStrength(
  contribution: SkillScoreContribution,
): string {
  return `${contribution.jobSkill.name} directly matches a skill identified in the job description.`;
}

function createRelatedMatchStrength(
  contribution: SkillScoreContribution,
): string {
  if (!contribution.resumeSkill) {
    return contribution.explanation;
  }

  const evidenceLabel =
    contribution.matchType === "strong_related"
      ? "strongly related"
      : "supporting";

  return `${contribution.resumeSkill.name} provides ${evidenceLabel} evidence for ${contribution.jobSkill.name}.`;
}

function createMissingSkillRecommendation(
  contribution: SkillScoreContribution,
): string {
  return `Review the requirement for ${contribution.jobSkill.name}. Add relevant experience only when it accurately reflects your background.`;
}

function createStrengths(
  scoringResult: SkillScoreResult,
): string[] {
  const directStrengths =
    scoringResult.directMatches.map(
      createDirectMatchStrength,
    );

  const strongRelatedStrengths =
    scoringResult.strongRelatedMatches.map(
      createRelatedMatchStrength,
    );

  const supportingStrengths =
    scoringResult.supportingRelatedMatches.map(
      createRelatedMatchStrength,
    );

  const strengths = [
    ...directStrengths,
    ...strongRelatedStrengths,
    ...supportingStrengths,
  ].slice(0, MAX_STRENGTHS);

  if (strengths.length > 0) {
    return strengths;
  }

  return [
    "The analysis did not identify a direct or related skill match yet.",
  ];
}

function createRecommendations(
  scoringResult: SkillScoreResult,
): string[] {
  const recommendations =
    scoringResult.missingSkills
      .map(createMissingSkillRecommendation)
      .slice(0, MAX_RECOMMENDATIONS);

  if (recommendations.length > 0) {
    return recommendations;
  }

  if (scoringResult.maximumPoints === 0) {
    return [
      "The job description did not contain skills currently covered by the CareerLauncher skill dictionary.",
    ];
  }

  return [
    "Your identified skills show strong alignment with the job description. Review your resume to ensure each skill is supported by clear and truthful evidence.",
  ];
}

export function adaptSkillScoreToAnalysisResult(
  scoringResult: SkillScoreResult,
): AnalysisResult {
  const matchedKeywords = getUniqueSkillNames(
    scoringResult.directMatches,
  );

  const missingKeywords = getUniqueSkillNames(
    scoringResult.missingSkills,
  );

  return {
    overallScore: scoringResult.score,
    keywordMatchScore: scoringResult.score,
    matchedKeywords,
    missingKeywords,
    strengths: createStrengths(scoringResult),
    recommendations:
      createRecommendations(scoringResult),
  };
}