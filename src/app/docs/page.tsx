import type { Metadata } from "next";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { LifecycleDiagram } from "@/components/diagrams/LifecycleDiagram";
import { WebhookFlowDiagram } from "@/components/diagrams/WebhookFlowDiagram";
import { CodePanel } from "@/components/primitives/CodePanel";
import { Container } from "@/components/primitives/Container";
import { CTAGroup } from "@/components/primitives/CTAGroup";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import {
  CodeInstrumentPanel,
  OperationalDocNav,
  OperationalPageHeader,
  OperationalProseSection,
  WebhookVerificationExplorer,
} from "@/components/operational";
import { EnvironmentRolloutNote, OperationalGovernancePanel, ProductionRealityNote } from "@/components/realism";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integration docs",
  description:
    "Kobbopay integration overview: concepts, payment lifecycle, creating and reading payments, signed webhooks, verification, retries, and idempotency — not a full API reference.",
  alternates: { canonical: `${SITE_URL}/docs` },
  openGraph: {
    title: "Integration docs — Kobbopay",
    description:
      "Technical overview for CTOs and developers: lifecycle, webhooks, verification patterns, and trust boundaries before production reference docs ship.",
    url: `${SITE_URL}/docs`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integration docs — Kobbopay",
    description: "Integration overview for Kobbopay B2B crypto payments (not full API reference).",
    images: [OG_IMAGE.url],
  },
};

const breadcrumbJson = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: `${SITE_URL}/`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Integration docs",
      item: `${SITE_URL}/docs`,
    },
  ],
};

const createPaymentExample = `curl -sS -X POST "https://api.example.com/v1/payments" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: YOUR_API_KEY" \\
  -d '{
    "amount": "10.50",
    "currency": "USDT",
    "network": "example-network",
    "orderId": "order-123"
  }'`;

const readPaymentExample = `curl -sS "https://api.example.com/v1/payments/payment_id" \\
  -H "x-api-key: YOUR_API_KEY"`;

const webhookHandlerExample = `// Express-style sketch: read raw bytes, verify, then process.
import express from "express";
import crypto from "crypto";

const app = express();

app.post(
  "/webhook/kobbopay",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const rawBody = req.body as Buffer;
    const signature = String(req.header("x-signature") ?? "");
    const secret = "YOUR_WEBHOOK_SECRET"; // load from secure config in production — never commit

    const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    // Production: length-check buffers before timingSafeEqual; handle encoding explicitly.
    const ok = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    if (!ok) return res.status(401).end();

    // Parse JSON only after verification (on a copy) and upsert idempotently by payment_id + event id.
    res.status(200).end();
  },
);`;

const toc = [
  { href: "/docs#overview", label: "Overview" },
  { href: "/docs#concepts", label: "Concepts" },
  { href: "/docs#architecture", label: "Architecture" },
  { href: "/docs#payment-lifecycle", label: "Payment lifecycle" },
  { href: "/docs#create-payment", label: "Create payment" },
  { href: "/docs#read-status", label: "Read payment status" },
  { href: "/docs#webhooks", label: "Webhooks" },
  { href: "/docs#webhook-verification", label: "Webhook verification" },
  { href: "/docs#retry-idempotency", label: "Retry & idempotency" },
  { href: "/docs#security-notes", label: "Security notes" },
  { href: "/docs#not-public-yet", label: "Not public yet" },
  { href: "/docs#glossary", label: "Glossary" },
  { href: "/glossary", label: "Canonical glossary (/glossary)" },
  { href: "/guides", label: "Operational guides (/guides)" },
  { href: "/operations", label: "Operational walkthroughs (/operations)" },
];

export default function DocsPage() {
  return (
    <>
      <JsonLd id="ld-json-docs-breadcrumb" data={breadcrumbJson} />

      <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            className="ops-page-header--hero"
            eyebrow="Technical documentation"
            title="Integration docs"
            lead={
              <>
                This page is an <strong className="text-primary">integration overview</strong> for CTOs
                and engineers evaluating Kobbopay. It is{" "}
                <strong className="text-primary">not</strong> a final API reference, not legal/commercial
                terms, and not a commitment of availability for any specific asset, network, or
                settlement timeline. Canonical product behavior is defined by your merchant agreement
                and environment configuration after{" "}
                <Link href="/request-access" conv="request_access_click">
                  merchant approval
                </Link>
                . Before production access, review{" "}
                <Link href="/onboarding">onboarding expectations</Link>.
              </>
            }
          />
        </Container>
      </Section>

      <Section tone="muted" className="ops-docs-body pb-[var(--token-section-loose)]">
        <Container className="max-w-content">
          <div className="ops-doc-layout">
            <aside className="ops-doc-sidebar">
              <OperationalDocNav items={toc} />
            </aside>
            <main className="ops-doc-main">
              <OperationalProseSection id="overview" title="Overview">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Kobbopay is <strong className="text-primary">API-first</strong>: your backend creates
            payments, reads authoritative status from the API, and subscribes to{" "}
            <strong className="text-primary">signed webhooks</strong> for lifecycle automation. The
            public marketing site is <strong className="text-primary">https://pay.kobbex.com</strong>;
            merchant operations live on{" "}
            <strong className="text-primary">https://merchant.kobbex.com</strong> after access is
            granted.
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Code samples below use <code className="font-mono text-xs text-primary">api.example.com</code>{" "}
            as a neutral placeholder host. Your integration hostnames, paths, headers, and signing
            details come from the materials issued for your approved environment.
          </p>
                <p className="text-sm text-muted">
                  Before production access, review{" "}
                  <Link href="/onboarding">onboarding expectations</Link>. Short operational guides:{" "}
                  <Link href="/guides">/guides</Link> (lifecycle, webhooks, reconciliation, keys,
                  onboarding). Walkthroughs: <Link href="/operations">/operations</Link>.
                </p>
                <ProductionRealityNote compact />
              </OperationalProseSection>

              <OperationalProseSection id="concepts" title="Concepts" tone="muted">
                <h2 id="docs-heading-concepts" className="sr-only">
                  Concepts
                </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>
              <strong className="text-primary">Server-to-server only:</strong> API keys must live on
              your infrastructure, rotated on your policy, and never ship to browsers or mobile
              clients.
            </li>
            <li>
              <strong className="text-primary">Explicit lifecycle:</strong> model your internal state
              machine on documented statuses for your deployment—do not infer semantics from generic
              “crypto paid” language.
            </li>
            <li>
              <strong className="text-primary">Rails are selective:</strong> assets and networks are
              enabled per merchant configuration; unsupported combinations should fail fast at
              creation time where possible.
            </li>
            <li>
              <strong className="text-primary">Operations portal:</strong> teams reconcile, configure
              webhooks/keys where exposed, and initiate withdrawal requests according to your
              controls.
            </li>
            <li>
              <strong className="text-primary">Environments:</strong> non-production and production
              differ by credentials, endpoints, and rails — configuration drift is an operational
              risk to review periodically.
            </li>
            <li>
              <strong className="text-primary">Failure handling:</strong> retries, signature failures,
              and reconciliation exceptions are normal operational signals — design monitoring and
              exception queues accordingly.
            </li>
          </ul>
                <EnvironmentRolloutNote className="mt-8" />
                <div id="architecture" className="mt-8 scroll-mt-24">
                  <ArchitectureDiagram
                    variant="full"
                    diagramLabelledBy="docs-heading-concepts"
                    settle={false}
                  />
                </div>
              </OperationalProseSection>

              <OperationalProseSection id="payment-lifecycle" title="Payment lifecycle">
                <h2 id="docs-heading-payment-lifecycle" className="sr-only">
                  Payment lifecycle
                </h2>
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            A payment typically moves through a small set of states such as{" "}
            <strong className="text-primary">Pending</strong> →{" "}
            <strong className="text-primary">Paid</strong> →{" "}
            <strong className="text-primary">Confirmed</strong>, with{" "}
            <strong className="text-primary">Expired</strong> as a common terminal branch. Exact
            names, ordering, and edge transitions are deployment-specific—treat this description as
            conceptual.
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Webhooks emit lifecycle transitions your systems consume to update orders, entitlements,
            and accounting—after you verify authenticity and process idempotently.
          </p>
                <LifecycleDiagram
                  variant="full"
                  diagramLabelledBy="docs-heading-payment-lifecycle"
                  settle={false}
                />
              </OperationalProseSection>

              <OperationalProseSection id="create-payment" title="Create payment" tone="muted">
                <p className="text-sm leading-relaxed text-muted sm:text-body">
                  Creation is always initiated from your backend using a secret API key.
                </p>
                <CodeInstrumentPanel label="Illustrative request (placeholders only)">
                  <CodePanel title="" code={createPaymentExample} />
                </CodeInstrumentPanel>
              </OperationalProseSection>

              <OperationalProseSection id="read-status" title="Read payment status">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Your services poll or refresh status server-side. A separate{" "}
            <strong className="text-primary">public payment status</strong> surface (tokenized URL or
            similar) may exist for payer UX without exposing merchant secrets—availability depends on
            your deployment configuration.
          </p>
                <CodeInstrumentPanel label="Illustrative GET (placeholders only)">
                  <CodePanel title="" code={readPaymentExample} />
                </CodeInstrumentPanel>
              </OperationalProseSection>

              <OperationalProseSection id="webhooks" title="Webhooks" tone="muted">
                <h2 id="docs-heading-webhooks" className="sr-only">
                  Webhooks
                </h2>
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Register an HTTPS endpoint you control (for example{" "}
            <code className="font-mono text-xs text-primary">
              https://api.example.com/webhook/kobbopay
            </code>
            ). Kobbopay will POST signed JSON payloads representing lifecycle changes. Use a
            dedicated route with minimal middleware so the raw body used for verification matches
            bytes on the wire.
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Respond with <code className="font-mono text-xs text-primary">2xx</code> only after you
            have durably recorded the event (or queued safe work). Non-2xx responses invite retries.
          </p>
                <WebhookFlowDiagram
                  variant="full"
                  diagramLabelledBy="docs-heading-webhooks"
                  settle={false}
                />
              </OperationalProseSection>

              <OperationalProseSection id="webhook-verification" title="Webhook verification">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Compute the expected signature from <code className="font-mono text-xs text-primary">YOUR_WEBHOOK_SECRET</code>{" "}
            and the <strong className="text-primary">raw request body</strong>, then compare using a
            constant-time check after enforcing equal buffer lengths. Parse JSON only after
            verification succeeds.
          </p>
                <WebhookVerificationExplorer />
                <div className="mt-6">
                  <CodeInstrumentPanel label="Node.js sketch (pattern only)">
                    <CodePanel title="" code={webhookHandlerExample} />
                  </CodeInstrumentPanel>
                </div>
                <p className="text-sm text-muted">
                  <Link href="/security">Security practices</Link> ·{" "}
                  <Link href="/guides/webhook-verification">Webhook verification guide</Link>
                </p>
              </OperationalProseSection>

              <OperationalProseSection id="retry-idempotency" title="Retry and idempotency" tone="muted">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Webhook delivery may retry on transient failures. Make consumers{" "}
            <strong className="text-primary">idempotent</strong> by deduplicating on a stable event
            identifier when present, otherwise on{" "}
            <code className="font-mono text-xs text-primary">payment_id</code> + event type + logical
            transition key you derive from the payload.
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            For your own API calls, use bounded exponential backoff on 429/5xx, respect{" "}
            <code className="font-mono text-xs text-primary">Retry-After</code> when provided, and
            prefer create operations that accept an idempotency key if your integration kit exposes
            one.
          </p>
              </OperationalProseSection>

              <OperationalProseSection id="security-notes" title="Security notes">
                <OperationalGovernancePanel className="mb-8" limit={3} />
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>Never expose API keys in frontend code, demos, or screenshots.</li>
            <li>
              Never send private keys, seed phrases, or webhook secrets in email, chat, or support
              tickets—including messages to <strong className="text-primary">pay.kobbex.com</strong>{" "}
              contact paths.
            </li>
            <li>Rotate compromised keys immediately; assume leaked secrets are abused.</li>
            <li>
              Prefer network controls (allowlists, mTLS where offered) for webhook ingress in
              high-risk deployments.
            </li>
          </ul>
              </OperationalProseSection>

              <OperationalProseSection id="not-public-yet" title="What is not public yet" tone="muted">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>OpenAPI / JSON Schema bundles pinned to production versions.</li>
            <li>Authenticated reference for every error code and pagination edge case.</li>
            <li>Public postman collection or SDKs (if/when published).</li>
            <li>Formal SLA tables for webhook delivery latency.</li>
          </ul>
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Request integration materials for your environment via{" "}
            <Link href="/request-access" conv="request_access_click">
              Request access
            </Link>
            .
          </p>
              </OperationalProseSection>

              <OperationalProseSection id="glossary" title="Glossary">
                <p className="text-sm text-muted sm:text-body">
                  Short definitions for quick alignment. Canonical anchors:{" "}
                  <Link href="/glossary">/glossary</Link>.
                </p>
                <p className="mt-4 text-sm">
                  <Link href="/glossary">View full glossary →</Link>
                </p>

                <VerificationFramePanel label="Trust boundaries" sublabel="Read this twice" className="mt-8">
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
                    <li>These docs are an integration overview, not legal or commercial terms.</li>
                    <li>Asset and network availability depend on merchant configuration and approval.</li>
                    <li>No guarantee of instant settlement, universal finality, or global asset support.</li>
                  </ul>
                </VerificationFramePanel>

                <CTAGroup className="mt-8">
                  <Link href="/request-access" variant="button-primary" className="no-underline" conv="request_access_click">
                    Request access
                  </Link>
                  <Link href="/developers" variant="button-secondary" className="no-underline">
                    Developer hub
                  </Link>
                </CTAGroup>
              </OperationalProseSection>
            </main>
          </div>
        </Container>
      </Section>
    </>
  );
}
