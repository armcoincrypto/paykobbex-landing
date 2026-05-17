import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { cn } from "@/lib/cn";

/** Compact homepage bridge to /operations — no duplicate walkthrough content. */
export function OperationalRealismEntry({ className }: { className?: string }) {
  return (
    <Section id="operational-realism" tone="muted" className={cn("py-10 sm:py-14", className)}>
      <Container className="max-w-content">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-center">
          <div>
            <p className="ops-eyebrow">Operational realism</p>
            <h2 className="mt-3 text-h2 font-semibold text-primary">
              How operations actually work
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-[1.65] text-muted sm:text-body">
              Illustrative walkthroughs for lifecycles, webhook retries, reconciliation, review, and
              anonymized merchant workflows — practical and constrained, not marketing stories.
            </p>
            <p className="mt-4 text-sm font-medium">
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
