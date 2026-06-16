import { featuredProjects } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";

export function FeaturedProjects() {
  return (
    <section id="projects" className="container-x py-14 sm:py-16">
      <Reveal>
        <span className="section-label">Projects</span>
        <h2 className="section-title">Featured Projects</h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Practical ML and AI projects — clear problem, method and result.
          GitHub and case studies available.
        </p>
      </Reveal>

      <div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project, i) => (
          <Reveal key={project.slug} delay={(i % 3) * 0.06}>
            <ProjectCard project={project} featured />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
