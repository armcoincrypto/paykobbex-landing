import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";
import { DiagramFrame } from "@/components/diagrams/DiagramFrame";

const onboardingSteps = [
  { title: "Intake", subtitle: "Structured review request" },
  { title: "Qualification", subtitle: "Fit · rails · risk" },
  { title: "Integration", subtitle: "Mapping · webhooks" },
  { title: "Enablement", subtitle: "Scoped environment" },
  { title: "Operations", subtitle: "Monitoring · reconciliation" },
] as const;

/** Static onboarding progression — no runtime animation. */
export function MerchantOnboardingFlowDiagram({
  labelledBy,
}: {
  labelledBy?: string;
}) {
  return (
    <DiagramFrame
      caption="Figure: merchant enablement progression (reviewed — not instant self-serve)."
      labelledBy={labelledBy}
    >
      <div
        className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
        aria-hidden={labelledBy ? undefined : true}
      >
        {onboardingSteps.map((step, i) => (
          <div key={step.title} className="flex items-center gap-2">
            <FlowStep title={step.title} subtitle={step.subtitle} />
            {i < onboardingSteps.length - 1 ? (
              <FlowArrow direction="right" className="hidden sm:block" />
            ) : null}
            {i < onboardingSteps.length - 1 ? (
              <FlowArrow direction="down" className="sm:hidden" />
            ) : null}
          </div>
        ))}
      </div>
    </DiagramFrame>
  );
}
