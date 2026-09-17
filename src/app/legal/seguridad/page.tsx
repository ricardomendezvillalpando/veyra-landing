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
            Tokenización de métodos de pago a través de PSP (Stripe) cuando
            aplique; minimización de datos de tarjeta en nuestros sistemas (no
            almacenamos PAN en la API Veyra en el flujo palm-pay).
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
        <LegalH2>3. Hardware de pago (PCI PTS / EMV)</LegalH2>
        <p>
          El terminal Palm POS de campo (familia ZCS Z90 / Z90NP Palm Vein
          Payment) es publicado por el fabricante con certificaciones orientadas
          a pagos seguros, incluyendo:
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li>
            <strong>PCI PTS 5.x</strong> — seguridad de terminales de pago (PIN
            Transaction Security).
          </li>
          <li>
            <strong>EMV Contact L1 &amp; L2</strong> y{" "}
            <strong>EMV Contactless L1</strong>.
          </li>
          <li>
            <strong>PayWave</strong> y <strong>PayPass</strong> (esquemas de
            marca anunciados por el fabricante).
          </li>
        </ul>
        <p className="mt-3">
          Estas certificaciones respaldan el hardware cuando se usa el canal de
          tarjeta del dispositivo. Son distintas de <strong>PCI DSS</strong>{" "}
          (controles del entorno que procesa/almacena datos de tarjeta). En el
          modelo palm-pay de Veyra, la identificación biométrica autoriza un
          cobro off-session sobre un PaymentMethod tokenizado; la confirmación
          visible en terminal se emite cuando el PaymentIntent resulta en estado
          succeeded (no solo por el match de palma).
        </p>
        <p className="mt-3">
          Referencias públicas del fabricante:{" "}
          <a
            href="https://www.szzcs.com/products/Palm-Vein-Terminals/palm-vein-payment-pos.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            Z90NP Palm Vein Payment POS
          </a>
          ;{" "}
          <a
            href="https://www.szzcs.com/products/-POS-Terminal/z90-android-120-pos-hniwjt.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            Z90 POS (PCI PTS 5.x)
          </a>
          . Los certificados oficiales pueden solicitarse al OEM / distribuidor
          para auditorías.
        </p>
      </section>

      <section>
        <LegalH2>4. Medidas organizativas</LegalH2>
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
        <LegalH2>5. Incidentes</LegalH2>
        <p>
          Ante una vulneración de seguridad que afecte datos personales,
          actuaremos conforme a las obligaciones legales aplicables,
          incluyendo investigación, contención y, cuando proceda, notificación
          a titulares y/o autoridad.
        </p>
      </section>

      <section>
        <LegalH2>6. Limitaciones</LegalH2>
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
