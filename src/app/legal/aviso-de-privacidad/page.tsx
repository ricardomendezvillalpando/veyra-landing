import type { Metadata } from "next";
import { LegalH2, LegalH3, LegalShell } from "@/components/LegalShell";
import { LEGAL_RESPONSIBLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Aviso de privacidad — Veyra",
  description:
    "Aviso de privacidad integral de Veyra conforme a la LFPDPPP (México).",
};

export default function AvisoPrivacidadPage() {
  const r = LEGAL_RESPONSIBLE;
  return (
    <LegalShell title="Aviso de privacidad integral">
      <section>
        <LegalH2>1. Identidad y domicilio del responsable</LegalH2>
        <p>
          El responsable del tratamiento de sus datos personales es{" "}
          <strong className="text-foreground">{r.legalName}</strong> (en lo
          sucesivo, “{r.tradeName}” o el “Responsable”), con operaciones en{" "}
          {r.country}. Domicilio: {r.domicile}
        </p>
        <p>
          Contacto de privacidad:{" "}
          <a
            href={`mailto:${r.privacyEmail}`}
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            {r.privacyEmail}
          </a>
          .
        </p>
      </section>

      <section>
        <LegalH2>2. Datos personales que se someten a tratamiento</LegalH2>
        <p>
          Dependiendo del producto o canal (sitio web, app del consumidor,
          terminal, consola merchant o API), podemos tratar:
        </p>
        <LegalH3>2.1 Datos de identificación y contacto</LegalH3>
        <p>
          Nombre, correo electrónico, teléfono, empresa, ciudad, tipo de
          negocio, número de sucursales y datos de contacto comercial.
        </p>
        <LegalH3>2.2 Datos de cuenta y operación</LegalH3>
        <p>
          Identificadores de usuario (Veyra ID), historial de actividades
          autorizadas (pago, acceso, check-in u otras acciones), preferencias,
          dispositivos vinculados y registros técnicos de sesión.
        </p>
        <LegalH3>2.3 Datos de pago (cuando aplique)</LegalH3>
        <p>
          Tokens o referencias de método de pago gestionados a través de
          proveedores de servicios de pago (PSP). {r.tradeName} no almacena el
          PAN completo de tarjetas cuando el flujo lo permite vía tokenización
          del PSP.
        </p>
        <LegalH3>2.4 Datos personales sensibles — biométricos</LegalH3>
        <p>
          Plantillas o representaciones biométricas derivadas de la palma de la
          mano (y, en el futuro, otros factores como rostro o voz, si se
          habilitan). Estos datos se consideran{" "}
          <strong className="text-foreground">sensibles</strong> cuando su uso
          indebido pueda dar lugar a discriminación o riesgo grave para el
          titular, conforme a la LFPDPPP y la Guía INAI de datos biométricos.
          Su tratamiento requiere consentimiento expreso y por escrito (o medio
          electrónico equivalente de autenticación).
        </p>
        <p>
          Detalle específico: consulte el documento{" "}
          <a
            href="/legal/datos-biometricos"
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            Datos biométricos
          </a>
          .
        </p>
        <LegalH3>2.5 Datos de navegación</LegalH3>
        <p>
          Dirección IP, tipo de dispositivo, logs técnicos y cookies. Ver{" "}
          <a
            href="/legal/cookies"
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            Cookies
          </a>
          .
        </p>
      </section>

      <section>
        <LegalH2>3. Finalidades del tratamiento</LegalH2>
        <LegalH3>3.1 Finalidades necesarias (primarias)</LegalH3>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Crear y administrar la identidad {r.tradeName} (Veyra ID) y
            autenticar al titular mediante credenciales biométricas autorizadas.
          </li>
          <li>
            Ejecutar acciones autorizadas: pago, acceso, check-in, verificación
            u otras acciones configuradas por el comercio o el titular.
          </li>
          <li>
            Operar el POS / terminal, app y consolas; prevenir fraude y aplicar
            políticas de riesgo.
          </li>
          <li>
            Cumplir obligaciones legales, regulatorias y de seguridad de la
            información.
          </li>
          <li>
            Atender solicitudes de contacto, demos y soporte relacionadas con el
            servicio.
          </li>
        </ul>
        <LegalH3>3.2 Finalidades que requieren consentimiento</LegalH3>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Envío de comunicaciones comerciales, novedades o encuestas (cuando
            el titular lo autorice).
          </li>
          <li>
            Mejora de modelos y calidad del servicio con datos anonimizados o
            agregados, cuando se solicite consentimiento adicional distinto al
            estrictamente necesario para la prestación.
          </li>
        </ul>
        <p>
          El titular puede negarse a las finalidades secundarias sin que ello
          afecte la prestación del servicio principal, salvo cuando sean
          indispensables para la operación solicitada.
        </p>
      </section>

      <section>
        <LegalH2>4. Transferencias de datos</LegalH2>
        <p>
          Podemos transferir datos a terceros cuando sea necesario para:
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Proveedores de pago (PSP) y adquirentes para liquidar transacciones.
          </li>
          <li>
            Proveedores de infraestructura cloud, mensajería y seguridad bajo
            contratos de encargo.
          </li>
          <li>
            Comercios afiliados, solo en la medida necesaria para completar la
            acción autorizada (p. ej. confirmación de pago o acceso).
          </li>
          <li>
            Autoridades competentes cuando exista mandato legal.
          </li>
        </ul>
        <p>
          Las transferencias se realizan conforme a los artículos aplicables de
          la LFPDPPP y, en su caso, con las cláusulas o consentimientos
          requeridos. No vendemos datos personales.
        </p>
      </section>

      <section>
        <LegalH2>5. Limitación de uso y divulgación</LegalH2>
        <p>
          Para limitar el uso o divulgación de sus datos, escriba a{" "}
          <a
            href={`mailto:${r.privacyEmail}`}
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            {r.privacyEmail}
          </a>{" "}
          con el asunto “Limitación de uso”.
        </p>
      </section>

      <section>
        <LegalH2>6. Derechos ARCO y revocación del consentimiento</LegalH2>
        <p>
          Usted puede ejercer los derechos de Acceso, Rectificación,
          Cancelación y Oposición, así como revocar el consentimiento, conforme
          al procedimiento descrito en{" "}
          <a
            href="/legal/derechos-arco"
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            Derechos ARCO
          </a>
          . Correo:{" "}
          <a
            href={`mailto:${r.arcoEmail}`}
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            {r.arcoEmail}
          </a>
          .
        </p>
      </section>

      <section>
        <LegalH2>7. Medidas de seguridad</LegalH2>
        <p>
          Implementamos medidas administrativas, técnicas y físicas para
          proteger los datos personales, incluyendo controles de acceso,
          cifrado en tránsito cuando aplica, segregación de secretos y
          minimización de plantillas biométricas. Detalle en{" "}
          <a
            href="/legal/seguridad"
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            Seguridad de la información
          </a>
          .
        </p>
      </section>

      <section>
        <LegalH2>8. Conservación</LegalH2>
        <p>
          Conservamos los datos el tiempo necesario para las finalidades
          informadas y las obligaciones legales aplicables. Las plantillas
          biométricas se bloquean o eliminan cuando deja de ser necesario el
          vínculo de identidad, previa solicitud ARCO válida o al concluir la
          relación, conforme a plazos legales.
        </p>
      </section>

      <section>
        <LegalH2>9. Cambios al aviso</LegalH2>
        <p>
          Cualquier modificación sustancial a este aviso se publicará en este
          sitio con la fecha de actualización. El uso continuado de los
          servicios después de la publicación podrá constituir aceptación de
          los cambios cuando la ley lo permita; cuando se requiera nuevo
          consentimiento, se solicitará de forma expresa.
        </p>
        <p>Última actualización: {r.lastUpdated}.</p>
      </section>

      <section>
        <LegalH2>10. Autoridad</LegalH2>
        <p>
          Si considera que su derecho a la protección de datos personales ha
          sido lesionado, puede acudir a la autoridad competente en materia de
          protección de datos personales en México (antes INAI / autoridad
          sucesora según la legislación vigente).
        </p>
      </section>
    </LegalShell>
  );
}
