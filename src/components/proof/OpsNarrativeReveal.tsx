import type { OpsInspectNode, OpsJourneyLens } from "@/lib/ops-inspection";
import { getCredibilityForNode, getEcosystemForNode } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Progressive operational narrative — purpose, trust, persona, readiness, credibility, cause/effect.
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
  const credibility = getCredibilityForNode(node);
  const ecosystem = getEcosystemForNode(node);

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
      {node.personaEcho ? (
        <p
          className={cn(
            "ops-narrative-persona",
            active && lensMatch && "ops-narrative-persona--visible",
          )}
        >
          {node.personaEcho}
        </p>
      ) : null}
      {node.readiness ? (
        <p
          className={cn(
            "ops-narrative-readiness",
            (active || showTrustStatic) && lensMatch && "ops-narrative-readiness--visible",
          )}
        >
          {node.readiness}
        </p>
      ) : null}
      {active && lensMatch ? (
        <>
          <p className="ops-narrative-governance">{credibility.governance}</p>
          <p className="ops-narrative-isolation">{credibility.isolation}</p>
          <p className="ops-narrative-accountability">{credibility.accountability}</p>
          <p className="ops-narrative-continuity">{ecosystem.continuity}</p>
          <p className="ops-narrative-coordination">{ecosystem.coordination}</p>
        </>
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
