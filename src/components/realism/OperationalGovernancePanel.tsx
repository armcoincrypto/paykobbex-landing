import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { INSTITUTIONAL_GOVERNANCE } from "@/lib/operational-realism";

/** Institutional governance callout — procedural maturity without metrics theater. */
export function OperationalGovernancePanel({
  className,
  limit = 6,
}: {
  className?: string;
  limit?: number;
}) {
  const items = INSTITUTIONAL_GOVERNANCE.slice(0, limit);

  return (
    <VerificationFramePanel
      label="Operational governance"
      sublabel="Ownership and process"
      className={className}
    >
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.title} className="text-sm leading-relaxed text-muted">
            <strong className="text-primary">{item.title}.</strong> {item.body}
          </li>
        ))}
      </ul>
    </VerificationFramePanel>
  );
}
