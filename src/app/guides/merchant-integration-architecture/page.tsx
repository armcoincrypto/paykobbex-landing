import { Link } from "@/components/primitives/link";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { ProductionRealityNote } from "@/components/realism";
import { GuideSection } from "@/components/guides/GuideSection";
import { GuideLayout } from "@/components/operational/GuideLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("merchant-integration-architecture");

export default function GuideMerchantIntegrationArchitecturePage() {
  return (
    <>
      <JsonLd
        id="ld-json-guide-integration-arch-bc"
        data={guideBreadcrumbJsonLd("merchant-integration-architecture", "Integration architecture")}
      />

      <GuideLayout
        slug="merchant-integration-architecture"
        title="Merchant integration architecture"
        lead={
          <>
            Layered server-side boundaries for B2B crypto payments—API authority, webhook
            verification, lifecycle mapping, reconciliation, and treasury controls.
          </>
        }
        definitions={
          <p className="text-sm text-muted">
            Definitions: <Link href="/glossary#payment-rail-abstraction">Payment rail abstraction</Link>{" "}
            · <Link href="/glossary#selected-rails">Selected rails</Link> ·{" "}
            <Link href="/glossary#merchant-approval">Merchant approval</Link>
          </p>
        }
      >
        <GuideSection id="layers" title="Reference layers" index="01">
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>Commerce layer — creates payable intent with stable references.</li>
            <li>API layer — server-side payment creation and reads; secrets never in browsers.</li>
            <li>Webhook layer — raw-body verification, idempotency, replay controls.</li>
            <li>Lifecycle layer — explicit state transitions and checkpoints.</li>
            <li>Reconciliation layer — three-plane matchers and exception queues.</li>
            <li>Treasury layer — recognition and payout orchestration under finance policy.</li>
          </ol>
        </GuideSection>

        <GuideSection id="trust-boundaries" title="Trust boundaries" index="02">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Verification middleware is narrow: authenticate callbacks before application logic.
            Business rules (fulfillment, entitlements, posting) live in services finance can audit.
            <Link href="/glossary#payment-rail-abstraction"> Rail abstraction</Link> exposes stable
            semantics while detection rules remain configuration-bound per environment.
          </p>
        </GuideSection>

        <GuideSection id="environments" title="Environment separation" index="03">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Separate API keys, webhook secrets, and matcher tolerances per environment. Staging should
            replay fixtures with known signatures—never production secrets in demos.
          </p>
          <p className="text-sm text-muted">
            Read: <Link href="/guides/server-side-api-keys">Server-side API keys</Link>,{" "}
            <Link href="/docs">Integration docs</Link>,{" "}
            <Link href="/blog/production-grade-crypto-payment-infrastructure">Production infrastructure</Link>.
          </p>
        </GuideSection>

        <ProductionRealityNote compact />
        <GuideRelatedLinks />
      </GuideLayout>
    </>
  );
}
