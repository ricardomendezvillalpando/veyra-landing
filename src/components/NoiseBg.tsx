"use client";

/**
 * Grain field inspired by AI Canvas noise-bg (MIT).
 * Quiet at rest; clear but contained network on hover.
 */
import { useEffect, useRef, type RefObject } from "react";
import { useReducedMotion } from "framer-motion";

/* Soft-dark hero: faint grain at rest, soft green links on hover */
const DENSITY = 1 / 160;
const MAX_DOTS = 1800;
const RADIUS = 150;
const NEIGHBOUR_D = 30;
const BASE_A = 0.055;
const PEAK_A = 0.42;
const LINE_A = 0.11;
const DOT_RGB = "242, 242, 242";
const LINE_RGB = "34, 197, 94";

type Dot = { x: number; y: number; b: number };
type Pair = [Dot, Dot];
type Pointer = { x: number; y: number };

type NoiseBgProps = {
  className?: string;
  pointerRef: RefObject<Pointer | null>;
};

export function NoiseBg({ className = "", pointerRef }: NoiseBgProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let dots: Dot[] = [];
    let pairs: Pair[] = [];
    let animId = 0;
    let alive = true;
    let cw = 0;
    let ch = 0;

    function build() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas!.getBoundingClientRect();
      cw = rect.width;
      ch = rect.height;
      if (!cw || !ch) return;

      canvas!.width = Math.round(cw * dpr);
      canvas!.height = Math.round(ch * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(Math.round(cw * ch * DENSITY), MAX_DOTS);
      dots = Array.from({ length: count }, () => ({
        x: Math.random() * cw,
        y: Math.random() * ch,
        b: 0,
      }));

      const nd2 = NEIGHBOUR_D * NEIGHBOUR_D;
      pairs = [];
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          if (dx * dx + dy * dy < nd2) pairs.push([dots[i], dots[j]]);
        }
      }
    }

    function frame() {
      if (!alive) return;
      ctx!.clearRect(0, 0, cw, ch);

      const mouse = pointerRef.current;
      const mx = mouse?.x ?? -99999;
      const my = mouse?.y ?? -99999;
      const r2 = RADIUS * RADIUS;
      const hoverOn = !reduce && mouse != null;

      for (const d of dots) {
        let tgt = 0;
        if (hoverOn) {
          const dx = d.x - mx;
          const dy = d.y - my;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < r2) {
            tgt = Math.exp(-dist2 / (RADIUS * RADIUS * 0.32));
          }
        }

        d.b += (tgt > d.b ? 0.28 : 0.12) * (tgt - d.b);
        if (d.b < 0.004) d.b = 0;

        const alpha = BASE_A + (PEAK_A - BASE_A) * d.b;
        const sz = 1 + d.b * 1.6;
        ctx!.fillStyle = `rgba(${DOT_RGB},${alpha.toFixed(2)})`;
        ctx!.fillRect(d.x - sz / 2, d.y - sz / 2, sz, sz);
      }

      if (hoverOn) {
        for (const [a, b] of pairs) {
          if (a.b < 0.04 || b.b < 0.04) continue;
          const lineAlpha = Math.min(a.b, b.b) * LINE_A;
          if (lineAlpha < 0.012) continue;
          ctx!.strokeStyle = `rgba(${LINE_RGB},${lineAlpha.toFixed(3)})`;
          ctx!.lineWidth = 0.65;
          ctx!.beginPath();
          ctx!.moveTo(a.x, a.y);
          ctx!.lineTo(b.x, b.y);
          ctx!.stroke();
        }
      }

      animId = requestAnimationFrame(frame);
    }

    build();
    frame();

    const ro = new ResizeObserver(build);
    ro.observe(wrap);

    return () => {
      alive = false;
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [pointerRef, reduce]);

  return (
    <div
      ref={wrapRef}
      className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  );
}
