"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const steps = [
  { title: "Event", detail: "Lifecycle transition" },
  { title: "POST", detail: "Signed body" },
  { title: "Verify", detail: "Server-side" },
  { title: "Apply", detail: "Idempotent" },
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
}: {
  className?: string;
  /** Calm propagation pulse along connectors (respects reduced motion in CSS). */
  animate?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "webhook-ribbon-wrap",
        animate && "webhook-ribbon-wrap--animated",
        className,
      )}
      aria-hidden="true"
    >
      <div className="webhook-ribbon">
        {steps.map((step, i) => {
          const isHot = hovered === i;
          return (
            <div
              key={step.title}
              className={cn(
                "webhook-ribbon-step",
                animate && "webhook-ribbon-step--interactive",
                isHot && "webhook-ribbon-step--hot",
              )}
              onMouseEnter={animate ? () => setHovered(i) : undefined}
              onMouseLeave={animate ? () => setHovered(null) : undefined}
              onFocus={animate ? () => setHovered(i) : undefined}
              onBlur={animate ? () => setHovered(null) : undefined}
              {...(animate ? { tabIndex: 0 } : {})}
            >
              {i < steps.length - 1 ? <ConnectorSvg segmentIndex={i} /> : null}
              <strong>{step.title}</strong>
              {step.detail}
            </div>
          );
        })}
      </div>
    </div>
  );
}
