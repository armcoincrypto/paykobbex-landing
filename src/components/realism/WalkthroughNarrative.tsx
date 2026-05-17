import { GuideInstrument } from "@/components/operational/GuideInstrument";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import type { OperationalWalkthrough } from "@/lib/operational-realism";
import type { GuideSlug } from "@/lib/guides-meta";
import { OperationalCheckpointStrip } from "@/components/realism/OperationalCheckpointStrip";

const INSTRUMENT_TO_GUIDE: Partial<Record<OperationalWalkthrough["instrument"], GuideSlug>> = {
  lifecycle: "payment-lifecycle",
  webhook: "webhook-verification",
  reconciliation: "reconciliation-and-confirmations",
  review: "merchant-onboarding",
};

/** Single operational walkthrough — narrative + optional instrument reuse. */
export function WalkthroughNarrative({ walkthrough }: { walkthrough: OperationalWalkthrough }) {
  const guideSlug = INSTRUMENT_TO_GUIDE[walkthrough.instrument];
  const checkpoints = walkthrough.phases.map((p) => p.label);

  return (
    <article
      id={walkthrough.id}
      className="scroll-mt-28 border-t border-border-subtle/70 py-10 first:border-t-0 first:pt-0"
    >
      <p className="proof-workflow-index">{walkthrough.index}</p>
      <h2 className="mt-2 text-h2 font-semibold text-primary">{walkthrough.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{walkthrough.summary}</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {walkthrough.disclaimer}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,300px)] lg:items-start">
        <div className="space-y-4">
          <OperationalCheckpointStrip checkpoints={checkpoints} />
          <ol className="space-y-3 list-none p-0 m-0">
            {walkthrough.phases.map((phase, i) => (
              <li key={phase.label} className="proof-editorial-rail pl-4">
                <p className="font-mono text-[10px] text-accent/80">
                  {String(i + 1).padStart(2, "0")} · {phase.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{phase.detail}</p>
              </li>
            ))}
          </ol>
        </div>
        {guideSlug ? (
          <GuideInstrument slug={guideSlug} className="lg:mt-0" />
        ) : (
          <VerificationFramePanel label="Operational sequence" sublabel="Conceptual">
            <OperationalCheckpointStrip checkpoints={checkpoints} />
          </VerificationFramePanel>
        )}
      </div>
    </article>
  );
}
