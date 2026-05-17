"use client";

import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import {
  getCredibilityBeacon,
  getEcosystemBeacon,
  getJourneyContext,
  getNarrativeBeacon,
  journeyLensLabels,
  resolveJourneyLens,
} from "@/lib/ops-inspection";

/** Contextual plane-level narrative when a route is under inspection. */
export function OpsStoryBeacon() {
  const { inspect } = useInfrastructureInspect();

  if (!inspect?.focus) {
    return null;
  }

  const lens =
    inspect.lens ?? resolveJourneyLens(inspect.focus, inspect.linkGate);
  const context = getJourneyContext(inspect.focus);

  return (
    <p className="ops-story-beacon" aria-hidden="true">
      <span className="ops-story-beacon__route">{inspect.focus}</span>
      <span className="ops-story-beacon__lens">{journeyLensLabels[lens]}</span>
      <span className="ops-story-beacon__text">{getNarrativeBeacon(inspect.focus)}</span>
      <span className="ops-story-beacon__ecosystem">{getEcosystemBeacon(inspect.focus)}</span>
      <span className="ops-story-beacon__credibility">{getCredibilityBeacon(inspect.focus)}</span>
      <span className="ops-story-beacon__persona">{context.personaEcho}</span>
      <span className="ops-story-beacon__readiness">{context.readiness}</span>
    </p>
  );
}
