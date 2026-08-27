import Link from "next/link";
import { Logo } from "@/components/Logo";

const columns = [
  {
    title: "Producto",
    links: [
      { href: "#proceso", label: "Proceso" },
      { href: "#validacion", label: "Validación" },
      { href: "#metodos", label: "Métodos" },
      { href: "#flujo", label: "Cómo funciona" },
    ],
  },
  {
    title: "Plataforma",
    links: [
      { href: "#plataforma", label: "Veyra Pay" },
      { href: "#plataforma", label: "Veyra Access" },
      { href: "#plataforma", label: "Veyra Loyalty" },
      { href: "#arquitectura", label: "Arquitectura" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { href: "#seguridad", label: "Seguridad" },
      { href: "#negocios", label: "Negocios" },
      { href: "#clientes", label: "Clientes" },
      { href: "#interes", label: "Contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "#interes", label: "Privacidad" },
      { href: "#interes", label: "Términos" },
      { href: "#seguridad", label: "Cumplimiento" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_2fr] md:gap-16">
          <div>
            <Logo height={22} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Identidad biométrica para pagos y acceso. Infraestructura formal
              para comercios y design partners en México.
            </p>
            <a
              href="#interes"
              className="mt-6 inline-flex rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-accent/40 hover:text-accent"
            >
              Hablar con Veyra
            </a>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-platinum">
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

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Veyra. Prototipo / piloto — sujeto a
            revisión de privacidad y cumplimiento aplicable.
          </p>
          <Link
            href="#top"
            className="text-xs font-medium tracking-wide text-muted transition hover:text-accent"
          >
            Volver arriba ↑
          </Link>
        </div>
      </div>
    </footer>
  );
}
