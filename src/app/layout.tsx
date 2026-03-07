import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/components/AuthProvider";
import ServiceWorkerRegistration from "@/components/ServiceWorker";
import NotificationPrompt from "@/components/NotificationPrompt";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SpeakEasy - Learn English for India",
    template: "%s | SpeakEasy",
  },
  description:
    "Master English step by step with lessons in your language. Built for India. CEFR-based proficiency levels from A1 to C1.",
  keywords: [
    "learn english",
    "english for india",
    "ESL",
    "CEFR",
    "vocabulary",
    "grammar",
    "english learning app",
    "learn english online",
    "english for beginners",
    "IELTS preparation",
    "spoken english india",
  ],
  authors: [{ name: "SpeakEasy" }],
  creator: "SpeakEasy",
  metadataBase: new URL("https://speakeasyapp.in"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "SpeakEasy",
    title: "SpeakEasy - Learn English for India",
    description:
      "Master English step by step with lessons in your language. Built for India. CEFR-based proficiency levels from A1 to C1.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SpeakEasy - Learn English for India",
    description:
      "Master English step by step with lessons in your language. Built for India.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SpeakEasy" />
        <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-gray-50 text-gray-900 antialiased flex flex-col`}
      >
        <AuthProvider>
          <ServiceWorkerRegistration />
          <NotificationPrompt />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
