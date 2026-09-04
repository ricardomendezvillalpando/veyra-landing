"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { AgentAura } from "@/components/AgentOrb";
import { NoiseBg } from "@/components/NoiseBg";

type Pointer = { x: number; y: number };

const STATES = [
  {
    id: "speaking",
    label: "Te habla",
    line: "Son ochocientos cincuenta pesos. Acerca tu palma para pagar.",
    orb: "speaking" as const,
  },
  {
    id: "sensing",
    label: "Lee tu palma",
    line: "Mantén la mano un segundo… casi listo.",
    orb: "sensing" as const,
  },
  {
    id: "thinking",
    label: "Te reconoce",
    line: "Ya eres tú. Confirmando el pago…",
    orb: "thinking" as const,
  },
  {
    id: "complete",
    label: "Listo",
    line: "¡Pago aprobado! Gracias.",
    orb: "complete" as const,
  },
];

export function Hero() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [listening, setListening] = useState(false);
  const pointerRef = useRef<Pointer | null>(null);

  useEffect(() => {
    if (reduce || listening) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % STATES.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, [reduce, listening]);

  const current = STATES[step];
  const sensing = current.id === "sensing";

  function speakLine() {
    if (typeof window === "undefined" || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(current.line);
    utter.lang = "es-MX";
    utter.rate = 0.95;
    setListening(true);
    utter.onend = () => setListening(false);
    utter.onerror = () => setListening(false);
    window.speechSynthesis.speak(utter);
  }

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-background pb-16 pt-28 md:pb-20 md:pt-32"
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
            radial-gradient(ellipse 90% 70% at 80% 100%, rgba(26, 107, 92, 0.28) 0%, transparent 55%),
            radial-gradient(ellipse 50% 45% at 10% 90%, rgba(45, 212, 191, 0.16) 0%, transparent 50%),
            linear-gradient(180deg, transparent 0%, rgba(232, 245, 241, 0.35) 55%, rgba(26, 107, 92, 0.1) 100%)
          `,
        }}
      />
      <NoiseBg pointerRef={pointerRef} />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-10 px-5 md:px-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase"
          >
            Paga y entra con tu palma
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.04 }}
            className="mt-4 max-w-[15ch] font-display text-[2.4rem] font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-[3.1rem]"
          >
            Tu mano es la nueva forma de pagar.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-5 max-w-md text-base leading-relaxed text-muted md:text-lg"
          >
            Sin tarjeta. Sin teléfono en la caja. Acercas la palma y listo:
            cobras más rápido, tus clientes se van feliz… y vuelven.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.14 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#interes"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-b from-[#2a8f7a] to-[#1a6b5c] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(26,107,92,0.65)] transition hover:brightness-105"
            >
              Quiero Veyra en mi negocio
              <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#casos"
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-foreground shadow-[0_6px_20px_-6px_rgba(15,23,42,0.18)] ring-1 ring-black/5 transition hover:bg-mist"
            >
              Ver cómo se usa
            </a>
          </motion.div>

          <p className="mt-8 text-sm text-muted">
            Ideal para cafés, retail, gyms, hoteles y cualquier lugar con filas.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="relative w-full"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-surface p-3 shadow-[0_28px_70px_-36px_rgba(15,23,42,0.4)] sm:p-4">
            <div className="mb-3 flex items-center justify-between gap-3 px-1 sm:mb-4 sm:px-2">
              <span className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                Así se siente
              </span>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-wide text-muted">
                  {current.label}
                </span>
                <button
                  type="button"
                  onClick={speakLine}
                  className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent-soft px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-accent uppercase transition hover:border-accent/40 hover:bg-accent/15"
                >
                  {listening ? (
                    <span className="flex h-3.5 w-3.5 items-center justify-center gap-[2px]">
                      <span className="h-2.5 w-[2px] animate-pulse rounded-full bg-accent" />
                      <span className="h-2 w-[2px] animate-pulse rounded-full bg-accent [animation-delay:120ms]" />
                      <span className="h-3 w-[2px] animate-pulse rounded-full bg-accent [animation-delay:240ms]" />
                    </span>
                  ) : (
                    <span
                      className="ml-0.5 h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-accent"
                      aria-hidden
                    />
                  )}
                  {listening ? "Hablando…" : "Escuchar"}
                </button>
              </div>
            </div>

            <div className="relative aspect-[16/11] overflow-hidden bg-ink sm:aspect-[16/10]">
              <video
                className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${
                  sensing ? "scale-[1.04] opacity-80" : "opacity-55"
                }`}
                autoPlay={!reduce}
                muted
                loop
                playsInline
                poster="/brand/veyra-checkout-palm.png"
                aria-hidden
              >
                <source src="/brand/veyra-hero-loop.mp4" type="video/mp4" />
              </video>

              <div
                className="absolute inset-0 bg-gradient-to-b from-ink/75 via-ink/45 to-ink/90"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0"
                aria-hidden
                style={{
                  backgroundImage: sensing
                    ? "radial-gradient(circle at 50% 38%, rgba(34,197,94,0.4), transparent 50%)"
                    : "radial-gradient(circle at 50% 38%, rgba(26,107,92,0.3), transparent 55%)",
                }}
              />

              <div className="relative z-10 flex h-full flex-col items-center justify-center gap-5 px-5 py-7 text-center sm:gap-6 sm:px-8 sm:py-8">
                <div className="flex flex-col items-center">
                  <AgentAura state={current.orb} size={132} hue={162} />
                  <p className="mt-2 min-h-[2.75rem] max-w-md text-sm leading-relaxed text-white/95 drop-shadow-md sm:text-[0.95rem]">
                    “{current.line}”
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`relative flex h-12 w-12 items-center justify-center rounded-2xl border backdrop-blur-md transition duration-500 ${
                      sensing
                        ? "border-accent-glow/80 bg-accent/30 shadow-[0_0_36px_rgba(34,197,94,0.45)]"
                        : "border-white/25 bg-white/10"
                    }`}
                  >
                    <svg
                      viewBox="0 0 48 48"
                      className="h-6 w-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden
                    >
                      <path d="M18 22v-6a4 4 0 118 0v6" />
                      <path d="M14 24v-3a3 3 0 016 0v3" />
                      <path d="M28 24v-3a3 3 0 016 0v5c0 7-4.5 12-10 12s-10-5-10-12v-2" />
                      <path d="M20 36c2 1.5 4 2 4 2s2-.5 4-2" />
                    </svg>
                    {sensing ? (
                      <span className="absolute inset-0 animate-ping rounded-2xl border border-accent-glow/40" />
                    ) : null}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">
                      Acerca tu palma
                    </p>
                    {current.id === "complete" ? (
                      <p className="font-display text-lg font-semibold text-accent-glow">
                        $850.00 · Aprobado
                      </p>
                    ) : (
                      <p className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                        $850.00{" "}
                        <span className="text-sm font-medium text-white/50">
                          MXN
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap justify-between gap-x-3 gap-y-1 px-1">
              {STATES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStep(i)}
                  className={`font-mono text-[10px] tracking-[0.1em] uppercase transition ${
                    i === step
                      ? "text-accent"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
