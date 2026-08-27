import Link from "next/link";
import { Logo } from "@/components/Logo";

const links = [
  { href: "#proceso", label: "Proceso" },
  { href: "#plataforma", label: "Plataforma" },
  { href: "#seguridad", label: "Seguridad" },
  { href: "#interes", label: "Contacto" },
];

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#eef2f4]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[4.25rem] md:px-8">
        <Link href="#top" aria-label="Veyra — inicio" className="flex shrink-0 items-center">
          <Logo height={20} color="#0d3d36" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#3a4a50] transition hover:text-[#0c1418]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#interes"
          className="rounded-xl bg-[#0d3d36] px-4 py-2.5 text-sm font-semibold text-accent transition hover:brightness-110"
        >
          Quiero probar
        </a>
      </div>
    </header>
  );
}
