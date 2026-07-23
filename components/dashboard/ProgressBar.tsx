type ProgressBarProps = {
  value: number;
  label?: string;
};

function clampPercentage(value: number): number {
  return Math.min(Math.max(value, 0), 100);
}

export default function ProgressBar({
  value,
  label,
}: ProgressBarProps) {
  const percentage = clampPercentage(value);

  return (
    <div>
      {label && (
        <div className="mb-2 flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-slate-700">
            {label}
          </span>

          <span className="font-semibold text-slate-900">
            {percentage}%
          </span>
        </div>
      )}

      <div
        className="h-3 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
        aria-label={label ?? "Progress"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
      >
        <div
          className="h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}