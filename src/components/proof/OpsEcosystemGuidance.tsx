"use client";

import { Link } from "@/components/primitives/link";
import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import {
  getInspectPanelCopy,
  getJourneyGuidance,
  resolveJourneyLens,
} from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

const workflowModules = [
  {
    id: "webhook",
    title: "Webhook verification",
    hint: "Signed callbacks and server-side verify",
  },
  {
    id: "reconcile",
    title: "Reconciliation",
    hint: "Detection, confirmation, and books finality",
  },
  {
    id: "settlement",
    title: "Settlement lifecycle",
    hint: "Shared state vocabulary for teams",
  },
  {
    id: "environment",
    title: "Environment progression",
    hint: "Sandbox through scoped production access",
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
          Operational workflows continue beyond a single payment: webhook verification,
          reconciliation, settlement lifecycle, and environment progression — explore stages
          to see surrounding systems.
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

  const panel = getInspectPanelCopy(inspect.focus);
  const links = getJourneyGuidance(inspect.focus);
  const lens =
    inspect.lens ?? resolveJourneyLens(inspect.focus, inspect.linkGate);

  return (
    <aside
      className={cn(
        "ops-ecosystem-guidance ops-inspect-panel",
        `ops-inspect-panel--${lens}`,
        className,
      )}
      aria-label={`${panel.title} — operational context`}
    >
      <header className="ops-inspect-panel__head">
        <p className="ops-inspect-panel__eyebrow">{panel.eyebrow}</p>
        <h4 className="ops-inspect-panel__title">{panel.title}</h4>
      </header>
      <div className="ops-inspect-panel__content">
        <p className="ops-inspect-panel__body">{panel.body}</p>
        <ul className="ops-inspect-panel__bullets list-none p-0 m-0">
          {panel.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        {panel.shortLabels?.length ? (
          <div className="ops-inspect-panel__labels" aria-hidden="true">
            {panel.shortLabels.map((label) => (
              <span key={label} className="ops-inspect-panel__label">
                {label}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {links.length > 0 ? (
        <footer className="ops-inspect-panel__footer">
          <ul className="ops-inspect-panel__links list-none p-0 m-0">
            {links.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="ops-inspect-panel__link text-xs">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </footer>
      ) : null}
    </aside>
  );
}
