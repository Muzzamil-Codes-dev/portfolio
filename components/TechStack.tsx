import {
  SiDocker,
  SiFastapi,
  SiGit,
  SiHuggingface,
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiTensorflow,
} from "react-icons/si";
import {
  Activity,
  Database,
  Layers,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";
import { Reveal } from "./Reveal";

// Map each tech label to an icon (react-icons logo where available, else a
// clean lucide glyph) so the strip stays consistent and import-safe.
const icons: Record<string, IconType | LucideIcon> = {
  Python: SiPython,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  "Hugging Face": SiHuggingface,
  "scikit-learn": SiScikitlearn,
  LangChain: Workflow,
  RAG: Layers,
  FastAPI: SiFastapi,
  Docker: SiDocker,
  MLflow: Activity,
  SQL: Database,
  Git: SiGit,
};

export function TechStack() {
  const items = Object.keys(icons);

  return (
    <section className="border-y border-line bg-surface/50">
      <div className="container-x py-8">
        <Reveal>
          <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            ML / AI stack I work with
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4 sm:gap-x-10">
            {items.map((label) => {
              const Icon = icons[label];
              return (
                <li
                  key={label}
                  className="flex items-center gap-2 text-muted transition-colors hover:text-fg"
                >
                  <Icon className="h-[18px] w-[18px]" />
                  <span className="text-sm font-medium">{label}</span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
