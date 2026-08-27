"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, ShieldCheck } from "lucide-react";
import { DemoVideoModal } from "@/components/DemoVideoModal";
import { Logo } from "@/components/Logo";

export function Hero() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden pt-20 md:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 85% 18%, rgba(151, 210, 197, 0.2), transparent 55%),
            radial-gradient(ellipse 45% 35% at 12% 25%, rgba(197, 206, 216, 0.4), transparent 50%),
            linear-gradient(180deg, #eef2f4 0%, #e8eef0 42%, #c5d0d4 58%, #1a2228 78%, #07090c 100%)
          `,
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 pb-10 pt-8 md:gap-12 md:px-8 md:pb-14 md:pt-12 lg:grid-cols-[1.05fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative text-center lg:text-left"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-4 -inset-y-2 -z-10 rounded-3xl bg-[#eef2f4]/75 blur-2xl lg:-inset-x-6"
          />

          <Logo height={28} color="#0d3d36" className="mx-auto lg:mx-0" />

          <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#0c1418] sm:text-5xl md:text-[3.25rem]">
            Paga con biométricos.
            <br />
            <span className="text-[#1a6b5c]">Solo con tu presencia.</span>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-[#2a383e] md:text-lg lg:mx-0">
            Acerca la mano, autoriza en el teléfono y listo. Sin sacar tarjeta
            ni fricción en el mostrador — tu identidad Veyra es la cartera.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#interes"
              className="inline-flex items-center gap-2 rounded-full bg-[#0d3d36] px-7 py-3.5 text-sm font-semibold text-accent transition hover:brightness-110"
            >
              Solicitar demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#proceso"
              className="text-sm font-medium text-[#2a383e] underline-offset-4 transition hover:text-[#0c1418] hover:underline"
            >
              Ver el proceso
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative mx-auto aspect-[4/5] w-[min(100%,340px)] overflow-hidden rounded-[2rem] border border-white/40 shadow-[0_40px_80px_-30px_rgba(13,61,54,0.45)] md:w-[380px]">
            <Image
              src="/brand/veyra-hero-presence.jpg"
              alt="Presencia biométrica Veyra — reconocimiento para pagar"
              fill
              priority
              quality={90}
              className="object-cover object-top"
              sizes="380px"
            />
            <div
              aria-hidden
              className="absolute inset-[14%] rounded-3xl border-2 border-accent/80 shadow-[0_0_40px_rgba(151,210,197,0.35)]"
            />
            <motion.div
              aria-hidden
              className="absolute inset-x-[18%] h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              animate={{ top: ["22%", "72%", "22%"] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="glass-card absolute -right-1 top-6 z-20 w-[min(72%,200px)] p-3.5 sm:right-0 sm:w-[210px] md:-right-4"
          >
            <div className="flex items-start gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/25 text-[#0d3d36]">
                <ShieldCheck className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold text-[#0c1418]">
                  Identidad verificada
                </p>
                <p className="mt-0.5 text-[11px] text-[#5a6a70]">
                  Match seguro · &lt; 1s
                </p>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#0d3d36]/10">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: "98%" }}
                transition={{ delay: 0.6, duration: 1.1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="glass-card absolute -right-1 top-[38%] z-20 w-[min(70%,190px)] p-3.5 sm:w-[200px] md:-right-2"
          >
            <p className="text-xs font-semibold text-[#0c1418]">
              Presencia = pago
            </p>
            <p className="mt-1 text-[11px] leading-snug text-[#5a6a70]">
              Sin tarjeta en la mano. La palma identifica; el teléfono autoriza.
            </p>
            <div className="mt-3 flex -space-x-2">
              {[
                "/brand/veyra-hero-palm-presence.jpg",
                "/brand/veyra-palm-scan.jpg",
                "/brand/veyra-access-gate.jpg",
              ].map((src) => (
                <span
                  key={src}
                  className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-white"
                >
                  <Image src={src} alt="" fill className="object-cover" sizes="28px" />
                </span>
              ))}
              <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-accent text-[10px] font-bold text-accent-foreground">
                +
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="glass-card-dark absolute -left-2 bottom-8 z-20 w-[min(85%,240px)] p-3.5 sm:left-0 md:-left-6"
          >
            <div className="flex items-center gap-3">
              <span className="relative h-11 w-11 overflow-hidden rounded-xl border border-white/10">
                <Image
                  src="/brand/veyra-hero-palm-presence.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="44px"
                />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="truncate text-xs font-semibold text-foreground">
                    Checkout en vivo
                  </p>
                  <span className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent">
                    OK
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted">$380.00 MXN</p>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex justify-between text-[10px] text-muted">
                <span>Match</span>
                <span className="text-accent">98.7%</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[98.7%] rounded-full bg-gradient-to-r from-accent/70 to-accent" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative z-10 border-t border-white/5 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl justify-center px-5 py-7 md:px-8 md:py-8">
          <button
            type="button"
            onClick={() => setDemoOpen(true)}
            className="group inline-flex items-center gap-3 rounded-full border border-accent/30 bg-accent-soft px-7 py-3.5 text-sm font-semibold text-accent transition hover:border-accent/60 hover:bg-accent/20"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground transition group-hover:scale-105">
              <Play className="h-3.5 w-3.5 fill-current" />
            </span>
            Ver Veyra en acción
          </button>
        </div>
      </div>

      <DemoVideoModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </section>
  );
}
