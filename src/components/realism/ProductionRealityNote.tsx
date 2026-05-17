import { Link } from "@/components/primitives/link";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { PRODUCTION_REALITIES } from "@/lib/operational-realism";

/** Compact production-oriented callout for docs/guides. */
export function ProductionRealityNote({ compact = false }: { compact?: boolean }) {
  const items = compact ? PRODUCTION_REALITIES.slice(0, 3) : PRODUCTION_REALITIES;

  return (
    <VerificationFramePanel
      label="Operational norms"
      sublabel="Production-oriented"
      className="mt-8"
    >
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.title} className="text-sm leading-relaxed text-muted">
            <strong className="text-primary">{item.title}.</strong> {item.body}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs text-muted">
        Walkthroughs: <Link href="/operations">/operations</Link>
      </p>
    </VerificationFramePanel>
  );
}
