import { Github, Linkedin, Mail } from "lucide-react";
import { socials } from "@/lib/data";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <p className="text-sm text-muted">
          © 2026 Muzzamil Rasully. Built with Next.js, TypeScript and Tailwind CSS.
        </p>
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${socials.email}`}
            aria-label="Email"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href={socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
