"use client";

import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { opsEnvironmentStages } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Procedural environment maturity — sandbox → reviewed → production-scoped.
 */
export function OpsEnvironmentProgression({ className }: { className?: string }) {
  const { inspect } = useInfrastructureInspect();
  const activeStage =
    inspect?.focus === "review" || inspect?.linkGate
      ? "reviewed"
      : inspect?.focus === "ingress"
        ? "production"
        : inspect?.focus === "verify" || inspect?.focus === "egress"
          ? "sandbox"
          : null;

  return (
    <nav
      className={cn("ops-env-progression", className)}
      aria-label="Environment progression (conceptual)"
    >
      <p className="ops-env-progression__title" aria-hidden="true">
        Environment progression
      </p>
      <ol className="ops-env-progression__list list-none p-0 m-0">
        {opsEnvironmentStages.map((stage, i) => (
          <li
            key={stage.id}
            className={cn(
              "ops-env-progression__stage",
              activeStage === stage.id && "ops-env-progression__stage--active",
            )}
            data-env-stage={stage.id}
          >
            {i > 0 ? (
              <span className="ops-env-progression__connector" aria-hidden="true" />
            ) : null}
            <span className="ops-env-progression__label">{stage.label}</span>
            <span className="ops-env-progression__semantics" aria-hidden="true">
              {stage.semantics}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
