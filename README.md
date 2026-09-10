# Veyra Landing

Landing page del producto **Veyra**.

- **Repo:** https://github.com/ricardomendezvillalpando/veyra-landing
- **Producción:** https://veyra-landing-phi.vercel.app

Documentación de producto: [`../docs/`](../docs/)  
Avance: [`../docs/progress/LANDING.md`](../docs/progress/LANDING.md)  
Logo oficial: `public/brand/veyra-wordmark.svg` → componente `src/components/Logo.tsx`

## Desarrollo

```bash
# Node >= 20.9 (nvm use 22)
npm install
npm run dev -- --port 3001
```

## Stack

Next.js · TypeScript · Tailwind v4 · Framer Motion · Vercel Analytics

## Monorepo

This package lives under `veyra/landing`. Sibling packages: `mobile`, `merchant`, `admin`, `api`, `device`.

## H5 enroll (PoC)

- Routes: `/e/[sessionId]` (+ enroll UX) — required for Z90P HTTPS QR.
- Google GIS → API `/v1/auth/google` + enrollment `/link`.
- Authorized JS origins must include `https://veyra-landing-phi.vercel.app` (and merchant if shared Web client).

**E2E 2026-09-10:** H5 Google link worked in the full palm-pay PoC. Speed work is on POS/API/mobile — see monorepo `docs/progress/HANDOFF_2026-09-10_E2E_PALM_PAY_OK.md`.
