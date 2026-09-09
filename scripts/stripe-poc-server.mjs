/**
 * Minimal Stripe PoC API for physical-device testing.
 * Avoids Next.js watchers (EMFILE) — stable origin for cloudflared.
 *
 *   node scripts/stripe-poc-server.mjs
 *   cloudflared tunnel --url http://127.0.0.1:8787
 */
import http from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import Stripe from 'stripe';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const envPath = resolve(root, '.env.local');

function loadEnv() {
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!m) continue;
    if (!process.env[m[1]]) process.env[m[1]] = m[2].replace(/^"|"$/g, '');
  }
}

loadEnv();

const PORT = Number(process.env.STRIPE_POC_PORT || 8787);
const secret = process.env.STRIPE_SECRET_KEY;
const publishable = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || null;

if (!secret) {
  console.error('Missing STRIPE_SECRET_KEY in .env.local');
  process.exit(1);
}

const stripe = new Stripe(secret, { apiVersion: '2025-02-24.acacia' });

function send(res, status, body) {
  const json = JSON.stringify(body);
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  });
  res.end(json);
}

async function readJson(req) {
  const chunks = [];
  for await (const c of req) chunks.push(c);
  if (!chunks.length) return {};
  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return {};
  }
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  if (req.method === 'OPTIONS') {
    send(res, 204, {});
    return;
  }

  try {
    if (req.method === 'POST' && url.pathname === '/api/stripe/setup-intent') {
      const body = await readJson(req);
      let customerId = (body.customerId || '').trim();
      if (customerId) {
        try {
          await stripe.customers.retrieve(customerId);
        } catch {
          customerId = '';
        }
      }
      if (!customerId) {
        const customer = await stripe.customers.create({
          name: body.name || undefined,
          email: body.email || undefined,
          phone: body.phone || undefined,
          metadata: { product: 'veyra-consumer', source: 'poc-server' },
        });
        customerId = customer.id;
      }
      const setupIntent = await stripe.setupIntents.create({
        customer: customerId,
        payment_method_types: ['card'],
        usage: 'off_session',
        metadata: { product: 'veyra-consumer' },
      });
      send(res, 200, {
        customerId,
        setupIntentId: setupIntent.id,
        clientSecret: setupIntent.client_secret,
        publishableKey: publishable,
      });
      return;
    }

    if (req.method === 'GET' && url.pathname === '/api/stripe/payment-method') {
      const paymentMethodId = url.searchParams.get('paymentMethodId');
      if (!paymentMethodId) {
        send(res, 400, { error: 'paymentMethodId requerido' });
        return;
      }
      const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
      const card = pm.card;
      send(res, 200, {
        id: pm.id,
        brand: card?.brand ?? 'card',
        last4: card?.last4 ?? '0000',
        expMonth: card?.exp_month ?? null,
        expYear: card?.exp_year ?? null,
        funding: card?.funding ?? null,
        customerId:
          typeof pm.customer === 'string' ? pm.customer : pm.customer?.id ?? null,
      });
      return;
    }

    send(res, 404, { error: 'Not found' });
  } catch (err) {
    send(res, 500, { error: err instanceof Error ? err.message : 'error' });
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Veyra Stripe PoC API on http://127.0.0.1:${PORT}`);
});
