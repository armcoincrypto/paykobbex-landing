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

/** Webhook sequence ribbon with SVG operational rails — conceptual, not live data. */
export function WebhookPropagationStrip({
  className,
  animate = true,
  interactive,
  showTelemetry = true,
}: {
  className?: string;
  /** Calm propagation pulse along connectors (respects reduced motion in CSS). */
  animate?: boolean;
  /** Hover/focus hot states; defaults to animate. Set false for decorative hero rails. */
  interactive?: boolean;
  /** Mono telemetry bar above ribbon (conceptual labels only). */
  showTelemetry?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const isInteractive = interactive ?? animate;

  const execution = (
    <div className="webhook-ribbon">
      {steps.map((step, i) => {
        const isHot = isInteractive && hovered === i;
        return (
          <div
            key={step.title}
            className={cn(
              "webhook-ribbon-step",
              isInteractive && "webhook-ribbon-step--interactive",
              isHot && "webhook-ribbon-step--hot",
            )}
            onMouseEnter={isInteractive ? () => setHovered(i) : undefined}
            onMouseLeave={isInteractive ? () => setHovered(null) : undefined}
            onFocus={isInteractive ? () => setHovered(i) : undefined}
            onBlur={isInteractive ? () => setHovered(null) : undefined}
            {...(isInteractive ? { tabIndex: 0 } : {})}
          >
            {i < steps.length - 1 ? <ConnectorSvg segmentIndex={i} /> : null}
            <span className={cn("ops-telemetry-chip", `ops-telemetry-chip--${step.tone}`)}>
              <span className={cn("ops-telemetry-led", `ops-telemetry-led--${step.tone}`)} />
              {step.telemetry}
            </span>
            <strong>{step.title}</strong>
            {step.detail}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      className={cn(
        "webhook-ribbon-wrap",
        animate && "webhook-ribbon-wrap--animated",
        showTelemetry && "webhook-ribbon-wrap--structured",
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
            {execution}
          </div>
          <footer className="ops-console-module__meta">
            <span className="ops-console-meta-tag">PIPELINE</span>
            <span className="ops-console-meta-tag">FLOW</span>
            <span className="ops-console-meta-tag">VERIFIED</span>
            <span>Propagation path · conceptual</span>
          </footer>
        </>
      ) : (
        execution
      )}
    </div>
  );
}
