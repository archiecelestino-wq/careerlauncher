export const SKILL_CATEGORIES = [
  "Sales",
  "Marketing",
  "Customer Success",
  "Leadership",
  "Operations",
  "Project Management",
  "Technology",
  "Data and Analytics",
  "Finance",
  "Human Resources",
  "Logistics and Supply Chain",
  "Manufacturing",
] as const;

export type SkillCategory =
  (typeof SKILL_CATEGORIES)[number];

export type SkillWeight = 1 | 2 | 3 | 4 | 5;

export type Skill = {
  id: string;
  name: string;
  aliases: string[];
  category: SkillCategory;
  weight: SkillWeight;
};

export const SKILL_DICTIONARY: Skill[] = [
  /*
   * Sales
   */
  {
    id: "account-management",
    name: "Account Management",
    aliases: [
      "client account management",
      "customer account management",
      "key account management",
      "strategic account management",
      "enterprise account management",
      "account ownership",
      "account portfolio management",
    ],
    category: "Sales",
    weight: 5,
  },
  {
    id: "business-development",
    name: "Business Development",
    aliases: [
      "new business development",
      "business growth",
      "market development",
      "commercial development",
      "growth development",
      "new market development",
    ],
    category: "Sales",
    weight: 5,
  },
  {
    id: "sales",
    name: "Sales",
    aliases: [
      "selling",
      "commercial sales",
      "solution sales",
      "revenue generation",
      "sales execution",
    ],
    category: "Sales",
    weight: 4,
  },
  {
    id: "sales-management",
    name: "Sales Management",
    aliases: [
      "sales leadership",
      "sales team management",
      "sales force management",
      "leading sales teams",
      "commercial team leadership",
    ],
    category: "Sales",
    weight: 5,
  },
  {
    id: "sales-operations",
    name: "Sales Operations",
    aliases: [
      "sales ops",
      "commercial operations",
      "revenue operations",
      "revops",
      "sales support operations",
      "sales process management",
    ],
    category: "Sales",
    weight: 5,
  },
  {
    id: "pipeline-management",
    name: "Pipeline Management",
    aliases: [
      "sales pipeline management",
      "opportunity pipeline",
      "pipeline governance",
      "pipeline oversight",
      "pipeline hygiene",
      "sales funnel management",
    ],
    category: "Sales",
    weight: 5,
  },
  {
    id: "sales-forecasting",
    name: "Sales Forecasting",
    aliases: [
      "revenue forecasting",
      "commercial forecasting",
      "forecast management",
      "sales projections",
      "revenue projections",
    ],
    category: "Sales",
    weight: 4,
  },
  {
    id: "consultative-selling",
    name: "Consultative Selling",
    aliases: [
      "consultative sales",
      "solution selling",
      "needs-based selling",
      "advisory selling",
      "value-based selling",
    ],
    category: "Sales",
    weight: 4,
  },
  {
    id: "negotiation",
    name: "Negotiation",
    aliases: [
      "commercial negotiation",
      "contract negotiation",
      "deal negotiation",
      "client negotiation",
      "negotiating agreements",
    ],
    category: "Sales",
    weight: 4,
  },
  {
    id: "proposal-management",
    name: "Proposal Management",
    aliases: [
      "proposal development",
      "bid management",
      "tender management",
      "request for proposal",
      "rfp management",
      "proposal writing",
    ],
    category: "Sales",
    weight: 3,
  },
  {
    id: "territory-management",
    name: "Territory Management",
    aliases: [
      "sales territory management",
      "regional sales management",
      "territory planning",
      "geographic sales management",
    ],
    category: "Sales",
    weight: 3,
  },
  {
    id: "customer-relationship-management",
    name: "Customer Relationship Management",
    aliases: [
      "crm",
      "client relationship management",
      "relationship management",
      "customer management",
      "client management",
      "customer relationship building",
    ],
    category: "Sales",
    weight: 5,
  },

  /*
   * Marketing
   */
  {
    id: "marketing-strategy",
    name: "Marketing Strategy",
    aliases: [
      "strategic marketing",
      "marketing planning",
      "go-to-market strategy",
      "go to market strategy",
      "market strategy",
    ],
    category: "Marketing",
    weight: 5,
  },
  {
    id: "brand-management",
    name: "Brand Management",
    aliases: [
      "brand strategy",
      "brand development",
      "brand marketing",
      "brand stewardship",
      "brand positioning",
    ],
    category: "Marketing",
    weight: 4,
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    aliases: [
      "online marketing",
      "internet marketing",
      "digital campaigns",
      "digital media marketing",
      "performance marketing",
    ],
    category: "Marketing",
    weight: 4,
  },
  {
    id: "market-research",
    name: "Market Research",
    aliases: [
      "market analysis",
      "customer research",
      "consumer research",
      "industry research",
      "competitive research",
    ],
    category: "Marketing",
    weight: 3,
  },
  {
    id: "campaign-management",
    name: "Campaign Management",
    aliases: [
      "marketing campaign management",
      "campaign planning",
      "campaign execution",
      "integrated campaigns",
      "promotional campaign management",
    ],
    category: "Marketing",
    weight: 3,
  },
  {
    id: "product-marketing",
    name: "Product Marketing",
    aliases: [
      "product positioning",
      "product launch",
      "product go-to-market",
      "go-to-market planning",
      "product messaging",
    ],
    category: "Marketing",
    weight: 4,
  },
  {
    id: "shopper-marketing",
    name: "Shopper Marketing",
    aliases: [
      "trade marketing",
      "retail marketing",
      "in-store marketing",
      "customer marketing",
      "channel marketing",
    ],
    category: "Marketing",
    weight: 3,
  },

  /*
   * Customer Success
   */
  {
    id: "customer-success",
    name: "Customer Success",
    aliases: [
      "client success",
      "customer outcomes",
      "customer value realization",
      "client outcomes",
      "customer adoption",
    ],
    category: "Customer Success",
    weight: 5,
  },
  {
    id: "customer-retention",
    name: "Customer Retention",
    aliases: [
      "client retention",
      "account retention",
      "customer loyalty",
      "renewal management",
      "customer renewals",
    ],
    category: "Customer Success",
    weight: 4,
  },
  {
    id: "customer-experience",
    name: "Customer Experience",
    aliases: [
      "client experience",
      "customer journey",
      "customer experience management",
      "cx",
      "service experience",
    ],
    category: "Customer Success",
    weight: 4,
  },
  {
    id: "customer-onboarding",
    name: "Customer Onboarding",
    aliases: [
      "client onboarding",
      "implementation onboarding",
      "user onboarding",
      "account onboarding",
      "customer implementation",
    ],
    category: "Customer Success",
    weight: 3,
  },
  {
    id: "service-delivery",
    name: "Service Delivery",
    aliases: [
      "client service delivery",
      "customer service delivery",
      "service management",
      "delivery management",
      "service operations",
    ],
    category: "Customer Success",
    weight: 4,
  },

  /*
   * Leadership
   */
  {
    id: "people-management",
    name: "People Management",
    aliases: [
      "team management",
      "staff management",
      "personnel management",
      "managing teams",
      "employee management",
      "people leadership",
    ],
    category: "Leadership",
    weight: 5,
  },
  {
    id: "team-leadership",
    name: "Team Leadership",
    aliases: [
      "leading teams",
      "team lead",
      "leadership of teams",
      "workforce leadership",
      "staff leadership",
    ],
    category: "Leadership",
    weight: 5,
  },
  {
    id: "cross-functional-leadership",
    name: "Cross-Functional Leadership",
    aliases: [
      "cross-functional collaboration",
      "cross functional leadership",
      "cross functional collaboration",
      "matrix leadership",
      "leading across functions",
      "multi-functional leadership",
    ],
    category: "Leadership",
    weight: 5,
  },
  {
    id: "stakeholder-management",
    name: "Stakeholder Management",
    aliases: [
      "stakeholder engagement",
      "stakeholder relations",
      "stakeholder communication",
      "managing stakeholders",
      "executive stakeholder management",
    ],
    category: "Leadership",
    weight: 5,
  },
  {
    id: "executive-relationship-management",
    name: "Executive Relationship Management",
    aliases: [
      "executive relationships",
      "c-suite relationships",
      "senior stakeholder relationships",
      "executive engagement",
      "executive-level relationships",
    ],
    category: "Leadership",
    weight: 5,
  },
  {
    id: "strategic-planning",
    name: "Strategic Planning",
    aliases: [
      "strategy development",
      "business planning",
      "strategic business planning",
      "long-range planning",
      "corporate planning",
    ],
    category: "Leadership",
    weight: 5,
  },
  {
    id: "change-management",
    name: "Change Management",
    aliases: [
      "organizational change",
      "change leadership",
      "business change",
      "transformation management",
      "change implementation",
    ],
    category: "Leadership",
    weight: 4,
  },
  {
    id: "coaching-and-mentoring",
    name: "Coaching and Mentoring",
    aliases: [
      "employee coaching",
      "team coaching",
      "staff mentoring",
      "leadership coaching",
      "performance coaching",
      "people development",
    ],
    category: "Leadership",
    weight: 3,
  },
  {
    id: "decision-making",
    name: "Decision-Making",
    aliases: [
      "business decision making",
      "strategic decision making",
      "data-driven decision making",
      "commercial decision making",
    ],
    category: "Leadership",
    weight: 4,
  },

  /*
   * Operations
   */
  {
    id: "operations-management",
    name: "Operations Management",
    aliases: [
      "business operations",
      "operational management",
      "day-to-day operations",
      "operations leadership",
      "operational leadership",
    ],
    category: "Operations",
    weight: 5,
  },
  {
    id: "process-improvement",
    name: "Process Improvement",
    aliases: [
      "continuous improvement",
      "business process improvement",
      "operational improvement",
      "process optimization",
      "workflow improvement",
    ],
    category: "Operations",
    weight: 5,
  },
  {
    id: "process-automation",
    name: "Process Automation",
    aliases: [
      "workflow automation",
      "business process automation",
      "operational automation",
      "automated workflows",
      "task automation",
    ],
    category: "Operations",
    weight: 4,
  },
  {
    id: "performance-management",
    name: "Performance Management",
    aliases: [
      "performance monitoring",
      "team performance management",
      "business performance management",
      "performance tracking",
      "employee performance management",
    ],
    category: "Operations",
    weight: 4,
  },
  {
    id: "quality-management",
    name: "Quality Management",
    aliases: [
      "quality assurance",
      "qa",
      "quality control",
      "service quality",
      "quality improvement",
    ],
    category: "Operations",
    weight: 4,
  },
  {
    id: "capacity-planning",
    name: "Capacity Planning",
    aliases: [
      "resource capacity planning",
      "workforce capacity planning",
      "resource planning",
      "staffing capacity",
      "capacity management",
    ],
    category: "Operations",
    weight: 3,
  },
  {
    id: "standard-operating-procedures",
    name: "Standard Operating Procedures",
    aliases: [
      "sop",
      "sops",
      "operating procedures",
      "process documentation",
      "work instructions",
    ],
    category: "Operations",
    weight: 3,
  },
  {
    id: "service-level-management",
    name: "Service-Level Management",
    aliases: [
      "service level agreement",
      "service level agreements",
      "sla",
      "slas",
      "sla management",
      "service level compliance",
    ],
    category: "Operations",
    weight: 4,
  },
  {
    id: "risk-management",
    name: "Risk Management",
    aliases: [
      "business risk management",
      "operational risk",
      "risk assessment",
      "risk mitigation",
      "risk controls",
    ],
    category: "Operations",
    weight: 4,
  },

  /*
   * Project Management
   */
  {
    id: "project-management",
    name: "Project Management",
    aliases: [
      "project delivery",
      "project execution",
      "project leadership",
      "managing projects",
      "program delivery",
    ],
    category: "Project Management",
    weight: 5,
  },
  {
    id: "program-management",
    name: "Program Management",
    aliases: [
      "programme management",
      "program delivery",
      "portfolio program management",
      "multi-project management",
      "strategic program management",
    ],
    category: "Project Management",
    weight: 5,
  },
  {
    id: "portfolio-management",
    name: "Portfolio Management",
    aliases: [
      "project portfolio management",
      "program portfolio management",
      "initiative portfolio management",
      "portfolio governance",
    ],
    category: "Project Management",
    weight: 4,
  },
  {
    id: "agile",
    name: "Agile",
    aliases: [
      "agile methodology",
      "agile delivery",
      "agile project management",
      "agile ways of working",
      "iterative delivery",
    ],
    category: "Project Management",
    weight: 4,
  },
  {
    id: "scrum",
    name: "Scrum",
    aliases: [
      "scrum methodology",
      "scrum framework",
      "scrum delivery",
      "scrum ceremonies",
      "scrum practices",
    ],
    category: "Project Management",
    weight: 3,
  },
  {
    id: "waterfall",
    name: "Waterfall",
    aliases: [
      "waterfall methodology",
      "waterfall project management",
      "sequential project delivery",
      "traditional project management",
    ],
    category: "Project Management",
    weight: 2,
  },

  /*
   * Technology
   */
  {
    id: "digital-transformation",
    name: "Digital Transformation",
    aliases: [
      "business transformation",
      "technology transformation",
      "digitalization",
      "digitalisation",
      "digital business transformation",
    ],
    category: "Technology",
    weight: 5,
  },
  {
    id: "salesforce",
    name: "Salesforce",
    aliases: [
      "salesforce crm",
      "salesforce platform",
      "sales cloud",
      "service cloud",
      "salesforce automation",
    ],
    category: "Technology",
    weight: 4,
  },
  {
    id: "microsoft-dynamics-365",
    name: "Microsoft Dynamics 365",
    aliases: [
      "dynamics 365",
      "microsoft dynamics",
      "dynamics crm",
      "ms dynamics",
    ],
    category: "Technology",
    weight: 3,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    aliases: [
      "hubspot crm",
      "hubspot sales hub",
      "hubspot marketing hub",
      "hubspot platform",
    ],
    category: "Technology",
    weight: 3,
  },
  {
    id: "enterprise-resource-planning",
    name: "Enterprise Resource Planning",
    aliases: [
      "erp",
      "erp systems",
      "enterprise systems",
      "enterprise resource planning system",
    ],
    category: "Technology",
    weight: 4,
  },
  {
    id: "sap",
    name: "SAP",
    aliases: [
      "sap erp",
      "sap s4hana",
      "sap s/4hana",
      "sap system",
      "sap platform",
    ],
    category: "Technology",
    weight: 4,
  },
  {
    id: "microsoft-excel",
    name: "Microsoft Excel",
    aliases: [
      "excel",
      "advanced excel",
      "excel spreadsheets",
      "spreadsheet analysis",
      "microsoft spreadsheets",
    ],
    category: "Technology",
    weight: 3,
  },
  {
    id: "power-bi",
    name: "Power BI",
    aliases: [
      "microsoft power bi",
      "powerbi",
      "power bi dashboards",
      "power bi reporting",
    ],
    category: "Technology",
    weight: 4,
  },
  {
    id: "tableau",
    name: "Tableau",
    aliases: [
      "tableau dashboards",
      "tableau reporting",
      "tableau visualization",
      "tableau analytics",
    ],
    category: "Technology",
    weight: 3,
  },
  {
    id: "artificial-intelligence",
    name: "Artificial Intelligence",
    aliases: [
      "ai",
      "artificial intelligence tools",
      "ai-enabled solutions",
      "ai solutions",
      "generative ai",
      "genai",
    ],
    category: "Technology",
    weight: 4,
  },

  /*
   * Data and Analytics
   */
  {
    id: "data-analysis",
    name: "Data Analysis",
    aliases: [
      "data analytics",
      "business data analysis",
      "analytical reporting",
      "quantitative analysis",
      "data interpretation",
    ],
    category: "Data and Analytics",
    weight: 4,
  },
  {
    id: "business-intelligence",
    name: "Business Intelligence",
    aliases: [
      "bi",
      "business analytics",
      "management intelligence",
      "business reporting",
      "decision support analytics",
    ],
    category: "Data and Analytics",
    weight: 4,
  },
  {
    id: "dashboard-development",
    name: "Dashboard Development",
    aliases: [
      "dashboard creation",
      "dashboard reporting",
      "performance dashboards",
      "executive dashboards",
      "data dashboards",
    ],
    category: "Data and Analytics",
    weight: 3,
  },
  {
    id: "key-performance-indicators",
    name: "Key Performance Indicators",
    aliases: [
      "kpi",
      "kpis",
      "performance indicators",
      "performance metrics",
      "business metrics",
      "operational metrics",
    ],
    category: "Data and Analytics",
    weight: 4,
  },
  {
    id: "reporting",
    name: "Reporting",
    aliases: [
      "management reporting",
      "executive reporting",
      "performance reporting",
      "operational reporting",
      "business reporting",
    ],
    category: "Data and Analytics",
    weight: 3,
  },
  {
    id: "data-visualization",
    name: "Data Visualization",
    aliases: [
      "data visualisation",
      "visual analytics",
      "information visualization",
      "chart development",
      "visual reporting",
    ],
    category: "Data and Analytics",
    weight: 3,
  },

  /*
   * Finance
   */
  {
    id: "financial-analysis",
    name: "Financial Analysis",
    aliases: [
      "finance analysis",
      "financial performance analysis",
      "financial review",
      "commercial financial analysis",
    ],
    category: "Finance",
    weight: 4,
  },
  {
    id: "budget-management",
    name: "Budget Management",
    aliases: [
      "budgeting",
      "budget planning",
      "budget control",
      "financial budget management",
      "budget oversight",
    ],
    category: "Finance",
    weight: 4,
  },
  {
    id: "profit-and-loss-management",
    name: "Profit and Loss Management",
    aliases: [
      "p&l management",
      "p and l management",
      "profit and loss responsibility",
      "p&l ownership",
      "commercial profitability",
    ],
    category: "Finance",
    weight: 5,
  },
  {
    id: "cost-reduction",
    name: "Cost Reduction",
    aliases: [
      "cost savings",
      "cost optimization",
      "cost optimisation",
      "expense reduction",
      "operating expense reduction",
      "opex reduction",
    ],
    category: "Finance",
    weight: 4,
  },
  {
    id: "revenue-management",
    name: "Revenue Management",
    aliases: [
      "revenue growth management",
      "commercial revenue management",
      "revenue optimization",
      "revenue performance",
      "revenue oversight",
    ],
    category: "Finance",
    weight: 5,
  },

  /*
   * Human Resources
   */
  {
    id: "talent-management",
    name: "Talent Management",
    aliases: [
      "workforce talent management",
      "employee talent management",
      "talent development",
      "people development",
    ],
    category: "Human Resources",
    weight: 4,
  },
  {
    id: "recruitment",
    name: "Recruitment",
    aliases: [
      "talent acquisition",
      "hiring",
      "staff recruitment",
      "employee recruitment",
      "candidate sourcing",
    ],
    category: "Human Resources",
    weight: 4,
  },
  {
    id: "employee-engagement",
    name: "Employee Engagement",
    aliases: [
      "staff engagement",
      "workforce engagement",
      "team engagement",
      "employee experience",
      "people engagement",
    ],
    category: "Human Resources",
    weight: 3,
  },
  {
    id: "learning-and-development",
    name: "Learning and Development",
    aliases: [
      "l&d",
      "training and development",
      "employee development",
      "staff training",
      "capability development",
    ],
    category: "Human Resources",
    weight: 4,
  },
  {
    id: "workforce-planning",
    name: "Workforce Planning",
    aliases: [
      "manpower planning",
      "headcount planning",
      "staffing planning",
      "resource workforce planning",
      "workforce strategy",
    ],
    category: "Human Resources",
    weight: 4,
  },

  /*
   * Logistics and Supply Chain
   */
  {
    id: "supply-chain-management",
    name: "Supply Chain Management",
    aliases: [
      "supply chain",
      "end-to-end supply chain",
      "supply chain operations",
      "supply chain leadership",
    ],
    category: "Logistics and Supply Chain",
    weight: 5,
  },
  {
    id: "logistics-management",
    name: "Logistics Management",
    aliases: [
      "logistics operations",
      "transport logistics",
      "distribution logistics",
      "logistics planning",
      "logistics leadership",
    ],
    category: "Logistics and Supply Chain",
    weight: 5,
  },
  {
    id: "transportation-management",
    name: "Transportation Management",
    aliases: [
      "transport management",
      "fleet transportation management",
      "transport operations",
      "transport planning",
      "transportation operations",
    ],
    category: "Logistics and Supply Chain",
    weight: 4,
  },
  {
    id: "warehouse-management",
    name: "Warehouse Management",
    aliases: [
      "warehouse operations",
      "warehousing",
      "distribution center management",
      "storage operations",
      "warehouse leadership",
    ],
    category: "Logistics and Supply Chain",
    weight: 4,
  },
  {
    id: "inventory-management",
    name: "Inventory Management",
    aliases: [
      "inventory control",
      "stock management",
      "stock control",
      "inventory planning",
      "materials inventory management",
    ],
    category: "Logistics and Supply Chain",
    weight: 4,
  },
  {
    id: "procurement",
    name: "Procurement",
    aliases: [
      "purchasing",
      "strategic sourcing",
      "vendor sourcing",
      "supplier procurement",
      "procurement management",
    ],
    category: "Logistics and Supply Chain",
    weight: 4,
  },
  {
    id: "vendor-management",
    name: "Vendor Management",
    aliases: [
      "supplier management",
      "vendor relationships",
      "supplier relationships",
      "third-party management",
      "partner management",
    ],
    category: "Logistics and Supply Chain",
    weight: 4,
  },
  {
    id: "demand-planning",
    name: "Demand Planning",
    aliases: [
      "demand forecasting",
      "sales and operations planning",
      "s&op",
      "supply demand planning",
      "forecast planning",
    ],
    category: "Logistics and Supply Chain",
    weight: 4,
  },

  /*
   * Manufacturing
   */
  {
    id: "manufacturing-operations",
    name: "Manufacturing Operations",
    aliases: [
      "production operations",
      "factory operations",
      "plant operations",
      "manufacturing management",
      "production management",
    ],
    category: "Manufacturing",
    weight: 5,
  },
  {
    id: "production-planning",
    name: "Production Planning",
    aliases: [
      "manufacturing planning",
      "production scheduling",
      "factory planning",
      "capacity scheduling",
      "production control",
    ],
    category: "Manufacturing",
    weight: 4,
  },
  {
    id: "lean-manufacturing",
    name: "Lean Manufacturing",
    aliases: [
      "lean operations",
      "lean methodology",
      "lean production",
      "lean process improvement",
      "lean principles",
    ],
    category: "Manufacturing",
    weight: 4,
  },
  {
    id: "six-sigma",
    name: "Six Sigma",
    aliases: [
      "six sigma methodology",
      "lean six sigma",
      "dmaic",
      "six sigma process improvement",
    ],
    category: "Manufacturing",
    weight: 4,
  },
  {
    id: "quality-control",
    name: "Quality Control",
    aliases: [
      "production quality control",
      "manufacturing quality",
      "product quality control",
      "inspection management",
      "quality inspection",
    ],
    category: "Manufacturing",
    weight: 4,
  },
];

export function getSkillById(
  skillId: string,
): Skill | undefined {
  return SKILL_DICTIONARY.find(
    (skill) => skill.id === skillId,
  );
}

export function getSkillsByCategory(
  category: SkillCategory,
): Skill[] {
  return SKILL_DICTIONARY.filter(
    (skill) => skill.category === category,
  );
}

export function getAllSkillTerms(skill: Skill): string[] {
  return Array.from(
    new Set([skill.name, ...skill.aliases]),
  );
}