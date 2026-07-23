import type { AnalysisResult } from "@/types/analysis";
import { adaptSkillScoreToAnalysisResult } from "./analysisAdapter";
import { scoreSkills } from "./scoring";
import { findSkills } from "./skillMatcher";

export function analyzeResume(
  resumeText: string,
  jobDescriptionText: string,
): AnalysisResult {
  const resumeSkills = findSkills(resumeText);
  const jobSkills = findSkills(jobDescriptionText);

  const scoringResult = scoreSkills(
    resumeSkills,
    jobSkills,
  );

  return adaptSkillScoreToAnalysisResult(
    scoringResult,
  );
}