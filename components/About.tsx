import { aboutTiles, profile } from "@/lib/data";
import { Reveal } from "@/components/Reveal";

export function About() {
  return (
    <section id="about" className="section">
      <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <p className="section-label mb-6">About</p>
          <h2 className="display text-[clamp(2.25rem,5vw,3.75rem)]">
            I work on everything <span className="text-accent">around the model.</span>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted">{profile.about}</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {aboutTiles.map(({ title, body, icon: Icon }, i) => (
            <Reveal key={title} delay={i * 0.05} className="h-full">
              <div className="tile pop-card group h-full">
                <span className="inline-grid h-10 w-10 place-items-center bg-accent text-white transition-transform duration-150 group-hover:-translate-y-1 group-hover:scale-110 motion-reduce:transform-none dark:text-bg">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
