import { aboutTiles, profile } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-page">
        <SectionLabel>About</SectionLabel>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)]">
              I work on everything <span className="text-accent">around the model.</span>
            </h2>
            <p className="mt-6 max-w-lg leading-relaxed text-muted">{profile.about}</p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {aboutTiles.map(({ title, body, icon: Icon }, i) => (
              <Reveal key={title} delay={i * 0.05} className="tile">
                <span className="pop inline-grid h-10 w-10 place-items-center rounded-full bg-accent/10">
                  <Icon className="h-5 w-5 text-accent" aria-hidden />
                </span>
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
