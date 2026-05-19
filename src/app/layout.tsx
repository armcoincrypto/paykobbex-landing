import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/primitives/Navbar";
import { Footer } from "@/components/primitives/Footer";
import { AnalyticsRoot } from "@/components/analytics/AnalyticsRoot";
import { RouteIntentBeacon } from "@/components/analytics/RouteIntentBeacon";
import { OG_IMAGES, OG_IMAGE } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pay.kobbex.com"),
  title: {
    default: "Kobbopay — B2B crypto payment infrastructure",
    template: "%s — Kobbopay",
  },
  description:
    "API-first B2B crypto payments with explicit lifecycles, signed webhooks, and merchant operations. Access is subject to approval; rails are enabled per environment.",
  openGraph: {
    title: "Kobbopay — B2B crypto payment infrastructure",
    description:
      "Payment API, lifecycle clarity, and merchant operations for serious businesses — on selected rails where enabled.",
    url: "https://pay.kobbex.com",
    siteName: "Kobbopay",
    locale: "en_US",
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kobbopay — B2B crypto payment infrastructure",
    description:
      "API-first B2B crypto payments with explicit lifecycles and signed webhooks.",
    images: [OG_IMAGE.url],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col font-sans`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 outline-none">
          {children}
        </main>
        <Footer />
        <div className="print:hidden">
          <Suspense fallback={null}>
            <RouteIntentBeacon />
          </Suspense>
          <AnalyticsRoot />
        </div>
      </body>
    </html>
  );
}
