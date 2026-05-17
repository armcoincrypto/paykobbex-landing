import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";

const stages = [
  { title: "Intake", subtitle: "Use case · rails intent" },
  { title: "Qualification", subtitle: "Risk · fit review" },
  { title: "Technical", subtitle: "Mapping · webhooks" },
  { title: "Enablement", subtitle: "Scoped env · access" },
] as const;

/** Compact merchant review pipeline — for guide/onboarding frames. */
export function ReviewPipelineInstrument() {
  return (
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
  );
}
