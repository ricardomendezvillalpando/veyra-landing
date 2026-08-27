"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const methods = [
  {
    src: "/brand/veyra-palm-scan.jpg",
    title: "Reconocimiento de palma",
    body: "El patrón venoso de la palma identifica a la persona en el terminal — rápido, contactless y difícil de falsificar. Es el núcleo de Veyra ID en checkout y acceso presencial.",
  },
  {
    src: "/brand/veyra-method-face.jpg",
    title: "Reconocimiento facial",
    body: "En el teléfono, Face ID u otra biometría facial del dispositivo autoriza la transacción. Ideal para confirmación remota sin tocar el terminal ni compartir datos de la tarjeta.",
  },
  {
    src: "/brand/veyra-method-fingerprint.jpg",
    title: "Huella digital",
    body: "Autenticación local vía Touch ID / huella del dispositivo. Equilibra velocidad y seguridad en retail y apps móviles cuando el usuario aprueba un pago desde el teléfono.",
  },
  {
    src: "/brand/veyra-method-iris.jpg",
    title: "Escaneo de iris",
    body: "Analiza patrones únicos del iris con muy alta precisión. Orientado a entornos de máxima seguridad: control de acceso corporativo o transacciones de alto valor.",
  },
];

export function BiometricMethods() {
  return (
    <section
      id="metodos"
      className="border-t border-border bg-surface/50 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-[2.75rem]">
            Tipos de métodos biométricos de pago
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
            En Veyra combinamos modalidades según el momento: la palma
            identifica en el comercio; la biometría del teléfono autoriza. Así
            la identidad queda separada de los métodos de pago tokenizados —
            más segura, más rápida y sin fricción.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2 md:gap-x-12 md:gap-y-16">
          {methods.map((method, i) => (
            <motion.article
              key={method.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 2) * 0.06 }}
            >
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-surface-elevated">
                <Image
                  src={method.src}
                  alt={method.title}
                  fill
                  quality={88}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                {method.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted md:text-[0.95rem] md:leading-relaxed">
                {method.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
