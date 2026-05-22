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

const approvalStages = [
  {
    index: "01",
    title: stageTitles[0],
    subtitle: stageSubtitles[0],
    tag: stageTags[0],
    gate: "policy" as const,
  },
  {
    index: "02",
    title: stageTitles[1],
    subtitle: stageSubtitles[1],
    tag: stageTags[1],
    gate: null,
  },
  {
    index: "03",
    title: stageTitles[2],
    subtitle: stageSubtitles[2],
    tag: stageTags[2],
    gate: "technical" as const,
  },
  {
    index: "04",
    title: stageTitles[3],
    subtitle: stageSubtitles[3],
    tag: stageTags[3],
    gate: "access" as const,
  },
] as const;

/** Merchant review pipeline — operational gating, not marketing onboarding theater. */
export function MerchantReviewPipeline({
  className,
  labelledBy,
  compact = false,
  showInspectCopy = true,
  variant = "default",
  interactive,
}: {
  className?: string;
  labelledBy?: string;
  /** Homepage proof bento — vf-rail title only, no duplicate telemetry chrome. */
  compact?: boolean;
  showInspectCopy?: boolean;
  /** P17.2 — static controlled approval pipeline (proof bento). */
  variant?: "default" | "approval-pipeline";
  /** When false, no hover inspect / cross-surface dimming triggers. */
  interactive?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { inspect, setInspect, clearInspect } = useInfrastructureInspect();
  const activeLens = inspect?.lens ?? null;
  const isInteractive =
    interactive ?? (variant === "default" && showInspectCopy);

  const applyInspect = (index: number | null) => {
    if (!isInteractive) return;
    setHovered(index);
    if (index === null) {
      clearInspect();
      return;
    }
    const node = reviewInspectNodes[index];
    setInspect(inspectStateFromNode(node));
  };

  const approvalPipeline = (
    <div
      className={cn(
        "approval-pipeline approval-pipeline--choreo ops-route--ingress",
        compact && "approval-pipeline--compact",
      )}
      aria-hidden="true"
    >
      <header className="ops-state-engine__masthead approval-pipeline__masthead">
        <div className="ops-state-engine__masthead-primary">
          <span className="ops-state-engine__system-index">04</span>
          <span className="ops-state-engine__system-label">Controlled approval</span>
        </div>
        <span className="ops-state-engine__system-meta">Request pipeline · conceptual</span>
      </header>

      <div className="approval-pipeline__boundary approval-pipeline__boundary--policy" aria-hidden="true">
        <span className="approval-pipeline__boundary-tag">Policy gate</span>
        <span className="approval-pipeline__boundary-meta">Intake · rails intent</span>
      </div>

      <div className="approval-pipeline__topology">
        <svg
          className="approval-pipeline__rail-svg"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
          aria-hidden="true"
          focusable="false"
        >
          <path className="approval-pipeline__rail-depth" d="M 4 6 H 96" vectorEffect="non-scaling-stroke" />
          <path className="approval-pipeline__rail-base" d="M 4 6 H 96" vectorEffect="non-scaling-stroke" />
        </svg>

        <ol className="approval-pipeline__stages list-none p-0 m-0">
          {approvalStages.map((stage, i) => (
            <li
              key={stage.title}
              className={cn(
                "approval-pipeline__chamber",
                i === approvalStages.length - 1 && "approval-pipeline__chamber--final",
                stage.gate === "technical" && "approval-pipeline__chamber--gate",
              )}
            >
              {i > 0 ? <span className="approval-pipeline__connector" aria-hidden="true" /> : null}
              <span className="approval-pipeline__chamber-index">{stage.index}</span>
              <span className="approval-pipeline__chamber-tag">{stage.tag}</span>
              <div className="approval-pipeline__chamber-body">
                <strong className="approval-pipeline__chamber-title">{stage.title}</strong>
                <span className="approval-pipeline__chamber-subtitle">{stage.subtitle}</span>
                {stage.gate === "access" ? (
                  <span className="approval-pipeline__chamber-gate">Access gate</span>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="approval-pipeline__access-boundary" aria-hidden="true">
        <span className="approval-pipeline__access-led" />
        <span className="approval-pipeline__access-label">Controlled access boundary</span>
        <span className="approval-pipeline__access-meta">Not self-serve production keys</span>
      </div>

      <footer className="approval-pipeline__footnote">
        <p className="approval-pipeline__footnote-copy">
          Access, rails, and webhook endpoints are configured after approval — not anonymous
          self-serve production keys on day one.
        </p>
      </footer>

      <footer className="ops-state-engine__rail-meta approval-pipeline__rail-meta">
        <span className="ops-state-engine__rail-meta-tag">GATE</span>
        <span className="ops-state-engine__rail-meta-tag">ACCESS</span>
        <span className="ops-state-engine__rail-meta-copy">Controlled approval · conceptual</span>
      </footer>
    </div>
  );

  if (variant === "approval-pipeline") {
    return (
      <VerificationFramePanel
        label="Merchant review"
        sublabel="Request pipeline (conceptual)"
        className={cn(className, "merchant-review-pipeline--approval")}
        labelledBy={labelledBy}
      >
        <div
          className={cn(
            "proof-bento-instrument proof-bento-instrument--approval",
            compact ? "proof-bento-review-stages" : "ops-console-module",
          )}
        >
          {approvalPipeline}
        </div>
      </VerificationFramePanel>
    );
  }

  const stages = (
    <div
      className="flex flex-col items-stretch gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center"
      aria-hidden="true"
    >
      {reviewInspectNodes.map((stage, i) => {
        const isHot = isInteractive && hovered === i;
        const isDownstream =
          isInteractive &&
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
              onMouseEnter={isInteractive ? () => applyInspect(i) : undefined}
              onMouseLeave={isInteractive ? () => applyInspect(null) : undefined}
              onFocus={isInteractive ? () => applyInspect(i) : undefined}
              onBlur={isInteractive ? () => applyInspect(null) : undefined}
              {...(isInteractive ? { tabIndex: 0 } : {})}
            >
              <span className="ops-console-meta-tag">{stageTags[i]}</span>
              <FlowStep title={stageTitles[i]} subtitle={stageSubtitles[i]} />
              {isInteractive && showInspectCopy ? (
                <>
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
                </>
              ) : null}
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
  );

  return (
    <VerificationFramePanel
      label="Merchant review"
      sublabel="Request pipeline (conceptual)"
      className={cn(
        className,
        showInspectCopy && hovered !== null && "merchant-review-pipeline--narrative-active",
      )}
      labelledBy={labelledBy}
    >
      <div
        className={cn(
          "ops-route--ingress",
          compact ? "proof-bento-instrument" : "ops-console-module ops-console-module--review",
        )}
      >
        {!compact ? (
          <header className="ops-console-module__header">
            <span className="ops-console-module__title">Review gate</span>
            <span className="ops-console-routing">GATE · REVIEW · POLICY</span>
          </header>
        ) : null}
        {!compact ? (
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
        ) : null}
        <div
          className={cn(
            compact
              ? "proof-bento-review-stages"
              : "ops-console-module__execution ops-console-module__execution--primary",
          )}
        >
          {compact ? stages : <div className="ops-console-well ops-envelope">{stages}</div>}
        </div>
        {!compact ? (
          <footer className="ops-console-module__meta">
            <span className="ops-console-meta-tag">GATE</span>
            <span className="ops-console-meta-tag">ACCESS</span>
            <span>Controlled approval · conceptual</span>
          </footer>
        ) : (
          <footer className="proof-bento-confirm-meta ops-console-module__meta">
            <span className="ops-console-meta-tag">GATE</span>
            <span className="ops-console-meta-tag">ACCESS</span>
            <span>Controlled approval · conceptual</span>
          </footer>
        )}
      </div>
      <p
        className={cn(
          "leading-relaxed text-muted",
          compact ? "proof-bento-confirm-note mt-5 text-sm" : "mt-4 text-xs",
        )}
      >
        Access, rails, and webhook endpoints are configured after approval — not anonymous
        self-serve production keys on day one.
      </p>
    </VerificationFramePanel>
  );
}
