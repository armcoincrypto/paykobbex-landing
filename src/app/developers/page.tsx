import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { WebhookFlowDiagram } from "@/components/diagrams/WebhookFlowDiagram";
import { Card } from "@/components/primitives/Card";
import { CodePanel } from "@/components/primitives/CodePanel";
import { Container } from "@/components/primitives/Container";
import { CTAGroup } from "@/components/primitives/CTAGroup";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { SITE_URL, OG_IMAGES, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Developers",
  description:
    "Kobbopay developer hub: integration principles, illustrative API sketches, and links to the public integration docs at /docs — plus paths to request access for environment-specific materials.",
  alternates: { canonical: `${SITE_URL}/developers` },
  openGraph: {
    title: "Developers — Kobbopay",
    description: "Server-to-server API integration, webhooks, and lifecycle semantics for B2B crypto payments.",
    url: `${SITE_URL}/developers`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Developers — Kobbopay",
    description: "API integration overview for Kobbopay B2B crypto payments.",
    images: [OG_IMAGE.url],
  },
};

const createPaymentExample = `curl -sS -X POST "https://api.example.com/v1/payments" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "amount": 10.5,
    "currency": "USDT",
    "network": "example-network",
    "orderId": "order-123"
  }'`;

const webhookVerifyExample = `// Verify HMAC over the raw JSON body bytes (example shape only)
const crypto = require("crypto");

function verifyWebhook(rawBody, signatureHeader, secret) {
  const expected = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");
  // Production: enforce equal buffer lengths before timingSafeEqual
  return crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expected));
}

// secret = YOUR_WEBHOOK_SECRET (never ship to browsers)`;

export default function DevelopersPage() {
  return (
    <>
      <Section tone="default" className="pt-10 sm:pt-16">
        <Container>
          <h1 className="text-display font-semibold tracking-tight text-primary">Developers</h1>
          <p className="mt-4 max-w-3xl text-body text-muted">
            Kobbopay is designed for server-to-server integrations: your backend creates payments,
            consumes signed webhooks, and reconciles using explicit lifecycle semantics. Start with the{" "}
            <Link href="/docs">
              integration docs
            </Link>{" "}
            for a CTO-friendly overview, then request access for environment-specific materials.
          </p>
          <CTAGroup className="mt-6">
            <Link href="/docs" variant="button-primary" className="no-underline">
              Read integration docs
            </Link>
            <Link href="/contact#merchant-intake" variant="button-secondary" className="no-underline" conv="request_access_click">
              Request access
            </Link>
          </CTAGroup>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="space-y-10">
          <Card>
            <h2 className="text-h2 font-semibold text-primary">Integration principles</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>
                <strong className="text-primary">Server-side API keys:</strong> never embed API keys
                in client apps, public repos, or support tickets.
              </li>
              <li>
                <strong className="text-primary">Payment lifecycle:</strong> treat statuses as
                contractually meaningful — do not collapse <strong className="text-primary">Paid</strong>{" "}
                and <strong className="text-primary">Confirmed</strong> if your accounting depends on
                confirmations.
              </li>
              <li>
                <strong className="text-primary">Signed webhooks:</strong> verify signatures using
                the raw received body bytes so you match the signed string exactly.
              </li>
              <li>
                <strong className="text-primary">Retry-aware consumers:</strong> webhook delivery can
                retry; make handlers idempotent using stable identifiers such as{" "}
                <code className="font-mono text-xs text-primary">payment_id</code>.
              </li>
              <li>
                <strong className="text-primary">Public payment status:</strong> a read-only public
                payment view can support payer-facing status pages — without exposing merchant
                secrets.
              </li>
            </ul>
          </Card>

          <div
            className="space-y-10"
            role="region"
            aria-label="Illustrative architecture and signed webhook delivery flows"
          >
            <ArchitectureDiagram variant="compact" />
            <WebhookFlowDiagram variant="compact" />
          </div>

          <div>
            <h2 className="text-h2 font-semibold text-primary">Example: create a payment</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted">
              Placeholders only. Replace host, headers, and payload fields with values appropriate
              to your approved environment and enabled rails.
            </p>
            <CodePanel title="HTTP request (illustrative)" code={createPaymentExample} className="mt-4" />
          </div>

          <div>
            <h2 className="text-h2 font-semibold text-primary">Example: webhook verification (sketch)</h2>
            <p className="mt-2 max-w-3xl text-sm text-muted">
              Your production verifier must match the exact signing contract used by your Kobbopay
              deployment. Treat this as a pattern, not a substitute for official docs.
            </p>
            <CodePanel title="Node.js sketch (illustrative)" code={webhookVerifyExample} className="mt-4" />
          </div>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Docs roadmap</h2>
            <p className="mt-2 text-sm text-muted">
              Public OpenAPI / reference docs and stable anchors will ship after the integration kit
              stabilizes for external citation. This marketing site now hosts a conservative{" "}
              <Link href="/docs">
                /docs overview
              </Link>{" "}
              so teams can align on concepts before contacting us.
            </p>
            <div className="mt-4">
              <Link href="/contact#merchant-intake" variant="button-primary" className="no-underline" conv="request_access_click">
                Request access
              </Link>
            </div>
          </Card>

          <p className="text-sm text-muted">
            Related:{" "}
            <Link href="/docs">
              Integration docs
            </Link>
            , <Link href="/guides">Guides</Link>, <Link href="/glossary">Glossary</Link>,{" "}
            <Link href="/security">Security</Link>, <Link href="/features">Features</Link>.
          </p>
        </Container>
      </Section>
    </>
  );
}
