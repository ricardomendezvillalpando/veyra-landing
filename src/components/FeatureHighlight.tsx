"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const highlights = [
  "Checkout en menos de un segundo",
  "Acceso y pago con la misma presencia",
  "El cliente autoriza en su teléfono",
];

export function FeatureHighlight() {
  return (
    <section className="bg-mist/40 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-5 md:grid-cols-2 md:gap-16 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex rounded-lg bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent">
            Features
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            La ventaja que tu negocio necesita
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Menos fricción en caja y en la puerta significa más captación, más
            tickets por hora y clientes que recuerdan cómo se siente comprar o
            entrar contigo.
          </p>
          <ul className="mt-7 space-y-3">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2.5 text-sm font-medium text-foreground"
              >
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <a href="#interes" className="btn-primary mt-8 rounded-xl px-7 py-3.5 text-sm">
            Quiero una demo
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.06 }}
          className="relative"
        >
          <Sparkles
            className="absolute -right-1 -top-2 z-10 h-5 w-5 text-accent"
            aria-hidden
          />
          <div className="relative space-y-4">
            <div className="overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-lg">
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                <Image
                  src="/brand/veyra-checkout-palm.png"
                  alt="Checkout con palma Veyra"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Checkout con presencia
                  </p>
                  <p className="text-xs text-muted">Mostrador · &lt; 1s</p>
                </div>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
                  Pay
                </span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-mist">
                <div className="h-full w-[88%] rounded-full bg-accent" />
              </div>
            </div>

            <div className="ml-6 overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-md">
              <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                <Image
                  src="/brand/veyra-phone-auth.png"
                  alt="Autorización en el teléfono"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 90vw, 380px"
                />
              </div>
              <div className="mt-3 flex items-center justify-between px-1">
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Autorización Face ID
                  </p>
                  <p className="text-xs text-muted">Cliente en control</p>
                </div>
                <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[11px] font-semibold text-accent">
                  Auth
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
