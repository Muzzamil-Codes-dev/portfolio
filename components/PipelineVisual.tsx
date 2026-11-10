"use client";

import { motion, useReducedMotion } from "motion/react";

type Node = { x: number; y: number; w: number; title: string; sub: string; tone?: "accent" | "muted" };

const H = 52;

const nodes: Node[] = [
  { x: 50, y: 24, w: 300, title: "POST /ask", sub: "question + contract IDs" },
  { x: 50, y: 112, w: 300, title: "Hybrid retrieval", sub: "dense (bge) + BM25, top 5 clauses" },
  { x: 50, y: 200, w: 300, title: "Generate", sub: "strict JSON schema, cited IDs only" },
  { x: 50, y: 288, w: 300, title: "Validate", sub: "quotes and numbers exist in clause" },
  { x: 24, y: 392, w: 168, title: "Answer", sub: "with clause citations", tone: "accent" },
  { x: 208, y: 392, w: 168, title: "Abstain", sub: "return closest clauses", tone: "muted" },
];

const edges = [
  "M200 76 V112",
  "M200 164 V200",
  "M200 252 V288",
  "M200 340 V366 H108 V392",
  "M200 340 V366 H292 V392",
];

/** Request path of the Contract Intelligence RAG service, drawn once on load. */
export function PipelineVisual() {
  const reduce = useReducedMotion();

  return (
    <figure className="relative overflow-hidden rounded-2xl bg-accent p-5 text-white sm:p-8">
      <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-white/80">
        <span>contract-rag / request path</span>
        <span aria-hidden>01 → 05</span>
      </div>
      <svg
        viewBox="0 0 400 456"
        className="h-auto w-full"
        role="img"
        aria-label="Pipeline: request, hybrid retrieval, schema-constrained generation, validation, then answer with citations or abstain."
      >
        {edges.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="white"
            strokeOpacity={0.85}
            strokeWidth={1.5}
            strokeDasharray={i >= 3 ? "4 4" : undefined}
            initial={reduce ? false : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 + i * 0.25, ease: "easeOut" }}
          />
        ))}
        {nodes.map((n, i) => (
          <motion.g
            key={n.title}
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
          >
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={H}
              rx={10}
              className={n.tone === "accent" ? "fill-ink" : "fill-bg"}
              fillOpacity={n.tone === "muted" ? 0.75 : 1}
            />
            <text
              x={n.x + 14}
              y={n.y + 22}
              className={`font-mono text-[13px] font-semibold ${n.tone === "accent" ? "fill-bg" : "fill-ink"}`}
            >
              {n.title}
            </text>
            <text
              x={n.x + 14}
              y={n.y + 40}
              className={`font-sans text-[11px] ${n.tone === "accent" ? "fill-bg/75" : "fill-muted"}`}
            >
              {n.sub}
            </text>
          </motion.g>
        ))}
      </svg>
      <figcaption className="mt-4 font-mono text-[11px] text-white/80">
        A failed validation gets one retry before the service abstains.
      </figcaption>
    </figure>
  );
}
