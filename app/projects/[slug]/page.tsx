import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, Github, ImageIcon } from "lucide-react";
import { caseStudies, caseStudySlugs } from "@/lib/caseStudies";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

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
  if (!study) return { title: "Case Study — Muzzamil Rasully" };
  return {
    title: `${study.title} — Case Study · Muzzamil Rasully`,
    description: study.tagline,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = caseStudies[slug];
  if (!study) notFound();

  const glanceRows: { label: string; value: string; emphasis?: boolean }[] = [
    { label: "Problem", value: study.glance.problem },
    { label: "Built", value: study.glance.built },
    { label: "Models / methods", value: study.glance.models },
    { label: "Result", value: study.glance.result, emphasis: true },
    { label: "Strength shown", value: study.glance.strength },
  ];

  return (
    <>
      {/* minimal top bar */}
      <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="container-x flex h-16 items-center justify-between">
          <Link
            href="/"
            className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface font-display text-lg font-semibold text-accent"
            aria-label="Home"
          >
            MR
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/#projects" className="btn-ghost">
              <ArrowLeft className="h-4 w-4" />
              All projects
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container-x py-12 sm:py-14">
        <article className="mx-auto max-w-3xl">
          <span className="section-label">Case Study</span>
          <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {study.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted">{study.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {study.tech.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          {/* proof signals */}
          <ul className="mt-3 flex flex-wrap gap-2">
            {study.proof.map((p) => (
              <li
                key={p}
                className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent"
              >
                <Check className="h-3 w-3" />
                {p}
              </li>
            ))}
          </ul>

          {study.github && (
            <a
              href={study.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-6"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </a>
          )}

          {/* At a glance */}
          <div className="card mt-10 p-6 sm:p-7">
            <p className="section-label">At a glance</p>
            <dl className="mt-1 divide-y divide-line">
              {glanceRows.map((row) => (
                <div key={row.label} className="grid gap-1 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                  <dt className="text-sm font-semibold text-muted">{row.label}</dt>
                  <dd className={row.emphasis ? "font-medium text-fg" : "text-muted"}>
                    {row.value}
                  </dd>
                </div>
              ))}
              <div className="grid gap-1.5 py-3 sm:grid-cols-[150px_1fr] sm:gap-4">
                <dt className="text-sm font-semibold text-muted">Links</dt>
                <dd className="flex flex-wrap gap-1.5">
                  {study.glance.links.map((l) => (
                    <span key={l} className="chip">
                      {l}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          {/* Visual proof — real charts, app screenshots and diagrams. One shared
              card frame: a fixed-height image area (object-contain so no axes,
              legends or titles get cropped), image centred and sized to fill the
              frame, caption pinned to the bottom. Wide charts span the full
              width and grow to their natural height; screenshots use cover. */}
          <div className="mt-10">
            <p className="section-label">Visual proof</p>
            <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
              {study.visuals.map((v) => {
                const isCover = v.fit === "cover";
                const isWide = v.shape === "wide";
                // Fixed frame heights reserve space (no layout shift / collapse)
                // and keep the gallery even. Wide charts span both columns in a
                // slightly taller frame; everything is object-contain so no axes
                // or legends are ever cropped.
                const frameHeight = isCover || isWide
                  ? "h-[300px] sm:h-[360px] lg:h-[400px]"
                  : v.shape === "tall"
                    ? "h-[340px] sm:h-[400px] lg:h-[440px]"
                    : "h-[280px] sm:h-[330px] lg:h-[360px]";
                return (
                  <figure
                    key={v.label}
                    className={`group flex flex-col overflow-hidden rounded-[22px] border border-line bg-surface shadow-soft transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lift ${
                      isWide ? "sm:col-span-2" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center overflow-hidden ${
                        isCover ? "" : "p-4 sm:p-5"
                      } ${v.src ? "bg-[#F6EEE2]" : "bg-bg/50"} ${frameHeight}`}
                    >
                      {v.src ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={v.src}
                          alt={v.label}
                          className={
                            isCover
                              ? "h-full w-full object-cover object-top"
                              : "block max-h-full max-w-full rounded-lg object-contain"
                          }
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-2 text-muted/70">
                          <ImageIcon className="h-6 w-6" />
                          <span className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                            Coming soon
                          </span>
                        </div>
                      )}
                    </div>
                    <figcaption className="mt-auto border-t border-line bg-surface px-5 py-3.5 text-[15px] font-medium leading-snug text-muted">
                      {v.label}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              Charts and diagrams are real outputs and architecture from the project.
            </p>
          </div>

          {/* detailed sections */}
          <div className="mt-12 space-y-10">
            {study.sections.map((section, i) => (
              <section key={section.heading}>
                <h2 className="flex items-baseline gap-3 font-display text-xl font-semibold">
                  <span className="text-sm font-semibold text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.heading}
                </h2>
                {section.body && (
                  <p className="mt-3 leading-relaxed text-muted">{section.body}</p>
                )}
                {section.bullets && (
                  <ul className="mt-3 space-y-2">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 leading-relaxed text-muted">
                        <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-line pt-8">
            <Link href="/#projects" className="btn-primary">
              <ArrowLeft className="h-4 w-4" />
              Back to all projects
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
