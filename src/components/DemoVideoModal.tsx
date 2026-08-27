"use client";

import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

const DEMO_VIDEO_SRC =
  process.env.NEXT_PUBLIC_VEYRA_DEMO_VIDEO ?? "/brand/veyra-demo.mp4";

type DemoVideoModalProps = {
  open: boolean;
  onClose: () => void;
};

export function DemoVideoModal({ open, onClose }: DemoVideoModalProps) {
  const titleId = useId();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!open) {
      videoRef.current?.pause();
      return;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    void videoRef.current?.play().catch(() => {
      /* autoplay may be blocked; controls remain */
    });

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        className="absolute inset-0 bg-ink/80 backdrop-blur-md"
        aria-label="Cerrar video"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-white/10 bg-ink shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 sm:px-5">
          <p
            id={titleId}
            className="font-display text-sm font-semibold tracking-wide text-foreground"
          >
            Veyra en acción
          </p>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-muted transition hover:border-accent/40 hover:text-accent"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="relative aspect-video bg-black">
          <video
            ref={videoRef}
            className="h-full w-full object-contain"
            controls
            playsInline
            preload="metadata"
            poster="/brand/veyra-hero-presence.jpg"
          >
            <source src={DEMO_VIDEO_SRC} type="video/mp4" />
            Tu navegador no soporta video HTML5.
          </video>
        </div>
      </div>
    </div>
  );
}
