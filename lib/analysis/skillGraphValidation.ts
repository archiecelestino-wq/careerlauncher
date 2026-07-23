import { getSkillById } from "./skillDictionary";
import {
  SKILL_RELATIONSHIPS,
  type SkillRelationshipStrength,
} from "./skillRelationships";
import {
  getSkillRelationshipMetadata,
  type RichSkillRelationshipType,
} from "./skillRelationshipMetadata";

export type SkillGraphIssueSeverity =
  | "error"
  | "warning"
  | "info";

export type SkillGraphIssueType =
  | "missing_source_skill"
  | "missing_target_skill"
  | "duplicate_relationship"
  | "self_relationship"
  | "low_confidence";

export type SkillGraphIssue = {
  severity: SkillGraphIssueSeverity;
  type: SkillGraphIssueType;
  sourceSkillId: string;
  targetSkillId: string | null;
  message: string;
};

export type SkillGraphEdgeReport = {
  sourceSkillId: string;
  sourceSkillName: string;
  targetSkillId: string;
  targetSkillName: string;
  strength: SkillRelationshipStrength;
  relationshipType: RichSkillRelationshipType;
  confidence: number;
  isExplicitMetadata: boolean;
  isValid: boolean;
};

export type SkillGraphValidationReport = {
  generatedAt: string;
  isValid: boolean;
  sourceSkillCount: number;
  relationshipCount: number;
  validRelationshipCount: number;
  invalidRelationshipCount: number;
  explicitMetadataCount: number;
  defaultMetadataCount: number;
  issueCount: number;
  errorCount: number;
  warningCount: number;
  infoCount: number;
  relationshipTypeCounts: Record<string, number>;
  confidenceBandCounts: {
    high: number;
    moderate: number;
    low: number;
  };
  issues: SkillGraphIssue[];
  edges: SkillGraphEdgeReport[];
};

function getConfidenceBand(
  confidence: number,
): "high" | "moderate" | "low" {
  if (confidence >= 0.85) {
    return "high";
  }

  if (confidence >= 0.7) {
    return "moderate";
  }

  return "low";
}

function createMissingSourceIssue(
  sourceSkillId: string,
): SkillGraphIssue {
  return {
    severity: "error",
    type: "missing_source_skill",
    sourceSkillId,
    targetSkillId: null,
    message: `The relationship graph contains source skill "${sourceSkillId}", but that ID does not exist in the skill dictionary.`,
  };
}

function createMissingTargetIssue(
  sourceSkillId: string,
  targetSkillId: string,
): SkillGraphIssue {
  return {
    severity: "error",
    type: "missing_target_skill",
    sourceSkillId,
    targetSkillId,
    message: `The relationship from "${sourceSkillId}" points to "${targetSkillId}", but the target ID does not exist in the skill dictionary.`,
  };
}

function createDuplicateIssue(
  sourceSkillId: string,
  targetSkillId: string,
): SkillGraphIssue {
  return {
    severity: "warning",
    type: "duplicate_relationship",
    sourceSkillId,
    targetSkillId,
    message: `The relationship from "${sourceSkillId}" to "${targetSkillId}" appears more than once.`,
  };
}

function createSelfRelationshipIssue(
  sourceSkillId: string,
): SkillGraphIssue {
  return {
    severity: "warning",
    type: "self_relationship",
    sourceSkillId,
    targetSkillId: sourceSkillId,
    message: `The skill "${sourceSkillId}" contains a relationship to itself.`,
  };
}

function createLowConfidenceIssue(
  sourceSkillId: string,
  targetSkillId: string,
  confidence: number,
): SkillGraphIssue {
  return {
    severity: "info",
    type: "low_confidence",
    sourceSkillId,
    targetSkillId,
    message: `The relationship from "${sourceSkillId}" to "${targetSkillId}" has ${Math.round(
      confidence * 100,
    )}% confidence and may need review before scoring uses confidence.`,
  };
}

export function validateSkillGraph(): SkillGraphValidationReport {
  const issues: SkillGraphIssue[] = [];
  const edges: SkillGraphEdgeReport[] = [];

  const relationshipTypeCounts: Record<
    string,
    number
  > = {};

  const confidenceBandCounts = {
    high: 0,
    moderate: 0,
    low: 0,
  };

  let relationshipCount = 0;
  let explicitMetadataCount = 0;
  let defaultMetadataCount = 0;

  for (const [
    sourceSkillId,
    relationships,
  ] of Object.entries(SKILL_RELATIONSHIPS)) {
    const sourceSkill = getSkillById(sourceSkillId);

    if (!sourceSkill) {
      issues.push(
        createMissingSourceIssue(sourceSkillId),
      );
    }

    const seenTargetIds = new Set<string>();

    for (const relationship of relationships) {
      relationshipCount += 1;

      const targetSkillId = relationship.skillId;
      const targetSkill = getSkillById(targetSkillId);

      if (seenTargetIds.has(targetSkillId)) {
        issues.push(
          createDuplicateIssue(
            sourceSkillId,
            targetSkillId,
          ),
        );
      }

      seenTargetIds.add(targetSkillId);

      if (sourceSkillId === targetSkillId) {
        issues.push(
          createSelfRelationshipIssue(sourceSkillId),
        );
      }

      if (!targetSkill) {
        issues.push(
          createMissingTargetIssue(
            sourceSkillId,
            targetSkillId,
          ),
        );
      }

      const metadata =
        getSkillRelationshipMetadata(
          sourceSkillId,
          targetSkillId,
          relationship.strength,
        );

      if (metadata.isExplicit) {
        explicitMetadataCount += 1;
      } else {
        defaultMetadataCount += 1;
      }

      relationshipTypeCounts[
        metadata.relationshipType
      ] =
        (relationshipTypeCounts[
          metadata.relationshipType
        ] ?? 0) + 1;

      const confidenceBand = getConfidenceBand(
        metadata.confidence,
      );

      confidenceBandCounts[confidenceBand] += 1;

      if (metadata.confidence < 0.65) {
        issues.push(
          createLowConfidenceIssue(
            sourceSkillId,
            targetSkillId,
            metadata.confidence,
          ),
        );
      }

      edges.push({
        sourceSkillId,
        sourceSkillName:
          sourceSkill?.name ?? "Unknown source skill",
        targetSkillId,
        targetSkillName:
          targetSkill?.name ?? "Unknown target skill",
        strength: relationship.strength,
        relationshipType:
          metadata.relationshipType,
        confidence: metadata.confidence,
        isExplicitMetadata: metadata.isExplicit,
        isValid: Boolean(sourceSkill && targetSkill),
      });
    }
  }

  const errorCount = issues.filter(
    (issue) => issue.severity === "error",
  ).length;

  const warningCount = issues.filter(
    (issue) => issue.severity === "warning",
  ).length;

  const infoCount = issues.filter(
    (issue) => issue.severity === "info",
  ).length;

  const validRelationshipCount = edges.filter(
    (edge) => edge.isValid,
  ).length;

  const invalidRelationshipCount =
    relationshipCount - validRelationshipCount;

  return {
    generatedAt: new Date().toISOString(),
    isValid: errorCount === 0,
    sourceSkillCount: Object.keys(
      SKILL_RELATIONSHIPS,
    ).length,
    relationshipCount,
    validRelationshipCount,
    invalidRelationshipCount,
    explicitMetadataCount,
    defaultMetadataCount,
    issueCount: issues.length,
    errorCount,
    warningCount,
    infoCount,
    relationshipTypeCounts,
    confidenceBandCounts,
    issues,
    edges,
  };
}