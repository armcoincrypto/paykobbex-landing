import { Link } from "@/components/primitives/link";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";

export type DocNavItem = { href: string; label: string };

/** Sticky documentation index — operational navigation, not a generic card. */
export function OperationalDocNav({ items }: { items: DocNavItem[] }) {
  return (
    <VerificationFramePanel label="Documentation index" sublabel="On this page" className="ops-doc-nav">
      <nav aria-label="Documentation sections">
        <ul className="space-y-1.5 text-sm">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-md px-2.5 py-2 text-muted no-underline decoration-transparent hover:bg-canvas/50 hover:text-primary hover:decoration-transparent"
                muted
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </VerificationFramePanel>
  );
}
