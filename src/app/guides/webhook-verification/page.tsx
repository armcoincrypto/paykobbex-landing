import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { GuideSection } from "@/components/guides/GuideSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("webhook-verification");

export default function GuideWebhookVerificationPage() {
  return (
    <>
      <JsonLd id="ld-json-guide-webhook-bc" data={guideBreadcrumbJsonLd("webhook-verification", "Webhook verification")} />

      <Section tone="default" className="pt-10 sm:pt-16">
        <Container className="max-w-3xl space-y-10">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Guide</p>
            <h1 className="text-display font-semibold tracking-tight text-primary">Signed webhook verification</h1>
            <p className="text-body leading-relaxed text-muted">
              Webhooks are how event-driven systems stay consistent: they are also a favorite attack
              surface if you parse before you verify.
            </p>
            <p className="text-sm text-muted">
              Definitions: <Link href="/glossary#signed-webhook">Signed webhook</Link> ·{" "}
              <Link href="/glossary#webhook-secret">Webhook secret</Link> ·{" "}
              <Link href="/glossary#idempotency">Idempotency</Link>
            </p>
          </header>

          <GuideSection id="what-is-signed-webhook-verification" title="What is signed webhook verification?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              It is the practice of authenticating an inbound HTTP callback using a shared secret and
              a signature computed over the exact raw bytes received—before treating the payload as
              truth.
            </p>
          </GuideSection>

          <GuideSection id="why-webhook-verification-matters" title="Why does verification matter?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Because anyone can POST JSON to a public URL. Verification ties the body to a secret
              only your systems and Kobbopay should possess, reducing forgery and tampering risk when
              implemented correctly.
            </p>
          </GuideSection>

          <GuideSection id="how-webhook-verification-works" title="How does verification work (conceptually)?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              You read the raw body, compute an expected signature using your webhook secret, compare
              using a constant-time approach after enforcing equal buffer lengths, and only then parse
              JSON and mutate internal state.
            </p>
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Retries are normal: your handler must be idempotent so duplicate deliveries do not double-ship goods or double-post ledger entries.
            </p>
          </GuideSection>

          <GuideSection id="common-mistakes-webhooks" title="Common mistakes">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
              <li>Parsing JSON before verification, changing the byte sequence used for signing.</li>
              <li>Verifying in the browser or shipping webhook secrets to client-side code.</li>
              <li>Treating 2xx as “processed” before durable writes or safe queueing.</li>
            </ul>
          </GuideSection>

          <GuideSection id="security-considerations-webhooks" title="Security considerations">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Store webhook secrets in server-side secret management, rotate on compromise, and avoid logging raw secrets or full signed payloads in shared systems.
            </p>
            <p className="text-sm text-muted">
              Read: <Link href="/docs#webhook-verification">/docs#webhook-verification</Link>,{" "}
              <Link href="/docs#retry-idempotency">/docs#retry-idempotency</Link>,{" "}
              <Link href="/security">Security</Link>.
            </p>
          </GuideSection>

          <GuideRelatedLinks />
        </Container>
      </Section>
    </>
  );
}
