"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Acerca tu biometría",
    body: "En el terminal, tu palma (u otro factor biométrico enrolado) te identifica en menos de un segundo.",
  },
  {
    n: "02",
    title: "Recibe la solicitud",
    body: "Veyra resuelve tu identidad y envía el monto y el comercio a tu teléfono de confianza.",
  },
  {
    n: "03",
    title: "Autoriza en el dispositivo",
    body: "Confirmas con Face ID o biometría local. La llave privada nunca sale del Secure Enclave.",
  },
  {
    n: "04",
    title: "Pago aprobado",
    body: "El backend verifica la firma criptográfica y el PSP procesa el cargo. El terminal muestra APROBADO.",
  },
];

export function HowItWorks() {
  return (
    <section id="flujo" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-end gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
              El flujo
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Identidad primero. Pago después.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              La biometría nunca se vincula directo a una tarjeta. Resuelve una
              identidad Veyra; esa identidad posee métodos de pago tokenizados.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
          >
            <Image
              src="/brand/veyra-palm-scan.jpg"
              alt="Mano sobre sensor biométrico Veyra"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </motion.div>
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="relative"
            >
              <span className="font-mono text-xs tracking-widest text-accent/80">
                {step.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
