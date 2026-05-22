import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
/** Compact homepage bridge to /operations — no duplicate walkthrough content. */
export function OperationalRealismEntry({ className }: { className?: string }) {
  return (
    <Section id="operational-realism" tone="muted" className={className}>
      <Container className="max-w-content">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-center lg:gap-12">
          <div>
            <p className="ops-eyebrow">Operational realism</p>
            <h2 className="type-section-heading type-stack-after-eyebrow text-h2 font-semibold text-primary">
              How operations actually work
            </h2>
            <p className="type-section-lead type-stack-after-heading max-w-xl">
              Illustrative walkthroughs for lifecycles, webhook retries, reconciliation, review, and
              anonymized merchant workflows — practical and constrained, not marketing stories.
            </p>
            <p className="type-stack-after-lead text-sm font-medium">
              <Link href="/operations">View operational walkthroughs →</Link>
            </p>
          </div>
          <VerificationFramePanel label="Example flows" sublabel="Not live data">
            <ul className="space-y-2 text-xs leading-relaxed text-muted">
              <li>Lifecycle create → confirmed</li>
              <li>Webhook verify → idempotent apply</li>
              <li>Reconciliation exceptions</li>
              <li>SaaS · marketplace · top-up · invoice patterns</li>
            </ul>
          </VerificationFramePanel>
        </div>
      </Container>
    </Section>
  );
}
