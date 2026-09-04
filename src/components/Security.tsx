"use client";

import { motion } from "framer-motion";

const points = [
  {
    title: "Tus datos no se venden",
    body: "La información de tu palma es tuya. No la compartimos ni la usamos para anuncios.",
  },
  {
    title: "Tú decides",
    body: "Puedes activar o desactivar Veyra cuando quieras. Control total desde tu teléfono.",
  },
  {
    title: "Protección de banco",
    body: "Cada pago va cifrado, con la misma seriedad que esperas de un método financiero moderno.",
  },
  {
    title: "Si cambias de tarjeta, no empiezas de cero",
    body: "Tu palma te identifica. El método de pago se actualiza aparte — sin volver a registrarte.",
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
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Seguro para ti. Confiable para tu negocio.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Sabemos que pagar con la mano genera preguntas. Por eso diseñamos
              Veyra para que clientes y comercios se sientan tranquilos desde el
              primer uso.
            </p>
            <a
              href="#interes"
              className="btn-primary mt-8 rounded-full px-7 py-3.5 text-sm"
            >
              Quiero Veyra en mi negocio
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
