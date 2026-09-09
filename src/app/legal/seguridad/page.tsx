import type { Metadata } from "next";
import { LegalH2, LegalShell } from "@/components/LegalShell";
import { LEGAL_RESPONSIBLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Seguridad de la información — Veyra",
  description:
    "Medidas de seguridad técnicas y organizativas de Veyra para proteger datos personales y biométricos.",
};

export default function SeguridadLegalPage() {
  const r = LEGAL_RESPONSIBLE;
  return (
    <LegalShell title="Seguridad de la información">
      <section>
        <LegalH2>1. Compromiso</LegalH2>
        <p>
          {r.tradeName} aplica medidas de seguridad administrativas, técnicas y
          físicas razonables y proporcionales al riesgo, en línea con los
          principios de la LFPDPPP (licitud, lealtad, información,
          consentimiento, finalidad, proporcionalidad, calidad y
          responsabilidad).
        </p>
      </section>

      <section>
        <LegalH2>2. Medidas técnicas (ejemplos)</LegalH2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Cifrado en tránsito (TLS) en canales de producción.</li>
          <li>
            Tokenización de métodos de pago a través de PSP cuando aplique;
            minimización de datos de tarjeta en nuestros sistemas.
          </li>
          <li>
            Separación de secretos, control de acceso por roles y registro de
            eventos relevantes.
          </li>
          <li>
            Preferencia por plantillas biométricas / representaciones derivadas
            frente a almacenamiento de imágenes crudas.
          </li>
          <li>
            Abstracción de proveedores biométricos y de pago para reducir
            acoplamiento y facilitar rotación segura.
          </li>
        </ul>
      </section>

      <section>
        <LegalH2>3. Medidas organizativas</LegalH2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Acceso al mínimo privilegio para personal y proveedores.</li>
          <li>Contratos de encargo / confidencialidad con terceros relevantes.</li>
          <li>
            Procedimientos para atender incidentes y derechos ARCO.
          </li>
          <li>
            Revisión periódica de este documento y del aviso de privacidad.
          </li>
        </ul>
      </section>

      <section>
        <LegalH2>4. Incidentes</LegalH2>
        <p>
          Ante una vulneración de seguridad que afecte datos personales,
          actuaremos conforme a las obligaciones legales aplicables,
          incluyendo investigación, contención y, cuando proceda, notificación
          a titulares y/o autoridad.
        </p>
      </section>

      <section>
        <LegalH2>5. Limitaciones</LegalH2>
        <p>
          Ningún sistema es 100% invulnerable. El titular y el comercio también
          deben aplicar buenas prácticas (dispositivos actualizados, no compartir
          códigos OTP, reportar anomalías).
        </p>
        <p>
          Contacto de seguridad / privacidad:{" "}
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
