"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Hand, Users, Zap } from "lucide-react";
import { MERCHANT_START_URL } from "@/lib/merchant";
import {
  easeOutExpo,
  fadeUp,
  fadeUpSoft,
  staggerContainer,
} from "@/lib/motion";

const highlights = [
  {
    value: "Sin fricción",
    label: "En caja",
    body: "Tu cliente no busca tarjeta ni teléfono. Acerca la palma y el cobro avanza.",
    hint: null as string | null,
    icon: Hand,
  },
  {
    value: "Más tickets",
    label: "Menos filas",
    body: "Cobras en segundos. Menos espera, más mesa libre, más venta al día.",
    hint: null as string | null,
    icon: Zap,
  },
  {
    value: "Cliente fiel",
    label: "Te reconoce",
    body: "Vuelve y ya está identificado. Misma persona, pago listo — tu negocio lo siente.",
    hint: null as string | null,
    icon: Users,
  },
];

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Full-bleed: terminal real + palma en el negocio */}
      <div className="absolute inset-0" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/veyra-hero-palm-pay.jpg"
          alt=""
          className="absolute inset-0 h-full w-full scale-105 object-cover object-[72%_center] md:object-[78%_center]"
        />
        {/* Scrim: legible copy left, photo open on the right */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg,
                rgba(10,10,10,0.94) 0%,
                rgba(10,10,10,0.82) 34%,
                rgba(10,10,10,0.35) 58%,
                rgba(10,10,10,0.18) 100%),
              linear-gradient(180deg,
                rgba(10,10,10,0.55) 0%,
                transparent 28%,
                transparent 62%,
                rgba(10,10,10,0.88) 100%)
            `,
          }}
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-soft-light"
          style={{
            background:
              "radial-gradient(ellipse 50% 45% at 70% 45%, rgba(34,197,94,0.22) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-5 pb-10 pt-28 md:px-8 md:pb-12 md:pt-32">
        <motion.div
          className="max-w-xl"
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="font-mono text-[11px] tracking-[0.18em] text-accent-glow uppercase"
          >
            Para tu negocio
          </motion.p>

          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="mt-5 max-w-[14ch] font-display text-[2.65rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-[3.4rem] lg:text-[3.9rem]"
          >
            Cobrar con la{" "}
            <span className="veyra-sweep-text">palma</span>. Tecnología que
            adquieres.
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-6 max-w-md text-base leading-relaxed text-foreground/75 md:text-lg lg:text-xl"
          >
            Tu cliente paga con la palma. Tú compras la terminal y pagas una
            mensualidad por el software — claro, sin letra chiquita de “renta”.
          </motion.p>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-10 flex flex-wrap items-center gap-3 md:mt-12"
          >
            <a
              href={MERCHANT_START_URL}
              className="btn-primary px-8 py-3.5 text-sm md:px-9 md:py-4"
            >
              Empezar
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#planes"
              className="btn-ghost border-white/20 px-7 py-3.5 text-sm text-foreground hover:border-white/40 md:px-8 md:py-4"
            >
              Ver inversión
            </a>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 mt-auto border-t border-white/10 bg-black/55 backdrop-blur-md">
        <motion.div
          className="relative mx-auto flex max-w-7xl flex-col gap-0 px-5 py-8 md:flex-row md:items-stretch md:px-8 md:py-10"
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.label}
                variants={reduce ? undefined : fadeUpSoft}
                className={`flex flex-1 flex-col py-5 md:px-8 md:py-0 ${
                  i > 0
                    ? "border-t border-white/10 md:border-t-0 md:border-l"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <p className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                    {h.value}
                  </p>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-accent-glow">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                </div>
                <p className="mt-1 text-xs font-medium tracking-wide text-accent-glow uppercase">
                  {h.label}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
                  {h.body}
                </p>
                {h.hint ? (
                  <p className="mt-2 max-w-xs text-[11px] leading-snug text-platinum">
                    {h.hint}
                  </p>
                ) : null}
              </motion.div>
            );
          })}
          <motion.div
            variants={reduce ? undefined : fadeUpSoft}
            className="hidden items-center pl-6 lg:flex"
            transition={{ duration: 0.55, ease: easeOutExpo }}
          >
            <a
              href="#planes"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white text-cta-foreground transition hover:scale-105 hover:bg-accent-glow"
              aria-label="Ver inversión"
            >
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
