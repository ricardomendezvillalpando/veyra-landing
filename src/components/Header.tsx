"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { MERCHANT_URL } from "@/lib/merchant";

const links = [
  { href: "/#casos", label: "Casos de uso" },
  { href: "/#proceso", label: "Cómo funciona" },
  { href: "/#planes", label: "Planes" },
  { href: "/#seguridad", label: "Seguridad" },
  { href: "/#cumplimiento", label: "Legal" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    window.setTimeout(() => {
      window.location.href = href;
    }, 50);
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="relative mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-5 md:h-[4.75rem] md:px-8">
          <Link
            href="/#top"
            aria-label="Veyra — inicio"
            onClick={() => setOpen(false)}
            className="relative z-10 shrink-0"
          >
            <Logo height={26} color="#F2F2F2" />
          </Link>

          <nav
            className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-7 lg:gap-8 md:flex"
            aria-label="Principal"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted transition hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <a
              href={MERCHANT_URL}
              className="btn-primary px-3.5 py-2 text-sm sm:px-5 sm:py-2.5"
            >
              Inicia ya
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground md:hidden"
              aria-label="Abrir menú"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[60] md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className={`absolute inset-0 bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
          aria-label="Cerrar menú"
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute inset-y-0 right-0 flex w-[min(88vw,320px)] flex-col border-l border-border bg-surface-elevated shadow-2xl transition-transform duration-300 ease-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
        >
          <div className="flex h-[4.25rem] items-center justify-between border-b border-border px-5">
            <Logo height={26} color="#F2F2F2" />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border"
              aria-label="Cerrar"
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
                className="rounded-xl px-4 py-3.5 text-left text-base font-medium text-foreground hover:bg-mist"
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => go("/legal")}
              className="rounded-xl px-4 py-3.5 text-left text-base font-medium text-foreground hover:bg-mist"
            >
              Documentos legales
            </button>
          </nav>
          <div className="border-t border-border p-4">
            <button
              type="button"
              onClick={() => go(MERCHANT_URL)}
              className="btn-primary flex h-12 w-full items-center justify-center gap-2 text-sm"
            >
              Inicia ya
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
