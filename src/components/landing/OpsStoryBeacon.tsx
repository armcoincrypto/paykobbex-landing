"use client";

import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { getInspectPanelCopy } from "@/lib/ops-inspection";

/** Contextual plane-level narrative when a route is under inspection. */
export function OpsStoryBeacon() {
  const { inspect } = useInfrastructureInspect();

  if (!inspect?.focus) {
    return null;
  }

  const panel = getInspectPanelCopy(inspect.focus);

  return (
    <p className="ops-story-beacon" aria-hidden="true">
      <span className="ops-story-beacon__route">{panel.title}</span>
      <span className="ops-story-beacon__lens">{panel.eyebrow}</span>
    </p>
  );
}
