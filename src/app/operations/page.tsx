import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import {
  ConstraintDiscipline,
  MerchantJourneyNarrative,
  OperationalGovernancePanel,
  SupportOperationsCue,
  WalkthroughNarrative,
} from "@/components/realism";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  MERCHANT_JOURNEY_FLOWS,
  OPERATIONS_DISCLAIMER,
  OPERATIONAL_WALKTHROUGHS,
} from "@/lib/operational-realism";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operations",
  description:
    "Illustrative operational walkthroughs for Kobbopay: lifecycle handling, webhook retries, reconciliation, merchant review, and anonymized workflow patterns — not testimonials or metrics.",
  alternates: { canonical: `${SITE_URL}/operations` },
  openGraph: {
    title: "Operations — Kobbopay",
    description:
      "How payment operations actually work: realistic process walkthroughs and workflow-oriented examples without fake proof.",
    url: `${SITE_URL}/operations`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Operations — Kobbopay",
    description: "Operational walkthroughs and illustrative merchant workflows for B2B crypto payments.",
    images: [OG_IMAGE.url],
  },
};

const breadcrumbJson = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Operations", item: `${SITE_URL}/operations` },
  ],
};

export default function OperationsPage() {
  return (
    <>
      <JsonLd id="ld-json-operations-bc" data={breadcrumbJson} />

      <Section tone="default" className="ops-page pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            eyebrow="Operations"
            title="Operational procedures and walkthroughs"
            lead={
              <>
                These sequences describe how mature teams run B2B crypto payment infrastructure:
                lifecycle gates, webhook discipline, reconciliation ownership, review cycles, and
                escalation routing. They are{" "}
                <strong className="text-primary">not</strong> customer testimonials, throughput
                claims, or dashboard screenshots.
              </>
            }
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              {OPERATIONS_DISCLAIMER}
            </p>
            <p className="text-sm text-muted">
              <Link href="/docs">Docs</Link> · <Link href="/guides">Guides</Link> ·{" "}
              <Link href="/onboarding">Onboarding</Link>
            </p>
          </OperationalPageHeader>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="max-w-content">
          <OperationalGovernancePanel />
        </Container>
      </Section>

      <Section tone="default" id="walkthroughs">
        <Container className="max-w-content">
          <h2 className="text-h2 font-semibold text-primary">Operational walkthroughs</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Step-by-step flows teams use to reason about payments — labeled as example operational
            flows, not live dashboards.
          </p>
          <div className="mt-10">
            {OPERATIONAL_WALKTHROUGHS.map((w) => (
              <WalkthroughNarrative key={w.id} walkthrough={w} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted" id="workflows">
        <Container className="max-w-content">
          <h2 className="text-h2 font-semibold text-primary">Example merchant workflows</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Anonymized, workflow-oriented narratives — no fake names, logos, volumes, or KPIs. Use
            them to stress-test your integration and finance mapping before production traffic.
          </p>
          <div className="mt-10">
            {MERCHANT_JOURNEY_FLOWS.map((f) => (
              <MerchantJourneyNarrative key={f.id} flow={f} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="default" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-content grid gap-8 lg:grid-cols-2 lg:items-start">
          <ConstraintDiscipline />
          <SupportOperationsCue />
        </Container>
      </Section>
    </>
  );
}
