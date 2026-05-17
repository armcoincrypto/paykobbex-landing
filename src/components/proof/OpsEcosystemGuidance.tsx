"use client";

import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import {
  getEcosystemContext,
  getEcosystemPropagationReveal,
  resolveJourneyLens,
} from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Surrounding operational systems revealed on inspect — ecosystem navigation, not pages.
 */
export function OpsEcosystemGuidance({ className }: { className?: string }) {
  const { inspect } = useInfrastructureInspect();

  if (!inspect?.focus) {
    return (
      <p className={cn("ops-ecosystem-static", className)}>
        Operational workflows continue beyond a single payment: webhook orchestration,
        reconciliation progression, settlement coordination, and environment promotion —
        explore stages to see surrounding systems.
      </p>
    );
  }

  const eco = getEcosystemContext(inspect.focus);
  const propagationReveal = getEcosystemPropagationReveal(
    inspect.focus,
    inspect.downstream,
  );
  const lens =
    inspect.lens ?? resolveJourneyLens(inspect.focus, inspect.linkGate);

  return (
    <aside
      className={cn("ops-ecosystem-guidance", `ops-ecosystem-guidance--${lens}`, className)}
      aria-label="Surrounding operational systems"
    >
      <p className="ops-ecosystem-guidance__continuity">{eco.continuity}</p>
      {propagationReveal ? (
        <p className="ops-ecosystem-guidance__propagation">{propagationReveal}</p>
      ) : null}
      <p className="ops-ecosystem-guidance__coordination" aria-hidden="true">
        {eco.coordination}
      </p>
      {eco.environment ? (
        <p className="ops-ecosystem-guidance__environment" aria-hidden="true">
          {eco.environment}
        </p>
      ) : null}
      <ul className="ops-ecosystem-surrounds list-none p-0 m-0" aria-hidden="true">
        {eco.surrounds.map((item) => (
          <li key={item} className="ops-ecosystem-surrounds__item">
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
}
