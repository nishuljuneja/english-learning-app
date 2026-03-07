'use client';

import Link from 'next/link';
import { Crown, Lock, ArrowRight } from 'lucide-react';

interface ProGateProps {
  /** What feature is being locked */
  feature?: string;
  /** Compact inline style vs full-page style */
  compact?: boolean;
  className?: string;
}

/**
 * Shows an upgrade-to-Pro prompt. Use this to gate locked features.
 */
export default function ProGate({ feature, compact, className }: ProGateProps) {
  if (compact) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-xl text-sm ${className || ''}`}>
        <Lock className="w-4 h-4 text-indigo-400" />
        <span className="text-indigo-700 font-medium">
          {feature ? `${feature} requires ` : ''}Pro
        </span>
        <Link
          href="/pricing"
          className="ml-auto text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
        >
          Upgrade <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  return (
    <div className={`text-center py-16 ${className || ''}`}>
      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
        <Crown className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {feature ? `${feature} — ` : ''}Pro Feature
      </h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">
        Upgrade to SpeakEasy Pro to unlock {feature ? feature.toLowerCase() : 'this feature'} and all content from B1 to C2.
      </p>
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-md"
      >
        <Crown className="w-5 h-5" />
        Upgrade to Pro — ₹499/year
      </Link>
    </div>
  );
}

/**
 * Small "PRO" badge to overlay on locked buttons
 */
export function ProBadge({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 text-[10px] font-bold bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-1.5 py-0.5 rounded-full ${className || ''}`}>
      <Crown className="w-2.5 h-2.5" />
      PRO
    </span>
  );
}
