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

const webhookPipelineMeta = [
  {
    title: "Event",
    subtitle: "Lifecycle transition",
    index: "01",
    channel: "ingress" as const,
    tag: "EMIT",
  },
  {
    title: "POST",
    subtitle: "Signed body",
    index: "02",
    channel: "ingress" as const,
    tag: "TRANSPORT",
  },
  {
    title: "Verify",
    subtitle: "Server-side",
    index: "03",
    channel: "boundary" as const,
    tag: "RAW BODY",
  },
  {
    title: "Apply",
    subtitle: "Idempotent",
    index: "04",
    channel: "egress" as const,
    tag: "PERSIST",
  },
] as const;

function PipelineConnectorSvg({
  segmentIndex,
  className,
}: {
  segmentIndex: number;
  className?: string;
}) {
  return (
    <svg
      className={cn("webhook-ribbon-connector ops-pipeline-connector", className)}
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
          "webhook-ribbon-rail-pulse ops-pipeline-rail-pulse",
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
  showInspectCopy,
}: {
  slice: readonly (typeof steps)[number][];
  segmentOffset: number;
  isInteractive: boolean;
  hovered: number | null;
  applyInspect: (index: number | null) => void;
  activeLens: import("@/lib/ops-inspection").OpsJourneyLens | null;
  showInspectCopy: boolean;
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
            {showInspectCopy ? (
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
            ) : null}
            <strong>{["Event", "POST", "Verify", "Apply"][globalIndex]}</strong>
            {["Lifecycle transition", "Signed body", "Server-side", "Idempotent"][globalIndex]}
            {isInteractive && showInspectCopy ? (
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
  compact = false,
  showInspectCopy = true,
  variant = "default",
}: {
  className?: string;
  animate?: boolean;
  interactive?: boolean;
  showTelemetry?: boolean;
  channelLayout?: boolean;
  /** Homepage proof bento — flat ribbon without extra well/boundary wrappers. */
  compact?: boolean;
  showInspectCopy?: boolean;
  /** P17 — secure operational pipeline surface (proof bento / ops). */
  variant?: "default" | "state-engine";
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

  if (variant === "state-engine") {
    const ingressSteps = webhookPipelineMeta.filter((s) => s.channel === "ingress");
    const boundaryStep = webhookPipelineMeta.find((s) => s.channel === "boundary");
    const egressStep = webhookPipelineMeta.find((s) => s.channel === "egress");

    const renderChamber = (
      step: (typeof webhookPipelineMeta)[number],
      globalIndex: number,
      showConnector: boolean,
    ) => (
      <div
        key={step.title}
        className={cn(
          "ops-pipeline-chamber",
          `ops-pipeline-chamber--${step.channel}`,
          `ops-pipeline-chamber--${step.title.toLowerCase()}`,
        )}
      >
        {showConnector ? <PipelineConnectorSvg segmentIndex={globalIndex - 1} /> : null}
        <span className="ops-pipeline-chamber__index">{step.index}</span>
        <div className="ops-pipeline-chamber__surface">
          <span className="ops-pipeline-chamber__tag">{step.tag}</span>
          <strong className="ops-pipeline-chamber__title">{step.title}</strong>
          <span className="ops-pipeline-chamber__subtitle">{step.subtitle}</span>
        </div>
      </div>
    );

    return (
      <div
        className={cn(
          "webhook-ribbon-wrap webhook-ribbon-wrap--state-engine ops-pipeline-engine ops-route--verify",
          animate && "webhook-ribbon-wrap--animated ops-pipeline-engine--animated",
          className,
        )}
        aria-hidden="true"
      >
        <header className="ops-state-engine__masthead">
          <div className="ops-state-engine__masthead-primary">
            <span className="ops-state-engine__system-index">02</span>
            <span className="ops-state-engine__system-label">Signed pipeline</span>
          </div>
          <span className="ops-state-engine__system-meta">Transport choreography · conceptual</span>
        </header>

        <div className="ops-pipeline-engine__channels">
          <section className="ops-pipeline-engine__channel ops-pipeline-engine__channel--ingress">
            <header className="ops-pipeline-engine__channel-head">
              <span className="ops-pipeline-engine__channel-label">Ingress</span>
              <span className="ops-pipeline-engine__channel-meta">Signed emit · HTTPS</span>
            </header>
            <div className="ops-pipeline-engine__lane">
              {ingressSteps.map((step, i) =>
                renderChamber(step, i, i > 0),
              )}
            </div>
          </section>

          <div className="ops-pipeline-engine__boundary" aria-hidden="true">
            <span className="ops-pipeline-engine__boundary-tag">Verify boundary</span>
            <span className="ops-pipeline-engine__boundary-meta">Raw bytes · server-side</span>
          </div>

          {boundaryStep ? (
            <section className="ops-pipeline-engine__channel ops-pipeline-engine__channel--boundary">
              <div className="ops-pipeline-engine__lane ops-pipeline-engine__lane--single">
                {renderChamber(boundaryStep, 2, true)}
              </div>
            </section>
          ) : null}

          {egressStep ? (
            <section className="ops-pipeline-engine__channel ops-pipeline-engine__channel--egress">
              <header className="ops-pipeline-engine__channel-head">
                <span className="ops-pipeline-engine__channel-label">Egress</span>
                <span className="ops-pipeline-engine__channel-meta">Idempotent · retry-safe</span>
              </header>
              <div className="ops-pipeline-engine__lane ops-pipeline-engine__lane--single">
                {renderChamber(egressStep, 3, true)}
              </div>
            </section>
          ) : null}
        </div>

        <footer className="ops-pipeline-engine__footnote">
          <span className="ops-pipeline-engine__footnote-led" aria-hidden="true" />
          <p className="ops-pipeline-engine__footnote-copy">
            Signed callbacks: verify on raw bytes, then update internal state idempotently—retries
            are normal.
          </p>
        </footer>

        <footer className="ops-state-engine__rail-meta">
          <span className="ops-state-engine__rail-meta-tag">PIPELINE</span>
          <span className="ops-state-engine__rail-meta-tag">DURABLE</span>
          <span className="ops-state-engine__rail-meta-copy">Propagation path · conceptual</span>
        </footer>
      </div>
    );
  }

  const flatRibbon = (
    <div className="webhook-ribbon">
      <WebhookRibbonSteps
        slice={steps}
        segmentOffset={0}
        isInteractive={isInteractive}
        hovered={hovered}
        applyInspect={applyInspect}
        activeLens={activeLens}
        showInspectCopy={showInspectCopy}
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
            showInspectCopy={showInspectCopy}
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
            showInspectCopy={showInspectCopy}
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
  ) : compact ? (
    execution
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
        showInspectCopy && hovered !== null && "webhook-ribbon-wrap--narrative-active",
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
