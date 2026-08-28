import Link from "next/link";
import { Logo } from "@/components/Logo";

const columns = [
  {
    title: "Producto",
    links: [
      { href: "#proceso", label: "Beneficios" },
      { href: "#accion", label: "En acción" },
      { href: "#seguridad", label: "Seguridad" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { href: "#interes", label: "Contacto" },
      { href: "#interes", label: "Demo" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-mist/40">
      <div className="mx-auto max-w-5xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <Logo height={20} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Tecnología de presencia para negocios que quieren vender más
              rápido, atender mejor y destacar frente a la competencia.
            </p>
            <a href="#interes" className="btn-primary mt-6 rounded-full px-5 py-2.5 text-sm">
              Quiero una demo
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-platinum">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-sm text-muted transition hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Veyra. Prototipo / piloto.
          </p>
          <Link
            href="#top"
            className="text-xs font-medium text-muted transition hover:text-accent"
          >
            Volver arriba ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
