import { NextRequest, NextResponse } from 'next/server';
import { getStripe, stripeConfigured } from '@/lib/stripe';

export const runtime = 'nodejs';

/**
 * Creates (or reuses) a Stripe Customer + SetupIntent for card-on-file.
 * Body: { customerId?: string; email?: string; name?: string; phone?: string }
 */
export async function POST(req: NextRequest) {
  try {
    if (!stripeConfigured()) {
      return NextResponse.json(
        {
          error:
            'Stripe no configurado. Crea una cuenta Veyra y define STRIPE_SECRET_KEY.',
        },
        { status: 503 },
      );
    }

    const body = (await req.json().catch(() => ({}))) as {
      customerId?: string;
      email?: string;
      name?: string;
      phone?: string;
    };

    const stripe = getStripe();
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
        metadata: {
          product: 'veyra-consumer',
          source: 'mobile-add-card',
        },
      });
      customerId = customer.id;
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
      usage: 'off_session',
      metadata: {
        product: 'veyra-consumer',
      },
    });

    return NextResponse.json({
      customerId,
      setupIntentId: setupIntent.id,
      clientSecret: setupIntent.client_secret,
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    console.error('[stripe/setup-intent]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
