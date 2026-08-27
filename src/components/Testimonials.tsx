"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TESTIMONIALS = [
  {
    name: "Andrea M.",
    role: "Ops · Gimnasio urbano",
    quote:
      "El check-in y el pago en el mismo gesto cambiaron el flujo en recepción. Menos filas, más membresías activas.",
    avatar: "/brand/veyra-hero-authorize.jpg",
  },
  {
    name: "Luis R.",
    role: "Director · Club deportivo",
    quote:
      "Nos interesó que la palma no se amarre a una tarjeta. Cambiamos métodos de pago sin re-enrolar a nadie.",
    avatar: "/brand/veyra-access-gate.jpg",
  },
  {
    name: "Sofía C.",
    role: "Product · Fintech partner",
    quote:
      "La separación identidad / wallet es exactamente lo que pedía compliance. El challenge firmado se siente serio.",
    avatar: "/brand/veyra-method-face.jpg",
  },
  {
    name: "Diego V.",
    role: "Gerente · Coworking",
    quote:
      "Piloto limpio: acceso + café en la misma identidad. El equipo entendió el flujo en un día.",
    avatar: "/brand/veyra-palm-scan.jpg",
  },
  {
    name: "Mariana T.",
    role: "CX · Cadena de studios",
    quote:
      "La experiencia en el teléfono (Face ID) da confianza. El terminal solo confirma; el usuario controla.",
    avatar: "/brand/process/veyra-verify-face-success.jpg",
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
      <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
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
            Historias reales de design partners y operadores en el piloto.
          </p>
          <a
            href="#interes"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-foreground transition hover:brightness-110"
          >
            Quiero ser partner
          </a>
        </motion.div>

        {/* Avatar arc */}
        <div className="relative mx-auto mt-14 max-w-3xl">
          <svg
            className="pointer-events-none absolute inset-x-0 top-1/2 h-16 -translate-y-1/2 text-white/10"
            viewBox="0 0 600 40"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0 20 Q150 0 300 20 T600 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="3 7"
            />
          </svg>

          <div className="relative flex items-end justify-center gap-3 sm:gap-5 md:gap-7">
            {TESTIMONIALS.map((t, i) => {
              const dist = Math.min(
                Math.abs(i - index),
                TESTIMONIALS.length - Math.abs(i - index),
              );
              const size =
                dist === 0 ? 72 : dist === 1 ? 52 : dist === 2 ? 40 : 32;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setIndex(i)}
                  className="relative shrink-0 overflow-hidden rounded-full border-2 transition"
                  style={{
                    width: size,
                    height: size,
                    borderColor:
                      i === index ? "var(--accent)" : "rgba(238,241,244,0.15)",
                    opacity: dist > 2 ? 0.45 : 1,
                    transform: `translateY(${dist === 0 ? 0 : dist * 6}px)`,
                  }}
                  aria-label={t.name}
                >
                  <Image
                    src={t.avatar}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="72px"
                  />
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
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-foreground transition hover:border-accent/40"
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
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface-elevated text-foreground transition hover:border-accent/40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
