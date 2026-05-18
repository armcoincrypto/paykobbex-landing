import type { Metadata } from "next";
import { HeroBackdrop } from "@/components/landing/HeroBackdrop";
import { HomeInfrastructurePlane } from "@/components/landing/HomeInfrastructurePlane";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { CTAGroup } from "@/components/primitives/CTAGroup";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroOperationalInstrumentCompact } from "@/components/landing/HeroOperationalInstrumentCompact";
import { InfrastructureOperationsSection } from "@/components/proof";
import { OperationalRealismEntry } from "@/components/realism";
import { OG_IMAGES, OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "B2B crypto payment infrastructure",
  description:
    "Kobbopay: operational principles for B2B crypto payments—explicit lifecycles, signed webhooks, merchant approval, selected rails, and server-side integrations. No fake certifications on this marketing site.",
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    title: "Kobbopay — B2B crypto payment infrastructure",
    description:
      "Operational principles for B2B crypto payments: explicit lifecycles, signed webhooks, merchant approval, selected rails, and server-side integrations—honest public positioning.",
    url: `${SITE_URL}/`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kobbopay — B2B crypto payment infrastructure",
    description:
      "Explicit lifecycles, signed webhooks, merchant approval, and selected rails—integration-first positioning without marketing certifications on this site.",
    images: [OG_IMAGE.url],
  },
};

const trustChips = [
  "Verification precedes state mutation",
  "Failures bounded — replay contained",
  "Finance owns recognition semantics",
  "Merchant approval required",
  "No audit claims",
];

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "Is merchant access instant?",
    a: "No. Merchant access is subject to approval and environment configuration. This is intentional risk management, not a broken signup flow.",
  },
  {
    q: "Do you support every chain and token?",
    a: "No. Kobbopay operates on selected crypto rails and must be enabled for your environment. We do not publish open-ended multi-asset inventory or coverage claims on this marketing site.",
  },
  {
    q: "Are payouts fully automated?",
    a: "Merchants initiate withdrawal requests. Execution is subject to operational controls and configuration. Do not assume universal instant on-chain settlement.",
  },
  {
    q: "Where should API keys live?",
    a: "Only on your servers. Never in browsers, mobile apps, public repos, or support tickets.",
  },
];

const orgJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Kobbopay",
  url: SITE_URL,
  description:
    "B2B crypto payment infrastructure with explicit operational principles: signed webhooks, explicit lifecycles, merchant approval, selected rails, and server-side integrations—without marketing certifications on this site.",
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/og.png`,
  },
};

const faqJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const appJson = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Kobbopay",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Kobbopay software for merchants: explicit lifecycles, signed webhooks, merchant approval, selected rails, and operational clarity—honest public positioning without fake certifications.",
  url: SITE_URL,
  image: `${SITE_URL}/og.png`,
};

export default function HomePage() {
  return (
    <>
      <JsonLd id="ld-json-org" data={orgJson} />
      <JsonLd id="ld-json-faq" data={faqJson} />
      <JsonLd id="ld-json-app" data={appJson} />

      <HomeInfrastructurePlane>
      <Section
        id="hero"
        tone="default"
        className="home-hero home-hero--dominant home-hero--refined home-hero--premium home-section-bridge-out home-ops-story-start relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-[6.5rem]"
      >
        <HeroBackdrop />
        <Container className="relative z-10">
          <div className="home-hero-grid">
            <div className="home-hero-copy">
              <p className="home-hero-eyebrow type-eyebrow">
                B2B crypto payments
              </p>
              <h1 className="home-hero-title type-stack-after-eyebrow text-balance text-display font-semibold text-primary">
                <span className="home-hero-title-accent">API-first</span> crypto payment{" "}
                <span className="home-hero-title-accent">infrastructure</span> for serious merchants
              </h1>
              <p className="home-hero-lead type-stack-after-heading">
                Kobbopay is API-first B2B crypto payment infrastructure with signed webhooks,
                explicit payment lifecycles, and a merchant portal for operations — after merchant
                approval, on selected rails where enabled.
              </p>
              <CTAGroup className="home-hero-cta">
                <Link
                  href="/contact#merchant-intake"
                  variant="button-primary"
                  className="home-hero-cta-primary no-underline"
                  conv="request_access_click"
                >
                  Request access
                </Link>
                <Link href="/docs" variant="button-secondary" className="no-underline">
                  Integration docs
                </Link>
              </CTAGroup>
              <div className="home-hero-meta">
                <p className="home-hero-meta-primary">
                  <Link href="/onboarding">Onboarding expectations →</Link>
                </p>
                <p className="home-hero-meta-secondary">
                  Merchant portal:{" "}
                  <Link href="https://merchant.kobbex.com/" conv="merchant_login_click">
                    merchant.kobbex.com
                  </Link>
                  {" · "}
                  <Link href="/login" conv="merchant_login_click">
                    Merchant login
                  </Link>
                </p>
              </div>
            </div>
            <HeroOperationalInstrumentCompact />
          </div>
          <div className="home-hero-trust">
            <p className="home-hero-trust-label type-eyebrow type-eyebrow--soft">
              Production governance
            </p>
            <div className="home-hero-trust-chips" role="list">
              {trustChips.map((label) => (
                <span key={label} className="trust-chip ui-chip" role="listitem">
                  {label}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      <InfrastructureOperationsSection />

      <Section id="how-it-works" tone="default" className="home-section-after-ops">
        <Container>
          <h2
            id="home-heading-how-it-works"
            className="type-section-heading text-h2 font-semibold text-primary"
          >
            How it works
          </h2>
          <ArchitectureDiagram
            variant="compact"
            className="type-stack-after-heading"
            diagramLabelledBy="home-heading-how-it-works"
          />
          <ol className="type-stack-after-heading list-decimal space-y-3.5 pl-5 text-sm text-muted sm:text-body">
            <li>
              <strong className="text-primary">Create a payment</strong> from your backend using a
              server-side API key.
            </li>
            <li>
              <strong className="text-primary">Your customer pays on-chain</strong> to the payment
              path returned by the API, on a rail that is enabled for your environment.
            </li>
            <li>
              <strong className="text-primary">Track lifecycle states</strong> with explicit
              semantics (for example: <strong className="text-primary">Pending</strong>,{" "}
              <strong className="text-primary">Paid</strong>, and{" "}
              <strong className="text-primary">Confirmed</strong>, plus{" "}
              <strong className="text-primary">Expired</strong> as a terminal branch), aligned to your
              reconciliation rules.
            </li>
            <li>
              <strong className="text-primary">Automate with signed webhooks</strong> and verify
              signatures using the raw request body.
            </li>
            <li>
              <strong className="text-primary">Operate in the merchant portal</strong> for day-to-day
              visibility and configuration appropriate to your deployment.
            </li>
          </ol>
          <p className="mt-6 text-sm text-muted">
            Details: <Link href="/features">Features</Link> · <Link href="/docs">Docs</Link>
            {" · "}
            <Link href="/guides">Guides</Link>
            {" · "}
            <Link href="/glossary">Glossary</Link>
          </p>
        </Container>
      </Section>

      <OperationalRealismEntry className="home-section-bridge" />

      </HomeInfrastructurePlane>

      <Section
        id="integration-and-security"
        tone="default"
        className="proof-section home-integration-band"
      >
        <Container className="max-w-3xl">
          <h2 className="type-section-heading text-h2 font-semibold text-primary">
            Integration expectations &amp; security
          </h2>
          <p className="type-section-lead type-stack-after-heading">
            Serious integrations assume server-side secrets, verifiable webhooks, and honest
            operational boundaries. For authoritative behavior, your merchant agreement and
            environment configuration remain the source of truth.
          </p>
          <div className="type-stack-section-block grid gap-6 sm:grid-cols-2 sm:gap-7">
            <div className="home-integration-column">
              <h3 className="text-h3 font-semibold text-primary">Before production traffic</h3>
              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-muted">
                <li>
                  <strong className="text-primary">Server-to-server only:</strong> API keys on your
                  backend; checkout calls your API—not browser-held payment secrets.
                </li>
                <li>
                  <strong className="text-primary">Webhook verification:</strong> verify signatures on
                  raw POST bodies, then apply idempotent updates; treat retries as normal.
                </li>
                <li>
                  <strong className="text-primary">Reconciliation ownership:</strong> map lifecycle
                  states to orders and accounting; marketing copy is conceptual, not your enum spec.
                </li>
                <li>
                  <strong className="text-primary">Merchant-owned secrets:</strong> you control
                  rotation, storage, and blast radius—Kobbopay does not replace your vault or IR
                  program.
                </li>
              </ul>
            </div>
            <div className="home-integration-column">
              <h3 className="text-h3 font-semibold text-primary">Security boundaries</h3>
              <ul className="mt-4 list-disc space-y-2.5 pl-5 text-sm leading-relaxed text-muted">
                <li>
                  <strong className="text-primary">Practical controls:</strong> signed webhooks, 2FA
                  for sensitive merchant actions where enabled, and encrypted API key material at
                  rest.
                </li>
                <li>
                  <strong className="text-primary">Operational controls:</strong> merchant approval,
                  selected rails, and withdrawal requests subject to configuration—not universal
                  instant settlement.
                </li>
                <li>
                  <strong className="text-primary">No overclaiming:</strong> no SOC 2, ISO 27001,
                  “bank-grade,” “audited,” or “guaranteed settlement” claims on this marketing site.
                </li>
              </ul>
            </div>
          </div>
          <p className="type-stack-after-lead text-sm text-muted">
            <Link href="/docs">Integration docs</Link>
            {" · "}
            <Link href="/docs#webhook-verification">Webhook verification</Link>
            {" · "}
            <Link href="/security">Security practices</Link>
            {" · "}
            <Link href="/developers">Developers</Link>
            {" · "}
            <Link href="/use-cases">Use cases</Link>
          </p>
        </Container>
      </Section>

      <Section id="faq" tone="default">
        <Container>
          <h2 className="type-section-heading text-h2 font-semibold text-primary">FAQ</h2>
          <div className="type-stack-after-heading space-y-4">
            {faqItems.map((item) => (
              <Card key={item.q} interactive className="faq-card">
                <h3 className="text-h3 font-semibold text-primary">{item.q}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.a}</p>
              </Card>
            ))}
          </div>
          <p className="type-stack-after-lead text-sm font-medium">
            <Link href="/onboarding">Merchant onboarding FAQ and approval flow →</Link>
          </p>
        </Container>
      </Section>

      <Section id="contact" tone="muted" className="pb-[var(--token-section-loose)]">
        <Container>
          <h2 className="type-section-heading text-h2 font-semibold text-primary">Request access</h2>
          <p className="type-section-lead type-stack-after-heading max-w-2xl">
            Tell us what you are building. Legitimate teams never need your seed phrase, private
            keys, API keys, webhook secrets, wallet access credentials, or remote access to your
            wallets — and neither do we.
          </p>
          <div className="ops-console-cta-strip ops-gate-cta type-stack-after-lead">
            <span className="ops-console-routing" aria-hidden="true">
              GATE · REVIEW · ACCESS
            </span>
            <CTAGroup>
              <Link
                href="/contact#merchant-intake"
                variant="button-primary"
                className="no-underline"
                conv="request_access_click"
              >
                Request access
              </Link>
              <Link href="/pricing" variant="button-secondary" className="no-underline">
                Pricing
              </Link>
            </CTAGroup>
          </div>
        </Container>
      </Section>
    </>
  );
}
