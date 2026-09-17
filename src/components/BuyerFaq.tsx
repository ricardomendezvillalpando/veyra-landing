"use client";

import { motion } from "framer-motion";
import { TrustBadges } from "@/components/TrustBadges";

type FaqItem = { q: string; a: string };
type FaqSection = { id: string; title: string; blurb: string; items: FaqItem[] };

const sections: FaqSection[] = [
  {
    id: "como-funciona",
    title: "Cómo funciona",
    blurb: "Sin tecnicismos: qué pasa en tu negocio y qué hace tu cliente.",
    items: [
      {
        q: "¿Qué es Veyra, en una frase?",
        a: "Es una forma de cobrar (y reconocer a tus clientes) con la palma de la mano: ellos se presentan una vez, vinculan su tarjeta en la app, y en tu negocio pagan acercando la palma a la terminal.",
      },
      {
        q: "¿Cómo es el día a día en mi local?",
        a: "Tú cobras el monto en la terminal Veyra. El cliente acerca la palma. En un momento se confirma la identidad y el pago. No necesita sacar teléfono ni tarjeta en caja.",
      },
      {
        q: "¿Qué tiene que hacer mi cliente la primera vez?",
        a: "En el comercio se registra la palma (unos segundos) y abre la app Veyra para agregar su tarjeta. Después, en visitas siguientes, solo acerca la palma.",
      },
      {
        q: "¿Necesito cambiar toda mi caja o mi sistema actual?",
        a: "No. Veyra se suma a tu operación: cobra con palma y te da una consola para ver ventas, productos y actividad. Puedes seguir usando lo que ya tengas mientras migrás lo que te convenga.",
      },
      {
        q: "¿Puedo probar antes de comprar la terminal?",
        a: "Sí. Puedes explorar la consola en modo demo, sin cobros reales. Cuando quieras operar con palma, adquieres la terminal y activas el software.",
      },
    ],
  },
  {
    id: "precios",
    title: "Precios",
    blurb: "Qué pagas una vez y qué pagas cada mes.",
    items: [
      {
        q: "¿Estoy rentando la terminal?",
        a: "No. La terminal la compras (de contado o a meses). Lo que pagas cada mes es el software Veyra: cobro con palma, consola, app del cliente y soporte.",
      },
      {
        q: "¿Siempre hay una mensualidad?",
        a: "Sí. En todos los planes hay una suscripción de $800 + IVA al mes por terminal, mientras uses Veyra. Va aparte del pago de la terminal.",
      },
      {
        q: "¿Qué diferencia hay entre contado y a meses?",
        a: "De contado pagas menos por la terminal ($10,490 + IVA). A meses la terminal se divide en 12 pagos con tu tarjeta ($1,099 + IVA al mes), más la misma suscripción de software. Misma máquina, mismo servicio.",
      },
      {
        q: "¿Qué incluye la mensualidad de $800?",
        a: "Cobrar e identificar con la palma, la consola de tu negocio, la app para tus clientes, actualizaciones y soporte. No incluye el costo de la terminal.",
      },
      {
        q: "Si dejo de pagar el software, ¿qué pasa con la terminal?",
        a: "Dejas de usar Veyra (palma, consola y app). La terminal sigue siendo tuya; no te la pedimos de regreso. Si más adelante quieres volver, reactivas la suscripción.",
      },
      {
        q: "¿Los precios ya traen IVA?",
        a: "No. Verás + IVA en la cotización o al activar, para que no haya sorpresas al final.",
      },
      {
        q: "Tengo más de una sucursal",
        a: "Cada terminal se compra por separado y cada una lleva su mensualidad de software. Si eres cadena o franquicia, contáctanos y te armamos una propuesta.",
      },
    ],
  },
  {
    id: "comisiones",
    title: "Comisiones",
    blurb: "Qué pasa cuando cobras a tus clientes.",
    items: [
      {
        q: "¿Veyra me cobra una comisión extra por cada venta con palma?",
        a: "El cobro a tu cliente se procesa como un pago con tarjeta (la que ya vinculó en la app). Aplican las comisiones normales de procesamiento de pagos; te las mostramos con claridad al activar tu cuenta. No hay una “cuota oculta” aparte de lo que ya conoces al cobrar con tarjeta.",
      },
      {
        q: "¿La mensualidad de $800 incluye las comisiones de las ventas?",
        a: "No. Los $800 + IVA son el software y el servicio Veyra. Las comisiones de cada cobro son independientes, como en cualquier medio de pago electrónico.",
      },
      {
        q: "¿Cuándo me llega el dinero de las ventas?",
        a: "Según el calendario de liquidación de tu cuenta de pagos (normalmente en días hábiles, como con otros cobros con tarjeta). Al activarte te explicamos plazos y cómo ver tus movimientos en la consola.",
      },
      {
        q: "¿Hay costos ocultos?",
        a: "Lo que cotizamos es: terminal (una vez o a meses) + suscripción mensual del software + IVA. Las comisiones por cobro se informan al activar. Si algo no queda claro, escríbenos antes de pagar.",
      },
    ],
  },
  {
    id: "seguridad",
    title: "Seguridad",
    blurb: "Para ti y para tus clientes.",
    items: [
      {
        q: "¿Es seguro pagar con la palma?",
        a: "Sí. La palma sirve para reconocer a la persona; el cobro usa la tarjeta que el cliente ya guardó de forma segura en la app. No mostramos “pago aprobado” hasta que el cobro queda autorizado.",
      },
      {
        q: "¿Guardan la huella o la foto de la mano de mis clientes?",
        a: "Se usa un patrón biométrico de la vena de la palma para identificar, no una foto para redes sociales ni publicidad. El cliente da su consentimiento y puede pedir ejercer sus derechos sobre sus datos.",
      },
      {
        q: "¿La tarjeta de mi cliente queda guardada en Veyra?",
        a: "No guardamos el número de la tarjeta en nuestros sistemas. Se tokeniza con nuestra pasarela de pagos, igual que en apps serias de wallet.",
      },
      {
        q: "¿La terminal es de confianza?",
        a: "Usamos hardware de pago con certificaciones de la industria (seguridad de terminales y estándares de tarjeta). El detalle técnico está en la sección de seguridad del sitio y en /legal/seguridad.",
      },
      {
        q: "¿Qué pasa si alguien intenta hacerse pasar por otro?",
        a: "La palma es de la persona: no se presta como una tarjeta. Si hay duda o falla el reconocimiento, el cobro no se confirma y puedes usar otro medio de pago.",
      },
    ],
  },
  {
    id: "envio",
    title: "Envío y activación",
    blurb: "Cuándo llega tu terminal y cómo arrancas.",
    items: [
      {
        q: "¿Cuánto tarda en llegar la terminal?",
        a: "Al adquirirla, la recibes en aproximadamente 1 a 2 semanas. El plazo puede variar por demanda y cobertura de envío; te confirmamos la fecha estimada al comprar.",
      },
      {
        q: "¿Por qué no es entrega inmediata?",
        a: "Cada terminal se prepara y envía según pedidos reales. Preferimos ser honestos con el tiempo a prometer “para mañana” y fallar. Si necesitas una fecha concreta, háblanos al cotizar.",
      },
      {
        q: "¿A dónde envían?",
        a: "Enviamos dentro de México según cobertura logística. Al activar o cotizar te pedimos la dirección del establecimiento y te confirmamos si aplica tu zona.",
      },
      {
        q: "¿Qué incluye el paquete?",
        a: "La terminal Palm POS lista para operar con Veyra, más las indicaciones para encenderla, vincularla a tu cuenta y hacer el primer cobro de prueba.",
      },
      {
        q: "¿Me ayudan a activarla?",
        a: "Sí. Te acompañamos por WhatsApp o correo para el primer encendido, la cuenta y una prueba de cobro. El objetivo es que cobres con palma sin adivinar.",
      },
      {
        q: "¿Puedo comprar ahora y recibir después?",
        a: "Sí: al adquirir, queda tu pedido y el envío se agenda en esa ventana de 1–2 semanas (o la que te confirmemos). Mientras tanto puedes ir preparando productos y la consola.",
      },
    ],
  },
  {
    id: "soporte",
    title: "Soporte",
    blurb: "Si algo no sale como esperabas.",
    items: [
      {
        q: "¿Cómo los contacto?",
        a: "Escríbenos a hola@veyrabiometric.com o por el WhatsApp del sitio. También puedes pedir una demo en la sección de contacto.",
      },
      {
        q: "¿Hay garantía de la terminal?",
        a: "Sí: la terminal nueva tiene garantía de fabricante / Veyra según los términos que te damos al comprar. Si llega dañada o no enciende, te ayudamos a reemplazarla.",
      },
      {
        q: "¿Qué pasa si deja de leer la palma?",
        a: "Casi siempre se resuelve con limpieza del sensor, buena iluminación o volver a registrar la palma. Soporte te guía paso a paso; si el equipo falla de verdad, aplicamos garantía.",
      },
    ],
  },
];

export function BuyerFaq() {
  return (
    <section id="dudas" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-muted">Antes de decidir</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            Preguntas frecuentes
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">
            Cómo funciona, precios, comisiones, seguridad y envío — en lenguaje
            claro.
          </p>
        </div>

        <nav
          aria-label="Temas del FAQ"
          className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2"
        >
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#faq-${s.id}`}
              className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-muted transition hover:border-accent-glow/40 hover:text-foreground"
            >
              {s.title}
            </a>
          ))}
        </nav>

        <div className="mt-14 space-y-16">
          {sections.map((section, si) => (
            <motion.div
              key={section.id}
              id={`faq-${section.id}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: Math.min(si * 0.02, 0.08) }}
              className="scroll-mt-28"
            >
              <div className="mx-auto max-w-3xl">
                <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-accent-glow">
                  FAQ
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {section.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted md:text-base">
                  {section.blurb}
                </p>

                <div className="mt-6 space-y-3">
                  {section.items.map((item) => (
                    <details
                      key={item.q}
                      className="group rounded-2xl border border-border bg-surface open:border-accent-glow/25"
                    >
                      <summary className="cursor-pointer list-none px-5 py-4 font-display text-base font-semibold text-foreground marker:content-none md:px-6 md:py-5 md:text-lg [&::-webkit-details-marker]:hidden">
                        <span className="flex items-center justify-between gap-4">
                          {item.q}
                          <span className="shrink-0 text-accent-glow transition group-open:rotate-45">
                            +
                          </span>
                        </span>
                      </summary>
                      <p className="border-t border-border px-5 pb-5 pt-3 text-sm leading-relaxed text-muted md:px-6 md:pb-6 md:text-base">
                        {item.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 border-t border-border pt-16 md:mt-24 md:pt-20">
          <TrustBadges />
        </div>
      </div>
    </section>
  );
}
