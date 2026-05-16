import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { GUIDE_ENTRIES, guidePath } from "@/lib/guides-meta";
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
      <Section tone="default" className="pt-10 sm:pt-16">
        <Container className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">Guides</p>
          <h1 className="mt-3 text-display font-semibold tracking-tight text-primary">
            Operational education for integrations
          </h1>
          <p className="mt-4 text-body leading-relaxed text-muted">
            These pages are intentionally short: answer-first explanations you can quote in design
            docs, security reviews, and onboarding playbooks. They are{" "}
            <strong className="text-primary">not</strong> a substitute for your merchant agreement,
            environment-specific signing contracts, or legal advice.
          </p>
          <p className="mt-4 text-sm text-muted">
            Canonical definitions: <Link href="/glossary">Glossary</Link>. Technical overview:{" "}
            <Link href="/docs">
              /docs
            </Link>
            .
          </p>
        </Container>
      </Section>

      <Section tone="muted" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-content">
          <div className="grid gap-4 md:grid-cols-2">
            {GUIDE_ENTRIES.map((g) => (
              <Card key={g.slug} interactive>
                <h2 className="text-h3 font-semibold text-primary">
                  <Link href={guidePath(g.slug)} className="text-primary no-underline hover:text-accent">
                    {g.shortTitle}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{g.description}</p>
                <p className="mt-4 text-sm">
                  <Link href={guidePath(g.slug)} className="font-medium">
                    Read guide →
                  </Link>
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
