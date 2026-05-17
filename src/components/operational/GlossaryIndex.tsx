import { Link } from "@/components/primitives/link";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { GLOSSARY_GROUPS } from "@/lib/glossary-terms";

/** Semantic index for operational terminology navigation. */
export function GlossaryIndex() {
  return (
    <VerificationFramePanel label="Terminology index" sublabel="Semantic groups" className="ops-glossary-index">
      <nav aria-label="Glossary groups">
        <ul className="space-y-4">
          {GLOSSARY_GROUPS.map((group) => (
            <li key={group.id}>
              <Link
                href={`#glossary-${group.id}`}
                className="block font-medium text-primary no-underline hover:text-accent"
              >
                {group.label}
              </Link>
              <ul className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted">
                {group.termIds.map((id) => (
                  <li key={id}>
                    <Link href={`#${id}`} className="font-mono text-muted hover:text-primary" muted>
                      {id}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </VerificationFramePanel>
  );
}
