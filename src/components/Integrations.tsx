"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Coffee,
  CreditCard,
  Dumbbell,
  Hotel,
  Smartphone,
  Store,
} from "lucide-react";

const chips = [
  { icon: CreditCard, label: "PSP" },
  { icon: Store, label: "POS" },
  { icon: Smartphone, label: "App" },
  { icon: Dumbbell, label: "Gimnasios" },
  { icon: Coffee, label: "Retail" },
  { icon: Hotel, label: "Hospitalidad" },
  { icon: Building2, label: "Coworking" },
];

export function Integrations() {
  return (
    <section id="integraciones" className="py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Integraciones
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Encaja con lo que ya usas.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Veyra se adapta a tu POS y herramientas del día a día. Presencia en
            el mostrador y en la puerta — sin rehacer tu operación.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {chips.map((c) => {
            const Icon = c.icon;
            return (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground shadow-sm"
              >
                <Icon className="h-4 w-4 text-accent" strokeWidth={1.75} />
                {c.label}
              </span>
            );
          })}
        </motion.div>

        <a href="#interes" className="btn-primary mt-10 rounded-full px-8 py-3.5 text-sm">
          Quiero una demo
        </a>
      </div>
    </section>
  );
}
