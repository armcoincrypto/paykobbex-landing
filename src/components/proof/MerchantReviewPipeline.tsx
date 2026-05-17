"use client";

import { useState } from "react";
import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";
import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { OpsNarrativeReveal } from "@/components/proof/OpsNarrativeReveal";
import {
  getDownstreamConsequence,
  inspectStateFromNode,
  reviewInspectNodes,
} from "@/lib/ops-inspection";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { cn } from "@/lib/cn";

const stageTitles = ["Intake", "Qualification", "Technical", "Approval"] as const;
const stageSubtitles = [
  "Use case + rails intent",
  "Risk + fit review",
  "Integration outline",
  "Environment + access",
] as const;
const stageTags = ["POLICY", "REVIEW", "GATE", "VERIFIED"] as const;

/** Merchant review pipeline — operational gating, not marketing onboarding theater. */
export function MerchantReviewPipeline({
  className,
  labelledBy,
}: {
  className?: string;
  labelledBy?: string;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { inspect, setInspect, clearInspect } = useInfrastructureInspect();
  const activeLens = inspect?.lens ?? null;

  const applyInspect = (index: number | null) => {
    setHovered(index);
    if (index === null) {
      clearInspect();
      return;
    }
    const node = reviewInspectNodes[index];
    setInspect(inspectStateFromNode(node));
  };

  return (
    <VerificationFramePanel
      label="Merchant review"
      sublabel="Request pipeline (conceptual)"
      className={cn(
        className,
        hovered !== null && "merchant-review-pipeline--narrative-active",
      )}
      labelledBy={labelledBy}
    >
      <div className="ops-console-module ops-console-module--review ops-route--ingress">
        <header className="ops-console-module__header">
          <span className="ops-console-module__title">Review gate</span>
          <span className="ops-console-routing">GATE · REVIEW · POLICY</span>
        </header>
        <div className="ops-console-module__telemetry">
          <div className="ops-density-strip" aria-hidden="true">
            <span className="ops-density-line ops-density-line--policy">GATE · ACCESS</span>
          </div>
          <p className="ops-narrative-purpose ops-narrative-purpose--module" aria-hidden="true">
            {reviewInspectNodes[3].purpose}
          </p>
          <p className="ops-inspect-hint ops-inspect-hint--static" aria-hidden="true">
            {reviewInspectNodes[3].hint}
          </p>
          <span className="ops-telemetry-chip ops-telemetry-chip--policy">
            <span className="ops-telemetry-led ops-telemetry-led--policy" />
            POLICY
          </span>
          <span className="ops-telemetry-chip ops-telemetry-chip--verified">
            <span className="ops-telemetry-led ops-telemetry-led--verified" />
            REVIEWED
          </span>
          <span className="ops-ownership ops-ownership--merchant">Merchant-owned</span>
        </div>
        <div className="ops-console-module__execution ops-console-module__execution--primary">
          <div className="ops-console-well ops-envelope">
            <div
              className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
              aria-hidden="true"
            >
              {reviewInspectNodes.map((stage, i) => {
                const isHot = hovered === i;
                const isDownstream =
                  hovered !== null &&
                  i > hovered &&
                  reviewInspectNodes[hovered].downstream.includes(stage.focus);
                const downstreamNote =
                  isDownstream && hovered !== null
                    ? getDownstreamConsequence(reviewInspectNodes[hovered], stage)
                    : undefined;
                return (
                  <div key={stage.tag} className="flex items-center gap-2">
                    <div
                      className={cn(
                        "ops-console-plate ops-review-stage flex flex-col items-center gap-1 px-2 py-1.5 text-center",
                        isHot && "ops-review-stage--hot",
                        isDownstream && "ops-review-stage--downstream",
                      )}
                      data-ops-route="review"
                      onMouseEnter={() => applyInspect(i)}
                      onMouseLeave={() => applyInspect(null)}
                      onFocus={() => applyInspect(i)}
                      onBlur={() => applyInspect(null)}
                      tabIndex={0}
                    >
                      <span className="ops-console-meta-tag">{stageTags[i]}</span>
                      <FlowStep title={stageTitles[i]} subtitle={stageSubtitles[i]} />
                      <span className="ops-context-reveal">{stage.tag}</span>
                      <span className="ops-inspect-hint">{stage.hint}</span>
                      <span className="ops-inspect-meta" aria-hidden="true">
                        <span>{stage.ownership}</span>
                        <span> · </span>
                        <span>{stage.affects}</span>
                      </span>
                      <OpsNarrativeReveal
                        node={stage}
                        active={isHot}
                        downstreamNote={downstreamNote}
                        activeLens={activeLens}
                      />
                    </div>
                    {i < reviewInspectNodes.length - 1 ? (
                      <FlowArrow direction="right" className="hidden sm:block" />
                    ) : null}
                    {i < reviewInspectNodes.length - 1 ? (
                      <FlowArrow direction="down" className="sm:hidden" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <footer className="ops-console-module__meta">
          <span className="ops-console-meta-tag">GATE</span>
          <span className="ops-console-meta-tag">ACCESS</span>
          <span>Controlled approval · conceptual</span>
        </footer>
      </div>
      <p className="mt-4 text-xs leading-relaxed text-muted">
        Access, rails, and webhook endpoints are configured after approval — not anonymous
        self-serve production keys on day one.
      </p>
    </VerificationFramePanel>
  );
}
