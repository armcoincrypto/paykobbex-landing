import { Link } from "@/components/primitives/link";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { ProductionRealityNote } from "@/components/realism";
import { GuideSection } from "@/components/guides/GuideSection";
import { GuideLayout } from "@/components/operational/GuideLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("settlement-vs-payout");

export default function GuideSettlementVsPayoutPage() {
  return (
    <>
      <JsonLd
        id="ld-json-guide-settlement-payout-bc"
        data={guideBreadcrumbJsonLd("settlement-vs-payout", "Settlement vs payout")}
      />

      <GuideLayout
        slug="settlement-vs-payout"
        title="Settlement vs payout"
        lead={
          <>
            Inbound settlement rails, merchant balance semantics, and payout orchestration are
            related—but conflating them creates treasury and support incidents.
          </>
        }
        definitions={
          <p className="text-sm text-muted">
            Definitions: <Link href="/glossary#settlement-rail">Settlement rail</Link> ·{" "}
            <Link href="/glossary#payout-rail">Payout rail</Link> ·{" "}
            <Link href="/glossary#payout-orchestration">Payout orchestration</Link>
          </p>
        }
      >
        <GuideSection id="settlement" title="Inbound settlement" index="01">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            <Link href="/glossary#settlement-rail">Settlement rails</Link> observe and confirm inbound
            merchant payments on configured networks/assets. Detection and confirmation follow lifecycle
            semantics—not every Confirmed payment automatically triggers outbound movement.
          </p>
        </GuideSection>

        <GuideSection id="balance" title="Merchant balance vs wallet slogans" index="02">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            <Link href="/glossary#merchant-balance">Merchant balance</Link> is a ledger-oriented view
            under product accounting rules. It is not a promise that funds are instantly withdrawable on
            any rail at any time.
          </p>
        </GuideSection>

        <GuideSection id="payout" title="Payout orchestration" index="03">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            <Link href="/glossary#withdrawal-request">Withdrawal requests</Link> initiate{" "}
            <Link href="/glossary#payout-orchestration">payout orchestration</Link> subject to controls,
            selected <Link href="/glossary#payout-rail">payout rails</Link>, and finance approval—not
            implicit on every payment event.
          </p>
          <p className="text-sm text-muted">
            Read: <Link href="/guides/treasury-recognition-flow">Treasury recognition flow</Link>,{" "}
            <Link href="/blog/stablecoin-operations">Stablecoin operations hub</Link>.
          </p>
        </GuideSection>

        <ProductionRealityNote compact />
        <GuideRelatedLinks />
      </GuideLayout>
    </>
  );
}
