import { education, experience } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container-page">
        <SectionLabel>Experience</SectionLabel>
        <ol className="divide-y divide-line/15 dark:divide-line/[0.14]">
          {experience.map((job) => (
            <li key={job.company}>
              <Reveal className="grid gap-3 py-8 md:grid-cols-[200px_1fr] md:gap-10">
                <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-1.5">{job.dates}</p>
                <div>
                  <h3 className="text-xl font-semibold">
                    {job.role} <span className="text-accent">·</span> {job.company}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {job.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted md:text-[15px]">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
        <div className="grid gap-3 border-t border-line/15 pt-8 md:grid-cols-[200px_1fr] md:gap-10 dark:border-line/[0.14]">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{education.dates}</p>
          <p className="font-semibold">
            {education.degree} <span className="text-accent">·</span>{" "}
            <span className="font-normal text-muted">{education.school}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
