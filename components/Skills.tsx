import { skillGroups } from "@/lib/data";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" className="container-x py-14 sm:py-16">
      <Reveal>
        <span className="section-label">Skills</span>
        <h2 className="section-title">Skills</h2>
      </Reveal>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <Reveal key={group.title} delay={(i % 2) * 0.05}>
            <div className="card h-full p-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {group.title}
              </p>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-line bg-bg px-3.5 py-1.5 text-sm text-fg"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
