import type { ReactNode } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { LEGAL_NAV, LEGAL_RESPONSIBLE } from "@/lib/legal";

export function LegalShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <Header />
      <main className="border-t border-border pt-24 pb-20 md:pt-28 md:pb-28">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[220px_1fr] md:gap-14 md:px-8">
          <aside className="md:sticky md:top-28 md:self-start">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-platinum">
              Legal y cumplimiento
            </p>
            <nav className="mt-4 flex flex-col gap-1" aria-label="Documentos legales">
              <Link
                href="/legal"
                className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-mist hover:text-foreground"
              >
                Índice
              </Link>
              {LEGAL_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-muted transition hover:bg-mist hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          <article className="min-w-0">
            <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
              Actualizado · {LEGAL_RESPONSIBLE.lastUpdated}
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
            <p className="mt-4 rounded-xl border border-border bg-surface px-4 py-3 text-sm leading-relaxed text-muted">
              Documento informativo alineado a la{" "}
              <strong className="font-medium text-foreground">
                Ley Federal de Protección de Datos Personales en Posesión de los
                Particulares (LFPDPPP)
              </strong>{" "}
              y su Reglamento, así como a la Guía INAI sobre datos biométricos.
              Debe ser revisado y formalizado por asesoría jurídica antes de
              operación comercial. Los campos de razón social y domicilio se
              actualizarán al quedar constituida la entidad responsable.
            </p>
            <div className="legal-prose mt-10 space-y-8 text-sm leading-relaxed text-muted md:text-[0.95rem]">
              {children}
            </div>
          </article>
        </div>
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  );
}

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  );
}

export function LegalH3({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-6 font-display text-base font-semibold text-foreground">
      {children}
    </h3>
  );
}
