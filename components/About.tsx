import { aboutCards } from "@/lib/data";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="container-x py-14 sm:py-16">
      <Reveal>
        <span className="section-label">About</span>
        <h2 className="section-title max-w-3xl">Applied AI, built beyond notebooks.</h2>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted">
          I build applied-ML systems end to end — training and evaluating models,
          then wrapping them in retrieval pipelines, dashboards, APIs and
          deployment-ready apps. My background in data analytics, finance and
          consulting keeps me focused on practical tools that answer real
          questions and reach the people who need them.
        </p>
      </Reveal>

      <div className="mt-9 grid gap-4 sm:grid-cols-3">
        {aboutCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <Reveal key={card.title} delay={i * 0.08}>
              <article className="card card-hover h-full p-6">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-bg text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {card.body}
                </p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
