import type { Metadata } from "next";
import { LegalH2, LegalShell } from "@/components/LegalShell";
import { LEGAL_RESPONSIBLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Datos biométricos — Veyra",
  description:
    "Información sobre el tratamiento de datos biométricos (palma) conforme a la LFPDPPP y Guía INAI.",
};

export default function DatosBiometricosPage() {
  const r = LEGAL_RESPONSIBLE;
  return (
    <LegalShell title="Tratamiento de datos biométricos">
      <section>
        <LegalH2>1. Qué recabamos</LegalH2>
        <p>
          {r.tradeName} puede capturar una muestra de la palma de la mano a
          través de un dispositivo biométrico compatible para generar una{" "}
          <strong className="text-foreground">plantilla o representación</strong>{" "}
          destinada a reconocimiento. En fases posteriores pueden incorporarse
          otros factores (rostro, voz) bajo el mismo marco de consentimiento e
          información.
        </p>
        <p>
          Preferimos almacenar representaciones derivadas y no imágenes crudas
          cuando la arquitectura del proveedor lo permita, minimizando el riesgo
          de reidentificación indebida.
        </p>
      </section>

      <section>
        <LegalH2>2. Naturaleza sensible</LegalH2>
        <p>
          De conformidad con la LFPDPPP y la Guía para el Tratamiento de Datos
          Biométricos (INAI), los datos biométricos pueden constituir datos
          personales sensibles. Su tratamiento exige:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Información clara en el aviso de privacidad.</li>
          <li>
            Consentimiento expreso y por escrito o medio electrónico
            equivalente (p. ej. firma electrónica / aceptación autenticada en
            app).
          </li>
          <li>Finalidades concretas y proporcionales.</li>
          <li>Medidas de seguridad reforzadas.</li>
        </ul>
      </section>

      <section>
        <LegalH2>3. Finalidades</LegalH2>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Crear la plantilla de enrolamiento asociada al Veyra ID del titular.
          </li>
          <li>
            Comparar nuevas muestras con la plantilla para autenticar presencia
            e identidad.
          </li>
          <li>
            Autorizar acciones (pago, acceso, check-in, etc.) según políticas
            del titular y del comercio.
          </li>
          <li>Prevención de fraude y seguridad del sistema.</li>
        </ul>
        <p>
          No utilizamos datos biométricos para publicidad comportamental ni los
          vendemos.
        </p>
      </section>

      <section>
        <LegalH2>4. Momento del aviso</LegalH2>
        <p>
          El aviso se pone a disposición antes o al momento del enrolamiento. En
          lecturas posteriores de comparación, puede mostrarse un aviso
          simplificado o recordatorio, siempre con acceso al aviso integral.
        </p>
      </section>

      <section>
        <LegalH2>5. Encargados y proveedores de hardware</LegalH2>
        <p>
          El lector biométrico de un fabricante determinado es un proveedor
          sustituible. Los identificadores o plantillas del fabricante se
          tratan detrás de abstracciones de {r.tradeName}; el Veyra ID permanece
          estable aunque cambie el sensor o el PSP.
        </p>
      </section>

      <section>
        <LegalH2>6. Conservación y eliminación</LegalH2>
        <p>
          Las plantillas se conservan mientras exista la relación de identidad
          activa o el plazo legal obligatorio. El titular puede solicitar
          cancelación vía ARCO; ello puede impedir el uso de acciones que
          dependan de la biometría.
        </p>
      </section>

      <section>
        <LegalH2>7. Contacto</LegalH2>
        <p>
          <a
            href={`mailto:${r.privacyEmail}`}
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            {r.privacyEmail}
          </a>{" "}
          ·{" "}
          <a
            href={`mailto:${r.arcoEmail}`}
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            {r.arcoEmail}
          </a>
          . Actualizado: {r.lastUpdated}.
        </p>
      </section>
    </LegalShell>
  );
}
