import { DiagramFrame } from "@/components/diagrams/DiagramFrame";
import { DiagramReveal } from "@/components/diagrams/DiagramReveal";
import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";
import { cn } from "@/lib/cn";

/** Highlights secret boundary for webhook verification (illustrative, not a threat model). */
export function VerificationBoundaryDiagram({ className }: { className?: string }) {
  return (
    <DiagramReveal className={cn(className)}>
      <div className="space-y-4">
        <div>
          <h2 id="security-webhook-verification-heading" className="text-h2 font-semibold text-primary">
            Webhook verification boundary
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The signature proves integrity and authenticity of the webhook body to{" "}
            <strong className="text-primary">your verifier</strong>. The shared secret must live in
            configuration your application reads server-side—never in frontends, public repos, or
            support threads.
          </p>
        </div>

        <DiagramFrame
          caption="Figure: where verification happens and where secrets must not appear."
          labelledBy="security-webhook-verification-heading"
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
            <FlowStep
              title="Inbound POST"
              subtitle="Raw body + signature headers"
            />
            <FlowArrow direction="right" />
            <FlowStep
              title="Merchant verifier"
              subtitle="Uses YOUR_WEBHOOK_SECRET from secure store"
            />
            <FlowArrow direction="right" />
            <FlowStep title="Internal update" subtitle="Idempotent order / ledger hooks" />
          </div>
          <div className="mx-auto mt-6 max-w-md rounded-lg border border-dashed border-border-strong/60 bg-canvas/40 px-4 py-3 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted sm:text-xs">
              Not here
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted sm:text-sm">
              Browser clients, mobile apps, and public static sites must{" "}
              <strong className="text-primary">not</strong> hold payment API keys or webhook secrets.
              Checkout UIs should call <em>your</em> backend, which then calls Kobbopay.
            </p>
          </div>
        </DiagramFrame>

        <p className="text-sm leading-relaxed text-muted">
          After verification succeeds, parse JSON and apply business rules. On failure, reject with
          <code className="font-mono text-xs text-primary"> 401</code> and investigate—do not echo
          secrets in logs.
        </p>
      </div>
    </DiagramReveal>
  );
}
