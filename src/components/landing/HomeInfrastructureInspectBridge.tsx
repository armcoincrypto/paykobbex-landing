"use client";

import { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { OpsStoryBeacon } from "@/components/landing/OpsStoryBeacon";
import { PLANE_ID } from "@/components/landing/HomeInfrastructurePlaneShell";
import { resolveJourneyLens, type OpsInspectRoute } from "@/lib/ops-inspection";

const INSPECT_CLASS_PREFIXES = [
  "inspect-focus-",
  "inspect-journey-",
  "inspect-downstream-",
] as const;

function clearInspectClasses(root: HTMLElement) {
  for (const cls of [...root.classList]) {
    if (
      INSPECT_CLASS_PREFIXES.some((prefix) => cls.startsWith(prefix)) ||
      cls === "inspect-link-gate"
    ) {
      root.classList.remove(cls);
    }
  }
}

/**
 * Syncs inspect context to the server topology shell and renders the plane beacon.
 * Mount inside {@link InfrastructureInspectProvider} (ops section only).
 */
export function HomeInfrastructureInspectBridge() {
  const { inspect } = useInfrastructureInspect();
  const [beaconSlot, setBeaconSlot] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    setBeaconSlot(document.getElementById("home-topology-beacon-slot"));
  }, []);

  useLayoutEffect(() => {
    const root = document.getElementById(PLANE_ID);
    if (!root) return;

    const journeyLens = inspect?.focus
      ? inspect.lens ?? resolveJourneyLens(inspect.focus, inspect.linkGate)
      : undefined;

    clearInspectClasses(root);

    if (inspect?.focus) {
      root.classList.add(`inspect-focus-${inspect.focus}`);
      root.dataset.inspectFocus = inspect.focus;
    } else {
      delete root.dataset.inspectFocus;
    }

    if (journeyLens) {
      root.classList.add(`inspect-journey-${journeyLens}`);
      root.dataset.journeyLens = journeyLens;
    } else {
      delete root.dataset.journeyLens;
    }

    if (inspect?.downstream?.length) {
      for (const route of inspect.downstream) {
        root.classList.add(`inspect-downstream-${route}`);
      }
      root.dataset.inspectDownstream = inspect.downstream.join(" ");
    } else {
      delete root.dataset.inspectDownstream;
    }

    if (inspect?.linkGate) {
      root.classList.add("inspect-link-gate");
    }

    const anchors = root.querySelectorAll<HTMLElement>("[data-route]");
    for (const anchor of anchors) {
      const route = anchor.dataset.route;
      if (!route) continue;
      anchor.classList.remove(
        "ops-route-anchor--inspect-active",
        "ops-route-anchor--inspect-downstream",
      );
      if (inspect?.focus === route) {
        anchor.classList.add("ops-route-anchor--inspect-active");
      }
      if (inspect?.downstream?.includes(route as OpsInspectRoute)) {
        anchor.classList.add("ops-route-anchor--inspect-downstream");
      }
    }
  }, [inspect]);

  if (!beaconSlot) return null;

  return createPortal(<OpsStoryBeacon />, beaconSlot);
}
