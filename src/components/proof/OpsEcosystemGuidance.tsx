"use client";

import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import {
  getEcosystemContext,
  getEcosystemPropagationReveal,
  resolveJourneyLens,
} from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

const workflowModules = [
  {
    id: "webhook",
    title: "Webhook orchestration",
    hint: "Signed callbacks & idempotent apply",
  },
  {
    id: "reconcile",
    title: "Reconciliation progression",
    hint: "Ledger alignment to lifecycle states",
  },
  {
    id: "settlement",
    title: "Settlement coordination",
    hint: "Engineering & finance handoff",
  },
  {
    id: "environment",
    title: "Environment promotion",
    hint: "Sandbox through scoped access",
  },
] as const;

/**
 * Surrounding operational systems revealed on inspect — ecosystem navigation, not pages.
 */
export function OpsEcosystemGuidance({ className }: { className?: string }) {
  const { inspect } = useInfrastructureInspect();

  if (!inspect?.focus) {
    return (
      <section
        className={cn("ops-workflow-domains", className)}
        aria-labelledby="ops-workflow-domains-heading"
      >
        <p className="sr-only">
          Operational workflows continue beyond a single payment: webhook orchestration,
          reconciliation progression, settlement coordination, and environment promotion —
          explore stages to see surrounding systems.
        </p>

        <header className="ops-workflow-domains__header">
          <h4 id="ops-workflow-domains-heading" className="ops-workflow-domains__title">
            Surrounding workflows
          </h4>
          <p className="ops-workflow-domains__lead">
            Operational workflows continue beyond a single payment — explore stages to see
            surrounding systems.
          </p>
        </header>

        <ul className="ops-workflow-domains__grid list-none p-0 m-0">
          {workflowModules.map((module) => (
            <li key={module.id} className="ops-workflow-domains__module" tabIndex={0}>
              <span className="ops-workflow-domains__module-index" aria-hidden="true">
                {module.id === "webhook"
                  ? "A"
                  : module.id === "reconcile"
                    ? "B"
                    : module.id === "settlement"
                      ? "C"
                      : "D"}
              </span>
              <span className="ops-workflow-domains__module-body">
                <span className="ops-workflow-domains__module-title">{module.title}</span>
                <span className="ops-workflow-domains__module-hint">{module.hint}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
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
