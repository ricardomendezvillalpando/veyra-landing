"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Andrea M.",
    initials: "AM",
    role: "Ops · Gimnasio urbano",
    quote:
      "El check-in y el pago en el mismo gesto cambiaron el flujo en recepción. Menos filas, más membresías activas.",
  },
  {
    name: "Luis R.",
    initials: "LR",
    role: "Director · Club deportivo",
    quote:
      "Nos interesó que la palma no se amarre a una tarjeta. Cambiamos métodos de pago sin re-enrolar a nadie.",
  },
  {
    name: "Sofía C.",
    initials: "SC",
    role: "Product · Fintech partner",
    quote:
      "La separación identidad / wallet es exactamente lo que pedía compliance. El challenge firmado se siente serio.",
  },
  {
    name: "Diego V.",
    initials: "DV",
    role: "Gerente · Coworking",
    quote:
      "Piloto limpio: acceso + café en la misma identidad. El equipo entendió el flujo en un día.",
  },
  {
    name: "Mariana T.",
    initials: "MT",
    role: "CX · Cadena de studios",
    quote:
      "La experiencia en el teléfono (Face ID) da confianza. El terminal solo confirma; el usuario controla.",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(2);
  const active = TESTIMONIALS[index];

  function prev() {
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }
  function next() {
    setIndex((i) => (i + 1) % TESTIMONIALS.length);
  }

  return (
    <section id="clientes" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Qué dicen quienes prueban Veyra
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Historias de design partners y operadores en el piloto.
          </p>
          <a
            href="#interes"
            className="btn-primary mt-8 px-7 py-3 text-sm"
          >
            Quiero ser partner
          </a>
        </motion.div>

        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="relative flex items-end justify-center gap-3 sm:gap-5 md:gap-7">
            {TESTIMONIALS.map((t, i) => {
              const dist = Math.min(
                Math.abs(i - index),
                TESTIMONIALS.length - Math.abs(i - index),
              );
              const size =
                dist === 0 ? 64 : dist === 1 ? 48 : dist === 2 ? 40 : 32;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  className="inline-flex shrink-0 items-center justify-center rounded-full border-2 font-display text-xs font-semibold transition"
                  style={{
                    width: size,
                    height: size,
                    fontSize: size * 0.28,
                    borderColor:
                      i === index ? "var(--accent)" : "var(--border)",
                    background:
                      i === index ? "var(--accent-soft)" : "var(--mist)",
                    color:
                      i === index ? "var(--accent)" : "var(--muted)",
                    opacity: dist > 2 ? 0.45 : 1,
                    transform: `translateY(${dist === 0 ? 0 : dist * 6}px)`,
                  }}
                  aria-label={t.name}
                >
                  {t.initials}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mx-auto mt-10 flex max-w-2xl items-center gap-3 md:gap-5">
          <button
            type="button"
            onClick={prev}
            aria-label="Anterior"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent/40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex-1 text-center"
            >
              <p className="text-base leading-relaxed text-platinum md:text-lg">
                “{active.quote}”
              </p>
              <footer className="mt-5">
                <p className="font-display text-sm font-semibold text-foreground">
                  {active.name}
                </p>
                <p className="mt-1 text-xs text-muted">{active.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>

          <button
            type="button"
            onClick={next}
            aria-label="Siguiente"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-foreground transition hover:border-accent/40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
