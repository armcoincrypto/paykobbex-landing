import { Card } from "@/components/primitives/Card";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";

const principles: Array<{ title: string; body: string }> = [
  {
    title: "Explicit lifecycle semantics",
    body: "Payments are modeled as machine-readable states (for example Pending, Paid, Confirmed, Expired) so engineering, finance, and support can align on meaning—without collapsing “detected” into “final” by accident.",
  },
  {
    title: "Signed webhook verification",
    body: "Lifecycle transitions can be delivered as signed HTTPS callbacks. Your backend verifies authenticity over raw body bytes before mutating internal state.",
  },
  {
    title: "Merchant approval model",
    body: "Access is gated intentionally: environment setup and rails are enabled only after merchant approval and configuration—not anonymous self-serve keys on day one.",
  },
  {
    title: "Selected rails per environment",
    body: "Networks and assets are enabled per merchant configuration. Unsupported combinations should fail fast at creation time where possible.",
  },
  {
    title: "Withdrawal operational controls",
    body: "Merchants initiate withdrawal requests. Execution is subject to operational controls and configuration—not a promise of universal instant settlement.",
  },
  {
    title: "No browser API key usage",
    body: "Payment API keys belong on your servers. Checkout and status surfaces should call your backend, which integrates server-to-server with Kobbopay.",
  },
];

/** How Kobbopay reasons about operations, risk, and integration—without certification theater. */
export function OperationalPrinciplesSection() {
  return (
    <Section id="operational-principles" tone="muted">
      <Container>
        <h2 className="text-h2 font-semibold text-primary">Operational principles</h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-body">
          Kobbopay is built for teams that need predictable reconciliation and honest boundaries. This
          is how we think about shipping money movement in software—not a substitute for your legal,
          treasury, or security program.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {principles.map((p) => (
            <Card key={p.title} interactive>
              <h3 className="text-h3 font-semibold text-primary">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.body}</p>
            </Card>
          ))}
        </div>
        <p className="mt-8 text-sm text-muted">
          Deeper technical overview:{" "}
          <Link href="/docs">
            Integration docs
          </Link>
          {" · "}
          <Link href="/guides">Operational guides</Link>
          {" · "}
          <Link href="/glossary">Glossary</Link>
          {" · "}
          <Link href="/security">Security practices</Link>
          {" · "}
          <Link href="/contact#merchant-intake" conv="request_access_click">
            Request access
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
