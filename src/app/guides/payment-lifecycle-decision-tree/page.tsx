import { Link } from "@/components/primitives/link";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { ProductionRealityNote } from "@/components/realism";
import { GuideSection } from "@/components/guides/GuideSection";
import { GuideLayout } from "@/components/operational/GuideLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("payment-lifecycle-decision-tree");

export default function GuidePaymentLifecycleDecisionTreePage() {
  return (
    <>
      <JsonLd
        id="ld-json-guide-lifecycle-tree-bc"
        data={guideBreadcrumbJsonLd("payment-lifecycle-decision-tree", "Lifecycle decision tree")}
      />

      <GuideLayout
        slug="payment-lifecycle-decision-tree"
        title="Payment lifecycle decision tree"
        lead={
          <>
            Operator-oriented paths from detection through policy confirmation, exceptions, and
            books-ready gates—without collapsing states.
          </>
        }
        definitions={
          <p className="text-sm text-muted">
            Definitions: <Link href="/glossary#payment-state-transition">Payment state transition</Link>{" "}
            · <Link href="/glossary#settlement-checkpoint">Settlement checkpoint</Link> ·{" "}
            <Link href="/glossary#settlement-eligibility">Settlement eligibility</Link>
          </p>
        }
      >
        <GuideSection id="detection" title="After detection (Paid or equivalent)" index="01">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Ask: does amount, asset, and reference meet{" "}
            <Link href="/glossary#settlement-eligibility">settlement eligibility</Link>? If no, route
            to <Link href="/glossary#exception-queue">exception queue</Link>—do not auto-fulfill
            high-risk SKUs unless policy explicitly allows.
          </p>
        </GuideSection>

        <GuideSection id="confirmation" title="Policy confirmation gate" index="02">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Confirmed means your configured confirmation semantics met—not merely that an explorer
            showed a transfer. Entitlements and operational finality may track Confirmed; treasury
            posting may still wait for finance reconciliation.
          </p>
        </GuideSection>

        <GuideSection id="exceptions-path" title="Exception branch" index="03">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Underpayment, wrong reference, or timing skew: pause automated posting, assign taxonomy
            class, collect evidence (payment_id, rail context, timestamps). Support shortcuts that
            bypass provider-plane transitions create{" "}
            <Link href="/glossary#operational-drift">operational drift</Link>.
          </p>
        </GuideSection>

        <GuideSection id="finance-gate" title="Books-ready / treasury posting" index="04">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Finance reconciliation satisfied? If yes, record{" "}
            <Link href="/glossary#treasury-posting">treasury posting</Link> under controls. If no,
            keep commerce/provider states honest—do not mark internal ledger state “final” informally.
          </p>
          <p className="text-sm text-muted">
            Read: <Link href="/guides/payment-lifecycle">Payment lifecycle guide</Link>,{" "}
            <Link href="/blog/payment-detection-vs-settlement-finality">Detection vs finality</Link>.
          </p>
        </GuideSection>

        <ProductionRealityNote compact />
        <GuideRelatedLinks />
      </GuideLayout>
    </>
  );
}
