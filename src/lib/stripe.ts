import Stripe from 'stripe';

// Lazy-init to avoid throwing at build time when env vars may not be set
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error('STRIPE_SECRET_KEY is not set');
    _stripe = new Stripe(key, { apiVersion: '2026-02-25.clover', typescript: true });
  }
  return _stripe;
}

/** @deprecated — use getStripe() for lazy init */
export const stripe = {
  get checkout() { return getStripe().checkout; },
  get customers() { return getStripe().customers; },
  get subscriptions() { return getStripe().subscriptions; },
  get webhooks() { return getStripe().webhooks; },
} as unknown as Stripe;

// ₹499/year Pro plan — set this to your actual Stripe Price ID
export const PRO_PRICE_ID = process.env.STRIPE_PRO_PRICE_ID || '';
