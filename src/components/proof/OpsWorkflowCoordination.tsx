import { opsWorkflowCoordination } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Merchant team handoff semantics — procedural coordination, not org charts.
 */
export function OpsWorkflowCoordination({ className }: { className?: string }) {
  return (
    <div
      className={cn("ops-workflow-coordination", className)}
      role="list"
      aria-label="Workflow coordination handoffs (conceptual)"
    >
      <p className="ops-workflow-coordination__title" aria-hidden="true">
        Team coordination
      </p>
      <ul className="ops-workflow-coordination__list list-none p-0 m-0">
        {opsWorkflowCoordination.map((item) => (
          <li key={item.teams} className="ops-workflow-coordination__item" role="listitem">
            <span className="ops-workflow-coordination__teams">{item.teams}</span>
            <span className="ops-workflow-coordination__cue">{item.cue}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
