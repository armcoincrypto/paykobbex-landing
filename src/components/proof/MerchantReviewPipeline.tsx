import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { cn } from "@/lib/cn";

const stages = [
  { title: "Intake", subtitle: "Use case + rails intent", tag: "POLICY" },
  { title: "Qualification", subtitle: "Risk + fit review", tag: "REVIEW" },
  { title: "Technical", subtitle: "Integration outline", tag: "GATE" },
  { title: "Approval", subtitle: "Environment + access", tag: "VERIFIED" },
] as const;

/** Merchant review pipeline — operational gating, not marketing onboarding theater. */
export function MerchantReviewPipeline({
  className,
  labelledBy,
}: {
  className?: string;
  labelledBy?: string;
}) {
  return (
    <VerificationFramePanel
      label="Merchant review"
      sublabel="Request pipeline (conceptual)"
      className={cn(className)}
      labelledBy={labelledBy}
    >
      <div className="ops-console-module ops-console-module--review">
        <header className="ops-console-module__header">
          <span className="ops-console-module__title">Review gate</span>
          <span className="ops-console-routing">GATE · REVIEW · POLICY</span>
        </header>
        <div className="ops-console-module__telemetry">
          <span className="ops-telemetry-chip ops-telemetry-chip--policy">
            <span className="ops-telemetry-led ops-telemetry-led--policy" />
            POLICY
          </span>
          <span className="ops-telemetry-chip ops-telemetry-chip--verified">
            <span className="ops-telemetry-led ops-telemetry-led--verified" />
            REVIEWED
          </span>
        </div>
        <div className="ops-console-module__execution ops-console-module__execution--primary">
          <div className="ops-console-well">
            <div
              className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
              aria-hidden="true"
            >
              {stages.map((stage, i) => (
                <div key={stage.title} className="flex items-center gap-2">
                  <div className="ops-console-plate flex flex-col items-center gap-1 px-2 py-1.5 text-center">
                    <span className="ops-console-meta-tag">{stage.tag}</span>
                    <FlowStep title={stage.title} subtitle={stage.subtitle} />
                  </div>
                  {i < stages.length - 1 ? (
                    <FlowArrow direction="right" className="hidden sm:block" />
                  ) : null}
                  {i < stages.length - 1 ? (
                    <FlowArrow direction="down" className="sm:hidden" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
        <footer className="ops-console-module__meta">
          <span className="ops-console-meta-tag">GATE</span>
          <span className="ops-console-meta-tag">ACCESS</span>
          <span>Controlled approval · conceptual</span>
        </footer>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Access, rails, and webhook endpoints are configured after approval — not anonymous
        self-serve production keys on day one.
      </p>
    </VerificationFramePanel>
  );
}
