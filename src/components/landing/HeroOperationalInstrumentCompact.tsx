"use client";

import { LifecycleLaneInstrument } from "@/components/proof/LifecycleLaneInstrument";
import { WebhookPropagationStrip } from "@/components/proof/WebhookPropagationStrip";
import { cn } from "@/lib/cn";

const reviewSteps = ["Intake", "Review", "Approval"] as const;

const laneProps = {
  compact: false,
  animate: false,
  interactive: false,
  showTelemetry: false,
  showInspectCopy: false,
} as const;

function ModuleIcon({ variant }: { variant: "lifecycle" | "webhook" | "gate" }) {
  if (variant === "lifecycle") {
    return (
      <svg className="home-hero-preview__module-icon" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="3" cy="8" r="1.5" fill="currentColor" opacity="0.5" />
        <circle cx="8" cy="8" r="1.5" fill="currentColor" opacity="0.75" />
        <circle cx="13" cy="8" r="1.5" fill="currentColor" />
        <path
          d="M4.5 8h2M9.5 8h2"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.35"
        />
      </svg>
    );
  }
  if (variant === "webhook") {
    return (
      <svg className="home-hero-preview__module-icon" viewBox="0 0 16 16" aria-hidden="true">
        <path
          d="M2 8h3l1.5-2 1.5 4 1.5-2H14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg className="home-hero-preview__module-icon" viewBox="0 0 16 16" aria-hidden="true">
      <path
        d="M8 2.5 12.5 5v3.5c0 2.2-1.8 4-4.5 4.5C5.3 12.5 3.5 10.7 3.5 8.5V5L8 2.5z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
      />
      <path
        d="M6.25 8.25 7.4 9.4 9.85 6.95"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Homepage hero — ultra-premium operational product preview (conceptual only).
 */
export function HeroOperationalInstrumentCompact({ className }: { className?: string }) {
  return (
    <aside
      className={cn(
        "home-hero-instrument home-hero-instrument--compact home-hero-instrument--preview home-hero-instrument--choreo home-hero-instrument--product",
        className,
      )}
      aria-labelledby="hero-instrument-heading"
    >
      <p className="sr-only">
        Conceptual diagram: payment lifecycle states Pending, Paid, and Confirmed; webhook path
        through signed POST, verification, and idempotent apply; merchant review from intake through
        approval. Not live operational data.
      </p>

      <div className="home-hero-instrument-compact-card home-hero-preview">
        <header className="home-hero-preview__header">
          <div className="home-hero-preview__title-block">
            <h2 id="hero-instrument-heading" className="home-hero-preview__title">
              Operational sequence
            </h2>
            <p className="home-hero-preview__subtitle">Conceptual model</p>
          </div>
          <div className="home-hero-preview__badges">
            <span className="home-hero-preview__badge home-hero-preview__badge--conceptual">
              Conceptual
            </span>
            <span className="home-hero-preview__badge home-hero-preview__badge--policy">
              Policy scoped
            </span>
          </div>
        </header>

        <p className="home-hero-preview__meta" aria-hidden="true">
          <span>Control plane</span>
          <span className="home-hero-preview__meta-dot" />
          <span>Sequence model</span>
        </p>

        <div className="home-hero-preview__console">
          <article
            className="home-hero-preview__module home-hero-preview__module--lifecycle"
            aria-label="Lifecycle lane: Pending, Paid, Confirmed with Expired policy branch"
          >
            <header className="home-hero-preview__module-head">
              <span className="home-hero-preview__module-index">01</span>
              <ModuleIcon variant="lifecycle" />
              <span className="home-hero-preview__module-title">Lifecycle</span>
            </header>
            <div className="home-hero-preview__module-body home-hero-preview__module-body--lane">
              <LifecycleLaneInstrument
                {...laneProps}
                className="home-hero-instrument-compact-lane"
              />
            </div>
          </article>

          <div className="home-hero-preview__module-row">
            <article
              className="home-hero-preview__module home-hero-preview__module--webhook"
              aria-label="Webhook flow: Event, POST, Verify, Apply"
            >
              <header className="home-hero-preview__module-head">
                <span className="home-hero-preview__module-index">02</span>
                <ModuleIcon variant="webhook" />
                <span className="home-hero-preview__module-title">Webhook</span>
              </header>
              <div className="home-hero-preview__module-body home-hero-preview__module-body--webhook">
                <WebhookPropagationStrip
                  {...laneProps}
                  className="home-hero-instrument-compact-webhook"
                />
              </div>
            </article>

            <article
              className="home-hero-preview__module home-hero-preview__module--gate"
              aria-label="Merchant review gate: Intake, Review, Approval"
            >
              <header className="home-hero-preview__module-head">
                <span className="home-hero-preview__module-index">03</span>
                <ModuleIcon variant="gate" />
                <span className="home-hero-preview__module-title">Review gate</span>
              </header>
              <div className="home-hero-preview__module-body home-hero-preview__module-body--gate">
                <div
                  className="home-hero-preview__segmented"
                  role="list"
                  aria-label="Merchant review progression (conceptual)"
                >
                  {reviewSteps.map((step, index) => (
                    <span key={step} role="listitem" className="home-hero-preview__segment-item">
                      {index > 0 ? (
                        <span className="home-hero-preview__segment-chevron" aria-hidden="true">
                          ›
                        </span>
                      ) : null}
                      <span className="home-hero-preview__segment-pill" tabIndex={0}>
                        {step}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>

        <footer className="home-hero-preview__footer">
          <span className="home-hero-preview__footer-led" aria-hidden="true" />
          <p>Conceptual overview — not live operational data.</p>
        </footer>
      </div>
    </aside>
  );
}
