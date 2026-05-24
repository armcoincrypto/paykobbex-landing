import type { Metadata } from "next";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { CONTACT_EMAIL, OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Placeholder website terms for pay.kobbex.com: disclaimers, no availability guarantees, no regulatory claims, and merchant-product boundaries — not counsel-approved final terms.",
  alternates: { canonical: `${SITE_URL}/terms` },
  openGraph: {
    title: "Terms — Kobbopay",
    description: "Placeholder website terms for the Kobbopay marketing site.",
    url: `${SITE_URL}/terms`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms — Kobbopay",
    description: "Placeholder website terms for the Kobbopay marketing site.",
    images: [OG_IMAGE.url],
  },
};

const updated = "May 2026";

export default function TermsPage() {
  const legalMail = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Kobbopay marketing site — terms question")}`;

  return (
    <>
      <Section tone="default" className="legal-page legal-page-hero-band pt-10 sm:pt-16">
        <Container className="max-w-3xl">
          <p className="ops-eyebrow">Legal</p>
          <h1 className="mt-3 text-display font-semibold tracking-tight text-primary">Terms</h1>
          <p className="legal-meta">Last updated: {updated}</p>
          <p className="legal-lead">
            These are <strong className="text-primary">placeholder website terms</strong> for the
            marketing site at {SITE_URL.replace(/^https:\/\//, "")}. They are{" "}
            <strong className="text-primary">not legal advice</strong>, are{" "}
            <strong className="text-primary">not</strong> a substitute for counsel-approved
            merchant agreements, and are not an offer to provide regulated financial services in any
            particular jurisdiction.
          </p>
        </Container>
      </Section>

      <Section tone="muted" className="legal-page legal-body pb-[var(--token-section-loose)]">
        <Container className="max-w-3xl space-y-8">
          <Card>
            <h2 className="text-h2 font-semibold text-primary">Marketing vs product</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Copy on this site describes capabilities at a high level. Actual features, rails,
              risk controls, and operational behavior are governed by separate contracts and product
              configuration for approved merchants. Nothing here promises a specific feature is
              available to you until confirmed in writing for your environment.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">No uptime or performance guarantee</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Websites and software services can experience outages, maintenance, dependency
              failures, and security events. We do not guarantee uninterrupted availability of this
              marketing site or any production endpoint referenced here.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">No settlement, asset, or rail guarantee</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Crypto networks vary in behavior, congestion, reversibility assumptions, and asset
              support. We do not guarantee instant settlement, finality timing, support for any
              particular asset, or universal rail availability. Enabled rails are{" "}
              <strong className="text-primary">selected</strong> and{" "}
              <strong className="text-primary">environment-dependent</strong>.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">No regulatory status claims</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              This marketing site does not claim licensing outcomes, regulator approvals, audit
              opinions, or “bank-grade” assurances. Your compliance obligations remain yours; obtain
              regulatory guidance appropriate to your business.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Custody and risk</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Language about balances, withdrawals, and operational controls describes product
              concepts. It is not a promise of any particular custody model, insurance coverage, or
              loss outcome. If you need a custody or risk disclosure, it belongs in your merchant
              agreement and disclosures — not inferred from marketing copy.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Security communications</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Never send private keys, seed phrases, API secrets, or wallet access credentials to
              anyone based on an inbound email or chat message. If you are unsure whether a
              communication is authentic, use an independently verified channel.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Limitation of liability (placeholder)</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              To the maximum extent permitted by applicable law, the marketing site is provided “as
              is” without warranties of any kind, express or implied. Your counsel will want to
              replace this section with enforceable language appropriate to your entity and
              jurisdictions.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Changes</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              We may update this placeholder as the site evolves. Material changes should be
              reviewed with counsel before you rely on them for customer-facing commitments.
            </p>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Contact</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Questions about these placeholder terms:{" "}
              <Link href={legalMail} conv="contact_click">
                email {CONTACT_EMAIL}
              </Link>
              .
            </p>
            <p className="mt-4 text-sm text-muted">
              Related: <Link href="/privacy">Privacy</Link> · <Link href="/security">Security</Link>{" "}
              ·{" "}
              <Link href="/request-access" conv="request_access_click">
                Request access
              </Link>
            </p>
          </Card>

          <p className="ops-page-footer-links">
            <Link href="/privacy">Privacy</Link>
            {" · "}
            <Link href="/security">Security</Link>
            {" · "}
            <Link href="/contact">Contact</Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
