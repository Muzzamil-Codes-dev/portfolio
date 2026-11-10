import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import type { Project } from "@/lib/data";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-line/15 bg-surface dark:border-line/[0.14]">
      <Link
        href={`/projects/${project.slug}`}
        className="relative flex min-h-[200px] flex-col justify-between bg-panel p-6 text-panel-ink"
      >
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
          {project.badge ? (
            <span className="rounded-full border border-panel-ink/25 px-2 py-0.5 uppercase tracking-[0.14em] text-panel-ink/70">
              {project.badge}
            </span>
          ) : null}
        </div>
        <div>
          <h3 className="display text-3xl transition group-hover:text-accent">{project.title}</h3>
          <p className="mt-3 font-mono text-sm text-panel-ink/80">{project.result}</p>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <p className="flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex items-center justify-between">
          <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-accent">
            Case study <ArrowRight className="h-4 w-4" />
          </Link>
          {project.github ? (
            <a
              href={project.github}
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-accent"
              aria-label={`${project.title} on GitHub`}
            >
              <Github className="h-4 w-4" /> Code
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
