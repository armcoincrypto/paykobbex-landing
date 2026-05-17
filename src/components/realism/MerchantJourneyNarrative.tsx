import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import type { MerchantJourneyFlow } from "@/lib/operational-realism";

const SECTIONS: Array<{ key: keyof MerchantJourneyFlow; label: string }> = [
  { key: "goal", label: "Merchant goal" },
  { key: "integration", label: "Integration pattern" },
  { key: "lifecycle", label: "Lifecycle handling" },
  { key: "reconciliation", label: "Reconciliation flow" },
  { key: "webhooks", label: "Webhook handling" },
  { key: "finance", label: "Finance considerations" },
  { key: "support", label: "Support & escalation" },
];

/** Anonymized workflow narrative — illustrative, not a case study. */
export function MerchantJourneyNarrative({ flow }: { flow: MerchantJourneyFlow }) {
  return (
    <article
      id={flow.id}
      className="scroll-mt-28 border-t border-border-subtle/70 py-10 first:border-t-0 first:pt-0"
    >
      <p className="proof-workflow-index">{flow.id.replace(/-/g, " · ")}</p>
      <h2 className="mt-2 text-h2 font-semibold text-primary">{flow.title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{flow.summary}</p>
      <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
        {flow.disclaimer}
      </p>

      <VerificationFramePanel
        label="Workflow map"
        sublabel="Example operational flow"
        className="mt-6"
      >
        <dl className="space-y-4">
          {SECTIONS.map(({ key, label }) => (
            <div key={key}>
              <dt className="font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-muted">
                {label}
              </dt>
              <dd className="mt-1 text-sm leading-relaxed text-muted">{flow[key]}</dd>
            </div>
          ))}
        </dl>
      </VerificationFramePanel>
    </article>
  );
}
