"use client";

import ResponsibleUseNotice from "@/components/ResponsibleUseNotice";
import { buildResumeRewritePrompt } from "@/lib/prompts/buildResumeRewritePrompt";
import type { AnalysisResult } from "@/types/analysis";
import { useState } from "react";

type AIResumeCoachProps = {
  resumeText: string;
  jobDescriptionText: string;
  analysis: AnalysisResult;
  onRevisedResumeSubmit: (
    revisedResumeText: string,
  ) => void;
};

type StatusMessage = {
  type: "success" | "error";
  message: string;
} | null;

const LONG_PROMPT_CHARACTER_LIMIT = 30_000;
const MINIMUM_REVISED_RESUME_LENGTH = 200;

const CHATGPT_URL = "https://chatgpt.com/";

const REVISED_RESUME_START_MARKER =
  "===== REVISED RESUME START =====";

const REVISED_RESUME_END_MARKER =
  "===== REVISED RESUME END =====";

function extractRevisedResume(
  value: string,
): string {
  const trimmedValue = value.trim();

  const startIndex = trimmedValue.indexOf(
    REVISED_RESUME_START_MARKER,
  );

  const endIndex = trimmedValue.indexOf(
    REVISED_RESUME_END_MARKER,
  );

  const containsValidMarkers =
    startIndex !== -1 &&
    endIndex !== -1 &&
    endIndex > startIndex;

  if (!containsValidMarkers) {
    return trimmedValue;
  }

  return trimmedValue
    .slice(
      startIndex +
        REVISED_RESUME_START_MARKER.length,
      endIndex,
    )
    .trim();
}

export default function AIResumeCoach({
  resumeText,
  jobDescriptionText,
  analysis,
  onRevisedResumeSubmit,
}: AIResumeCoachProps) {
  const [
    generatedPrompt,
    setGeneratedPrompt,
  ] = useState("");

  const [copyStatus, setCopyStatus] =
    useState<StatusMessage>(null);

  const [
    generationError,
    setGenerationError,
  ] = useState("");

  const [
    revisedResumeInput,
    setRevisedResumeInput,
  ] = useState("");

  const [
    revisedResumeStatus,
    setRevisedResumeStatus,
  ] = useState<StatusMessage>(null);

  const hasResumeText =
    resumeText.trim().length > 0;

  const hasJobDescriptionText =
    jobDescriptionText.trim().length > 0;

  const canGeneratePrompt =
    hasResumeText &&
    hasJobDescriptionText;

  const promptCharacterCount =
    generatedPrompt.length;

  const isLongPrompt =
    promptCharacterCount >
    LONG_PROMPT_CHARACTER_LIMIT;

  function handleGeneratePrompt() {
    setCopyStatus(null);
    setGenerationError("");
    setRevisedResumeStatus(null);

    if (
      !hasResumeText &&
      !hasJobDescriptionText
    ) {
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

    const prompt =
      buildResumeRewritePrompt({
        resumeText: resumeText.trim(),
        jobDescriptionText:
          jobDescriptionText.trim(),
        analysis,
      });

    if (!prompt.trim()) {
      setGeneratedPrompt("");

      setGenerationError(
        "CareerLauncher was unable to create the resume rewrite prompt. Please analyze the documents again.",
      );

      return;
    }

    setGeneratedPrompt(prompt);
  }

  async function handleCopyPrompt() {
    if (!generatedPrompt) {
      setCopyStatus({
        type: "error",
        message:
          "Generate the resume rewrite prompt before copying it.",
      });

      return;
    }

    try {
      await navigator.clipboard.writeText(
        generatedPrompt,
      );

      setCopyStatus({
        type: "success",
        message:
          "Resume rewrite prompt copied to your clipboard.",
      });
    } catch (error) {
      console.error(
        "Unable to copy prompt:",
        error,
      );

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

  function handleRevisedResumeChange(
    value: string,
  ) {
    setRevisedResumeInput(value);
    setRevisedResumeStatus(null);
  }

  function handleSubmitRevisedResume() {
    const extractedResume =
      extractRevisedResume(
        revisedResumeInput,
      );

    if (!extractedResume) {
      setRevisedResumeStatus({
        type: "error",
        message:
          "Paste the revised resume from ChatGPT before continuing.",
      });

      return;
    }

    if (
      extractedResume.length <
      MINIMUM_REVISED_RESUME_LENGTH
    ) {
      setRevisedResumeStatus({
        type: "error",
        message:
          "The pasted content appears too short to be a complete resume. Check that you copied the full revised resume.",
      });

      return;
    }

    setRevisedResumeInput(
      extractedResume,
    );

    onRevisedResumeSubmit(
      extractedResume,
    );

    setRevisedResumeStatus({
      type: "success",
      message:
        "Your revised resume has been saved and automatically validated against the job description.",
    });
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
              AI resume rewrite
            </p>

            <h2
              id="ai-resume-coach-heading"
              className="mt-2 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl"
            >
              Rewrite your resume in
              ChatGPT
            </h2>

            <p className="mt-3 max-w-2xl leading-7 text-slate-600">
              CareerLauncher creates a
              focused prompt using your
              resume, target job description,
              and match results. ChatGPT will
              return a complete rewritten
              resume that you can paste back
              here for automatic validation.
            </p>
          </div>

          <div className="w-fit rounded-2xl border border-violet-200 bg-white px-4 py-3 text-sm font-semibold text-violet-800">
            No API key required
          </div>
        </div>

        {!generatedPrompt ? (
          <div className="mt-8 rounded-3xl border border-violet-200 bg-white p-5 sm:p-6">
            <h3 className="text-lg font-semibold text-slate-950">
              Generate your resume
              rewrite prompt
            </h3>

            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              The prompt instructs ChatGPT
              to rewrite your entire resume,
              improve job relevance and
              wording, preserve measurable
              achievements, and avoid
              inventing qualifications,
              experience, employers, dates,
              or results.
            </p>

            {!canGeneratePrompt && (
              <div
                role="alert"
                className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium leading-6 text-red-700"
              >
                {!hasResumeText &&
                !hasJobDescriptionText
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
              onClick={
                handleGeneratePrompt
              }
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none sm:w-auto"
            >
              Generate resume rewrite
              prompt
              <span aria-hidden="true">
                →
              </span>
            </button>
          </div>
        ) : (
          <div className="mt-8">
            <div className="rounded-3xl border border-violet-200 bg-white p-5 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-violet-700">
                    Step 1
                  </p>

                  <h3 className="mt-1 text-lg font-semibold text-slate-950">
                    Copy the rewrite
                    prompt into ChatGPT
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    Review the prompt,
                    copy it, open ChatGPT,
                    and paste it into a new
                    conversation.
                  </p>
                </div>

                <div className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600">
                  {promptCharacterCount.toLocaleString()}{" "}
                  characters
                </div>
              </div>

              {copyStatus && (
                <div
                  role={
                    copyStatus.type ===
                    "error"
                      ? "alert"
                      : "status"
                  }
                  className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-medium ${
                    copyStatus.type ===
                    "success"
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
                    This is a long
                    prompt.
                  </span>{" "}
                  Some AI tools may have
                  input limits. Consider
                  shortening unnecessary
                  resume details or the job
                  description before
                  generating it again.
                </div>
              )}

              <textarea
                value={generatedPrompt}
                readOnly
                spellCheck={false}
                aria-label="Generated ChatGPT resume rewrite prompt"
                className="mt-5 min-h-[420px] w-full resize-y rounded-3xl border border-slate-300 bg-white p-4 font-mono text-sm leading-6 text-slate-800 outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-100 sm:p-5"
              />

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={
                    handleCopyPrompt
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-violet-600 px-5 py-3 font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
                >
                  <CopyIcon />
                  Copy rewrite prompt
                </button>

                <button
                  type="button"
                  onClick={
                    handleOpenChatGPT
                  }
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-violet-300 bg-white px-5 py-3 font-semibold text-violet-700 transition hover:border-violet-400 hover:bg-violet-50"
                >
                  Open ChatGPT
                  <ExternalLinkIcon />
                </button>

                <button
                  type="button"
                  onClick={
                    handleGeneratePrompt
                  }
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Regenerate prompt
                </button>
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                Copy the prompt before
                opening ChatGPT. Browser
                security prevents
                CareerLauncher from
                automatically transferring
                it to another website.
              </p>

              <div className="mt-6">
                <ResponsibleUseNotice variant="prompt" />
              </div>
            </div>

            <div className="mt-6 rounded-3xl border border-blue-200 bg-white p-5 sm:p-6">
              <p className="text-sm font-semibold uppercase tracking-wider text-blue-700">
                Step 2
              </p>

              <h3 className="mt-1 text-xl font-semibold text-slate-950">
                Return with your revised
                resume
              </h3>

              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                ChatGPT should return a
                complete rewritten resume.
                Copy its response and paste
                it below. You may paste the
                full response—CareerLauncher
                will automatically extract
                the content placed between
                the revised-resume markers.
              </p>

              <div className="mt-5 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
                Before continuing, read the
                revised resume carefully.
                Remove or correct anything
                that is inaccurate,
                exaggerated, or unsupported
                by your real experience.
              </div>

              <label
                htmlFor="revised-resume"
                className="mt-6 block text-sm font-semibold text-slate-900"
              >
                Revised resume
              </label>

              <textarea
                id="revised-resume"
                value={
                  revisedResumeInput
                }
                onChange={(event) =>
                  handleRevisedResumeChange(
                    event.target.value,
                  )
                }
                spellCheck
                placeholder="Paste the complete revised resume from ChatGPT here..."
                className="mt-2 min-h-[420px] w-full resize-y rounded-3xl border border-slate-300 bg-white p-4 text-sm leading-6 text-slate-800 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100 sm:p-5"
              />

              <div className="mt-3 flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  {revisedResumeInput
                    .trim()
                    .length.toLocaleString()}{" "}
                  characters
                </span>

                <span>
                  Minimum recommended
                  length:{" "}
                  {
                    MINIMUM_REVISED_RESUME_LENGTH
                  }{" "}
                  characters
                </span>
              </div>

              {revisedResumeStatus && (
                <div
                  role={
                    revisedResumeStatus.type ===
                    "error"
                      ? "alert"
                      : "status"
                  }
                  className={`mt-4 rounded-2xl border px-4 py-3 text-sm font-medium leading-6 ${
                    revisedResumeStatus.type ===
                    "success"
                      ? "border-teal-200 bg-teal-50 text-teal-800"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {
                    revisedResumeStatus.message
                  }
                </div>
              )}

              <button
                type="button"
                onClick={
                  handleSubmitRevisedResume
                }
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 sm:w-auto"
              >
                Save and validate revised
                resume
                <span aria-hidden="true">
                  →
                </span>
              </button>
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
      <rect
        x="8"
        y="8"
        width="10"
        height="11"
        rx="2"
      />

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