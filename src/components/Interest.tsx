"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";

type Intent = "consumer" | "business";

export function Interest() {
  const [intent, setIntent] = useState<Intent>("business");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // UI-only por ahora; conectaremos waitlist/CRM después.
    setSubmitted(true);
  }

  return (
    <section id="interes" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-accent">
              Interés
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Sé de los primeros.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
              Estamos construyendo el piloto en México. Déjanos tus datos y te
              contactamos para probar Veyra o llevarlo a tu negocio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.06 }}
            className="rounded-2xl border border-border bg-surface-elevated/80 p-6 md:p-8"
          >
            <div className="flex gap-2 rounded-full bg-surface p-1">
              <button
                type="button"
                onClick={() => {
                  setIntent("consumer");
                  setSubmitted(false);
                }}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  intent === "consumer"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Quiero probar
              </button>
              <button
                type="button"
                onClick={() => {
                  setIntent("business");
                  setSubmitted(false);
                }}
                className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium transition ${
                  intent === "business"
                    ? "bg-accent text-accent-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                Soy un negocio
              </button>
            </div>

            {submitted ? (
              <p className="mt-10 text-center text-sm leading-relaxed text-platinum">
                Gracias. Te contactaremos pronto.
              </p>
            ) : (
              <form onSubmit={onSubmit} className="mt-8 grid gap-4">
                <Field
                  label="Nombre"
                  name="name"
                  required
                  autoComplete="name"
                />
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
                <Field
                  label="Teléfono"
                  name="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                />

                {intent === "business" ? (
                  <>
                    <Field label="Empresa" name="company" required />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Tipo de negocio" name="businessType" />
                      <Field label="Sucursales" name="locations" />
                    </div>
                    <Field label="Ciudad" name="city" />
                  </>
                ) : null}

                <button
                  type="submit"
                  className="mt-2 inline-flex h-12 items-center justify-center rounded-full bg-accent text-sm font-semibold text-accent-foreground transition hover:brightness-110"
                >
                  {intent === "business"
                    ? "Quiero Veyra en mi negocio"
                    : "Quiero probar Veyra"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium tracking-wide text-muted">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-sm text-foreground outline-none transition placeholder:text-muted/50 focus:border-accent/50"
      />
    </label>
  );
}
