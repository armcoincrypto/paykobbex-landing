import { DiagramFrame } from "@/components/diagrams/DiagramFrame";
import { DiagramReveal } from "@/components/diagrams/DiagramReveal";
import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { StatePill } from "@/components/diagrams/StatePill";
import { cn } from "@/lib/cn";

export function LifecycleDiagram({
  variant = "full",
  className,
  diagramLabelledBy,
  settle = true,
}: {
  variant?: "full" | "compact";
  className?: string;
  diagramLabelledBy?: string;
  settle?: boolean;
}) {
  const compact = variant === "compact";

  return (
    <DiagramReveal className={cn(className)} settle={settle}>
      <div className="space-y-4">
        {!compact ? (
          <div>
            <h3 className="text-h3 font-semibold text-primary">Lifecycle sequence (conceptual)</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Typical progression for a single payment object. Finance and engineering should agree
              which state gates entitlements and books — exact transitions depend on enabled rails and
              your approved configuration.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Typical progression: <strong className="text-primary">Pending</strong> →{" "}
            <strong className="text-primary">Paid</strong> →{" "}
            <strong className="text-primary">Confirmed</strong>, with{" "}
            <strong className="text-primary">Expired</strong> as a common terminal branch.
          </p>
        )}

        <DiagramFrame
          caption="Figure: conceptual payment states (not an exhaustive state machine for every deployment)."
          labelledBy={diagramLabelledBy}
        >
          <div className="mx-auto flex max-w-xl flex-col items-stretch gap-2">
            <div className="flex flex-wrap items-start justify-center gap-x-2 gap-y-3 sm:gap-x-3">
              <div className="flex flex-col items-center pt-1">
                <StatePill label="Pending" />
              </div>
              <div className="flex h-10 items-center">
                <FlowArrow />
              </div>
              <div className="flex flex-col items-center gap-1">
                <StatePill label="Paid" />
                <FlowArrow direction="down" />
                <StatePill label="Expired" />
              </div>
              <div className="flex h-10 items-center">
                <FlowArrow />
              </div>
              <div className="flex flex-col items-center pt-1">
                <StatePill label="Confirmed" />
              </div>
            </div>
          </div>
        </DiagramFrame>

        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
          <li>
            <strong className="text-primary">Pending</strong> — payment created / awaiting detection.
          </li>
          <li>
            <strong className="text-primary">Paid</strong> — payment detected but not final for your
            reconciliation rules.
          </li>
          <li>
            <strong className="text-primary">Confirmed</strong> — confirmation semantics met for the
            rail and policy you operate under.
          </li>
          <li>
            <strong className="text-primary">Expired</strong> — payment window ended or configuration
            marks the path as expired (terminal for the original attempt).
          </li>
        </ul>
      </div>
    </DiagramReveal>
  );
}
