export type SkillRelationshipStrength =
  | "strong"
  | "supporting";

export type SkillRelationship = {
  skillId: string;
  strength: SkillRelationshipStrength;
};

export type SkillRelationshipMap = Record<
  string,
  SkillRelationship[]
>;

export const SKILL_RELATIONSHIPS: SkillRelationshipMap = {
  /*
   * Sales
   */
  "account-management": [
    {
      skillId: "customer-relationship-management",
      strength: "strong",
    },
    {
      skillId: "customer-success",
      strength: "supporting",
    },
    {
      skillId: "customer-retention",
      strength: "supporting",
    },
    {
      skillId: "executive-relationship-management",
      strength: "supporting",
    },
  ],

  "business-development": [
    {
      skillId: "sales",
      strength: "strong",
    },
    {
      skillId: "consultative-selling",
      strength: "supporting",
    },
    {
      skillId: "negotiation",
      strength: "supporting",
    },
    {
      skillId: "market-research",
      strength: "supporting",
    },
  ],

  sales: [
    {
      skillId: "business-development",
      strength: "strong",
    },
    {
      skillId: "consultative-selling",
      strength: "strong",
    },
    {
      skillId: "sales-operations",
      strength: "supporting",
    },
    {
      skillId: "negotiation",
      strength: "supporting",
    },
  ],

  "sales-management": [
    {
      skillId: "sales",
      strength: "strong",
    },
    {
      skillId: "people-management",
      strength: "strong",
    },
    {
      skillId: "team-leadership",
      strength: "strong",
    },
    {
      skillId: "sales-operations",
      strength: "supporting",
    },
    {
      skillId: "performance-management",
      strength: "supporting",
    },
  ],

  "sales-operations": [
    {
      skillId: "pipeline-management",
      strength: "strong",
    },
    {
      skillId: "sales-forecasting",
      strength: "strong",
    },
    {
      skillId: "key-performance-indicators",
      strength: "supporting",
    },
    {
      skillId: "reporting",
      strength: "supporting",
    },
    {
      skillId: "process-improvement",
      strength: "supporting",
    },
  ],

  "pipeline-management": [
    {
      skillId: "sales-operations",
      strength: "strong",
    },
    {
      skillId: "sales-forecasting",
      strength: "strong",
    },
    {
      skillId: "customer-relationship-management",
      strength: "supporting",
    },
    {
      skillId: "salesforce",
      strength: "supporting",
    },
  ],

  "sales-forecasting": [
    {
      skillId: "pipeline-management",
      strength: "strong",
    },
    {
      skillId: "sales-operations",
      strength: "strong",
    },
    {
      skillId: "data-analysis",
      strength: "supporting",
    },
    {
      skillId: "reporting",
      strength: "supporting",
    },
  ],

  "consultative-selling": [
    {
      skillId: "sales",
      strength: "strong",
    },
    {
      skillId: "business-development",
      strength: "strong",
    },
    {
      skillId: "customer-relationship-management",
      strength: "supporting",
    },
    {
      skillId: "negotiation",
      strength: "supporting",
    },
  ],

  negotiation: [
    {
      skillId: "sales",
      strength: "supporting",
    },
    {
      skillId: "business-development",
      strength: "supporting",
    },
    {
      skillId: "proposal-management",
      strength: "supporting",
    },
    {
      skillId: "vendor-management",
      strength: "supporting",
    },
  ],

  "proposal-management": [
    {
      skillId: "business-development",
      strength: "supporting",
    },
    {
      skillId: "consultative-selling",
      strength: "supporting",
    },
    {
      skillId: "project-management",
      strength: "supporting",
    },
  ],

  "customer-relationship-management": [
    {
      skillId: "account-management",
      strength: "strong",
    },
    {
      skillId: "customer-success",
      strength: "strong",
    },
    {
      skillId: "customer-retention",
      strength: "supporting",
    },
    {
      skillId: "salesforce",
      strength: "supporting",
    },
    {
      skillId: "hubspot",
      strength: "supporting",
    },
    {
      skillId: "microsoft-dynamics-365",
      strength: "supporting",
    },
  ],

  /*
   * Marketing
   */
  "marketing-strategy": [
    {
      skillId: "market-research",
      strength: "strong",
    },
    {
      skillId: "campaign-management",
      strength: "supporting",
    },
    {
      skillId: "product-marketing",
      strength: "supporting",
    },
    {
      skillId: "brand-management",
      strength: "supporting",
    },
  ],

  "brand-management": [
    {
      skillId: "marketing-strategy",
      strength: "strong",
    },
    {
      skillId: "product-marketing",
      strength: "supporting",
    },
    {
      skillId: "campaign-management",
      strength: "supporting",
    },
  ],

  "digital-marketing": [
    {
      skillId: "campaign-management",
      strength: "strong",
    },
    {
      skillId: "marketing-strategy",
      strength: "supporting",
    },
    {
      skillId: "data-analysis",
      strength: "supporting",
    },
  ],

  "market-research": [
    {
      skillId: "marketing-strategy",
      strength: "strong",
    },
    {
      skillId: "data-analysis",
      strength: "supporting",
    },
    {
      skillId: "business-development",
      strength: "supporting",
    },
  ],

  "campaign-management": [
    {
      skillId: "digital-marketing",
      strength: "strong",
    },
    {
      skillId: "marketing-strategy",
      strength: "supporting",
    },
    {
      skillId: "project-management",
      strength: "supporting",
    },
  ],

  "product-marketing": [
    {
      skillId: "marketing-strategy",
      strength: "strong",
    },
    {
      skillId: "market-research",
      strength: "supporting",
    },
    {
      skillId: "brand-management",
      strength: "supporting",
    },
  ],

  "shopper-marketing": [
    {
      skillId: "marketing-strategy",
      strength: "supporting",
    },
    {
      skillId: "campaign-management",
      strength: "supporting",
    },
    {
      skillId: "brand-management",
      strength: "supporting",
    },
  ],

  /*
   * Customer Success
   */
  "customer-success": [
    {
      skillId: "customer-relationship-management",
      strength: "strong",
    },
    {
      skillId: "customer-retention",
      strength: "strong",
    },
    {
      skillId: "customer-onboarding",
      strength: "strong",
    },
    {
      skillId: "customer-experience",
      strength: "supporting",
    },
    {
      skillId: "account-management",
      strength: "supporting",
    },
  ],

  "customer-retention": [
    {
      skillId: "customer-success",
      strength: "strong",
    },
    {
      skillId: "account-management",
      strength: "supporting",
    },
    {
      skillId: "customer-experience",
      strength: "supporting",
    },
  ],

  "customer-experience": [
    {
      skillId: "customer-success",
      strength: "strong",
    },
    {
      skillId: "customer-onboarding",
      strength: "supporting",
    },
    {
      skillId: "service-delivery",
      strength: "supporting",
    },
  ],

  "customer-onboarding": [
    {
      skillId: "customer-success",
      strength: "strong",
    },
    {
      skillId: "customer-experience",
      strength: "supporting",
    },
    {
      skillId: "service-delivery",
      strength: "supporting",
    },
    {
      skillId: "project-management",
      strength: "supporting",
    },
  ],

  "service-delivery": [
    {
      skillId: "customer-experience",
      strength: "supporting",
    },
    {
      skillId: "operations-management",
      strength: "supporting",
    },
    {
      skillId: "service-level-management",
      strength: "strong",
    },
    {
      skillId: "quality-management",
      strength: "supporting",
    },
  ],

  /*
   * Leadership
   */
  "people-management": [
    {
      skillId: "team-leadership",
      strength: "strong",
    },
    {
      skillId: "coaching-and-mentoring",
      strength: "strong",
    },
    {
      skillId: "performance-management",
      strength: "supporting",
    },
    {
      skillId: "employee-engagement",
      strength: "supporting",
    },
  ],

  "team-leadership": [
    {
      skillId: "people-management",
      strength: "strong",
    },
    {
      skillId: "cross-functional-leadership",
      strength: "supporting",
    },
    {
      skillId: "coaching-and-mentoring",
      strength: "supporting",
    },
  ],

  "cross-functional-leadership": [
    {
      skillId: "team-leadership",
      strength: "strong",
    },
    {
      skillId: "stakeholder-management",
      strength: "strong",
    },
    {
      skillId: "project-management",
      strength: "supporting",
    },
    {
      skillId: "change-management",
      strength: "supporting",
    },
  ],

  "stakeholder-management": [
    {
      skillId: "cross-functional-leadership",
      strength: "strong",
    },
    {
      skillId: "executive-relationship-management",
      strength: "strong",
    },
    {
      skillId: "customer-relationship-management",
      strength: "supporting",
    },
    {
      skillId: "project-management",
      strength: "supporting",
    },
  ],

  "executive-relationship-management": [
    {
      skillId: "stakeholder-management",
      strength: "strong",
    },
    {
      skillId: "account-management",
      strength: "supporting",
    },
    {
      skillId: "strategic-planning",
      strength: "supporting",
    },
  ],

  "strategic-planning": [
    {
      skillId: "decision-making",
      strength: "strong",
    },
    {
      skillId: "stakeholder-management",
      strength: "supporting",
    },
    {
      skillId: "portfolio-management",
      strength: "supporting",
    },
    {
      skillId: "financial-analysis",
      strength: "supporting",
    },
  ],

  "change-management": [
    {
      skillId: "digital-transformation",
      strength: "strong",
    },
    {
      skillId: "cross-functional-leadership",
      strength: "supporting",
    },
    {
      skillId: "stakeholder-management",
      strength: "supporting",
    },
    {
      skillId: "learning-and-development",
      strength: "supporting",
    },
  ],

  "coaching-and-mentoring": [
    {
      skillId: "people-management",
      strength: "strong",
    },
    {
      skillId: "team-leadership",
      strength: "supporting",
    },
    {
      skillId: "learning-and-development",
      strength: "strong",
    },
  ],

  "decision-making": [
    {
      skillId: "strategic-planning",
      strength: "strong",
    },
    {
      skillId: "data-analysis",
      strength: "supporting",
    },
    {
      skillId: "business-intelligence",
      strength: "supporting",
    },
  ],

  /*
   * Operations
   */
  "operations-management": [
    {
      skillId: "process-improvement",
      strength: "strong",
    },
    {
      skillId: "performance-management",
      strength: "supporting",
    },
    {
      skillId: "capacity-planning",
      strength: "supporting",
    },
    {
      skillId: "risk-management",
      strength: "supporting",
    },
  ],

  "process-improvement": [
    {
      skillId: "operations-management",
      strength: "strong",
    },
    {
      skillId: "process-automation",
      strength: "strong",
    },
    {
      skillId: "quality-management",
      strength: "supporting",
    },
    {
      skillId: "lean-manufacturing",
      strength: "supporting",
    },
    {
      skillId: "six-sigma",
      strength: "supporting",
    },
  ],

  "process-automation": [
    {
      skillId: "process-improvement",
      strength: "strong",
    },
    {
      skillId: "digital-transformation",
      strength: "strong",
    },
    {
      skillId: "operations-management",
      strength: "supporting",
    },
  ],

  "performance-management": [
    {
      skillId: "key-performance-indicators",
      strength: "strong",
    },
    {
      skillId: "reporting",
      strength: "supporting",
    },
    {
      skillId: "people-management",
      strength: "supporting",
    },
    {
      skillId: "operations-management",
      strength: "supporting",
    },
  ],

  "quality-management": [
    {
      skillId: "quality-control",
      strength: "strong",
    },
    {
      skillId: "process-improvement",
      strength: "strong",
    },
    {
      skillId: "six-sigma",
      strength: "supporting",
    },
  ],

  "capacity-planning": [
    {
      skillId: "workforce-planning",
      strength: "strong",
    },
    {
      skillId: "operations-management",
      strength: "supporting",
    },
    {
      skillId: "production-planning",
      strength: "supporting",
    },
  ],

  "standard-operating-procedures": [
    {
      skillId: "process-improvement",
      strength: "supporting",
    },
    {
      skillId: "quality-management",
      strength: "supporting",
    },
    {
      skillId: "service-level-management",
      strength: "supporting",
    },
  ],

  "service-level-management": [
    {
      skillId: "service-delivery",
      strength: "strong",
    },
    {
      skillId: "quality-management",
      strength: "supporting",
    },
    {
      skillId: "performance-management",
      strength: "supporting",
    },
  ],

  "risk-management": [
    {
      skillId: "operations-management",
      strength: "supporting",
    },
    {
      skillId: "strategic-planning",
      strength: "supporting",
    },
    {
      skillId: "financial-analysis",
      strength: "supporting",
    },
  ],

  /*
   * Project Management
   */
  "project-management": [
    {
      skillId: "program-management",
      strength: "strong",
    },
    {
      skillId: "stakeholder-management",
      strength: "supporting",
    },
    {
      skillId: "risk-management",
      strength: "supporting",
    },
    {
      skillId: "agile",
      strength: "supporting",
    },
    {
      skillId: "waterfall",
      strength: "supporting",
    },
  ],

  "program-management": [
    {
      skillId: "project-management",
      strength: "strong",
    },
    {
      skillId: "portfolio-management",
      strength: "strong",
    },
    {
      skillId: "strategic-planning",
      strength: "supporting",
    },
  ],

  "portfolio-management": [
    {
      skillId: "program-management",
      strength: "strong",
    },
    {
      skillId: "strategic-planning",
      strength: "supporting",
    },
    {
      skillId: "project-management",
      strength: "supporting",
    },
  ],

  agile: [
    {
      skillId: "scrum",
      strength: "strong",
    },
    {
      skillId: "project-management",
      strength: "supporting",
    },
    {
      skillId: "process-improvement",
      strength: "supporting",
    },
  ],

  scrum: [
    {
      skillId: "agile",
      strength: "strong",
    },
    {
      skillId: "project-management",
      strength: "supporting",
    },
  ],

  waterfall: [
    {
      skillId: "project-management",
      strength: "supporting",
    },
  ],

  /*
   * Technology
   */
  "digital-transformation": [
    {
      skillId: "change-management",
      strength: "strong",
    },
    {
      skillId: "process-automation",
      strength: "strong",
    },
    {
      skillId: "process-improvement",
      strength: "supporting",
    },
    {
      skillId: "project-management",
      strength: "supporting",
    },
  ],

  salesforce: [
    {
      skillId: "customer-relationship-management",
      strength: "strong",
    },
    {
      skillId: "sales-operations",
      strength: "supporting",
    },
    {
      skillId: "pipeline-management",
      strength: "supporting",
    },
    {
      skillId: "reporting",
      strength: "supporting",
    },
  ],

  "microsoft-dynamics-365": [
    {
      skillId: "customer-relationship-management",
      strength: "strong",
    },
    {
      skillId: "sales-operations",
      strength: "supporting",
    },
    {
      skillId: "enterprise-resource-planning",
      strength: "supporting",
    },
  ],

  hubspot: [
    {
      skillId: "customer-relationship-management",
      strength: "strong",
    },
    {
      skillId: "digital-marketing",
      strength: "supporting",
    },
    {
      skillId: "sales-operations",
      strength: "supporting",
    },
  ],

  "enterprise-resource-planning": [
    {
      skillId: "sap",
      strength: "strong",
    },
    {
      skillId: "operations-management",
      strength: "supporting",
    },
    {
      skillId: "supply-chain-management",
      strength: "supporting",
    },
    {
      skillId: "financial-analysis",
      strength: "supporting",
    },
  ],

  sap: [
    {
      skillId: "enterprise-resource-planning",
      strength: "strong",
    },
    {
      skillId: "supply-chain-management",
      strength: "supporting",
    },
    {
      skillId: "manufacturing-operations",
      strength: "supporting",
    },
  ],

  "microsoft-excel": [
    {
      skillId: "data-analysis",
      strength: "strong",
    },
    {
      skillId: "reporting",
      strength: "supporting",
    },
    {
      skillId: "financial-analysis",
      strength: "supporting",
    },
  ],

  "power-bi": [
    {
      skillId: "business-intelligence",
      strength: "strong",
    },
    {
      skillId: "dashboard-development",
      strength: "strong",
    },
    {
      skillId: "data-visualization",
      strength: "strong",
    },
    {
      skillId: "data-analysis",
      strength: "supporting",
    },
    {
      skillId: "reporting",
      strength: "supporting",
    },
  ],

  tableau: [
    {
      skillId: "business-intelligence",
      strength: "strong",
    },
    {
      skillId: "dashboard-development",
      strength: "strong",
    },
    {
      skillId: "data-visualization",
      strength: "strong",
    },
    {
      skillId: "data-analysis",
      strength: "supporting",
    },
  ],

  "artificial-intelligence": [
    {
      skillId: "digital-transformation",
      strength: "supporting",
    },
    {
      skillId: "process-automation",
      strength: "supporting",
    },
    {
      skillId: "data-analysis",
      strength: "supporting",
    },
  ],

  /*
   * Data and Analytics
   */
  "data-analysis": [
    {
      skillId: "business-intelligence",
      strength: "strong",
    },
    {
      skillId: "reporting",
      strength: "supporting",
    },
    {
      skillId: "data-visualization",
      strength: "supporting",
    },
    {
      skillId: "decision-making",
      strength: "supporting",
    },
  ],

  "business-intelligence": [
    {
      skillId: "data-analysis",
      strength: "strong",
    },
    {
      skillId: "dashboard-development",
      strength: "strong",
    },
    {
      skillId: "reporting",
      strength: "strong",
    },
    {
      skillId: "data-visualization",
      strength: "supporting",
    },
  ],

  "dashboard-development": [
    {
      skillId: "business-intelligence",
      strength: "strong",
    },
    {
      skillId: "data-visualization",
      strength: "strong",
    },
    {
      skillId: "reporting",
      strength: "supporting",
    },
  ],

  "key-performance-indicators": [
    {
      skillId: "performance-management",
      strength: "strong",
    },
    {
      skillId: "reporting",
      strength: "strong",
    },
    {
      skillId: "data-analysis",
      strength: "supporting",
    },
  ],

  reporting: [
    {
      skillId: "data-analysis",
      strength: "supporting",
    },
    {
      skillId: "business-intelligence",
      strength: "supporting",
    },
    {
      skillId: "dashboard-development",
      strength: "supporting",
    },
  ],

  "data-visualization": [
    {
      skillId: "dashboard-development",
      strength: "strong",
    },
    {
      skillId: "business-intelligence",
      strength: "supporting",
    },
    {
      skillId: "reporting",
      strength: "supporting",
    },
  ],

  /*
   * Finance
   */
  "financial-analysis": [
    {
      skillId: "budget-management",
      strength: "supporting",
    },
    {
      skillId: "profit-and-loss-management",
      strength: "supporting",
    },
    {
      skillId: "revenue-management",
      strength: "supporting",
    },
    {
      skillId: "data-analysis",
      strength: "supporting",
    },
  ],

  "budget-management": [
    {
      skillId: "financial-analysis",
      strength: "strong",
    },
    {
      skillId: "cost-reduction",
      strength: "supporting",
    },
    {
      skillId: "profit-and-loss-management",
      strength: "supporting",
    },
  ],

  "profit-and-loss-management": [
    {
      skillId: "financial-analysis",
      strength: "strong",
    },
    {
      skillId: "revenue-management",
      strength: "strong",
    },
    {
      skillId: "budget-management",
      strength: "supporting",
    },
    {
      skillId: "cost-reduction",
      strength: "supporting",
    },
  ],

  "cost-reduction": [
    {
      skillId: "process-improvement",
      strength: "supporting",
    },
    {
      skillId: "budget-management",
      strength: "supporting",
    },
    {
      skillId: "financial-analysis",
      strength: "supporting",
    },
  ],

  "revenue-management": [
    {
      skillId: "sales-forecasting",
      strength: "supporting",
    },
    {
      skillId: "profit-and-loss-management",
      strength: "strong",
    },
    {
      skillId: "financial-analysis",
      strength: "supporting",
    },
    {
      skillId: "account-management",
      strength: "supporting",
    },
  ],

  /*
   * Human Resources
   */
  "talent-management": [
    {
      skillId: "people-management",
      strength: "supporting",
    },
    {
      skillId: "learning-and-development",
      strength: "strong",
    },
    {
      skillId: "employee-engagement",
      strength: "supporting",
    },
    {
      skillId: "workforce-planning",
      strength: "supporting",
    },
  ],

  recruitment: [
    {
      skillId: "talent-management",
      strength: "supporting",
    },
    {
      skillId: "workforce-planning",
      strength: "supporting",
    },
  ],

  "employee-engagement": [
    {
      skillId: "people-management",
      strength: "supporting",
    },
    {
      skillId: "talent-management",
      strength: "supporting",
    },
    {
      skillId: "coaching-and-mentoring",
      strength: "supporting",
    },
  ],

  "learning-and-development": [
    {
      skillId: "coaching-and-mentoring",
      strength: "strong",
    },
    {
      skillId: "talent-management",
      strength: "strong",
    },
    {
      skillId: "change-management",
      strength: "supporting",
    },
  ],

  "workforce-planning": [
    {
      skillId: "capacity-planning",
      strength: "strong",
    },
    {
      skillId: "talent-management",
      strength: "supporting",
    },
    {
      skillId: "operations-management",
      strength: "supporting",
    },
  ],

  /*
   * Logistics and Supply Chain
   */
  "supply-chain-management": [
    {
      skillId: "logistics-management",
      strength: "strong",
    },
    {
      skillId: "inventory-management",
      strength: "supporting",
    },
    {
      skillId: "procurement",
      strength: "supporting",
    },
    {
      skillId: "demand-planning",
      strength: "supporting",
    },
    {
      skillId: "warehouse-management",
      strength: "supporting",
    },
  ],

  "logistics-management": [
    {
      skillId: "supply-chain-management",
      strength: "strong",
    },
    {
      skillId: "transportation-management",
      strength: "strong",
    },
    {
      skillId: "warehouse-management",
      strength: "supporting",
    },
    {
      skillId: "inventory-management",
      strength: "supporting",
    },
  ],

  "transportation-management": [
    {
      skillId: "logistics-management",
      strength: "strong",
    },
    {
      skillId: "supply-chain-management",
      strength: "supporting",
    },
    {
      skillId: "operations-management",
      strength: "supporting",
    },
  ],

  "warehouse-management": [
    {
      skillId: "logistics-management",
      strength: "strong",
    },
    {
      skillId: "inventory-management",
      strength: "strong",
    },
    {
      skillId: "supply-chain-management",
      strength: "supporting",
    },
  ],

  "inventory-management": [
    {
      skillId: "warehouse-management",
      strength: "strong",
    },
    {
      skillId: "supply-chain-management",
      strength: "supporting",
    },
    {
      skillId: "demand-planning",
      strength: "supporting",
    },
  ],

  procurement: [
    {
      skillId: "vendor-management",
      strength: "strong",
    },
    {
      skillId: "supply-chain-management",
      strength: "supporting",
    },
    {
      skillId: "negotiation",
      strength: "supporting",
    },
  ],

  "vendor-management": [
    {
      skillId: "procurement",
      strength: "strong",
    },
    {
      skillId: "negotiation",
      strength: "supporting",
    },
    {
      skillId: "stakeholder-management",
      strength: "supporting",
    },
  ],

  "demand-planning": [
    {
      skillId: "sales-forecasting",
      strength: "strong",
    },
    {
      skillId: "inventory-management",
      strength: "supporting",
    },
    {
      skillId: "production-planning",
      strength: "supporting",
    },
    {
      skillId: "supply-chain-management",
      strength: "supporting",
    },
  ],

  /*
   * Manufacturing
   */
  "manufacturing-operations": [
    {
      skillId: "production-planning",
      strength: "strong",
    },
    {
      skillId: "quality-control",
      strength: "supporting",
    },
    {
      skillId: "lean-manufacturing",
      strength: "supporting",
    },
    {
      skillId: "operations-management",
      strength: "supporting",
    },
  ],

  "production-planning": [
    {
      skillId: "manufacturing-operations",
      strength: "strong",
    },
    {
      skillId: "capacity-planning",
      strength: "supporting",
    },
    {
      skillId: "demand-planning",
      strength: "supporting",
    },
  ],

  "lean-manufacturing": [
    {
      skillId: "process-improvement",
      strength: "strong",
    },
    {
      skillId: "six-sigma",
      strength: "strong",
    },
    {
      skillId: "manufacturing-operations",
      strength: "supporting",
    },
  ],

  "six-sigma": [
    {
      skillId: "process-improvement",
      strength: "strong",
    },
    {
      skillId: "quality-management",
      strength: "strong",
    },
    {
      skillId: "lean-manufacturing",
      strength: "strong",
    },
  ],

  "quality-control": [
    {
      skillId: "quality-management",
      strength: "strong",
    },
    {
      skillId: "manufacturing-operations",
      strength: "supporting",
    },
    {
      skillId: "six-sigma",
      strength: "supporting",
    },
  ],
};

export function getSkillRelationships(
  skillId: string,
): SkillRelationship[] {
  return SKILL_RELATIONSHIPS[skillId] ?? [];
}

export function getStronglyRelatedSkillIds(
  skillId: string,
): string[] {
  return getSkillRelationships(skillId)
    .filter(
      (relationship) =>
        relationship.strength === "strong",
    )
    .map((relationship) => relationship.skillId);
}

export function getSupportingSkillIds(
  skillId: string,
): string[] {
  return getSkillRelationships(skillId)
    .filter(
      (relationship) =>
        relationship.strength === "supporting",
    )
    .map((relationship) => relationship.skillId);
}

export function areSkillsRelated(
  firstSkillId: string,
  secondSkillId: string,
): boolean {
  return getSkillRelationships(firstSkillId).some(
    (relationship) =>
      relationship.skillId === secondSkillId,
  );
}