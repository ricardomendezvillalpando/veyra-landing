import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/LegalShell";
import { LEGAL_NAV, LEGAL_RESPONSIBLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal y cumplimiento — Veyra",
  description:
    "Aviso de privacidad, términos, datos biométricos, derechos ARCO y políticas de cumplimiento de Veyra en México.",
};

export default function LegalIndexPage() {
  return (
    <LegalShell title="Legal y cumplimiento">
      <p>
        Este centro reúne los documentos que {LEGAL_RESPONSIBLE.tradeName} pone
        a disposición de titulares, comercios y usuarios en relación con el
        tratamiento de información personal, el uso de la plataforma y las
        obligaciones de transparencia previstas en la legislación mexicana.
      </p>
      <ul className="space-y-3">
        {LEGAL_NAV.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="font-medium text-accent-glow underline-offset-4 hover:underline"
            >
              {item.label}
            </Link>
            <span className="text-muted"> — {item.short}</span>
          </li>
        ))}
      </ul>
      <p>
        Para ejercer derechos ARCO o consultas de privacidad:{" "}
        <a
          href={`mailto:${LEGAL_RESPONSIBLE.arcoEmail}`}
          className="text-accent-glow underline-offset-4 hover:underline"
        >
          {LEGAL_RESPONSIBLE.arcoEmail}
        </a>
        .
      </p>
    </LegalShell>
  );
}
