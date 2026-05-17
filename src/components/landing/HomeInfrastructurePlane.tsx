"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  InfrastructureInspectProvider,
  useInfrastructureInspect,
} from "@/components/landing/InfrastructureInspectContext";

function HomeInfrastructurePlaneInner({ children }: { children: ReactNode }) {
  const { inspect } = useInfrastructureInspect();

  return (
    <div
      className={cn(
        "home-infrastructure-plane ops-topology-surface",
        inspect?.focus && `inspect-focus-${inspect.focus}`,
        ...(inspect?.downstream.map((route) => `inspect-downstream-${route}`) ?? []),
        inspect?.linkGate && "inspect-link-gate",
      )}
      data-inspect-focus={inspect?.focus}
      data-inspect-downstream={inspect?.downstream.join(" ") || undefined}
    >
      <div className="home-topology-layer" aria-hidden="true">
        <div className="home-topology-fog" />
        <div className="home-topology-mesh" />
        <div className="home-topology-horizon" />
        <div className="home-topology-routes">
          <span
            className={cn(
              "ops-route-anchor ops-route--ingress",
              inspect?.focus === "ingress" && "ops-route-anchor--inspect-active",
              inspect?.downstream.includes("ingress") && "ops-route-anchor--inspect-downstream",
            )}
          />
          <span
            className={cn(
              "ops-route-anchor ops-route--verify",
              inspect?.focus === "verify" && "ops-route-anchor--inspect-active",
              inspect?.downstream.includes("verify") && "ops-route-anchor--inspect-downstream",
            )}
          />
          <span
            className={cn(
              "ops-route-anchor ops-route--settlement",
              inspect?.focus === "settlement" && "ops-route-anchor--inspect-active",
              inspect?.downstream.includes("settlement") &&
                "ops-route-anchor--inspect-downstream",
            )}
          />
          <span
            className={cn(
              "ops-route-anchor ops-route--reconcile",
              inspect?.focus === "reconcile" && "ops-route-anchor--inspect-active",
              inspect?.downstream.includes("reconcile") &&
                "ops-route-anchor--inspect-downstream",
            )}
          />
          <span
            className={cn(
              "ops-route-anchor ops-route--egress",
              inspect?.focus === "egress" && "ops-route-anchor--inspect-active",
              inspect?.downstream.includes("egress") && "ops-route-anchor--inspect-downstream",
            )}
          />
        </div>
      </div>
      <div className="home-infrastructure-plane__content">{children}</div>
    </div>
  );
}

/**
 * Homepage operational topology shell — decorative continuity mesh and route anchors.
 */
export function HomeInfrastructurePlane({ children }: { children: ReactNode }) {
  return (
    <InfrastructureInspectProvider>
      <HomeInfrastructurePlaneInner>{children}</HomeInfrastructurePlaneInner>
    </InfrastructureInspectProvider>
  );
}
