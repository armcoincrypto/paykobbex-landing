import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { MERCHANT_JOURNEY_FLOWS } from "@/lib/operational-realism";
import { SITE_URL, OG_IMAGES, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "B2B payment patterns for Kobbopay: invoicing, wallet top-ups, SaaS billing, and marketplace flows — with illustrative operational workflows on /operations, not fake case studies.",
  alternates: { canonical: `${SITE_URL}/use-cases` },
  openGraph: {
    title: "Use cases — Kobbopay",
    description: "B2B crypto payment patterns with links to illustrative operational workflows.",
    url: `${SITE_URL}/use-cases`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Use cases — Kobbopay",
    description: "B2B crypto payment patterns: invoices, top-ups, SaaS, marketplaces.",
    images: [OG_IMAGE.url],
  },
};

export default function UseCasesPage() {
  return (
    <>
      <Section tone="default" className="ops-page pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            eyebrow="Patterns"
            title="Use cases"
            lead={
              <>
                These are patterns teams adopt with B2B crypto payment infrastructure — not
                guarantees that every industry, geography, or business model is supported. For
                step-by-step illustrative workflows (no fake names or metrics), see{" "}
                <Link href="/operations">/operations</Link>.
              </>
            }
          />
          <ul className="mt-10 space-y-0">
            {MERCHANT_JOURNEY_FLOWS.map((flow) => (
              <li
                key={flow.id}
                className="border-t border-border-subtle/80 py-8 first:border-t-0 first:pt-0"
              >
                <h2 className="text-h3 font-semibold text-primary">{flow.title}</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{flow.summary}</p>
                <p className="mt-3 text-sm font-medium">
                  <Link href={`/operations#${flow.id}`}>Read example operational flow →</Link>
                </p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-muted">
            <Link href="/contact#merchant-intake" conv="request_access_click">
              Request access
            </Link>
            {" · "}
            <Link href="/docs">Docs</Link>
            {" · "}
            <Link href="/security">Security</Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
