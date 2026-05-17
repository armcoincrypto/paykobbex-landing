import { opsMaturityJourney } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Guided operational maturity journey — procedural readiness, not certifications.
 */
export function OpsReadinessRail({ className }: { className?: string }) {
  return (
    <nav
      className={cn("ops-readiness-rail", className)}
      aria-label="Operational maturity journey (conceptual)"
    >
      <p className="ops-readiness-rail__title" aria-hidden="true">
        Maturity journey
      </p>
      <ol className="ops-readiness-rail__list list-none p-0 m-0">
        {opsMaturityJourney.map((item) => (
          <li
            key={item.step}
            className={cn(
              "ops-readiness-rail__item",
              `ops-readiness-rail__item--${item.route}`,
              `ops-readiness-rail__item--${item.lens}`,
            )}
            data-ops-route={item.route}
            data-journey-lens={item.lens}
          >
            <span className="ops-readiness-rail__step">{item.step}</span>
            <span className="ops-readiness-rail__body">
              <span className="ops-readiness-rail__label">{item.label}</span>
              <span className="ops-readiness-rail__readiness" aria-hidden="true">
                {item.readiness}
              </span>
            </span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
