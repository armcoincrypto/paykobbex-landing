"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

const layers = [
  { label: "Pending", note: "Created / awaiting detection", tone: "muted" as const },
  { label: "Paid", note: "Detected — not final for reconciliation", tone: "accent" as const },
  { label: "Confirmed", note: "Policy + rail semantics met", tone: "settled" as const },
] as const;

/** Layered confirmation depth — conceptual settlement visibility. */
export function ConfirmationDepthStack({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  return (
    <div ref={ref} className={cn("confirmation-depth", className)} aria-hidden="true">
      {layers.map((layer, i) => (
        <motion.div
          key={layer.label}
          className={cn(
            "confirmation-depth-layer",
            layer.tone === "accent" && "is-emphasized",
          )}
          initial={reduce ? false : { opacity: 0.65, y: 4 }}
          animate={
            inView || reduce
              ? { opacity: layer.tone === "settled" ? 1 : i === 0 ? 0.74 : 0.88, y: 0 }
              : undefined
          }
          transition={{
            duration: reduce ? 0 : 0.38,
            delay: reduce ? 0 : i * 0.08,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="confirmation-depth-layer__label">{layer.label}</p>
          <p className="confirmation-depth-layer__note">{layer.note}</p>
        </motion.div>
      ))}
    </div>
  );
}
