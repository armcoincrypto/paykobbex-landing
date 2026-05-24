import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { GuideInstrument } from "@/components/operational/GuideInstrument";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { GUIDE_ENTRIES, guidePath, type GuideSlug } from "@/lib/guides-meta";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Short, operational guides for B2B crypto payment infrastructure: lifecycles, signed webhooks, reconciliation, server-side keys, and merchant onboarding—aligned with Kobbopay integration docs.",
  alternates: { canonical: `${SITE_URL}/guides` },
  openGraph: {
    title: "Guides — Kobbopay",
    description:
      "Educational guides for crypto payment integrations: lifecycles, webhooks, reconciliation, secrets, and onboarding expectations.",
    url: `${SITE_URL}/guides`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guides — Kobbopay",
    description: "Operational education for B2B crypto payment integrations.",
    images: [OG_IMAGE.url],
  },
};

export default function GuidesHubPage() {
  return (
    <>
      <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16 pb-[var(--token-section-loose)]">
        <Container className="max-w-content">
          <OperationalPageHeader
            className="ops-page-header--hero"
            eyebrow="Guides"
            title="Operational education for integrations"
            lead={
              <>
                These pages are intentionally short: answer-first explanations you can quote in design
                docs, security reviews, and onboarding playbooks. They are{" "}
                <strong className="text-primary">not</strong> a substitute for your merchant agreement,
                environment-specific signing contracts, or legal advice.
              </>
            }
          >
            <p className="text-sm text-muted">
              Canonical definitions: <Link href="/glossary">Glossary</Link>. Technical overview:{" "}
              <Link href="/docs">/docs</Link>. Illustrative walkthroughs:{" "}
              <Link href="/operations">/operations</Link>. Step-by-step procedures:{" "}
              <Link href="/playbooks">Playbooks</Link>. Integration matrices:{" "}
              <Link href="/references">References</Link>.
            </p>
          </OperationalPageHeader>

          <ul className="ops-hub-list">
            {GUIDE_ENTRIES.map((g, i) => (
              <li key={g.slug} className="ops-hub-row">
                <article className="ops-hub-row__content">
                  <p className="proof-workflow-index">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 text-h2 font-semibold text-primary">
                    <Link href={guidePath(g.slug)} className="text-primary no-underline hover:text-accent">
                      {g.shortTitle}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{g.description}</p>
                  <p className="ops-hub-row__cta text-sm font-medium">
                    <Link href={guidePath(g.slug)}>Read guide →</Link>
                  </p>
                </article>
                <GuideInstrument slug={g.slug as GuideSlug} className="ops-hub-row__aside guides-hub-instrument lg:mt-6" />
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
