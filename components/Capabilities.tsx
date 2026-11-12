import { capabilities } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { SectionLabel } from "@/components/SectionLabel";

export function Capabilities() {
  return (
    <section id="capabilities" className="section">
      <div className="container-page">
        <SectionLabel right="Python first, TypeScript when needed">What I build</SectionLabel>
        <div className="grid gap-px border border-ink bg-ink md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.05} className="h-full bg-bg">
              <div className="pop-card flex h-full flex-col bg-bg p-6 hover:outline hover:outline-1 hover:outline-ink">
                <span className="font-display text-5xl text-accent">{c.n}</span>
                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{c.body}</p>
                <p className="mt-6 border-t border-ink/15 pt-4 font-mono text-xs leading-relaxed text-muted">
                  {c.tools.join(" / ")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
