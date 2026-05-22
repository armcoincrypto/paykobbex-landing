"use client";

import { Fragment } from "react";
import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { opsEnvironmentStages } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

const stageScope: Record<(typeof opsEnvironmentStages)[number]["id"], string> = {
  sandbox: "Non-production credentials",
  reviewed: "Operational fit & rails",
  production: "Policy-scoped access",
};

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
      className={cn(
        "ops-env-progression ops-env-progression--maturity ops-env-progression--choreo ops-env-progression--control-plane",
        className,
      )}
      aria-label="Environment progression (conceptual)"
    >
      <header className="ops-env-progression__header">
        <div className="ops-env-progression__header-main">
          <h3 className="ops-env-progression__heading">Controlled environment progression</h3>
          <p className="ops-env-progression__subheading">
            Maturity path for integration, review, and scoped production access — conceptual only.
          </p>
        </div>
        <span className="ops-env-progression__module-tag">Environment model</span>
      </header>

      <div className="ops-env-progression__path">
        <div className="ops-env-progression__rail" aria-hidden="true">
          <svg
            className="ops-env-progression__rail-svg"
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
            focusable="false"
          >
            <line
              className="ops-env-progression__rail-line ops-env-progression__rail-line--base"
              x1="4"
              y1="2"
              x2="96"
              y2="2"
              vectorEffect="non-scaling-stroke"
            />
            <line
              className="ops-env-progression__rail-line ops-env-progression__rail-line--pulse"
              x1="4"
              y1="2"
              x2="96"
              y2="2"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <ol className="ops-env-progression__pipeline list-none p-0 m-0">
          {opsEnvironmentStages.map((stage, i) => (
            <Fragment key={stage.id}>
              <li
                className={cn(
                  "ops-env-progression__stage",
                  activeStage === stage.id && "ops-env-progression__stage--active",
                )}
                data-env-stage={stage.id}
                tabIndex={0}
              >
                <div className="ops-env-progression__stage-head">
                  <span className="ops-env-progression__index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="ops-env-progression__marker" aria-hidden="true" />
                </div>
                <p className="ops-env-progression__scope">{stageScope[stage.id]}</p>
                <h4 className="ops-env-progression__label">{stage.label}</h4>
                <p className="ops-env-progression__semantics">{stage.semantics}</p>
              </li>
              {stage.id === "reviewed" ? (
                <li
                  className="ops-env-progression__policy-gate"
                  aria-label="Policy gate: scoped production access after approval (conceptual)"
                >
                  <div className="ops-env-progression__policy-gate-card">
                    <span className="ops-env-progression__policy-gate-icon" aria-hidden="true">
                      <svg viewBox="0 0 16 16" focusable="false">
                        <path
                          d="M8 2.25 11.75 4.5v3.25c0 1.85-1.5 3.35-3.75 3.75C5.75 11.1 4.25 9.6 4.25 7.75V4.5L8 2.25z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.1"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="ops-env-progression__policy-gate-label">Policy gate</span>
                    <span className="ops-env-progression__policy-gate-note">
                      After approval · scoped by policy
                    </span>
                  </div>
                </li>
              ) : null}
            </Fragment>
          ))}
        </ol>
      </div>
    </nav>
  );
}
