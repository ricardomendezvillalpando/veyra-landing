"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

export type AuraState =
  | "listening"
  | "speaking"
  | "sensing"
  | "thinking"
  | "complete"
  | "connecting";

type AgentAuraProps = {
  state?: AuraState;
  size?: number;
  className?: string;
  /** Hue in degrees — Veyra teal/green family */
  hue?: number;
};

const STATE_HUE: Record<AuraState, number> = {
  connecting: 168,
  listening: 148,
  speaking: 142,
  sensing: 155,
  thinking: 160,
  complete: 145,
};

const STATE_ENERGY: Record<AuraState, number> = {
  connecting: 0.35,
  listening: 0.55,
  speaking: 1,
  sensing: 0.85,
  thinking: 0.4,
  complete: 0.3,
};

/**
 * Aura-style wispy concentric ring — open portal / single light source.
 * Soft-dark canvas; Veyra signal green by default.
 */
export function AgentAura({
  state = "listening",
  size = 200,
  className = "",
  hue,
}: AgentAuraProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();
  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const raw = canvas.getContext("2d");
    if (!raw) return;
    const el: HTMLCanvasElement = canvas;
    const ctx: CanvasRenderingContext2D = raw;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let raf = 0;
    let running = true;

    el.width = size * dpr;
    el.height = size * dpr;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    function drawFrame(time: number) {
      if (!running) return;
      const s = stateRef.current;
      const baseHue = hue ?? STATE_HUE[s];
      const energy = STATE_ENERGY[s];
      const t = reduce ? 0 : time * 0.001;

      ctx.clearRect(0, 0, size, size);
      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.22;

      // Soft ambient wash — light source in the void
      const wash = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.4,
        cx,
        cy,
        size * 0.52,
      );
      wash.addColorStop(0, `hsla(${baseHue}, 75%, 52%, ${0.22 + energy * 0.18})`);
      wash.addColorStop(0.45, `hsla(${baseHue}, 60%, 35%, 0.1)`);
      wash.addColorStop(1, "hsla(160, 20%, 8%, 0)");
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, size, size);

      // Concentric wispy rings (Aura-like open portal — no solid core)
      const layers = 7;
      for (let layer = 0; layer < layers; layer++) {
        const phase = t * (0.55 + layer * 0.12) + layer * 0.75;
        const amp = (4 + layer * 2.8) * (0.4 + energy * 0.75);
        const ringR = radius + layer * (size * 0.032);
        const alpha = 0.72 - layer * 0.08;
        const light = 68 - layer * 5;
        const shift = layer * 3;

        ctx.beginPath();
        const steps = 120;
        for (let i = 0; i <= steps; i++) {
          const a = (i / steps) * Math.PI * 2;
          const wobble =
            Math.sin(a * 3 + phase) * amp +
            Math.sin(a * 7 - phase * 1.4) * amp * 0.4 +
            Math.cos(a * 2 + phase * 0.65) * amp * 0.28 +
            Math.sin(a * 11 + phase * 0.5) * amp * 0.12;
          const r = ringR + wobble;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `hsla(${baseHue + shift}, 78%, ${light}%, ${alpha})`;
        ctx.lineWidth = 1.1 + (layers - layer) * 0.22 * energy;
        ctx.shadowColor = `hsla(${baseHue}, 90%, 55%, 0.55)`;
        ctx.shadowBlur = 14 + energy * 14;
        ctx.stroke();
      }

      // Sparse energy streaks (smoke / wisps)
      ctx.shadowBlur = 8;
      for (let i = 0; i < 10; i++) {
        const a = t * 0.4 + i * 0.62;
        const r0 = radius * 0.85 + (i % 3) * size * 0.04;
        const r1 = r0 + size * 0.08;
        const x0 = cx + Math.cos(a) * r0;
        const y0 = cy + Math.sin(a) * r0;
        const x1 = cx + Math.cos(a + 0.35 + Math.sin(t + i) * 0.2) * r1;
        const y1 = cy + Math.sin(a + 0.35 + Math.sin(t + i) * 0.2) * r1;
        const grad = ctx.createLinearGradient(x0, y0, x1, y1);
        grad.addColorStop(0, `hsla(${baseHue}, 80%, 70%, 0)`);
        grad.addColorStop(0.5, `hsla(${baseHue}, 85%, 65%, ${0.35 + energy * 0.25})`);
        grad.addColorStop(1, `hsla(${baseHue}, 80%, 70%, 0)`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.stroke();
      }

      // Soft hollow core glow (portal, not a filled orb)
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.9);
      core.addColorStop(0, `hsla(${baseHue}, 70%, 60%, ${0.12 + energy * 0.1})`);
      core.addColorStop(0.55, `hsla(${baseHue}, 60%, 40%, 0.06)`);
      core.addColorStop(1, "hsla(160, 20%, 10%, 0)");
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.9, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();

      if (!reduce) {
        raf = requestAnimationFrame(drawFrame);
      }
    }

    if (reduce) {
      drawFrame(0);
    } else {
      raf = requestAnimationFrame(drawFrame);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
  }, [size, hue, reduce]);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

/** Alias for existing imports */
export function AgentOrb({
  state = "listening",
  size = 120,
  className = "",
}: {
  state?: AuraState;
  size?: number;
  className?: string;
}) {
  return <AgentAura state={state} size={size} className={className} />;
}
