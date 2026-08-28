"use client";

import { motion } from "framer-motion";

const stats = [
  {
    value: "<1s",
    label: "Checkout promedio",
    tone: "bg-gradient-to-br from-[#e8faf2] to-[#d4f5e8]",
    height: "h-44 md:h-48",
  },
  {
    value: "0 contactos",
    label: "Superficies compartidas",
    tone: "bg-gradient-to-br from-[#eceef8] to-[#e0e4f5]",
    height: "h-52 md:h-60",
  },
  {
    value: "100%",
    label: "Biometría revocable",
    tone: "bg-gradient-to-br from-[#f8ece8] to-[#f3e0da]",
    height: "h-60 md:h-72",
  },
];

export function Insights() {
  return (
    <section id="insights" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            La presencia importa.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Métricas pensadas para operadores: menos fricción en mostrador,
            más control para el usuario y privacidad por diseño.
          </p>
        </motion.div>

        <div className="mt-12 flex items-end gap-3 md:gap-5">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`relative flex-1 overflow-hidden rounded-[1.5rem] ${s.tone} ${s.height}`}
            >
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full bg-white/35"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute right-6 top-8 h-16 w-16 rounded-full bg-white/25"
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                <p className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-platinum">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
