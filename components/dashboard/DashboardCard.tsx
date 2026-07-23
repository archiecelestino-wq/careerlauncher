import type { ReactNode } from "react";

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  action?: ReactNode;
};

export default function DashboardCard({
  children,
  className = "",
  title,
  description,
  action,
}: DashboardCardProps) {
  return (
    <section
      className={`rounded-[2rem] border border-slate-200 bg-white p-5 shadow-lg shadow-slate-200/40 sm:p-7 ${className}`}
    >
      {(title || description || action) && (
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            {title && (
              <h2 className="text-xl font-semibold text-slate-950">
                {title}
              </h2>
            )}

            {description && (
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {description}
              </p>
            )}
          </div>

          {action}
        </header>
      )}

      {children}
    </section>
  );
}