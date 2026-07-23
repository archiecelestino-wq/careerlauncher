"use client";

import ResponsibleUseNotice from "@/components/ResponsibleUseNotice";
import { buildResumeCoachingPrompt } from "@/lib/ai/promptBuilder";
import type { AnalysisResult } from "@/types/analysis";
import { useState } from "react";

type AIResumeCoachProps = {
  resumeText: string;
  jobDescriptionText: string;
  analysis: AnalysisResult;
};

type CopyStatus = {
  type: "success" | "error";
  message: string;
} | null;

const LONG_PROMPT_CHARACTER_LIMIT = 30_000;
const CHATGPT_URL = "https://chatgpt.com/";

export default function AIResumeCoach({
  resumeText,
  jobDescriptionText,
  analysis,
}: AIResumeCoachProps) {
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copyStatus, setCopyStatus] = useState<CopyStatus>(null);
  const [generationError, setGenerationError] = useState("");

  const hasResumeText = resumeText.trim().length > 0;
  const hasJobDescriptionText =
    jobDescriptionText.trim().length > 0;

  const canGeneratePrompt =
    hasResumeText && hasJobDescriptionText;

  const promptCharacterCount = generatedPrompt.length;

  const isLongPrompt =
    promptCharacterCount > LONG_PROMPT_CHARACTER_LIMIT;

  function handleGeneratePrompt() {
    setCopyStatus(null);
    setGenerationError("");

    if (!hasResumeText && !hasJobDescriptionText) {
      setGeneratedPrompt("");
      setGenerationError(
        "CareerLauncher could not extract readable text from either document. Try uploading text-based PDF, DOCX, or TXT files.",
      );
      return;
    }

    if (!hasResumeText) {
      setGeneratedPrompt("");
      setGenerationError(
        "CareerLauncher could not extract readable text from your resume. Try uploading a text-based PDF, DOCX, or TXT file.",
      );
      return;
    }

    if (!hasJobDescriptionText) {
      setGeneratedPrompt("");
      setGenerationError(
        "CareerLauncher could not extract readable text from the job description. Try uploading a text-based PDF, DOCX, or TXT file.",
      );
      return;
    }

    const prompt = buildResumeCoachingPrompt({
      resumeText: resumeText.trim(),
      jobDescriptionText: jobDescriptionText.trim(),
      analysis,
    });

    if (!prompt.trim()) {
      setGeneratedPrompt("");
      setGenerationError(
        "CareerLauncher was unable to create the coaching prompt. Please analyze the documents again.",
      );
      return;
    }

    setGeneratedPrompt(prompt);
  }

  async function handleCopyPrompt() {
    if (!generatedPrompt) {
      setCopyStatus({
        type: "error",
        message: "Generate the coaching prompt before copying it.",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedPrompt);

      setCopyStatus({
        type: "success",
        message: "Prompt copied to your clipboard.",
      });
    } catch (error) {
      console.error("Unable to copy prompt:", error);

      setCopyStatus({
        type: "error",
        message:
          "Automatic copying was unavailable. Select the prompt and copy it manually.",
      });
    }
  }

  function handleOpenChatGPT() {
    window.open(
      CHATGPT_URL,
      "_blank",
      "noopener,noreferrer",
    );
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
              CareerLauncher can create a structured coaching
              prompt using your resume, target job description,
              and initial match results.
            </p>
          </div>

          <div className="w-fit rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-800">
            No API key required
          </div>
        </div>

        {!generatedPrompt ? (
          <div className="mt-8 rounded-3xl border border-violet-200 bg-white p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-slate-950">
              Generate your coaching prompt
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              The prompt instructs ChatGPT to assess your fit,
              identify gaps, improve resume bullets, prepare
              interview questions, and avoid inventing
              qualifications or experience.
            </p>

            {!canGeneratePrompt && (
              <div
                role="alert"
                className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700"
              >
                {!hasResumeText && !hasJobDescriptionText
                  ? "Readable text was not found in either document."
                  : !hasResumeText
                    ? "Readable text was not found in the resume."
                    : "Readable text was not found in the job description."}
              </div>
            )}

            {generationError && (
              <div
                role="alert"
                className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700"
              >
                {generationError}
              </div>
            )}

            <button
              type="button"
              disabled={!canGeneratePrompt}
              onClick={handleGeneratePrompt}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none sm:w-auto"
            >
              Generate ChatGPT prompt
              <span aria-hidden="true">→</span>
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-950">
                  Your prompt is ready
                </h3>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  Review the prompt, copy it, and paste it into
                  your own ChatGPT conversation.
                </p>
              </div>

              <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
                {promptCharacterCount.toLocaleString()} characters
              </div>
            </div>

            {copyStatus && (
              <div
                role={copyStatus.type === "error" ? "alert" : "status"}
                className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-medium ${
                  copyStatus.type === "success"
                    ? "border-teal-200 bg-teal-50 text-teal-800"
                    : "border-red-200 bg-red-50 text-red-700"
                }`}
              >
                {copyStatus.message}
              </div>
            )}

            {generationError && (
              <div
                role="alert"
                className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700"
              >
                {generationError}
              </div>
            )}

            {isLongPrompt && (
              <div
                role="status"
                className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900"
              >
                <span className="font-semibold">
                  This is a long prompt.
                </span>{" "}
                Some AI tools may have input limits. Consider
                removing unnecessary resume details or shortening
                the job description before generating it again.
              </div>
            )}

            <textarea
              value={generatedPrompt}
              readOnly
              spellCheck={false}
              aria-label="Generated ChatGPT coaching prompt"
              className="mt-5 min-h-[420px] w-full resize-y rounded-3xl border border-slate-300 bg-white p-4 font-mono text-sm leading-6 text-slate-800 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 sm:p-5"
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <button
                type="button"
                onClick={handleCopyPrompt}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
              >
                <CopyIcon />
                Copy prompt
              </button>

              <button
                type="button"
                onClick={handleOpenChatGPT}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-violet-300 bg-white px-5 py-3 font-semibold text-violet-700 transition hover:border-violet-400 hover:bg-violet-50"
              >
                Open ChatGPT
                <ExternalLinkIcon />
              </button>

              <button
                type="button"
                onClick={handleGeneratePrompt}
                className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Regenerate prompt
              </button>
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              Copy the prompt before opening ChatGPT. The prompt
              is not transferred automatically.
            </p>

            <div className="mt-6">
              <ResponsibleUseNotice variant="prompt" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="8" y="8" width="10" height="11" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h1" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M14 5h5v5" />
      <path d="m19 5-8 8" />
      <path d="M17 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h5" />
    </svg>
  );
}