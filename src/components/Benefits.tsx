"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Hand, Lock, Shield, Zap } from "lucide-react";

function useMotionReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  return ready;
}

const cards = [
  {
    title: "Lightning fast",
    body: "Checkout en menos de un segundo — más rápido que tarjeta o teléfono. Más tickets por hora en tu mostrador.",
    image: "/brand/veyra-checkout-palm.png",
    span: "md:col-span-1",
  },
  {
    title: "Lealtad sin fricción",
    body: "Puntos y membresías con la misma presencia. Sin QR, sin app extra, sin tarjeta que se pierde.",
    image: "/brand/veyra-palm-scan.jpg",
    span: "md:col-span-1",
  },
];

const compact = [
  {
    icon: Shield,
    title: "Seguro y privado",
    body: "Biometría cifrada. Nunca vendemos datos de tus clientes.",
    tone: "bg-pastel-mint",
  },
  {
    icon: Zap,
    title: "Más conversión",
    body: "Menos abandono en caja. Una experiencia que invita a volver.",
    tone: "bg-mist",
  },
  {
    icon: Hand,
    title: "Contactless",
    body: "Sin superficies compartidas. Solo presencia — limpio y premium.",
    tone: "bg-mist",
  },
];

export function Benefits() {
  const motionReady = useMotionReady();

  return (
    <section id="proceso" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map((c, i) => (
            <motion.article
              key={c.title}
              initial={motionReady ? { opacity: 0, y: 18 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`overflow-hidden rounded-[1.5rem] bg-mist ring-1 ring-border ${c.span}`}
            >
              <div className="relative aspect-[16/11]">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 480px"
                />
              </div>
              <div className="p-6 md:p-7">
                <h3 className="font-display text-xl font-bold text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-[1.2fr_0.9fr_0.9fr]">
          {compact.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.article
                key={c.title}
                initial={motionReady ? { opacity: 0, y: 16 } : false}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.08 + i * 0.05 }}
                className={`rounded-[1.5rem] p-6 md:p-7 ${c.tone} ${i === 0 ? "md:min-h-[220px]" : ""}`}
              >
                {i === 0 ? (
                  <div className="mb-8 flex gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-accent shadow-sm">
                      <Lock className="h-4 w-4" />
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-accent shadow-sm">
                      <Shield className="h-4 w-4" />
                    </span>
                  </div>
                ) : (
                  <Icon className="mb-5 h-5 w-5 text-accent" strokeWidth={1.75} />
                )}
                <h3 className="font-display text-lg font-bold text-foreground">
                  {c.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
