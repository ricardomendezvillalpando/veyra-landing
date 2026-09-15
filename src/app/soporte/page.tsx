import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { LEGAL_RESPONSIBLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Soporte — Veyra",
  description:
    "Ayuda y contacto de Veyra. Escríbenos a hola@veyrabiometric.com.",
};

const TOPICS = [
  {
    title: "App del consumidor",
    body: "Inicio de sesión, vincular palma, tarjetas, notificaciones o borrar cuenta.",
  },
  {
    title: "Comercios y terminal",
    body: "Alta en la consola, planes, envío del Palm POS o cobros en el punto de venta.",
  },
  {
    title: "Privacidad y datos",
    body: "Consultas sobre tu información o derechos ARCO — también puedes usar los canales legales.",
  },
] as const;

export default function SoportePage() {
  const email = LEGAL_RESPONSIBLE.supportEmail;
  const mailto = `mailto:${email}?subject=${encodeURIComponent("Soporte Veyra")}`;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Header />
      <main className="border-t border-border pt-24 pb-20 md:pt-28 md:pb-28">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
            Ayuda
          </p>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Soporte
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            ¿Tienes una duda o un problema con Veyra? Escríbenos y te
            respondemos por correo.
          </p>

          <div className="mt-10 rounded-2xl border border-border bg-surface px-6 py-8 md:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-platinum">
              Correo
            </p>
            <a
              href={mailto}
              className="mt-3 inline-block font-display text-2xl font-semibold tracking-tight text-accent-glow transition hover:brightness-110 md:text-3xl"
            >
              {email}
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Incluye tu nombre, el comercio o el correo de la cuenta, y una
              descripción breve. Respondemos en días hábiles.
            </p>
            <a
              href={mailto}
              className="btn-primary mt-6 inline-flex rounded-full px-6 py-3 text-sm"
            >
              Abrir correo
            </a>
          </div>

          <ul className="mt-12 space-y-6">
            {TOPICS.map((t) => (
              <li key={t.title}>
                <h2 className="font-display text-lg font-semibold text-foreground">
                  {t.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  {t.body}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-8 text-sm text-muted">
            <Link
              href="/legal/aviso-de-privacidad"
              className="transition hover:text-accent-glow"
            >
              Aviso de privacidad
            </Link>
            <Link
              href="/legal/derechos-arco"
              className="transition hover:text-accent-glow"
            >
              Derechos ARCO
            </Link>
            <a
              href={`mailto:${LEGAL_RESPONSIBLE.privacyEmail}`}
              className="transition hover:text-accent-glow"
            >
              {LEGAL_RESPONSIBLE.privacyEmail}
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}
