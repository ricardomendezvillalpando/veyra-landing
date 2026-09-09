"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Play } from "lucide-react";

/**
 * Cinematic demo reel — full-bleed soft-dark stage.
 */
export function SeeInAction() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const v = videoRef.current;
    if (!v) return;
    // Soft autoplay muted for ambient presence; user can unmute via controls after play
    v.muted = true;
    void v.play().then(() => setPlaying(true)).catch(() => {
      /* autoplay blocked — keep poster + play affordance */
    });
  }, [reduce]);

  function play() {
    const v = videoRef.current;
    if (!v) return;
    void v.play();
    setPlaying(true);
  }

  return (
    <section
      id="accion"
      className="relative overflow-hidden border-t border-border bg-background py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(34,197,94,0.1) 0%, transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
            En acción
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Así se ve el flujo en el terminal.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Acercas la palma, Veyra te reconoce y confirma el pago o el acceso —
            sin pasos de más.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.85, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-12 max-w-5xl"
        >
          {/* Glow stage behind the frame */}
          <div
            className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-70 blur-2xl md:-inset-10"
            aria-hidden
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(34,197,94,0.22) 0%, rgba(26,107,92,0.08) 40%, transparent 70%)",
            }}
          />

          <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10 bg-surface shadow-[0_40px_100px_-40px_rgba(0,0,0,0.85)] ring-1 ring-accent-glow/15 md:rounded-[1.5rem]">
            <div className="relative aspect-[16/10] w-full bg-ink md:aspect-video">
              <video
                ref={videoRef}
                className="absolute inset-0 h-full w-full object-cover"
                playsInline
                loop
                muted
                controls={playing}
                preload="metadata"
                poster="/brand/veyra-studio-demo-poster.jpg"
                onPlay={() => setPlaying(true)}
              >
                <source src="/brand/veyra-studio-demo.mp4" type="video/mp4" />
              </video>

              {/* Cinematic letterbox wash when idle */}
              {!playing ? (
                <button
                  type="button"
                  onClick={play}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-background/80 via-background/25 to-transparent transition"
                  aria-label="Reproducir video"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent-glow text-cta-foreground shadow-[0_0_40px_-4px_rgba(34,197,94,0.75)] transition hover:scale-105 md:h-20 md:w-20">
                    <Play className="h-6 w-6 fill-current md:h-7 md:w-7" />
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
