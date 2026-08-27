"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

const links = [
  { href: "#proceso", label: "Proceso" },
  { href: "#plataforma", label: "Plataforma" },
  { href: "#seguridad", label: "Seguridad" },
  { href: "#interes", label: "Contacto" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function go(href: string) {
    setOpen(false);
    // Allow drawer close paint before scroll/hash jump on mobile
    window.setTimeout(() => {
      window.location.hash = href.replace("#", "");
    }, 50);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#eef2f4]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 md:h-[4.25rem] md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0d3d36]/12 text-[#0c1418] md:hidden"
              aria-label="Abrir menú"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </button>

            <Link
              href="#top"
              aria-label="Veyra — inicio"
              className="flex shrink-0 items-center"
              onClick={() => setOpen(false)}
            >
              <Logo height={20} color="#0d3d36" />
            </Link>
          </div>

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

      {/* Mobile drawer — left */}
      <div
        className={`fixed inset-0 z-[60] md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-ink/50 backdrop-blur-sm transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        />

        <aside
          className={`absolute inset-y-0 left-0 flex w-[min(86vw,320px)] flex-col bg-[#eef2f4] shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
        >
          <div className="flex h-16 items-center justify-between border-b border-black/5 px-5">
            <Logo height={18} color="#0d3d36" />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#0d3d36]/12 text-[#0c1418]"
              aria-label="Cerrar menú"
              onClick={() => setOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-3 py-5">
            {links.map((link) => (
              <button
                key={link.href}
                type="button"
                onClick={() => go(link.href)}
                className="rounded-xl px-4 py-3.5 text-left text-base font-medium text-[#0c1418] transition hover:bg-white/80"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="border-t border-black/5 p-4">
            <button
              type="button"
              onClick={() => go("#interes")}
              className="flex h-12 w-full items-center justify-center rounded-xl bg-[#0d3d36] text-sm font-semibold text-accent"
            >
              Quiero probar
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
