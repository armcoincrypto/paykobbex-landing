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
          className="home-hero-instrument-compact-eyebrow"
        >
          Operational sequence
        </p>

        <div className="home-hero-instrument-compact-stack">
          <div className="home-hero-instrument-compact-block home-hero-instrument-compact-block--lane">
            <p className="home-hero-instrument-compact-label">Lifecycle lane</p>
            <div className="home-hero-instrument-compact-block__body">
              <LifecycleLaneInstrument {...laneProps} />
            </div>
          </div>

          <hr className="home-hero-instrument-compact-divider" />

          <div className="home-hero-instrument-compact-block home-hero-instrument-compact-block--webhook">
            <p className="home-hero-instrument-compact-label">Webhook flow</p>
            <div className="home-hero-instrument-compact-block__body">
              <WebhookPropagationStrip {...laneProps} />
            </div>
          </div>

          <hr className="home-hero-instrument-compact-divider" />

          <div className="home-hero-instrument-compact-block home-hero-instrument-compact-block--review">
            <p className="home-hero-instrument-compact-label">Merchant review</p>
            <div className="home-hero-instrument-compact-block__body">
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
                    <span className="home-hero-instrument-compact-review-pill ui-chip">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>

        <p className="home-hero-instrument-compact-footer">
          Conceptual overview — not live operational data.
        </p>
      </div>
    </aside>
  );
}
