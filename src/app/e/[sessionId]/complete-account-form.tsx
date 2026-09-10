'use client';

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const API_BASE =
  process.env.NEXT_PUBLIC_VEYRA_API_BASE ??
  'https://veyra-api-production-80af.up.railway.app';

const GOOGLE_CLIENT_ID =
  process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID ??
  '819837321693-u9gbridt7em2jf3ej5kbt6mcvuocu206.apps.googleusercontent.com';

type Session = {
  id: string;
  status: string;
  veyraId: string | null;
  credentialId: string | null;
  deepLink: string;
  expiresAt: string;
  merchantId: string;
  deviceId: string;
};

type LinkedAccount = {
  email: string | null;
  fullName: string | null;
};

type Props = { sessionId: string };

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (cfg: {
            client_id: string;
            callback: (res: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: Record<string, unknown>,
          ) => void;
        };
      };
    };
  }
}

function apiErrorMessage(body: unknown, fallback: string): string {
  if (body && typeof body === 'object' && 'message' in body) {
    const m = (body as { message?: unknown }).message;
    if (typeof m === 'string') return m;
    if (Array.isArray(m)) return m.map(String).join(', ');
  }
  return fallback;
}

export function CompleteAccountForm({ sessionId }: Props) {
  const searchParams = useSearchParams();
  const mlToken = searchParams.get('ml');

  const [session, setSession] = useState<Session | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [magicEmail, setMagicEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [linked, setLinked] = useState<LinkedAccount | null>(null);
  const [linkedVia, setLinkedVia] = useState<'google' | 'magic' | 'fallback' | null>(
    null,
  );
  const [formError, setFormError] = useState<string | null>(null);
  const [showFallback, setShowFallback] = useState(false);
  const [magicSent, setMagicSent] = useState(false);
  const [debugMagicUrl, setDebugMagicUrl] = useState<string | null>(null);
  const [gisReady, setGisReady] = useState(false);
  const [mlBusy, setMlBusy] = useState(Boolean(mlToken));

  const googleBtnRef = useRef<HTMLDivElement | null>(null);
  const mlConsumed = useRef(false);

  const linkWithBearer = useCallback(
    async (
      accessToken: string,
      account?: LinkedAccount,
      via: 'google' | 'magic' = 'google',
    ) => {
      const res = await fetch(
        `${API_BASE}/v1/enrollment/sessions/${encodeURIComponent(sessionId)}/link`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: '{}',
        },
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(
          apiErrorMessage(body, 'No se pudo vincular la palma.'),
        );
      }
      if (body?.session) setSession(body.session as Session);
      const consumer = body?.consumer as LinkedAccount | undefined;
      setLinked({
        email: account?.email ?? consumer?.email ?? null,
        fullName: account?.fullName ?? consumer?.fullName ?? null,
      });
      setLinkedVia(via);
      setDone(true);
      try {
        sessionStorage.setItem('veyra_access_token', accessToken);
      } catch {
        /* ignore */
      }
    },
    [sessionId],
  );

  const onGoogleCredential = useCallback(
    async (idToken: string) => {
      setFormError(null);
      setSubmitting(true);
      try {
        const authRes = await fetch(`${API_BASE}/v1/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });
        const authBody = await authRes.json().catch(() => ({}));
        if (!authRes.ok) {
          setFormError(
            apiErrorMessage(authBody, 'No se pudo iniciar sesión con Google.'),
          );
          return;
        }
        const accessToken = authBody?.accessToken as string | undefined;
        if (!accessToken) {
          setFormError('Respuesta de Google sin accessToken.');
          return;
        }
        const consumer = authBody?.consumer as LinkedAccount | undefined;
        await linkWithBearer(accessToken, consumer, 'google');
      } catch (e) {
        setFormError(
          e instanceof Error ? e.message : 'Error de red con Google.',
        );
      } finally {
        setSubmitting(false);
      }
    },
    [linkWithBearer],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `${API_BASE}/v1/enrollment/sessions/${encodeURIComponent(sessionId)}`,
          { cache: 'no-store' },
        );
        if (!res.ok) {
          if (!cancelled) setLoadError('No encontramos esta sesión.');
          return;
        }
        const data = (await res.json()) as Session;
        if (cancelled) return;
        setSession(data);
        if (data.status === 'completed') setDone(true);
      } catch {
        if (!cancelled) setLoadError('No se pudo contactar la API de Veyra.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  // Auto-consume ?ml= magic link
  useEffect(() => {
    if (!mlToken || mlConsumed.current) return;
    if (!session || session.status === 'completed') {
      if (session?.status === 'completed') setMlBusy(false);
      return;
    }
    if (!session.credentialId) return;

    mlConsumed.current = true;
    setMlBusy(true);
    setFormError(null);
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/v1/auth/magic-link/consume`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: mlToken }),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok) {
          setFormError(
            apiErrorMessage(body, 'El enlace de correo no es válido o expiró.'),
          );
          return;
        }
        const accessToken = body?.accessToken as string | undefined;
        if (!accessToken) {
          setFormError('Magic link sin accessToken.');
          return;
        }
        await linkWithBearer(accessToken, body?.consumer as LinkedAccount, 'magic');
      } catch (e) {
        setFormError(
          e instanceof Error ? e.message : 'Error al usar el enlace de correo.',
        );
      } finally {
        setMlBusy(false);
      }
    })();
  }, [mlToken, session, linkWithBearer]);

  // Google Identity Services button
  useEffect(() => {
    if (done || loadError || !session?.credentialId) return;
    if (typeof window === 'undefined') return;

    let cancelled = false;

    const mountButton = () => {
      if (cancelled || !googleBtnRef.current || !window.google?.accounts?.id) {
        return;
      }
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: (res) => {
          if (res?.credential) void onGoogleCredential(res.credential);
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      googleBtnRef.current.innerHTML = '';
      window.google.accounts.id.renderButton(googleBtnRef.current, {
        theme: 'outline',
        size: 'large',
        text: 'continue_with',
        shape: 'rectangular',
        width: Math.min(360, googleBtnRef.current.clientWidth || 320),
        locale: 'es',
      });
      setGisReady(true);
    };

    if (window.google?.accounts?.id) {
      mountButton();
      return () => {
        cancelled = true;
      };
    }

    const existing = document.querySelector(
      'script[data-veyra-gis="1"]',
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', mountButton);
      return () => {
        cancelled = true;
        existing.removeEventListener('load', mountButton);
      };
    }

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.dataset.veyraGis = '1';
    script.onload = mountButton;
    script.onerror = () => {
      if (!cancelled) {
        setFormError(
          'No se pudo cargar Google Sign-In. Usa otras opciones (PoC).',
        );
      }
    };
    document.head.appendChild(script);
    return () => {
      cancelled = true;
    };
  }, [done, loadError, session, onGoogleCredential]);

  async function onSubmitFallback(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!email.trim() && !phone.trim()) {
      setFormError('Ingresa teléfono o correo.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(
        `${API_BASE}/v1/enrollment/sessions/${encodeURIComponent(sessionId)}/complete`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            displayName: displayName.trim() || undefined,
            email: email.trim() || undefined,
            phone: phone.trim() || undefined,
          }),
        },
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(
          apiErrorMessage(body, 'No se pudo completar la cuenta.'),
        );
        return;
      }
      setLinked({
        email: email.trim() || null,
        fullName: displayName.trim() || null,
      });
      setLinkedVia('fallback');
      setDone(true);
      if (body?.session) setSession(body.session as Session);
    } catch {
      setFormError('Error de red al completar la cuenta.');
    } finally {
      setSubmitting(false);
    }
  }

  async function onSendMagicLink(e: FormEvent) {
    e.preventDefault();
    setFormError(null);
    setDebugMagicUrl(null);
    if (!magicEmail.trim() || !magicEmail.includes('@')) {
      setFormError('Ingresa un correo válido para el enlace.');
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(
        `${API_BASE}/v1/enrollment/sessions/${encodeURIComponent(sessionId)}/magic-link`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: magicEmail.trim() }),
        },
      );
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setFormError(apiErrorMessage(body, 'No se pudo enviar el enlace.'));
        return;
      }
      setMagicSent(true);
      if (typeof body?.magicUrl === 'string') {
        setDebugMagicUrl(body.magicUrl);
      }
    } catch {
      setFormError('Error de red al solicitar el enlace.');
    } finally {
      setSubmitting(false);
    }
  }

  const waitingPalm =
    session && (session.status === 'pending_palm' || !session.credentialId);

  return (
    <div className="mx-auto flex min-h-[100dvh] w-full max-w-md flex-col justify-center px-6 py-12">
      <p
        className="text-[11px] font-semibold tracking-[0.22em] text-[#22C55E]"
        style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
      >
        VEYRA
      </p>
      <h1
        className="mt-3 text-3xl font-semibold tracking-tight text-[#F2F2F2]"
        style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
      >
        Completa tu cuenta
      </h1>
      <p className="mt-2 text-[15px] leading-relaxed text-[rgba(242,242,242,0.62)]">
        Vincula tu palma a tu cuenta Google para usarla en el comercio.
      </p>

      {loadError && <p className="mt-8 text-[#FF6B5A]">{loadError}</p>}

      {!loadError && !session && (
        <p className="mt-8 text-[rgba(242,242,242,0.62)]">Cargando sesión…</p>
      )}

      {done && (
        <div className="mt-10">
          <p className="text-xl font-medium text-[#22C55E]">
            {linkedVia === 'google'
              ? 'Palma vinculada a tu cuenta Google'
              : linkedVia === 'magic'
                ? 'Palma vinculada a tu correo'
                : 'Listo, tu palma ya está vinculada'}
          </p>
          {(linked?.fullName || linked?.email) && (
            <p className="mt-3 text-[15px] text-[#F2F2F2]">
              {linked.fullName ? (
                <>
                  <span className="font-medium">{linked.fullName}</span>
                  {linked.email ? (
                    <span className="text-[rgba(242,242,242,0.62)]">
                      {' '}
                      · {linked.email}
                    </span>
                  ) : null}
                </>
              ) : (
                linked.email
              )}
            </p>
          )}
          <p className="mt-2 text-sm text-[rgba(242,242,242,0.62)]">
            Ya puedes pagar o acceder con tu palma en terminales Veyra.
          </p>
        </div>
      )}

      {session && !done && waitingPalm && (
        <p className="mt-8 text-[rgba(242,242,242,0.75)]">
          Esperando que el terminal registre tu palma… Vuelve a abrir este enlace
          cuando el QR diga que la captura terminó.
        </p>
      )}

      {session && !done && !waitingPalm && (
        <div className="mt-8 flex flex-col gap-5">
          {mlBusy && (
            <p className="text-sm text-[rgba(242,242,242,0.75)]">
              Iniciando sesión con tu enlace de correo…
            </p>
          )}

          {!mlBusy && (
            <>
              <div>
                <p className="mb-3 text-sm text-[rgba(242,242,242,0.62)]">
                  Continúa con la misma cuenta Google que usarás en la app.
                </p>
                <div
                  ref={googleBtnRef}
                  className="flex min-h-[44px] w-full justify-center overflow-hidden rounded-lg"
                  aria-label="Continuar con Google"
                />
                {!gisReady && (
                  <p className="mt-2 text-center text-xs text-[rgba(242,242,242,0.45)]">
                    Cargando Google…
                  </p>
                )}
                {submitting && (
                  <p className="mt-2 text-center text-sm text-[rgba(242,242,242,0.62)]">
                    Vinculando palma…
                  </p>
                )}
              </div>

              <div className="border-t border-[rgba(255,255,255,0.08)] pt-5">
                <p className="mb-3 text-sm font-medium text-[#F2F2F2]">
                  Te enviamos un enlace a tu correo
                </p>
                {magicSent ? (
                  <div className="space-y-2 text-sm text-[rgba(242,242,242,0.75)]">
                    <p>Revisa tu bandeja (y spam) — el enlace caduca en 30 min.</p>
                    {debugMagicUrl && (
                      <div className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#1C1C1C] p-3">
                        <p className="mb-1 text-xs text-[rgba(242,242,242,0.45)]">
                          PoC debug — copia este enlace:
                        </p>
                        <a
                          href={debugMagicUrl}
                          className="break-all text-[#22C55E] underline"
                        >
                          {debugMagicUrl}
                        </a>
                      </div>
                    )}
                  </div>
                ) : (
                  <form onSubmit={onSendMagicLink} className="flex flex-col gap-3">
                    <input
                      type="email"
                      value={magicEmail}
                      onChange={(e) => setMagicEmail(e.target.value)}
                      autoComplete="email"
                      placeholder="tu@correo.com"
                      className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#1C1C1C] px-3 py-3 text-[#F2F2F2] outline-none focus:border-[#1A6B5C]"
                    />
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-lg border border-[rgba(255,255,255,0.14)] px-4 py-3 text-[14px] font-medium text-[#F2F2F2] transition enabled:hover:bg-[rgba(255,255,255,0.04)] disabled:opacity-60"
                    >
                      {submitting ? 'Enviando…' : 'Enviar enlace de acceso'}
                    </button>
                  </form>
                )}
              </div>

              <div className="border-t border-[rgba(255,255,255,0.08)] pt-4">
                <button
                  type="button"
                  onClick={() => setShowFallback((v) => !v)}
                  className="text-left text-sm text-[rgba(242,242,242,0.55)] underline-offset-2 hover:underline"
                >
                  {showFallback
                    ? 'Ocultar otras opciones'
                    : 'Otras opciones (PoC)'}
                </button>
                {showFallback && (
                  <form
                    onSubmit={onSubmitFallback}
                    className="mt-4 flex flex-col gap-4"
                  >
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="text-[rgba(242,242,242,0.62)]">Nombre</span>
                      <input
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        autoComplete="name"
                        className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#1C1C1C] px-3 py-3 text-[#F2F2F2] outline-none focus:border-[#1A6B5C]"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="text-[rgba(242,242,242,0.62)]">Correo</span>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#1C1C1C] px-3 py-3 text-[#F2F2F2] outline-none focus:border-[#1A6B5C]"
                      />
                    </label>
                    <label className="flex flex-col gap-1.5 text-sm">
                      <span className="text-[rgba(242,242,242,0.62)]">
                        Teléfono
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        autoComplete="tel"
                        placeholder="+52…"
                        className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#1C1C1C] px-3 py-3 text-[#F2F2F2] outline-none focus:border-[#1A6B5C]"
                      />
                    </label>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-lg bg-[#22C55E] px-4 py-3 text-center text-[15px] font-semibold text-[#0a1a12] transition enabled:hover:brightness-110 disabled:opacity-60"
                    >
                      {submitting ? 'Guardando…' : 'Vincular palma'}
                    </button>
                  </form>
                )}
              </div>
            </>
          )}

          {formError && <p className="text-sm text-[#FF6B5A]">{formError}</p>}
          <p className="text-center text-xs text-[rgba(242,242,242,0.45)]">
            Sesión {session.id.slice(0, 12)}… · {session.status}
          </p>
        </div>
      )}
    </div>
  );
}
