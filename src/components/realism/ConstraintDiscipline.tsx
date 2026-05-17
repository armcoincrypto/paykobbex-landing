import { CONSTRAINT_PRINCIPLES } from "@/lib/operational-realism";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";

/** Trust through constraints — intelligent boundaries, not apologies. */
export function ConstraintDiscipline({ className }: { className?: string }) {
  return (
    <VerificationFramePanel
      label="Operational constraints"
      sublabel="Why they exist"
      className={className}
    >
      <ul className="space-y-4">
        {CONSTRAINT_PRINCIPLES.map((c) => (
          <li key={c.title} className="text-sm leading-relaxed text-muted">
            <strong className="text-primary">{c.title}</strong>
            <span className="text-muted"> — {c.why}</span>
          </li>
        ))}
      </ul>
    </VerificationFramePanel>
  );
}
