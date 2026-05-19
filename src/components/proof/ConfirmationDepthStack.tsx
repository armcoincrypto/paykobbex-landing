"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/cn";

const layers = [
  {
    label: "Pending",
    index: "01",
    note: "Created / awaiting detection",
    tone: "detection" as const,
    zone: "detection" as const,
    ownership: "Engineering visibility",
    segment: "Detection path",
  },
  {
    label: "Paid",
    index: "02",
    note: "Detected — not final for reconciliation",
    tone: "provisional" as const,
    zone: "provisional" as const,
    ownership: "Finance · provisional",
    segment: "Reconciliation lane",
  },
  {
    label: "Confirmed",
    index: "03",
    note: "Policy + rail semantics met",
    tone: "final" as const,
    zone: "final" as const,
    ownership: "Treasury finality",
    segment: "Policy boundary",
  },
] as const;

/** Layered confirmation depth — conceptual settlement visibility. */
export function ConfirmationDepthStack({
  className,
  variant = "default",
  animate = true,
}: {
  className?: string;
  /** P17.1 — settlement intelligence surface (proof bento). */
  variant?: "default" | "settlement-intelligence";
  animate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();

  if (variant === "settlement-intelligence") {
    return (
      <div
        ref={ref}
        className={cn(
          "settlement-intelligence ops-route--reconcile",
          animate && "settlement-intelligence--animated",
          className,
        )}
        aria-hidden="true"
      >
        <header className="ops-state-engine__masthead settlement-intelligence__masthead">
          <div className="ops-state-engine__masthead-primary">
            <span className="ops-state-engine__system-index">03</span>
            <span className="ops-state-engine__system-label">Settlement intelligence</span>
          </div>
          <span className="ops-state-engine__system-meta">Reconciliation topology · conceptual</span>
        </header>

        <div className="settlement-intelligence__zone-rail" aria-hidden="true">
          <span className="settlement-intelligence__zone settlement-intelligence__zone--detection">
            Detection semantics
          </span>
          <span className="ops-state-engine__zone-divider" />
          <span className="settlement-intelligence__zone settlement-intelligence__zone--provisional">
            Provisional books
          </span>
          <span className="ops-state-engine__zone-divider" />
          <span className="settlement-intelligence__zone settlement-intelligence__zone--final">
            Final recognition
          </span>
        </div>

        <div className="settlement-intelligence__spectrum">
          <svg
            className="settlement-intelligence__rail-svg"
            viewBox="0 0 100 24"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
          >
            <path
              className="settlement-intelligence__rail-zone settlement-intelligence__rail-zone--detection"
              d="M 3 5 H 34 V 19 H 3 Z"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="settlement-intelligence__rail-zone settlement-intelligence__rail-zone--provisional"
              d="M 34 5 H 66 V 19 H 34 Z"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="settlement-intelligence__rail-zone settlement-intelligence__rail-zone--final"
              d="M 66 5 H 97 V 19 H 66 Z"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="settlement-intelligence__rail-depth"
              d="M 6 11 H 94"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="settlement-intelligence__rail-base"
              d="M 6 11 H 94"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="settlement-intelligence__rail-pulse"
              d="M 6 11 H 94"
              vectorEffect="non-scaling-stroke"
            />
            <path
              className="settlement-intelligence__policy-mark"
              d="M 66 11 V 15"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          <ol className="settlement-intelligence__depth-nodes list-none p-0 m-0">
            {layers.map((layer) => (
              <li
                key={layer.label}
                className={cn(
                  "settlement-intelligence__node",
                  `settlement-intelligence__node--${layer.tone}`,
                )}
              >
                <span className="settlement-intelligence__node-index">{layer.index}</span>
                <span className="settlement-intelligence__node-marker" aria-hidden="true" />
                <div className="settlement-intelligence__node-body">
                  <span className="settlement-intelligence__node-label">{layer.label}</span>
                  <span className="settlement-intelligence__node-note">{layer.note}</span>
                  <span className="settlement-intelligence__node-ownership">{layer.ownership}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="settlement-intelligence__topology">
          <header className="settlement-intelligence__topology-head">
            <span className="settlement-intelligence__topology-title">Ownership map</span>
            <span className="settlement-intelligence__topology-meta">Semantic depth · conceptual</span>
          </header>
          <div className="settlement-intelligence__segments">
            {layers.map((layer, i) => (
              <div
                key={layer.segment}
                className={cn(
                  "settlement-intelligence__segment",
                  `settlement-intelligence__segment--${layer.tone}`,
                )}
              >
                {i > 0 ? (
                  <span className="settlement-intelligence__segment-connector" aria-hidden="true" />
                ) : null}
                <span className="settlement-intelligence__segment-tag">{layer.segment}</span>
                <span className="settlement-intelligence__segment-state">{layer.label}</span>
                <span className="settlement-intelligence__segment-owner">{layer.ownership}</span>
              </div>
            ))}
          </div>
          <div className="settlement-intelligence__visibility-matrix" aria-hidden="true">
            <span className="settlement-intelligence__matrix-label">Visibility</span>
            <div className="settlement-intelligence__matrix-grid">
              <span className="settlement-intelligence__matrix-col">Detected</span>
              <span className="settlement-intelligence__matrix-col">Provisional</span>
              <span className="settlement-intelligence__matrix-col">Final</span>
              <span className="settlement-intelligence__matrix-row">Pending</span>
              <span className="settlement-intelligence__matrix-cell settlement-intelligence__matrix-cell--on" />
              <span className="settlement-intelligence__matrix-cell" />
              <span className="settlement-intelligence__matrix-cell" />
              <span className="settlement-intelligence__matrix-row">Paid</span>
              <span className="settlement-intelligence__matrix-cell" />
              <span className="settlement-intelligence__matrix-cell settlement-intelligence__matrix-cell--on" />
              <span className="settlement-intelligence__matrix-cell" />
              <span className="settlement-intelligence__matrix-row">Confirmed</span>
              <span className="settlement-intelligence__matrix-cell" />
              <span className="settlement-intelligence__matrix-cell" />
              <span className="settlement-intelligence__matrix-cell settlement-intelligence__matrix-cell--on settlement-intelligence__matrix-cell--final" />
            </div>
          </div>
        </div>

        <footer className="settlement-intelligence__depth-annotation">
          <span className="settlement-intelligence__depth-led" aria-hidden="true" />
          <p className="settlement-intelligence__depth-copy">
            Depth reflects policy: what is detected, what is provisional, and what is final for your
            books — not a single “paid” boolean.
          </p>
        </footer>

        <footer className="ops-state-engine__rail-meta settlement-intelligence__rail-meta">
          <span className="ops-state-engine__rail-meta-tag">RAIL</span>
          <span className="ops-state-engine__rail-meta-tag">RECONCILE</span>
          <span className="ops-state-engine__rail-meta-copy">State ownership · conceptual</span>
        </footer>
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("confirmation-depth", className)} aria-hidden="true">
      {layers.map((layer, i) => (
        <motion.div
          key={layer.label}
          className={cn(
            "confirmation-depth-layer",
            layer.tone === "provisional" && "is-emphasized",
          )}
          initial={reduce ? false : { opacity: 0.65, y: 4 }}
          animate={
            inView || reduce
              ? {
                  opacity: layer.tone === "final" ? 1 : i === 0 ? 0.74 : 0.88,
                  y: 0,
                }
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
