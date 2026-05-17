"use client";

import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { getCredibilityContext, resolveJourneyLens } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Contextual production credibility — governance, isolation, accountability on inspect.
 */
export function OpsCredibilityContext({ className }: { className?: string }) {
  const { inspect } = useInfrastructureInspect();

  if (!inspect?.focus) {
    return (
      <p className={cn("ops-credibility-static", className)}>
        Production infrastructure is procedurally governed — explore stages below to see
        bounded trust, isolation semantics, and operational accountability by concern.
      </p>
    );
  }

  const ctx = getCredibilityContext(inspect.focus);
  const lens =
    inspect.lens ?? resolveJourneyLens(inspect.focus, inspect.linkGate);

  return (
    <div
      className={cn("ops-credibility-context", `ops-credibility-context--${lens}`, className)}
      aria-live="polite"
    >
      <p className="ops-credibility-context__governance">{ctx.governance}</p>
      <p className="ops-credibility-context__isolation" aria-hidden="true">
        {ctx.isolation}
      </p>
      <p className="ops-credibility-context__accountability" aria-hidden="true">
        {ctx.accountability}
      </p>
    </div>
  );
}
