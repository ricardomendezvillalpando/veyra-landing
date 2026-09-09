import type { Metadata } from "next";
import { LegalH2, LegalShell } from "@/components/LegalShell";
import { LEGAL_RESPONSIBLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Cookies — Veyra",
  description:
    "Política de cookies y tecnologías similares del sitio y servicios Veyra.",
};

export default function CookiesPage() {
  const r = LEGAL_RESPONSIBLE;
  return (
    <LegalShell title="Cookies y tecnologías similares">
      <section>
        <LegalH2>1. Qué son</LegalH2>
        <p>
          Las cookies y tecnologías similares (pixels, almacenamiento local,
          identificadores de dispositivo) permiten recordar preferencias, medir
          audiencia y operar el sitio de forma segura.
        </p>
      </section>

      <section>
        <LegalH2>2. Tipos que podemos usar</LegalH2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Necesarias / técnicas:</strong>{" "}
            sesión, seguridad, balanceo y preferencias esenciales.
          </li>
          <li>
            <strong className="text-foreground">Analíticas:</strong> medición
            agregada de uso (p. ej. Vercel Analytics u equivalentes) para mejorar
            el sitio.
          </li>
          <li>
            <strong className="text-foreground">Preferencias:</strong> recordar
            elecciones del usuario en el sitio.
          </li>
        </ul>
        <p>
          No utilizamos cookies publicitarias de terceros para remarketing
          invasivo en esta landing, salvo que se informe y, cuando proceda, se
          solicite consentimiento.
        </p>
      </section>

      <section>
        <LegalH2>3. Base y control</LegalH2>
        <p>
          Las cookies estrictamente necesarias se basan en el interés legítimo
          de operar el servicio. Las no esenciales se sujetan a consentimiento
          cuando la normativa lo exija. Puede configurar su navegador para
          bloquear cookies; algunas funciones podrían verse limitadas.
        </p>
      </section>

      <section>
        <LegalH2>4. Más información</LegalH2>
        <p>
          Consulte el{" "}
          <a
            href="/legal/aviso-de-privacidad"
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            Aviso de privacidad
          </a>
          . Contacto:{" "}
          <a
            href={`mailto:${r.privacyEmail}`}
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            {r.privacyEmail}
          </a>
          . Actualizado: {r.lastUpdated}.
        </p>
      </section>
    </LegalShell>
  );
}
