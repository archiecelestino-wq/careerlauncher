"use client";

import AnalysisResults from "@/components/AnalysisResults";
import { analyzeResume } from "@/lib/analysis/analyzer";
import { parseDocument } from "@/lib/parser";
import type { AnalysisResult } from "@/types/analysis";
import {
  ChangeEvent,
  DragEvent,
  ReactNode,
  useRef,
  useState,
} from "react";

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const ALLOWED_FILE_TYPES = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
];

type UploadBoxProps = {
  title: string;
  description: string;
  file: File | null;
  icon: ReactNode;
  onFileSelect: (file: File) => void;
};

function validateFile(file: File): string | null {
  const extension = file.name.split(".").pop()?.toLowerCase();
  const allowedExtensions = ["pdf", "docx", "txt"];

  if (
    !ALLOWED_FILE_TYPES.includes(file.type) &&
    !allowedExtensions.includes(extension ?? "")
  ) {
    return "Please upload a PDF, DOCX, or TXT file.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "The file must be 10 MB or smaller.";
  }

  return null;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadBox({
  title,
  description,
  file,
  icon,
  onFileSelect,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  function processFile(selectedFile: File | undefined) {
    if (!selectedFile) {
      return;
    }

    const validationError = validateFile(selectedFile);

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    onFileSelect(selectedFile);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    processFile(event.target.files?.[0]);
    event.target.value = "";
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    setIsDragging(false);
    processFile(event.dataTransfer.files?.[0]);
  }

  return (
    <section>
      <div className="mb-3">
        <h2 className="text-lg font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm leading-6 text-slate-600">
          {description}
        </p>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label={`Upload ${title}`}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={handleDrop}
        className={`group flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-10 text-center transition ${
          isDragging
            ? "border-blue-600 bg-blue-50"
            : file
              ? "border-teal-500 bg-teal-50/70"
              : "border-slate-300 bg-white hover:border-blue-500 hover:bg-blue-50/40"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={handleInputChange}
        />

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
            file
              ? "bg-teal-100 text-teal-700"
              : "bg-blue-100 text-blue-700 group-hover:bg-blue-200"
          }`}
        >
          {file ? <CheckIcon /> : icon}
        </div>

        {file ? (
          <>
            <p className="mt-5 max-w-full truncate font-semibold text-slate-900">
              {file.name}
            </p>

            <p className="mt-1 text-sm text-slate-600">
              {formatFileSize(file.size)}
            </p>

            <p className="mt-4 text-sm font-medium text-teal-700">
              File ready. Click to replace it.
            </p>
          </>
        ) : (
          <>
            <p className="mt-5 font-semibold text-slate-900">
              Drag and drop your file here
            </p>

            <p className="mt-2 text-sm text-slate-600">
              or{" "}
              <span className="font-semibold text-blue-700">
                browse files
              </span>
            </p>

            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-slate-500">
              PDF, DOCX or TXT · Maximum 10 MB
            </p>
          </>
        )}
      </div>

      {error && (
        <p
          role="alert"
          className="mt-3 text-sm font-medium text-red-600"
        >
          {error}
        </p>
      )}
    </section>
  );
}

function DocumentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 3.75h7.5L18 8.25v12H6v-16.5Z" />
      <path d="M13.5 3.75v4.5H18" />
      <path d="M9 12h6M9 15h6" />
    </svg>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 8.25h16v10.5H4V8.25Z" />
      <path d="M9 8.25V6.5h6v1.75M4 12.5c4.5 2 11.5 2 16 0" />
      <path d="M10.5 13h3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m5 12 4.25 4.25L19 6.5" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3.5 19 6v5.25c0 4.25-2.75 7.5-7 9.25-4.25-1.75-7-5-7-9.25V6l7-2.5Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function Home() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const [jobDescriptionFile, setJobDescriptionFile] =
    useState<File | null>(null);

  const [statusMessage, setStatusMessage] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState("");

  const [analysisResult, setAnalysisResult] =
    useState<AnalysisResult | null>(null);

  const isReady = Boolean(resumeFile && jobDescriptionFile);

  async function handleAnalyze() {
    if (!resumeFile || !jobDescriptionFile) {
      setAnalysisError(
        "Please upload both a resume and a job description.",
      );
      return;
    }

    try {
      setIsAnalyzing(true);
      setAnalysisError("");
      setStatusMessage("");
      setAnalysisResult(null);

      const [resume, jobDescription] = await Promise.all([
        parseDocument(resumeFile),
        parseDocument(jobDescriptionFile),
      ]);

      const analysis = analyzeResume(
        resume.text,
        jobDescription.text,
      );

      console.log("Parsed resume:", resume);
      console.log("Parsed job description:", jobDescription);
      console.log("Analysis:", analysis);

      setAnalysisResult(analysis);

      setStatusMessage(
        "Both documents were processed successfully.",
      );
    } catch (error) {
      console.error("Document analysis error:", error);

      setAnalysisResult(null);

      setAnalysisError(
        error instanceof Error
          ? error.message
          : "Unable to process the uploaded documents.",
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a
            href="#"
            className="flex items-center gap-3"
            aria-label="CareerLauncher home"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
              <RocketIcon />
            </div>

            <div>
              <p className="text-lg font-bold tracking-tight">
                CareerLauncher
              </p>

              <p className="text-xs text-slate-500">
                Career Readiness Toolkit
              </p>
            </div>
          </a>

          <span className="rounded-full bg-teal-50 px-3 py-1.5 text-xs font-semibold text-teal-700">
            Free for students
          </span>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-gradient-to-b from-blue-50 via-teal-50/40 to-transparent" />

        <div className="mx-auto max-w-7xl px-5 pb-20 pt-16 sm:px-8 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm">
              <span aria-hidden="true">🎓</span>
              Built to help students launch stronger careers
            </div>

            <h1 className="mt-7 text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">
              Launch your career
              <span className="block text-blue-600">
                with confidence.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              Compare your resume with a job description and receive
              clear, educational guidance to help you improve your
              application.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-medium text-slate-600">
              <span>✓ No login</span>
              <span>✓ No API fees</span>
              <span>✓ Your files stay private</span>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-5xl rounded-[2rem] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/60 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-2">
              <UploadBox
                title="Upload your resume"
                description="Choose the resume you want to compare with the role."
                file={resumeFile}
                icon={<DocumentIcon />}
                onFileSelect={(file) => {
                  setResumeFile(file);
                  setStatusMessage("");
                  setAnalysisError("");
                  setAnalysisResult(null);
                }}
              />

              <UploadBox
                title="Upload the job description"
                description="Upload the position description or list of job requirements."
                file={jobDescriptionFile}
                icon={<BriefcaseIcon />}
                onFileSelect={(file) => {
                  setJobDescriptionFile(file);
                  setStatusMessage("");
                  setAnalysisError("");
                  setAnalysisResult(null);
                }}
              />
            </div>

            <div className="mt-8 border-t border-slate-200 pt-7">
              <button
                type="button"
                disabled={!isReady || isAnalyzing}
                onClick={handleAnalyze}
                className="flex min-h-14 w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none sm:text-lg"
              >
                {isAnalyzing
                  ? "Processing documents..."
                  : "Analyze my resume"}

                {!isAnalyzing && (
                  <span aria-hidden="true">→</span>
                )}
              </button>

              {!isReady && (
                <p className="mt-3 text-center text-sm text-slate-500">
                  Upload both documents to begin your analysis.
                </p>
              )}

              {analysisError && (
                <div
                  role="alert"
                  className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-700"
                >
                  {analysisError}
                </div>
              )}

              {statusMessage && (
                <div
                  role="status"
                  className="mt-4 rounded-2xl border border-teal-200 bg-teal-50 px-5 py-4 text-sm font-medium text-teal-800"
                >
                  {statusMessage}
                </div>
              )}
            </div>
          </div>

          {analysisResult && (
            <AnalysisResults analysis={analysisResult} />
          )}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 sm:px-8 md:grid-cols-3">
          <FeatureCard
            number="01"
            title="Upload"
            description="Add your resume and the job description you are targeting."
          />

          <FeatureCard
            number="02"
            title="Understand"
            description="See where your experience aligns and where you can improve."
          />

          <FeatureCard
            number="03"
            title="Prepare"
            description="Create stronger application materials and interview preparation."
          />
        </div>
      </section>

      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-semibold text-white">
              CareerLauncher
            </p>

            <p className="mt-1 max-w-xl text-sm leading-6 text-slate-400">
              A free educational tool that encourages students to
              represent their skills and experience honestly.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <ShieldIcon />
            Files are processed in your browser
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
      <span className="text-sm font-bold text-blue-600">
        {number}
      </span>

      <h2 className="mt-4 text-xl font-semibold text-slate-900">
        {title}
      </h2>

      <p className="mt-2 leading-7 text-slate-600">
        {description}
      </p>
    </article>
  );
}

function RocketIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M14.5 4.5c2.25-1.25 4.25-1 5-1-.05 1.65-.4 3.55-1.65 5.4l-5.5 5.5-4.75-4.75 5.5-5.5c.45-.45.9-.85 1.4-1.15Z" />
      <path d="m10.25 12-4.5.5-2.25 2.25 5.25.5M12 13.75l-.5 4.5-2.25 2.25-.5-5.25" />
      <circle cx="15.75" cy="7.25" r="1.5" />
      <path d="M6.5 17.5c-1.75.25-2.75 1.25-3 3 1.75-.25 2.75-1.25 3-3Z" />
    </svg>
  );
}