"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const steps = [
  { title: "Event", detail: "Lifecycle transition", telemetry: "SIGNAL", tone: "signal" as const },
  { title: "POST", detail: "Signed body", telemetry: "SIGNED", tone: "signal" as const },
  { title: "Verify", detail: "Server-side", telemetry: "SERVER-SIDE", tone: "verified" as const },
  { title: "Apply", detail: "Idempotent", telemetry: "IDEMPOTENT", tone: "verified" as const },
] as const;

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
  setHovered,
}: {
  slice: readonly (typeof steps)[number][];
  segmentOffset: number;
  isInteractive: boolean;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  return (
    <>
      {slice.map((step, i) => {
        const globalIndex = segmentOffset + i;
        const isHot = isInteractive && hovered === globalIndex;
        return (
          <div
            key={step.title}
            className={cn(
              "webhook-ribbon-step",
              isInteractive && "webhook-ribbon-step--interactive",
              isHot && "webhook-ribbon-step--hot",
            )}
            onMouseEnter={isInteractive ? () => setHovered(globalIndex) : undefined}
            onMouseLeave={isInteractive ? () => setHovered(null) : undefined}
            onFocus={isInteractive ? () => setHovered(globalIndex) : undefined}
            onBlur={isInteractive ? () => setHovered(null) : undefined}
            {...(isInteractive ? { tabIndex: 0 } : {})}
          >
            {i < slice.length - 1 ? (
              <ConnectorSvg segmentIndex={globalIndex} />
            ) : globalIndex < steps.length - 1 ? (
              <ConnectorSvg segmentIndex={globalIndex} />
            ) : null}
            <span className={cn("ops-telemetry-chip", `ops-telemetry-chip--${step.tone}`)}>
              <span className={cn("ops-telemetry-led", `ops-telemetry-led--${step.tone}`)} />
              {step.telemetry}
            </span>
            <strong>{step.title}</strong>
            {step.detail}
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
  /** Calm propagation pulse along connectors (respects reduced motion in CSS). */
  animate?: boolean;
  /** Hover/focus hot states; defaults to animate. Set false for decorative hero rails. */
  interactive?: boolean;
  /** Mono telemetry bar above ribbon (conceptual labels only). */
  showTelemetry?: boolean;
  /** Ingress / verification / egress channel layering for deep console surfaces. */
  channelLayout?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const isInteractive = interactive ?? animate;
  const useChannels = channelLayout && showTelemetry;

  const flatRibbon = (
    <div className="webhook-ribbon">
      <WebhookRibbonSteps
        slice={steps}
        segmentOffset={0}
        isInteractive={isInteractive}
        hovered={hovered}
        setHovered={setHovered}
      />
    </div>
  );

  const channeledRibbon = (
    <div className="ops-console-well ops-console-well--pipeline">
      <div className="ops-console-channel ops-console-channel--ingress">
        <span className="ops-console-channel__label">Ingress</span>
        <div className="webhook-ribbon">
          <WebhookRibbonSteps
            slice={steps.slice(0, 2)}
            segmentOffset={0}
            isInteractive={isInteractive}
            hovered={hovered}
            setHovered={setHovered}
          />
        </div>
      </div>
      <span className="ops-console-boundary__divider">Verify boundary</span>
      <div className="ops-console-channel ops-console-channel--egress">
        <span className="ops-console-channel__label">Egress</span>
        <div className="webhook-ribbon">
          <WebhookRibbonSteps
            slice={steps.slice(2)}
            segmentOffset={2}
            isInteractive={isInteractive}
            hovered={hovered}
            setHovered={setHovered}
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
    <div className="ops-console-well ops-console-well--pipeline">{execution}</div>
  );

  return (
    <div
      className={cn(
        "webhook-ribbon-wrap",
        animate && "webhook-ribbon-wrap--animated",
        showTelemetry && "webhook-ribbon-wrap--structured",
        useChannels && "webhook-ribbon-wrap--channeled",
        className,
      )}
      aria-hidden="true"
    >
      {showTelemetry ? (
        <>
          <div className="ops-console-module__telemetry">
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
