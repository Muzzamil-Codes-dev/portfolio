import { ArrowDown, Github, Linkedin } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { PipelineVisual } from "@/components/PipelineVisual";

export function Hero() {
  const [first, second] = profile.headline;

  return (
    <section className="container-page grid gap-12 pb-16 pt-12 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16 lg:pb-24">
      <div className="min-w-0">
        <p className="section-label mb-6">{profile.role}</p>
        <h1 className="display break-words text-[clamp(2.5rem,7vw,6rem)]">
          <span className="block">{first}</span>
          <span className="block text-accent">{second}</span>
        </h1>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">{profile.intro}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#work" className="btn-primary">
            See my work <ArrowDown className="h-4 w-4" />
          </a>
          {profile.cvHref ? (
            <a href={profile.cvHref} className="btn-ghost" download>
              Download CV <ArrowDown className="h-4 w-4" />
            </a>
          ) : null}
          <div className="ml-1 flex items-center gap-2">
            <a
              href={socials.github}
              aria-label="GitHub"
              className="pop grid h-11 w-11 place-items-center border border-ink hover:text-accent"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={socials.linkedin}
              aria-label="LinkedIn"
              className="pop grid h-11 w-11 place-items-center border border-ink hover:text-accent"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <PipelineVisual />
      </div>
    </section>
  );
}
