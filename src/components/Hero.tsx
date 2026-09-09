"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Hand, ShieldCheck, Zap } from "lucide-react";
import { NoiseBg } from "@/components/NoiseBg";
import {
  easeOutExpo,
  fadeUp,
  fadeUpSoft,
  scaleIn,
  staggerContainer,
} from "@/lib/motion";

type Pointer = { x: number; y: number };

const highlights = [
  {
    value: "<1s",
    label: "Identidad",
    body: "Confirma quién es antes de cobrar o dar acceso.",
    hint: null as string | null,
    icon: Zap,
  },
  {
    value: "1 gesto",
    label: "Menos fricción",
    body: "Pagar, entrar o registrarse sin pasos de más.",
    hint: null as string | null,
    icon: Hand,
  },
  {
    value: "LFPDPPP",
    label: "Datos protegidos",
    body: "Tu cliente da consentimiento y puede ejercer sus derechos.",
    hint: "Ley mexicana de protección de datos personales",
    icon: ShieldCheck,
  },
];

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const pointerRef = useRef<Pointer | null>(null);

  useEffect(() => {
    if (reduce) return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    void v.play().catch(() => {
      /* autoplay blocked */
    });
  }, [reduce]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-background"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        };
      }}
      onPointerLeave={() => {
        pointerRef.current = null;
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: `
            radial-gradient(ellipse 45% 40% at 20% 20%, rgba(34,197,94,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 40% 35% at 80% 15%, rgba(26,107,92,0.08) 0%, transparent 50%),
            radial-gradient(ellipse 55% 45% at 70% 80%, rgba(34,197,94,0.05) 0%, transparent 55%)
          `,
        }}
      />
      <NoiseBg pointerRef={pointerRef} />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 px-5 pb-6 pt-28 md:grid-cols-2 md:gap-12 md:px-8 md:pb-8 md:pt-32 lg:gap-16 lg:pb-10">
        <motion.div
          className="relative z-10 flex flex-col items-start text-left md:pb-8"
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="font-mono text-[11px] tracking-[0.18em] text-accent-glow uppercase"
          >
            Identidad para el mundo físico
          </motion.p>

          <motion.h1
            variants={reduce ? undefined : fadeUp}
            className="mt-5 max-w-[15ch] font-display text-[2.65rem] font-semibold leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-[3.35rem] lg:text-[3.85rem] xl:text-[4.15rem]"
          >
            Tu palma{" "}
            <span className="veyra-sweep-text">identifica</span>, confirma y
            avanza.
          </motion.h1>

          <motion.p
            variants={reduce ? undefined : fadeUp}
            className="mt-6 max-w-md text-base leading-relaxed text-muted md:text-lg lg:text-xl"
          >
            Veyra reconoce a tu cliente y confirma lo que pidió en menos de un
            segundo: cobrar, dar acceso o hacer check-in — con menos fricción
            para tu operación.
          </motion.p>

          <motion.div
            variants={reduce ? undefined : fadeUp}
            className="mt-10 flex flex-wrap items-center gap-3 md:mt-12"
          >
            <a href="#interes" className="btn-primary px-8 py-3.5 text-sm md:px-9 md:py-4">
              Agenda una demo
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a href="#casos" className="btn-ghost px-7 py-3.5 text-sm md:px-8 md:py-4">
              Ver casos de uso
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-20 w-full self-center md:-mb-10 lg:-mb-14"
          variants={reduce ? undefined : scaleIn}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <div className="relative aspect-[4/3] w-full min-h-[280px] sm:min-h-[340px] md:aspect-[5/4] md:min-h-[420px] lg:min-h-[480px] xl:min-h-[520px]">
            <div
              className="pointer-events-none absolute -inset-12 hero-media-glow md:-inset-16"
              aria-hidden
            />
            <div className="hero-video-stage relative h-full w-full overflow-hidden rounded-[1.25rem] md:rounded-[1.75rem]">
              <div className="hero-video-media absolute inset-0 rounded-[1.25rem] md:rounded-[1.75rem]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/veyra-checkout-palm.png"
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                {!reduce ? (
                  <video
                    ref={videoRef}
                    className="absolute inset-0 h-full w-full scale-105 object-cover object-center hero-video-ken"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    poster="/brand/veyra-checkout-palm.png"
                    aria-label="Terminal Veyra en acción"
                  >
                    <source src="/brand/veyra-hero-loop.mp4" type="video/mp4" />
                  </video>
                ) : null}
              </div>
              <div
                className="pointer-events-none absolute inset-0 hero-video-wash rounded-[1.25rem] md:rounded-[1.75rem]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-[1.25rem] ring-1 ring-white/10 md:rounded-[1.75rem]"
                aria-hidden
              />
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 mt-auto border-t border-white/5 bg-[#0e0e0e]/80 backdrop-blur-[2px]">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.45'/%3E%3C/svg%3E\")",
          }}
        />
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
              href="#casos"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white text-cta-foreground transition hover:scale-105 hover:bg-accent-glow"
              aria-label="Ver casos de uso"
            >
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
