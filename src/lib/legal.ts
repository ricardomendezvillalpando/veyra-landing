export const LEGAL_RESPONSIBLE = {
  tradeName: "Veyra",
  /** Actualizar con la razón social inscrita ante el RFC cuando esté disponible. */
  legalName: "Veyra (razón social por confirmar)",
  country: "México",
  domicile:
    "Domicilio fiscal por confirmar — México. Se actualizará en este aviso al quedar formalizado.",
  privacyEmail: "privacy@veyrabiometric.com",
  /** ARCO y soporte general — mismo buzón operativo. */
  arcoEmail: "hola@veyrabiometric.com",
  supportEmail: "hola@veyrabiometric.com",
  lastUpdated: "15 de septiembre de 2026",
};

export const LEGAL_NAV = [
  {
    href: "/legal/aviso-de-privacidad",
    label: "Aviso de privacidad",
    short: "LFPDPPP — tratamiento de datos personales",
  },
  {
    href: "/legal/terminos",
    label: "Términos y condiciones",
    short: "Uso de la plataforma, POS y servicios",
  },
  {
    href: "/legal/datos-biometricos",
    label: "Datos biométricos",
    short: "Palma y credenciales sensibles",
  },
  {
    href: "/legal/derechos-arco",
    label: "Derechos ARCO",
    short: "Acceso, rectificación, cancelación y oposición",
  },
  {
    href: "/legal/cookies",
    label: "Cookies y tecnologías similares",
    short: "Uso de cookies en el sitio y apps",
  },
  {
    href: "/legal/seguridad",
    label: "Seguridad de la información",
    short: "Medidas técnicas y organizativas",
  },
] as const;
