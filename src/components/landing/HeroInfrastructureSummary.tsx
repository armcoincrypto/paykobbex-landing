import { cn } from "@/lib/cn";

const signals = [
  {
    label: "Signed webhooks",
    note: "Server-side verification on raw bytes",
  },
  {
    label: "Explicit payment lifecycle",
    note: "Paid and Confirmed are distinct",
  },
  {
    label: "Merchant approval controls",
    note: "Production access is reviewed",
  },
  {
    label: "Verification-first rails",
    note: "Selected rails where enabled",
  },
] as const;

const flowSteps = ["Pending", "Paid", "Confirmed"] as const;

/**
 * Homepage hero — compact infrastructure summary (not a live console).
 */
export function HeroInfrastructureSummary({ className }: { className?: string }) {
  return (
    <aside className={cn("home-hero-summary", className)} aria-labelledby="hero-summary-heading">
      <p className="sr-only">
        Conceptual overview: payment lifecycle states Pending, Paid, and Confirmed; signed
        webhooks verified server-side; merchant approval before production access; verification-first
        rails where enabled. Not live operational data.
      </p>

      <div className="home-hero-summary-card">
        <p
          id="hero-summary-heading"
          className="home-hero-summary-eyebrow font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted"
        >
          Infrastructure summary
        </p>

        <ul
          className="home-hero-summary-signals mt-5 list-none p-0 m-0"
          aria-label="Infrastructure signals"
        >
          {signals.map((signal) => (
            <li key={signal.label} className="home-hero-summary-signal">
              <span className="home-hero-summary-signal-dot" aria-hidden="true" />
              <span className="home-hero-summary-signal-body">
                <span className="home-hero-summary-signal-label">{signal.label}</span>
                <span className="home-hero-summary-signal-note">{signal.note}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="home-hero-summary-flow" aria-label="Lifecycle flow (conceptual)">
          <ol className="home-hero-summary-flow-steps list-none p-0 m-0">
            {flowSteps.map((step, index) => (
              <li key={step} className="home-hero-summary-flow-step">
                {index > 0 ? (
                  <span className="home-hero-summary-flow-connector" aria-hidden="true" />
                ) : null}
                <span className="home-hero-summary-flow-dot" aria-hidden="true" />
                <span className="home-hero-summary-flow-label">{step}</span>
              </li>
            ))}
          </ol>
        </div>

        <p className="home-hero-summary-footer mt-5 text-[11px] leading-relaxed text-muted/70">
          Conceptual overview — not live operational data.
        </p>
      </div>
    </aside>
  );
}
