import type { Metadata } from "next";
import { MerchantIntakeForm } from "@/components/contact/MerchantIntakeForm";
import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { CONTACT_EMAIL, SITE_URL, OG_IMAGES, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kobbopay to request merchant access, ask integration questions, and discuss selected rails — without sharing secrets in email. Access is subject to merchant approval.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact — Kobbopay",
    description: "Request access and ask integration questions about Kobbopay.",
    url: `${SITE_URL}/contact`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Kobbopay",
    description: "Request access to Kobbopay B2B crypto payment infrastructure.",
    images: [OG_IMAGE.url],
  },
};

export default function ContactPage() {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Kobbopay — access / integration inquiry")}`;

  return (
    <>
      <Section tone="default" className="pt-10 sm:pt-16">
        <Container className="max-w-3xl">
          <h1 className="text-display font-semibold tracking-tight text-primary">Contact</h1>
          <p className="mt-4 max-w-3xl text-body text-muted">
            Request merchant access or ask an integration question. Access is subject to{" "}
            <strong className="text-primary">merchant approval</strong> and environment setup; we
            respond as capacity allows and may ask clarifying questions before enabling{" "}
            <strong className="text-primary">selected rails</strong> where available.
          </p>
          <p className="mt-5 text-body leading-relaxed text-muted">
            Never send private keys, seed phrases, API keys, webhook secrets, wallet access
            credentials, or screenshots of recovery codes — not to us and not to anyone claiming to
            represent support.
          </p>
          <p className="mt-4 text-sm text-muted">
            For timelines, rails, and approval language in one place, read{" "}
            <Link href="/onboarding">Merchant onboarding — what to expect</Link>.
          </p>
        </Container>
      </Section>

      <Section tone="muted">
        <Container className="max-w-2xl space-y-8">
          <div id="merchant-intake" className="scroll-mt-28">
            <Card>
              <h2 className="text-h2 font-semibold text-primary">Request access</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Merchant access is subject to approval. Submitting this form opens your email client
                with a structured template — we do not store submissions on this static site.
              </p>
              <div className="mt-6">
                <MerchantIntakeForm />
              </div>
            </Card>
          </div>

          <Card className="border-accent/25 bg-surface-elevated/80 ring-1 ring-inset ring-accent/15">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent">
              Security note
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Never send private keys, seed phrases, API keys, webhook secrets, wallet access
              credentials, or screenshots of secrets to any vendor — including us. If you need help,
              describe the issue in plain language without exposing credentials.
            </p>
          </Card>
          <Card>
            <h2 className="text-h2 font-semibold text-primary">Email (MVP)</h2>
            <p className="mt-2 text-sm text-muted">
              Use a monitored mailbox. Replace <span className="font-mono text-primary">{CONTACT_EMAIL}</span>{" "}
              in the codebase if your team uses a different intake address.
            </p>
            <div className="mt-4">
              <Link href={mailto} variant="button-primary" className="no-underline" conv="contact_click">
                Email {CONTACT_EMAIL}
              </Link>
            </div>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">What to include in your request</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Company name, website, and primary country of operation</li>
              <li>Intended use case and expected monthly volume (rough ranges are fine)</li>
              <li>
                Which <strong className="text-primary">selected rails</strong> you need (for example:
                which networks/assets matter to you)
              </li>
              <li>Technical contact (email) for integration follow-up</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Expected onboarding flow</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Shapes vary by merchant, but a typical sequence looks like this. Timelines are not
              guaranteed on this marketing site—capacity and risk review drive scheduling.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-muted">
              <li>You email a complete intake (see above) from a company-controlled mailbox.</li>
              <li>We confirm fit, scope, and rails at a high level; we may request clarifying calls.</li>
              <li>After merchant approval, we align on environment access and integration materials.</li>
              <li>Your engineers integrate server-to-server; you verify webhooks and idempotency paths.</li>
              <li>Go-live is coordinated with operational controls—not anonymous instant activation.</li>
            </ol>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Expected approval process</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Approval is a risk decision, not a formality. We evaluate business fit, technical
              readiness, and the rails you need against what can be enabled safely for your
              environment.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>We may decline or defer if the model is not a fit—clarity early is better than surprises later.</li>
              <li>Selected rails are enabled per environment; unsupported combinations remain unsupported.</li>
              <li>We do not promise same-day approval or universal self-serve keys on this marketing site.</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Expected integration discussion</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Technical conversations usually center on predictable integration mechanics—not
              marketing claims.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Server-to-server payment creation and status reads; API keys never ship to browsers.</li>
              <li>Webhook signing contract, raw-body verification, and retry-safe consumer design.</li>
              <li>Mapping lifecycle states to your orders, entitlements, and accounting rules.</li>
              <li>
                Non-production materials (if issued): hosts, headers, and test expectations are
                provided for approved merchants—details are not public on this site.
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">What never to send</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Legitimate onboarding and support never require custody of your secrets. If someone
              asks for any of the items below, treat it as a scam and stop.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>Private keys, seed phrases, or wallet recovery phrases</li>
              <li>API keys, webhook secrets, or raw signing material</li>
              <li>Screenshots that expose secrets, cookies, or session tokens</li>
              <li>Remote desktop / “screen share to fix your wallet” requests</li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Helpful links before you email</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
              <li>
                <Link href="/docs">
                  Integration docs
                </Link>{" "}
                for lifecycle, webhooks, and verification patterns
              </li>
              <li>
                <Link href="/security">Security practices</Link> for vendor review-friendly boundaries
              </li>
              <li>
                <Link href="/guides">Operational guides</Link> for short, quote-friendly explainers
              </li>
              <li>
                <Link href="/glossary">Glossary</Link> for stable definitions and anchors
              </li>
              <li>
                <Link href="/pricing">Pricing</Link> for how proposals are shaped (no public fee grid
                here)
              </li>
            </ul>
          </Card>

          <Card>
            <h2 className="text-h2 font-semibold text-primary">Merchant portal</h2>
            <p className="mt-2 text-sm text-muted">
              Existing merchants should sign in at the merchant portal — not via this marketing
              contact flow.
            </p>
            <p className="mt-4 text-sm">
              <Link href="/login" conv="merchant_login_click">
                Open merchant login (redirect)
              </Link>
            </p>
          </Card>
        </Container>
      </Section>
    </>
  );
}
