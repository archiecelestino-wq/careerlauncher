type EmptyStateProps = {
  title: string;
  description: string;
};

export default function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
      <p className="font-semibold text-slate-800">
        {title}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        {description}
      </p>
    </div>
  );
}