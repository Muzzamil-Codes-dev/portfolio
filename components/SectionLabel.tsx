import type { ReactNode } from "react";

/** Red square + mono label, a hairline rule, and optional right-aligned text. */
export function SectionLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4">
      <span className="section-label shrink-0">{children}</span>
      <span className="h-px flex-1 bg-line/15 dark:bg-line/[0.14]" aria-hidden />
      {right ? (
        <span className="hidden shrink-0 font-mono text-[11px] uppercase tracking-[0.18em] text-muted sm:inline">
          {right}
        </span>
      ) : null}
    </div>
  );
}
