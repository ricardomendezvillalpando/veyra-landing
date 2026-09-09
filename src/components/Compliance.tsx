"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LEGAL_NAV } from "@/lib/legal";

export function Compliance() {
  return (
    <section
      id="cumplimiento"
      className="border-t border-border py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-muted">Legal y cumplimiento</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Transparencia sobre el uso de tu información.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Documentos alineados a la legislación mexicana para datos
            personales y biométricos, el uso del servicio y el ejercicio de
            derechos ARCO (acceso, rectificación, cancelación y oposición).
          </p>
        </div>

        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {LEGAL_NAV.map((item, i) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-5 transition hover:border-accent-glow/35 hover:bg-surface-elevated"
              >
                <span className="flex items-start justify-between gap-3">
                  <span className="font-display text-base font-semibold text-foreground">
                    {item.label}
                  </span>
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-muted transition group-hover:text-accent-glow" />
                </span>
                <span className="mt-2 text-sm leading-relaxed text-muted">
                  {item.short}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Índice completo:{" "}
          <Link
            href="/legal"
            className="font-medium text-accent-glow underline-offset-4 hover:underline"
          >
            /legal
          </Link>
        </p>
      </div>
    </section>
  );
}
