import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { GuideSection } from "@/components/guides/GuideSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("payment-lifecycle");

export default function GuidePaymentLifecyclePage() {
  return (
    <>
      <JsonLd id="ld-json-guide-lifecycle-bc" data={guideBreadcrumbJsonLd("payment-lifecycle", "Payment lifecycle")} />

      <Section tone="default" className="pt-10 sm:pt-16">
        <Container className="max-w-3xl space-y-10">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Guide</p>
            <h1 className="text-display font-semibold tracking-tight text-primary">Payment lifecycle</h1>
            <p className="text-body leading-relaxed text-muted">
              A payment lifecycle is the backbone of B2B crypto payment infrastructure: it is how you
              automate fulfillment without pretending on-chain finality is simpler than it is.
            </p>
            <p className="text-sm text-muted">
              Definitions: <Link href="/glossary#payment-lifecycle">Glossary: payment lifecycle</Link>{" "}
              · <Link href="/glossary#pending">Pending</Link> · <Link href="/glossary#paid">Paid</Link> ·{" "}
              <Link href="/glossary#confirmed">Confirmed</Link> · <Link href="/glossary#expired">Expired</Link>
            </p>
          </header>

          <GuideSection id="what-is-payment-lifecycle" title="What is a payment lifecycle?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              It is the set of states a single payment object can occupy as your system and the rail
              observe payer behavior, detection rules, confirmation rules, and expiry windows.
            </p>
          </GuideSection>

          <GuideSection id="why-payment-lifecycle-matters" title="Why does the lifecycle matter?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Because “paid” is not always “final for accounting.” Teams ship incidents when they
              collapse detection into confirmation, or when support interprets UI text differently
              than finance interprets ledger rules.
            </p>
          </GuideSection>

          <GuideSection id="how-payment-lifecycle-works" title="How does the lifecycle work in practice?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              A typical conceptual progression is <strong className="text-primary">Pending</strong> →{" "}
              <strong className="text-primary">Paid</strong> → <strong className="text-primary">Confirmed</strong>, with{" "}
              <strong className="text-primary">Expired</strong> as a common terminal branch. Exact transitions depend on your deployment.
            </p>
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Webhooks communicate transitions; your consumers should verify and apply updates idempotently.
            </p>
          </GuideSection>

          <GuideSection id="common-mistakes-lifecycle" title="Common mistakes">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
              <li>Treating “detected funds” as entitlement fulfillment without confirmation policy alignment.</li>
              <li>Encoding lifecycle rules only in UI strings instead of explicit internal state machines.</li>
              <li>Assuming identical semantics across every asset and network you might enable later.</li>
            </ul>
          </GuideSection>

          <GuideSection id="security-considerations-lifecycle" title="Security considerations">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Lifecycle updates should arrive through authenticated channels you control (typically signed webhooks and server-side API reads). Public payer status surfaces, if used, must not leak merchant secrets.
            </p>
            <p className="text-sm text-muted">
              Read: <Link href="/guides/webhook-verification">Webhook verification</Link>,{" "}
              <Link href="/guides/server-side-api-keys">Server-side API keys</Link>,{" "}
              <Link href="/security">Security</Link>.
            </p>
          </GuideSection>

          <GuideRelatedLinks />
        </Container>
      </Section>
    </>
  );
}
