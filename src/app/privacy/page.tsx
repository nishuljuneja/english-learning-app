import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - SpeakEasy',
  description: 'Privacy policy for SpeakEasy, the English learning app.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">1. Introduction</h2>
          <p>
            Welcome to SpeakEasy (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;). We are committed to protecting your privacy.
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our
            English learning application.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">2. Information We Collect</h2>
          <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">2.1 Account Information</h3>
          <p>When you create an account, we collect:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your name and email address</li>
            <li>Profile picture (if you sign in with Google)</li>
            <li>Authentication credentials managed by Firebase Authentication</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">2.2 Learning Data</h3>
          <p>As you use the app, we collect and store:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Your CEFR proficiency level and diagnostic test results</li>
            <li>Vocabulary words learned and review progress</li>
            <li>Grammar, reading, listening, speaking, and writing lesson progress</li>
            <li>XP points, streaks, and skill scores</li>
          </ul>

          <h3 className="text-lg font-medium text-gray-700 mt-4 mb-2">2.3 Usage Data</h3>
          <p>
            We may collect information about how you interact with the app, including pages visited, features used,
            and time spent on activities.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">3. How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide personalized learning experiences based on your level</li>
            <li>Track your learning progress and maintain streaks</li>
            <li>Implement spaced repetition for vocabulary review</li>
            <li>Display leaderboards and progress analytics</li>
            <li>Improve our content and features</li>
            <li>Communicate important updates about the service</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">4. Data Storage & Security</h2>
          <p>
            Your data is stored securely using Google Firebase (Firestore and Authentication). Firebase
            infrastructure is hosted on Google Cloud Platform and provides enterprise-grade security, including
            encryption at rest and in transit.
          </p>
          <p className="mt-2">
            We implement appropriate technical and organisational measures to protect your personal data against
            unauthorised access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">5. Cookies & Local Storage</h2>
          <p>We use browser local storage to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Remember your preferred UI language</li>
            <li>Store progress test history locally on your device</li>
            <li>Maintain your authentication session</li>
          </ul>
          <p className="mt-2">
            We do not use tracking cookies or third-party advertising cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">6. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Firebase Authentication</strong> — for secure sign-in (Google and email/password)</li>
            <li><strong>Cloud Firestore</strong> — for storing user data and learning progress</li>
            <li><strong>Vercel</strong> — for hosting and serving the application</li>
          </ul>
          <p className="mt-2">
            These services have their own privacy policies and we recommend reviewing them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">7. Children&apos;s Privacy</h2>
          <p>
            Our app is intended for users of all ages who wish to learn English. If you are under 13 years of age,
            please use the app under the supervision of a parent or guardian. We do not knowingly collect personal
            data from children under 13 without parental consent.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">8. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and associated data</li>
            <li>Export your learning data</li>
            <li>Withdraw consent for data processing</li>
          </ul>
          <p className="mt-2">
            To exercise any of these rights, please contact us at{' '}
            <a href="mailto:support@speakeasyapp.in" className="text-indigo-600 hover:underline">
              support@speakeasyapp.in
            </a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">9. Data Retention</h2>
          <p>
            We retain your personal data for as long as your account is active. If you delete your account,
            we will remove your data within 30 days, except where we are required to retain it by law.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any significant changes
            by posting a notice in the app. Your continued use of the app after changes are posted constitutes
            acceptance of the revised policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@speakeasyapp.in" className="text-indigo-600 hover:underline">
              support@speakeasyapp.in
            </a>.
          </p>
        </section>
      </div>

      <div className="mt-12 pt-6 border-t border-gray-200">
        <Link href="/dashboard" className="text-indigo-600 hover:underline text-sm">
          ← Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
