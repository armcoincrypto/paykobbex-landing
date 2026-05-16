import { Card } from "@/components/primitives/Card";
import { Link } from "@/components/primitives/link";

export function GuideRelatedLinks() {
  return (
    <Card className="border-border-subtle/90 bg-surface-elevated/60">
      <h2 className="text-h2 font-semibold text-primary">Related on this site</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
        <li>
          <Link href="/docs">
            Integration docs
          </Link>{" "}
          (overview, diagrams, glossary excerpt)
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
          for environment-specific materials and procurement questions
        </li>
        <li>
          <Link href="/guides">All guides</Link>
        </li>
      </ul>
    </Card>
  );
}
