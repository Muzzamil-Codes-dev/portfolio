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
        {/* The first project spans the full width; the rest sit two to a row. */}
        <div className="grid gap-6 md:grid-cols-2">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06} className={`h-full ${i === 0 ? "md:col-span-2" : ""}`}>
              <ProjectCard project={p} index={i} featured={i === 0} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
