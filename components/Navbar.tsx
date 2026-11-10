"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navLinks, profile, socials } from "@/lib/data";
import { ThemeToggle } from "@/components/ThemeToggle";

/** `base` prefixes the anchors so the bar also works on case-study pages. */
export function Navbar({ base = "" }: { base?: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/15 bg-bg/85 backdrop-blur dark:border-line/[0.14]">
      <nav className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-1.5 font-mono text-sm font-semibold uppercase tracking-[0.14em]">
          {profile.name}
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={`${base}${l.href}`} className="text-sm text-muted transition hover:text-ink">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href={`mailto:${socials.email}`} className="btn-primary hidden !py-2 sm:inline-flex">
            Get in touch <ArrowUpRight className="h-4 w-4" />
          </a>
          <button
            type="button"
            className="grid h-9 w-9 place-items-center rounded-full border border-line/15 md:hidden dark:border-line/[0.14]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-line/15 md:hidden dark:border-line/[0.14]">
          <div className="container-page flex flex-col py-2">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={`${base}${l.href}`}
                onClick={() => setOpen(false)}
                className="py-3 font-mono text-sm uppercase tracking-[0.14em]"
              >
                {l.label}
              </a>
            ))}
            <a href={`mailto:${socials.email}`} className="py-3 font-mono text-sm uppercase tracking-[0.14em] text-accent">
              Get in touch
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
