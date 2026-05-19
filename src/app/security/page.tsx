import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { SecurityBoundaryInstrument } from "@/components/operational/SecurityBoundaryInstrument";
import { ConstraintDiscipline, OperationalGovernancePanel } from "@/components/realism";
import { SECURITY_INCIDENT_CLASSES } from "@/lib/operational-realism";
import { SecurityReviewFriendlySection } from "@/components/trust/SecurityReviewFriendlySection";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security",
  description:
    "How Kobbopay approaches merchant security: 2FA for sensitive actions, signed webhooks, encrypted API key material at rest, operational controls, and honest boundaries — without unverifiable compliance theater.",
  alternates: { canonical: `${SITE_URL}/security` },
  openGraph: {
    title: "Security — Kobbopay",
    description: "Security practices and boundaries for Kobbopay B2B crypto payment infrastructure.",
    url: `${SITE_URL}/security`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Security — Kobbopay",
    description: "Security practices for Kobbopay merchants and integrators.",
    images: [OG_IMAGE.url],
  },
};

export default function SecurityPage() {
  return (
    <div className="ops-security">
      <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            className="ops-page-header--hero"
            eyebrow="Security"
            title="Operational security boundaries"
            lead={
              <>
                Kobbopay is payment infrastructure with procedural controls: verification before
                mutation, scoped environments, and explicit ownership between engineering and finance.
                This page describes practices and boundaries — not a substitute for your security
                program, vendor review, or legal advice.
              </>
            }
          />
        </Container>
      </Section>

      <Section tone="muted" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-3xl space-y-8">
          <VerificationFramePanel label="Trust boundary" sublabel="Non-negotiable">
            <h2 className="text-h2 font-semibold text-primary">Never share secrets with anyone</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Kobbopay and legitimate vendors will never ask for your seed phrase, private keys, raw
              API secrets in email or chat, or remote control of your wallets. If someone does, it is
              a scam — stop and contact your security team.
            </p>
          </VerificationFramePanel>

          <VerificationFramePanel label="Verification sequencing" sublabel="Webhook boundary">
            <h2 className="sr-only">Webhook verification boundary</h2>
            <SecurityBoundaryInstrument />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              The signature proves integrity and authenticity of the webhook body to{" "}
              <strong className="text-primary">your verifier</strong>. Parse JSON only after verification
              succeeds; reject forgeries with{" "}
              <code className="font-mono text-xs text-primary">401</code> without echoing secrets in logs.
            </p>
          </VerificationFramePanel>

          <VerificationFramePanel label="Incident classification" sublabel="Route by signal">
            <ul className="space-y-3">
              {SECURITY_INCIDENT_CLASSES.map((item) => (
                <li key={item.title} className="text-sm leading-relaxed text-muted">
                  <strong className="text-primary">{item.title}</strong>
                  <span className="font-mono text-[10px] text-accent/80"> · {item.owner}</span>
                  <p className="mt-1">{item.body}</p>
                </li>
              ))}
            </ul>
          </VerificationFramePanel>

          <OperationalGovernancePanel className="mt-8" limit={4} />

          <VerificationFramePanel label="Operational checkpoints" sublabel="What we emphasize">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>
                <strong className="text-primary">2FA for sensitive merchant actions</strong> where
                enabled in your deployment.
              </li>
              <li>
                <strong className="text-primary">Signed webhooks</strong> before internal state mutation.
              </li>
              <li>
                <strong className="text-primary">API key material as secrets</strong> — server-side only,
                encrypted at rest in product architecture.
              </li>
              <li>
                <strong className="text-primary">Operational controls</strong>: merchant approval, selected
                rails, operator-mediated steps where your model requires them.
              </li>
            </ul>
          </VerificationFramePanel>

          <VerificationFramePanel label="Honest boundaries" sublabel="What we do not claim">
            <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
              <li>We do not claim a specific license, regulator status, or audit outcome on this site.</li>
              <li>We do not claim “bank-grade” security as a marketing label.</li>
              <li>We do not promise universal instant payouts or guaranteed finality across all chains.</li>
              <li>We do not publish open-ended multi-asset inventory claims on this marketing site.</li>
            </ul>
          </VerificationFramePanel>

          <ConstraintDiscipline className="mt-8" />

          <SecurityReviewFriendlySection variant="compact" />

          <p className="ops-page-footer-links">
            <Link href="/docs#webhook-verification">Webhook verification (docs)</Link>
            {" · "}
            <Link href="/guides/webhook-verification">Webhook guide</Link>
            {" · "}
            <Link href="/developers">Developers</Link>
            {" · "}
            <Link href="/contact#merchant-intake" conv="request_access_click">
              Request access
            </Link>
          </p>
        </Container>
      </Section>
    </div>
  );
}
