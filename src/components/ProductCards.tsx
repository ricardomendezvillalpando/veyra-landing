"use client";

import { motion } from "framer-motion";
import { CreditCard, KeyRound, Sparkles } from "lucide-react";

const products = [
  {
    icon: CreditCard,
    title: "Veyra Pay",
    body: "Cierra ventas más rápido. Menos abandono en caja, más tickets por hora y un checkout que tus clientes recuerdan.",
  },
  {
    icon: KeyRound,
    title: "Veyra Access",
    body: "Check-in sin filas ni tarjetas perdidas. Más visitas, menos fricción en recepción y una experiencia premium desde la puerta.",
  },
  {
    icon: Sparkles,
    title: "Veyra Loyalty",
    body: "La lealtad viaja con la persona, no con una tarjeta. Más recompras, membresías activas y datos limpios de tus mejores clientes.",
  },
];

export function ProductCards() {
  return (
    <section id="proceso" className="bg-mist/40 py-20 md:py-24">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Tres formas de crecer con presencia
          </h2>
          <p className="mt-4 text-base text-muted md:text-lg">
            Elige dónde duele hoy — mostrador, puerta o retención — y lleva la
            misma identidad a todo el journey del cliente.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {products.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
              >
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
