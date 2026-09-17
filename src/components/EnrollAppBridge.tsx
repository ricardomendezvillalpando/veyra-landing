"use client";

import { useEffect, useRef, useState } from "react";
import {
  STORE_URLS,
  isMobileUa,
  persistPendingEnroll,
  tryOpenNativeApp,
} from "@/lib/enroll-bridge";

type Props = {
  sessionId: string;
  /** Skip auto-open (e.g. ?web=1 or magic-link flow) */
  stayOnWeb?: boolean;
  forceOpen?: boolean;
};

/**
 * On mobile: persist sessionId, briefly try to open the native app,
 * then show App Store / Play CTAs if still in the browser.
 */
export function EnrollAppBridge({
  sessionId,
  stayOnWeb = false,
  forceOpen = false,
}: Props) {
  const [showStores, setShowStores] = useState(false);
  const attempted = useRef(false);

  useEffect(() => {
    persistPendingEnroll(sessionId);
  }, [sessionId]);

  useEffect(() => {
    if (attempted.current) return;
    const { android, ios } = isMobileUa(
      typeof navigator !== "undefined" ? navigator.userAgent : "",
    );
    if (!android && !ios) return;
    if (stayOnWeb && !forceOpen) {
      setShowStores(true);
      return;
    }

    attempted.current = true;
    const opened = tryOpenNativeApp(sessionId);
    if (!opened) {
      setShowStores(true);
      return;
    }

    const t = window.setTimeout(() => {
      if (!document.hidden) setShowStores(true);
    }, 1600);

    const onVis = () => {
      if (document.hidden) {
        // App likely took focus — hide store nag
        setShowStores(false);
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [sessionId, stayOnWeb, forceOpen]);

  if (!showStores) return null;

  return (
    <div className="mb-6 rounded-2xl border border-[rgba(34,197,94,0.28)] bg-[rgba(34,197,94,0.08)] p-4">
      <p className="text-sm font-medium text-[#F2F2F2]">
        ¿Tienes la app Veyra?
      </p>
      <p className="mt-1 text-xs leading-relaxed text-[rgba(242,242,242,0.62)]">
        Si ya la instalaste, ábrela con el botón de abajo. Si no, descárgala y
        vuelve a escanear el QR o abre este mismo enlace.
      </p>
      <div className="mt-3 flex flex-col gap-2">
        <a
          href={`veyra://enroll?session=${encodeURIComponent(sessionId)}`}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-[#22C55E] px-4 text-center text-sm font-semibold text-[#0B0B0B]"
        >
          Abrir app Veyra
        </a>
        <div className="grid grid-cols-2 gap-2">
          <a
            href={STORE_URLS.play}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#1C1C1C] px-3 text-center text-xs font-medium text-[rgba(242,242,242,0.85)]"
          >
            Play Store
          </a>
          <a
            href={STORE_URLS.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#1C1C1C] px-3 text-center text-xs font-medium text-[rgba(242,242,242,0.85)]"
          >
            App Store
          </a>
        </div>
        <p className="text-center text-[11px] text-[rgba(242,242,242,0.45)]">
          Hasta publicar en stores: instala el APK/TestFlight interno y abre el
          enlace otra vez.
        </p>
      </div>
    </div>
  );
}
