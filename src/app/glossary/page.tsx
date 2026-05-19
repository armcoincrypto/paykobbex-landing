import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { GlossaryIndex, GlossaryTermEntry, OperationalPageHeader } from "@/components/operational";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { GLOSSARY_GROUPS, glossaryTermsForGroup } from "@/lib/glossary-terms";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Glossary",
  description:
    "Canonical glossary for Kobbopay B2B crypto payments: lifecycle states, signed webhooks, idempotency, reconciliation, merchant approval, selected rails, and withdrawal requests—bounded, citation-friendly definitions.",
  alternates: { canonical: `${SITE_URL}/glossary` },
  openGraph: {
    title: "Glossary — Kobbopay",
    description:
      "Stable definitions for payment lifecycle semantics, webhooks, reconciliation, and operational controls.",
    url: `${SITE_URL}/glossary`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Glossary — Kobbopay",
    description: "Citation-friendly definitions for crypto payment infrastructure concepts.",
    images: [OG_IMAGE.url],
  },
};

const breadcrumbJson = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Glossary", item: `${SITE_URL}/glossary` },
  ],
};

export default function GlossaryPage() {
  return (
    <>
      <JsonLd id="ld-json-glossary-breadcrumb" data={breadcrumbJson} />

      <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            className="ops-page-header--hero"
            eyebrow="Terminology system"
            title="Operational language reference"
            lead={
              <>
                These definitions are written to be{" "}
                <strong className="text-primary">quote-friendly</strong> and{" "}
                <strong className="text-primary">bounded</strong>: they describe how Kobbopay talks
                about operations on this site, not every legal obligation or every edge case in your
                deployment.
              </>
            }
          >
            <p className="text-sm text-muted">
              Integration overview: <Link href="/docs">/docs</Link>. Guides:{" "}
              <Link href="/guides">/guides</Link>. Security: <Link href="/security">/security</Link>.
            </p>
          </OperationalPageHeader>

          <div className="ops-glossary-layout mt-12">
            <aside className="ops-glossary-index-slot">
              <GlossaryIndex />
            </aside>
            <div className="min-w-0">
              {GLOSSARY_GROUPS.map((group) => (
                <section
                  key={group.id}
                  id={`glossary-${group.id}`}
                  className="ops-glossary-group"
                  aria-labelledby={`glossary-heading-${group.id}`}
                >
                  <p className="proof-workflow-index">{group.id}</p>
                  <h2 id={`glossary-heading-${group.id}`} className="mt-1 text-h2 font-semibold text-primary">
                    {group.label}
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{group.description}</p>
                  <dl className="mt-6">
                    {glossaryTermsForGroup(group.id).map((term) => (
                      <GlossaryTermEntry key={term.id} term={term} />
                    ))}
                  </dl>
                </section>
              ))}

              <VerificationFramePanel
                label="Usage"
                sublabel="Citation discipline"
                className="mt-12"
              >
                <h3 className="text-h3 font-semibold text-primary">How to use this glossary</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
                  <li>
                    Link to anchors like{" "}
                    <code className="font-mono text-xs text-primary">/glossary#paid</code> for stable citations.
                  </li>
                  <li>Treat enums and edge transitions as deployment-specific unless your contract says otherwise.</li>
                  <li>
                    For onboarding and access questions, use{" "}
                    <Link href="/contact#merchant-intake" conv="request_access_click">
                      Request access
                    </Link>
                    —never send secrets in email.
                  </li>
                </ul>
              </VerificationFramePanel>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
