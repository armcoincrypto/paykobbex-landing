import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { SITE_URL, OG_IMAGES, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Kobbopay Journal — operational notes on crypto payments, settlement, webhooks, and merchant infrastructure.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Kobbopay Journal",
    description:
      "Operational notes on crypto payments, settlement, webhooks, and merchant infrastructure.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kobbopay Journal — Kobbopay",
    description:
      "Operational notes on crypto payments, settlement, webhooks, and merchant infrastructure.",
    images: [OG_IMAGE.url],
  },
};

export default function BlogPage() {
  return (
    <>
      <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            className="ops-page-header--hero"
            eyebrow="Editorial"
            title="Kobbopay Journal"
            lead="Operational notes on crypto payments, settlement, webhooks, and merchant infrastructure."
          />
        </Container>
      </Section>

      <Section tone="muted" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-content">
          <div className="blog-journal-empty" role="status">
            <p className="blog-journal-empty__label">Coming soon</p>
            <p className="blog-journal-empty__copy">Articles are being prepared.</p>
          </div>
        </Container>
      </Section>
    </>
  );
}
