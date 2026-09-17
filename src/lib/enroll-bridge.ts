/**
 * Persist enroll session for deferred install + try native app open.
 * Universal/App Links handle the happy path when the app is already installed;
 * this bridge covers custom-scheme fallback and store CTAs.
 */

export const PENDING_ENROLL_KEY = "veyra_pending_enroll";

export const STORE_URLS = {
  play:
    process.env.NEXT_PUBLIC_VEYRA_PLAY_STORE_URL ||
    "https://play.google.com/store/search?q=Veyra&c=apps",
  appStore:
    process.env.NEXT_PUBLIC_VEYRA_APP_STORE_URL ||
    "https://apps.apple.com/search?term=Veyra",
} as const;

export function persistPendingEnroll(sessionId: string): void {
  try {
    localStorage.setItem(PENDING_ENROLL_KEY, sessionId);
  } catch {
    /* private mode */
  }
  try {
    document.cookie = `${PENDING_ENROLL_KEY}=${encodeURIComponent(sessionId)}; path=/; max-age=${7 * 86400}; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function readPendingEnroll(): string | null {
  try {
    const fromLs = localStorage.getItem(PENDING_ENROLL_KEY);
    if (fromLs) return fromLs;
  } catch {
    /* ignore */
  }
  try {
    const match = document.cookie.match(
      new RegExp(`(?:^|; )${PENDING_ENROLL_KEY}=([^;]*)`),
    );
    if (match?.[1]) return decodeURIComponent(match[1]);
  } catch {
    /* ignore */
  }
  return null;
}

export function isMobileUa(ua = ""): { android: boolean; ios: boolean } {
  return {
    android: /Android/i.test(ua),
    ios: /iPhone|iPad|iPod/i.test(ua),
  };
}

/** Custom-scheme / Android Intent open. Returns true if an open was attempted. */
export function tryOpenNativeApp(sessionId: string): boolean {
  if (typeof window === "undefined") return false;
  const { android, ios } = isMobileUa(navigator.userAgent || "");
  if (!android && !ios) return false;

  const custom = `veyra://enroll?session=${encodeURIComponent(sessionId)}`;

  if (android) {
    const fallback = `${window.location.origin}/e/${encodeURIComponent(sessionId)}?web=1`;
    const intent = `intent://enroll?session=${encodeURIComponent(sessionId)}#Intent;scheme=veyra;package=com.veyraconsumer;S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
    window.location.href = intent;
    return true;
  }

  // iOS: custom scheme after Universal Link already failed (we're in Safari)
  window.location.href = custom;
  return true;
}
