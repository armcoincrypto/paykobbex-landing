import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { GuideSection } from "@/components/guides/GuideSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("server-side-api-keys");

export default function GuideServerSideApiKeysPage() {
  return (
    <>
      <JsonLd id="ld-json-guide-keys-bc" data={guideBreadcrumbJsonLd("server-side-api-keys", "Server-side API keys")} />

      <Section tone="default" className="pt-10 sm:pt-16">
        <Container className="max-w-3xl space-y-10">
          <header className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Guide</p>
            <h1 className="text-display font-semibold tracking-tight text-primary">Server-side API keys</h1>
            <p className="text-body leading-relaxed text-muted">
              Payment APIs are not browser toys. If a secret can be extracted from a client, it will
              be—eventually and painfully.
            </p>
            <p className="text-sm text-muted">
              Definitions: <Link href="/glossary#webhook-secret">Webhook secret</Link> ·{" "}
              <Link href="/glossary#merchant-approval">Merchant approval</Link>
            </p>
          </header>

          <GuideSection id="what-is-server-side-api-key-usage" title="What does “server-side API keys” mean?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              It means payment creation, privileged reads, and secret-bearing configuration changes are
              performed from your backend using keys stored in server-side secret management—not from
              web bundles, mobile apps, or public repositories.
            </p>
          </GuideSection>

          <GuideSection id="why-server-side-keys-matter" title="Why does this matter for crypto payments?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Crypto payment flows often combine payer UX with high-risk capabilities. Separating
              “customer checkout surfaces” from “secret-bearing integration” reduces accidental
              exposure and narrows incident blast radius.
            </p>
          </GuideSection>

          <GuideSection id="how-server-side-keys-work" title="How does a healthy checkout architecture look?">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              The browser talks to your backend. Your backend talks to Kobbopay. Status pages and
              payer experiences can still exist—without shipping merchant API keys to clients.
            </p>
          </GuideSection>

          <GuideSection id="common-mistakes-api-keys" title="Common mistakes">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
              <li>Embedding keys in mobile apps “temporarily” for a demo that becomes production.</li>
              <li>Pasting secrets into support chats, screenshots, or shared documents.</li>
              <li>Sharing the same key across unrelated services “for convenience.”</li>
            </ul>
          </GuideSection>

          <GuideSection id="security-considerations-api-keys" title="Security considerations">
            <p className="text-sm leading-relaxed text-muted sm:text-body">
              Rotate on compromise, scope keys to least privilege where your program supports it, and treat webhook secrets with the same seriousness as API keys.
            </p>
            <p className="text-sm text-muted">
              Read: <Link href="/docs#concepts">/docs#concepts</Link>, <Link href="/security">Security</Link>.
            </p>
          </GuideSection>

          <GuideRelatedLinks />
        </Container>
      </Section>
    </>
  );
}
