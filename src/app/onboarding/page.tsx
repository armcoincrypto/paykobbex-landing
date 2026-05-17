import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { CTAGroup } from "@/components/primitives/CTAGroup";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { ReviewPipelineInstrument } from "@/components/operational/ReviewPipelineInstrument";
import { EnvironmentRolloutNote, SupportOperationsCue } from "@/components/realism";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { OG_IMAGES, OG_IMAGE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Merchant onboarding",
  description:
    "What to expect when requesting Kobbopay merchant access: review, integration discussion, approval, rails selection, and support boundaries — without instant universal self-serve production keys.",
  alternates: { canonical: `${SITE_URL}/onboarding` },
  openGraph: {
    title: "Merchant onboarding — Kobbopay",
    description:
      "Review process, integration expectations, merchant approval, and operational requirements for B2B crypto payment access.",
    url: `${SITE_URL}/onboarding`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Merchant onboarding — Kobbopay",
    description: "Expectations for merchant access, rails, and integration support on Kobbopay.",
    images: [OG_IMAGE.url],
  },
};

const stages: Array<{ index: string; title: string; body: string }> = [
  {
    index: "01",
    title: "Review process",
    body: "We triage inbound requests for basic fit: business model, geography, rails needs, and whether your use case matches B2B server-to-server integrations. The structured intake on the contact page reduces back-and-forth.",
  },
  {
    index: "02",
    title: "Integration discussion",
    body: "Technical alignment covers payment creation, lifecycle semantics, webhook signing on raw bytes, idempotent consumers, and how you map external states to orders and finance controls. Sessions coordinate engineering and treasury stakeholders — we do not collect secrets in email or chat.",
  },
  {
    index: "03",
    title: "Merchant approval",
    body: "Approval is not guaranteed. Outcomes include scoped production access, deferral pending information, or decline when the model cannot be supported safely. Partial approval — limited rails or staged enablement — is normal. See the merchant review walkthrough on Operations (illustrative, not an SLA).",
  },
  {
    index: "04",
    title: "Environments and rollout",
    body: "Non-production and production are separate configurations: credentials, webhook URLs, rails, and confirmation policy. Rollout is deliberate — mapping review, verification tests, monitoring baselines, then controlled traffic. Integrations typically iterate over multiple cycles before steady-state operations.",
  },
  {
    index: "05",
    title: "Operational requirements",
    body: "Operate API keys and webhook secrets only on your infrastructure. Monitor delivery failures and signature errors. Treat withdrawals and settlements as policy-governed operational flows with human review where configuration requires it.",
  },
  {
    index: "06",
    title: "Selected rails",
    body: "Enabled networks and assets are agreed per environment and may differ between non-production and production. Unsupported combinations should fail at creation — we do not publish a volatile public asset matrix on this site.",
  },
  {
    index: "07",
    title: "Support expectations",
    body: "Support coordinates integration and operational clarity for approved merchants — not custody of keys, remote wallet access, or urgent verification scams. Escalations should include payment_id and lifecycle context.",
  },
];

const faqItems: Array<{ q: string; a: string }> = [
  {
    q: "How long does onboarding take?",
    a: "There is no fixed SLA on this public site. Timelines depend on intake quality, capacity, risk review, and how quickly your team can join technical discussions. Expect a measured process rather than same-day universal activation.",
  },
  {
    q: "What information should I prepare?",
    a: "Company or project identity, website, use case, rough monthly volume, required rails (networks and assets), a technical contact, and a preferred follow-up channel (Telegram or email). Never prepare or send private keys, seed phrases, API keys, or webhook secrets to qualify.",
  },
  {
    q: "Do all merchants get approved?",
    a: "No. Approval is a risk and fit decision. We may decline, defer, or scope access when the model, geography, or technical posture is not aligned with what we can support safely on selected rails.",
  },
  {
    q: "Which rails can be enabled?",
    a: "Rails are selected and enabled per merchant environment where available—not as universal open-ended coverage. The exact set is agreed after review and is not represented as a public inventory on this marketing site.",
  },
  {
    q: "Can I test integration before production?",
    a: "Non-production access and materials are discussed after approval and alignment on scope. This site does not promise public self-serve sandbox keys; plan for server-to-server patterns, webhook verification, and reconciliation dry-runs from the first environment you receive.",
  },
  {
    q: "Can approval be partial or scoped?",
    a: "Yes. Access may be enabled with limited rails, non-production first, or operational holds until your mapping, monitoring, and reconciliation posture match what you intend to run in production.",
  },
];

const faqJson = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function OnboardingPage() {
  return (
    <>
      <JsonLd id="ld-json-onboarding-faq" data={faqJson} />

      <Section tone="default" className="ops-page pt-10 sm:pt-16">
        <Container className="max-w-content">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-start">
            <OperationalPageHeader
              eyebrow="Merchants"
              title="Merchant onboarding — what to expect"
              lead={
                <>
                  Kobbopay is built for teams that need explicit lifecycles, signed webhooks, and
                  operational clarity. Access is intentional: we review fit and risk before enabling{" "}
                  <strong className="text-primary">selected rails</strong> in your environment.
                </>
              }
            >
              <CTAGroup className="mt-6">
                <Link
                  href="/contact#merchant-intake"
                  variant="button-primary"
                  className="no-underline"
                  conv="request_access_click"
                >
                  Request access
                </Link>
                <Link href="/docs" variant="button-secondary" className="no-underline">
                  Integration docs
                </Link>
              </CTAGroup>
              <p className="text-sm text-muted">
                Structured inquiry: <Link href="/contact#merchant-intake">contact page</Link>.
              </p>
            </OperationalPageHeader>
            <VerificationFramePanel label="Review pipeline" sublabel="Conceptual" className="lg:sticky lg:top-24">
              <ReviewPipelineInstrument />
            </VerificationFramePanel>
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="max-w-3xl">
          <div className="proof-editorial-rail space-y-8">
            {stages.map((s) => (
              <article key={s.index}>
                <p className="proof-workflow-index">{s.index}</p>
                <h2 className="mt-1 text-h2 font-semibold text-primary">{s.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
                {s.title === "Merchant approval" ? (
                  <p className="mt-2 text-sm text-muted">
                    <Link href="/operations#merchant-review">Example operational flow: merchant review →</Link>
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="default">
        <Container className="max-w-3xl space-y-8">
          <EnvironmentRolloutNote />
          <SupportOperationsCue />
        </Container>
      </Section>

      <Section tone="muted" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-3xl">
          <h2 className="text-h2 font-semibold text-primary">FAQ</h2>
          <dl className="mt-8 space-y-0">
            {faqItems.map((item, i) => (
              <div key={item.q} className="ops-glossary-term">
                <dt className="proof-workflow-index">{String(i + 1).padStart(2, "0")}</dt>
                <dd className="mt-1">
                  <h3 className="text-h3 font-semibold text-primary">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>
    </>
  );
}
