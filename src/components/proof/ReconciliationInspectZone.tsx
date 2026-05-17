"use client";

import { useState } from "react";
import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { OpsNarrativeReveal } from "@/components/proof/OpsNarrativeReveal";
import { inspectStateFromNode, reconcileInspect } from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/** Wraps reconciliation / confirmation surfaces with inspectable focus. */
export function ReconciliationInspectZone({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const [active, setActive] = useState(false);
  const { inspect, setInspect, clearInspect } = useInfrastructureInspect();
  const activeLens = inspect?.lens ?? null;
  const node = reconcileInspect;

  const engage = () => {
    setActive(true);
    setInspect(inspectStateFromNode(node));
  };

  const release = () => {
    setActive(false);
    clearInspect();
  };

  return (
    <div
      className={cn(
        "ops-control-plane__zone ops-route--reconcile ops-inspect-zone ops-journey-emphasis--finance",
        active && "ops-inspect-zone--active",
        className,
      )}
      data-ops-route="reconcile"
      onMouseEnter={engage}
      onMouseLeave={release}
      onFocus={engage}
      onBlur={release}
      tabIndex={0}
    >
      <p className="ops-narrative-purpose ops-narrative-purpose--module" aria-hidden="true">
        {node.purpose}
      </p>
      <p className="ops-narrative-readiness ops-narrative-readiness--module" aria-hidden="true">
        {node.readiness}
      </p>
      <p className="ops-inspect-hint ops-inspect-hint--static" aria-hidden="true">
        {node.hint}
      </p>
      <p className="ops-inspect-meta ops-inspect-meta--static" aria-hidden="true">
        <span>{node.ownership}</span>
        <span className="text-muted"> · </span>
        <span>{node.affects}</span>
      </p>
      <OpsNarrativeReveal
        node={node}
        active={active}
        showTrustStatic
        activeLens={activeLens}
      />
      {children}
    </div>
  );
}
