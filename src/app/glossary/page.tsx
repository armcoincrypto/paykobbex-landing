import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { GLOSSARY_TERMS } from "@/lib/glossary-terms";
import { GUIDE_ENTRIES, guidePath, type GuideSlug } from "@/lib/guides-meta";
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

function guideTitle(slug: GuideSlug): string {
  return GUIDE_ENTRIES.find((g) => g.slug === slug)?.shortTitle ?? slug;
}

export default function GlossaryPage() {
  return (
    <>
      <JsonLd id="ld-json-glossary-breadcrumb" data={breadcrumbJson} />

      <Section tone="default" className="pt-10 sm:pt-16">
        <Container className="max-w-3xl space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Glossary</p>
          <h1 className="text-display font-semibold tracking-tight text-primary">
            Canonical definitions (marketing site)
          </h1>
          <p className="text-body leading-relaxed text-muted">
            These definitions are written to be <strong className="text-primary">quote-friendly</strong>{" "}
            and <strong className="text-primary">bounded</strong>: they describe how Kobbopay talks
            about operations on this site, not every legal obligation or every edge case in your
            deployment.
          </p>
          <p className="text-sm text-muted">
            Integration overview:{" "}
            <Link href="/docs">
              /docs
            </Link>
            . Guides: <Link href="/guides">/guides</Link>. Security: <Link href="/security">/security</Link>
            .
          </p>
        </Container>
      </Section>

      <Section tone="muted" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-content">
          <dl className="grid gap-6 sm:grid-cols-2">
            {GLOSSARY_TERMS.map((row) => (
              <div
                key={row.id}
                id={row.id}
                className="scroll-mt-28 rounded-lg border border-border-subtle/90 bg-surface-elevated/60 p-5 shadow-card"
              >
                <dt className="text-sm font-semibold text-primary">{row.term}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted">{row.def}</dd>
                {row.relatedGuides?.length ? (
                  <dd className="mt-3 text-xs text-muted">
                    <span className="font-semibold text-primary">Guides:</span>{" "}
                    {row.relatedGuides.map((slug, i) => (
                      <span key={slug}>
                        {i > 0 ? " · " : null}
                        <Link href={guidePath(slug)} className="text-muted hover:text-primary">
                          {guideTitle(slug)}
                        </Link>
                      </span>
                    ))}
                  </dd>
                ) : null}
              </div>
            ))}
          </dl>

          <Card className="mx-auto mt-10 max-w-3xl border-accent/20 bg-surface-elevated/80 ring-1 ring-inset ring-accent/10">
            <h2 className="text-h3 font-semibold text-primary">How to use this glossary</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>Link to anchors like <code className="font-mono text-xs text-primary">/glossary#paid</code> for stable citations.</li>
              <li>Treat enums and edge transitions as deployment-specific unless your contract says otherwise.</li>
              <li>
                For onboarding and access questions, use{" "}
                <Link href="/contact#merchant-intake" conv="request_access_click">
                  Request access
                </Link>
                —never send secrets in email.
              </li>
            </ul>
          </Card>
        </Container>
      </Section>
    </>
  );
}
