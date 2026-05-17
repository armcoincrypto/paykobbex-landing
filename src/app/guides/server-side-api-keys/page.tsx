import { Link } from "@/components/primitives/link";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { GuideSection } from "@/components/guides/GuideSection";
import { GuideLayout } from "@/components/operational/GuideLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("server-side-api-keys");

export default function GuideServerSideApiKeysPage() {
  return (
    <>
      <JsonLd id="ld-json-guide-keys-bc" data={guideBreadcrumbJsonLd("server-side-api-keys", "Server-side API keys")} />

      <GuideLayout
        slug="server-side-api-keys"
        title="Server-side API keys"
        lead={
          <>
            Payment APIs are not browser toys. If a secret can be extracted from a client, it will
            be—eventually and painfully.
          </>
        }
        definitions={
          <p className="text-sm text-muted">
            Definitions: <Link href="/glossary#webhook-secret">Webhook secret</Link> ·{" "}
            <Link href="/glossary#merchant-approval">Merchant approval</Link>
          </p>
        }
      >
        <GuideSection id="what-is-server-side-api-key-usage" title="What does “server-side API keys” mean?" index="01">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            It means payment creation, privileged reads, and secret-bearing configuration changes are
            performed from your backend using keys stored in server-side secret management—not from
            web bundles, mobile apps, or public repositories.
          </p>
        </GuideSection>

        <GuideSection id="why-server-side-keys-matter" title="Why does this matter for crypto payments?" index="02">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Crypto payment flows often combine payer UX with high-risk capabilities. Separating
            “customer checkout surfaces” from “secret-bearing integration” reduces accidental
            exposure and narrows incident blast radius.
          </p>
        </GuideSection>

        <GuideSection id="how-server-side-keys-work" title="How does a healthy checkout architecture look?" index="03">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            The browser talks to your backend. Your backend talks to Kobbopay. Status pages and
            payer experiences can still exist—without shipping merchant API keys to clients.
          </p>
        </GuideSection>

        <GuideSection id="common-mistakes-api-keys" title="Common mistakes" index="04">
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
            <li>Embedding keys in mobile apps “temporarily” for a demo that becomes production.</li>
            <li>Pasting secrets into support chats, screenshots, or shared documents.</li>
            <li>Sharing the same key across unrelated services “for convenience.”</li>
          </ul>
        </GuideSection>

        <GuideSection id="security-considerations-api-keys" title="Security considerations" index="05">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Rotate on compromise, scope keys to least privilege where your program supports it, and treat webhook secrets with the same seriousness as API keys.
          </p>
          <p className="text-sm text-muted">
            Read: <Link href="/docs#concepts">/docs#concepts</Link>, <Link href="/security">Security</Link>.
          </p>
        </GuideSection>

        <GuideRelatedLinks />
      </GuideLayout>
    </>
  );
}
