/** Merchant console (POS / admin) — production host. */
export const MERCHANT_URL =
  process.env.NEXT_PUBLIC_VEYRA_MERCHANT_URL ??
  "https://merchant.veyrabiometric.com";

/** Alta desde landing: wizard limpio (ignora sesión local previa → payouts). */
export const MERCHANT_START_URL = `${MERCHANT_URL.replace(/\/$/, "")}/wizard?fresh=1`;
