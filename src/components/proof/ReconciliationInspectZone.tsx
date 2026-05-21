"use client";

import { useState, type FocusEvent, type MouseEvent } from "react";
import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { isReconciliationStaticReadout } from "@/lib/inspect-static-readout";
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
  const { setInspect, clearInspect } = useInfrastructureInspect();

  const engage = (event: MouseEvent | FocusEvent) => {
    if (isReconciliationStaticReadout(event.target)) return;
    setActive(true);
    setInspect(inspectStateFromNode(reconcileInspect));
  };

  const release = (event: MouseEvent | FocusEvent) => {
    if (isReconciliationStaticReadout(event.target)) return;
    setActive(false);
    clearInspect();
  };

  return (
    <div
      className={cn(
        "ops-route--reconcile ops-inspect-zone proof-bento-inspect",
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
      {children}
    </div>
  );
}
