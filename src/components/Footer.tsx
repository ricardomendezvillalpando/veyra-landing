import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LEGAL_NAV } from "@/lib/legal";

const columns = [
  {
    title: "Producto",
    links: [
      { href: "/#casos", label: "Casos de uso" },
      { href: "/#proceso", label: "Cómo funciona" },
      { href: "/#planes", label: "Planes" },
      { href: "/#seguridad", label: "Seguridad" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { href: "/#interes", label: "Agenda una demo" },
      { href: "/#cumplimiento", label: "Cumplimiento" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/aviso-de-privacidad", label: "Aviso de privacidad" },
      { href: "/legal/terminos", label: "Términos y condiciones" },
      { href: "/legal/datos-biometricos", label: "Datos biométricos" },
      { href: "/legal/derechos-arco", label: "Derechos ARCO" },
      { href: "/legal/cookies", label: "Cookies" },
      { href: "/legal/seguridad", label: "Seguridad de la información" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-mist">
      <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.4fr]">
          <div>
            <Logo height={20} />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              Identidad para el mundo físico: presencia, autorización y acción
              con la palma — para negocios en México.
            </p>
            <a
              href="/#interes"
              className="btn-primary mt-6 rounded-full px-5 py-2.5 text-sm"
            >
              Agenda una demo
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-platinum">
                  {col.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-muted transition hover:text-foreground"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Veyra. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
            {LEGAL_NAV.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition hover:text-accent-glow"
              >
                {item.label}
              </Link>
            ))}
            <Link href="/legal" className="transition hover:text-accent-glow">
              Más legal →
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
