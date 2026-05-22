import type { OpsInspectNode, OpsJourneyLens } from "@/lib/ops-inspection";
import { getInspectPropagationReveal } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Progressive operational narrative — purpose, trust boundary, consequence, propagation.
 */
export function OpsNarrativeReveal({
  node,
  active,
  downstreamNote,
  showTrustStatic = false,
  activeLens,
}: {
  node: OpsInspectNode;
  active: boolean;
  downstreamNote?: string;
  showTrustStatic?: boolean;
  activeLens?: OpsJourneyLens | null;
}) {
  const lensMatch = !activeLens || activeLens === node.journeyLens;
  const propagationReveal = active ? getInspectPropagationReveal(node) : undefined;

  return (
    <div
      className={cn(
        "ops-narrative",
        active && "ops-narrative--active",
        active && lensMatch ? "ops-narrative--lens-match" : undefined,
        active && activeLens && !lensMatch ? "ops-narrative--lens-muted" : undefined,
        `ops-narrative--${node.journeyLens}`,
      )}
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
      {active ? (
        <p className="ops-narrative-consequence">{node.consequence}</p>
      ) : null}
      {propagationReveal ? (
        <p className="ops-narrative-propagation">{propagationReveal}</p>
      ) : null}
      {downstreamNote ? (
        <p className="ops-narrative-downstream">{downstreamNote}</p>
      ) : null}
    </div>
  );
}
