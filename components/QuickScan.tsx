import { BadgeCheck, Briefcase, Wrench } from "lucide-react";
import { quickScan } from "@/lib/data";
import { Reveal } from "./Reveal";

const rows = [
  { label: "Open to", items: quickScan.openTo, icon: Briefcase },
  { label: "Best proof", items: quickScan.bestProof, icon: BadgeCheck },
  { label: "Core stack", items: quickScan.coreStack, icon: Wrench },
];

/** Compact "recruiter snapshot" so a hiring manager can triage in seconds. */
export function QuickScan() {
  return (
    <section aria-label="Recruiter snapshot" className="container-x pb-2">
      <Reveal>
        <div className="card p-5 sm:p-6">
          <dl className="grid gap-4 sm:grid-cols-3 sm:gap-6">
            {rows.map((row) => {
              const Icon = row.icon;
              return (
                <div key={row.label}>
                  <dt className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    <Icon className="h-3.5 w-3.5 text-accent" />
                    {row.label}
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {row.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}
