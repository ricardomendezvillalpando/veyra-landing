"use client";

import { motion } from "framer-motion";

const points = [
  {
    title: "Privacidad garantizada",
    body: "La información biométrica no se vende ni se comparte. Diseñado para generar confianza — y adopción.",
  },
  {
    title: "El cliente tiene el control",
    body: "Puede autorizar con Face ID y revocar su biometría cuando quiera. Menos fricción legal, más tranquilidad.",
  },
  {
    title: "Cifrado de extremo a extremo",
    body: "Cada transacción protegida con estándares de infraestructura financiera. Tu marca se ve seria.",
  },
  {
    title: "Identidad ≠ tarjeta",
    body: "La palma identifica; el método de pago vive aparte. Cambias de tarjeta sin re-enrolar a nadie.",
  },
];

export function Security() {
  return (
    <section id="seguridad" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Seguridad,{" "}
              <span className="text-gradient">de fábrica.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Veyra usa reconocimiento de presencia para pagos y acceso. La
              biometría de tus clientes está cifrada, nunca se vende y es
              revocable — la base para que adopten la tecnología sin miedo.
            </p>
            <a href="#interes" className="btn-primary mt-8 rounded-full px-7 py-3.5 text-sm">
              Quiero una demo
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
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
