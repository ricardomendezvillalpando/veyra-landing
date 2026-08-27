"use client";

import { motion } from "framer-motion";
import { CreditCard, DoorOpen, Star } from "lucide-react";

const products = [
  {
    icon: CreditCard,
    name: "Veyra Pay",
    body: "Pagos presenciales sin sacar tarjeta. Identidad biométrica + autorización en el teléfono.",
  },
  {
    icon: DoorOpen,
    name: "Veyra Access",
    body: "La misma identidad abre puertas, turnos y membresías. Un enrolamiento, múltiples contextos.",
  },
  {
    icon: Star,
    name: "Veyra Loyalty",
    body: "Recompensas ligadas a la persona, no al plástico. Continuidad entre sucursales y experiencias.",
  },
];

export function Platform() {
  return (
    <section id="plataforma" className="border-t border-border bg-surface/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
            Plataforma
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Una identidad. Varios productos.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Veyra ID es el núcleo. Pay es el primer producto; Access y Loyalty
            expanden el mismo patrón de confianza.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {products.map((product, i) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-surface-elevated p-8 md:p-10"
              >
                <Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-xl font-semibold text-foreground">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {product.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
