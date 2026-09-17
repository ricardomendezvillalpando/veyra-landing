"use client";

import { motion } from "framer-motion";

/**
 * Sellos de confianza (lead-facing). Marcas tipográficas propias —
 * no logos oficiales de PCI/Visa (uso de marca restringido).
 */
const badges = [
  {
    id: "pci",
    mark: "PCI PTS",
    sub: "5.x",
    title: "Terminal certificada",
    detail: "Seguridad de hardware de pago (fabricante).",
  },
  {
    id: "emv",
    mark: "EMV",
    sub: "L1 · L2",
    title: "Estándar de tarjeta",
    detail: "Chip y sin contacto en la terminal.",
  },
  {
    id: "lfpdppp",
    mark: "LFPDPPP",
    sub: "México",
    title: "Datos personales",
    detail: "Ley federal mexicana y derechos ARCO.",
  },
  {
    id: "arco",
    mark: "ARCO",
    sub: "Derechos",
    title: "Control del titular",
    detail: "Acceso, rectificación, cancelación y oposición.",
  },
  {
    id: "tls",
    mark: "TLS",
    sub: "Cifrado",
    title: "Conexiones protegidas",
    detail: "Tráfico cifrado entre app, terminal y Veyra.",
  },
  {
    id: "token",
    mark: "TOKEN",
    sub: "Pagos",
    title: "Sin guardar la tarjeta",
    detail: "El número de tarjeta no se almacena en Veyra.",
  },
];

export function TrustBadges({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent-glow">
          Confianza
        </p>
        <h3 className="mt-2 font-display text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          Diseñado con estándares de pago y privacidad
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
          Referencias que importan cuando cobras y cuidas datos de tus clientes.
        </p>
      </div>

      <ul className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((b, i) => (
          <motion.li
            key={b.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-4 rounded-2xl border border-border bg-surface px-4 py-4 md:px-5"
          >
            <div
              className="flex h-[4.25rem] w-[4.25rem] shrink-0 flex-col items-center justify-center rounded-xl border border-accent-glow/25 bg-pastel-mint"
              aria-hidden
            >
              <span className="font-display text-[11px] font-bold leading-none tracking-wide text-accent-glow">
                {b.mark}
              </span>
              <span className="mt-1 text-[9px] font-medium uppercase tracking-wider text-muted">
                {b.sub}
              </span>
            </div>
            <div className="min-w-0">
              <p className="font-display text-sm font-semibold text-foreground">
                {b.title}
              </p>
              <p className="mt-0.5 text-xs leading-snug text-muted md:text-sm">
                {b.detail}
              </p>
            </div>
          </motion.li>
        ))}
      </ul>

      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-relaxed text-muted">
        PCI PTS y EMV describen certificaciones del{" "}
        <strong className="font-medium text-foreground">hardware</strong> de
        terminal. El detalle legal de datos personales está en{" "}
        <a
          href="/legal/seguridad"
          className="text-accent-glow underline-offset-2 hover:underline"
        >
          seguridad
        </a>{" "}
        y{" "}
        <a
          href="/legal"
          className="text-accent-glow underline-offset-2 hover:underline"
        >
          documentos legales
        </a>
        .
      </p>
    </div>
  );
}
