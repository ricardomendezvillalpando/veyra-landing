# Veyra × Supabase (PoC payments)

## Why

Physical iOS devices cannot reliably call `http://192.168.x.x` (Local Network /
ATS). For the PoC we expose Stripe helpers over **HTTPS**.

## Paths

1. **Now (physical device):** Vercel production HTTPS  
   `https://veyra-landing-phi.vercel.app/api/stripe/*`  
   Env: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
2. **Local helper:** `node scripts/stripe-poc-server.mjs` + optional `cloudflared`
3. **Target PoC platform:** Supabase Edge Functions in this folder  
   (`stripe-setup-intent`, `stripe-payment-method`)

## Deploy Edge Functions (when Veyra Supabase exists)

```bash
# create / link project (do NOT reuse Denly production long-term)
supabase login
supabase link --project-ref <veyra-ref>

supabase secrets set STRIPE_SECRET_KEY=sk_test_... STRIPE_PUBLISHABLE_KEY=pk_test_...
supabase functions deploy stripe-setup-intent
supabase functions deploy stripe-payment-method
```

Then set mobile:

```ts
apiBaseUrl: 'https://<veyra-ref>.supabase.co/functions/v1'
```

And update `stripePayments.ts` paths to:
- `POST /stripe-setup-intent`
- `GET /stripe-payment-method?paymentMethodId=`

(or keep Next-compatible path aliases with a thin rewrite).

## Tunnel helper (today — physical device)

```bash
# terminal A — stable API (no Next watcher)
cd landing && node scripts/stripe-poc-server.mjs

# terminal B
cloudflared tunnel --url http://127.0.0.1:8787 --protocol http2
# paste https://*.trycloudflare.com into mobile/src/config/stripe.ts → apiBaseUrl
```
