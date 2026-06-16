import { ArrowRight, Github, Linkedin } from "lucide-react";
import { openToRoles, socials } from "@/lib/data";
import { FocusCard } from "./FocusCard";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* soft warm glow backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(214,185,140,0.16),transparent_70%)]"
      />

      <div className="container-x grid items-center gap-12 py-12 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
        {/* Left */}
        <Reveal>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Muzzamil Rasully
            </p>

            <h1 className="mt-4 max-w-2xl font-display text-[2rem] font-semibold leading-[1.07] tracking-tight sm:text-[2.65rem]">
              ML &amp; AI Engineer building NLP, RAG and applied
              machine-learning systems
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              I build practical ML and AI projects using Python, PyTorch,
              scikit-learn, Transformers and LangChain — from model training and
              evaluation to retrieval pipelines, APIs and demos.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary shadow-lift">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <Github className="h-[18px] w-[18px]" />
              </a>
              <a
                href={socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-accent hover:text-accent"
              >
                <Linkedin className="h-[18px] w-[18px]" />
              </a>
            </div>

            <p className="mt-4 text-sm text-muted">{openToRoles}</p>
          </div>
        </Reveal>

        {/* Right */}
        <Reveal delay={0.15} className="lg:justify-self-end">
          <div className="w-full max-w-md">
            <FocusCard />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
