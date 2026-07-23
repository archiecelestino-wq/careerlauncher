"use client";

import type { AnalysisResult } from "@/types/analysis";

type ResumeImprovementComparisonProps = {
  before: AnalysisResult;
  after: AnalysisResult;
};

type ImprovementLevel = {
  label: string;
  description: string;
  badgeClassName: string;
  panelClassName: string;
  textClassName: string;
};

type ReadinessLevel = {
  label: string;
  description: string;
  panelClassName: string;
  badgeClassName: string;
};

function normalizeKeyword(keyword: string): string {
  return keyword.trim().toLowerCase();
}

function sortKeywords(keywords: string[]): string[] {
  return [...keywords].sort((firstKeyword, secondKeyword) =>
    firstKeyword.localeCompare(secondKeyword),
  );
}

function getNewlyMatchedKeywords(
  before: AnalysisResult,
  after: AnalysisResult,
): string[] {
  const originalMatches = new Set(
    before.matchedKeywords.map(normalizeKeyword),
  );

  return sortKeywords(
    after.matchedKeywords.filter(
      (keyword) =>
        !originalMatches.has(normalizeKeyword(keyword)),
    ),
  );
}

function getResolvedKeywords(
  before: AnalysisResult,
  after: AnalysisResult,
): string[] {
  const remainingMissingKeywords = new Set(
    after.missingKeywords.map(normalizeKeyword),
  );

  return sortKeywords(
    before.missingKeywords.filter(
      (keyword) =>
        !remainingMissingKeywords.has(
          normalizeKeyword(keyword),
        ),
    ),
  );
}

function getRemainingKeywords(
  after: AnalysisResult,
): string[] {
  return sortKeywords(after.missingKeywords);
}

function getImprovementLevel(
  scoreImprovement: number,
): ImprovementLevel {
  if (scoreImprovement >= 20) {
    return {
      label: "Outstanding improvement",
      description:
        "The revised resume shows a major increase in alignment with the target role.",
      badgeClassName:
        "border-emerald-200 bg-emerald-100 text-emerald-800",
      panelClassName:
        "border-emerald-200 bg-emerald-50",
      textClassName: "text-emerald-800",
    };
  }

  if (scoreImprovement >= 10) {
    return {
      label: "Excellent improvement",
      description:
        "The revised resume is substantially better aligned with the job description.",
      badgeClassName:
        "border-teal-200 bg-teal-100 text-teal-800",
      panelClassName: "border-teal-200 bg-teal-50",
      textClassName: "text-teal-800",
    };
  }

  if (scoreImprovement >= 5) {
    return {
      label: "Good improvement",
      description:
        "The revised resume addresses several important gaps from the original version.",
      badgeClassName:
        "border-blue-200 bg-blue-100 text-blue-800",
      panelClassName: "border-blue-200 bg-blue-50",
      textClassName: "text-blue-800",
    };
  }

  if (scoreImprovement > 0) {
    return {
      label: "Minimal improvement",
      description:
        "The revised resume improved slightly, but additional refinement may still be useful.",
      badgeClassName:
        "border-amber-200 bg-amber-100 text-amber-800",
      panelClassName: "border-amber-200 bg-amber-50",
      textClassName: "text-amber-800",
    };
  }

  if (scoreImprovement === 0) {
    return {
      label: "No measurable improvement",
      description:
        "The revised resume received the same alignment score as the original version.",
      badgeClassName:
        "border-slate-200 bg-slate-100 text-slate-700",
      panelClassName: "border-slate-200 bg-slate-50",
      textClassName: "text-slate-700",
    };
  }

  return {
    label: "Alignment decreased",
    description:
      "The revised resume scored lower than the original version. Review the changes before applying.",
    badgeClassName:
      "border-red-200 bg-red-100 text-red-800",
    panelClassName: "border-red-200 bg-red-50",
    textClassName: "text-red-800",
  };
}

function getReadinessLevel(
  score: number,
): ReadinessLevel {
  if (score >= 90) {
    return {
      label: "Ready to apply",
      description:
        "Your revised resume is highly aligned with the role. Focus next on application quality and interview preparation.",
      panelClassName:
        "border-emerald-200 bg-emerald-50",
      badgeClassName:
        "bg-emerald-100 text-emerald-800",
    };
  }

  if (score >= 80) {
    return {
      label: "Competitive candidate",
      description:
        "Your revised resume is strongly aligned. Review the remaining gaps and confirm that all claims are accurate.",
      panelClassName: "border-blue-200 bg-blue-50",
      badgeClassName: "bg-blue-100 text-blue-800",
    };
  }

  if (score >= 70) {
    return {
      label: "Good progress",
      description:
        "Your revised resume is moving in the right direction. One more focused revision may strengthen your application.",
      panelClassName:
        "border-amber-200 bg-amber-50",
      badgeClassName:
        "bg-amber-100 text-amber-800",
    };
  }

  return {
    label: "More improvement needed",
    description:
      "Significant alignment gaps remain. Another revision is recommended before submitting your application.",
    panelClassName: "border-red-200 bg-red-50",
    badgeClassName: "bg-red-100 text-red-800",
  };
}

function ScoreCard({
  label,
  score,
  description,
  emphasized = false,
}: {
  label: string;
  score: number;
  description: string;
  emphasized?: boolean;
}) {
  return (
    <article
      className={`rounded-3xl border p-6 ${
        emphasized
          ? "border-blue-200 bg-blue-50"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <div className="mt-3 flex items-end gap-1">
        <span
          className={`text-5xl font-bold tracking-tight ${
            emphasized
              ? "text-blue-700"
              : "text-slate-950"
          }`}
        >
          {score}
        </span>

        <span className="pb-1 text-xl font-semibold text-slate-500">
          %
        </span>
      </div>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </article>
  );
}

function KeywordList({
  title,
  description,
  keywords,
  emptyTitle,
  emptyDescription,
  symbol,
  symbolClassName,
}: {
  title: string;
  description: string;
  keywords: string[];
  emptyTitle: string;
  emptyDescription: string;
  symbol: string;
  symbolClassName: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-950">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      {keywords.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {keywords.map((keyword) => (
            <li
              key={keyword}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-sm font-bold ${symbolClassName}`}
              >
                {symbol}
              </span>

              <span className="text-sm font-medium leading-6 text-slate-800">
                {keyword}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-5 py-6 text-center">
          <p className="font-semibold text-slate-800">
            {emptyTitle}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            {emptyDescription}
          </p>
        </div>
      )}
    </article>
  );
}

export default function ResumeImprovementComparison({
  before,
  after,
}: ResumeImprovementComparisonProps) {
  const scoreImprovement =
    after.overallScore - before.overallScore;

  const keywordScoreImprovement =
    after.keywordMatchScore -
    before.keywordMatchScore;

  const newlyMatchedKeywords =
    getNewlyMatchedKeywords(before, after);

  const resolvedKeywords = getResolvedKeywords(
    before,
    after,
  );

  const remainingKeywords =
    getRemainingKeywords(after);

  const improvementLevel =
    getImprovementLevel(scoreImprovement);

  const readinessLevel =
    getReadinessLevel(after.overallScore);

  const improvementDisplay =
    scoreImprovement > 0
      ? `+${scoreImprovement}`
      : `${scoreImprovement}`;

  const keywordImprovementDisplay =
    keywordScoreImprovement > 0
      ? `+${keywordScoreImprovement}`
      : `${keywordScoreImprovement}`;

  return (
    <section
      aria-labelledby="resume-improvement-title"
      className="mx-auto mt-10 max-w-5xl"
    >
      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
        <div className="border-b border-slate-200 bg-slate-950 px-6 py-8 text-white sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
            Before-and-after validation
          </p>

          <h2
            id="resume-improvement-title"
            className="mt-2 text-3xl font-bold tracking-tight"
          >
            Resume Improvement Report
          </h2>

          <p className="mt-3 max-w-3xl leading-7 text-slate-300">
            CareerLauncher analyzed your revised resume
            against the same job description so you can
            see what improved and what still needs
            attention.
          </p>
        </div>

        <div className="p-5 sm:p-8">
          <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <ScoreCard
              label="Original resume"
              score={before.overallScore}
              description="Your alignment score before the rewrite."
            />

            <div className="flex items-center justify-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-xl font-bold text-slate-500 md:rotate-0">
                →
              </div>
            </div>

            <ScoreCard
              label="Revised resume"
              score={after.overallScore}
              description="Your alignment score after the rewrite."
              emphasized
            />
          </div>

          <div
            className={`mt-6 rounded-3xl border p-6 ${improvementLevel.panelClassName}`}
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span
                  className={`inline-flex rounded-full border px-3 py-1.5 text-sm font-semibold ${improvementLevel.badgeClassName}`}
                >
                  {improvementLevel.label}
                </span>

                <p
                  className={`mt-3 leading-7 ${improvementLevel.textClassName}`}
                >
                  {improvementLevel.description}
                </p>
              </div>

              <div className="shrink-0 sm:text-right">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Overall change
                </p>

                <p
                  className={`mt-1 text-5xl font-bold tracking-tight ${improvementLevel.textClassName}`}
                >
                  {improvementDisplay}
                  <span className="text-2xl">%</span>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Matched keywords before
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {before.matchedKeywords.length}
              </p>
            </article>

            <article className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
              <p className="text-sm font-medium text-blue-700">
                Matched keywords after
              </p>

              <p className="mt-2 text-3xl font-bold text-blue-800">
                {after.matchedKeywords.length}
              </p>
            </article>

            <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-600">
                Missing keywords before
              </p>

              <p className="mt-2 text-3xl font-bold text-slate-950">
                {before.missingKeywords.length}
              </p>
            </article>

            <article className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-sm font-medium text-amber-800">
                Still missing
              </p>

              <p className="mt-2 text-3xl font-bold text-amber-900">
                {after.missingKeywords.length}
              </p>
            </article>
          </div>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Keyword alignment
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Measures how strongly your resume
                  reflects the language and requirements
                  of the job description.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Before
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {before.keywordMatchScore}%
                  </p>
                </div>

                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    After
                  </p>

                  <p className="mt-1 text-xl font-bold text-blue-700">
                    {after.keywordMatchScore}%
                  </p>
                </div>

                <div className="rounded-2xl bg-white px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Change
                  </p>

                  <p className="mt-1 text-xl font-bold text-slate-900">
                    {keywordImprovementDisplay}%
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <KeywordList
              title="New skills demonstrated"
              description="These keywords were missing from the original resume but are now recognized."
              keywords={newlyMatchedKeywords}
              emptyTitle="No newly matched keywords"
              emptyDescription="The revised version did not add any new recognized job-description keywords."
              symbol="✓"
              symbolClassName="bg-emerald-100 text-emerald-700"
            />

            <KeywordList
              title="Resolved skill gaps"
              description="These requirements were previously missing and are no longer listed as gaps."
              keywords={resolvedKeywords}
              emptyTitle="No resolved gaps detected"
              emptyDescription="The same missing requirements may still need more explicit evidence."
              symbol="✓"
              symbolClassName="bg-teal-100 text-teal-700"
            />
          </div>

          <div className="mt-6">
            <KeywordList
              title="Skills still missing"
              description="Only add these skills when they genuinely reflect your experience, knowledge, or qualifications."
              keywords={remainingKeywords}
              emptyTitle="No missing keywords detected"
              emptyDescription="The analyzer found evidence for all recognized requirements in the revised resume."
              symbol="○"
              symbolClassName="bg-amber-100 text-amber-800"
            />
          </div>

          <div
            className={`mt-6 rounded-3xl border p-6 ${readinessLevel.panelClassName}`}
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Application readiness
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-950">
                  {readinessLevel.label}
                </h3>

                <p className="mt-3 max-w-3xl leading-7 text-slate-700">
                  {readinessLevel.description}
                </p>
              </div>

              <span
                className={`inline-flex shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${readinessLevel.badgeClassName}`}
              >
                {after.overallScore}% aligned
              </span>
            </div>
          </div>

          <aside className="mt-6 rounded-3xl border border-slate-200 bg-white p-6">
            <h3 className="font-semibold text-slate-950">
              Responsible use reminder
            </h3>

            <p className="mt-2 text-sm leading-7 text-slate-600">
              A higher score does not guarantee an
              interview or job offer. Review every
              statement in the revised resume and remove
              anything that is inaccurate, exaggerated,
              or unsupported by your actual experience.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}