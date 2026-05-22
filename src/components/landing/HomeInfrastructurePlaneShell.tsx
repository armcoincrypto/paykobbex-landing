import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

const PLANE_ID = "home-infrastructure-plane";

/**
 * Server-rendered homepage topology shell — decorative mesh and route anchors.
 * Inspect focus is applied client-side via {@link HomeInfrastructureInspectBridge}.
 */
export function HomeInfrastructurePlaneShell({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      id={PLANE_ID}
      className={cn(
        "home-infrastructure-plane home-infrastructure-plane--journey home-infrastructure-plane--credibility home-infrastructure-plane--ecosystem ops-topology-surface",
        className,
      )}
    >
      <div className="home-topology-layer" aria-hidden="true">
        <div className="home-topology-fog" />
        <div className="home-topology-mesh" />
        <div className="home-topology-horizon" />
        <div className="home-topology-routes">
          <span className="ops-route-anchor ops-route--ingress" data-route="ingress" />
          <span className="ops-route-anchor ops-route--verify" data-route="verify" />
          <span className="ops-route-anchor ops-route--settlement" data-route="settlement" />
          <span
            className="ops-route-anchor ops-route--reconcile"
            data-route="reconcile"
          />
          <span className="ops-route-anchor ops-route--egress" data-route="egress" />
        </div>
        <div id="home-topology-beacon-slot" />
      </div>
      <div className="home-infrastructure-plane__content">{children}</div>
    </div>
  );
}

export { PLANE_ID };
