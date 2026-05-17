"use client";

import { motion, useReducedMotion } from "framer-motion";
import { StatePill, type StatePillLabel } from "@/components/diagrams/StatePill";
import { cn } from "@/lib/cn";

const primary: StatePillLabel[] = ["Pending", "Paid", "Confirmed"];

const accentMarkerGlow = {
  rest: "0 0 0 3px rgb(var(--token-accent-rgb) / 0.06)",
  pulse: "0 0 8px rgb(var(--token-accent-rgb) / 0.2)",
} as const;

/**
 * Horizontal lifecycle lane — signature instrument strip.
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
  const reduce = useReducedMotion();
  const shouldAnimate = animate && !reduce;

  return (
    <div className={cn("lifecycle-lane", className)} aria-hidden="true">
      <div className="lifecycle-lane-track" />
      <ol className="lifecycle-lane-nodes list-none p-0 m-0">
        {primary.map((label, i) => (
          <li key={label} className="lifecycle-lane-node">
            <motion.span
              className={cn(
                "lifecycle-lane-marker",
                shouldAnimate && i === 0 && "is-active",
              )}
              initial={false}
              animate={
                shouldAnimate
                  ? {
                      boxShadow: [
                        accentMarkerGlow.rest,
                        accentMarkerGlow.pulse,
                        accentMarkerGlow.rest,
                      ],
                    }
                  : undefined
              }
              transition={
                shouldAnimate
                  ? {
                      duration: 3,
                      delay: i * 1.1,
                      repeat: Infinity,
                      repeatDelay: 4.5,
                      ease: [0.4, 0, 0.2, 1],
                    }
                  : undefined
              }
            />
            <StatePill label={label} className={compact ? "scale-[0.92]" : undefined} />
          </li>
        ))}
      </ol>
      <div className="lifecycle-lane-branch flex flex-wrap items-center gap-1.5">
        <span>Branch:</span>
        <StatePill label="Expired" className="inline-flex scale-[0.88]" />
      </div>
    </div>
  );
}
