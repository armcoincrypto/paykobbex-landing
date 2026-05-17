"use client";

import { useState } from "react";
import { StatePill, type StatePillLabel } from "@/components/diagrams/StatePill";
import { cn } from "@/lib/cn";

const primary: StatePillLabel[] = ["Pending", "Paid", "Confirmed"];

/**
 * Horizontal lifecycle lane — SVG operational rails with calm signal motion.
 * Conceptual states only; not live merchant data.
 */
export function LifecycleLaneInstrument({
  className,
  compact = false,
  animate = true,
}: {
  className?: string;
  compact?: boolean;
  animate?: boolean;
}) {
  const [hovered, setHovered] = useState<number | null>(null);
  const interactive = animate;

  return (
    <div
      className={cn(
        "lifecycle-lane",
        interactive && "lifecycle-lane--animated",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        className="lifecycle-lane-rail-svg"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="lifecycle-lane-rail-base"
          d="M 6 7 H 94"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="lifecycle-lane-rail-pulse"
          d="M 6 7 H 94"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="lifecycle-lane-rail-branch"
          d="M 50 7 V 16"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ol className="lifecycle-lane-nodes list-none p-0 m-0">
        {primary.map((label, i) => {
          const isHot = interactive && hovered === i;
          return (
            <li
              key={label}
              className={cn(
                "lifecycle-lane-node",
                interactive && "lifecycle-lane-node--interactive",
                isHot && "lifecycle-lane-node--hot",
              )}
              onMouseEnter={interactive ? () => setHovered(i) : undefined}
              onMouseLeave={interactive ? () => setHovered(null) : undefined}
              onFocus={interactive ? () => setHovered(i) : undefined}
              onBlur={interactive ? () => setHovered(null) : undefined}
              {...(interactive
                ? { tabIndex: 0, role: "presentation" as const }
                : {})}
            >
              <span
                className={cn(
                  "lifecycle-lane-marker",
                  isHot && "lifecycle-lane-marker--hot",
                )}
              />
              <StatePill label={label} className={compact ? "scale-[0.92]" : undefined} />
            </li>
          );
        })}
      </ol>
      <div className="lifecycle-lane-branch flex flex-wrap items-center gap-1.5">
        <span>Branch:</span>
        <StatePill label="Expired" className="inline-flex scale-[0.88]" />
      </div>
    </div>
  );
}
