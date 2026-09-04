"use client";

import { motion } from "framer-motion";

const steps = [
  {
    title: "Acercas la palma",
    body: "El cliente pone la mano. Sin buscar cartera, sin desbloquear el teléfono.",
  },
  {
    title: "Te reconoce al instante",
    body: "Veyra sabe quién eres en menos de un segundo — de forma segura y privada.",
  },
  {
    title: "Confirma lo que pediste",
    body: "Pagar, entrar o registrarte: el sistema valida y avanza sin fricción.",
  },
  {
    title: "Listo. Siguiente.",
    body: "La fila se mueve. La experiencia se siente premium. Y la gente vuelve.",
  },
];

export function PresenceLoop() {
  return (
    <section id="proceso" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted">Cómo funciona</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Tan simple que se siente magia.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Cuatro pasos. Cero drama. Tus clientes lo entienden a la primera —
            y tu equipo cobra o da acceso sin capacitar a nadie en tecnología.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
