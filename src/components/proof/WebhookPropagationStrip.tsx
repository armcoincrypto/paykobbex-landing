"use client";

import { useState } from "react";
import { useInfrastructureInspect } from "@/components/landing/InfrastructureInspectContext";
import { OpsNarrativeReveal } from "@/components/proof/OpsNarrativeReveal";
import {
  getDownstreamConsequence,
  inspectStateFromNode,
  webhookInspectNodes,
} from "@/lib/ops-inspection";
import { cn } from "@/lib/cn";

const steps = webhookInspectNodes;

function ConnectorSvg({ segmentIndex }: { segmentIndex: number }) {
  return (
    <svg
      className="webhook-ribbon-connector"
      viewBox="0 0 48 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <line
        className="webhook-ribbon-rail-depth"
        x1="0"
        y1="4"
        x2="48"
        y2="4"
        vectorEffect="non-scaling-stroke"
      />
      <line
        className="webhook-ribbon-rail-base"
        x1="0"
        y1="4"
        x2="48"
        y2="4"
        vectorEffect="non-scaling-stroke"
      />
      <line
        className={cn(
          "webhook-ribbon-rail-pulse",
          `webhook-ribbon-rail-pulse--seg-${segmentIndex}`,
        )}
        x1="0"
        y1="4"
        x2="48"
        y2="4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function WebhookRibbonSteps({
  slice,
  segmentOffset,
  isInteractive,
  hovered,
  applyInspect,
  activeLens,
}: {
  slice: readonly (typeof steps)[number][];
  segmentOffset: number;
  isInteractive: boolean;
  hovered: number | null;
  applyInspect: (index: number | null) => void;
  activeLens: import("@/lib/ops-inspection").OpsJourneyLens | null;
}) {
  return (
    <>
      {slice.map((step, i) => {
        const globalIndex = segmentOffset + i;
        const node = steps[globalIndex];
        const isHot = isInteractive && hovered === globalIndex;
        const isDownstream =
          isInteractive &&
          hovered !== null &&
          globalIndex > hovered &&
          steps[hovered].downstream.includes(node.focus);
        const downstreamNote =
          isDownstream && hovered !== null
            ? getDownstreamConsequence(steps[hovered], node)
            : undefined;
        return (
          <div
            key={step.tag}
            className={cn(
              "webhook-ribbon-step",
              isInteractive && "webhook-ribbon-step--interactive",
              isHot && "webhook-ribbon-step--hot",
              isDownstream && "webhook-ribbon-step--downstream",
            )}
            data-ops-route={node.focus}
            onMouseEnter={isInteractive ? () => applyInspect(globalIndex) : undefined}
            onMouseLeave={isInteractive ? () => applyInspect(null) : undefined}
            onFocus={isInteractive ? () => applyInspect(globalIndex) : undefined}
            onBlur={isInteractive ? () => applyInspect(null) : undefined}
            {...(isInteractive ? { tabIndex: 0 } : {})}
          >
            {i < slice.length - 1 ? (
              <ConnectorSvg segmentIndex={globalIndex} />
            ) : globalIndex < steps.length - 1 ? (
              <ConnectorSvg segmentIndex={globalIndex} />
            ) : null}
            <span
              className={cn(
                "ops-telemetry-chip",
                node.focus === "verify" || node.focus === "egress"
                  ? "ops-telemetry-chip--verified"
                  : "ops-telemetry-chip--signal",
              )}
            >
              <span
                className={cn(
                  "ops-telemetry-led",
                  node.focus === "verify" || node.focus === "egress"
                    ? "ops-telemetry-led--verified"
                    : "ops-telemetry-led--signal",
                )}
              />
              {node.tag.split(" · ")[0]}
            </span>
            <strong>{["Event", "POST", "Verify", "Apply"][globalIndex]}</strong>
            {["Lifecycle transition", "Signed body", "Server-side", "Idempotent"][globalIndex]}
            {isInteractive ? (
              <>
                <span className="ops-context-reveal">{node.tag}</span>
                <span className="ops-inspect-hint">{node.hint}</span>
                <span className="ops-inspect-meta" aria-hidden="true">
                  <span>{node.ownership}</span>
                  <span> · </span>
                  <span>{node.affects}</span>
                </span>
                <OpsNarrativeReveal
                  node={node}
                  active={isHot}
                  downstreamNote={downstreamNote}
                  showTrustStatic={node.focus === "verify"}
                  activeLens={activeLens}
                />
              </>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

/** Webhook sequence ribbon with SVG operational rails — conceptual, not live data. */
export function WebhookPropagationStrip({
  className,
  animate = true,
  interactive,
  showTelemetry = true,
  channelLayout = false,
}: {
  className?: string;
  animate?: boolean;
  interactive?: boolean;
  showTelemetry?: boolean;
  channelLayout?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { inspect, setInspect, clearInspect } = useInfrastructureInspect();
  const activeLens = inspect?.lens ?? null;
  const isInteractive = interactive ?? animate;
  const useChannels = channelLayout && showTelemetry;

  const applyInspect = (index: number | null) => {
    setHovered(index);
    if (index === null) {
      clearInspect();
      return;
    }
    const node = steps[index];
    setInspect(inspectStateFromNode(node));
  };

  const flatRibbon = (
    <div className="webhook-ribbon">
      <WebhookRibbonSteps
        slice={steps}
        segmentOffset={0}
        isInteractive={isInteractive}
        hovered={hovered}
        applyInspect={applyInspect}
        activeLens={activeLens}
      />
    </div>
  );

  const channeledRibbon = (
    <div className="ops-console-well ops-console-well--pipeline">
      <div className="ops-console-channel ops-console-channel--ingress ops-route--ingress">
        <span className="ops-console-channel__label">Ingress</span>
        <div className="webhook-ribbon">
          <WebhookRibbonSteps
            slice={steps.slice(0, 2)}
            segmentOffset={0}
            isInteractive={isInteractive}
            hovered={hovered}
            applyInspect={applyInspect}
            activeLens={activeLens}
          />
        </div>
      </div>
      <span className="ops-console-boundary__divider">Verify boundary</span>
      <div className="ops-console-channel ops-console-channel--egress ops-route--egress">
        <span className="ops-console-channel__label">Egress</span>
        <div className="webhook-ribbon">
          <WebhookRibbonSteps
            slice={steps.slice(2)}
            segmentOffset={2}
            isInteractive={isInteractive}
            hovered={hovered}
            applyInspect={applyInspect}
            activeLens={activeLens}
          />
        </div>
      </div>
    </div>
  );

  const execution = useChannels ? channeledRibbon : flatRibbon;

  const executionWrapped = showTelemetry ? (
    <div className="ops-console-boundary ops-console-boundary--verify">
      <span className="ops-console-boundary__tag">Signed processing channel</span>
      {execution}
    </div>
  ) : (
    <div className="ops-console-well ops-console-well--pipeline ops-envelope">{execution}</div>
  );

  return (
    <div
      className={cn(
        "webhook-ribbon-wrap ops-route--verify",
        animate && "webhook-ribbon-wrap--animated",
        showTelemetry && "webhook-ribbon-wrap--structured",
        useChannels && "webhook-ribbon-wrap--channeled",
        hovered !== null && "webhook-ribbon-wrap--route-active",
        hovered !== null && "webhook-ribbon-wrap--narrative-active",
        className,
      )}
      aria-hidden="true"
    >
      {showTelemetry ? (
        <>
          <div className="ops-console-module__telemetry">
            <div className="ops-density-strip" aria-hidden="true">
              <span className="ops-density-line">VERIFY · RAW BODY · SIGNED</span>
              <span className="ops-density-line">QUEUE · RETRY SAFE</span>
            </div>
            <p className="ops-narrative-purpose ops-narrative-purpose--module" aria-hidden="true">
              {webhookInspectNodes[2].purpose}
            </p>
            <p className="ops-narrative-trust ops-narrative-trust--module" aria-hidden="true">
              {webhookInspectNodes[2].trustBoundary}
            </p>
            <p className="ops-inspect-hint ops-inspect-hint--static" aria-hidden="true">
              {webhookInspectNodes[2].hint}
            </p>
            <div className="ops-telemetry-bar">
              <span className="ops-telemetry-meta">Signed pipeline · conceptual</span>
              <span className="ops-telemetry-chip-row">
                <span className="ops-telemetry-chip ops-telemetry-chip--signal">
                  <span className="ops-telemetry-led ops-telemetry-led--signal" />
                  SIGNED
                </span>
                <span className="ops-telemetry-chip ops-telemetry-chip--verified">
                  <span className="ops-telemetry-led ops-telemetry-led--verified" />
                  VERIFIED
                </span>
              </span>
            </div>
            <span className="ops-ownership ops-ownership--server">Server-side</span>
          </div>
          <div className="ops-console-module__execution ops-console-module__execution--primary">
            {executionWrapped}
          </div>
          <footer className="ops-console-module__meta">
            <span className="ops-console-meta-tag">PIPELINE</span>
            <span className="ops-console-meta-tag">FLOW</span>
            <span className="ops-console-meta-tag">VERIFIED</span>
            <span>Propagation path · conceptual</span>
          </footer>
        </>
      ) : (
        executionWrapped
      )}
    </div>
  );
}
