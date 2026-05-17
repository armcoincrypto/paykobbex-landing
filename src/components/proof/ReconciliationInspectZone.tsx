"use client";

import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { reconcileInspect } from "@/lib/ops-inspection";
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
  const { setInspect, clearInspect } = useInfrastructureInspect();
  const node = reconcileInspect;

  return (
    <div
      className={cn(
        "ops-control-plane__zone ops-route--reconcile ops-inspect-zone",
        className,
      )}
      data-ops-route="reconcile"
      onMouseEnter={() =>
        setInspect({
          focus: node.focus,
          downstream: node.downstream,
        })
      }
      onMouseLeave={clearInspect}
      onFocus={() =>
        setInspect({
          focus: node.focus,
          downstream: node.downstream,
        })
      }
      onBlur={clearInspect}
      tabIndex={0}
    >
      <p className="ops-inspect-hint ops-inspect-hint--static" aria-hidden="true">
        {node.hint}
      </p>
      <p className="ops-inspect-meta ops-inspect-meta--static" aria-hidden="true">
        <span>{node.ownership}</span>
        <span className="text-muted"> · </span>
        <span>{node.affects}</span>
      </p>
      {children}
    </div>
  );
}
