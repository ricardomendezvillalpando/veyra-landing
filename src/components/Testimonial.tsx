"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function Testimonial() {
  return (
    <section className="border-t border-border bg-mist/50 py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] bg-mist shadow-lg ring-1 ring-border">
            <Image
              src="/brand/veyra-checkout-palm.png"
              alt="Experiencia de checkout con Veyra"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 420px"
            />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Liderando con innovación
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              El checkout que tus clientes van a preferir.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Negocios que adoptan presencia reducen tiempos de caja, elevan la
              percepción de marca y capturan más visitas — sin rediseñar toda su
              operación.
            </p>
            <blockquote className="mt-8 border-l-2 border-accent pl-5">
              <p className="text-base leading-relaxed text-foreground md:text-lg">
                “El cliente acerca la mano y todo pasa a la vez: pago,
                membresía, acceso. Cambió cómo se siente el mostrador.”
              </p>
              <footer className="mt-4 text-sm text-muted">
                Operadores en piloto · Gyms & retail
              </footer>
            </blockquote>
            <a href="#interes" className="btn-primary mt-8 rounded-full px-7 py-3.5 text-sm">
              Quiero una demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
