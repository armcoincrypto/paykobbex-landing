import { DiagramFrame } from "@/components/diagrams/DiagramFrame";
import { DiagramReveal } from "@/components/diagrams/DiagramReveal";
import { FlowArrow } from "@/components/diagrams/FlowArrow";
import { FlowStep } from "@/components/diagrams/FlowStep";
import { cn } from "@/lib/cn";

const pipelineSteps = [
  {
    index: "01",
    title: "Inbound POST",
    subtitle: "Raw body + signature headers",
    tag: "INGRESS",
  },
  {
    index: "02",
    title: "Merchant verifier",
    subtitle: "Uses YOUR_WEBHOOK_SECRET from secure store",
    tag: "VERIFY",
  },
  {
    index: "03",
    title: "Internal update",
    subtitle: "Idempotent order / ledger hooks",
    tag: "APPLY",
  },
] as const;

/** Highlights secret boundary for webhook verification (illustrative, not a threat model). */
export function VerificationBoundaryDiagram({
  className,
  variant = "default",
  settle = true,
}: {
  className?: string;
  /** P18 — premium security boundary surface (homepage ops). */
  variant?: "default" | "premium";
  settle?: boolean;
}) {
  if (variant === "premium") {
    return (
      <section
        className={cn("verify-boundary verify-boundary--premium", className)}
        aria-labelledby="security-webhook-verification-heading"
      >
        <header className="verify-boundary__head">
          <span className="verify-boundary__system-index" aria-hidden="true">
            06
          </span>
          <div>
            <h2
              id="security-webhook-verification-heading"
              className="verify-boundary__title"
            >
              Webhook verification boundary
            </h2>
            <p className="verify-boundary__lead">
              The signature proves integrity and authenticity of the webhook body to{" "}
              <strong className="text-primary">your verifier</strong>. The shared secret must live in
              configuration your application reads server-side—never in frontends, public repos, or
              support threads.
            </p>
          </div>
        </header>

        <div className="verify-boundary__architecture">
          <section className="verify-boundary__zone verify-boundary__zone--safe">
            <header className="verify-boundary__zone-head">
              <span className="verify-boundary__zone-label">Server-side verification</span>
              <span className="verify-boundary__zone-meta">Trusted execution zone</span>
            </header>

            <svg
              className="verify-boundary__rail-svg"
              viewBox="0 0 100 8"
              preserveAspectRatio="none"
              aria-hidden="true"
              focusable="false"
            >
              <path
                className="verify-boundary__rail-base"
                d="M 4 4 H 96"
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            <ol className="verify-boundary__pipeline list-none p-0 m-0">
              {pipelineSteps.map((step, i) => (
                <li key={step.title} className="verify-boundary__step">
                  {i > 0 ? <span className="verify-boundary__connector" aria-hidden="true" /> : null}
                  <span className="verify-boundary__step-index">{step.index}</span>
                  <span className="verify-boundary__step-tag">{step.tag}</span>
                  <div className="verify-boundary__step-body">
                    <strong className="verify-boundary__step-title">{step.title}</strong>
                    <span className="verify-boundary__step-subtitle">{step.subtitle}</span>
                  </div>
                </li>
              ))}
            </ol>

            <div className="verify-boundary__secret-store" aria-hidden="true">
              <span className="verify-boundary__secret-led" />
              <span className="verify-boundary__secret-label">Secret storage boundary</span>
              <code className="verify-boundary__secret-code">YOUR_WEBHOOK_SECRET</code>
              <span className="verify-boundary__secret-meta">Secure store · server-side only</span>
            </div>
          </section>

          <aside className="verify-boundary__zone verify-boundary__zone--excluded">
            <header className="verify-boundary__zone-head">
              <span className="verify-boundary__zone-label verify-boundary__zone-label--warn">
                Not here
              </span>
              <span className="verify-boundary__zone-meta">Disallowed surface</span>
            </header>
            <div className="verify-boundary__excluded-body">
              <p>
                Browser clients, mobile apps, and public static sites must{" "}
                <strong className="text-primary">not</strong> hold payment API keys or webhook
                secrets. Checkout UIs should call <em>your</em> backend, which then calls Kobbopay.
              </p>
            </div>
            <ul className="verify-boundary__excluded-list" aria-hidden="true">
              <li>Browsers</li>
              <li>Mobile apps</li>
              <li>Public static sites</li>
            </ul>
          </aside>
        </div>

        <p className="verify-boundary__caption">
          Figure: where verification happens and where secrets must not appear.
        </p>

        <footer className="verify-boundary__footer">
          <span className="verify-boundary__footer-led" aria-hidden="true" />
          <p className="verify-boundary__footer-copy">
            After verification succeeds, parse JSON and apply business rules. On failure, reject with
            <code className="verify-boundary__code"> 401</code> and investigate—do not echo secrets
            in logs.
          </p>
        </footer>
      </section>
    );
  }

  return (
    <DiagramReveal className={cn(className)} settle={settle}>
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
            <FlowStep title="Inbound POST" subtitle="Raw body + signature headers" />
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
