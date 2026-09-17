"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { MERCHANT_START_URL } from "@/lib/merchant";

/** Lead-facing prices — software siempre aparte del equipo. */
const SOFTWARE_MONTH = "$800";
const TERMINAL_MSI_MONTH = "$1,099";

const plans = [
  {
    id: "contado",
    name: "De contado",
    price: "$10,490",
    period: " + IVA · terminal",
    softwareNote: `${SOFTWARE_MONTH} + IVA al mes · software`,
    badge: "Mejor precio",
    featured: false,
    desc: "Pagas la terminal una sola vez. El software Veyra se cobra aparte, cada mes, mientras uses el servicio.",
    features: [
      "Tu terminal Palm POS (queda en tu negocio)",
      `${SOFTWARE_MONTH} + IVA al mes por el software Veyra`,
      "Cobro con palma, consola y app del cliente",
      "Soporte y actualizaciones incluidas en la mensualidad",
    ],
    cta: "Quiero cotizar",
  },
  {
    id: "msi",
    name: "A meses",
    price: TERMINAL_MSI_MONTH,
    period: " + IVA /mes · 12 meses",
    softwareNote: `+ ${SOFTWARE_MONTH} + IVA al mes · software`,
    badge: "Más elegido",
    featured: true,
    desc: "La terminal se paga a 12 meses sin intereses con tu tarjeta. El software Veyra es una mensualidad aparte — igual que de contado.",
    features: [
      "Misma terminal que de contado",
      `${TERMINAL_MSI_MONTH} + IVA al mes × 12 (por la terminal)`,
      `${SOFTWARE_MONTH} + IVA al mes por el software Veyra`,
      "Empiezas con menos desembolso al inicio",
    ],
    cta: "Quiero a meses",
  },
  {
    id: "varios",
    name: "Varias sucursales",
    price: "A medida",
    period: "",
    softwareNote: `${SOFTWARE_MONTH} + IVA al mes · por cada terminal`,
    badge: null,
    featured: false,
    desc: "Varias terminales o una cadena. Misma lógica: compras cada equipo y pagas el software por terminal activa.",
    features: [
      "Precio por volumen en terminales",
      `${SOFTWARE_MONTH} + IVA al mes por cada terminal en uso`,
      "Misma consola y cobro con palma",
      "Acompañamiento al arrancar",
    ],
    cta: "Hablar con ventas",
    href: "#interes",
  },
];

export function Pricing() {
  return (
    <section id="planes" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-muted">¿Cuánto cuesta?</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            La terminal es tuya. El software, mes a mes.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            En todos los planes pagas dos cosas: la terminal (una vez, o a
            meses) y una suscripción mensual de{" "}
            <strong className="text-foreground">
              {SOFTWARE_MONTH} + IVA
            </strong>{" "}
            por usar Veyra — palma, consola, app y soporte.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.id}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`flex flex-col rounded-[1.5rem] border p-7 md:p-8 ${
                plan.featured
                  ? "border-accent-glow/40 bg-pastel-mint shadow-[0_0_40px_-20px_rgba(34,197,94,0.45)]"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                {plan.badge ? (
                  <span className="rounded-full bg-accent-glow/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-glow">
                    {plan.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
                {plan.price}
                {plan.period ? (
                  <span className="text-base font-medium text-muted">
                    {plan.period}
                  </span>
                ) : null}
              </p>
              <p className="mt-2 text-sm font-medium text-accent-glow">
                {plan.softwareNote}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {plan.desc}
              </p>
              <ul className="mt-6 flex-1 space-y-2.5">
                {plan.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-glow" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={"href" in plan && plan.href ? plan.href : MERCHANT_START_URL}
                className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.featured
                    ? "bg-accent-glow text-cta-foreground hover:opacity-90"
                    : "border border-border bg-background hover:border-foreground/30"
                }`}
              >
                {plan.cta}
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </motion.article>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm leading-relaxed text-muted">
          Precios en pesos mexicanos. El IVA se suma al final. Los meses sin
          intereses dependen de tu banco y tu tarjeta. Los cobros a tus clientes
          se procesan con la pasarela de pagos de Veyra; eso no cambia el precio
          de la terminal ni de la suscripción.
        </p>
      </div>
    </section>
  );
}
