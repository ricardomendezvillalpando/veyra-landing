"use client";

import { motion } from "framer-motion";
import { MERCHANT_START_URL } from "@/lib/merchant";

const points = [
  {
    title: "Biometría con propósito claro",
    body: "Usamos la palma para identificar y autorizar la acción — no para vender datos ni hacer publicidad.",
  },
  {
    title: "Control del titular",
    body: "Consentimiento, desactivación y derechos ARCO (acceso, rectificación, cancelación y oposición). Tu cliente decide; tú operas con transparencia.",
  },
  {
    title: "Cifrado en cada acción",
    body: "Los pagos viajan cifrados. La tarjeta de tu cliente no se guarda en Veyra: se tokeniza con nuestra pasarela de pagos.",
  },
  {
    title: "Identidad estable, medios flexibles",
    body: "Si cambia la tarjeta, la identidad permanece. Actualizas el medio de pago sin reiniciar el enrolamiento.",
  },
];

const hardwareCerts = [
  {
    label: "PCI PTS 5.x",
    detail:
      "Estándar de seguridad física y lógica para terminales de pago (PIN Transaction Security). Aplica al hardware certificado del POS.",
  },
  {
    label: "EMV Contact L1 & L2",
    detail:
      "Lectura de chip con contacto alineada a esquemas EMV — el mismo stack que usan redes de tarjetas a nivel global.",
  },
  {
    label: "EMV Contactless L1",
    detail:
      "NFC / sin contacto a nivel de terminal, base para PayWave y PayPass cuando el comercio usa el lector de tarjeta del dispositivo.",
  },
  {
    label: "PayWave · PayPass",
    detail:
      "Certificaciones de marca (Visa / Mastercard) anunciadas por el fabricante para el modelo de terminal de pago biométrico.",
  },
];

export function Security() {
  return (
    <section id="seguridad" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-medium text-muted">Seguridad y confianza</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Confianza biométrica para clientes y comercios.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Identificar con la palma genera preguntas. Por eso Veyra está
              pensado para que tu operación cumpla y tus clientes se sientan
              protegidos desde el primer uso — con hardware de pago certificado
              y cobros tokenizados.
            </p>
            <a
              href={MERCHANT_START_URL}
              className="btn-primary mt-8 rounded-full px-7 py-3.5 text-sm"
            >
              Inicia ya
            </a>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2">
            {points.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <h3 className="font-display text-base font-semibold text-foreground">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          id="pci"
          className="mt-16 border-t border-border pt-14"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-medium text-muted">Hardware de pago</p>
          <h3 className="mt-3 max-w-3xl font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            Terminal Palm POS con certificaciones PCI PTS y EMV.
          </h3>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            La terminal Palm POS que usamos cumple estándares de la industria de
            pagos (PCI PTS y EMV). La palma identifica a tu cliente de forma
            segura; el cobro solo se confirma cuando el pago queda autorizado —
            nunca mostramos “aprobado” a medias.
          </p>

          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {hardwareCerts.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * i }}
              >
                <p className="font-display text-sm font-semibold tracking-wide text-accent-glow">
                  {c.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {c.detail}
                </p>
              </motion.div>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted">
            En resumen: la terminal está certificada para pagos; los datos de
            tarjeta de tu cliente no se guardan en Veyra. Si quieres el detalle
            técnico y legal, está en{" "}
            <a
              href="/legal/seguridad"
              className="text-accent-glow underline-offset-4 hover:underline"
            >
              seguridad
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
