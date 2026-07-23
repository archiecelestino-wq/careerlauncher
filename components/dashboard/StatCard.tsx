type StatCardProps = {
  label: string;
  value: string | number;
  description?: string;
};

export default function StatCard({
  label,
  value,
  description,
}: StatCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
      <p className="text-sm font-semibold text-slate-600">
        {label}
      </p>

      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
        {value}
      </p>

      {description && (
        <p className="mt-2 text-xs leading-5 text-slate-500">
          {description}
        </p>
      )}
    </article>
  );
}