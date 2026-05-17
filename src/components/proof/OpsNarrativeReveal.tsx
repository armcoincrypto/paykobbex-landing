import type { OpsInspectNode } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Progressive operational narrative — purpose, trust, cause/effect, consequence.
 * Decorative when aria-hidden on parent; complements visible stage labels.
 */
export function OpsNarrativeReveal({
  node,
  active,
  downstreamNote,
  showTrustStatic = false,
}: {
  node: OpsInspectNode;
  active: boolean;
  /** Shown on downstream targets when another stage is focused. */
  downstreamNote?: string;
  /** Always show trust boundary line (mobile / verify surfaces). */
  showTrustStatic?: boolean;
}) {
  return (
    <div
      className={cn("ops-narrative", active && "ops-narrative--active")}
      aria-hidden="true"
    >
      <p
        className={cn(
          "ops-narrative-purpose",
          (active || showTrustStatic) && "ops-narrative-purpose--visible",
        )}
      >
        {node.purpose}
      </p>
      {node.trustBoundary ? (
        <p
          className={cn(
            "ops-narrative-trust",
            (active || showTrustStatic) && "ops-narrative-trust--visible",
          )}
        >
          {node.trustBoundary}
        </p>
      ) : null}
      {active && node.causeEffect ? (
        <p className="ops-narrative-cause">{node.causeEffect}</p>
      ) : null}
      {active && node.riskPrevented ? (
        <p className="ops-narrative-risk">Prevents: {node.riskPrevented}</p>
      ) : null}
      {active ? (
        <p className="ops-narrative-consequence">{node.consequence}</p>
      ) : null}
      {downstreamNote ? (
        <p className="ops-narrative-downstream">{downstreamNote}</p>
      ) : null}
    </div>
  );
}
