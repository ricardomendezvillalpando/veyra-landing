"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ArchitectureFlow() {
  return (
    <section id="arquitectura" className="border-t border-border bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
            Arquitectura
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Un core loop simple e intuitivo.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            De registro a aprobado: la identidad Veyra es el hub. La biometría
            identifica; el dispositivo autoriza; el PSP cobra.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="relative mt-12 overflow-hidden rounded-2xl border border-border bg-ink"
        >
          <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
            <Image
              src="/brand/veyra-flow-diagram.jpg"
              alt="Diagrama del flujo Veyra: registro, palma, Face ID, aprobado"
              fill
              quality={90}
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 1152px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
