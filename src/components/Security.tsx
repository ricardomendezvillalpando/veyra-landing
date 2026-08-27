"use client";

import { motion } from "framer-motion";

const principles = [
  {
    title: "Biometría ≠ tarjeta",
    body: "El template biométrico resuelve una identidad. Los métodos de pago viven aparte, tokenizados.",
  },
  {
    title: "Sin PAN ni CVV",
    body: "Solo referencias del PSP. Nunca almacenamos el número completo de la tarjeta.",
  },
  {
    title: "Face ID en el dispositivo",
    body: "La biometría facial del teléfono no sale del Secure Enclave. Solo recibimos una firma criptográfica.",
  },
  {
    title: "Vault separado",
    body: "PII y biometría en dominios distintos. Templates cifrados con KMS. Revocación inmediata.",
  },
];

export function Security() {
  return (
    <section id="seguridad" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
              Seguridad
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Diseñado como infraestructura financiera.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Principios del blueprint: TLS, nonces, challenges firmados,
              autenticación de terminales y audit trail. Privacy by design desde
              el día uno.
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2">
            {principles.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
              >
                <h3 className="font-display text-base font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
