"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type LogoProps = {
  className?: string;
  height?: number;
  color?: string;
  title?: string;
  /** Show mark only (no wordmark letters) */
  markOnly?: boolean;
  /** Loop A ↔ mark with scan (default true) */
  animate?: boolean;
};

type Phase = "letter" | "toMark" | "mark" | "toLetter";

/**
 * Wordmark: VEYR + slot that loops between letter “A” and the scan mark.
 */
export function Logo({
  className = "",
  height = 22,
  color = "#F2F2F2",
  title = "Veyra",
  markOnly = false,
  animate = true,
}: LogoProps) {
  const reduce = useReducedMotion();
  const play = animate && !reduce;
  const fontSize = height * 0.82;
  // Equal rhythm between every glyph, including R → A/mark
  const letterGap = "0.14em";
  const glyphW = Math.round(fontSize * 0.72);
  const mark = markOnly ? Math.round(fontSize * 0.95) : glyphW;

  const [phase, setPhase] = useState<Phase>(play ? "toMark" : "mark");
  const [scanKey, setScanKey] = useState(0);

  useEffect(() => {
    if (!play) return;

    // Timeline (ms): scan in → hold mark → crossfade to A → hold A → repeat
    const SCAN = 1200;
    const HOLD_MARK = 2200;
    const HOLD_LETTER = 2000;
    const CROSS = 450;

    let cancelled = false;
    const timers: number[] = [];

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(window.setTimeout(resolve, ms));
      });

    async function loop() {
      while (!cancelled) {
        setScanKey((k) => k + 1);
        setPhase("toMark");
        await wait(SCAN);
        if (cancelled) break;
        setPhase("mark");
        await wait(HOLD_MARK);
        if (cancelled) break;
        setPhase("toLetter");
        await wait(CROSS);
        if (cancelled) break;
        setPhase("letter");
        await wait(HOLD_LETTER);
      }
    }

    void loop();
    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, [play]);

  const showMark =
    phase === "toMark" || phase === "mark" || (!play && markOnly);
  const showLetter = phase === "letter" || phase === "toLetter";
  const scanning = phase === "toMark";

  const slotStyle = {
    width: markOnly ? mark : glyphW,
    height: markOnly ? mark : fontSize,
  };

  if (markOnly) {
    return (
      <span
        className={`inline-flex items-center ${className}`}
        style={{ lineHeight: 1 }}
        aria-label={title}
        role="img"
      >
        <MarkSvg
          size={mark}
          color={color}
          scanning={play}
          scanKey={scanKey}
          visible
        />
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center font-display font-bold ${className}`}
      style={{ lineHeight: 1, fontSize, color, gap: letterGap }}
      aria-label={title}
      role="img"
    >
      <span aria-hidden>V</span>
      <span aria-hidden>E</span>
      <span aria-hidden>Y</span>
      <span aria-hidden>R</span>
      <span
        className="veyra-a-slot relative inline-flex shrink-0 items-center justify-center overflow-visible"
        style={slotStyle}
        aria-hidden
      >
        {/* Letter A */}
        <span
          className={`veyra-a-letter absolute inset-0 flex items-center justify-center transition-all duration-[450ms] ease-out ${
            showLetter && phase !== "toMark"
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          A
        </span>

        {/* Scan mark */}
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-[450ms] ease-out ${
            showMark
              ? "opacity-100 scale-100"
              : "opacity-0 scale-90 pointer-events-none"
          }`}
        >
          <MarkSvg
            size={mark}
            color={color}
            scanning={scanning}
            scanKey={scanKey}
            visible={showMark}
          />
        </span>
      </span>
    </span>
  );
}

function MarkSvg({
  size,
  color,
  scanning,
  scanKey,
  visible,
}: {
  size: number;
  color: string;
  scanning: boolean;
  scanKey: number;
  visible: boolean;
}) {
  return (
    <span
      key={scanKey}
      className={`veyra-mark relative inline-flex items-center justify-center ${
        scanning ? "veyra-mark--animate" : visible ? "veyra-mark--idle" : ""
      }`}
      style={{ width: size, height: size }}
    >
      <svg
        className="veyra-mark__svg absolute inset-0 h-full w-full"
        viewBox="4.5 4.5 23 23"
        fill="none"
      >
        <path
          className="veyra-mark__corner veyra-mark__corner--tl"
          d="M11 7.5H8.2c-.94 0-1.7.76-1.7 1.7V12"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="veyra-mark__corner veyra-mark__corner--tr"
          d="M21 7.5h2.8c.94 0 1.7.76 1.7 1.7V12"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="veyra-mark__corner veyra-mark__corner--br"
          d="M21 24.5h2.8c.94 0 1.7-.76 1.7-1.7V20"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          className="veyra-mark__corner veyra-mark__corner--bl"
          d="M11 24.5H8.2c-.94 0-1.7-.76-1.7-1.7V20"
          stroke={color}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          className="veyra-mark__beam"
          x="8"
          y="8"
          width="16"
          height="2.2"
          rx="1.1"
          fill="#22C55E"
          opacity="0"
        />
        <circle
          className="veyra-mark__dot"
          cx="16"
          cy="16"
          r="2"
          fill="#22C55E"
        />
      </svg>
    </span>
  );
}
