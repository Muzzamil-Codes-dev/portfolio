"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  // One scroll handler drives both the blur/border state and active-section
  // highlighting. Active section = the last one whose top has scrolled past a
  // "reading line" ~140px below the viewport top (just under the sticky nav).
  // This is robust for full-height sections and keeps the nearest prior section
  // active while passing through un-navigated gaps (e.g. "More projects").
  // Updates run directly (no rAF, which some environments throttle); the work
  // is tiny and setState is a no-op re-render when the value is unchanged.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));

    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const line = 140;
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - line <= 0) current = id;
      }
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <a
          href="#top"
          className="grid h-10 w-10 place-items-center rounded-xl border border-line bg-surface font-display text-lg font-semibold text-accent transition-colors hover:border-accent"
          aria-label="Home"
        >
          MR
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const id = link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={activeId === id ? "true" : undefined}
                  className="nav-pill"
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a href="#contact" className="btn-primary hidden md:inline-flex">
            Let&apos;s Connect
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line bg-surface text-fg transition-colors hover:border-accent md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-line bg-bg/95 backdrop-blur-md md:hidden">
          <ul className="container-x flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const id = link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={activeId === id ? "true" : undefined}
                    className="nav-pill-mobile"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
            <li className="px-3 pt-2">
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="btn-primary w-full"
              >
                Let&apos;s Connect
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
