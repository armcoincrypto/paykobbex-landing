import { StatePill } from "@/components/diagrams/StatePill";
import { cn } from "@/lib/cn";

const lifecyclePrimary = ["Pending", "Paid", "Confirmed"] as const;
const webhookSteps = ["Event", "POST", "Verify", "Apply"] as const;
const webhookSubtitles = [
  "Lifecycle transition",
  "Signed body",
  "Server-side",
  "Idempotent",
] as const;

function WebhookConnectorSvg({ segmentIndex }: { segmentIndex: number }) {
  return (
    <svg
      className="webhook-ribbon-connector"
      viewBox="0 0 48 8"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      <line
        className="webhook-ribbon-rail-depth"
        x1="0"
        y1="4"
        x2="48"
        y2="4"
        vectorEffect="non-scaling-stroke"
      />
      <line
        className="webhook-ribbon-rail-base"
        x1="0"
        y1="4"
        x2="48"
        y2="4"
        vectorEffect="non-scaling-stroke"
      />
      <line
        className={cn(
          "webhook-ribbon-rail-pulse",
          `webhook-ribbon-rail-pulse--seg-${segmentIndex}`,
        )}
        x1="0"
        y1="4"
        x2="48"
        y2="4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Static default lifecycle lane for homepage hero (no inspect hooks). */
export function HeroPreviewLifecycleLane({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "lifecycle-lane home-hero-preview-surface ops-route--settlement",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        className="lifecycle-lane-rail-svg"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="lifecycle-lane-rail-depth"
          d="M 6 7 H 94"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="lifecycle-lane-rail-base"
          d="M 6 7 H 94"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="lifecycle-lane-rail-pulse"
          d="M 6 7 H 94"
          vectorEffect="non-scaling-stroke"
        />
        <path
          className="lifecycle-lane-rail-branch"
          d="M 50 7 V 16"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <ol className="lifecycle-lane-nodes list-none p-0 m-0">
        {lifecyclePrimary.map((label) => (
          <li key={label} className="lifecycle-lane-node">
            <span className="lifecycle-lane-marker" />
            <StatePill label={label} className="scale-[0.92]" />
          </li>
        ))}
      </ol>

      <div className="lifecycle-lane-branch flex flex-wrap items-center gap-1.5">
        <span>Branch:</span>
        <StatePill label="Expired" className="inline-flex scale-[0.88]" />
        <span className="ops-telemetry-chip ops-telemetry-chip--policy">
          <span className="ops-telemetry-led ops-telemetry-led--policy" />
          POLICY
        </span>
      </div>
    </div>
  );
}

/** Static default webhook ribbon for homepage hero (no inspect hooks). */
export function HeroPreviewWebhookRibbon({ className }: { className?: string }) {
  return (
    <div
      className={cn("webhook-ribbon-wrap home-hero-preview-surface ops-route--verify", className)}
      aria-hidden="true"
    >
      <div className="webhook-ribbon">
        {webhookSteps.map((title, i) => (
          <div key={title} className="webhook-ribbon-step">
            {i < webhookSteps.length - 1 ? <WebhookConnectorSvg segmentIndex={i} /> : null}
            <strong>{title}</strong>
            {webhookSubtitles[i]}
          </div>
        ))}
      </div>
    </div>
  );
}
