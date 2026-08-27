"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const frames = [
  {
    src: "/brand/veyra-palm-scan.jpg",
    alt: "Escaneo de palma contactless en terminal Veyra",
    caption: "Acerca la mano. Listo.",
    span: "md:col-span-7",
  },
  {
    src: "/brand/veyra-terminal.jpg",
    alt: "Terminal de pago biométrico Veyra",
    caption: "Terminal de checkout",
    span: "md:col-span-5",
  },
  {
    src: "/brand/veyra-access-gate.jpg",
    alt: "Acceso biométrico con Veyra Access",
    caption: "La misma identidad abre acceso",
    span: "md:col-span-12",
  },
];

export function Vision() {
  return (
    <section id="vision" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
            Visión
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Presencia real. Fricción cero.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Del mostrador al lobby: identifica, autoriza en el teléfono y
            completa el pago — o abre la puerta — con la misma identidad Veyra.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-12 md:gap-5">
          {frames.map((frame, i) => (
            <motion.figure
              key={frame.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-surface ${frame.span} ${
                frame.span.includes("12") ? "aspect-[21/9]" : "aspect-[4/3]"
              }`}
            >
              <Image
                src={frame.src}
                alt={frame.alt}
                fill
                quality={88}
                className="object-cover transition duration-700 group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 70vw"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent px-5 pb-4 pt-16 text-sm font-medium text-platinum">
                {frame.caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
