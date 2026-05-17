"use client";

import { DiagramReveal } from "@/components/diagrams/DiagramReveal";
import { LifecycleLaneInstrument } from "@/components/proof/LifecycleLaneInstrument";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { WebhookPropagationStrip } from "@/components/proof/WebhookPropagationStrip";
import { cn } from "@/lib/cn";

const reviewCheckpoints = [
  "Intake",
  "Qualification",
  "Technical",
  "Approval",
] as const;

/**
 * Hero instrument — operational sequence without fake dashboards or metrics.
 */
export function HeroOperationalInstrument({ className }: { className?: string }) {
  return (
    <DiagramReveal className={cn("home-hero-instrument w-full", className)}>
      <VerificationFramePanel
        label="Operational sequence"
        sublabel="Conceptual instrumentation — not live data"
        className="ops-instrument-surface hero-instrument-surface hero-instrument-console"
      >
        <p className="sr-only">
          Conceptual diagram: payment lifecycle states Pending, Paid, and Confirmed with an Expired
          branch; webhook path from event through signed POST, verification, and idempotent apply;
          merchant review checkpoints from intake through approval.
        </p>
        <div aria-hidden="true" className="space-y-0">
          <div className="hero-instrument-block">
            <p className="home-hero-op-label mb-3 font-mono text-[10px] uppercase tracking-[0.16em]">
              Lifecycle lane
            </p>
            <LifecycleLaneInstrument compact animate interactive={false} />
          </div>
          <div className="hero-instrument-block border-t border-border-subtle/80 pt-5">
            <p className="home-hero-op-label mb-3 font-mono text-[10px] uppercase tracking-[0.16em]">
              Webhook flow
            </p>
            <WebhookPropagationStrip animate interactive={false} />
          </div>
          <div className="hero-instrument-block border-t border-border-subtle/80 pt-5">
            <p className="home-hero-op-label mb-3 font-mono text-[10px] uppercase tracking-[0.16em]">
              Merchant review
            </p>
            <ol className="flex flex-wrap gap-2.5 list-none p-0 m-0">
              {reviewCheckpoints.map((step, i) => (
                <li
                  key={step}
                  className="flex items-center gap-2 rounded-md border border-[rgb(var(--token-accent-rgb)/0.22)] bg-[rgb(8_14_22/0.85)] px-2.5 py-1.5 text-[10px] font-medium text-primary shadow-[0_0_12px_rgb(var(--token-accent-rgb)/0.08)]"
                >
                  <span className="font-mono text-[9px] text-accent/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </VerificationFramePanel>
    </DiagramReveal>
  );
}
