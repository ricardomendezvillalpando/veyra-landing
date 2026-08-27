"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CARDS = [
  {
    id: "ready",
    src: "/brand/process/veyra-process-ready.jpg",
    step: "01",
    title: "Monto listo",
    caption: "Terminal preparada",
  },
  {
    id: "hover",
    src: "/brand/process/veyra-process-hover.jpg",
    step: "02",
    title: "Acerca la mano",
    caption: "Identidad contactless",
  },
  {
    id: "palm",
    src: "/brand/process/veyra-verify-palm-scanning.jpg",
    step: "03",
    title: "Valida palma",
    caption: "Veyra ID",
  },
  {
    id: "face",
    src: "/brand/process/veyra-verify-face-scanning.jpg",
    step: "04",
    title: "Face ID",
    caption: "Firma en dispositivo",
  },
  {
    id: "ok",
    src: "/brand/process/veyra-process-approved.jpg",
    step: "05",
    title: "Aprobado",
    caption: "Pago tokenizado",
  },
];

export function ProcessAnimation() {
  const scroller = useRef<HTMLDivElement>(null);

  function scrollBy(dir: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(340, el.clientWidth * 0.75), behavior: "smooth" });
  }

  return (
    <section id="proceso" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
              El proceso
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              De la palma al aprobado — en cinco pantallas.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Un recorrido visual del core loop. Desliza para ver cada etapa
              del checkout biométrico Veyra.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Anterior"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-elevated text-foreground transition hover:border-accent/40 hover:text-accent"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Siguiente"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-elevated text-foreground transition hover:border-accent/40 hover:text-accent"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>

      <div
        ref={scroller}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 scrollbar-none md:gap-6 md:px-[max(1.25rem,calc((100vw-72rem)/2+2rem))]"
        style={{ scrollbarWidth: "none" }}
      >
        {CARDS.map((card, i) => (
          <motion.article
            key={card.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="relative w-[min(78vw,280px)] shrink-0 snap-center md:w-[300px]"
          >
            <div className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface-elevated shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]">
              {/* Floating badge */}
              <div className="absolute left-4 top-4 z-20 flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-ink/90 shadow-lg backdrop-blur">
                <span className="font-mono text-[10px] tracking-widest text-accent">
                  {card.step}
                </span>
              </div>

              <div className="relative aspect-[9/16] w-full">
                <Image
                  src={card.src}
                  alt={card.title}
                  fill
                  quality={88}
                  className="object-cover object-top"
                  sizes="300px"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/70 to-transparent px-5 pb-5 pt-20">
                  <p className="font-display text-lg font-semibold text-foreground">
                    {card.title}
                  </p>
                  <p className="mt-1 text-xs text-muted">{card.caption}</p>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
        <div className="w-2 shrink-0" aria-hidden />
      </div>
    </section>
  );
}
