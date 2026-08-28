"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCta() {
  return (
    <section className="px-5 py-12 md:px-8 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 overflow-hidden rounded-[1.75rem] bg-accent px-8 py-10 md:flex-row md:items-center md:px-12 md:py-12"
      >
        <div className="max-w-lg">
          <h2 className="font-display text-2xl font-bold tracking-tight text-accent-foreground md:text-3xl">
            Sé el negocio al que todos quieren volver.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-accent-foreground/85 md:text-base">
            Agenda una demo y mira cómo Veyra acelera tu checkout, mejora la
            captación y diferencia tu marca en minutos — no en meses.
          </p>
        </div>
        <a href="#interes" className="btn-primary-on-accent shrink-0 px-7 py-3.5 text-sm">
          Quiero una demo
          <ArrowRight className="h-4 w-4" />
        </a>
      </motion.div>
    </section>
  );
}
