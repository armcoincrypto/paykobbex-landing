import { Link } from "@/components/primitives/link";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { ProductionRealityNote } from "@/components/realism";
import { GuideSection } from "@/components/guides/GuideSection";
import { GuideLayout } from "@/components/operational/GuideLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("treasury-recognition-flow");

export default function GuideTreasuryRecognitionFlowPage() {
  return (
    <>
      <JsonLd
        id="ld-json-guide-treasury-bc"
        data={guideBreadcrumbJsonLd("treasury-recognition-flow", "Treasury recognition")}
      />

      <GuideLayout
        slug="treasury-recognition-flow"
        title="Treasury recognition flow"
        lead={
          <>
            How finance acceptance differs from lifecycle Confirmed states—and why treasury posting
            is typically the strictest recognition gate.
          </>
        }
        definitions={
          <p className="text-sm text-muted">
            Definitions: <Link href="/glossary#treasury-recognition">Treasury recognition</Link> ·{" "}
            <Link href="/glossary#treasury-posting">Treasury posting</Link> ·{" "}
            <Link href="/glossary#finance-reconciliation">Finance reconciliation</Link>
          </p>
        }
      >
        <GuideSection id="recognition-vs-confirmed" title="Recognition vs Confirmed" index="01">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Confirmed reflects provider lifecycle semantics under your policy.{" "}
            <Link href="/glossary#treasury-recognition">Treasury recognition</Link> is when finance
            accepts funds for allocation, reporting, or release—often after{" "}
            <Link href="/glossary#finance-reconciliation">finance reconciliation</Link> matchers succeed.
          </p>
        </GuideSection>

        <GuideSection id="flow" title="Reference flow" index="02">
          <ol className="list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>Verified lifecycle event updates provider plane.</li>
            <li>Commerce and provider planes align via matchers or exception queue.</li>
            <li>Finance reconciliation validates books-ready criteria.</li>
            <li>Treasury posting recorded under dual-control or approval rules where required.</li>
            <li>Payout orchestration—if any—is a separate initiated workflow.</li>
          </ol>
        </GuideSection>

        <GuideSection id="stablecoin" title="Stablecoin treasury notes" index="03">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            USDT and other stablecoin flows amplify rail-context discipline: same asset symbol on
            different networks is not interchangeable operationally. Recognition policy should
            reference rail context, not ticker alone.
          </p>
          <p className="text-sm text-muted">
            Read: <Link href="/blog/usdt-business-payments">USDT business payments</Link>,{" "}
            <Link href="/guides/settlement-vs-payout">Settlement vs payout</Link>.
          </p>
        </GuideSection>

        <ProductionRealityNote compact />
        <GuideRelatedLinks />
      </GuideLayout>
    </>
  );
}
