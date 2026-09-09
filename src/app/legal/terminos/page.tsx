import type { Metadata } from "next";
import { LegalH2, LegalShell } from "@/components/LegalShell";
import { LEGAL_RESPONSIBLE } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Términos y condiciones — Veyra",
  description:
    "Términos y condiciones de uso de la plataforma Veyra, POS y servicios relacionados.",
};

export default function TerminosPage() {
  const r = LEGAL_RESPONSIBLE;
  return (
    <LegalShell title="Términos y condiciones de uso">
      <section>
        <LegalH2>1. Aceptación</LegalH2>
        <p>
          Al acceder al sitio, solicitar una demo, crear una cuenta, contratar
          un plan, utilizar un POS / terminal {r.tradeName} o integrar la API,
          usted acepta estos Términos y el{" "}
          <a
            href="/legal/aviso-de-privacidad"
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            Aviso de privacidad
          </a>
          . Si no está de acuerdo, no utilice los servicios.
        </p>
      </section>

      <section>
        <LegalH2>2. Descripción del servicio</LegalH2>
        <p>
          {r.tradeName} es una plataforma de identidad para el mundo físico
          que permite asociar credenciales (inicialmente palma) a un
          identificador estable (Veyra ID) y autorizar acciones como pago,
          acceso, check-in u otras configuradas. El pago con palma es un caso
          de uso; no limita el alcance del producto.
        </p>
      </section>

      <section>
        <LegalH2>3. Cuentas y elegibilidad</LegalH2>
        <p>
          Debe proporcionar información veraz, mantener la confidencialidad de
          credenciales de acceso (cuando existan) y ser mayor de edad o contar
          con representación legal suficiente para contratar. Los comercios son
          responsables de cumplir obligaciones frente a sus clientes y
          regulaciones sectoriales aplicables (incluyendo medios de pago).
        </p>
      </section>

      <section>
        <LegalH2>4. Planes, hardware y pagos</LegalH2>
        <p>
          Los precios, activaciones y suscripciones publicados en el sitio son
          de carácter informativo y pueden actualizarse. La contratación de un
          plan (“Crear un POS” / Start, Business, Enterprise u otros) se
          formaliza mediante pedido, contrato o flujo de alta que {r.tradeName}{" "}
          confirme. El hardware puede entregarse en esquemas de activación,
          renta o comodato según el plan. Impuestos aplicables se sumarán
          conforme a la ley mexicana.
        </p>
      </section>

      <section>
        <LegalH2>5. Uso aceptable</LegalH2>
        <ul className="list-disc space-y-2 pl-5">
          <li>No eludir controles de seguridad ni ingeniería inversa no autorizada.</li>
          <li>No usar el servicio para fraude, lavado de dinero o actividades ilícitas.</li>
          <li>
            No recolectar datos biométricos de terceros sin base legal y
            consentimiento válidos.
          </li>
          <li>No interferir con la disponibilidad del servicio.</li>
        </ul>
      </section>

      <section>
        <LegalH2>6. Biometría y consentimiento</LegalH2>
        <p>
          El enrolamiento biométrico requiere consentimiento informado del
          titular. El comercio no debe condicionar de forma abusiva derechos
          fundamentales ni omitir el aviso de privacidad. Ver{" "}
          <a
            href="/legal/datos-biometricos"
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            Datos biométricos
          </a>
          .
        </p>
      </section>

      <section>
        <LegalH2>7. Propiedad intelectual</LegalH2>
        <p>
          Marcas, software, documentación y diseño de {r.tradeName} son
          propiedad del Responsable o de sus licenciantes. Se otorga una
          licencia limitada, no exclusiva y revocable para usar el servicio
          conforme a estos Términos.
        </p>
      </section>

      <section>
        <LegalH2>8. Disponibilidad y cambios</LegalH2>
        <p>
          Podemos modificar, suspender o discontinuar funcionalidades con aviso
          razonable cuando sea practicable. No garantizamos disponibilidad
          ininterrumpida; sí aplicamos prácticas razonables de continuidad.
        </p>
      </section>

      <section>
        <LegalH2>9. Limitación de responsabilidad</LegalH2>
        <p>
          En la medida permitida por la ley mexicana, {r.tradeName} no será
          responsable por daños indirectos, lucro cesante o pérdida de datos
          derivada de causas ajenas a dolo o negligencia grave. Nada en estos
          Términos limita derechos del consumidor que sean irrenunciables.
        </p>
      </section>

      <section>
        <LegalH2>10. Ley aplicable y jurisdicción</LegalH2>
        <p>
          Estos Términos se rigen por las leyes de los Estados Unidos Mexicanos.
          Para la interpretación y cumplimiento, las partes se someten a los
          tribunales competentes de México, renunciando a cualquier otro fuero
          que pudiera corresponderles por razón de domicilio presente o futuro,
          salvo normas de protección al consumidor que resulten imperativas.
        </p>
      </section>

      <section>
        <LegalH2>11. Contacto</LegalH2>
        <p>
          Consultas:{" "}
          <a
            href={`mailto:${r.supportEmail}`}
            className="text-accent-glow underline-offset-4 hover:underline"
          >
            {r.supportEmail}
          </a>
          . Última actualización: {r.lastUpdated}.
        </p>
      </section>
    </LegalShell>
  );
}
