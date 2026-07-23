import type { SkillRelationshipStrength } from "./skillRelationships";
import {
  getSkillRelationshipType,
  type SkillRelationshipType,
} from "./skillRelationshipTypes";

export const RICH_RELATIONSHIP_TYPES = [
  "supports",
  "belongs_to",
  "extends",
  "commonly_used_with",
  "enables",
  "implements",
  "requires",
  "produces",
  "used_for",
  "equivalent_to",
] as const;

export type RichSkillRelationshipType =
  (typeof RICH_RELATIONSHIP_TYPES)[number];

export type SkillRelationshipMetadata = {
  sourceSkillId: string;
  targetSkillId: string;
  relationshipType: RichSkillRelationshipType;
  confidence: number;
  isExplicit: boolean;
};

type RelationshipMetadataOverride = {
  relationshipType?: RichSkillRelationshipType;
  confidence: number;
};

const RELATIONSHIP_METADATA_OVERRIDES: Record<
  string,
  RelationshipMetadataOverride
> = {
  /*
   * CRM platforms
   */
  "salesforce::customer-relationship-management": {
    relationshipType: "implements",
    confidence: 0.98,
  },

  "microsoft-dynamics-365::customer-relationship-management":
    {
      relationshipType: "implements",
      confidence: 0.97,
    },

  "hubspot::customer-relationship-management": {
    relationshipType: "implements",
    confidence: 0.96,
  },

  "customer-relationship-management::salesforce": {
    relationshipType: "commonly_used_with",
    confidence: 0.95,
  },

  "customer-relationship-management::hubspot": {
    relationshipType: "commonly_used_with",
    confidence: 0.93,
  },

  "customer-relationship-management::microsoft-dynamics-365":
    {
      relationshipType: "commonly_used_with",
      confidence: 0.94,
    },

  /*
   * Analytics platforms
   */
  "power-bi::business-intelligence": {
    relationshipType: "implements",
    confidence: 0.97,
  },

  "power-bi::dashboard-development": {
    relationshipType: "used_for",
    confidence: 0.98,
  },

  "power-bi::data-visualization": {
    relationshipType: "used_for",
    confidence: 0.98,
  },

  "power-bi::reporting": {
    relationshipType: "produces",
    confidence: 0.96,
  },

  "power-bi::data-analysis": {
    relationshipType: "supports",
    confidence: 0.9,
  },

  "tableau::business-intelligence": {
    relationshipType: "implements",
    confidence: 0.96,
  },

  "tableau::dashboard-development": {
    relationshipType: "used_for",
    confidence: 0.98,
  },

  "tableau::data-visualization": {
    relationshipType: "used_for",
    confidence: 0.98,
  },

  "tableau::data-analysis": {
    relationshipType: "supports",
    confidence: 0.89,
  },

  "microsoft-excel::data-analysis": {
    relationshipType: "used_for",
    confidence: 0.93,
  },

  "microsoft-excel::reporting": {
    relationshipType: "produces",
    confidence: 0.91,
  },

  "microsoft-excel::financial-analysis": {
    relationshipType: "used_for",
    confidence: 0.9,
  },

  /*
   * Enterprise platforms
   */
  "sap::enterprise-resource-planning": {
    relationshipType: "implements",
    confidence: 0.98,
  },

  "enterprise-resource-planning::sap": {
    relationshipType: "commonly_used_with",
    confidence: 0.96,
  },

  "sap::supply-chain-management": {
    relationshipType: "supports",
    confidence: 0.88,
  },

  "sap::manufacturing-operations": {
    relationshipType: "supports",
    confidence: 0.87,
  },

  /*
   * Delivery methods and frameworks
   */
  "scrum::agile": {
    relationshipType: "belongs_to",
    confidence: 0.98,
  },

  "agile::scrum": {
    relationshipType: "commonly_used_with",
    confidence: 0.96,
  },

  "waterfall::project-management": {
    relationshipType: "used_for",
    confidence: 0.94,
  },

  "project-management::waterfall": {
    relationshipType: "commonly_used_with",
    confidence: 0.92,
  },

  /*
   * Operations and transformation
   */
  "artificial-intelligence::process-automation": {
    relationshipType: "enables",
    confidence: 0.88,
  },

  "artificial-intelligence::digital-transformation": {
    relationshipType: "enables",
    confidence: 0.86,
  },

  "process-automation::process-improvement": {
    relationshipType: "enables",
    confidence: 0.92,
  },

  "process-improvement::process-automation": {
    relationshipType: "commonly_used_with",
    confidence: 0.9,
  },

  "digital-transformation::process-automation": {
    relationshipType: "commonly_used_with",
    confidence: 0.91,
  },

  "digital-transformation::change-management": {
    relationshipType: "requires",
    confidence: 0.87,
  },

  /*
   * Supply chain
   */
  "transportation-management::logistics-management": {
    relationshipType: "belongs_to",
    confidence: 0.96,
  },

  "warehouse-management::logistics-management": {
    relationshipType: "belongs_to",
    confidence: 0.94,
  },

  "logistics-management::supply-chain-management": {
    relationshipType: "belongs_to",
    confidence: 0.95,
  },

  "quality-control::quality-management": {
    relationshipType: "belongs_to",
    confidence: 0.97,
  },

  "lean-manufacturing::process-improvement": {
    relationshipType: "extends",
    confidence: 0.94,
  },

  "six-sigma::process-improvement": {
    relationshipType: "extends",
    confidence: 0.95,
  },

  /*
   * Leadership and commercial capabilities
   */
  "sales-management::sales": {
    relationshipType: "extends",
    confidence: 0.94,
  },

  "consultative-selling::sales": {
    relationshipType: "extends",
    confidence: 0.91,
  },

  "program-management::project-management": {
    relationshipType: "extends",
    confidence: 0.95,
  },

  "portfolio-management::program-management": {
    relationshipType: "extends",
    confidence: 0.91,
  },

  "executive-relationship-management::stakeholder-management":
    {
      relationshipType: "extends",
      confidence: 0.9,
    },

  "people-management::team-leadership": {
    relationshipType: "supports",
    confidence: 0.92,
  },
};

function createRelationshipKey(
  sourceSkillId: string,
  targetSkillId: string,
): string {
  return `${sourceSkillId}::${targetSkillId}`;
}

function clampConfidence(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

function getDefaultConfidence(
  strength: SkillRelationshipStrength,
  relationshipType: SkillRelationshipType,
): number {
  if (relationshipType === "belongs_to") {
    return strength === "strong" ? 0.92 : 0.78;
  }

  if (relationshipType === "extends") {
    return strength === "strong" ? 0.9 : 0.76;
  }

  if (relationshipType === "enables") {
    return strength === "strong" ? 0.88 : 0.72;
  }

  if (relationshipType === "supports") {
    return strength === "strong" ? 0.86 : 0.68;
  }

  return strength === "strong" ? 0.82 : 0.64;
}

export function getSkillRelationshipMetadata(
  sourceSkillId: string,
  targetSkillId: string,
  strength: SkillRelationshipStrength,
): SkillRelationshipMetadata {
  const relationshipKey = createRelationshipKey(
    sourceSkillId,
    targetSkillId,
  );

  const override =
    RELATIONSHIP_METADATA_OVERRIDES[relationshipKey];

  const existingRelationshipType =
    getSkillRelationshipType(
      sourceSkillId,
      targetSkillId,
    );

  return {
    sourceSkillId,
    targetSkillId,
    relationshipType:
      override?.relationshipType ??
      existingRelationshipType,
    confidence: clampConfidence(
      override?.confidence ??
        getDefaultConfidence(
          strength,
          existingRelationshipType,
        ),
    ),
    isExplicit: Boolean(override),
  };
}

export function hasExplicitRelationshipMetadata(
  sourceSkillId: string,
  targetSkillId: string,
): boolean {
  const relationshipKey = createRelationshipKey(
    sourceSkillId,
    targetSkillId,
  );

  return Boolean(
    RELATIONSHIP_METADATA_OVERRIDES[relationshipKey],
  );
}

export function describeRichSkillRelationship(
  sourceSkillName: string,
  targetSkillName: string,
  relationshipType: RichSkillRelationshipType,
): string {
  switch (relationshipType) {
    case "belongs_to":
      return `${sourceSkillName} belongs to the broader capability of ${targetSkillName}.`;

    case "extends":
      return `${sourceSkillName} extends or specializes ${targetSkillName}.`;

    case "enables":
      return `${sourceSkillName} enables the delivery of ${targetSkillName}.`;

    case "supports":
      return `${sourceSkillName} supports the capability of ${targetSkillName}.`;

    case "commonly_used_with":
      return `${sourceSkillName} is commonly used alongside ${targetSkillName}.`;

    case "implements":
      return `${sourceSkillName} is a platform or method used to implement ${targetSkillName}.`;

    case "requires":
      return `${sourceSkillName} commonly requires capability in ${targetSkillName}.`;

    case "produces":
      return `${sourceSkillName} is commonly used to produce ${targetSkillName}.`;

    case "used_for":
      return `${sourceSkillName} is commonly used for ${targetSkillName}.`;

    case "equivalent_to":
      return `${sourceSkillName} is treated as substantially equivalent to ${targetSkillName}.`;
  }
}

export function formatRelationshipConfidence(
  confidence: number,
): string {
  return `${Math.round(
    clampConfidence(confidence) * 100,
  )}%`;
}