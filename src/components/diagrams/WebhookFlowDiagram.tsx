import { DiagramFrame } from "@/components/diagrams/DiagramFrame";
import { DiagramReveal } from "@/components/diagrams/DiagramReveal";
import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";
import { cn } from "@/lib/cn";

export function WebhookFlowDiagram({
  variant = "full",
  className,
  diagramLabelledBy,
}: {
  variant?: "full" | "compact";
  className?: string;
  diagramLabelledBy?: string;
}) {
  const compact = variant === "compact";

  return (
    <DiagramReveal className={cn(className)}>
      <div className="space-y-4">
        {!compact ? (
          <div>
            <h3 className="text-h3 font-semibold text-primary">Webhook delivery (conceptual)</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Kobbopay emits lifecycle events as signed HTTPS callbacks. Your backend verifies the
              signature on raw bytes, then updates internal systems using idempotent upserts so
              retries are safe.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Signed callbacks: verify on raw bytes, then update internal state idempotently—retries are
            normal.
          </p>
        )}

        <DiagramFrame
          caption="Figure: signed webhook path from event emission to durable merchant-side processing."
          labelledBy={diagramLabelledBy}
        >
          <div
            className={cn(
              "mx-auto flex max-w-3xl items-stretch justify-center gap-1",
              compact ? "flex-col items-center" : "flex-col flex-wrap sm:flex-row sm:items-center",
            )}
          >
            <FlowStep
              title="Kobbopay event"
              subtitle={compact ? "Lifecycle change" : "Lifecycle transition in product"}
            />
            <FlowArrow direction={compact ? "down" : "right"} />
            <FlowStep
              title="Signed POST"
              subtitle={compact ? "HTTPS + body" : "HTTPS with signature over raw JSON body"}
            />
            <FlowArrow direction={compact ? "down" : "right"} />
            <FlowStep
              title="Verify signature"
              subtitle={compact ? "Server only" : "Merchant backend (never the browser)"}
            />
            <FlowArrow direction={compact ? "down" : "right"} />
            <FlowStep
              title="Update systems"
              subtitle={compact ? "Idempotent" : "Orders / ledger hooks (idempotent writes)"}
            />
          </div>
        </DiagramFrame>

        <p className="text-sm leading-relaxed text-muted">
          <strong className="text-primary">Retries:</strong> treat duplicate deliveries as expected.
          Deduplicate using a stable event identifier when available, otherwise{" "}
          <code className="font-mono text-xs text-primary">payment_id</code> plus a derived transition
          key from the payload.
        </p>
      </div>
    </DiagramReveal>
  );
}
