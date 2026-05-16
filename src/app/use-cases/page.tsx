import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { SITE_URL, OG_IMAGES, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Use cases",
  description:
    "Common B2B patterns for Kobbopay: invoicing, wallet top-ups, SaaS billing, and marketplace settlements — where permitted by law and your agreements, on selected rails where enabled.",
  alternates: { canonical: `${SITE_URL}/use-cases` },
  openGraph: {
    title: "Use cases — Kobbopay",
    description: "B2B crypto payment patterns supported by Kobbopay infrastructure.",
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

const cases = [
  {
    title: "Invoices and receivables",
    body: "Issue a payment request tied to an order or invoice id, track lifecycle states, and reconcile using webhook-driven bookkeeping — where your workflow permits crypto settlement.",
  },
  {
    title: "Wallet top-ups and balances",
    body: "Let users add funds with explicit lifecycle semantics and operational visibility — without pretending custody models are simpler than they are.",
  },
  {
    title: "SaaS billing (technical buyer)",
    body: "Integrate server-to-server payment creation and webhook-driven entitlement updates with idempotent handlers and clear status definitions.",
  },
  {
    title: "Marketplaces (high scrutiny)",
    body: "Marketplaces vary widely in legal and operational requirements. Kobbopay provides infrastructure primitives; you remain responsible for compliant product design in your jurisdictions.",
  },
];

export default function UseCasesPage() {
  return (
    <>
      <Section tone="default" className="pt-10 sm:pt-16">
        <Container>
          <h1 className="text-display font-semibold tracking-tight text-primary">Use cases</h1>
          <p className="mt-4 max-w-3xl text-body text-muted">
            These are patterns teams adopt with B2B crypto payment infrastructure — not guarantees
            that every industry, geography, or business model is supported. Merchant access remains
            subject to <strong className="text-primary">merchant approval</strong>, and rails are
            enabled as <strong className="text-primary">selected rails</strong> where available for
            your environment.
          </p>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="grid gap-4 md:grid-cols-2">
          {cases.map((c) => (
            <Card key={c.title} interactive>
              <h3 className="text-h3 font-semibold text-primary">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
            </Card>
          ))}
        </Container>
        <Container className="mt-10">
          <p className="text-sm text-muted">
            Next:{" "}
            <Link href="/contact#merchant-intake" conv="request_access_click">
              Request access
            </Link>{" "}
            ·{" "}
            <Link href="/docs">
              Docs
            </Link>{" "}
            ·{" "}
            <Link href="/security">Security</Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
