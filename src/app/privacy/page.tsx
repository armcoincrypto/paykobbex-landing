import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { CONTACT_EMAIL, OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Placeholder privacy notice for pay.kobbex.com: what this marketing site may collect, optional privacy-preserving analytics, retention, and how to contact us — not legal advice.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  openGraph: {
    title: "Privacy — Kobbopay",
    description: "Privacy practices for the Kobbopay marketing site (placeholder notice).",
    url: `${SITE_URL}/privacy`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy — Kobbopay",
    description: "Privacy practices for the Kobbopay marketing site (placeholder notice).",
    images: [OG_IMAGE.url],
  },
};

const updated = "May 2026";

export default function PrivacyPage() {
  const privacyMail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Kobbopay marketing site — privacy question")}`;

  return (
    <>
      <Section tone="default" className="pt-10 sm:pt-16">
        <Container className="max-w-3xl">
          <h1 className="text-display font-semibold tracking-tight text-primary">Privacy</h1>
          <p className="mt-4 text-sm font-medium text-muted">Last updated: {updated}</p>
          <p className="mt-6 text-body leading-relaxed text-muted">
            This page is a <strong className="text-primary">placeholder privacy notice</strong> for
            the public marketing site at {SITE_URL.replace(/^https:\/\//, "")}. It is{" "}
            <strong className="text-primary">not legal advice</strong> and has not been tailored to
            every jurisdiction. Your counsel should review it before you rely on it for compliance
            storytelling.
          </p>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="max-w-3xl space-y-8">
          <Card>
            <h2 className="text-h2 font-semibold text-primary">What this site is</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              pay.kobbex.com publishes product positioning, integration principles, and contact paths.
              It does not process payments, custody funds, or replace the agreements that govern
              merchant accounts in production systems.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Data we may process</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>
                <strong className="text-primary">Server and network telemetry</strong> typical of any
                HTTPS site (for example: IP address, user agent, timestamps, request paths). This is
                primarily operational and security data retained under ordinary infrastructure
                policies.
              </li>
              <li>
                <strong className="text-primary">Email you choose to send us</strong> if you contact
                us. Do not include secrets: never send private keys, seed phrases, API secrets, or
                wallet access credentials.
              </li>
              <li>
                <strong className="text-primary">Optional measurement events</strong> only if you
                explicitly enable a supported provider at build/deploy time (see below). Those
                events are designed as coarse intent labels without wallet addresses, transaction
                identifiers, or API payloads.
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Analytics (optional)</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              By default, this repository does not ship third-party advertising analytics. If
              enabled, we prefer privacy-preserving, first-party-friendly tools such as{" "}
              <strong className="text-primary">Plausible</strong>,{" "}
              <strong className="text-primary">Umami</strong>, or{" "}
              <strong className="text-primary">Cloudflare Web Analytics</strong> — configured without
              cookies where possible and without fingerprinting. We do{" "}
              <strong className="text-primary">not</strong> add common ad-tech remarketing tags unless
              separately approved in writing.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              When enabled, we may record a small set of{" "}
              <strong className="text-primary">conversion intent</strong> labels (for example:
              clicking “Request access”). These labels do not include personal data you type into
              forms (this marketing export does not include a backend intake form).
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Cookies &amp; local storage</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              This static marketing site is designed to avoid unnecessary cookies. Third-party
              tools you enable may set their own technical artifacts; review that vendor’s
              documentation before enabling anything in production.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Retention</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Retention depends on your hosting provider, mail provider, and any analytics vendor
              you enable. There is no guarantee of a specific retention window on this page — your
              operators should map retention to policy.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">International transfers</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Infrastructure providers may process data in multiple countries. If you need
              transfer mechanics for your privacy program, obtain them from your vendor agreements —
              not from this placeholder page.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Children</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              This site is intended for businesses evaluating payment infrastructure and is not
              directed at children.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Changes</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We may update this placeholder to reflect product reality, measurement choices, or
              counsel review. Continued use of the site after changes means you should re-read the
              updated notice (this is standard language; your counsel may prefer different mechanics).
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Contact</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Privacy questions about this marketing site:{" "}
              <Link href={privacyMail} conv="contact_click">
                email {CONTACT_EMAIL}
              </Link>
              . Replace the intake address in code if your team uses a dedicated privacy inbox.
            </p>
            <p className="mt-4 text-sm text-muted">
              Related: <Link href="/terms">Terms</Link> · <Link href="/security">Security</Link> ·{" "}
              <Link href="/contact#merchant-intake" conv="request_access_click">
                Request access
              </Link>
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
}
