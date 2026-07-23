"use client";

import { buildResumeCoachingPrompt } from "@/lib/ai/promptBuilder";
import type { AnalysisResult } from "@/types/analysis";
import { useState } from "react";

type AIResumeCoachProps = {
  resumeText: string;
  jobDescriptionText: string;
  analysis: AnalysisResult;
};

export default function AIResumeCoach({
  resumeText,
  jobDescriptionText,
  analysis,
}: AIResumeCoachProps) {
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  function handleGeneratePrompt() {
    const prompt = buildResumeCoachingPrompt({
      resumeText,
      jobDescriptionText,
      analysis,
    });

    setGeneratedPrompt(prompt);
    setCopyStatus("");
  }

  async function handleCopyPrompt() {
    if (!generatedPrompt) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedPrompt);
      setCopyStatus("Prompt copied to your clipboard.");
    } catch (error) {
      console.error("Unable to copy prompt:", error);
      setCopyStatus(
        "Unable to copy automatically. Select the prompt and copy it manually.",
      );
    }
  }

  return (
    <section
      aria-labelledby="ai-resume-coach-heading"
      className="mx-auto mt-8 max-w-5xl"
    >
      <div className="rounded-[2rem] border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-5 shadow-xl shadow-slate-200/50 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
              AI resume coach
            </p>

            <h2
              id="ai-resume-coach-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
            >
              Continue your review in ChatGPT
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              CareerLauncher can create a structured coaching prompt using your
              resume, target job description, and initial match results.
            </p>
          </div>

          <div className="rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-800">
            No API key required
          </div>
        </div>

        {!generatedPrompt ? (
          <div className="mt-8 rounded-3xl border border-violet-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-950">
              Generate your coaching prompt
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              The prompt instructs ChatGPT to assess your fit, identify gaps,
              improve resume bullets, prepare interview questions, and avoid
              inventing qualifications or experience.
            </p>

            <button
              type="button"
              onClick={handleGeneratePrompt}
              className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
            >
              Generate ChatGPT prompt
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Your prompt is ready
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Review it below, copy it, and paste it into your own ChatGPT
                  conversation.
                </p>
              </div>

              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
              >
                Copy prompt
              </button>
            </div>

            {copyStatus && (
              <p
                role="status"
                className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-medium text-violet-800"
              >
                {copyStatus}
              </p>
            )}

            <textarea
              value={generatedPrompt}
              readOnly
              aria-label="Generated ChatGPT coaching prompt"
              className="mt-5 min-h-[420px] w-full resize-y rounded-3xl border border-slate-300 bg-white p-5 font-mono text-sm leading-6 text-slate-800 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
            />

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-700"
              >
                Copy prompt
              </button>

              <button
                type="button"
                onClick={handleGeneratePrompt}
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Regenerate prompt
              </button>
            </div>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Before submitting the prompt, review your resume content and
              remove any personal information you do not want to share.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}