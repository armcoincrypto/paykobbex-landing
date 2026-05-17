"use client";

import { useId, useState } from "react";
import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";
import { CodeExampleTabs, type CodeExampleTab } from "@/components/operational/CodeExampleTabs";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { cn } from "@/lib/cn";

const STEP_IDS = ["event", "post", "verify", "persist"] as const;
type StepId = (typeof STEP_IDS)[number];

const STEP_LABELS: Record<StepId, string> = {
  event: "Event",
  post: "POST",
  verify: "Verify",
  persist: "Persist",
};

const STEP_SUBTITLES: Record<StepId, string> = {
  event: "Lifecycle transition",
  post: "Signed raw body",
  verify: "Server-side HMAC",
  persist: "Idempotent apply",
};

const STEP_EXPLANATIONS: Record<StepId, string> = {
  event:
    "Kobbopay emits a lifecycle transition for an authoritative payment object. Your systems should treat the webhook as a signal to reconcile — not as proof until verified.",
  post:
    "An HTTPS POST arrives at your ingress with a signature header and a raw byte body. Middleware must not rewrite the body before verification (no premature JSON parsing).",
  verify:
    "Compute the expected signature from YOUR_WEBHOOK_SECRET and the exact raw bytes received. Compare with a constant-time check after enforcing equal buffer lengths. Parse JSON only after verification succeeds.",
  persist:
    "Upsert internal state idempotently using stable identifiers when present (for example payment_id plus a derived transition key). Respond 2xx only after durable recording or safe queueing — retries are normal.",
};

const POST_CURL = `curl -sS -X POST "https://api.example.com/webhook/kobbopay" \\
  -H "Content-Type: application/json" \\
  -H "x-signature: SIGNATURE_FROM_HEADER" \\
  --data-binary @payload.json`;

const VERIFY_NODE = `// Express-style sketch: verify on raw bytes, then process.
import express from "express";
import crypto from "crypto";

const app = express();

app.post(
  "/webhook/kobbopay",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const rawBody = req.body as Buffer;
    const signature = String(req.header("x-signature") ?? "");
    const secret = "YOUR_WEBHOOK_SECRET"; // load from secure config — never commit

    const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
    // Production: length-check buffers before timingSafeEqual.
    const ok = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected));
    if (!ok) return res.status(401).end();

    // Parse JSON only after verification; upsert idempotently.
    res.status(200).end();
  },
);`;

const PERSIST_CHECKLIST = [
  "Derive a dedupe key: event id when present, otherwise payment_id + transition.",
  "Write to your database or queue before returning 2xx to the sender.",
  "Treat duplicate deliveries as expected — do not double-fulfill or double-post ledger entries.",
  "Log verification failures separately from business logic errors.",
];

function stepTabs(step: StepId): CodeExampleTab[] | null {
  if (step === "event") {
    return [
      {
        id: "checklist",
        label: "Checklist",
        checklist: [
          "Register a dedicated route with minimal middleware on the raw body path.",
          "Map external lifecycle enums to your internal order model after verification.",
          "Monitor for signature failures — they often indicate proxy or parsing mistakes.",
        ],
      },
    ];
  }
  if (step === "post") {
    return [
      { id: "curl", label: "curl", code: POST_CURL },
      {
        id: "checklist",
        label: "Checklist",
        checklist: [
          "Terminate TLS at infrastructure you control.",
          "Preserve raw bytes through your framework's body parser configuration.",
          "Never forward webhook secrets to browsers or third-party analytics.",
        ],
      },
    ];
  }
  if (step === "verify") {
    return [
      { id: "node", label: "Node.js", code: VERIFY_NODE },
      {
        id: "checklist",
        label: "Checklist",
        checklist: [
          "Verify before JSON.parse — parsing can change bytes used for signing.",
          "Use constant-time comparison after equal-length buffer checks.",
          "Load YOUR_WEBHOOK_SECRET from server-side secret management only.",
        ],
      },
    ];
  }
  return [
    {
      id: "checklist",
      label: "Checklist",
      checklist: PERSIST_CHECKLIST,
    },
    {
      id: "node",
      label: "Node.js",
      code: `// After verification — idempotent upsert (pattern only)
async function applyWebhookEvent(rawBody: Buffer) {
  const event = JSON.parse(rawBody.toString("utf8")); // only after verify
  const key = event.id ?? \`\${event.payment_id}:\${event.type}\`;
  await db.webhookEvents.upsert({ where: { key }, update: {}, create: { key, payload: event } });
}`,
    },
  ];
}

/** Step-driven webhook verification instrument — conceptual, not live data. */
export function WebhookVerificationExplorer({ className }: { className?: string }) {
  const baseId = useId();
  const [active, setActive] = useState<StepId>("event");
  const tabs = stepTabs(active);
  const defaultTab: CodeExampleTab["id"] =
    active === "verify" ? "node" : active === "post" ? "curl" : "checklist";

  return (
    <VerificationFramePanel
      label="Webhook verification explorer"
      sublabel="Conceptual — not live data"
      className={cn("mt-6", className)}
    >
      <p className="sr-only">
        Interactive conceptual walkthrough of signed webhook handling. Not a live integration or
        transaction feed.
      </p>

      <div
        role="tablist"
        aria-label="Webhook handling steps"
        className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-center sm:gap-1"
      >
        {STEP_IDS.map((stepId, i) => {
          const selected = stepId === active;
          return (
            <div key={stepId} className="flex flex-col items-center gap-2 sm:flex-row sm:items-center">
              <button
                type="button"
                role="tab"
                id={`${baseId}-step-${stepId}`}
                aria-selected={selected}
                aria-controls={`${baseId}-step-panel`}
                tabIndex={selected ? 0 : -1}
                aria-current={selected ? "step" : undefined}
                onClick={() => setActive(stepId)}
                onKeyDown={(e) => {
                  const idx = STEP_IDS.indexOf(stepId);
                  if (e.key === "ArrowRight" || e.key === "ArrowDown") {
                    e.preventDefault();
                    setActive(STEP_IDS[(idx + 1) % STEP_IDS.length]!);
                  }
                  if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                    e.preventDefault();
                    setActive(STEP_IDS[(idx - 1 + STEP_IDS.length) % STEP_IDS.length]!);
                  }
                }}
                className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                <FlowStep
                  title={STEP_LABELS[stepId]}
                  subtitle={STEP_SUBTITLES[stepId]}
                  className={cn(
                    "w-full min-w-[5.5rem] text-left sm:text-center motion-safe:transition-[border-color,box-shadow] motion-safe:duration-[var(--token-motion-hover)] motion-reduce:transition-none",
                    selected &&
                      "border-[rgb(var(--token-accent-rgb)/0.36)] bg-surface-elevated/90 shadow-[inset_0_1px_0_var(--token-glass-highlight),0_0_0_1px_rgb(var(--token-accent-rgb)/0.12)]",
                  )}
                />
              </button>
              {i < STEP_IDS.length - 1 ? (
                <>
                  <FlowArrow direction="down" className="sm:hidden" />
                  <FlowArrow direction="right" className="hidden sm:block" />
                </>
              ) : null}
            </div>
          );
        })}
      </div>

      <div
        id={`${baseId}-step-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-step-${active}`}
        className="mt-6 space-y-4 border-t border-border-subtle/80 pt-6"
      >
        <p
          className="text-sm leading-relaxed text-muted motion-safe:transition-opacity motion-safe:duration-[var(--token-motion-fast)] motion-reduce:transition-none"
          aria-live="polite"
        >
          <strong className="text-primary">{STEP_LABELS[active]}:</strong>{" "}
          {STEP_EXPLANATIONS[active]}
        </p>
        {tabs ? (
          <CodeExampleTabs key={active} tabs={tabs} defaultTab={defaultTab} />
        ) : null}
      </div>
    </VerificationFramePanel>
  );
}
