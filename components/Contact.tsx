import { ArrowUpRight, Github, Linkedin } from "lucide-react";
import { socials } from "@/lib/data";

export function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container-page grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="section-label mb-6">Contact</p>
          <h2 className="display text-[clamp(3.5rem,12vw,9rem)]">
            Let&apos;s talk<span className="text-accent">.</span>
          </h2>
        </div>
        <div className="min-w-0">
          <p className="max-w-md leading-relaxed text-muted">
            Email is the quickest way to reach me. I&apos;m based in London.
          </p>
          <a
            href={`mailto:${socials.email}`}
            className="mt-6 inline-flex max-w-full items-center gap-2 break-all text-xl font-semibold underline decoration-accent decoration-2 underline-offset-8 hover:text-accent sm:text-2xl"
          >
            {socials.email} <ArrowUpRight className="h-5 w-5 shrink-0" />
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={socials.linkedin} className="btn-ghost">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <a href={socials.github} className="btn-ghost">
              <Github className="h-4 w-4" /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
