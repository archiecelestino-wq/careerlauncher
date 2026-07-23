type ResponsibleUseNoticeProps = {
  variant?: "analysis" | "prompt";
};

export default function ResponsibleUseNotice({
  variant = "analysis",
}: ResponsibleUseNoticeProps) {
  const isPromptVariant = variant === "prompt";

  return (
    <aside
      aria-labelledby={`responsible-use-${variant}-heading`}
      className="rounded-3xl border border-amber-200 bg-amber-50 p-5 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <InformationIcon />
        </div>

        <div>
          <h3
            id={`responsible-use-${variant}-heading`}
            className="font-semibold text-amber-950"
          >
            {isPromptVariant
              ? "Review before using the AI prompt"
              : "Use your results as guidance"}
          </h3>

          {isPromptVariant ? (
            <div className="mt-2 space-y-2 text-sm leading-6 text-amber-900">
              <p>
                The generated prompt may include the full text of your resume
                and job description. Remove personal or confidential
                information before sharing it with an external AI service.
              </p>

              <p>
                Review all AI-generated recommendations carefully. Do not add
                qualifications, achievements, or experience that you cannot
                support truthfully.
              </p>
            </div>
          ) : (
            <div className="mt-2 space-y-2 text-sm leading-6 text-amber-900">
              <p>
                The CareerLauncher match score is a keyword-based estimate. It
                is not an official ATS result and does not predict whether you
                will be interviewed or hired.
              </p>

              <p>
                Use the analysis to identify areas worth reviewing, but apply
                your own judgment before changing your resume.
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

function InformationIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 10.5v6" />
      <path d="M12 7.5h.01" />
    </svg>
  );
}