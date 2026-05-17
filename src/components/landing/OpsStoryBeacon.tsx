"use client";

import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { getNarrativeBeacon } from "@/lib/ops-inspection";

/** Contextual plane-level narrative when a route is under inspection. */
export function OpsStoryBeacon() {
  const { inspect } = useInfrastructureInspect();

  if (!inspect?.focus) {
    return null;
  }

  return (
    <p className="ops-story-beacon" aria-hidden="true">
      <span className="ops-story-beacon__route">{inspect.focus}</span>
      <span className="ops-story-beacon__text">{getNarrativeBeacon(inspect.focus)}</span>
    </p>
  );
}
