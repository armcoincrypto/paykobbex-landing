"use client";

import { Link } from "@/components/primitives/link";
import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import {
  getInspectPanelCopy,
  getJourneyGuidance,
  journeyLensLabels,
  resolveJourneyLens,
  type OpsJourneyLens,
} from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

const staticLensOrder: OpsJourneyLens[] = ["engineering", "finance", "operations"];

/**
 * Contextual infrastructure guidance — doc links and persona/readiness echoes on inspect.
 */
export function OpsJourneyGuidance({ className }: { className?: string }) {
  const { inspect } = useInfrastructureInspect();
  const activeLens =
    inspect?.lens ??
    (inspect?.focus ? resolveJourneyLens(inspect.focus, inspect.linkGate) : null);
  const route = inspect?.focus;
  const panel = route ? getInspectPanelCopy(route) : null;

  return (
    <aside
      className={cn(
        "ops-journey-guidance",
        activeLens ? `ops-journey-guidance--${activeLens}` : undefined,
        className,
      )}
      aria-label="Contextual operational guidance"
    >
      <p className="ops-journey-guidance__title text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Explore by operational concern
      </p>
      <div className="ops-journey-guidance__lenses" role="list">
        {staticLensOrder.map((lens) => (
          <div
            key={lens}
            className={cn(
              "ops-journey-lens-block",
              `ops-journey-lens-block--${lens}`,
              activeLens === lens && "ops-journey-lens-block--active",
            )}
            role="listitem"
            data-journey-lens={lens}
          >
            <span className="ops-journey-lens-block__label">{journeyLensLabels[lens]}</span>
            {activeLens === lens && panel && route ? (
              <>
                <p className="ops-journey-persona" aria-hidden="true">
                  {panel.body}
                </p>
                <ul className="ops-journey-readiness list-none p-0 m-0" aria-hidden="true">
                  {panel.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <ul className="ops-journey-links list-none p-0 m-0">
                  {getJourneyGuidance(route).map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className="ops-journey-link text-xs">
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}
