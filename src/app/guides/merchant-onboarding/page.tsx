import { Link } from "@/components/primitives/link";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { GuideSection } from "@/components/guides/GuideSection";
import { GuideLayout } from "@/components/operational/GuideLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("merchant-onboarding");

export default function GuideMerchantOnboardingPage() {
  return (
    <>
      <JsonLd id="ld-json-guide-onboarding-bc" data={guideBreadcrumbJsonLd("merchant-onboarding", "Merchant onboarding")} />

      <GuideLayout
        slug="merchant-onboarding"
        title="Merchant onboarding"
        lead={
          <>
            Onboarding is not a signup animation—it is access control, environment configuration,
            and integration alignment for moving value.
          </>
        }
        definitions={
          <p className="text-sm text-muted">
            Definitions: <Link href="/glossary#merchant-approval">Merchant approval</Link> ·{" "}
            <Link href="/glossary#selected-rails">Selected rails</Link> ·{" "}
            <Link href="/glossary#withdrawal-request">Withdrawal request</Link>
          </p>
        }
      >
        <GuideSection id="what-is-merchant-onboarding-here" title="What is merchant onboarding here?" index="01">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            It is the path from first contact to an approved merchant environment where rails are
            enabled intentionally and integration materials match what you will run in production.
          </p>
          <p className="mt-3 text-sm font-medium">
            <Link href="/onboarding">Full onboarding expectations →</Link>
          </p>
        </GuideSection>

        <GuideSection id="why-onboarding-matters" title="Why does onboarding matter operationally?" index="02">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Because enabling payments without aligning on risk, rails, and operational controls
            creates predictable incidents: wrong network assumptions, reconciliation surprises, and
            fragile webhook consumers.
          </p>
        </GuideSection>

        <GuideSection id="how-onboarding-works" title="How does onboarding typically proceed?" index="03">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Teams exchange context (business fit, rails, volumes), complete approval and environment
            setup, then integrate server-to-server and verify webhooks with idempotent handlers.
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Public marketing pages cannot promise timelines; your intake thread is the right place for scheduling and next steps.
          </p>
        </GuideSection>

        <GuideSection id="common-mistakes-onboarding" title="Common mistakes" index="04">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>Treating approval as “broken UX” rather than intentional gating.</li>
            <li>Assuming test hosts or signing details are globally public before you receive materials.</li>
            <li>Skipping reconciliation design until after launch traffic arrives.</li>
          </ul>
        </GuideSection>

        <GuideSection id="security-considerations-onboarding" title="Security considerations" index="05">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Never send private keys, seed phrases, or webhook secrets in email. Legitimate onboarding never requires you to expose custody secrets to a vendor.
          </p>
          <p className="text-sm text-muted">
            Read: <Link href="/request-access">Contact — request access</Link> (what to include, what
            never to send),{" "}
            <Link href="/guides/server-side-api-keys">Server-side API keys</Link>.
          </p>
        </GuideSection>

        <GuideRelatedLinks />
      </GuideLayout>
    </>
  );
}
