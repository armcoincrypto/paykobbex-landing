import type { Metadata } from "next";
import { LifecycleLaneInstrument } from "@/components/proof/LifecycleLaneInstrument";
import { WebhookPropagationStrip } from "@/components/proof/WebhookPropagationStrip";
import { ConfirmationDepthStack } from "@/components/proof/ConfirmationDepthStack";
import { ReviewPipelineInstrument } from "@/components/operational/ReviewPipelineInstrument";
import { SecurityBoundaryInstrument } from "@/components/operational/SecurityBoundaryInstrument";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { SITE_URL, OG_IMAGES, OG_IMAGE } from "@/lib/site";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Kobbopay features: API-created payments, explicit lifecycles, signed webhooks, merchant portal operations, ledger-oriented balances, and withdrawal requests — after approval, on selected rails where enabled.",
  alternates: { canonical: `${SITE_URL}/features` },
  openGraph: {
    title: "Features — Kobbopay",
    description:
      "Explore Kobbopay capabilities for B2B crypto payments: API, webhooks, portal, balances, and controlled withdrawals.",
    url: `${SITE_URL}/features`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features — Kobbopay",
    description: "B2B crypto payment infrastructure: API, webhooks, portal, balances, and merchant-initiated withdrawal requests.",
    images: [OG_IMAGE.url],
  },
};

const pillars: Array<{
  index: string;
  title: string;
  body: string;
  instrument: ReactNode;
}> = [
  {
    index: "01",
    title: "API-created payments",
    body: "Create payments from your backend with a server-to-server API. API keys belong on your servers — not in browsers or mobile clients.",
    instrument: <SecurityBoundaryInstrument />,
  },
  {
    index: "02",
    title: "Explicit lifecycles",
    body: "Payments move through defined lifecycle states so engineering, finance, and support can agree on what each status means for your workflows.",
    instrument: <LifecycleLaneInstrument compact animate={false} />,
  },
  {
    index: "03",
    title: "Signed webhooks",
    body: "Subscribe to lifecycle events with signed deliveries so your systems can verify authenticity before updating internal state.",
    instrument: <WebhookPropagationStrip />,
  },
  {
    index: "04",
    title: "Merchant portal",
    body: "Operate day-to-day: review payments, manage keys and webhook configuration, and follow operational signals appropriate to your deployment.",
    instrument: <ReviewPipelineInstrument />,
  },
  {
    index: "05",
    title: "Balances and reconciliation",
    body: "Balances are understood through ledger-oriented accounting tied to confirmation semantics — not vague “wallet vibes.”",
    instrument: <ConfirmationDepthStack />,
  },
  {
    index: "06",
    title: "Withdrawal requests",
    body: "Merchants initiate withdrawal requests. Execution is subject to operational controls and configuration — not a promise of universal instant on-chain payout.",
    instrument: null,
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Section tone="default" className="ops-page pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            eyebrow="Capabilities"
            title="Operational infrastructure surface"
            lead={
              <>
                Kobbopay is API-first B2B crypto payment infrastructure with signed webhooks, explicit
                payment lifecycles, and a merchant portal for operations — after merchant approval, on
                selected rails where enabled.
              </>
            }
          />
        </Container>
      </Section>

      <Section tone="muted" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-content">
          <div className="ops-feature-pillars">
            {pillars.map((p) => (
              <article key={p.index} className="ops-feature-pillar">
                <div>
                  <p className="proof-workflow-index">{p.index}</p>
                  <h2 className="mt-2 text-h2 font-semibold text-primary">{p.title}</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
                {p.instrument ? (
                  <VerificationFramePanel
                    label="Instrument"
                    sublabel="Conceptual"
                    className="ops-instrument-surface min-w-0"
                  >
                    <div aria-hidden="true">{p.instrument}</div>
                  </VerificationFramePanel>
                ) : null}
              </article>
            ))}
          </div>
          <p className="mt-12 text-sm text-muted">
            See also: <Link href="/docs">Docs</Link>
            {" · "}
            <Link href="/guides">Guides</Link>
            {" · "}
            <Link href="/glossary">Glossary</Link>
            {" · "}
            <Link href="/security">Security</Link>
            {" · "}
            <Link href="/operations">Operations</Link>
            {" · "}
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
