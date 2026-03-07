import { NextRequest, NextResponse } from 'next/server';
import { stripe, PRO_PRICE_ID } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { uid, email, displayName } = await req.json();

    if (!uid || !email) {
      return NextResponse.json({ error: 'Missing uid or email' }, { status: 400 });
    }

    if (!PRO_PRICE_ID) {
      return NextResponse.json({ error: 'Stripe Price ID not configured' }, { status: 500 });
    }

    // Look up existing Stripe customer by email, or create one
    const existingCustomers = await stripe.customers.list({ email, limit: 1 });
    let customerId: string;

    if (existingCustomers.data.length > 0) {
      customerId = existingCustomers.data[0].id;
    } else {
      const customer = await stripe.customers.create({
        email,
        name: displayName || undefined,
        metadata: { firebaseUid: uid },
      });
      customerId = customer.id;
    }

    // Create Checkout Session
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: 'subscription',
        line_items: [{ price: PRO_PRICE_ID, quantity: 1 }],
        success_url: `${origin}/pricing?success=1`,
        cancel_url: `${origin}/pricing?canceled=1`,
        metadata: { firebaseUid: uid },
        subscription_data: {
          metadata: { firebaseUid: uid },
        },
      });
    } catch (checkoutErr: unknown) {
      // Currency mismatch — create a fresh customer and retry
      const msg = checkoutErr instanceof Error ? checkoutErr.message : '';
      if (msg.includes('cannot combine currencies') || msg.includes('currency')) {
        const freshCustomer = await stripe.customers.create({
          email,
          name: displayName || undefined,
          metadata: { firebaseUid: uid },
        });
        customerId = freshCustomer.id;
        session = await stripe.checkout.sessions.create({
          customer: customerId,
          mode: 'subscription',
          line_items: [{ price: PRO_PRICE_ID, quantity: 1 }],
          success_url: `${origin}/pricing?success=1`,
          cancel_url: `${origin}/pricing?canceled=1`,
          metadata: { firebaseUid: uid },
          subscription_data: {
            metadata: { firebaseUid: uid },
          },
        });
      } else {
        throw checkoutErr;
      }
    }

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    console.error('Stripe checkout error:', err);
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
