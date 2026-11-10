import { capabilities } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function Capabilities() {
  return (
    <section id="capabilities" className="section">
      <div className="container-page">
        <SectionLabel right="Python first, TypeScript when needed">What I build</SectionLabel>
        <div className="grid gap-px overflow-hidden rounded-xl border border-line/15 bg-line/15 md:grid-cols-2 lg:grid-cols-4 dark:border-line/[0.14] dark:bg-line/[0.14]">
          {capabilities.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.05} className="flex flex-col bg-bg p-6">
              <span className="font-mono text-3xl font-semibold text-accent">{c.n}</span>
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.body}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {c.tools.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
