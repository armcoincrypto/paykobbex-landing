"use client";

import { DiagramReveal } from "@/components/diagrams/DiagramReveal";
import { LifecycleLaneInstrument } from "@/components/proof/LifecycleLaneInstrument";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { WebhookPropagationStrip } from "@/components/proof/WebhookPropagationStrip";
import { cn } from "@/lib/cn";

const reviewCheckpoints = [
  { title: "Intake", telemetry: "POLICY", tone: "policy" as const },
  { title: "Qualification", telemetry: "REVIEWED", tone: "policy" as const },
  { title: "Technical", telemetry: "SERVER-SIDE", tone: "signal" as const },
  { title: "Approval", telemetry: "REVIEWED", tone: "verified" as const },
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
        className="ops-instrument-surface hero-instrument-surface hero-instrument-console ops-telemetry-surface"
      >
        <p className="sr-only">
          Conceptual diagram: payment lifecycle states Pending, Paid, and Confirmed with an Expired
          branch; webhook path from event through signed POST, verification, and idempotent apply;
          merchant review checkpoints from intake through approval.
        </p>
        <div aria-hidden="true" className="space-y-0">
          <div className="hero-instrument-block">
            <div className="ops-telemetry-bar mb-3 !border-b-0 pb-0">
              <span className="home-hero-op-label font-mono text-[10px] uppercase tracking-[0.16em]">
                Lifecycle lane
              </span>
              <span className="ops-telemetry-chip ops-telemetry-chip--policy">
                <span className="ops-telemetry-led ops-telemetry-led--policy" />
                POLICY
              </span>
            </div>
            <LifecycleLaneInstrument compact animate interactive={false} showTelemetry={false} />
          </div>
          <div className="hero-instrument-block border-t border-border-subtle/80 pt-5">
            <div className="ops-telemetry-bar mb-3 !border-b-0 pb-0">
              <span className="home-hero-op-label font-mono text-[10px] uppercase tracking-[0.16em]">
                Webhook flow
              </span>
              <span className="ops-telemetry-chip ops-telemetry-chip--signal">
                <span className="ops-telemetry-led ops-telemetry-led--signal" />
                SIGNED
              </span>
            </div>
            <WebhookPropagationStrip animate interactive={false} showTelemetry={false} />
          </div>
          <div className="hero-instrument-block border-t border-border-subtle/80 pt-5">
            <div className="ops-telemetry-bar mb-3 !border-b-0 pb-0">
              <span className="home-hero-op-label font-mono text-[10px] uppercase tracking-[0.16em]">
                Merchant review
              </span>
              <span className="ops-telemetry-chip ops-telemetry-chip--verified">
                <span className="ops-telemetry-led ops-telemetry-led--verified" />
                REVIEWED
              </span>
            </div>
            <ol className="flex flex-wrap gap-2.5 list-none p-0 m-0">
              {reviewCheckpoints.map((step, i) => (
                <li
                  key={step.title}
                  className="flex flex-col items-start gap-1 rounded-md border border-[rgb(var(--token-accent-rgb)/0.22)] bg-[rgb(8_14_22/0.85)] px-2.5 py-1.5 shadow-[0_0_12px_rgb(var(--token-accent-rgb)/0.08)]"
                >
                  <span className="flex items-center gap-2 text-[10px] font-medium text-primary">
                    <span className="font-mono text-[9px] text-accent/90">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {step.title}
                  </span>
                  <span className={cn("ops-telemetry-chip", `ops-telemetry-chip--${step.tone}`)}>
                    <span className={cn("ops-telemetry-led", `ops-telemetry-led--${step.tone}`)} />
                    {step.telemetry}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </VerificationFramePanel>
    </DiagramReveal>
  );
}
