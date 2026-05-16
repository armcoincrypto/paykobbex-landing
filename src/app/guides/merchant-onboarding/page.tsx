import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { GuideSection } from "@/components/guides/GuideSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("merchant-onboarding");

export default function GuideMerchantOnboardingPage() {
  return (
    <>
      <JsonLd id="ld-json-guide-onboarding-bc" data={guideBreadcrumbJsonLd("merchant-onboarding", "Merchant onboarding")} />

      <Section tone="default" className="pt-10 sm:pt-16">
        <Container className="max-w-3xl space-y-10">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Guide</p>
            <h1 className="text-display font-semibold tracking-tight text-primary">Merchant onboarding</h1>
            <p className="text-body leading-relaxed text-muted">
              Onboarding is not a signup animation—it is access control, environment configuration,
              and integration alignment for moving value.
            </p>
            <p className="text-sm text-muted">
              Definitions: <Link href="/glossary#merchant-approval">Merchant approval</Link> ·{" "}
              <Link href="/glossary#selected-rails">Selected rails</Link> ·{" "}
              <Link href="/glossary#withdrawal-request">Withdrawal request</Link>
            </p>
          </header>

          <GuideSection id="what-is-merchant-onboarding-here" title="What is merchant onboarding here?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              It is the path from first contact to an approved merchant environment where rails are
              enabled intentionally and integration materials match what you will run in production.
            </p>
          </GuideSection>

          <GuideSection id="why-onboarding-matters" title="Why does onboarding matter operationally?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Because enabling payments without aligning on risk, rails, and operational controls
              creates predictable incidents: wrong network assumptions, reconciliation surprises, and
              fragile webhook consumers.
            </p>
          </GuideSection>

          <GuideSection id="how-onboarding-works" title="How does onboarding typically proceed?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Teams exchange context (business fit, rails, volumes), complete approval and environment
              setup, then integrate server-to-server and verify webhooks with idempotent handlers.
            </p>
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Public marketing pages cannot promise timelines; your intake thread is the right place for scheduling and next steps.
            </p>
          </GuideSection>

          <GuideSection id="common-mistakes-onboarding" title="Common mistakes">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
              <li>Treating approval as “broken UX” rather than intentional gating.</li>
              <li>Assuming test hosts or signing details are globally public before you receive materials.</li>
              <li>Skipping reconciliation design until after launch traffic arrives.</li>
            </ul>
          </GuideSection>

          <GuideSection id="security-considerations-onboarding" title="Security considerations">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Never send private keys, seed phrases, or webhook secrets in email. Legitimate onboarding never requires you to expose custody secrets to a vendor.
            </p>
            <p className="text-sm text-muted">
              Read: <Link href="/contact#merchant-intake">Contact — request access</Link> (what to include, what
              never to send),{" "}
              <Link href="/guides/server-side-api-keys">Server-side API keys</Link>.
            </p>
          </GuideSection>

          <GuideRelatedLinks />
        </Container>
      </Section>
    </>
  );
}
