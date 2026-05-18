"use client";

import { LifecycleLaneInstrument } from "@/components/proof/LifecycleLaneInstrument";
import { WebhookPropagationStrip } from "@/components/proof/WebhookPropagationStrip";
import { cn } from "@/lib/cn";

const reviewSteps = ["Intake", "Review", "Approval"] as const;

const laneProps = {
  compact: true,
  animate: false,
  interactive: false,
  showTelemetry: false,
  showInspectCopy: false,
} as const;

/**
 * Homepage hero — compact operational instrument (diagrams without console chrome).
 */
export function HeroOperationalInstrumentCompact({ className }: { className?: string }) {
  return (
    <aside
      className={cn("home-hero-instrument home-hero-instrument--compact", className)}
      aria-labelledby="hero-instrument-heading"
    >
      <p className="sr-only">
        Conceptual diagram: payment lifecycle states Pending, Paid, and Confirmed; webhook path
        through signed POST, verification, and idempotent apply; merchant review from intake through
        approval. Not live operational data.
      </p>

      <div className="home-hero-instrument-compact-card">
        <p
          id="hero-instrument-heading"
          className="home-hero-instrument-compact-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.14em]"
        >
          Operational sequence
        </p>

        <div className="home-hero-instrument-compact-block">
          <p className="home-hero-instrument-compact-label">Lifecycle lane</p>
          <LifecycleLaneInstrument {...laneProps} />
        </div>

        <div className="home-hero-instrument-compact-divider" aria-hidden="true" />

        <div className="home-hero-instrument-compact-block">
          <p className="home-hero-instrument-compact-label">Webhook flow</p>
          <WebhookPropagationStrip {...laneProps} />
        </div>

        <div className="home-hero-instrument-compact-divider" aria-hidden="true" />

        <div className="home-hero-instrument-compact-block">
          <p className="home-hero-instrument-compact-label">Merchant review</p>
          <ol
            className="home-hero-instrument-compact-review list-none p-0 m-0"
            aria-label="Merchant review progression (conceptual)"
          >
            {reviewSteps.map((step, index) => (
              <li key={step} className="home-hero-instrument-compact-review-step">
                {index > 0 ? (
                  <span className="home-hero-instrument-compact-review-sep" aria-hidden="true">
                    →
                  </span>
                ) : null}
                <span className="home-hero-instrument-compact-review-pill">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="home-hero-instrument-compact-footer">
          Conceptual overview — not live operational data.
        </p>
      </div>
    </aside>
  );
}
