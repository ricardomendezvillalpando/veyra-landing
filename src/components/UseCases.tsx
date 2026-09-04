"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const cases = [
  {
    n: "01",
    title: "Pagar en caja",
    body: "El cliente acerca la palma y listo. Filas más cortas, más ventas por hora y una experiencia que la gente recuerda.",
  },
  {
    n: "02",
    title: "Entrar sin tarjeta",
    body: "Gym, oficina, club o evento: la misma mano abre la puerta. Adiós pases perdidos y filas en recepción.",
  },
  {
    n: "03",
    title: "Check-in al instante",
    body: "Hoteles, aeropuertos y eventos. Llegas, te reconocen y sigues. Sin papeles ni códigos que fallan.",
  },
  {
    n: "04",
    title: "Membresía y lealtad",
    body: "Puntos y beneficios van contigo, no con una tarjeta que se olvida. Más visitas. Más recompras.",
  },
];

export function UseCases() {
  return (
    <section
      id="casos"
      className="relative border-t border-border bg-[#0a1210] text-white"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 20%, rgba(26,107,92,0.22), transparent 60%), radial-gradient(ellipse 50% 40% at 10% 80%, rgba(26,107,92,0.12), transparent 55%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20">
          <div>
            <p className="font-mono text-[11px] tracking-[0.2em] text-white/45 uppercase">
              Casos de uso
            </p>
            <h2 className="mt-4 max-w-[18ch] font-display text-3xl font-semibold leading-[1.12] tracking-tight text-white md:text-4xl lg:text-[2.75rem]">
              Una mano. Todo lo que tu negocio necesita.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/60 md:text-lg">
              Pagar, entrar, registrarte o sumar puntos — con la misma
              experiencia. Tú ganas velocidad. Tus clientes ganan comodidad.
            </p>
          </div>

          <div className="relative aspect-[5/4] overflow-hidden md:aspect-[16/11]">
            <Image
              src="/brand/veyra-hero-universe.png"
              alt="Pagar y entrar con la palma usando Veyra"
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 520px"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(10,18,16,0.55) 0%, transparent 45%), linear-gradient(to top, rgba(10,18,16,0.65), transparent 40%)",
              }}
            />
            <p className="absolute bottom-5 left-5 max-w-[20ch] font-display text-sm font-medium leading-snug text-white/90 md:bottom-6 md:left-6 md:text-base">
              Acercas la mano. Todo pasa.
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 md:mt-20">
          {cases.map((c, i) => (
            <motion.article
              key={c.n}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="group grid gap-3 border-b border-white/10 py-7 md:grid-cols-[4.5rem_12rem_1fr] md:items-baseline md:gap-8 md:py-8"
            >
              <span className="font-mono text-xs tracking-wider text-white/35">
                {c.n}
              </span>
              <h3 className="font-display text-lg font-semibold tracking-tight text-white transition group-hover:text-[#9aecd8] md:text-xl">
                {c.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-white/55 md:text-[0.95rem]">
                {c.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
