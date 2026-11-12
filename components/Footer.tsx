import { Github, Linkedin, Mail } from "lucide-react";
import { profile, socials } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-ink">
      <div className="container-page flex flex-col items-start justify-between gap-4 py-8 sm:flex-row sm:items-center">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="-mx-2 flex items-center gap-1 text-muted">
          <a href={socials.github} aria-label="GitHub" className="pop grid h-10 w-10 place-items-center border border-transparent hover:border-ink hover:text-accent">
            <Github className="h-4 w-4" />
          </a>
          <a href={socials.linkedin} aria-label="LinkedIn" className="pop grid h-10 w-10 place-items-center border border-transparent hover:border-ink hover:text-accent">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={`mailto:${socials.email}`} aria-label="Email" className="pop grid h-10 w-10 place-items-center border border-transparent hover:border-ink hover:text-accent">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
