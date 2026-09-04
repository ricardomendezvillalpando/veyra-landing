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
  listening: 162,
  speaking: 155,
  sensing: 170,
  thinking: 175,
  complete: 145,
};

const STATE_ENERGY: Record<AuraState, number> = {
  connecting: 0.35,
  listening: 0.55,
  speaking: 1,
  sensing: 0.85,
  thinking: 0.4,
  complete: 0.25,
};

/**
 * LiveKit Aura–inspired undulating energy field.
 * Canvas-based; Veyra brand greens by default.
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
      const radius = size * 0.28;

      const glow = ctx.createRadialGradient(
        cx,
        cy,
        radius * 0.2,
        cx,
        cy,
        size * 0.48,
      );
      glow.addColorStop(0, `hsla(${baseHue}, 70%, 55%, ${0.18 + energy * 0.12})`);
      glow.addColorStop(0.55, `hsla(${baseHue}, 65%, 40%, 0.08)`);
      glow.addColorStop(1, "hsla(160, 40%, 20%, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, size, size);

      const layers = 5;
      for (let layer = 0; layer < layers; layer++) {
        const phase = t * (0.7 + layer * 0.15) + layer * 0.9;
        const amp = (6 + layer * 3.5) * (0.45 + energy * 0.7);
        const ringR = radius + layer * (size * 0.028);
        const alpha = 0.55 - layer * 0.08;
        const light = 62 - layer * 4;
        const shift = layer * 4;

        ctx.beginPath();
        const steps = 96;
        for (let i = 0; i <= steps; i++) {
          const a = (i / steps) * Math.PI * 2;
          const wobble =
            Math.sin(a * 3 + phase) * amp +
            Math.sin(a * 5 - phase * 1.3) * amp * 0.35 +
            Math.cos(a * 2 + phase * 0.7) * amp * 0.25;
          const r = ringR + wobble;
          const x = cx + Math.cos(a) * r;
          const y = cy + Math.sin(a) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = `hsla(${baseHue + shift}, 72%, ${light}%, ${alpha})`;
        ctx.lineWidth = 1.6 + (layers - layer) * 0.35 * energy;
        ctx.shadowColor = `hsla(${baseHue}, 80%, 55%, 0.45)`;
        ctx.shadowBlur = 12 + energy * 10;
        ctx.stroke();
      }

      const core = ctx.createRadialGradient(
        cx - radius * 0.15,
        cy - radius * 0.2,
        0,
        cx,
        cy,
        radius * 0.85,
      );
      core.addColorStop(0, `hsla(${baseHue}, 40%, 92%, 0.95)`);
      core.addColorStop(0.35, `hsla(${baseHue}, 65%, 55%, 0.85)`);
      core.addColorStop(0.75, `hsla(${baseHue}, 70%, 28%, 0.9)`);
      core.addColorStop(1, "hsla(200, 20%, 6%, 0.95)");
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 0.72, 0, Math.PI * 2);
      ctx.fillStyle = core;
      ctx.fill();

      ctx.beginPath();
      ctx.ellipse(
        cx - radius * 0.18,
        cy - radius * 0.22,
        radius * 0.28,
        radius * 0.16,
        -0.5,
        0,
        Math.PI * 2,
      );
      ctx.fillStyle = "rgba(255,255,255,0.28)";
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
