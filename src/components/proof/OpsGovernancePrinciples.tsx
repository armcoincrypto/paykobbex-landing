import { opsGovernancePrinciples } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Static procedural governance principles — not certifications or compliance theater.
 */
export function OpsGovernancePrinciples({ className }: { className?: string }) {
  return (
    <div
      className={cn("ops-governance-principles", className)}
      role="list"
      aria-label="Procedural governance principles (conceptual)"
    >
      {opsGovernancePrinciples.map((line) => (
        <span key={line} className="ops-governance-chip" role="listitem">
          {line}
        </span>
      ))}
    </div>
  );
}
