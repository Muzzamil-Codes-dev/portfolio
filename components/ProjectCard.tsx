import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import type { Project } from "@/lib/data";

/** `featured` lays the card out side by side on large screens so the first project leads. */
export function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <article className={`pop-card group flex h-full flex-col border border-ink bg-bg ${featured ? "lg:flex-row" : ""}`}>
      <Link
        href={`/projects/${project.slug}`}
        className={`flex min-h-[220px] flex-col justify-between bg-panel p-6 text-panel-ink ${
          featured ? "lg:min-h-[340px] lg:w-1/2 lg:p-8" : ""
        }`}
      >
        <div className="flex items-center justify-between font-mono text-xs">
          <span className="text-panel-ink/75">{String(index + 1).padStart(2, "0")}</span>
          {project.badge ? (
            <span className="border border-panel-ink/30 px-2 py-0.5 uppercase tracking-[0.14em] text-panel-ink/75">
              {project.badge}
            </span>
          ) : null}
        </div>
        <div>
          <h3
            className={`display transition-colors duration-150 group-hover:text-accent ${
              featured ? "text-4xl lg:text-6xl" : "text-3xl"
            }`}
          >
            {project.title}
          </h3>
          <p className="mt-3 font-mono text-sm text-panel-ink/80">{project.result}</p>
        </div>
      </Link>

      <div className={`flex flex-1 flex-col justify-between gap-6 p-6 ${featured ? "lg:p-8" : ""}`}>
        <p className={`leading-relaxed text-muted ${featured ? "text-base lg:text-lg" : "text-sm"}`}>
          {project.summary}
        </p>
        <div>
          <p className="font-mono text-xs leading-relaxed text-muted">{project.tech.join(" / ")}</p>
          <div className="mt-5 flex items-center justify-between border-t border-ink/15 pt-4">
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold hover:text-accent"
            >
              Case study
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1" />
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
      </div>
    </article>
  );
}
