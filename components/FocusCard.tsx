import { focusAreas, mlStats } from "@/lib/data";

/**
 * Hero-side card that signals an ML/AI focus at a glance: an editor-style code
 * snippet of a RAG + Transformers pipeline, a few headline model metrics, and
 * the focus-area tags. Replaces the old "analytics snapshot" with something
 * that tells an ML recruiter what this person actually builds.
 */
export function FocusCard() {
  return (
    <div className="card w-full overflow-hidden">
      {/* editor chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-bg/50 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-line" />
        <span className="h-3 w-3 rounded-full bg-line" />
        <span className="h-3 w-3 rounded-full bg-line" />
        <span className="ml-2 font-mono text-xs text-muted">rag_pipeline.py</span>
        <span className="ml-auto chip py-0.5">Python</span>
      </div>

      {/* code snippet (lightly highlighted, theme-aware) */}
      <pre className="overflow-x-auto px-5 py-4 font-mono text-[12.5px] leading-relaxed text-fg/85">
        <code>
          <span className="text-accent">from</span> transformers{" "}
          <span className="text-accent">import</span> AutoModel{"\n"}
          <span className="text-accent">import</span> torch{"\n\n"}
          <span className="text-muted"># retrieve, then generate a grounded answer</span>
          {"\n"}
          ctx <span className="text-accent">=</span> retriever.search(query, k
          <span className="text-accent">=</span>5){"\n"}
          prompt <span className="text-accent">=</span> build_prompt(query, ctx)
          {"\n"}
          answer <span className="text-accent">=</span> llm.generate(prompt){"\n"}
          <span className="text-muted"># &rarr; grounded, cited, on-device</span>
        </code>
      </pre>

      {/* model metrics */}
      <dl className="grid grid-cols-3 gap-px border-t border-line bg-line">
        {mlStats.map((stat) => (
          <div key={stat.label} className="bg-surface px-3 py-4 text-center">
            <dd className="font-display text-2xl font-semibold text-fg">
              {stat.value}
            </dd>
            <dt className="mt-1 text-[11px] leading-tight text-muted">
              {stat.label}
            </dt>
          </div>
        ))}
      </dl>

      {/* focus tags */}
      <div className="border-t border-line px-5 py-4">
        <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Currently focused on
        </p>
        <div className="flex flex-wrap gap-2">
          {focusAreas.map((area) => (
            <span key={area} className="chip">
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
