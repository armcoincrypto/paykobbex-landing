import type { Metadata } from "next";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
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

const wayfinding = [
  { href: "/request-access", label: "Request access" },
  { href: "/onboarding", label: "Onboarding expectations" },
  { href: "/docs", label: "Integration docs" },
  { href: "/security", label: "Security guidance" },
] as const;

export default function ContactPage() {
  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Kobbopay — access / integration inquiry")}`;

  return (
    <>
      <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            className="ops-page-header--hero"
            eyebrow="Access"
            title="Contact"
            lead={
              <>
                Request merchant access or ask an integration question. Access is subject to{" "}
                <strong className="text-primary">merchant approval</strong> and environment
                configuration — production enablement is reviewed before credentials and rails are
                issued.
              </>
            }
          >
            <nav className="ops-page-wayfinding" aria-label="Related pages before you apply">
              {wayfinding.map((item, i) => (
                <span key={item.href} className="inline-flex items-center gap-2">
                  {i > 0 ? (
                    <span className="ops-page-wayfinding__sep" aria-hidden="true">
                      ·
                    </span>
                  ) : null}
                  <Link href={item.href}>{item.label}</Link>
                </span>
              ))}
            </nav>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Ready to apply? Use the{" "}
              <Link href="/request-access">structured request access page</Link>. For general
              questions, email below. Never send secrets — see{" "}
              <Link href="/security">security guidance</Link>.
            </p>
          </OperationalPageHeader>
        </Container>
      </Section>

      <Section tone="muted" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-content">
          <div className="ops-contact-layout">
            <div id="merchant-intake" className="scroll-mt-28">
              <Card className="ops-contact-card ops-contact-intake-primary p-5 sm:p-7">
                <h2 className="font-semibold text-primary">Merchant access</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  Structured enablement intake lives on a dedicated page — operational fields, onboarding
                  context, and reviewed enablement language.
                </p>
                <p className="ops-contact-card__cta">
                  <Link href="/request-access" variant="button-primary" className="no-underline" conv="request_access_click">
                    Request access →
                  </Link>
                </p>
              </Card>
            </div>

            <Card className="ops-contact-card p-5 sm:p-7">
              <h2 className="font-semibold text-primary">What happens next</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                No fixed public timeline — capacity and risk review drive scheduling. A typical path:
              </p>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted">
                <li>
                  <strong className="text-primary">Review</strong> — we triage fit, rails needs, and
                  whether your use case matches server-to-server B2B integrations.
                </li>
                <li>
                  <strong className="text-primary">Fit discussion</strong> — we may ask clarifying
                  questions on scope, technical contacts, and operational controls.
                </li>
                <li>
                  <strong className="text-primary">Approval outcomes</strong> — scoped access, deferral,
                  or decline when the model cannot be supported safely on selected rails.
                </li>
                <li>
                  <strong className="text-primary">Materials if approved</strong> — environment
                  configuration, integration references, and merchant portal access where issued for
                  your deployment.
                </li>
              </ol>
              <p className="mt-4 text-sm text-muted">
                Full approval and rollout detail:{" "}
                <Link href="/onboarding">Merchant onboarding — what to expect</Link>.
              </p>
            </Card>

            <Card className="ops-contact-card p-5 sm:p-7">
              <h2 className="font-semibold text-primary">Prepare your request</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                The intake form captures most of this. Including the following reduces back-and-forth:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
                <li>Company name, website, and primary country of operation</li>
                <li>Intended use case and expected monthly volume (rough ranges are fine)</li>
                <li>
                  Which <strong className="text-primary">selected rails</strong> you need (networks and
                  assets that matter to you)
                </li>
                <li>Technical contact for integration follow-up</li>
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Technical evaluation topics — lifecycle mapping, signed webhooks, server-side keys — are
                covered in <Link href="/docs">integration docs</Link> and{" "}
                <Link href="/guides">operational guides</Link>. Approval is a risk decision, not a
                formality; we do not promise same-day keys or universal self-serve production access.
              </p>
            </Card>

            <Card className="ops-contact-card border-accent/25 bg-surface-elevated/80 p-5 ring-1 ring-inset ring-accent/15 sm:p-7">
              <h2 className="font-semibold text-primary">Security</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Legitimate onboarding never requires custody of your secrets. Never send private keys,
                seed phrases, API keys, webhook secrets, wallet credentials, recovery screenshots, or
                remote-desktop access requests — to us or anyone claiming to be support.
              </p>
            </Card>

            <Card className="ops-contact-card p-5 sm:p-7">
              <h2 className="font-semibold text-primary">Merchant access</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Production access follows reviewed onboarding and environment setup — not through this
                contact form. Use request access to start qualification for your integration team.
              </p>
              <p className="mt-4 text-sm">
                <Link href="/request-access" conv="request_access_click">
                  Request access
                </Link>
                {" · "}
                <Link href="/onboarding">Onboarding expectations</Link>
              </p>
            </Card>

            <Card className="ops-contact-card p-5 sm:p-7">
              <h2 className="font-semibold text-primary">Direct email</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                Prefer email without the form? Use a company-controlled mailbox and the same operational
                detail. Monitored intake:{" "}
                <span className="font-mono text-primary">{CONTACT_EMAIL}</span>.
              </p>
              <div className="mt-4">
                <Link href={mailto} variant="button-secondary" className="no-underline" conv="contact_click">
                  Email {CONTACT_EMAIL}
                </Link>
              </div>
            </Card>

            <p className="ops-page-footer-links">
              <Link href="/onboarding">Onboarding expectations</Link>
              {" · "}
              <Link href="/docs">Docs</Link>
              {" · "}
              <Link href="/security">Security</Link>
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
