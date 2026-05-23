import { ReviewPipelineInstrument } from "@/components/operational/ReviewPipelineInstrument";
import { SecurityBoundaryInstrument } from "@/components/operational/SecurityBoundaryInstrument";
import { ConfirmationDepthStack } from "@/components/proof/ConfirmationDepthStack";
import { LifecycleLaneInstrument } from "@/components/proof/LifecycleLaneInstrument";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { WebhookPropagationStrip } from "@/components/proof/WebhookPropagationStrip";
import type { GuideSlug } from "@/lib/guides-meta";
import { cn } from "@/lib/cn";

const INSTRUMENT_LABEL: Record<GuideSlug, { label: string; sublabel: string }> = {
  "payment-lifecycle": {
    label: "Lifecycle lane",
    sublabel: "Conceptual states — not live data",
  },
  "webhook-verification": {
    label: "Webhook propagation",
    sublabel: "Signed delivery sequence",
  },
  "reconciliation-and-confirmations": {
    label: "Confirmation depth",
    sublabel: "Settlement visibility",
  },
  "server-side-api-keys": {
    label: "Verification boundary",
    sublabel: "Where secrets must not appear",
  },
  "merchant-onboarding": {
    label: "Review pipeline",
    sublabel: "Access gating (conceptual)",
  },
  "reconciliation-checklist": {
    label: "Three-plane alignment",
    sublabel: "Matcher discipline (conceptual)",
  },
  "payment-lifecycle-decision-tree": {
    label: "Lifecycle checkpoints",
    sublabel: "Operator decision paths",
  },
  "merchant-integration-architecture": {
    label: "Integration layers",
    sublabel: "Server-side boundaries",
  },
  "treasury-recognition-flow": {
    label: "Recognition gates",
    sublabel: "Finance vs lifecycle",
  },
  "settlement-vs-payout": {
    label: "Settlement vs payout",
    sublabel: "Inbound vs outbound rails",
  },
  "webhook-replay-handling": {
    label: "Replay & ordering",
    sublabel: "At-least-once delivery",
  },
};

function GuideInstrumentVisual({ slug }: { slug: GuideSlug }) {
  if (
    slug === "payment-lifecycle" ||
    slug === "payment-lifecycle-decision-tree" ||
    slug === "settlement-vs-payout"
  ) {
    return <LifecycleLaneInstrument compact animate={false} />;
  }
  if (slug === "webhook-verification" || slug === "webhook-replay-handling") {
    return <WebhookPropagationStrip />;
  }
  if (
    slug === "reconciliation-and-confirmations" ||
    slug === "reconciliation-checklist" ||
    slug === "treasury-recognition-flow"
  ) {
    return <ConfirmationDepthStack />;
  }
  if (slug === "server-side-api-keys" || slug === "merchant-integration-architecture") {
    return <SecurityBoundaryInstrument />;
  }
  if (slug === "merchant-onboarding") {
    return <ReviewPipelineInstrument />;
  }
  return null;
}

/** One signature operational visual per guide — restrained, educational. */
export function GuideInstrument({
  slug,
  className,
  labelledBy,
}: {
  slug: GuideSlug;
  className?: string;
  labelledBy?: string;
}) {
  const meta = INSTRUMENT_LABEL[slug];

  return (
    <VerificationFramePanel
      label={meta.label}
      sublabel={meta.sublabel}
      className={cn("ops-guide-instrument ops-instrument-surface", className)}
      labelledBy={labelledBy}
    >
      <p className="sr-only">
        Conceptual operational diagram for this guide. Not live merchant data or metrics.
      </p>
      <div aria-hidden="true">
        <GuideInstrumentVisual slug={slug} />
      </div>
    </VerificationFramePanel>
  );
}
