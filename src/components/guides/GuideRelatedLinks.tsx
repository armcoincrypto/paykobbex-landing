import { Link } from "@/components/primitives/link";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";

export function GuideRelatedLinks() {
  return (
    <VerificationFramePanel label="Related" sublabel="On this site" className="ops-related-links">
      <h2 className="sr-only">Related on this site</h2>
      <ul className="space-y-2 text-sm text-muted">
        <li>
          <Link href="/docs">Integration docs</Link> (overview, diagrams, glossary excerpt)
        </li>
        <li>
          <Link href="/glossary">Canonical glossary</Link> for stable definitions and anchors
        </li>
        <li>
          <Link href="/security">Security practices</Link> for verification boundaries and secret handling
        </li>
        <li>
          <Link href="/contact#merchant-intake" conv="request_access_click">
            Request access
          </Link>{" "}
          for environment-specific materials
        </li>
        <li>
          <Link href="/guides">All guides</Link>
        </li>
      </ul>
    </VerificationFramePanel>
  );
}
