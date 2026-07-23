import { normalizeText, tokenizeText } from "./textUtils";

const GENERIC_WORDS = new Set([
  "ability",
  "able",
  "about",
  "across",
  "also",
  "applicant",
  "application",
  "apply",
  "based",
  "business",
  "candidate",
  "company",
  "customer",
  "day",
  "description",
  "develop",
  "employment",
  "ensure",
  "environment",
  "excellent",
  "experience",
  "help",
  "including",
  "individual",
  "industry",
  "job",
  "knowledge",
  "looking",
  "management",
  "must",
  "organization",
  "people",
  "position",
  "preferred",
  "provide",
  "requirements",
  "responsibilities",
  "responsible",
  "role",
  "skills",
  "strong",
  "successful",
  "support",
  "team",
  "work",
  "working",
  "years",
]);

const COMMON_SKILL_PHRASES = [
  "account management",
  "agile methodology",
  "artificial intelligence",
  "business analysis",
  "business development",
  "change management",
  "client relationship management",
  "cloud computing",
  "communication skills",
  "cross functional collaboration",
  "customer relationship management",
  "customer success",
  "data analysis",
  "data analytics",
  "digital transformation",
  "financial analysis",
  "lead generation",
  "people management",
  "performance management",
  "pipeline management",
  "process improvement",
  "product management",
  "project management",
  "relationship management",
  "revenue forecasting",
  "risk management",
  "sales operations",
  "stakeholder management",
  "strategic planning",
  "team leadership",
];

const COMMON_TOOLS_AND_TECHNOLOGIES = [
  "azure",
  "aws",
  "chatgpt",
  "excel",
  "github",
  "google analytics",
  "jira",
  "microsoft office",
  "power bi",
  "python",
  "salesforce",
  "sap",
  "sql",
  "tableau",
];

function extractKnownPhrases(text: string): string[] {
  const normalizedText = normalizeText(text);

  return [
    ...COMMON_SKILL_PHRASES,
    ...COMMON_TOOLS_AND_TECHNOLOGIES,
  ].filter((phrase) => normalizedText.includes(phrase));
}

function extractMeaningfulSingleWords(text: string): string[] {
  return tokenizeText(text).filter((word) => {
    if (GENERIC_WORDS.has(word)) {
      return false;
    }

    if (word.length < 3) {
      return false;
    }

    return true;
  });
}

export function extractSmartKeywords(text: string): string[] {
  const phrases = extractKnownPhrases(text);
  const singleWords = extractMeaningfulSingleWords(text);

  const keywords = new Set<string>([
    ...phrases,
    ...singleWords,
  ]);

  return Array.from(keywords);
}