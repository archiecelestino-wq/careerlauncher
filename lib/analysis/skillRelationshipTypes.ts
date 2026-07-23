export const SKILL_RELATIONSHIP_TYPES = [
  "supports",
  "belongs_to",
  "extends",
  "commonly_used_with",
  "enables",
] as const;

export type SkillRelationshipType =
  (typeof SKILL_RELATIONSHIP_TYPES)[number];

export type TypedSkillRelationship = {
  sourceSkillId: string;
  targetSkillId: string;
  relationshipType: SkillRelationshipType;
};

const RELATIONSHIP_TYPE_MAP: Record<
  string,
  SkillRelationshipType
> = {
  /*
   * Sales platforms and capabilities
   */
  "salesforce::customer-relationship-management":
    "belongs_to",
  "salesforce::sales-operations": "supports",
  "salesforce::pipeline-management": "supports",
  "salesforce::reporting": "enables",

  "microsoft-dynamics-365::customer-relationship-management":
    "belongs_to",
  "microsoft-dynamics-365::sales-operations":
    "supports",
  "microsoft-dynamics-365::enterprise-resource-planning":
    "commonly_used_with",

  "hubspot::customer-relationship-management":
    "belongs_to",
  "hubspot::digital-marketing": "supports",
  "hubspot::sales-operations": "supports",

  "customer-relationship-management::salesforce":
    "commonly_used_with",
  "customer-relationship-management::hubspot":
    "commonly_used_with",
  "customer-relationship-management::microsoft-dynamics-365":
    "commonly_used_with",

  /*
   * Analytics tools and capabilities
   */
  "power-bi::business-intelligence": "belongs_to",
  "power-bi::dashboard-development": "enables",
  "power-bi::data-visualization": "enables",
  "power-bi::data-analysis": "supports",
  "power-bi::reporting": "enables",

  "tableau::business-intelligence": "belongs_to",
  "tableau::dashboard-development": "enables",
  "tableau::data-visualization": "enables",
  "tableau::data-analysis": "supports",

  "microsoft-excel::data-analysis": "supports",
  "microsoft-excel::reporting": "enables",
  "microsoft-excel::financial-analysis": "supports",

  "business-intelligence::dashboard-development":
    "enables",
  "business-intelligence::reporting": "enables",
  "business-intelligence::data-analysis": "extends",
  "business-intelligence::data-visualization":
    "supports",

  "dashboard-development::data-visualization":
    "enables",
  "dashboard-development::reporting": "enables",

  "data-analysis::business-intelligence": "supports",
  "data-analysis::reporting": "enables",
  "data-analysis::data-visualization": "supports",
  "data-analysis::decision-making": "supports",

  /*
   * Enterprise technology
   */
  "sap::enterprise-resource-planning": "belongs_to",
  "sap::supply-chain-management": "supports",
  "sap::manufacturing-operations": "supports",

  "enterprise-resource-planning::sap":
    "commonly_used_with",
  "enterprise-resource-planning::operations-management":
    "supports",
  "enterprise-resource-planning::supply-chain-management":
    "supports",
  "enterprise-resource-planning::financial-analysis":
    "supports",

  "artificial-intelligence::digital-transformation":
    "enables",
  "artificial-intelligence::process-automation":
    "enables",
  "artificial-intelligence::data-analysis":
    "supports",

  /*
   * Sales and commercial relationships
   */
  "account-management::customer-relationship-management":
    "extends",
  "account-management::customer-success": "supports",
  "account-management::customer-retention": "supports",
  "account-management::executive-relationship-management":
    "supports",

  "customer-relationship-management::account-management":
    "supports",
  "customer-relationship-management::customer-success":
    "supports",
  "customer-relationship-management::customer-retention":
    "supports",

  "business-development::sales": "extends",
  "business-development::consultative-selling":
    "commonly_used_with",
  "business-development::negotiation":
    "commonly_used_with",
  "business-development::market-research": "supports",

  "sales::business-development": "supports",
  "sales::consultative-selling": "commonly_used_with",
  "sales::sales-operations": "commonly_used_with",
  "sales::negotiation": "commonly_used_with",

  "sales-management::sales": "extends",
  "sales-management::people-management": "supports",
  "sales-management::team-leadership": "supports",
  "sales-management::sales-operations": "supports",
  "sales-management::performance-management":
    "supports",

  "sales-operations::pipeline-management": "supports",
  "sales-operations::sales-forecasting": "supports",
  "sales-operations::key-performance-indicators":
    "commonly_used_with",
  "sales-operations::reporting": "enables",
  "sales-operations::process-improvement": "supports",

  "pipeline-management::sales-operations": "supports",
  "pipeline-management::sales-forecasting":
    "commonly_used_with",
  "pipeline-management::customer-relationship-management":
    "supports",
  "pipeline-management::salesforce":
    "commonly_used_with",

  "sales-forecasting::pipeline-management":
    "commonly_used_with",
  "sales-forecasting::sales-operations": "supports",
  "sales-forecasting::data-analysis": "supports",
  "sales-forecasting::reporting": "enables",

  "consultative-selling::sales": "extends",
  "consultative-selling::business-development":
    "supports",
  "consultative-selling::customer-relationship-management":
    "supports",
  "consultative-selling::negotiation":
    "commonly_used_with",

  /*
   * Leadership
   */
  "people-management::team-leadership": "extends",
  "people-management::coaching-and-mentoring":
    "supports",
  "people-management::performance-management":
    "supports",
  "people-management::employee-engagement": "supports",

  "team-leadership::people-management": "supports",
  "team-leadership::cross-functional-leadership":
    "extends",
  "team-leadership::coaching-and-mentoring":
    "supports",

  "cross-functional-leadership::team-leadership":
    "extends",
  "cross-functional-leadership::stakeholder-management":
    "supports",
  "cross-functional-leadership::project-management":
    "supports",
  "cross-functional-leadership::change-management":
    "supports",

  "stakeholder-management::cross-functional-leadership":
    "supports",
  "stakeholder-management::executive-relationship-management":
    "extends",
  "stakeholder-management::customer-relationship-management":
    "supports",
  "stakeholder-management::project-management":
    "supports",

  "executive-relationship-management::stakeholder-management":
    "extends",
  "executive-relationship-management::account-management":
    "supports",
  "executive-relationship-management::strategic-planning":
    "supports",

  "strategic-planning::decision-making": "supports",
  "strategic-planning::stakeholder-management":
    "supports",
  "strategic-planning::portfolio-management":
    "supports",
  "strategic-planning::financial-analysis": "supports",

  "change-management::digital-transformation":
    "supports",
  "change-management::cross-functional-leadership":
    "supports",
  "change-management::stakeholder-management":
    "supports",
  "change-management::learning-and-development":
    "supports",

  /*
   * Operations
   */
  "operations-management::process-improvement":
    "supports",
  "operations-management::performance-management":
    "supports",
  "operations-management::capacity-planning":
    "supports",
  "operations-management::risk-management": "supports",

  "process-improvement::operations-management":
    "supports",
  "process-improvement::process-automation":
    "enables",
  "process-improvement::quality-management": "supports",
  "process-improvement::lean-manufacturing":
    "commonly_used_with",
  "process-improvement::six-sigma":
    "commonly_used_with",

  "process-automation::process-improvement": "enables",
  "process-automation::digital-transformation":
    "supports",
  "process-automation::operations-management":
    "supports",

  "performance-management::key-performance-indicators":
    "commonly_used_with",
  "performance-management::reporting": "enables",
  "performance-management::people-management":
    "supports",
  "performance-management::operations-management":
    "supports",

  "quality-management::quality-control": "extends",
  "quality-management::process-improvement": "supports",
  "quality-management::six-sigma":
    "commonly_used_with",

  "capacity-planning::workforce-planning": "supports",
  "capacity-planning::operations-management":
    "supports",
  "capacity-planning::production-planning": "supports",

  "service-level-management::service-delivery":
    "supports",
  "service-level-management::quality-management":
    "supports",
  "service-level-management::performance-management":
    "supports",

  /*
   * Project management
   */
  "project-management::program-management": "supports",
  "project-management::stakeholder-management":
    "supports",
  "project-management::risk-management": "supports",
  "project-management::agile":
    "commonly_used_with",
  "project-management::waterfall":
    "commonly_used_with",

  "program-management::project-management": "extends",
  "program-management::portfolio-management": "supports",
  "program-management::strategic-planning": "supports",

  "portfolio-management::program-management": "extends",
  "portfolio-management::strategic-planning": "supports",
  "portfolio-management::project-management": "supports",

  "agile::scrum": "commonly_used_with",
  "agile::project-management": "supports",
  "agile::process-improvement": "supports",

  "scrum::agile": "belongs_to",
  "scrum::project-management": "supports",

  "waterfall::project-management":
    "commonly_used_with",

  /*
   * Customer success
   */
  "customer-success::customer-relationship-management":
    "supports",
  "customer-success::customer-retention": "supports",
  "customer-success::customer-onboarding": "supports",
  "customer-success::customer-experience": "supports",
  "customer-success::account-management": "supports",

  "customer-retention::customer-success": "supports",
  "customer-retention::account-management": "supports",
  "customer-retention::customer-experience": "supports",

  "customer-experience::customer-success": "supports",
  "customer-experience::customer-onboarding":
    "supports",
  "customer-experience::service-delivery": "supports",

  "customer-onboarding::customer-success": "supports",
  "customer-onboarding::customer-experience": "supports",
  "customer-onboarding::service-delivery": "supports",
  "customer-onboarding::project-management": "supports",

  "service-delivery::customer-experience": "supports",
  "service-delivery::operations-management": "supports",
  "service-delivery::service-level-management":
    "commonly_used_with",
  "service-delivery::quality-management": "supports",

  /*
   * Supply chain and manufacturing
   */
  "supply-chain-management::logistics-management":
    "extends",
  "supply-chain-management::inventory-management":
    "supports",
  "supply-chain-management::procurement": "supports",
  "supply-chain-management::demand-planning": "supports",
  "supply-chain-management::warehouse-management":
    "supports",

  "logistics-management::supply-chain-management":
    "belongs_to",
  "logistics-management::transportation-management":
    "supports",
  "logistics-management::warehouse-management":
    "supports",
  "logistics-management::inventory-management":
    "supports",

  "transportation-management::logistics-management":
    "belongs_to",
  "transportation-management::supply-chain-management":
    "supports",
  "transportation-management::operations-management":
    "supports",

  "warehouse-management::logistics-management":
    "belongs_to",
  "warehouse-management::inventory-management":
    "supports",
  "warehouse-management::supply-chain-management":
    "supports",

  "inventory-management::warehouse-management":
    "commonly_used_with",
  "inventory-management::supply-chain-management":
    "supports",
  "inventory-management::demand-planning":
    "commonly_used_with",

  "procurement::vendor-management":
    "commonly_used_with",
  "procurement::supply-chain-management": "supports",
  "procurement::negotiation":
    "commonly_used_with",

  "vendor-management::procurement":
    "commonly_used_with",
  "vendor-management::negotiation":
    "commonly_used_with",
  "vendor-management::stakeholder-management":
    "supports",

  "demand-planning::sales-forecasting": "supports",
  "demand-planning::inventory-management":
    "commonly_used_with",
  "demand-planning::production-planning":
    "commonly_used_with",
  "demand-planning::supply-chain-management":
    "supports",

  "manufacturing-operations::production-planning":
    "supports",
  "manufacturing-operations::quality-control":
    "supports",
  "manufacturing-operations::lean-manufacturing":
    "supports",
  "manufacturing-operations::operations-management":
    "belongs_to",

  "production-planning::manufacturing-operations":
    "belongs_to",
  "production-planning::capacity-planning": "supports",
  "production-planning::demand-planning":
    "commonly_used_with",

  "lean-manufacturing::process-improvement": "extends",
  "lean-manufacturing::six-sigma":
    "commonly_used_with",
  "lean-manufacturing::manufacturing-operations":
    "supports",

  "six-sigma::process-improvement": "extends",
  "six-sigma::quality-management": "supports",
  "six-sigma::lean-manufacturing":
    "commonly_used_with",

  "quality-control::quality-management": "belongs_to",
  "quality-control::manufacturing-operations":
    "supports",
  "quality-control::six-sigma":
    "commonly_used_with",
};

function createRelationshipKey(
  sourceSkillId: string,
  targetSkillId: string,
): string {
  return `${sourceSkillId}::${targetSkillId}`;
}

export function getSkillRelationshipType(
  sourceSkillId: string,
  targetSkillId: string,
): SkillRelationshipType {
  const relationshipKey = createRelationshipKey(
    sourceSkillId,
    targetSkillId,
  );

  return (
    RELATIONSHIP_TYPE_MAP[relationshipKey] ??
    "commonly_used_with"
  );
}

export function describeSkillRelationship(
  sourceSkillName: string,
  targetSkillName: string,
  relationshipType: SkillRelationshipType,
): string {
  switch (relationshipType) {
    case "belongs_to":
      return `${sourceSkillName} belongs to the broader capability of ${targetSkillName}.`;

    case "extends":
      return `${sourceSkillName} extends or represents a more specialized form of ${targetSkillName}.`;

    case "enables":
      return `${sourceSkillName} enables or helps deliver ${targetSkillName}.`;

    case "supports":
      return `${sourceSkillName} supports the capability of ${targetSkillName}.`;

    case "commonly_used_with":
      return `${sourceSkillName} is commonly used alongside ${targetSkillName}.`;
  }
}