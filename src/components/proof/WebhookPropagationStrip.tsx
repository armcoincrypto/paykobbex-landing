import { cn } from "@/lib/cn";

const steps = [
  { title: "Event", detail: "Lifecycle transition" },
  { title: "POST", detail: "Signed body" },
  { title: "Verify", detail: "Server-side" },
  { title: "Apply", detail: "Idempotent" },
] as const;

/** Decorative webhook sequence ribbon — meaning duplicated in surrounding copy. */
export function WebhookPropagationStrip({ className }: { className?: string }) {
  return (
    <div className={cn(className)} aria-hidden="true">
      <div className="webhook-ribbon">
        {steps.map((step, i) => (
          <div key={step.title} className="webhook-ribbon-step">
            {i < steps.length - 1 ? <span className="webhook-ribbon-line" /> : null}
            <strong>{step.title}</strong>
            {step.detail}
          </div>
        ))}
      </div>
    </div>
  );
}
