import type { Metadata } from "next";
import { LegalH2, LegalShell } from "@/components/LegalShell";
import { LEGAL_RESPONSIBLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Derechos ARCO — Veyra",
  description:
    "Cómo ejercer derechos ARCO (acceso, rectificación, cancelación y oposición) ante Veyra.",
};

export default function DerechosArcoPage() {
  const r = LEGAL_RESPONSIBLE;
  return (
    <LegalShell title="Derechos ARCO y revocación del consentimiento">
      <section>
        <LegalH2>1. Qué son los derechos ARCO</LegalH2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-foreground">Acceso:</strong> conocer qué
            datos tenemos y las condiciones del tratamiento.
          </li>
          <li>
            <strong className="text-foreground">Rectificación:</strong> corregir
            datos inexactos o incompletos.
          </li>
          <li>
            <strong className="text-foreground">Cancelación:</strong> solicitar
            que se eliminen de nuestros registros cuando proceda.
          </li>
          <li>
            <strong className="text-foreground">Oposición:</strong> oponerse a
            un tratamiento específico por causa legítima.
          </li>
        </ul>
        <p>
          También puede revocar el consentimiento otorgado para finalidades que
          lo requieran, y limitar el uso o divulgación de sus datos.
        </p>
      </section>

      <section>
        <LegalH2>2. Cómo presentar una solicitud</LegalH2>
        <p>
          Envíe un correo a{" "}
          <a
            href={`mailto:${r.arcoEmail}`}
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            {r.arcoEmail}
          </a>{" "}
          con:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Nombre completo y medio para recibir respuesta.</li>
          <li>Descripción clara del derecho que ejerce y datos involucrados.</li>
          <li>
            Documento o medio que acredite su identidad (y, en su caso,
            representación legal).
          </li>
          <li>Cualquier documento que facilite la localización de los datos.</li>
        </ul>
      </section>

      <section>
        <LegalH2>3. Plazos</LegalH2>
        <p>
          Daremos respuesta en los plazos previstos por la LFPDPPP y su
          Reglamento (como referencia general: hasta 20 días hábiles para
          comunicar la determinación, y hasta 15 días hábiles adicionales para
          hacerla efectiva, salvo ampliación fundada o plazos distintos que
          establezca la normativa vigente). Le informaremos si necesitamos
          información adicional.
        </p>
      </section>

      <section>
        <LegalH2>4. Efectos de la cancelación biométrica</LegalH2>
        <p>
          Si solicita la cancelación de su plantilla biométrica, es posible que
          no pueda completar acciones que dependan de esa credencial hasta un
          nuevo enrolamiento con consentimiento válido.
        </p>
      </section>

      <section>
        <LegalH2>5. Negativa y autoridad</LegalH2>
        <p>
          Si consideramos que no procede la solicitud, le explicaremos los
          motivos. Puede presentar una queja ante la autoridad de protección de
          datos personales competente en México.
        </p>
        <p>Actualizado: {r.lastUpdated}.</p>
      </section>
    </LegalShell>
  );
}
