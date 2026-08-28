"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function ProductShowcase() {
  return (
    <section id="producto" className="py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Un gesto.{" "}
            <span className="text-gradient">Toda tu operación.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Cobro, acceso y lealtad con la misma presencia. Tus clientes no
            sacan tarjeta ni app: tú ganas velocidad, conversión y una marca
            que se siente del futuro.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-[1.75rem] bg-mist shadow-xl ring-1 ring-border"
        >
          <div className="relative aspect-square sm:aspect-[5/4]">
            <Image
              src="/brand/veyra-presence-hub.png"
              alt="Terminal Veyra para presencia — pagos y acceso"
              fill
              className="object-contain object-center p-4 sm:p-8"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
