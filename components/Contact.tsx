import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import { socials } from "@/lib/data";
import { Reveal } from "./Reveal";

const links = [
  { label: "Email", value: socials.email, href: `mailto:${socials.email}`, icon: Mail, external: false },
  { label: "LinkedIn", value: "in/muzzamil-rasully", href: socials.linkedin, icon: Linkedin, external: true },
  { label: "GitHub", value: "Muzzamil-Codes-dev", href: socials.github, icon: Github, external: true },
];

export function Contact() {
  return (
    <section id="contact" className="container-x py-14 sm:py-16">
      <Reveal>
        <div className="card overflow-hidden p-8 sm:p-12">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-label">Contact</span>
            <h2 className="section-title">Hiring for ML, NLP or AI roles?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              I&apos;m open to ML Engineer, AI Engineer, NLP Engineer,
              RAG/LLM Engineer and ML-focused Data Scientist opportunities.
            </p>

            <a href={`mailto:${socials.email}`} className="btn-primary mt-7">
              <Mail className="h-4 w-4" />
              Email me
            </a>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-3 rounded-xl border border-line bg-bg/60 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-surface text-accent">
                    <Icon className="h-[18px] w-[18px]" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs text-muted">{link.label}</span>
                    <span className="block truncate text-sm font-medium text-fg">
                      {link.value}
                    </span>
                  </span>
                  <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
                </a>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
