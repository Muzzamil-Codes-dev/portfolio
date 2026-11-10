import type { IconType } from "react-icons";
import {
  SiDocker,
  SiFastapi,
  SiGithubactions,
  SiLangchain,
  SiNextdotjs,
  SiPandas,
  SiPostgresql,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiSqlite,
  SiTailwindcss,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { stack, type StackGroup } from "@/lib/data";
import { SectionLabel } from "@/components/SectionLabel";

const icons: Record<string, IconType> = {
  Python: SiPython,
  TypeScript: SiTypescript,
  FastAPI: SiFastapi,
  PostgreSQL: SiPostgresql,
  SQLite: SiSqlite,
  Docker: SiDocker,
  "GitHub Actions": SiGithubactions,
  LangChain: SiLangchain,
  PyTorch: SiPytorch,
  pandas: SiPandas,
  "scikit-learn": SiScikitlearn,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "Tailwind CSS": SiTailwindcss,
  Vite: SiVite,
};

const groups: StackGroup[] = ["Languages", "Backend", "AI", "Data & Cloud", "Front end"];

export function Stack() {
  return (
    <section id="stack" className="section">
      <div className="container-page">
        <SectionLabel right="Tools I use day to day">Stack</SectionLabel>
        <div className="space-y-6">
          {groups.map((g) => (
            <div key={g} className="grid gap-3 md:grid-cols-[200px_1fr] md:gap-10">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted md:pt-2.5">{g}</p>
              <ul className="flex flex-wrap gap-2">
                {stack
                  .filter((s) => s.group === g)
                  .map(({ name }) => {
                    const Icon = icons[name];
                    return (
                      <li
                        key={name}
                        className="pop-sm group inline-flex cursor-default items-center gap-2 rounded-lg border border-line/15 bg-surface px-3 py-2 text-sm dark:border-line/[0.14]"
                      >
                        {Icon ? <Icon className="h-4 w-4 text-muted transition-colors group-hover:text-accent" aria-hidden /> : null}
                        {name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
