import Badge, {
  type BadgeTone,
} from "../../components/dashboard/Badge";
import DashboardCard from "../../components/dashboard/DashboardCard";
import EmptyState from "../../components/dashboard/EmptyState";
import StatCard from "../../components/dashboard/StatCard";
import {
  validateSkillGraph,
  type SkillGraphIssueSeverity,
} from "../../lib/analysis/skillGraphValidation";
import { formatRelationshipConfidence } from "../../lib/analysis/skillRelationshipMetadata";

function formatValue(value: string): string {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase(),
    );
}

function getSeverityTone(
  severity: SkillGraphIssueSeverity,
): BadgeTone {
  switch (severity) {
    case "error":
      return "danger";

    case "warning":
      return "warning";

    case "info":
      return "info";
  }
}

export default function SkillGraphReportPage() {
  const report = validateSkillGraph();

  const relationshipTypeEntries = Object.entries(
    report.relationshipTypeCounts,
  ).sort(
    ([firstType], [secondType]) =>
      firstType.localeCompare(secondType),
  );

  const invalidEdges = report.edges.filter(
    (edge) => !edge.isValid,
  );

  const explicitEdges = report.edges.filter(
    (edge) => edge.isExplicitMetadata,
  );

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Development diagnostics
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Skill Graph Validation Report
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Validate relationship IDs, metadata coverage,
            confidence levels, and graph integrity before
            confidence affects production scoring.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="/scoring-dashboard"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-700 transition hover:bg-blue-100"
            >
              Scoring dashboard
            </a>

            <a
              href="/skill-matcher-test"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Skill matcher test
            </a>

            <a
              href="/"
              className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              ← CareerLauncher
            </a>
          </div>
        </header>

        <section
          className={`mt-8 rounded-[2rem] border p-6 sm:p-8 ${
            report.isValid
              ? "border-emerald-200 bg-emerald-50"
              : "border-red-200 bg-red-50"
          }`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p
                className={`text-sm font-semibold uppercase tracking-wider ${
                  report.isValid
                    ? "text-emerald-700"
                    : "text-red-700"
                }`}
              >
                Graph status
              </p>

              <h2
                className={`mt-2 text-2xl font-bold ${
                  report.isValid
                    ? "text-emerald-950"
                    : "text-red-950"
                }`}
              >
                {report.isValid
                  ? "No blocking graph errors detected"
                  : "Graph errors require attention"}
              </h2>

              <p
                className={`mt-2 text-sm ${
                  report.isValid
                    ? "text-emerald-800"
                    : "text-red-800"
                }`}
              >
                Generated{" "}
                {new Date(
                  report.generatedAt,
                ).toLocaleString()}
              </p>
            </div>

            <Badge
              tone={
                report.isValid ? "success" : "danger"
              }
            >
              {report.isValid ? "Valid" : "Invalid"}
            </Badge>
          </div>
        </section>

        <div className="mt-8">
          <DashboardCard
            title="Graph statistics"
            description="Structural totals for the current relationship graph."
          >
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard
                label="Source skills"
                value={report.sourceSkillCount}
                description="Skills containing relationship records."
              />

              <StatCard
                label="Relationships"
                value={report.relationshipCount}
                description="Total directed graph edges."
              />

              <StatCard
                label="Valid relationships"
                value={report.validRelationshipCount}
                description="Edges whose source and target IDs exist."
              />

              <StatCard
                label="Invalid relationships"
                value={report.invalidRelationshipCount}
                description="Edges containing missing dictionary IDs."
              />

              <StatCard
                label="Explicit metadata"
                value={report.explicitMetadataCount}
                description="Relationships with curated confidence or semantics."
              />

              <StatCard
                label="Default metadata"
                value={report.defaultMetadataCount}
                description="Relationships using deterministic defaults."
              />

              <StatCard
                label="Errors"
                value={report.errorCount}
                description="Blocking graph-integrity problems."
              />

              <StatCard
                label="Warnings"
                value={report.warningCount}
                description="Duplicates or self-references."
              />
            </div>
          </DashboardCard>
        </div>

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <DashboardCard
            title="Confidence distribution"
            description="Confidence currently describes relationship reliability, not scoring credit."
          >
            <div className="mt-6 space-y-4">
              <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                <p className="text-sm font-semibold text-emerald-700">
                  High confidence
                </p>

                <p className="mt-2 text-3xl font-bold text-emerald-950">
                  {report.confidenceBandCounts.high}
                </p>

                <p className="mt-2 text-sm text-emerald-800">
                  85% confidence or higher
                </p>
              </article>

              <article className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
                <p className="text-sm font-semibold text-blue-700">
                  Moderate confidence
                </p>

                <p className="mt-2 text-3xl font-bold text-blue-950">
                  {report.confidenceBandCounts.moderate}
                </p>

                <p className="mt-2 text-sm text-blue-800">
                  70% to 84% confidence
                </p>
              </article>

              <article className="rounded-3xl border border-amber-200 bg-amber-50 p-5">
                <p className="text-sm font-semibold text-amber-700">
                  Low confidence
                </p>

                <p className="mt-2 text-3xl font-bold text-amber-950">
                  {report.confidenceBandCounts.low}
                </p>

                <p className="mt-2 text-sm text-amber-800">
                  Below 70% confidence
                </p>
              </article>
            </div>
          </DashboardCard>

          <DashboardCard
            title="Relationship semantics"
            description="Number of graph edges assigned to each semantic type."
          >
            {relationshipTypeEntries.length > 0 ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {relationshipTypeEntries.map(
                  ([relationshipType, count]) => (
                    <article
                      key={relationshipType}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <p className="font-semibold text-slate-800">
                        {formatValue(relationshipType)}
                      </p>

                      <span className="text-xl font-bold text-blue-700">
                        {count}
                      </span>
                    </article>
                  ),
                )}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState
                  title="No relationship types"
                  description="No graph relationship semantics were found."
                />
              </div>
            )}
          </DashboardCard>
        </section>

        <div className="mt-8">
          <DashboardCard
            title="Validation issues"
            description="Errors, warnings, and low-confidence relationships requiring review."
          >
            {report.issues.length > 0 ? (
              <div className="mt-6 space-y-3">
                {report.issues.map((issue, index) => (
                  <article
                    key={`${issue.type}-${issue.sourceSkillId}-${issue.targetSkillId}-${index}`}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        tone={getSeverityTone(
                          issue.severity,
                        )}
                      >
                        {formatValue(issue.severity)}
                      </Badge>

                      <Badge tone="neutral">
                        {formatValue(issue.type)}
                      </Badge>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-700">
                      {issue.message}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState
                  title="No validation issues"
                  description="The current graph contains no errors, warnings, or low-confidence review items."
                />
              </div>
            )}
          </DashboardCard>
        </div>

        {invalidEdges.length > 0 && (
          <div className="mt-8">
            <DashboardCard
              title="Invalid graph edges"
              description="Relationships that reference missing dictionary skills."
            >
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[800px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">
                        Source
                      </th>

                      <th className="px-4 py-3">
                        Target
                      </th>

                      <th className="px-4 py-3">
                        Strength
                      </th>

                      <th className="px-4 py-3">
                        Semantic type
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {invalidEdges.map((edge) => (
                      <tr
                        key={`${edge.sourceSkillId}-${edge.targetSkillId}`}
                      >
                        <td className="px-4 py-3">
                          {edge.sourceSkillId}
                        </td>

                        <td className="px-4 py-3">
                          {edge.targetSkillId}
                        </td>

                        <td className="px-4 py-3">
                          {formatValue(edge.strength)}
                        </td>

                        <td className="px-4 py-3">
                          {formatValue(
                            edge.relationshipType,
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DashboardCard>
          </div>
        )}

        <div className="mt-8">
          <DashboardCard
            title="Curated metadata sample"
            description="Relationships currently using explicitly reviewed semantics and confidence."
          >
            {explicitEdges.length > 0 ? (
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[1000px] text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                    <tr>
                      <th className="px-4 py-3">
                        Source skill
                      </th>

                      <th className="px-4 py-3">
                        Target skill
                      </th>

                      <th className="px-4 py-3">
                        Strength
                      </th>

                      <th className="px-4 py-3">
                        Semantic type
                      </th>

                      <th className="px-4 py-3 text-right">
                        Confidence
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {explicitEdges
                      .slice(0, 50)
                      .map((edge) => (
                        <tr
                          key={`${edge.sourceSkillId}-${edge.targetSkillId}`}
                        >
                          <td className="px-4 py-3 font-semibold text-slate-900">
                            {edge.sourceSkillName}
                          </td>

                          <td className="px-4 py-3 text-slate-700">
                            {edge.targetSkillName}
                          </td>

                          <td className="px-4 py-3">
                            {formatValue(edge.strength)}
                          </td>

                          <td className="px-4 py-3">
                            {formatValue(
                              edge.relationshipType,
                            )}
                          </td>

                          <td className="px-4 py-3 text-right font-semibold">
                            {formatRelationshipConfidence(
                              edge.confidence,
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {explicitEdges.length > 50 && (
                  <p className="mt-4 text-sm text-slate-500">
                    Showing the first 50 of{" "}
                    {explicitEdges.length} curated
                    relationships.
                  </p>
                )}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState
                  title="No curated metadata"
                  description="Explicit relationship metadata has not been added."
                />
              </div>
            )}
          </DashboardCard>
        </div>
      </div>
    </main>
  );
}