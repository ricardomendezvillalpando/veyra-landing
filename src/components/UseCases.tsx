"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, LayoutGroup } from "framer-motion";
import {
  CreditCard,
  DoorOpen,
  ClipboardCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { easeOutExpo, fadeUpSoft, staggerContainer } from "@/lib/motion";

type CaseItem = {
  id: string;
  tab: string;
  icon: LucideIcon;
  title: string;
  intro: string;
  points: { title: string; body: string }[];
  image: string;
  imageAlt: string;
};

const cases: CaseItem[] = [
  {
    id: "pagar",
    tab: "Pagar en caja",
    icon: CreditCard,
    title: "Cobro con palma en el punto de venta",
    intro:
      "El cliente acerca la mano y Veyra autoriza el pago. Filas más cortas, más tickets por hora y una caja que se siente moderna.",
    points: [
      {
        title: "Menos pasos en el momento de pagar",
        body: "Sin buscar cartera ni desbloquear el teléfono. La presencia basta para iniciar el cobro.",
      },
      {
        title: "Confirmación clara para tu equipo",
        body: "El terminal confirma el pago. Tu personal sigue con el siguiente cliente.",
      },
    ],
    image: "/brand/veyra-checkout-palm.png",
    imageAlt: "Pagar con la palma en un terminal Veyra",
  },
  {
    id: "acceso",
    tab: "Acceso",
    icon: DoorOpen,
    title: "Entrada autorizada sin pases físicos",
    intro:
      "Gym, oficina, club o evento: la misma identidad abre la puerta según tu política. Menos pases perdidos y menos carga en recepción.",
    points: [
      {
        title: "Una identidad, varios puntos de acceso",
    body: "El Veyra ID (la identidad digital de tu cliente) abre solo los accesos que tú defines.",
      },
      {
        title: "Menos validación manual",
        body: "Reduce fricción en recepción y deja un registro claro de quién entró.",
      },
    ],
    image: "/brand/veyra-access-gate.jpg",
    imageAlt: "Acceso con identidad Veyra",
  },
  {
    id: "checkin",
    tab: "Check-in",
    icon: ClipboardCheck,
    title: "Check-in con presencia verificada",
    intro:
      "Hoteles, aeropuertos y eventos. Validas que la persona está ahí, confirmas su identidad y avanzas el flujo — sin papeles ni códigos que fallan.",
    points: [
      {
        title: "Presencia antes de la acción",
        body: "El reconocimiento confirma quién es y que está presente antes de continuar.",
      },
      {
        title: "Flujo más corto en recepción",
        body: "Menos espera y una llegada que se siente premium para el huésped o asistente.",
      },
    ],
    image: "/brand/veyra-checkin-presence.png",
    imageAlt: "Validación de presencia con palma en terminal Veyra, sin rostros",
  },
  {
    id: "lealtad",
    tab: "Lealtad",
    icon: Sparkles,
    title: "Membresía y beneficios en la palma",
    intro:
      "Puntos y beneficios van con la identidad, no con una tarjeta que se olvida. Más visitas. Más recompra.",
    points: [
      {
        title: "Identidad estable",
        body: "El beneficio se asocia a la identidad Veyra, no a un plástico que se pierde.",
      },
      {
        title: "Mismo gesto, más valor",
        body: "Pagar y acumular en el mismo momento, sin apps extra en caja.",
      },
    ],
    image: "/brand/veyra-hero-universe.png",
    imageAlt: "Lealtad e identidad con Veyra",
  },
];

export function UseCases() {
  const [active, setActive] = useState(cases[0].id);
  const current = cases.find((c) => c.id === active) ?? cases[0];
  const Icon = current.icon;
  const reduce = useReducedMotion();

  return (
    <section id="casos" className="relative border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <motion.div
          className="mx-auto max-w-2xl text-center"
          variants={reduce ? undefined : staggerContainer}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <motion.p
            variants={reduce ? undefined : fadeUpSoft}
            className="inline-flex rounded-full border border-accent-glow/25 bg-accent-soft px-3.5 py-1 text-[11px] font-medium tracking-wide text-accent-glow uppercase"
          >
            Casos de uso
          </motion.p>
          <motion.h2
            variants={reduce ? undefined : fadeUpSoft}
            className="mt-5 font-display text-3xl font-semibold leading-[1.12] tracking-tight text-foreground md:text-4xl"
          >
            Una identidad. Varias acciones en tu operación.
          </motion.h2>
          <motion.p
            variants={reduce ? undefined : fadeUpSoft}
            className="mt-4 text-base leading-relaxed text-muted md:text-lg"
          >
            La misma experiencia de presencia para cobrar, dar acceso, hacer
            check-in o reconocer lealtad.
          </motion.p>
        </motion.div>

        <LayoutGroup>
          <div
            className="mt-12 flex gap-1 overflow-x-auto border-b border-border pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label="Casos de uso"
          >
            {cases.map((c) => {
              const TabIcon = c.icon;
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(c.id)}
                  className={`relative flex shrink-0 items-center gap-2 px-4 py-3.5 text-sm font-medium transition-colors duration-300 md:px-5 ${
                    isActive
                      ? "text-accent-glow"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  {c.tab}
                  {isActive ? (
                    <motion.span
                      layoutId="casos-tab-underline"
                      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-accent-glow"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>
        </LayoutGroup>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={reduce ? undefined : { opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.4, ease: easeOutExpo }}
            className="mt-10 grid items-start gap-10 lg:grid-cols-2 lg:gap-14"
            role="tabpanel"
          >
            <div>
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05, duration: 0.35 }}
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-accent-glow/30 bg-accent-soft text-accent-glow"
              >
                <Icon className="h-4 w-4" />
              </motion.div>
              <h3 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-[1.75rem]">
                {current.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {current.intro}
              </p>
              <ol className="mt-8 space-y-6">
                {current.points.map((p, i) => (
                  <motion.li
                    key={p.title}
                    initial={reduce ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.12 + i * 0.08, duration: 0.4, ease: easeOutExpo }}
                  >
                    <p className="font-display text-base font-semibold text-foreground">
                      {i + 1}. {p.title}
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">
                      {p.body}
                    </p>
                  </motion.li>
                ))}
              </ol>
              <motion.a
                href="#interes"
                className="btn-primary mt-10 inline-flex px-7 py-3 text-sm"
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4 }}
              >
                Agenda una demo
              </motion.a>
            </div>

            <motion.div
              className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-border bg-surface md:aspect-[16/12]"
              initial={reduce ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.08, duration: 0.5, ease: easeOutExpo }}
            >
              <Image
                src={current.image}
                alt={current.imageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 520px"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(20,20,20,0.55) 0%, transparent 45%)",
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
