"use client";

import { findSkills } from "@/lib/analysis/skillMatcher";
import type { Skill } from "@/lib/analysis/skillDictionary";
import { useMemo, useState } from "react";

const SAMPLE_TEXT = `Strategic account management leader with experience in client relationship management, pipeline hygiene, revenue forecasting, and business development.

Led cross-functional teams and maintained executive-level relationships with senior stakeholders.

Used Salesforce CRM, Microsoft Excel, Power BI dashboards, and performance metrics to improve sales operations and support data-driven decision making.

Managed digital transformation projects involving process automation, logistics operations, warehouse management, and supply chain management.`;

function getWeightLabel(weight: Skill["weight"]): string {
  if (weight === 5) {
    return "Critical";
  }

  if (weight === 4) {
    return "High";
  }

  if (weight === 3) {
    return "Moderate";
  }

  if (weight === 2) {
    return "Supporting";
  }

  return "Low";
}

export default function SkillMatcherTestPage() {
  const [text, setText] = useState(SAMPLE_TEXT);

  const detectedSkills = useMemo(
    () => findSkills(text),
    [text],
  );

  const sortedSkills = useMemo(
    () =>
      [...detectedSkills].sort((firstSkill, secondSkill) => {
        if (secondSkill.weight !== firstSkill.weight) {
          return secondSkill.weight - firstSkill.weight;
        }

        return firstSkill.name.localeCompare(secondSkill.name);
      }),
    [detectedSkills],
  );

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();

    for (const skill of detectedSkills) {
      const currentCount = counts.get(skill.category) ?? 0;

      counts.set(skill.category, currentCount + 1);
    }

    return Array.from(counts.entries()).sort(
      ([firstCategory], [secondCategory]) =>
        firstCategory.localeCompare(secondCategory),
    );
  }, [detectedSkills]);

  function handleClearText() {
    setText("");
  }

  function handleLoadSample() {
    setText(SAMPLE_TEXT);
  }

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Development verification tool
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            Skill Matcher Test
          </h1>

          <p className="mt-4 max-w-3xl leading-7 text-slate-600">
            Use this temporary page to verify which canonical
            skills CareerLauncher detects before the matcher is
            connected to weighted scoring and the production
            analyzer.
          </p>

          <a
            href="/"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            ← Return to CareerLauncher
          </a>
        </header>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/40 sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  Test document text
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Paste resume or job-description text below.
                  Results update automatically.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleLoadSample}
                  className="min-h-10 rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  Load sample
                </button>

                <button
                  type="button"
                  onClick={handleClearText}
                  className="min-h-10 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Clear
                </button>
              </div>
            </div>

            <label
              htmlFor="matcher-test-text"
              className="mt-6 block text-sm font-semibold text-slate-800"
            >
              Document content
            </label>

            <textarea
              id="matcher-test-text"
              value={text}
              onChange={(event) => setText(event.target.value)}
              spellCheck={false}
              placeholder="Paste resume or job-description text here..."
              className="mt-2 min-h-[520px] w-full resize-y rounded-3xl border border-slate-300 bg-slate-50 p-5 text-sm leading-7 text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
            />

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                {text.length.toLocaleString()} characters
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1.5">
                {
                  text
                    .trim()
                    .split(/\s+/)
                    .filter(Boolean).length
                }{" "}
                words
              </span>
            </div>
          </section>

          <section
            aria-live="polite"
            className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/40 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  Detected canonical skills
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Multiple aliases for the same concept should
                  produce only one canonical result.
                </p>
              </div>

              <span className="flex h-12 min-w-12 items-center justify-center rounded-2xl bg-blue-100 px-3 text-lg font-bold text-blue-700">
                {detectedSkills.length}
              </span>
            </div>

            {categoryCounts.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                  Category coverage
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">
                  {categoryCounts.map(([category, count]) => (
                    <span
                      key={category}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700"
                    >
                      {category}: {count}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {sortedSkills.length > 0 ? (
              <div className="mt-6 space-y-3">
                {sortedSkills.map((skill) => (
                  <SkillResultCard
                    key={skill.id}
                    skill={skill}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
                <p className="font-semibold text-slate-800">
                  No skills detected
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Enter text containing skills or load the
                  provided sample.
                </p>
              </div>
            )}
          </section>
        </div>

        <aside className="mt-8 rounded-[2rem] border border-amber-200 bg-amber-50 p-5 sm:p-7">
          <h2 className="font-semibold text-amber-950">
            What to verify
          </h2>

          <div className="mt-3 grid gap-3 text-sm leading-6 text-amber-900 md:grid-cols-2">
            <p>
              <strong>Alias matching:</strong> “Client relationship
              management” should return Customer Relationship
              Management.
            </p>

            <p>
              <strong>Canonical naming:</strong> “Pipeline hygiene”
              should return Pipeline Management.
            </p>

            <p>
              <strong>Duplicate protection:</strong> Multiple CRM
              aliases should still produce only one CRM skill.
            </p>

            <p>
              <strong>False-positive protection:</strong> Short
              terms such as AI, SAP, and QA should not match inside
              unrelated words.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

function SkillResultCard({
  skill,
}: {
  skill: Skill;
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-slate-950">
            {skill.name}
          </h3>

          <p className="mt-1 font-mono text-xs text-slate-500">
            {skill.id}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
            {skill.category}
          </span>

          <span className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
            Weight {skill.weight} ·{" "}
            {getWeightLabel(skill.weight)}
          </span>
        </div>
      </div>
    </article>
  );
}