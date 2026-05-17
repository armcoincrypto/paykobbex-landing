"use client";

import { useState } from "react";
import { StatePill, type StatePillLabel } from "@/components/diagrams/StatePill";
import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { OpsNarrativeReveal } from "@/components/proof/OpsNarrativeReveal";
import { lifecycleInspectNodes } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

const primary: StatePillLabel[] = ["Pending", "Paid", "Confirmed"];

/**
 * Horizontal lifecycle lane — SVG operational rails with calm signal motion.
 * Conceptual states only; not live merchant data.
 */
export function LifecycleLaneInstrument({
  className,
  compact = false,
  animate = true,
  interactive,
  showTelemetry = true,
}: {
  className?: string;
  compact?: boolean;
  animate?: boolean;
  interactive?: boolean;
  showTelemetry?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { setInspect, clearInspect } = useInfrastructureInspect();
  const isInteractive = interactive ?? animate;

  const applyInspect = (index: number | null) => {
    setHovered(index);
    if (index === null) {
      clearInspect();
      return;
    }
    const node = lifecycleInspectNodes[index];
    setInspect({
      focus: node.focus,
      downstream: node.downstream,
    });
  };

  const execution = (
    <>
      <svg
        className="lifecycle-lane-rail-svg"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="lifecycle-lane-rail-depth"
          d="M 6 7 H 94"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="lifecycle-lane-rail-base"
          d="M 6 7 H 94"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="lifecycle-lane-rail-pulse"
          d="M 6 7 H 94"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="lifecycle-lane-rail-branch"
          d="M 50 7 V 16"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ol className="lifecycle-lane-nodes list-none p-0 m-0">
        {primary.map((label, i) => {
          const node = lifecycleInspectNodes[i];
          const isHot = isInteractive && hovered === i;
          const isDownstream =
            isInteractive &&
            hovered !== null &&
            ((hovered === 0 && i === 1) || (hovered === 1 && i === 2));
          const downstreamNote =
            isDownstream && hovered !== null
              ? lifecycleInspectNodes[hovered].causeEffect
              : undefined;
          return (
            <li
              key={label}
              className={cn(
                "lifecycle-lane-node",
                isInteractive && "lifecycle-lane-node--interactive",
                isHot && "lifecycle-lane-node--hot",
                isDownstream && "lifecycle-lane-node--downstream",
              )}
              data-ops-route={node.focus}
              onMouseEnter={isInteractive ? () => applyInspect(i) : undefined}
              onMouseLeave={isInteractive ? () => applyInspect(null) : undefined}
              onFocus={isInteractive ? () => applyInspect(i) : undefined}
              onBlur={isInteractive ? () => applyInspect(null) : undefined}
              {...(isInteractive
                ? { tabIndex: 0, role: "presentation" as const }
                : {})}
            >
              <span
                className={cn(
                  "lifecycle-lane-marker",
                  isHot && "lifecycle-lane-marker--hot",
                )}
              />
              <StatePill label={label} className={compact ? "scale-[0.92]" : undefined} />
              <span
                className={cn(
                  "ops-telemetry-node-tag ops-telemetry-chip",
                  `ops-telemetry-chip--${i === 0 ? "policy" : i === 1 ? "signal" : "verified"}`,
                )}
              >
                <span
                  className={cn(
                    "ops-telemetry-led",
                    i === 0 ? "ops-telemetry-led--policy" : i === 1 ? "ops-telemetry-led--signal" : "ops-telemetry-led--verified",
                  )}
                />
                {node.tag.split(" · ")[0]}
              </span>
              {isInteractive ? (
                <>
                  <span className="ops-context-reveal">{node.tag}</span>
                  <span className="ops-inspect-hint">{node.hint}</span>
                  <span className="ops-inspect-meta" aria-hidden="true">
                    <span>{node.ownership}</span>
                    <span> · </span>
                    <span>{node.affects}</span>
                  </span>
                  <OpsNarrativeReveal
                    node={node}
                    active={isHot}
                    downstreamNote={downstreamNote}
                  />
                </>
              ) : null}
            </li>
          );
        })}
      </ol>
      <div className="lifecycle-lane-branch flex flex-wrap items-center gap-1.5">
        <span>Branch:</span>
        <StatePill label="Expired" className="inline-flex scale-[0.88]" />
        <span className="ops-telemetry-chip ops-telemetry-chip--policy">
          <span className="ops-telemetry-led ops-telemetry-led--policy" />
          POLICY
        </span>
      </div>
    </>
  );

  return (
    <div
      className={cn(
        "lifecycle-lane ops-route--settlement",
        animate && "lifecycle-lane--animated",
        showTelemetry && "lifecycle-lane--structured",
        hovered !== null && "lifecycle-lane--route-active",
        hovered !== null && "lifecycle-lane--narrative-active",
        className,
      )}
      aria-hidden="true"
    >
      {showTelemetry ? (
        <>
          <div className="ops-console-module__telemetry">
            <div className="ops-density-strip" aria-hidden="true">
              <span className="ops-density-line">STATE · POLICY GATED</span>
              <span className="ops-density-line">RAIL · SCOPED</span>
            </div>
            <p className="ops-narrative-purpose ops-narrative-purpose--module" aria-hidden="true">
              {lifecycleInspectNodes[1].purpose}
            </p>
            <p className="ops-inspect-hint ops-inspect-hint--static" aria-hidden="true">
              {lifecycleInspectNodes[1].hint}
            </p>
            <div className="ops-telemetry-bar">
              <span className="ops-telemetry-meta">Explicit state lane · conceptual</span>
              <span className="ops-telemetry-chip-row">
                <span className="ops-telemetry-chip ops-telemetry-chip--policy">
                  <span className="ops-telemetry-led ops-telemetry-led--policy" />
                  POLICY
                </span>
                <span className="ops-telemetry-chip ops-telemetry-chip--verified">
                  <span className="ops-telemetry-led ops-telemetry-led--verified" />
                  VERIFIED
                </span>
              </span>
            </div>
            <span className="ops-ownership ops-ownership--policy">Policy-controlled</span>
          </div>
          <div className="ops-console-module__execution ops-console-module__execution--primary">
            <div className="ops-console-well ops-envelope">{execution}</div>
          </div>
          <footer className="ops-console-module__meta">
            <span className="ops-console-meta-tag">STATE</span>
            <span className="ops-console-meta-tag">RAIL</span>
            <span className="ops-console-meta-tag">GATE</span>
            <span>Topology · conceptual</span>
          </footer>
        </>
      ) : (
        execution
      )}
    </div>
  );
}
