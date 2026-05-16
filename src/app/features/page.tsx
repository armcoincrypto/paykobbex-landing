import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { SITE_URL, OG_IMAGES, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Kobbopay features: API-created payments, explicit lifecycles, signed webhooks, merchant portal operations, ledger-oriented balances, and withdrawal requests — after approval, on selected rails where enabled.",
  alternates: { canonical: `${SITE_URL}/features` },
  openGraph: {
    title: "Features — Kobbopay",
    description:
      "Explore Kobbopay capabilities for B2B crypto payments: API, webhooks, portal, balances, and controlled withdrawals.",
    url: `${SITE_URL}/features`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Features — Kobbopay",
    description: "B2B crypto payment infrastructure: API, webhooks, portal, balances, and merchant-initiated withdrawal requests.",
    images: [OG_IMAGE.url],
  },
};

const pillars = [
  {
    title: "API-created payments",
    body: "Create payments from your backend with a server-to-server API. API keys belong on your servers — not in browsers or mobile clients.",
  },
  {
    title: "Explicit lifecycles",
    body: "Payments move through defined lifecycle states so engineering, finance, and support can agree on what each status means for your workflows.",
  },
  {
    title: "Signed webhooks",
    body: "Subscribe to lifecycle events with signed deliveries so your systems can verify authenticity before updating internal state.",
  },
  {
    title: "Merchant portal",
    body: "Operate day-to-day: review payments, manage keys and webhook configuration, and follow operational signals appropriate to your deployment.",
  },
  {
    title: "Balances and reconciliation",
    body: "Balances are understood through ledger-oriented accounting tied to confirmation semantics — not vague “wallet vibes.”",
  },
  {
    title: "Withdrawal requests",
    body: "Merchants initiate withdrawal requests. Execution is subject to operational controls and configuration — not a promise of universal instant on-chain payout.",
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Section tone="default" className="pt-10 sm:pt-16">
        <Container>
          <h1 className="text-display font-semibold tracking-tight text-primary">Features</h1>
          <p className="mt-4 max-w-3xl text-body text-muted">
            Kobbopay is API-first B2B crypto payment infrastructure with signed webhooks, explicit
            payment lifecycles, and a merchant portal for operations — after merchant approval, on
            selected rails where enabled.
          </p>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <div className="grid gap-4 md:grid-cols-2">
            {pillars.map((p) => (
              <Card key={p.title} interactive>
                <h3 className="text-h3 font-semibold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
              </Card>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted">
            See also:{" "}
            <Link href="/docs">
              Docs
            </Link>
            {", "}
            <Link href="/developers">
              Developers
            </Link>
            {", "}
            <Link href="/guides">Guides</Link>
            {", "}
            <Link href="/glossary">Glossary</Link>
            {", "}
            <Link href="/security">Security</Link>
            {", "}
            <Link href="/use-cases">Use cases</Link>
            {", "}
            <Link href="/pricing">Pricing</Link>.
          </p>
        </Container>
      </Section>
    </>
  );
}
