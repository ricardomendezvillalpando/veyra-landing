"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ink"
    >
      {/* Video de fondo */}
      <div className="absolute inset-0" aria-hidden>
        <video
          className="h-full w-full object-cover object-center"
          autoPlay={!reduce}
          muted
          loop
          playsInline
          poster="/brand/veyra-checkout-palm.png"
        >
          <source src="/brand/veyra-hero-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-ink/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/35 to-ink/75" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-16 pt-28 text-center md:px-8 md:pb-20 md:pt-32">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[14ch] font-display text-[2.5rem] font-semibold leading-[1.05] tracking-tight text-white sm:max-w-[16ch] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          style={{ textShadow: "0 2px 40px rgba(0,0,0,0.45)" }}
        >
          Tu palma es
          <br />
          la llave.
          <br />
          <span className="mt-1 inline-block font-bold text-accent">Pagas.</span>{" "}
          <span className="inline-block font-bold text-accent/90">Entras.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-6 max-w-md px-1 text-sm leading-relaxed text-white/85 md:mt-7 md:max-w-lg md:text-base"
          style={{ textShadow: "0 1px 16px rgba(0,0,0,0.4)" }}
        >
          Acercas la mano y listo: pago, membresía o acceso. Sin tarjeta, sin
          app, sin fricción — tu presencia abre todo.
        </motion.p>

        <motion.a
          href="#interes"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.14 }}
          className="btn-primary mt-9 rounded-full px-7 py-3.5 text-sm md:text-base"
        >
          Quiero una demo
          <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  );
}
