'use client';

import { useState, useEffect } from 'react';
import { useAppStore } from '@/lib/store';
import { isPro } from '@/lib/subscription';
import Link from 'next/link';
import {
  Crown, Check, X, Sparkles, ArrowRight, Loader2, CheckCircle2,
  BookOpen, Brain, Headphones, BookOpenCheck, Gamepad2, Target, BarChart3,
} from 'lucide-react';

export default function PricingPage() {
  const { user, profile, loading } = useAppStore();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'canceled'>('idle');

  // Read query params on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('success') === '1') setStatus('success');
    if (params.get('canceled') === '1') setStatus('canceled');
  }, []);

  // Refresh profile after successful checkout
  useEffect(() => {
    if (status === 'success') {
      const { refreshProfile } = useAppStore.getState();
      // Give webhook a moment to process
      const timer = setTimeout(() => refreshProfile(), 2000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const userIsPro = isPro(profile);

  const handleUpgrade = async () => {
    if (!user || !profile) return;
    setCheckoutLoading(true);
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: profile.displayName,
        }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error);
        setCheckoutLoading(false);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setCheckoutLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
      </div>
    );
  }

  // Success banner
  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Welcome to Pro!</h1>
        <p className="text-gray-500 mb-8">
          Your subscription is now active. All content and features are unlocked.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          Go to Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Choose Your Plan
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Start learning for free. Upgrade to Pro to unlock all levels, skills, and unlimited practice.
        </p>
        {status === 'canceled' && (
          <p className="text-amber-600 mt-3 text-sm">
            Checkout was canceled. You can try again whenever you&apos;re ready.
          </p>
        )}
      </div>

      {/* Plan Cards */}
      <div className="grid sm:grid-cols-2 gap-8 max-w-3xl mx-auto">
        {/* Free Plan */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 relative">
          <h2 className="text-xl font-bold text-gray-800 mb-1">Free</h2>
          <p className="text-gray-400 text-sm mb-6">Get started with the basics</p>
          <div className="mb-8">
            <span className="text-4xl font-bold text-gray-800">₹0</span>
            <span className="text-gray-400 ml-1">/ forever</span>
          </div>

          <ul className="space-y-3 mb-8">
            <FeatureRow included icon={BookOpen}>A1 & A2 Vocabulary</FeatureRow>
            <FeatureRow included icon={Brain}>A1 & A2 Grammar</FeatureRow>
            <FeatureRow included icon={Gamepad2}>4 Daily Games</FeatureRow>
            <FeatureRow included icon={Target}>1 Daily Practice / day</FeatureRow>
            <FeatureRow included icon={BarChart3}>Progress & Streaks</FeatureRow>
            <FeatureRow icon={BookOpenCheck}>B1–C2 Content</FeatureRow>
            <FeatureRow icon={Headphones}>Listening Exercises</FeatureRow>
            <FeatureRow icon={BookOpenCheck}>Reading Passages</FeatureRow>
            <FeatureRow icon={Gamepad2}>Unlimited Practice Mode</FeatureRow>
            <FeatureRow icon={Target}>Unlimited Daily Practice</FeatureRow>
          </ul>

          {!user ? (
            <Link
              href="/signup"
              className="block w-full text-center py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
            >
              Sign Up Free
            </Link>
          ) : (
            <div className="text-center py-3 text-gray-400 text-sm font-medium">
              {userIsPro ? 'Your previous plan' : 'Your current plan'}
            </div>
          )}
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-2xl border-2 border-indigo-500 p-8 relative shadow-lg shadow-indigo-100">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5" /> RECOMMENDED
            </span>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-1">Pro</h2>
          <p className="text-gray-400 text-sm mb-6">Everything unlocked</p>
          <div className="mb-8">
            <span className="text-4xl font-bold text-gray-800">₹499</span>
            <span className="text-gray-400 ml-1">/ year</span>
            <p className="text-xs text-gray-400 mt-1">That&apos;s less than ₹42/month</p>
          </div>

          <ul className="space-y-3 mb-8">
            <FeatureRow included icon={BookOpen}>A1 & A2 Vocabulary</FeatureRow>
            <FeatureRow included icon={Brain}>A1 & A2 Grammar</FeatureRow>
            <FeatureRow included icon={Gamepad2}>4 Daily Games</FeatureRow>
            <FeatureRow included icon={Target}>1 Daily Practice / day</FeatureRow>
            <FeatureRow included icon={BarChart3}>Progress & Streaks</FeatureRow>
            <FeatureRow included icon={BookOpenCheck}>B1–C2 Content</FeatureRow>
            <FeatureRow included icon={Headphones}>Listening Exercises</FeatureRow>
            <FeatureRow included icon={BookOpenCheck}>Reading Passages</FeatureRow>
            <FeatureRow included icon={Gamepad2}>Unlimited Practice Mode</FeatureRow>
            <FeatureRow included icon={Target}>Unlimited Daily Practice</FeatureRow>
          </ul>

          {userIsPro ? (
            <div className="text-center py-3 text-indigo-600 font-medium flex items-center justify-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Active
            </div>
          ) : !user ? (
            <Link
              href="/signup"
              className="block w-full text-center py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-md"
            >
              Sign Up & Upgrade
            </Link>
          ) : (
            <button
              onClick={handleUpgrade}
              disabled={checkoutLoading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-md disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {checkoutLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Redirecting…
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Upgrade to Pro
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-2xl mx-auto mt-16">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FaqItem q="Can I cancel anytime?">
            Yes! You can cancel your Pro subscription at any time. You&apos;ll keep Pro access until the end of your billing period.
          </FaqItem>
          <FaqItem q="Is there a free trial?">
            The Free tier itself is your trial — use all A1 & A2 content and daily games at no cost, forever. Upgrade when you&apos;re ready for more.
          </FaqItem>
          <FaqItem q="What payment methods do you accept?">
            We accept all major credit/debit cards and UPI through our secure payment partner, Stripe.
          </FaqItem>
          <FaqItem q="Will there be ads?">
            No. SpeakEasy is 100% ad-free on both Free and Pro tiers.
          </FaqItem>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({
  children,
  included,
  icon: Icon,
}: {
  children: React.ReactNode;
  included?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
}) {
  return (
    <li className="flex items-center gap-3 text-sm">
      {included ? (
        <Check className="w-4.5 h-4.5 text-green-500 shrink-0" />
      ) : (
        <X className="w-4.5 h-4.5 text-gray-300 shrink-0" />
      )}
      {Icon && <Icon className={`w-4 h-4 shrink-0 ${included ? 'text-gray-500' : 'text-gray-300'}`} />}
      <span className={included ? 'text-gray-700' : 'text-gray-400'}>{children}</span>
    </li>
  );
}

function FaqItem({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <details className="bg-white rounded-xl border border-gray-100 group">
      <summary className="px-5 py-4 cursor-pointer font-medium text-gray-700 hover:text-indigo-600 transition list-none flex items-center justify-between">
        {q}
        <ArrowRight className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-90" />
      </summary>
      <div className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
        {children}
      </div>
    </details>
  );
}
