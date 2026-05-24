import { Link } from "@/components/primitives/link";
import { SUPPORT_MATURITY_SIGNALS } from "@/lib/operational-realism";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";

/** Subtle support/operations maturity — no SLA theater. */
export function SupportOperationsCue({ className }: { className?: string }) {
  return (
    <VerificationFramePanel
      label="How operations run"
      sublabel="Behind the integration"
      className={className}
    >
      <ul className="space-y-3">
        {SUPPORT_MATURITY_SIGNALS.map((s) => (
          <li key={s.title} className="text-sm leading-relaxed text-muted">
            <strong className="text-primary">{s.title}.</strong> {s.body}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">
        Full walkthroughs: <Link href="/operations">/operations</Link> ·{" "}
        <Link href="/request-access" conv="request_access_click">
          Request access
        </Link>
      </p>
    </VerificationFramePanel>
  );
}
