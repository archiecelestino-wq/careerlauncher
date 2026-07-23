export interface KeywordMatch {
  keyword: string;
  foundInResume: boolean;
}

export interface AnalysisResult {
  overallScore: number;
  keywordMatchScore: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  strengths: string[];
  recommendations: string[];
}