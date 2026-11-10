import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github } from "lucide-react";
import { caseStudies, caseStudySlugs } from "@/lib/caseStudies";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SectionLabel } from "@/components/SectionLabel";

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) return { title: "Muzzamil Rasully" };
  return { title: `${study.title} — Muzzamil Rasully`, description: study.tagline };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  return (
    <>
      <Navbar base="/" />
      <main className="container-page pb-20 pt-10">
        <Link href="/#work" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted hover:text-accent">
          <ArrowLeft className="h-4 w-4" /> All work
        </Link>

        <header className="mt-8 max-w-4xl">
          {study.badge ? <span className="chip mb-5">{study.badge}</span> : null}
          <h1 className="display break-words text-[clamp(2.5rem,7vw,5.5rem)]">{study.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{study.tagline}</p>
          {study.github ? (
            <a href={study.github} className="btn-ghost mt-8">
              <Github className="h-4 w-4" /> View the code
            </a>
          ) : null}
        </header>

        <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line/15 bg-line/15 sm:grid-cols-2 lg:grid-cols-4 dark:border-line/[0.14] dark:bg-line/[0.14]">
          {study.results.map((r) => (
            <div key={r.label} className="bg-bg p-6">
              <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">{r.label}</dt>
              <dd className="mt-3 font-display text-4xl text-accent">{r.value}</dd>
              <dd className="mt-2 text-sm text-muted">{r.context}</dd>
            </div>
          ))}
        </dl>

        <section className="mt-16">
          <SectionLabel>Problem</SectionLabel>
          <p className="max-w-3xl leading-relaxed">{study.problem}</p>
        </section>

        <section className="mt-16">
          <SectionLabel>How it works</SectionLabel>
          <ol className="max-w-3xl space-y-5">
            {study.architecture.map((step, i) => (
              <li key={step} className="flex gap-5">
                <span className="font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <p className="leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-16">
          <SectionLabel>Key decisions</SectionLabel>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {study.decisions.map((d) => (
              <div key={d.title} className="tile">
                <h3 className="font-semibold">{d.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <SectionLabel>Stack</SectionLabel>
          <ul className="flex flex-wrap gap-2">
            {study.stack.map((s) => (
              <li key={s} className="chip">
                {s}
              </li>
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}
