import { Link } from "@/components/primitives/link";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { ProductionRealityNote } from "@/components/realism";
import { GuideSection } from "@/components/guides/GuideSection";
import { GuideLayout } from "@/components/operational/GuideLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("reconciliation-checklist");

export default function GuideReconciliationChecklistPage() {
  return (
    <>
      <JsonLd
        id="ld-json-guide-reconciliation-checklist-bc"
        data={guideBreadcrumbJsonLd("reconciliation-checklist", "Reconciliation checklist")}
      />

      <GuideLayout
        slug="reconciliation-checklist"
        title="Reconciliation implementation checklist"
        lead={
          <>
            Use this checklist when designing matchers, exception queues, and period close—not as
            universal accounting policy.
          </>
        }
        definitions={
          <p className="text-sm text-muted">
            Definitions:{" "}
            <Link href="/glossary#three-plane-reconciliation">Three-plane reconciliation</Link> ·{" "}
            <Link href="/glossary#exception-queue">Exception queue</Link> ·{" "}
            <Link href="/glossary#finance-reconciliation">Finance reconciliation</Link>
          </p>
        }
      >
        <GuideSection id="plane-setup" title="Define the three planes" index="01">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>Commerce plane: orders, invoices, subscriptions with stable merchant references.</li>
            <li>Provider plane: payment_id lifecycle from API and verified webhooks.</li>
            <li>Finance plane: ledger/treasury postings under your recognition policy.</li>
            <li>Document mapping tables between plane identifiers—not assumed 1:1 joins.</li>
          </ul>
        </GuideSection>

        <GuideSection id="matchers" title="Matcher and tolerance rules" index="02">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>Amount tolerances per asset and rail—explicit, not tribal knowledge.</li>
            <li>Reference matching rules for memos, order ids, and partial payments.</li>
            <li>Timing windows for async settlement before raising timing-skew exceptions.</li>
            <li>Auto-resolve only where taxonomy and finance policy allow it.</li>
          </ul>
        </GuideSection>

        <GuideSection id="exceptions" title="Exception queue ownership" index="03">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Route failed matchers to named exception classes with owners (support, treasury,
            engineering, finance). Require resolution codes and payment_id references—avoid
            free-text-only closes.
          </p>
          <p className="text-sm text-muted">
            Read:{" "}
            <Link href="/blog/exception-taxonomy-crypto-payment-operations">
              Exception taxonomy
            </Link>
            , <Link href="/blog/three-plane-reconciliation-architecture">Three-plane architecture</Link>.
          </p>
        </GuideSection>

        <GuideSection id="period-close" title="Period close ceremony" index="04">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>Re-run matchers for the close window with frozen tolerances.</li>
            <li>Review aging exceptions by class—not only total unmatched value.</li>
            <li>Finance sign-off references provider event evidence, not explorer screenshots alone.</li>
            <li>Record drift metrics if plane totals diverge beyond thresholds.</li>
          </ul>
        </GuideSection>

        <ProductionRealityNote compact />
        <GuideRelatedLinks />
      </GuideLayout>
    </>
  );
}
