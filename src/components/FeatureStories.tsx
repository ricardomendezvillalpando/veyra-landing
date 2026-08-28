"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const blocks = [
  {
    title: "Cobra sin fricción. Vende más.",
    body: "Cuando el cliente solo acerca la mano, la fila se mueve. Menos tiempo en caja, más capacidad en horas pico y una experiencia que invita a volver — y a recomendarte.",
    image: "/brand/veyra-checkout-palm.png",
    alt: "Mano sobre sensor biométrico en checkout",
    reverse: false,
  },
  {
    title: "Confianza que convierte.",
    body: "El cliente confirma con Face ID en su propio teléfono. Tú demuestras seriedad; ellos sienten control. Esa confianza se traduce en adopción y en tickets cerrados, no abandonados.",
    image: "/brand/veyra-phone-auth.png",
    alt: "Autorización biométrica en el teléfono",
    reverse: true,
  },
  {
    title: "De la puerta al mostrador, sin fricción.",
    body: "Misma presencia para entrar al gym, al club o al coworking y pagar en cafetería. Un enroll, menos costos operativos y un journey que captura y retiene clientes.",
    image: "/brand/veyra-palm-scan.jpg",
    alt: "Escaneo de palma para acceso",
    reverse: false,
  },
];

export function FeatureStories() {
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-5xl space-y-16 px-5 md:space-y-24 md:px-8">
        {blocks.map((b) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className={`grid items-center gap-10 md:grid-cols-2 md:gap-14 ${
              b.reverse ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-[2rem]">
                {b.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
                {b.body}
              </p>
              <a href="#interes" className="btn-primary mt-7 px-6 py-3 text-sm">
                Quiero una demo
              </a>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-mist shadow-lg ring-1 ring-border">
              <Image
                src={b.image}
                alt={b.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 480px"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
