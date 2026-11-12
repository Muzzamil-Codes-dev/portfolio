import type { ReactNode } from "react";

/** Section heading: large display title over a solid rule, with an optional note on the right. */
export function SectionLabel({ children, right }: { children: ReactNode; right?: ReactNode }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6 border-b border-ink pb-4">
      <h2 className="display text-4xl md:text-5xl">
        {children}
        <span className="text-accent">.</span>
      </h2>
      {right ? (
        <span className="hidden pb-1 font-mono text-xs uppercase tracking-[0.14em] text-muted sm:inline">
          {right}
        </span>
      ) : null}
    </div>
  );
}
