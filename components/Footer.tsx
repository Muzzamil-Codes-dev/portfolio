import { Github, Linkedin, Mail } from "lucide-react";
import { profile, socials } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line/15 dark:border-line/[0.14]">
      <div className="container-page flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-4 text-muted">
          <a href={socials.github} aria-label="GitHub" className="transition hover:text-accent">
            <Github className="h-4 w-4" />
          </a>
          <a href={socials.linkedin} aria-label="LinkedIn" className="transition hover:text-accent">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={`mailto:${socials.email}`} aria-label="Email" className="transition hover:text-accent">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
