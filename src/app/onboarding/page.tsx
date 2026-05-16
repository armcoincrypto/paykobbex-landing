import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { CTAGroup } from "@/components/primitives/CTAGroup";
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
    a: "Non-production access and materials are discussed after approval and alignment on scope. This site does not promise public self-serve sandbox keys; your integration team should plan for server-to-server patterns and webhook verification from day one.",
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

      <Section tone="default" className="pt-10 sm:pt-16">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Merchants</p>
          <h1 className="mt-3 text-display font-semibold tracking-tight text-primary">
            Merchant onboarding — what to expect
          </h1>
          <p className="mt-4 max-w-3xl text-body text-muted">
            Kobbopay is built for teams that need explicit lifecycles, signed webhooks, and
            operational clarity. Access is intentional: we review fit and risk before enabling{" "}
            <strong className="text-primary">selected rails</strong> in your environment.
          </p>
          <CTAGroup className="mt-8">
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
          <p className="mt-4 text-sm text-muted">
            Start the structured inquiry on the{" "}
            <Link href="/contact#merchant-intake">contact page</Link>. For internal runbooks, your
            team can maintain process documentation alongside the codebase (for example under{" "}
            <code className="font-mono text-xs">docs/</code> in the marketing-site repository).
          </p>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="max-w-3xl space-y-8">
          <Card>
            <h2 className="text-h2 font-semibold text-primary">Review process</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              We triage inbound requests for basic fit: business model, geography, rails needs, and
              whether your use case matches B2B server-to-server integrations. Incomplete intakes
              slow everyone down;               the structured intake on the{" "}
              <Link href="/contact#merchant-intake">contact page</Link> reduces back-and-forth.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Integration discussion</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Technical discussions focus on payment creation, lifecycle semantics, webhook signing
              and raw-body verification, idempotent consumers, and how you map states to internal
              orders and finance controls. We do not use these sessions to collect secrets.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Merchant approval</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Approval is not guaranteed. Outcomes can include approval with scoped rails, deferral
              pending more information, or decline when we cannot support the model safely.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Operational requirements</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Expect to operate API keys and webhook secrets only on your infrastructure, maintain
              monitoring for delivery failures, and treat withdrawals and settlements as
              configuration-dependent operational flows—not anonymous always-on automation without
              controls.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Selected rails</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Enabled networks and assets are agreed per environment. Unsupported combinations stay
              unsupported; we avoid publishing a volatile public asset matrix on this marketing site.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Support expectations</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Support is for approved merchants and integration clarity—not for custody of your keys,
              remote wallet access, or “urgent verification” scams. Legitimate teams never need your
              seed phrase or private keys.
            </p>
          </Card>
        </Container>
      </Section>

      <Section tone="default" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-3xl">
          <h2 className="text-h2 font-semibold text-primary">FAQ</h2>
          <div className="mt-6 space-y-4">
            {faqItems.map((item) => (
              <Card key={item.q} interactive>
                <h3 className="text-h3 font-semibold text-primary">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
