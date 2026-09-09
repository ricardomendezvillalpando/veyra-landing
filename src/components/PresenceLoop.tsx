"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeUpSoft, staggerContainer } from "@/lib/motion";

const steps = [
  {
    title: "Presencia",
    body: "El cliente acerca la palma al terminal. Sin buscar cartera ni desbloquear el teléfono.",
  },
  {
    title: "Identidad",
    body: "Veyra confirma quién es en menos de un segundo, de forma segura y privada.",
  },
  {
    title: "Confirmación",
    body: "Se valida lo pedido en ese momento: pagar, entrar, check-in u otra acción permitida.",
  },
  {
    title: "Listo",
    body: "El flujo avanza. Tu operación sigue. El cliente se lleva una experiencia clara.",
  },
];

export function PresenceLoop() {
  const reduce = useReducedMotion();

  return (
    <section id="proceso" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          className="max-w-2xl"
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={reduce ? undefined : fadeUpSoft}
            className="text-sm font-medium text-muted"
          >
            Cómo funciona
          </motion.p>
          <motion.h2
            variants={reduce ? undefined : fadeUpSoft}
            className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
          >
            Cuatro pasos. Cero fricción.
          </motion.h2>
          <motion.p
            variants={reduce ? undefined : fadeUpSoft}
            className="mt-4 text-base leading-relaxed text-muted md:text-lg"
          >
            Presencia, identidad, confirmación y listo. Tus clientes lo
            entienden a la primera — y tu equipo opera sin capacitarse en
            tecnología nueva.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {steps.map((s, i) => (
            <motion.article
              key={s.title}
              variants={reduce ? undefined : fadeUpSoft}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-accent-glow/25"
            >
              <span className="font-mono text-xs text-accent-glow">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
