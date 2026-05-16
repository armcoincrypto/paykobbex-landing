import { DiagramFrame } from "@/components/diagrams/DiagramFrame";
import { DiagramReveal } from "@/components/diagrams/DiagramReveal";
import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";
import { cn } from "@/lib/cn";

export function ArchitectureDiagram({
  variant = "full",
  className,
  diagramLabelledBy,
}: {
  variant?: "full" | "compact";
  className?: string;
  /** Visible heading id (e.g. section `h2`) for diagram `aria-labelledby`. */
  diagramLabelledBy?: string;
}) {
  const compact = variant === "compact";

  return (
    <DiagramReveal className={cn(className)}>
      <div className="space-y-4">
        {!compact ? (
          <div>
            <h3 className="text-h3 font-semibold text-primary">Architecture (high level)</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Payers interact with your surfaces; payment authority and secrets stay on your servers.
              Kobbopay exposes a payment API and lifecycle signals—never a pattern where API keys ship
              inside browser bundles.
            </p>
          </div>
        ) : (
          <p className="text-sm text-muted">
            Money and secrets stay <strong className="text-primary">server-side</strong>; the browser
            talks only to your checkout and status surfaces.
          </p>
        )}

        <DiagramFrame
          caption="Figure: data flow from payer to rails and back to your systems (conceptual; not every deployment topology)."
          labelledBy={diagramLabelledBy}
        >
          <div
            className={cn(
              "mx-auto flex max-w-4xl items-stretch justify-center gap-1",
              compact ? "flex-col items-center" : "flex-col md:flex-row md:flex-wrap md:items-center",
            )}
          >
            <FlowStep title="Customer" subtitle={compact ? "Payer" : "Wallet / payer experience"} />
            <FlowArrow direction={compact ? "down" : "right"} />
            <FlowStep
              title="Merchant backend"
              subtitle={
                compact
                  ? "Checkout & APIs · keys here"
                  : "Checkout + server APIs · API keys never in the browser"
              }
            />
            <FlowArrow direction={compact ? "down" : "right"} />
            <FlowStep
              title="Kobbopay Payment API"
              subtitle={compact ? "Server-to-server" : "Create/read payments (server-to-server)"}
            />
            <FlowArrow direction={compact ? "down" : "right"} />
            <FlowStep
              title="On-chain rail"
              subtitle={compact ? "Selected rails" : "Enabled networks/assets for your merchant"}
            />
            <FlowArrow direction={compact ? "down" : "right"} />
            <FlowStep
              title="Lifecycle & webhooks"
              subtitle={compact ? "Kobbopay core" : "State transitions + signed callbacks"}
            />
            <FlowArrow direction={compact ? "down" : "right"} />
            <FlowStep
              title="Merchant backend & portal"
              subtitle={compact ? "Ops + reconciliation" : "Automation + https://merchant.kobbex.com"}
            />
          </div>
        </DiagramFrame>

        {!compact ? (
          <p className="text-sm leading-relaxed text-muted">
            Public marketing pages such as <strong className="text-primary">pay.kobbex.com</strong>{" "}
            describe the product. Day-to-day operations for approved merchants use{" "}
            <strong className="text-primary">merchant.kobbex.com</strong> alongside your own
            backends.
          </p>
        ) : null}
      </div>
    </DiagramReveal>
  );
}
