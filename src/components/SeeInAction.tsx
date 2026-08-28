"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

export function SeeInAction() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  function play() {
    const v = videoRef.current;
    if (!v) return;
    void v.play();
    setPlaying(true);
  }

  return (
    <section id="accion" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-5 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Ve Veyra en acción.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            Mira cómo el pago con presencia hace el checkout más rápido y limpio
            — y cómo eso se traduce en más ventas para tu negocio.
          </p>
          <a href="#interes" className="btn-primary mt-8 rounded-full px-8 py-3.5 text-sm">
            Quiero una demo
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.08 }}
          className="relative mx-auto mt-12 overflow-hidden rounded-[1.5rem] bg-mist shadow-xl ring-1 ring-border"
        >
          <video
            ref={videoRef}
            className="aspect-video w-full object-cover"
            playsInline
            controls={playing}
            preload="metadata"
            poster="/brand/veyra-checkout-palm.png"
            muted={reduce}
            onPlay={() => setPlaying(true)}
          >
            <source src="/brand/veyra-demo.mp4" type="video/mp4" />
          </video>

          {!playing ? (
            <button
              type="button"
              onClick={play}
              className="absolute inset-0 flex items-center justify-center bg-ink/25 transition hover:bg-ink/35"
              aria-label="Reproducir video"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface text-accent shadow-lg">
                <Play className="h-6 w-6 fill-current" />
              </span>
            </button>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}
