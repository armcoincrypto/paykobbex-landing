import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { ENVIRONMENT_REALITIES } from "@/lib/operational-realism";

/** Environment and rollout realism for docs/onboarding. */
export function EnvironmentRolloutNote({ className }: { className?: string }) {
  return (
    <VerificationFramePanel
      label="Environments and rollout"
      sublabel="Configuration discipline"
      className={className}
    >
      <ul className="space-y-3">
        {ENVIRONMENT_REALITIES.map((item) => (
          <li key={item.title} className="text-sm leading-relaxed text-muted">
            <strong className="text-primary">{item.title}.</strong> {item.body}
          </li>
        ))}
      </ul>
    </VerificationFramePanel>
  );
}
