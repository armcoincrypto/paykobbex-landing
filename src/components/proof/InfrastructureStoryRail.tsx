import { opsStorySequence } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

/**
 * Procedural story rail — homepage operational sequence (conceptual, not live data).
 */
export function InfrastructureStoryRail({ className }: { className?: string }) {
  return (
    <nav
      className={cn("ops-story-rail", className)}
      aria-label="Operational flow sequence (conceptual)"
    >
      <p className="ops-story-rail__title" aria-hidden="true">
        Operational sequence
      </p>
      <ol className="ops-story-rail__list list-none p-0 m-0">
        {opsStorySequence.map((item) => (
          <li
            key={item.step}
            className={cn("ops-story-rail__item", `ops-story-rail__item--${item.route}`)}
            data-ops-route={item.route}
          >
            <span className="ops-story-rail__step">{item.step}</span>
            <span className="ops-story-rail__label">{item.label}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
}
