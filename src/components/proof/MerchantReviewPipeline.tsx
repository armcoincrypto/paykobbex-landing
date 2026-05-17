import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { cn } from "@/lib/cn";

const stages = [
  { title: "Intake", subtitle: "Use case + rails intent" },
  { title: "Qualification", subtitle: "Risk + fit review" },
  { title: "Technical", subtitle: "Integration outline" },
  { title: "Approval", subtitle: "Environment + access" },
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
      <div
        className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
        aria-hidden="true"
      >
        {stages.map((stage, i) => (
          <div key={stage.title} className="flex items-center gap-2">
            <FlowStep title={stage.title} subtitle={stage.subtitle} />
            {i < stages.length - 1 ? (
              <FlowArrow direction="right" className="hidden sm:block" />
            ) : null}
            {i < stages.length - 1 ? (
              <FlowArrow direction="down" className="sm:hidden" />
            ) : null}
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Access, rails, and webhook endpoints are configured after approval — not anonymous
        self-serve production keys on day one.
      </p>
    </VerificationFramePanel>
  );
}
