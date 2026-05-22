import { opsOrchestrationPrinciples } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Lifecycle orchestration semantics — ongoing operational ecosystems, not live telemetry.
 */
export function OpsOrchestrationPrinciples({ className }: { className?: string }) {
  return (
    <div
      className={cn("ops-orchestration-strip", className)}
      role="list"
      aria-label="Operational continuity principles (conceptual)"
    >
      {opsOrchestrationPrinciples.map((line) => (
        <span key={line} className="ops-orchestration-chip" role="listitem">
          {line}
        </span>
      ))}
    </div>
  );
}
