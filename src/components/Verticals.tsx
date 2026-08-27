"use client";

import { motion } from "framer-motion";

const verticals = [
  "Gimnasios",
  "Clubes",
  "Coworking",
  "Campus",
  "Eventos",
  "Hoteles",
];

export function Verticals() {
  return (
    <section id="negocios" className="border-t border-border bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
            Para negocios
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Empieza donde la identidad ya importa.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Vertical inicial: gimnasios — usuarios recurrentes, acceso físico y
            compras en sitio. Veyra coexiste con la TPV existente; nunca bloquea
            el checkout normal.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-12 flex flex-wrap gap-3"
        >
          {verticals.map((item) => (
            <li
              key={item}
              className="rounded-full border border-border bg-surface-elevated px-5 py-2.5 text-sm text-platinum"
            >
              {item}
            </li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.12 }}
          className="mt-10 max-w-xl text-sm leading-relaxed text-muted"
        >
          Buscamos design partners: piloto 60 días, una ubicación, hardware y
          soporte incluidos a cambio de feedback real y métricas.
        </motion.p>
      </div>
    </section>
  );
}
