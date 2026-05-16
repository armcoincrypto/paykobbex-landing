import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";

type Variant = "full" | "compact";

/**
 * Procurement / CTO-friendly framing: practical controls and explicit non-claims.
 * No SOC2/ISO/audit badges—honest boundaries only.
 */
export function SecurityReviewFriendlySection({ variant = "full" }: { variant?: Variant }) {
  const compact = variant === "compact";

  if (compact) {
    return (
      <Card>
        <h2 className="text-h2 font-semibold text-primary">For security reviewers</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          This site does not display certifications we cannot substantiate in public. For
          control-level questions, start with{" "}
          <Link href="/security">Security practices</Link>, the webhook verification notes in{" "}
          <Link href="/docs#webhook-verification">
            /docs#webhook-verification
          </Link>
          , and{" "}
          <Link href="/contact#merchant-intake" conv="request_access_click">
            Request access
          </Link>{" "}
          for review-specific questions.
        </p>
      </Card>
    );
  }

  return (
    <Section id="security-review-friendly" tone="muted">
      <Container className="max-w-3xl space-y-6">
        <h2 className="text-h2 font-semibold text-primary">Security review friendly</h2>
        <p className="text-sm leading-relaxed text-muted sm:text-body">
          If you are evaluating Kobbopay for an enterprise rollout, you are looking for practical
          controls—not marketing superlatives. We publish conservative public copy: what we
          emphasize, what we do not claim, and where official materials differ by merchant
          environment.
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted sm:text-body">
          <li>
            <strong className="text-primary">Practical controls:</strong> signed webhooks, server-side
            verification patterns, and merchant-side secret handling expectations.
          </li>
          <li>
            <strong className="text-primary">Operational boundaries:</strong> merchant approval,
            selected rails, and withdrawal controls described as risk management—not hidden
            friction.
          </li>
          <li>
            <strong className="text-primary">No overclaiming:</strong> we do not publish SOC 2, ISO
            27001, “audited,” or “guaranteed settlement” claims on this marketing site.
          </li>
        </ul>
        <Card className="border-border-subtle/90 bg-surface-elevated/70">
          <h3 className="text-h3 font-semibold text-primary">Where to read next</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
            <li>
              <Link href="/security">Security practices</Link> (merchant-facing boundaries)
            </li>
            <li>
              <Link href="/docs">
                Integration docs
              </Link>{" "}
              (lifecycle + webhook verification + idempotency)
            </li>
            <li>
              <Link href="/contact#merchant-intake" conv="request_access_click">
                Request access
              </Link>{" "}
              for procurement questions that need environment-specific answers
            </li>
          </ul>
        </Card>
      </Container>
    </Section>
  );
}
