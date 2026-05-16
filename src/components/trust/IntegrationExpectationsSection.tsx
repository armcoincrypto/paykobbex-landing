import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";

const expectations: Array<{ title: string; body: string }> = [
  {
    title: "Server-to-server integrations",
    body: "Production traffic is designed around your backend calling Kobbopay and consuming webhooks—not browser-held secrets or public clients “calling the chain” directly.",
  },
  {
    title: "Merchants own secret management",
    body: "You control rotation, storage, access reviews, and blast radius. Kobbopay does not replace your vault, CI/CD rules, or incident response program.",
  },
  {
    title: "Reconciliation responsibility",
    body: "You map lifecycle states to internal orders, entitlements, and accounting. Exact enums and edge transitions are deployment-specific; treat marketing copy as conceptual.",
  },
  {
    title: "Webhook retries and idempotency",
    body: "Treat duplicate deliveries as normal. Verify first, then upsert idempotently using stable identifiers when available (for example payment_id plus a derived transition key).",
  },
  {
    title: "Test environments (when issued)",
    body: "Non-production hosts, headers, and signing details are provided as part of onboarding materials for approved merchants—availability and shape depend on your rollout plan.",
  },
];

/** What serious integrations assume—before day-one production traffic. */
export function IntegrationExpectationsSection() {
  return (
    <Section id="integration-expectations" tone="default">
      <Container>
        <h2 className="text-h2 font-semibold text-primary">Integration expectations</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-body">
          These expectations reduce surprises during onboarding and production cutovers. For
          authoritative behavior, your merchant agreement and environment configuration remain the
          source of truth.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {expectations.map((row) => (
            <Card key={row.title} interactive>
              <h3 className="text-h3 font-semibold text-primary">{row.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{row.body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Start here:{" "}
          <Link href="/docs">
            /docs
          </Link>
          {" · "}
          <Link href="/guides">/guides</Link>
          {" · "}
          <Link href="/developers">
            Developers
          </Link>
          {" · "}
          <Link href="/docs#retry-idempotency">
            Retry &amp; idempotency
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
