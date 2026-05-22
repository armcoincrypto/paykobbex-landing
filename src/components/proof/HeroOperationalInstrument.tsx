"use client";

import { DiagramReveal } from "@/components/diagrams/DiagramReveal";
import { LifecycleLaneInstrument } from "@/components/proof/LifecycleLaneInstrument";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { WebhookPropagationStrip } from "@/components/proof/WebhookPropagationStrip";
import {
  lifecycleInspectNodes,
  reviewInspectNodes,
  webhookInspectNodes,
} from "@/lib/ops-inspection";
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
        className="ops-instrument-surface hero-instrument-surface hero-instrument-console ops-telemetry-surface ops-console-surface ops-console-deep"
      >
        <p className="sr-only">
          Conceptual diagram: payment lifecycle states Pending, Paid, and Confirmed with an Expired
          branch; webhook path from event through signed POST, verification, and idempotent apply;
          merchant review checkpoints from intake through approval.
        </p>
        <div aria-hidden="true" className="ops-console-stack">
          <section className="ops-console-module ops-route--settlement">
            <header className="ops-console-module__header">
              <span className="ops-console-module__title">Lifecycle lane</span>
              <span className="ops-console-routing">STATE · CONFIGURED</span>
            </header>
            <div className="ops-console-module__telemetry">
              <div className="ops-density-strip" aria-hidden="true">
                <span className="ops-density-line">STATE · POLICY GATED</span>
              </div>
              <span className="ops-telemetry-chip ops-telemetry-chip--policy">
                <span className="ops-telemetry-led ops-telemetry-led--policy" />
                POLICY
              </span>
              <span className="ops-telemetry-chip ops-telemetry-chip--signal">
                <span className="ops-telemetry-led ops-telemetry-led--signal" />
                FLOW
              </span>
            </div>
            <div className="ops-console-module__execution ops-console-module__execution--primary">
              <div className="ops-console-well ops-envelope">
                <LifecycleLaneInstrument compact animate interactive={false} showTelemetry={false} />
              </div>
            </div>
            <footer className="ops-console-module__meta">
              <span className="ops-console-meta-tag">GATE</span>
              <span className="ops-console-meta-tag">STATE</span>
              <span>Explicit transitions · conceptual</span>
            </footer>
            <p className="ops-narrative-static" aria-hidden="true">
              {lifecycleInspectNodes[0].purpose}
            </p>
          </section>

          <section className="ops-console-module ops-route--verify">
            <header className="ops-console-module__header">
              <span className="ops-console-module__title">Webhook flow</span>
              <span className="ops-console-routing">PIPELINE · SIGNED</span>
            </header>
            <div className="ops-console-module__telemetry">
              <span className="ops-telemetry-chip ops-telemetry-chip--signal">
                <span className="ops-telemetry-led ops-telemetry-led--signal" />
                SIGNED
              </span>
              <span className="ops-telemetry-chip ops-telemetry-chip--verified">
                <span className="ops-telemetry-led ops-telemetry-led--verified" />
                VERIFIED
              </span>
            </div>
            <div className="ops-console-module__execution ops-console-module__execution--primary">
              <div className="ops-console-well ops-console-well--pipeline">
                <WebhookPropagationStrip animate interactive={false} showTelemetry={false} />
              </div>
            </div>
            <footer className="ops-console-module__meta">
              <span className="ops-console-meta-tag">SERVER-SIDE</span>
              <span className="ops-console-meta-tag">IDEMPOTENT</span>
              <span>Verification boundary · conceptual</span>
            </footer>
            <p className="ops-narrative-static" aria-hidden="true">
              {webhookInspectNodes[2].purpose}
            </p>
          </section>

          <section className="ops-console-module ops-route--ingress">
            <header className="ops-console-module__header">
              <span className="ops-console-module__title">Merchant review</span>
              <span className="ops-console-routing">REVIEW · GATE</span>
            </header>
            <div className="ops-console-module__telemetry">
              <span className="ops-telemetry-chip ops-telemetry-chip--verified">
                <span className="ops-telemetry-led ops-telemetry-led--verified" />
                REVIEWED
              </span>
              <span className="ops-telemetry-chip ops-telemetry-chip--policy">
                <span className="ops-telemetry-led ops-telemetry-led--policy" />
                POLICY
              </span>
            </div>
            <div className="ops-console-module__execution ops-console-module__execution--primary">
              <div className="ops-console-well">
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
            <footer className="ops-console-module__meta">
              <span className="ops-console-meta-tag">GATE</span>
              <span className="ops-console-meta-tag">REVIEW</span>
              <span>Controlled approval flow · conceptual</span>
            </footer>
            <p className="ops-narrative-static" aria-hidden="true">
              {reviewInspectNodes[3].purpose}
            </p>
          </section>
        </div>
      </VerificationFramePanel>
    </DiagramReveal>
  );
}
