import type { Metadata } from "next";
import { VerificationBoundaryDiagram } from "@/components/diagrams/VerificationBoundaryDiagram";
import { SecurityReviewFriendlySection } from "@/components/trust/SecurityReviewFriendlySection";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { SITE_URL, OG_IMAGES, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Kobbopay approaches merchant security: 2FA for sensitive actions, signed webhooks, encrypted API key material at rest, operational controls, and honest boundaries — without unverifiable compliance theater.",
  alternates: { canonical: `${SITE_URL}/security` },
  openGraph: {
    title: "Security — Kobbopay",
    description: "Security practices and boundaries for Kobbopay B2B crypto payment infrastructure.",
    url: `${SITE_URL}/security`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security — Kobbopay",
    description: "Security practices for Kobbopay merchants and integrators.",
    images: [OG_IMAGE.url],
  },
};

export default function SecurityPage() {
  return (
    <>
      <Section tone="default" className="pt-10 sm:pt-16">
        <Container>
          <h1 className="text-display font-semibold tracking-tight text-primary">Security</h1>
          <p className="mt-4 max-w-3xl text-body text-muted">
            Kobbopay is infrastructure for moving value with software controls. This page describes
            high-level practices and boundaries — not a substitute for your own security program,
            vendor review, or legal advice.
          </p>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="space-y-8">
          <Card>
            <h2 className="text-h2 font-semibold text-primary">Never share secrets with anyone</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Kobbopay and legitimate vendors will never ask for your seed phrase, private keys, raw
              API secrets in email or chat, or remote control of your wallets. If someone does, it is
              a scam — stop and contact your security team.
            </p>
          </Card>

          <Card>
            <VerificationBoundaryDiagram />
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">What we emphasize</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>
                <strong className="text-primary">2FA for sensitive merchant actions</strong> where
                enabled in your deployment (for example, actions that can move or commit funds).
              </li>
              <li>
                <strong className="text-primary">Signed webhooks</strong> so your servers can
                authenticate lifecycle events before updating internal systems.
              </li>
              <li>
                <strong className="text-primary">API key material handled as secrets</strong>{" "}
                (stored encrypted at rest in the product architecture; integrated only from your
                backend).
              </li>
              <li>
                <strong className="text-primary">Operational controls</strong> aligned to risk:
                merchant approval, selected rails, and operator-mediated steps where your model
                requires them.
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">What Kobbopay does not claim</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>We do not claim a specific license, regulator status, or audit outcome on this site.</li>
              <li>We do not claim “bank-grade” security as a marketing label.</li>
              <li>We do not promise universal instant payouts or guaranteed finality across all chains.</li>
              <li>We do not publish open-ended multi-asset inventory claims on this marketing site.</li>
            </ul>
          </Card>

          <SecurityReviewFriendlySection variant="compact" />

          <p className="text-sm text-muted">
            Webhook verification overview:{" "}
            <Link href="/docs#webhook-verification">
              /docs#webhook-verification
            </Link>
            . Developers:{" "}
            <Link href="/developers">
              Integration principles
            </Link>
            . Contact:{" "}
            <Link href="/contact#merchant-intake" conv="request_access_click">
              Request access
            </Link>
            .
          </p>
        </Container>
      </Section>
    </>
  );
}
