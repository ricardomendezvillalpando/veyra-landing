// Supabase Edge Function — Stripe SetupIntent for Veyra consumer PoC.
// Deploy: supabase functions deploy stripe-setup-intent --project-ref <veyra-ref>
// Secrets: STRIPE_SECRET_KEY, (optional) STRIPE_PUBLISHABLE_KEY
//
// POST JSON: { customerId?, name?, email?, phone? }
// → { customerId, setupIntentId, clientSecret, publishableKey }

import Stripe from 'https://esm.sh/stripe@17.7.0?target=deno';

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: cors });
  }

  try {
    const secret = Deno.env.get('STRIPE_SECRET_KEY');
    if (!secret) {
      return new Response(
        JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY' }),
        { status: 503, headers: { ...cors, 'Content-Type': 'application/json' } },
      );
    }

    const stripe = new Stripe(secret, {
      apiVersion: '2025-02-24.acacia',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const body = (await req.json().catch(() => ({}))) as {
      customerId?: string;
      name?: string;
      email?: string;
      phone?: string;
    };

    let customerId = body.customerId?.trim() || '';
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
        metadata: { product: 'veyra-consumer', source: 'supabase-edge' },
      });
      customerId = customer.id;
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
      usage: 'off_session',
      metadata: { product: 'veyra-consumer' },
    });

    return new Response(
      JSON.stringify({
        customerId,
        setupIntentId: setupIntent.id,
        clientSecret: setupIntent.client_secret,
        publishableKey: Deno.env.get('STRIPE_PUBLISHABLE_KEY') ?? null,
      }),
      { headers: { ...cors, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }
});
