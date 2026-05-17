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
};

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
        {slug === "payment-lifecycle" ? <LifecycleLaneInstrument compact animate={false} /> : null}
        {slug === "webhook-verification" ? <WebhookPropagationStrip /> : null}
        {slug === "reconciliation-and-confirmations" ? <ConfirmationDepthStack /> : null}
        {slug === "server-side-api-keys" ? <SecurityBoundaryInstrument /> : null}
        {slug === "merchant-onboarding" ? <ReviewPipelineInstrument /> : null}
      </div>
    </VerificationFramePanel>
  );
}
