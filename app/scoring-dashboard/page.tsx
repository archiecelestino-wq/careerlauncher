"use client";

import { useMemo, useState } from "react";
import Badge, {
  type BadgeTone,
} from "../../components/dashboard/Badge";
import DashboardCard from "../../components/dashboard/DashboardCard";
import EmptyState from "../../components/dashboard/EmptyState";
import ProgressBar from "../../components/dashboard/ProgressBar";
import StatCard from "../../components/dashboard/StatCard";
import type { Skill } from "@/lib/analysis/skillDictionary";
import { findSkills } from "@/lib/analysis/skillMatcher";
import {
  scoreSkills,
  type SkillMatchType,
  type SkillScoreContribution,
} from "@/lib/analysis/scoring";

const SAMPLE_RESUME = `Account management and sales operations leader with experience managing strategic client relationships, sales forecasting, pipeline management, and business development.

Led cross-functional teams and worked with senior stakeholders to develop account plans and improve customer retention.

Used Salesforce CRM, Microsoft Excel, and Power BI to maintain pipeline hygiene, build dashboards, analyze commercial performance, and support data-driven decision-making.

Managed digital transformation and process automation projects across logistics, warehouse management, transportation management, and supply chain operations.

Led performance management, coaching, stakeholder engagement, and continuous process improvement initiatives.`;

const SAMPLE_JOB_DESCRIPTION = `We are seeking a strategic account management leader to manage enterprise customers and develop executive-level relationships.

The role requires experience in customer relationship management, customer success, customer retention, pipeline management, sales forecasting, sales operations, reporting, and strategic planning.

The successful candidate must demonstrate stakeholder management, cross-functional leadership, people management, performance management, and data analysis.

Experience with Salesforce, Power BI, digital transformation, project management, and process improvement is preferred.`;

type CategoryScore = {
  category: string;
  earnedPoints: number;
  maximumPoints: number;
  requirementCount: number;
  score: number;
};

function roundPoints(value: number): number {
  return Math.round(value * 100) / 100;
}

function countWords(value: string): number {
  const trimmedValue = value.trim();

  if (!trimmedValue) {
    return 0;
  }

  return trimmedValue.split(/\s+/).length;
}

function formatCategory(value: string): string {
  return value
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (character) =>
      character.toUpperCase(),
    );
}

function formatRelationshipType(
  value: SkillScoreContribution["relationshipType"],
): string {
  if (!value) {
    return "—";
  }

  return formatCategory(value);
}

function formatMatchType(
  matchType: SkillMatchType,
): string {
  switch (matchType) {
    case "direct":
      return "Direct";

    case "strong_related":
      return "Strong related";

    case "supporting_related":
      return "Supporting related";

    case "none":
      return "Missing";
  }
}

function getMatchTone(
  matchType: SkillMatchType,
): BadgeTone {
  switch (matchType) {
    case "direct":
      return "success";

    case "strong_related":
      return "info";

    case "supporting_related":
      return "warning";

    case "none":
      return "danger";
  }
}

function getScoreLabel(score: number): string {
  if (score >= 85) {
    return "Strong alignment";
  }

  if (score >= 70) {
    return "Good alignment";
  }

  if (score >= 50) {
    return "Moderate alignment";
  }

  if (score > 0) {
    return "Limited alignment";
  }

  return "No score available";
}

function calculateCategoryScores(
  contributions: SkillScoreContribution[],
): CategoryScore[] {
  const categoryMap = new Map<
    string,
    {
      earnedPoints: number;
      maximumPoints: number;
      requirementCount: number;
    }
  >();

  for (const contribution of contributions) {
    const category = contribution.jobSkill.category;

    const currentValue = categoryMap.get(category) ?? {
      earnedPoints: 0,
      maximumPoints: 0,
      requirementCount: 0,
    };

    currentValue.earnedPoints +=
      contribution.earnedPoints;

    currentValue.maximumPoints +=
      contribution.maximumPoints;

    currentValue.requirementCount += 1;

    categoryMap.set(category, currentValue);
  }

  return Array.from(categoryMap.entries())
    .map(([category, totals]) => ({
      category,
      earnedPoints: roundPoints(
        totals.earnedPoints,
      ),
      maximumPoints: roundPoints(
        totals.maximumPoints,
      ),
      requirementCount: totals.requirementCount,
      score:
        totals.maximumPoints > 0
          ? Math.round(
              (totals.earnedPoints /
                totals.maximumPoints) *
                100,
            )
          : 0,
    }))
    .sort((firstCategory, secondCategory) => {
      if (
        secondCategory.score !== firstCategory.score
      ) {
        return (
          secondCategory.score -
          firstCategory.score
        );
      }

      return firstCategory.category.localeCompare(
        secondCategory.category,
      );
    });
}

type TextInputPanelProps = {
  id: string;
  title: string;
  description: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

function TextInputPanel({
  id,
  title,
  description,
  placeholder,
  value,
  onChange,
}: TextInputPanelProps) {
  return (
    <DashboardCard
      title={title}
      description={description}
    >
      <label
        htmlFor={id}
        className="mt-6 block text-sm font-semibold text-slate-800"
      >
        Document content
      </label>

      <textarea
        id={id}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        spellCheck={false}
        className="mt-2 min-h-[360px] w-full resize-y rounded-3xl border border-slate-300 bg-slate-50 p-5 text-sm leading-7 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
      />

      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1.5">
          {value.length.toLocaleString()} characters
        </span>

        <span className="rounded-full bg-slate-100 px-3 py-1.5">
          {countWords(value).toLocaleString()} words
        </span>
      </div>
    </DashboardCard>
  );
}

type SkillPanelProps = {
  title: string;
  description: string;
  skills: Skill[];
};

function SkillPanel({
  title,
  description,
  skills,
}: SkillPanelProps) {
  const sortedSkills = [...skills].sort(
    (firstSkill, secondSkill) => {
      if (secondSkill.weight !== firstSkill.weight) {
        return secondSkill.weight - firstSkill.weight;
      }

      return firstSkill.name.localeCompare(
        secondSkill.name,
      );
    },
  );

  return (
    <DashboardCard
      title={title}
      description={description}
      action={
        <span className="flex h-12 min-w-12 items-center justify-center rounded-2xl bg-blue-100 px-3 text-lg font-bold text-blue-700">
          {skills.length}
        </span>
      }
    >
      {sortedSkills.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {sortedSkills.map((skill) => (
            <article
              key={skill.id}
              className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2"
            >
              <p className="text-sm font-semibold text-slate-800">
                {skill.name}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {formatCategory(skill.category)} · Weight{" "}
                {skill.weight}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No skills detected"
            description="Add document text to test the matcher."
          />
        </div>
      )}
    </DashboardCard>
  );
}

function ContributionTable({
  contributions,
}: {
  contributions: SkillScoreContribution[];
}) {
  return (
    <DashboardCard
      title="Contribution table"
      description="One scoring decision is recorded for every detected job requirement."
      className="overflow-hidden"
    >
      {contributions.length > 0 ? (
        <div className="-mx-5 mt-6 overflow-x-auto border-t border-slate-200 sm:-mx-7">
          <table className="w-full min-w-[1050px] text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">
                  Job skill
                </th>

                <th className="px-5 py-4 font-semibold">
                  Resume match
                </th>

                <th className="px-5 py-4 font-semibold">
                  Match type
                </th>

                <th className="px-5 py-4 font-semibold">
                  Relationship
                </th>

                <th className="px-5 py-4 text-right font-semibold">
                  Weight
                </th>

                <th className="px-5 py-4 text-right font-semibold">
                  Credit
                </th>

                <th className="px-5 py-4 text-right font-semibold">
                  Earned
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {contributions.map((contribution) => (
                <tr key={contribution.jobSkill.id}>
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">
                      {contribution.jobSkill.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {formatCategory(
                        contribution.jobSkill.category,
                      )}
                    </p>
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-700">
                    {contribution.resumeSkill?.name ??
                      "—"}
                  </td>

                  <td className="px-5 py-4">
                    <Badge
                      tone={getMatchTone(
                        contribution.matchType,
                      )}
                    >
                      {formatMatchType(
                        contribution.matchType,
                      )}
                    </Badge>
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {formatRelationshipType(
                      contribution.relationshipType,
                    )}
                  </td>

                  <td className="px-5 py-4 text-right font-semibold">
                    {contribution.maximumPoints}
                  </td>

                  <td className="px-5 py-4 text-right text-slate-600">
                    {Math.round(
                      contribution.creditRate * 100,
                    )}
                    %
                  </td>

                  <td className="px-5 py-4 text-right font-bold text-slate-950">
                    {contribution.earnedPoints}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No contributions available"
            description="Add a job description containing recognizable skills."
          />
        </div>
      )}
    </DashboardCard>
  );
}

function ScoreTimeline({
  contributions,
  maximumPoints,
}: {
  contributions: SkillScoreContribution[];
  maximumPoints: number;
}) {
  let runningPoints = 0;

  return (
    <DashboardCard
      title="Scoring timeline"
      description="A running view of how each job requirement builds the final score."
    >
      {contributions.length > 0 ? (
        <div className="mt-6">
          <div className="rounded-2xl bg-slate-950 p-4 text-white">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Maximum possible points
            </p>

            <p className="mt-1 text-2xl font-bold">
              {maximumPoints}
            </p>
          </div>

          <div className="mt-5 space-y-3">
            {contributions.map((contribution) => {
              runningPoints = roundPoints(
                runningPoints +
                  contribution.earnedPoints,
              );

              const runningScore =
                maximumPoints > 0
                  ? Math.round(
                      (runningPoints / maximumPoints) *
                        100,
                    )
                  : 0;

              return (
                <article
                  key={contribution.jobSkill.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-950">
                          {contribution.jobSkill.name}
                        </h3>

                        <Badge
                          tone={getMatchTone(
                            contribution.matchType,
                          )}
                        >
                          {formatMatchType(
                            contribution.matchType,
                          )}
                        </Badge>
                      </div>

                      <p className="mt-2 text-sm text-slate-600">
                        +{contribution.earnedPoints} of{" "}
                        {contribution.maximumPoints} points
                      </p>
                    </div>

                    <div className="sm:text-right">
                      <p className="font-bold text-slate-950">
                        {runningPoints} points
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Running score: {runningScore}%
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="No timeline available"
            description="The timeline will appear when job skills are detected."
          />
        </div>
      )}
    </DashboardCard>
  );
}

export default function ScoringDashboardPage() {
  const [resumeText, setResumeText] =
    useState(SAMPLE_RESUME);

  const [jobDescriptionText, setJobDescriptionText] =
    useState(SAMPLE_JOB_DESCRIPTION);

  const resumeSkills = useMemo(
    () => findSkills(resumeText),
    [resumeText],
  );

  const jobSkills = useMemo(
    () => findSkills(jobDescriptionText),
    [jobDescriptionText],
  );

  const scoringResult = useMemo(
    () => scoreSkills(resumeSkills, jobSkills),
    [resumeSkills, jobSkills],
  );

  const categoryScores = useMemo(
    () =>
      calculateCategoryScores(
        scoringResult.contributions,
      ),
    [scoringResult.contributions],
  );

  function handleLoadSample() {
    setResumeText(SAMPLE_RESUME);
    setJobDescriptionText(SAMPLE_JOB_DESCRIPTION);
  }

  function handleClear() {
    setResumeText("");
    setJobDescriptionText("");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                Development diagnostics
              </p>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Scoring Verification Dashboard
              </h1>

              <p className="mt-4 max-w-3xl leading-7 text-slate-600">
                Inspect every decision made by the
                explainable weighted skill-scoring engine
                before connecting it to the production
                analyzer.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleLoadSample}
                className="min-h-11 rounded-2xl border border-blue-200 bg-blue-50 px-4 py-2 font-semibold text-blue-700 transition hover:bg-blue-100"
              >
                Load sample
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="min-h-11 rounded-2xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear both
              </button>

              <a
                href="/"
                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                ← CareerLauncher
              </a>
            </div>
          </div>
        </header>

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <TextInputPanel
            id="resume-diagnostics-text"
            title="Resume text"
            description="Paste the candidate's resume content."
            value={resumeText}
            onChange={setResumeText}
            placeholder="Paste resume text here..."
          />

          <TextInputPanel
            id="job-description-diagnostics-text"
            title="Job-description text"
            description="Paste the target role and requirements."
            value={jobDescriptionText}
            onChange={setJobDescriptionText}
            placeholder="Paste job-description text here..."
          />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <SkillPanel
            title="Resume skills"
            description="Canonical skills detected in the resume."
            skills={resumeSkills}
          />

          <SkillPanel
            title="Job skills"
            description="Canonical requirements detected in the job description."
            skills={jobSkills}
          />
        </section>

        <section className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/40 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-300">
                Weighted skill score
              </p>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-7xl font-bold tracking-tight">
                  {scoringResult.score}
                </span>

                <span className="pb-2 text-2xl font-semibold text-slate-400">
                  %
                </span>
              </div>

              <p className="mt-3 text-lg font-semibold">
                {getScoreLabel(scoringResult.score)}
              </p>
            </div>

            <div>
              <div className="[&_[role=progressbar]]:bg-slate-800">
                <ProgressBar
                  value={scoringResult.score}
                />
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">
                    Earned points
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {scoringResult.earnedPoints}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-4">
                  <p className="text-sm text-slate-400">
                    Maximum points
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {scoringResult.maximumPoints}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8">
          <DashboardCard
            title="Scoring statistics"
            description="A high-level view of the matcher and scorer output."
          >
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              <StatCard
                label="Resume skills"
                value={resumeSkills.length}
                description="Detected in the resume."
              />

              <StatCard
                label="Job skills"
                value={jobSkills.length}
                description="Detected requirements."
              />

              <StatCard
                label="Direct"
                value={
                  scoringResult.directMatches.length
                }
                description="100% credit."
              />

              <StatCard
                label="Strong related"
                value={
                  scoringResult.strongRelatedMatches
                    .length
                }
                description="70% credit."
              />

              <StatCard
                label="Supporting"
                value={
                  scoringResult
                    .supportingRelatedMatches.length
                }
                description="40% credit."
              />

              <StatCard
                label="Missing"
                value={
                  scoringResult.missingSkills.length
                }
                description="Zero credit."
              />
            </div>
          </DashboardCard>
        </div>

        <div className="mt-8">
          <DashboardCard
            title="Category breakdown"
            description="Weighted alignment grouped by job-skill category."
          >
            {categoryScores.length > 0 ? (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {categoryScores.map((category) => (
                  <article
                    key={category.category}
                    className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-slate-950">
                          {formatCategory(
                            category.category,
                          )}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                          {category.requirementCount}{" "}
                          {category.requirementCount === 1
                            ? "requirement"
                            : "requirements"}
                        </p>
                      </div>

                      <span className="text-2xl font-bold text-blue-700">
                        {category.score}%
                      </span>
                    </div>

                    <div className="mt-4">
                      <ProgressBar
                        value={category.score}
                      />
                    </div>

                    <p className="mt-3 text-sm text-slate-600">
                      {category.earnedPoints} of{" "}
                      {category.maximumPoints} points
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState
                  title="No category results"
                  description="Category results will appear when job skills are detected."
                />
              </div>
            )}
          </DashboardCard>
        </div>

        <div className="mt-8">
          <ContributionTable
            contributions={
              scoringResult.contributions
            }
          />
        </div>

        <section className="mt-8 grid gap-8 xl:grid-cols-2">
          <ScoreTimeline
            contributions={
              scoringResult.contributions
            }
            maximumPoints={
              scoringResult.maximumPoints
            }
          />

          <DashboardCard
            title="Scoring explanations"
            description="The explanation recorded for every scoring decision."
          >
            {scoringResult.contributions.length >
            0 ? (
              <div className="mt-6 space-y-4">
                {scoringResult.contributions.map(
                  (contribution) => (
                    <article
                      key={contribution.jobSkill.id}
                      className="rounded-3xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-950">
                          {contribution.jobSkill.name}
                        </h3>

                        <Badge
                          tone={getMatchTone(
                            contribution.matchType,
                          )}
                        >
                          {formatMatchType(
                            contribution.matchType,
                          )}
                        </Badge>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {contribution.explanation}
                      </p>

                      <p className="mt-3 text-xs font-semibold text-slate-500">
                        Contribution:{" "}
                        {contribution.earnedPoints} of{" "}
                        {
                          contribution.maximumPoints
                        }{" "}
                        points
                      </p>
                    </article>
                  ),
                )}
              </div>
            ) : (
              <div className="mt-6">
                <EmptyState
                  title="No explanations available"
                  description="Explanations will appear when job skills are detected."
                />
              </div>
            )}
          </DashboardCard>
        </section>

        <aside className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-amber-950">
            Verification checklist
          </h2>

          <div className="mt-4 grid gap-4 text-sm leading-6 text-amber-900 md:grid-cols-2">
            <p>
              <strong>Direct matches</strong> should
              receive 100% of the requirement weight.
            </p>

            <p>
              <strong>Strong related matches</strong>{" "}
              should receive 70% credit.
            </p>

            <p>
              <strong>Supporting matches</strong> should
              receive 40% credit.
            </p>

            <p>
              <strong>Missing requirements</strong>{" "}
              should receive zero credit and remain
              visible.
            </p>

            <p>
              Each job skill should produce exactly one
              contribution.
            </p>

            <p>
              Unrelated resume skills should not increase
              the score.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}