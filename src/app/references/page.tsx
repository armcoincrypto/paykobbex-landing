import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { OpsHubAside } from "@/components/operational/OpsHubAside";
import { REFERENCE_ENTRIES, referencePath } from "@/lib/references/meta";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Integration references",
  description:
    "Institutional integration references for crypto payment operations: rail selection matrices, confirmation policy models, reconciliation states, webhook delivery expectations, and ledger transitions.",
  alternates: { canonical: `${SITE_URL}/references` },
  openGraph: {
    title: "Integration references — Kobbopay",
    description: "Decision matrices and operational models for merchant integration design.",
    url: `${SITE_URL}/references`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Integration references — Kobbopay",
    images: [OG_IMAGE.url],
  },
};

export default function ReferencesHubPage() {
  return (
    <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16 pb-[var(--token-section-loose)]">
      <Container className="max-w-content">
        <OperationalPageHeader
          className="ops-page-header--hero"
          eyebrow="Integration references"
          title="Operational design references"
          lead={
            <>
              Matrices and state models for integration architects and payment operators—citation-friendly,
              bounded to merchant policy. Not live API documentation.
            </>
          }
        >
          <p className="text-sm text-muted">
            Playbooks: <Link href="/playbooks">/playbooks</Link>. Docs: <Link href="/docs">/docs</Link>.
          </p>
        </OperationalPageHeader>

        <ul className="ops-hub-list">
          {REFERENCE_ENTRIES.map((entry, i) => (
            <li key={entry.slug} className="ops-hub-row">
              <article className="ops-hub-row__content">
                <p className="proof-workflow-index">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-h2 font-semibold text-primary">
                  <Link href={referencePath(entry.slug)} className="text-primary no-underline hover:text-accent">
                    {entry.shortTitle}
                  </Link>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{entry.description}</p>
                <p className="ops-hub-row__cta text-sm font-medium">
                  <Link href={referencePath(entry.slug)}>View reference →</Link>
                </p>
              </article>
              <OpsHubAside index={String(i + 1).padStart(2, "0")} kind="Reference" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
