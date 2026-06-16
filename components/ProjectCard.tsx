import Link from "next/link";
import { BookOpen, Check, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/data";

/**
 * One project card. `featured` renders a slightly larger, fuller card for the
 * top proof projects; the compact form supports them in "More projects".
 */
export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const Icon = project.icon;
  const caseHref = `/projects/${project.slug}`;
  const showGithub = project.github && !project.privateRepo;
  const noPublicCode = project.privateRepo && !project.github;

  return (
    <article className={`card card-hover flex h-full flex-col ${featured ? "p-6" : "p-5"}`}>
      {/* header */}
      <div className="flex items-start gap-3">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-bg text-accent">
          <Icon className="h-[18px] w-[18px]" />
        </span>
        <h3
          className={`mt-1.5 font-display font-semibold leading-tight ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          {project.caseStudy ? (
            <Link href={caseHref} className="transition-colors hover:text-accent">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>
      </div>

      {/* one-line summary */}
      <p className={`mt-3 leading-relaxed text-muted ${featured ? "text-sm" : "text-[13px]"}`}>
        {project.summary}
      </p>

      {/* labelled proof bullets */}
      <ul className="mt-3 space-y-1.5">
        {project.highlights.map((h) => {
          const isMetric = h.label === "Result" || h.label === "Finding";
          return (
            <li
              key={h.text}
              className={`flex gap-2 leading-snug ${featured ? "text-[13px]" : "text-xs"} ${
                isMetric ? "text-fg" : "text-fg/80"
              }`}
            >
              <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
              <span>
                {h.label && (
                  <span className={`font-semibold ${isMetric ? "text-accent" : "text-fg"}`}>
                    {h.label}:{" "}
                  </span>
                )}
                {h.text}
              </span>
            </li>
          );
        })}
      </ul>

      {/* tags */}
      <ul className="mt-4 flex flex-wrap gap-1.5">
        {project.tech.map((t) => (
          <li key={t} className="chip">
            {t}
          </li>
        ))}
      </ul>

      {/* actions */}
      <div className="mt-5 flex flex-wrap items-center gap-2 pt-1">
        {project.caseStudy && (
          <Link href={caseHref} className="btn-primary px-4 py-2 text-[13px]">
            <BookOpen className="h-4 w-4" />
            Case Study
          </Link>
        )}
        {showGithub && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-4 py-2 text-[13px]"
          >
            <Github className="h-4 w-4" />
            GitHub
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost px-4 py-2 text-[13px]"
          >
            <ExternalLink className="h-4 w-4" />
            Demo
          </a>
        )}
        {noPublicCode && (
          <span className="text-xs text-muted">Repo available on request</span>
        )}
      </div>
    </article>
  );
}
