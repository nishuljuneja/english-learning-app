import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getAdminDb } from '@/lib/firebase-admin';
import type Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature') || '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return NextResponse.json({ error: `Webhook Error: ${message}` }, { status: 400 });
  }

  const db = getAdminDb();

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        const uid = session.metadata?.firebaseUid;
        if (!uid) break;

        // Retrieve the subscription to get the current period end
        const subscriptionId = session.subscription as string;
        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const expiryDate = new Date(subscription.items.data[0]?.current_period_end
          ? subscription.items.data[0].current_period_end * 1000
          : Date.now() + 365 * 24 * 60 * 60 * 1000
        );

        await db.collection('users').doc(uid).update({
          subscriptionTier: 'pro',
          subscriptionExpiry: expiryDate.toISOString().split('T')[0],
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscriptionId,
        });

        console.log(`[Stripe] Activated Pro for user ${uid}, expires ${expiryDate.toISOString().split('T')[0]}`);
        break;
      }

      case 'invoice.paid': {
        // Renewal payment succeeded — extend subscription
        const invoice = event.data.object as Stripe.Invoice;
        const subscriptionId = (invoice as unknown as Record<string, unknown>).subscription as string | null;
        if (!subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId);
        const uid = subscription.metadata?.firebaseUid;
        if (!uid) break;

        const expiryDate = new Date(subscription.items.data[0]?.current_period_end
          ? subscription.items.data[0].current_period_end * 1000
          : Date.now() + 365 * 24 * 60 * 60 * 1000
        );

        await db.collection('users').doc(uid).update({
          subscriptionTier: 'pro',
          subscriptionExpiry: expiryDate.toISOString().split('T')[0],
        });

        console.log(`[Stripe] Renewed Pro for user ${uid}, new expiry ${expiryDate.toISOString().split('T')[0]}`);
        break;
      }

      case 'customer.subscription.deleted': {
        // Subscription cancelled or expired
        const subscription = event.data.object as Stripe.Subscription;
        const uid = subscription.metadata?.firebaseUid;
        if (!uid) break;

        await db.collection('users').doc(uid).update({
          subscriptionTier: 'free',
          stripeSubscriptionId: null,
        });

        console.log(`[Stripe] Downgraded user ${uid} to free tier`);
        break;
      }

      default:
        // Unhandled event type — acknowledge and ignore
        break;
    }
  } catch (err) {
    console.error(`[Stripe] Error processing ${event.type}:`, err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
