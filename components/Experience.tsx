import { experience } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" className="container-x py-14 sm:py-16">
      <Reveal>
        <span className="section-label">Experience</span>
        <h2 className="section-title">Where I&apos;ve worked</h2>
      </Reveal>

      <ol className="mt-9 space-y-4">
        {experience.map((item, i) => (
          <Reveal key={`${item.company}-${item.role}`} delay={i * 0.06}>
            <li className="relative pl-8">
              {/* timeline rail + dot */}
              <span
                aria-hidden
                className="absolute left-[5px] top-2 h-full w-px bg-line last:hidden"
              />
              <span
                aria-hidden
                className="absolute left-0 top-1.5 h-[11px] w-[11px] rounded-full border-2 border-accent bg-bg"
              />

              <article className="card card-hover p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold">
                    {item.role}{" "}
                    <span className="text-accent">· {item.company}</span>
                  </h3>
                  <span className="text-sm text-muted">{item.dates}</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2.5 text-sm leading-relaxed text-muted"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  );
}
