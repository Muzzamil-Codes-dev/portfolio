import { featuredProjects, socials } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function FeaturedWork() {
  return (
    <section id="work" className="section">
      <div className="container-page">
        <SectionLabel right={<a href={socials.github} className="hover:text-accent">All repos on GitHub →</a>}>
          Featured work
        </SectionLabel>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className="h-full">
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
