import type { Skill } from "./skillDictionary";
import {
  getSkillRelationships,
  type SkillRelationshipStrength,
} from "./skillRelationships";
import {
  describeSkillRelationship,
  getSkillRelationshipType,
  type SkillRelationshipType,
} from "./skillRelationshipTypes";

export const MATCH_CREDIT = {
  direct: 1,
  strong: 0.7,
  supporting: 0.4,
  none: 0,
} as const;

export type SkillMatchType =
  | "direct"
  | "strong_related"
  | "supporting_related"
  | "none";

export type SkillScoreContribution = {
  jobSkill: Skill;
  resumeSkill: Skill | null;
  matchType: SkillMatchType;
  relationshipStrength: SkillRelationshipStrength | null;
  relationshipType: SkillRelationshipType | null;
  maximumPoints: number;
  earnedPoints: number;
  creditRate: number;
  explanation: string;
};

export type SkillScoreResult = {
  score: number;
  earnedPoints: number;
  maximumPoints: number;
  directMatches: SkillScoreContribution[];
  strongRelatedMatches: SkillScoreContribution[];
  supportingRelatedMatches: SkillScoreContribution[];
  missingSkills: SkillScoreContribution[];
  contributions: SkillScoreContribution[];
};

type RelatedCandidate = {
  resumeSkill: Skill;
  strength: SkillRelationshipStrength;
  relationshipType: SkillRelationshipType;
  creditRate: number;
};

function roundPoints(value: number): number {
  return Math.round(value * 100) / 100;
}

function getCreditRateForStrength(
  strength: SkillRelationshipStrength,
): number {
  if (strength === "strong") {
    return MATCH_CREDIT.strong;
  }

  return MATCH_CREDIT.supporting;
}

function createDirectContribution(
  resumeSkill: Skill,
  jobSkill: Skill,
): SkillScoreContribution {
  const maximumPoints = jobSkill.weight;
  const earnedPoints =
    maximumPoints * MATCH_CREDIT.direct;

  return {
    jobSkill,
    resumeSkill,
    matchType: "direct",
    relationshipStrength: null,
    relationshipType: null,
    maximumPoints,
    earnedPoints: roundPoints(earnedPoints),
    creditRate: MATCH_CREDIT.direct,
    explanation: `${resumeSkill.name} directly matches the job requirement for ${jobSkill.name}.`,
  };
}

function createRelatedContribution(
  candidate: RelatedCandidate,
  jobSkill: Skill,
): SkillScoreContribution {
  const maximumPoints = jobSkill.weight;
  const earnedPoints =
    maximumPoints * candidate.creditRate;

  const relationshipDescription =
    describeSkillRelationship(
      candidate.resumeSkill.name,
      jobSkill.name,
      candidate.relationshipType,
    );

  return {
    jobSkill,
    resumeSkill: candidate.resumeSkill,
    matchType:
      candidate.strength === "strong"
        ? "strong_related"
        : "supporting_related",
    relationshipStrength: candidate.strength,
    relationshipType: candidate.relationshipType,
    maximumPoints,
    earnedPoints: roundPoints(earnedPoints),
    creditRate: candidate.creditRate,
    explanation:
      candidate.strength === "strong"
        ? `${relationshipDescription} This provides strong related evidence for the requirement.`
        : `${relationshipDescription} This provides supporting evidence for the requirement.`,
  };
}

function createMissingContribution(
  jobSkill: Skill,
): SkillScoreContribution {
  return {
    jobSkill,
    resumeSkill: null,
    matchType: "none",
    relationshipStrength: null,
    relationshipType: null,
    maximumPoints: jobSkill.weight,
    earnedPoints: 0,
    creditRate: MATCH_CREDIT.none,
    explanation: `No direct or related resume skill was found for the job requirement ${jobSkill.name}.`,
  };
}

function findDirectMatch(
  resumeSkills: Skill[],
  jobSkill: Skill,
): Skill | null {
  return (
    resumeSkills.find(
      (resumeSkill) => resumeSkill.id === jobSkill.id,
    ) ?? null
  );
}

function findBestRelatedCandidate(
  resumeSkills: Skill[],
  jobSkill: Skill,
): RelatedCandidate | null {
  const candidates: RelatedCandidate[] = [];

  for (const resumeSkill of resumeSkills) {
    const relationship = getSkillRelationships(
      resumeSkill.id,
    ).find(
      (item) => item.skillId === jobSkill.id,
    );

    if (!relationship) {
      continue;
    }

    const relationshipType = getSkillRelationshipType(
      resumeSkill.id,
      jobSkill.id,
    );

    candidates.push({
      resumeSkill,
      strength: relationship.strength,
      relationshipType,
      creditRate: getCreditRateForStrength(
        relationship.strength,
      ),
    });
  }

  if (candidates.length === 0) {
    return null;
  }

  return [...candidates].sort(
    (firstCandidate, secondCandidate) => {
      if (
        secondCandidate.creditRate !==
        firstCandidate.creditRate
      ) {
        return (
          secondCandidate.creditRate -
          firstCandidate.creditRate
        );
      }

      if (
        secondCandidate.resumeSkill.weight !==
        firstCandidate.resumeSkill.weight
      ) {
        return (
          secondCandidate.resumeSkill.weight -
          firstCandidate.resumeSkill.weight
        );
      }

      return firstCandidate.resumeSkill.name.localeCompare(
        secondCandidate.resumeSkill.name,
      );
    },
  )[0];
}

function scoreJobSkill(
  resumeSkills: Skill[],
  jobSkill: Skill,
): SkillScoreContribution {
  const directMatch = findDirectMatch(
    resumeSkills,
    jobSkill,
  );

  if (directMatch) {
    return createDirectContribution(
      directMatch,
      jobSkill,
    );
  }

  const relatedCandidate = findBestRelatedCandidate(
    resumeSkills,
    jobSkill,
  );

  if (relatedCandidate) {
    return createRelatedContribution(
      relatedCandidate,
      jobSkill,
    );
  }

  return createMissingContribution(jobSkill);
}

function removeDuplicateSkills(
  skills: Skill[],
): Skill[] {
  const uniqueSkills = new Map<string, Skill>();

  for (const skill of skills) {
    if (!uniqueSkills.has(skill.id)) {
      uniqueSkills.set(skill.id, skill);
    }
  }

  return Array.from(uniqueSkills.values());
}

export function scoreSkills(
  resumeSkills: Skill[],
  jobSkills: Skill[],
): SkillScoreResult {
  const uniqueResumeSkills =
    removeDuplicateSkills(resumeSkills);

  const uniqueJobSkills =
    removeDuplicateSkills(jobSkills);

  if (uniqueJobSkills.length === 0) {
    return {
      score: 0,
      earnedPoints: 0,
      maximumPoints: 0,
      directMatches: [],
      strongRelatedMatches: [],
      supportingRelatedMatches: [],
      missingSkills: [],
      contributions: [],
    };
  }

  const contributions = uniqueJobSkills.map(
    (jobSkill) =>
      scoreJobSkill(uniqueResumeSkills, jobSkill),
  );

  const maximumPoints = contributions.reduce(
    (total, contribution) =>
      total + contribution.maximumPoints,
    0,
  );

  const earnedPoints = contributions.reduce(
    (total, contribution) =>
      total + contribution.earnedPoints,
    0,
  );

  const score =
    maximumPoints > 0
      ? Math.round(
          (earnedPoints / maximumPoints) * 100,
        )
      : 0;

  return {
    score,
    earnedPoints: roundPoints(earnedPoints),
    maximumPoints: roundPoints(maximumPoints),

    directMatches: contributions.filter(
      (contribution) =>
        contribution.matchType === "direct",
    ),

    strongRelatedMatches: contributions.filter(
      (contribution) =>
        contribution.matchType ===
        "strong_related",
    ),

    supportingRelatedMatches:
      contributions.filter(
        (contribution) =>
          contribution.matchType ===
          "supporting_related",
      ),

    missingSkills: contributions.filter(
      (contribution) =>
        contribution.matchType === "none",
    ),

    contributions,
  };
}