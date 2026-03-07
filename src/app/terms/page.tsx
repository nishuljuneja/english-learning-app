import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - SpeakEasy',
  description: 'Terms of service for SpeakEasy, the English learning app.',
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Terms of Service</h1>
      <p className="text-sm text-gray-400 mb-8">Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

      <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">1. Acceptance of Terms</h2>
          <p>
            By accessing or using SpeakEasy (&ldquo;the App&rdquo;), you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use the App.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">2. Description of Service</h2>
          <p>
            SpeakEasy is a free English learning platform designed for learners in India. The App provides
            vocabulary building, grammar lessons, reading comprehension, listening practice, speaking exercises,
            writing activities, and proficiency testing based on the CEFR framework (A1–C1).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">3. User Accounts</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>You must create an account to use the App&apos;s features.</li>
            <li>You may sign in using Google or email/password authentication.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You agree to provide accurate and complete information when creating your account.</li>
            <li>You must notify us immediately of any unauthorised use of your account.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">4. Acceptable Use</h2>
          <p>You agree not to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Use the App for any unlawful purpose</li>
            <li>Attempt to gain unauthorised access to any part of the App</li>
            <li>Interfere with or disrupt the App&apos;s functionality</li>
            <li>Reverse engineer, decompile, or disassemble any part of the App</li>
            <li>Use automated scripts or bots to interact with the App</li>
            <li>Misrepresent your identity or impersonate another person</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">5. Intellectual Property</h2>
          <p>
            All content, features, and functionality of the App — including but not limited to text, graphics,
            logos, icons, exercises, and software — are owned by SpeakEasy and are protected by applicable intellectual
            property laws. You may not reproduce, distribute, or create derivative works from our content without
            explicit permission.
          </p>
          <p className="mt-2">
            Vocabulary data is sourced from the Oxford 3000 and Oxford 5000 word lists. Word definitions are
            sourced from publicly available dictionary APIs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">6. Learning Content</h2>
          <p>
            The App provides educational content for English language learning. While we strive for accuracy,
            we do not guarantee that all content is error-free. The App is not a substitute for formal language
            education or certified language assessment.
          </p>
          <p className="mt-2">
            CEFR level assessments provided by the App are approximate and intended for self-study guidance only.
            They do not constitute official CEFR certification.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">7. Privacy</h2>
          <p>
            Your use of the App is also governed by our{' '}
            <Link href="/privacy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </Link>
            , which describes how we collect, use, and protect your personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">8. Availability & Modifications</h2>
          <p>
            We reserve the right to modify, suspend, or discontinue the App (or any part of it) at any time,
            with or without notice. We shall not be liable for any modification, suspension, or discontinuation
            of the App.
          </p>
          <p className="mt-2">
            We may update these Terms from time to time. Continued use of the App after changes are posted
            constitutes your acceptance of the revised terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">9. Disclaimer of Warranties</h2>
          <p>
            The App is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without any warranties of any kind,
            either express or implied, including but not limited to implied warranties of merchantability,
            fitness for a particular purpose, or non-infringement.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">10. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by applicable law, SpeakEasy shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, or any loss of profits or data, arising
            out of or in connection with your use of the App.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes
            arising from these Terms shall be subject to the exclusive jurisdiction of the courts in India.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-3">12. Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at{' '}
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
