import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { HeroBackdrop } from "@/components/landing/HeroBackdrop";
import { HomeInfrastructurePlane } from "@/components/landing/HomeInfrastructurePlane";
import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { CTAGroup } from "@/components/primitives/CTAGroup";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { HomeAssetRailsSection } from "@/components/conversion/HomeAssetRailsSection";
import { MerchantOutcomesGrid } from "@/components/conversion/MerchantOutcomesGrid";
import { HomeVisualStorySection } from "@/components/conversion/HomeVisualStorySection";
import { MerchantOnboardingFlowDiagram } from "@/components/conversion/MerchantOnboardingFlowDiagram";
import { HeroOperationalInstrumentPreview } from "@/components/landing/HeroOperationalInstrumentPreview";
import { OperationalRealismEntry } from "@/components/realism";

const InfrastructureOperationsSection = dynamic(
  () =>
    import("@/components/proof/InfrastructureOperationsSection").then(
      (mod) => mod.InfrastructureOperationsSection,
    ),
  { ssr: true },
);
import { MERCHANT_JOURNEY_FLOWS } from "@/lib/operational-realism";
import { OG_IMAGES, OG_IMAGE, SITE_URL } from "@/lib/site";

/** P7 — homepage buyer contexts (from existing illustrative flows, not case studies). */
const homeBuyerContexts = MERCHANT_JOURNEY_FLOWS.slice(0, 4).map((flow) => ({
  id: flow.id,
  title: flow.title.replace(/\s*\(illustrative\)\s*/i, ""),
  summary: flow.summary,
}));

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

/** P4 — hero governance matrix removed P38.7; asset rails section replaces it. */
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

      <HomeInfrastructurePlane className="home-platform home-platform--motion">
      <Section
        id="hero"
        tone="default"
        className="home-hero home-hero--dominant home-hero--refined home-hero--premium home-hero--conversion home-section-bridge-out home-ops-story-start relative overflow-hidden pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-24 lg:pt-[6.5rem]"
      >
        <HeroBackdrop />
        <Container className="relative z-10">
          <div className="home-hero-grid">
            <div className="home-hero-copy">
              <p className="home-hero-eyebrow type-eyebrow">
                B2B crypto payments
              </p>
              <h1 className="home-hero-title type-stack-after-eyebrow text-balance text-display font-semibold text-primary">
                Crypto payments infrastructure{" "}
                <span className="home-hero-title-accent">your finance team can reconcile</span>
              </h1>
              <p className="home-hero-lead type-stack-after-heading">
                API-first B2B payments with signed webhooks, explicit lifecycles, and reviewed merchant
                enablement — on selected rails after approval.
              </p>
              <div className="home-hero-value-strip" aria-label="Core capabilities">
                <span className="home-hero-value-strip__item">Signed webhooks</span>
                <span className="home-hero-value-strip__item">Explicit lifecycles</span>
                <span className="home-hero-value-strip__item">Reviewed onboarding</span>
              </div>
              <CTAGroup className="home-hero-cta">
                <Link
                  href="/request-access"
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
              <p className="home-hero-cta-secondary-hint">
                <Link href="/onboarding">Review onboarding expectations</Link>
                {" · "}
                <Link href="/guides">Integration guides</Link>
              </p>
            </div>
            <HeroOperationalInstrumentPreview />
          </div>
          <HomeAssetRailsSection />
        </Container>
      </Section>

      <Section tone="muted" id="merchant-outcomes" className="home-tier-support">
        <Container>
          <p className="type-eyebrow">Why teams integrate</p>
          <h2 className="type-section-heading type-stack-after-eyebrow text-h2 font-semibold text-primary">
            Built for operational confidence
          </h2>
          <p className="type-section-lead type-stack-after-heading max-w-2xl">
            Infrastructure clarity for engineering, finance, and operations — without marketing settlement
            promises or fake trust badges.
          </p>
          <MerchantOutcomesGrid />
        </Container>
      </Section>

      <InfrastructureOperationsSection />

      <Section id="visual-model" tone="default" className="home-tier-support">
        <Container>
          <p className="type-eyebrow">Operational model</p>
          <h2
            id="home-visual-model-heading"
            className="type-section-heading type-stack-after-eyebrow text-h2 font-semibold text-primary"
          >
            Understand the infrastructure visually
          </h2>
          <HomeVisualStorySection headingId="home-visual-model-heading" />
          <div className="mt-12">
            <p className="type-eyebrow">Onboarding path</p>
            <h3 className="mt-2 text-h3 font-semibold text-primary">Reviewed merchant enablement</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Access follows structured qualification — not anonymous production keys.
            </p>
            <div className="mt-6">
              <MerchantOnboardingFlowDiagram labelledBy="home-onboarding-flow" />
              <p id="home-onboarding-flow" className="sr-only">
                Merchant onboarding progression
              </p>
            </div>
            <p className="mt-6 text-sm">
              <Link href="/request-access" conv="request_access_click">
                Request access →
              </Link>
              {" · "}
              <Link href="/onboarding">Onboarding expectations</Link>
            </p>
          </div>
        </Container>
      </Section>

      <Section
        id="home-fit-check"
        tone="muted"
        className="home-flow-cta home-flow-cta--mid home-flow-bridge ops-fit-check home-platform__conversion home-tier-conversion"
        aria-labelledby="home-fit-check-heading"
      >
        <Container>
          <div className="ops-fit-check__panel home-flow-cta__panel">
            <header className="ops-fit-check__head">
              <span className="ops-fit-check__index" aria-hidden="true">
                07
              </span>
              <p className="type-eyebrow ops-fit-check__eyebrow">Fit check</p>
            </header>
            <h2
              id="home-fit-check-heading"
              className="ops-fit-check__title home-flow-cta__title type-section-heading text-h2 font-semibold text-primary"
            >
              A match if you ship server-side integrations
            </h2>
            <p className="ops-fit-check__lead home-flow-cta__lead type-section-lead">
              Kobbopay fits teams that need explicit payment lifecycles, verifiable webhooks, merchant
              approval, and finance-owned reconciliation — not anonymous self-serve keys or marketing
              settlement promises on day one.
            </p>
            <div className="ops-fit-check__criteria" aria-hidden="true">
              <span className="ops-fit-check__criterion">Explicit lifecycles</span>
              <span className="ops-fit-check__criterion">Verifiable webhooks</span>
              <span className="ops-fit-check__criterion">Merchant approval</span>
              <span className="ops-fit-check__criterion">Finance-owned reconciliation</span>
            </div>
            <CTAGroup className="ops-fit-check__actions home-flow-cta__actions type-stack-after-lead">
              <Link
                href="/request-access"
                variant="button-primary"
                className="home-flow-cta__primary ops-fit-check__primary no-underline"
                conv="request_access_click"
              >
                Request access
              </Link>
              <Link
                href="/onboarding"
                variant="button-secondary"
                className="ops-fit-check__secondary no-underline"
              >
                Onboarding expectations
              </Link>
            </CTAGroup>
          </div>
        </Container>
      </Section>

      <Section
        id="how-it-works"
        tone="default"
        className="home-section-after-ops home-flow-step home-flow-step--how home-tier-support"
      >
        <Container>
          <p className="type-eyebrow">Integration path</p>
          <h2
            id="home-heading-how-it-works"
            className="type-section-heading type-stack-after-eyebrow text-h2 font-semibold text-primary"
          >
            How it works
          </h2>
          <ArchitectureDiagram
            variant="compact"
            className="type-stack-after-heading"
            diagramLabelledBy="home-heading-how-it-works"
            settle
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

      <OperationalRealismEntry className="home-section-bridge home-flow-step home-flow-step--ops home-tier-support" />

      </HomeInfrastructurePlane>

      <Section
        id="buyer-contexts"
        tone="default"
        className="home-buyer-contexts home-flow-bridge home-tier-support"
        aria-labelledby="home-buyer-contexts-heading"
      >
        <Container>
          <p className="type-eyebrow">Buyer contexts</p>
          <h2
            id="home-buyer-contexts-heading"
            className="type-section-heading type-stack-after-eyebrow text-h2 font-semibold text-primary"
          >
            Where teams adopt this infrastructure
          </h2>
          <p className="type-section-lead type-stack-after-heading max-w-2xl">
            Illustrative B2B payment patterns — not guarantees that every industry, geography, or
            business model is supported. See{" "}
            <Link href="/use-cases">use cases</Link> and{" "}
            <Link href="/operations">operational walkthroughs</Link> for detail.
          </p>
          <ul className="home-buyer-contexts__grid type-stack-section-block" role="list">
            {homeBuyerContexts.map((ctx) => (
              <li key={ctx.id} className="home-buyer-contexts__card" role="listitem">
                <h3 className="home-buyer-contexts__card-title text-h3 font-semibold text-primary">
                  {ctx.title}
                </h3>
                <p className="home-buyer-contexts__card-summary">{ctx.summary}</p>
                <p className="home-buyer-contexts__card-link">
                  <Link href={`/operations#${ctx.id}`}>
                    Example operational flow →
                  </Link>
                </p>
              </li>
            ))}
          </ul>
          <p className="type-stack-after-lead text-sm text-muted">
            Payment operations, treasury, and engineering teams typically map these patterns to their
            own controls — merchant agreement and environment configuration remain authoritative.
          </p>
        </Container>
      </Section>

      <Section
        id="integration-and-security"
        tone="default"
        className="proof-section home-integration-band home-flow-step home-tier-support"
      >
        <Container className="max-w-3xl">
          <p className="type-eyebrow">Before production</p>
          <h2 className="type-section-heading type-stack-after-eyebrow text-h2 font-semibold text-primary">
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

      <Section id="faq" tone="default" className="home-flow-step home-tier-support">
        <Container>
          <p className="type-eyebrow">Due diligence</p>
          <h2 className="type-section-heading type-stack-after-eyebrow text-h2 font-semibold text-primary">
            FAQ
          </h2>
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

      <Section tone="default" className="conversion-trust-band py-10 sm:py-12">
        <Container>
          <div className="conversion-trust-band__grid">
            <div className="conversion-trust-band__item">
              <h3>Reviewed onboarding</h3>
              <p>Human qualification before production enablement — scoped rails and environment configuration.</p>
            </div>
            <div className="conversion-trust-band__item">
              <h3>Reconciliation discipline</h3>
              <p>Three-plane operational model with guides, playbooks, and references — not vanity dashboards.</p>
            </div>
            <div className="conversion-trust-band__item">
              <h3>Implementation support</h3>
              <p>Integration docs, operational guides, and observability concepts for approved merchants.</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="contact"
        tone="muted"
        className="home-flow-cta home-flow-cta--final home-tier-conversion-secondary pb-[var(--token-section-loose)]"
        aria-labelledby="home-final-cta-heading"
      >
        <Container>
          <div className="home-flow-cta__panel home-flow-cta__panel--final">
            <p className="type-eyebrow">Next step</p>
            <h2
              id="home-final-cta-heading"
              className="home-flow-cta__title type-section-heading text-h2 font-semibold text-primary"
            >
              Request access
            </h2>
            <p className="home-flow-cta__lead type-section-lead max-w-2xl">
              Tell us what you are building. Legitimate teams never need your seed phrase, private
              keys, API keys, webhook secrets, wallet access credentials, or remote access to your
              wallets — and neither do we.
            </p>
            <div className="home-flow-cta__actions home-flow-cta__actions--final type-stack-after-lead">
              <span className="home-flow-cta__routing" aria-hidden="true">
                GATE · REVIEW · ACCESS
              </span>
              <CTAGroup className="home-flow-cta__buttons">
                <Link
                  href="/request-access"
                  variant="button-primary"
                  className="home-flow-cta__primary no-underline"
                  conv="request_access_click"
                >
                  Request access
                </Link>
                <Link href="/pricing" variant="button-secondary" className="no-underline">
                  Pricing
                </Link>
                <Link href="/docs" variant="button-secondary" className="no-underline">
                  Integration docs
                </Link>
              </CTAGroup>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
