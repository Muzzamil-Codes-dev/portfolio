import { moreProjects } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function MoreProjects() {
  return (
    <section id="more-projects" className="container-x pb-14 pt-2 sm:pb-16 sm:pt-4">
      <Reveal>
        <span className="section-label">More work</span>
        <h2 className="section-title">More projects</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Supporting builds across applied ML, full-stack and scientific computing.
        </p>
      </Reveal>

      <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {moreProjects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.05}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
