"use client";

import { Building2, Coffee, Dumbbell, Hotel } from "lucide-react";

const verticals = [
  { icon: Dumbbell, label: "Gimnasios" },
  { icon: Coffee, label: "Retail & cafés" },
  { icon: Hotel, label: "Hospitalidad" },
  { icon: Building2, label: "Coworking" },
];

export function TrustBar() {
  return (
    <section className="border-y border-border bg-mist/50 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-5 md:flex-row md:justify-between md:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Hecho para tu tipo de negocio
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {verticals.map((v) => {
            const Icon = v.icon;
            return (
              <span
                key={v.label}
                className="inline-flex items-center gap-2 text-sm font-medium text-platinum"
              >
                <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                {v.label}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
