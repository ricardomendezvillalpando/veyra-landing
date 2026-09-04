"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";

const plans = [
  {
    name: "Start",
    price: "$499",
    period: "/mes",
    activation: "Activación desde $1,499 MXN",
    desc: "Perfecto para una sucursal. Empieza a cobrar con la palma desde el día uno.",
    features: [
      "Terminal lista para usar",
      "Pagos con la palma",
      "Panel para ver tus ventas",
      "Soporte por WhatsApp",
    ],
    cta: "Empezar con Start",
    featured: false,
  },
  {
    name: "Business",
    price: "$799",
    period: "/mes",
    activation: "Activación desde $999 MXN",
    desc: "Para negocios que quieren conectar Veyra con su caja y crecer en varias sucursales.",
    features: [
      "Todo lo de Start",
      "Conexión con tu sistema de caja",
      "Varias ubicaciones",
      "Reportes claros",
      "Acompañamiento al arrancar",
    ],
    cta: "Quiero Business",
    featured: true,
  },
  {
    name: "Enterprise",
    price: "A medida",
    period: "",
    activation: "Cotización personalizada",
    desc: "Cadenas, franquicias y partners. Volumen, soporte dedicado y despliegue a tu ritmo.",
    features: [
      "Integración a tu operación",
      "Hardware a escala",
      "Equipo y roles",
      "Atención prioritaria",
    ],
    cta: "Hablar con ventas",
    featured: false,
  },
];

export function Pricing() {
  return (
    <section id="planes" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-muted">Planes</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Precios claros. Resultados que se sienten.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Elige el plan que se adapta a tu negocio. Sin letra chiquita
            tecnológica — solo lo que necesitas para empezar a cobrar y atender
            mejor.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.article
              key={plan.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`flex flex-col rounded-[1.5rem] border p-7 md:p-8 ${
                plan.featured
                  ? "border-accent bg-pastel-mint/60 shadow-sm"
                  : "border-border bg-surface"
              }`}
            >
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                {plan.featured ? (
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-foreground">
                    Más popular
                  </span>
                ) : null}
              </div>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
                {plan.price}
                <span className="text-base font-medium text-muted">
                  {plan.period}
                </span>
              </p>
              <p className="mt-1 text-xs font-medium text-muted">
                {plan.activation}
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
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#interes"
                className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-3 text-sm font-semibold transition ${
                  plan.featured
                    ? "btn-primary"
                    : "border border-border bg-surface text-foreground hover:bg-mist"
                }`}
              >
                {plan.cta}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
