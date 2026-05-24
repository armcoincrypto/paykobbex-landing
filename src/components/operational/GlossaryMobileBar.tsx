import { Link } from "@/components/primitives/link";
import { GlossaryTermJump } from "@/components/operational/GlossaryTermJump";
import { GLOSSARY_GROUPS } from "@/lib/glossary-terms";

/** Sticky mobile group jump + term select for long glossary scroll. */
export function GlossaryMobileBar() {
  return (
    <div className="ops-glossary-mobile-bar lg:hidden">
      <nav aria-label="Jump to glossary section">
        <ul className="ops-glossary-mobile-bar__groups list-none p-0 m-0">
          {GLOSSARY_GROUPS.map((group) => (
            <li key={group.id}>
              <Link href={`#glossary-${group.id}`} className="no-underline">
                {group.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <GlossaryTermJump />
    </div>
  );
}
