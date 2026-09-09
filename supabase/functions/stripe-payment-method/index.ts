// GET ?paymentMethodId=pm_xxx
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
      return new Response(JSON.stringify({ error: 'Missing STRIPE_SECRET_KEY' }), {
        status: 503,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const url = new URL(req.url);
    const paymentMethodId = url.searchParams.get('paymentMethodId');
    if (!paymentMethodId) {
      return new Response(JSON.stringify({ error: 'paymentMethodId requerido' }), {
        status: 400,
        headers: { ...cors, 'Content-Type': 'application/json' },
      });
    }

    const stripe = new Stripe(secret, {
      apiVersion: '2025-02-24.acacia',
      httpClient: Stripe.createFetchHttpClient(),
    });

    const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
    const card = pm.card;

    return new Response(
      JSON.stringify({
        id: pm.id,
        brand: card?.brand ?? 'card',
        last4: card?.last4 ?? '0000',
        expMonth: card?.exp_month ?? null,
        expYear: card?.exp_year ?? null,
        funding: card?.funding ?? null,
        customerId:
          typeof pm.customer === 'string' ? pm.customer : pm.customer?.id ?? null,
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
