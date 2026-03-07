'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const footerLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: 'mailto:support@speakeasyapp.in' },
];

export default function Footer() {
  const pathname = usePathname();

  // Hide footer on certain pages where it would be distracting
  const hideFooterOn = ['/placement-test', '/tests', '/onboarding'];
  if (hideFooterOn.some((p) => pathname?.startsWith(p))) return null;

  return (
    <footer className="mt-auto border-t border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="text-center sm:text-left">
            <span className="text-lg font-bold text-indigo-600">SpeakEasy</span>
            <p className="text-xs text-gray-400 mt-1">Learn English step by step</p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-500">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-indigo-600 transition-colors"
                {...(link.href.startsWith('mailto:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} SpeakEasy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
