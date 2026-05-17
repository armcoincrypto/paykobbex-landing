import { Link } from "@/components/primitives/link";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { ProductionRealityNote } from "@/components/realism";
import { GuideSection } from "@/components/guides/GuideSection";
import { GuideLayout } from "@/components/operational/GuideLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("reconciliation-and-confirmations");

export default function GuideReconciliationPage() {
  return (
    <>
      <JsonLd
        id="ld-json-guide-recon-bc"
        data={guideBreadcrumbJsonLd("reconciliation-and-confirmations", "Reconciliation & confirmations")}
      />

      <GuideLayout
        slug="reconciliation-and-confirmations"
        title="Reconciliation and confirmations"
        lead={
          <>
            Reconciliation is where payments become finance truth. Crypto adds confirmation nuance:
            your policies must map cleanly to lifecycle semantics.
          </>
        }
        definitions={
          <p className="text-sm text-muted">
            Definitions: <Link href="/glossary#reconciliation">Reconciliation</Link> ·{" "}
            <Link href="/glossary#paid">Paid</Link> · <Link href="/glossary#confirmed">Confirmed</Link>
          </p>
        }
      >
        <GuideSection id="what-is-reconciliation-here" title="What is reconciliation in this context?" index="01">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            It is the disciplined mapping from external payment states to internal orders, revenue
            recognition triggers, and operational workflows—using explicit lifecycle labels rather
            than informal language.
          </p>
        </GuideSection>

        <GuideSection id="why-reconciliation-matters" title="Why do confirmations matter?" index="02">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Because operational and accounting risk lives in the gap between “we saw funds” and
            “our policy considers the payment final for settlement purposes.” Infrastructure should
            make that gap explicit, not hide it.
          </p>
        </GuideSection>

        <GuideSection id="how-reconciliation-works" title="How do teams implement this well?" index="03">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Define internal state machines with documented transitions, align webhook consumers to
            those transitions, and document which external state satisfies each internal gate.
          </p>
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Use idempotent updates so retries and out-of-order delivery do not corrupt ledgering.
          </p>
        </GuideSection>

        <GuideSection id="common-mistakes-reconciliation" title="Common mistakes" index="04">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>Granting entitlements on Paid when your policy requires Confirmed.</li>
            <li>Letting support tooling interpret statuses differently than finance tooling.</li>
            <li>Assuming one confirmation rule fits every enabled rail.</li>
          </ul>
        </GuideSection>

        <GuideSection id="security-considerations-reconciliation" title="Security considerations" index="05">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Reconciliation pipelines often touch sensitive business data. Keep webhook verification strict and restrict operational tools with normal least-privilege practices.
          </p>
        </GuideSection>

        <ProductionRealityNote compact />

        <GuideRelatedLinks />
      </GuideLayout>
    </>
  );
}
