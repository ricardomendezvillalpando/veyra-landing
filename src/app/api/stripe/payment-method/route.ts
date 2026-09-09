import { NextRequest, NextResponse } from 'next/server';
import { getStripe, stripeConfigured } from '@/lib/stripe';

export const runtime = 'nodejs';

/**
 * After SetupIntent confirmation, return safe card metadata for the wallet UI.
 * Query: ?paymentMethodId=pm_xxx
 */
export async function GET(req: NextRequest) {
  try {
    if (!stripeConfigured()) {
      return NextResponse.json(
        { error: 'Stripe no configurado' },
        { status: 503 },
      );
    }

    const paymentMethodId = req.nextUrl.searchParams.get('paymentMethodId');
    if (!paymentMethodId) {
      return NextResponse.json(
        { error: 'paymentMethodId requerido' },
        { status: 400 },
      );
    }

    const stripe = getStripe();
    const pm = await stripe.paymentMethods.retrieve(paymentMethodId);
    const card = pm.card;

    return NextResponse.json({
      id: pm.id,
      brand: card?.brand ?? 'card',
      last4: card?.last4 ?? '0000',
      expMonth: card?.exp_month ?? null,
      expYear: card?.exp_year ?? null,
      funding: card?.funding ?? null,
      customerId:
        typeof pm.customer === 'string' ? pm.customer : pm.customer?.id ?? null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Stripe error';
    console.error('[stripe/payment-method]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
