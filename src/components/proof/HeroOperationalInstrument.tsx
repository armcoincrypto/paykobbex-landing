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
    <DiagramReveal className={cn("w-full", className)}>
      <VerificationFramePanel
        label="Operational sequence"
        sublabel="Conceptual instrumentation — not live data"
      >
        <p className="sr-only">
          Conceptual diagram: payment lifecycle states Pending, Paid, and Confirmed with an Expired
          branch; webhook path from event through signed POST, verification, and idempotent apply;
          merchant review checkpoints from intake through approval.
        </p>
        <div aria-hidden="true" className="space-y-5">
          <div>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Lifecycle lane
            </p>
            <LifecycleLaneInstrument compact animate={false} />
          </div>
          <div className="border-t border-border-subtle/80 pt-4">
            <p className="mb-2.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Webhook flow
            </p>
            <WebhookPropagationStrip />
          </div>
          <div className="border-t border-border-subtle/80 pt-4">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Merchant review
            </p>
            <ol className="flex flex-wrap gap-2 list-none p-0 m-0">
              {reviewCheckpoints.map((step, i) => (
                <li
                  key={step}
                  className="flex items-center gap-2 rounded-md border border-border-subtle/90 bg-canvas/60 px-2 py-1 text-[10px] font-medium text-primary"
                >
                  <span className="font-mono text-[9px] text-accent/80">{String(i + 1).padStart(2, "0")}</span>
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
