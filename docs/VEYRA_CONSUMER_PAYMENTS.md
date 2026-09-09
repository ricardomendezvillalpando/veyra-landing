# Veyra — consumer payments context (from architecture review)

Source conversation: [Guardar tarjetas en Veyra](https://chatgpt.com/share/6a9c4efa-2d20-83e8-9798-6f82e88372ce)

## What Veyra stores

- Users: `customer_id` + tokenized `payment_method_id` (default card) — never PAN.
- Merchants: `connected_account_id` — CLABE collected via PSP-hosted onboarding.
- Core model remains `Biometric → Veyra ID → Authorize → Action (PAY)`.

## Two merchant modes

1. **Veyra POS mínimo** — amount/concept → palm → charge default token → fee → settle to connected account.
2. **External POS** — POS selects Veyra → `POST /v1/actions` with amount → terminal palm → respond PAID. Closed terminals (Clip/MP) stay parallel initially.

## PSP path

- PoC/MVP: **Stripe Connect** (Customers, SetupIntents, PaymentMethods, PaymentIntents, application fees, webhooks).
- Later enterprise: Adyen; MX alternative Conekta if marketplace + token reuse + biometric auth are confirmed in writing.

## Still open

Merchant of Record, card-on-file vs face-to-face classification, KYC/CLABE onboarding, biometric consent/revocation, risk step-up, refunds/chargebacks, POS SDK.

## Consumer app implication

Phone enrolls identity + payment methods once. Routine checkout should not require the phone unless policy/risk says so.

## Stripe account policy

- **Create a dedicated Stripe account for Veyra.** Do not reuse Denly’s live account as merchant of record.
- Rationale: separate disputes/reserves, Connect marketplace fees, KYC, accounting, and blast-radius if one product is paused.
- PoC shortcut: Veyra Test mode keys only. Never put `sk_` in the mobile app.
- Flow: `POST /api/stripe/setup-intent` → mobile `confirmSetupIntent` → store `customer_id` + `payment_method_id`.
