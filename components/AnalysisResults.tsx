import type { AnalysisResult } from "@/types/analysis";

type AnalysisResultsProps = {
  analysis: AnalysisResult;
};

const MAX_DISPLAYED_KEYWORDS = 12;

function formatKeyword(keyword: string): string {
  return keyword
    .split(" ")
    .map((word) => {
      if (word.length <= 3) {
        return word.toUpperCase();
      }

      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function getScoreMessage(score: number): string {
  if (score >= 80) {
    return "Strong alignment";
  }

  if (score >= 60) {
    return "Good foundation";
  }

  if (score >= 40) {
    return "Some alignment";
  }

  return "More tailoring recommended";
}

export default function AnalysisResults({
  analysis,
}: AnalysisResultsProps) {
  const displayedMatchedKeywords =
    analysis.matchedKeywords.slice(0, MAX_DISPLAYED_KEYWORDS);

  const displayedMissingKeywords =
    analysis.missingKeywords.slice(0, MAX_DISPLAYED_KEYWORDS);

  const hiddenMatchedKeywordCount = Math.max(
    analysis.matchedKeywords.length - MAX_DISPLAYED_KEYWORDS,
    0,
  );

  const hiddenMissingKeywordCount = Math.max(
    analysis.missingKeywords.length - MAX_DISPLAYED_KEYWORDS,
    0,
  );

  return (
    <section
      aria-labelledby="analysis-results-heading"
      className="mx-auto mt-12 max-w-5xl"
    >
      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-8">
        <div className="flex flex-col gap-6 border-b border-slate-200 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
              Resume analysis
            </p>

            <h2
              id="analysis-results-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
            >
              Your initial match results
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              Use these results as guidance when tailoring your resume. Only add
              skills and experience that accurately reflect your background.
            </p>
          </div>

          <div className="flex min-w-40 flex-col items-center rounded-3xl bg-blue-50 px-7 py-5 text-center">
            <span className="text-4xl font-bold text-blue-700">
              {analysis.overallScore}%
            </span>

            <span className="mt-1 text-sm font-semibold text-blue-800">
              {getScoreMessage(analysis.overallScore)}
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-teal-200 bg-teal-50/70 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Matched keywords
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  These terms appear in both your resume and the job
                  description.
                </p>
              </div>

              <span className="rounded-full bg-teal-100 px-3 py-1 text-sm font-bold text-teal-800">
                {analysis.matchedKeywords.length}
              </span>
            </div>

            {displayedMatchedKeywords.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {displayedMatchedKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-teal-200 bg-white px-3 py-1.5 text-sm font-medium text-teal-800"
                  >
                    ✓ {formatKeyword(keyword)}
                  </span>
                ))}

                {hiddenMatchedKeywordCount > 0 && (
                  <span className="rounded-full border border-teal-200 bg-teal-100 px-3 py-1.5 text-sm font-semibold text-teal-800">
                    +{hiddenMatchedKeywordCount} more
                  </span>
                )}
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm text-slate-600">
                No matching keywords were identified yet.
              </p>
            )}
          </article>

          <article className="rounded-3xl border border-amber-200 bg-amber-50/70 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Missing keywords
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Review these terms and add them only when they truthfully
                  match your experience.
                </p>
              </div>

              <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-800">
                {analysis.missingKeywords.length}
              </span>
            </div>

            {displayedMissingKeywords.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {displayedMissingKeywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded-full border border-amber-200 bg-white px-3 py-1.5 text-sm font-medium text-amber-900"
                  >
                    {formatKeyword(keyword)}
                  </span>
                ))}

                {hiddenMissingKeywordCount > 0 && (
                  <span className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1.5 text-sm font-semibold text-amber-900">
                    +{hiddenMissingKeywordCount} more
                  </span>
                )}
              </div>
            ) : (
              <p className="mt-5 rounded-2xl bg-white px-4 py-3 text-sm text-slate-600">
                No missing keywords were identified.
              </p>
            )}
          </article>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-950">
              Identified strengths
            </h3>

            <ul className="mt-4 space-y-3">
              {analysis.strengths.map((strength) => (
                <li
                  key={strength}
                  className="flex gap-3 text-sm leading-6 text-slate-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-bold text-teal-700"
                  >
                    ✓
                  </span>

                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="text-lg font-semibold text-slate-950">
              Recommendations
            </h3>

            <ul className="mt-4 space-y-3">
              {analysis.recommendations.map((recommendation) => (
                <li
                  key={recommendation}
                  className="flex gap-3 text-sm leading-6 text-slate-700"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700"
                  >
                    →
                  </span>

                  <span>{recommendation}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm leading-6 text-blue-900">
          This score is an educational estimate based on keyword alignment. It
          is not a hiring prediction or a guarantee that an applicant will pass
          an automated screening system.
        </p>
      </div>
    </section>
  );
}