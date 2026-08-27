"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Mode = "face" | "palm";

const FLOWS: Record<
  Mode,
  {
    label: string;
    scanning: { src: string; title: string; body: string };
    success: { src: string; title: string; body: string };
  }
> = {
  face: {
    label: "Face ID",
    scanning: {
      src: "/brand/process/veyra-verify-face-scanning.jpg",
      title: "Verifica tu identidad",
      body: "El teléfono captura Face ID en el Secure Enclave. Veyra solo recibe evidencia criptográfica — nunca la biometría facial.",
    },
    success: {
      src: "/brand/process/veyra-verify-face-success.jpg",
      title: "Identidad verificada",
      body: "Perfil activo: Veyra ID, dispositivo confiable y método de pago listo para firmar el challenge.",
    },
  },
  palm: {
    label: "Palma",
    scanning: {
      src: "/brand/process/veyra-verify-palm-scanning.jpg",
      title: "Registra tu palma",
      body: "Enrollment en el lector NIR. Tres capturas, template cifrado en el vault — separado de tu PII y de tus tarjetas.",
    },
    success: {
      src: "/brand/process/veyra-verify-palm-success.jpg",
      title: "Palma verificada",
      body: "Veyra ID ACTIVO. La misma identidad sirve para pagar, acceder y gestionar dispositivos.",
    },
  },
};

const PHASE_MS = 2600;

export function VerificationFlow() {
  const [mode, setMode] = useState<Mode>("face");
  const [phase, setPhase] = useState<"scanning" | "success">("scanning");
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setPhase((p) => (p === "scanning" ? "success" : "scanning"));
    }, PHASE_MS);
    return () => window.clearInterval(id);
  }, [paused, mode]);

  const flow = FLOWS[mode];
  const frame = flow[phase];

  return (
    <section
      id="validacion"
      className="border-t border-border bg-surface/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
            Validación
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Face ID y palma, mismo lenguaje de confianza.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Flujos de verificación estilo app premium: escaneo → confirmación →
            perfil. La palma identifica en el comercio; Face ID autoriza en el
            teléfono.
          </p>
        </motion.div>

        <div className="mt-10 flex gap-2 rounded-full bg-surface p-1 w-fit">
          {(["face", "palm"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setMode(m);
                setPhase("scanning");
              }}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                mode === m
                  ? "bg-accent text-accent-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {FLOWS[m].label}
            </button>
          ))}
        </div>

        <div
          className="mt-12 grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Phone frame */}
          <div className="relative mx-auto w-full max-w-[280px]">
            <div className="relative aspect-[9/19] overflow-hidden rounded-[2.4rem] border border-white/12 bg-ink shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]">
              <div className="absolute inset-x-[22%] top-2.5 z-20 h-5 rounded-full bg-black/80" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${mode}-${phase}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={frame.src}
                    alt={frame.title}
                    fill
                    quality={90}
                    className="object-cover object-top"
                    sizes="280px"
                  />
                </motion.div>
              </AnimatePresence>

              {phase === "scanning" ? (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-[18%] top-[28%] aspect-square"
                  animate={{ opacity: [0.4, 0.85, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span className="absolute inset-0 rounded-full border border-accent/50" />
                  <motion.span
                    className="absolute inset-[-6%] rounded-full border border-accent/25"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    style={{
                      borderStyle: "dashed",
                    }}
                  />
                </motion.div>
              ) : null}
            </div>

            <div className="mt-5 flex justify-center gap-2">
              <button
                type="button"
                onClick={() => setPhase("scanning")}
                className={`h-1.5 w-8 rounded-full transition ${
                  phase === "scanning" ? "bg-accent" : "bg-white/15"
                }`}
                aria-label="Escaneando"
              />
              <button
                type="button"
                onClick={() => setPhase("success")}
                className={`h-1.5 w-8 rounded-full transition ${
                  phase === "success" ? "bg-accent" : "bg-white/15"
                }`}
                aria-label="Verificado"
              />
            </div>
          </div>

          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${mode}-${phase}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-mono text-xs tracking-[0.22em] text-accent">
                  {phase === "scanning" ? "ESCANEO" : "CONFIRMACIÓN"}
                </p>
                <h3 className="mt-3 font-display text-2xl font-semibold text-foreground md:text-3xl">
                  {frame.title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted md:text-base">
                  {frame.body}
                </p>
              </motion.div>
            </AnimatePresence>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {(
                [
                  ["face", "Face ID en dispositivo"],
                  ["palm", "Palma en terminal"],
                ] as const
              ).map(([m, label]) => (
                <li key={m}>
                  <button
                    type="button"
                    onClick={() => {
                      setMode(m);
                      setPhase("scanning");
                    }}
                    className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                      mode === m
                        ? "border-accent/40 bg-accent-soft"
                        : "border-border bg-surface-elevated/50 hover:border-white/15"
                    }`}
                  >
                    <p className="font-display text-sm font-semibold text-foreground">
                      {label}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {m === "face"
                        ? "Autoriza el pago firmado"
                        : "Identifica sin tarjeta"}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Dual preview strip */}
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(
            [
              FLOWS.face.scanning,
              FLOWS.face.success,
              FLOWS.palm.scanning,
              FLOWS.palm.success,
            ] as const
          ).map((item, i) => (
            <motion.button
              key={item.src}
              type="button"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => {
                const nextMode: Mode = i < 2 ? "face" : "palm";
                setMode(nextMode);
                setPhase(i % 2 === 0 ? "scanning" : "success");
              }}
              className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-border bg-surface text-left"
            >
              <Image
                src={item.src}
                alt={item.title}
                fill
                className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 50vw, 25vw"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-3 pb-3 pt-10 text-xs font-medium text-platinum">
                {item.title}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
