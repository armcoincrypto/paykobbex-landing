import type { Metadata } from "next";
import { MerchantIntakeForm } from "@/components/contact/MerchantIntakeForm";
import { MerchantOnboardingFlowDiagram } from "@/components/conversion/MerchantOnboardingFlowDiagram";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { CTAGroup } from "@/components/primitives/CTAGroup";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request merchant access",
  description:
    "Structured merchant access request for Kobbopay: reviewed onboarding, enablement qualification, and integration coordination — not instant self-serve production keys.",
  alternates: { canonical: `${SITE_URL}/request-access` },
  openGraph: {
    title: "Request merchant access — Kobbopay",
    description:
      "Professional merchant enablement intake for B2B crypto payment infrastructure.",
    url: `${SITE_URL}/request-access`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Request merchant access — Kobbopay",
    description: "Reviewed onboarding intake for API-first crypto payment infrastructure.",
    images: [OG_IMAGE.url],
  },
};

const breadcrumbJson = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Request access", item: `${SITE_URL}/request-access` },
  ],
};

const trustPoints = [
  {
    title: "Reviewed enablement",
    body: "Production access follows qualification — scoped rails, environment configuration, and integration alignment.",
  },
  {
    title: "Operational maturity",
    body: "We expect server-side integrations, webhook verification discipline, and finance-owned reconciliation mapping.",
  },
  {
    title: "Transparent boundaries",
    body: "No instant universal approval, no custody of your secrets, and no fake compliance badges on this marketing site.",
  },
] as const;

export default function RequestAccessPage() {
  return (
    <>
      <JsonLd id="ld-json-request-access-bc" data={breadcrumbJson} />

      <Section tone="default" className="ops-page ops-page-hero-band request-access-hero pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            className="ops-page-header--hero request-access-hero__header"
            eyebrow="Merchant access"
            title="Request access"
            lead={
              <>
                Structured onboarding for teams building on API-first crypto payment infrastructure.
                Submit operational detail for{" "}
                <strong className="text-primary">merchant enablement review</strong> — human qualification,
                not automated key issuance.
              </>
            }
          >
            <p className="text-sm text-muted">
              <Link href="/onboarding">Review onboarding expectations</Link>
              {" · "}
              <Link href="/docs">Integration docs</Link>
              {" · "}
              <Link href="/guides">Integration guides</Link>
              {" · "}
              <Link href="/contact">General contact</Link>
            </p>
          </OperationalPageHeader>
        </Container>
      </Section>

      <Section tone="muted" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-content">
          <div className="request-access-layout grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-12 lg:items-start">
            <div id="intake" className="scroll-mt-28">
              <Card className="request-access-intake p-5 sm:p-7 lg:p-8">
                <h2 className="text-h2 font-semibold text-primary">Merchant enablement intake</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Complete the form, prepare your review summary, then copy or email it from your
                  company mailbox.
                </p>
                <div className="mt-6">
                  <MerchantIntakeForm />
                </div>
              </Card>
            </div>

            <aside className="request-access-aside space-y-5">
              <VerificationFramePanel label="Enablement path" sublabel="What to expect">
                <MerchantOnboardingFlowDiagram labelledBy="request-access-flow-heading" />
                <p id="request-access-flow-heading" className="sr-only">
                  Merchant onboarding progression
                </p>
              </VerificationFramePanel>

              <Card className="p-5">
                <h3 className="text-h3 font-semibold text-primary">Before you apply</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
                  <li>
                    Read <Link href="/onboarding">onboarding expectations</Link> and{" "}
                    <Link href="/guides/merchant-integration-architecture">integration architecture</Link>.
                  </li>
                  <li>
                    Prepare rails, volume ranges, and payout requirements — rough estimates are fine.
                  </li>
                  <li>Use a company-controlled email — not personal wallets or shared inboxes.</li>
                </ul>
              </Card>

              {trustPoints.map((point) => (
                <Card key={point.title} className="request-access-trust p-5">
                  <h3 className="font-semibold text-primary">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{point.body}</p>
                </Card>
              ))}

              <CTAGroup className="flex-col items-stretch">
                <Link href="/docs" variant="button-secondary" className="no-underline text-center">
                  Start with integration docs
                </Link>
                <Link href="/guides" variant="button-secondary" className="no-underline text-center">
                  Operational guides
                </Link>
              </CTAGroup>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
