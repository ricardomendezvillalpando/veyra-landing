"use client";

import { motion } from "framer-motion";
import { MERCHANT_URL } from "@/lib/merchant";

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
    body: "Los pagos y autorizaciones viajan protegidos, con el rigor que espera un método financiero moderno.",
  },
  {
    title: "Identidad estable, medios flexibles",
    body: "Si cambia la tarjeta, la identidad permanece. Actualizas el medio de pago sin reiniciar el enrolamiento.",
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
              protegidos desde el primer uso.
            </p>
            <a
              href={MERCHANT_URL}
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
      </div>
    </section>
  );
}
