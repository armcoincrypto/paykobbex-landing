import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";

/** Citation-friendly technical framing for CTOs and lead engineers. */
export function ForTechnicalTeamsSection() {
  return (
    <Section id="for-technical-teams" tone="muted">
      <Container className="max-w-3xl">
        <h2 className="text-h2 font-semibold text-primary">For technical teams</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-body">
          Kobbopay is designed around predictable integration mechanics: authoritative reads,
          event-driven updates, and conservative assumptions about retries and partial failures.
        </p>
        <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted sm:text-body">
          <li>
            <strong className="text-primary">Lifecycle visibility:</strong> model internal state on
            documented statuses for your deployment; avoid inferring semantics from informal “crypto
            paid” language.
          </li>
          <li>
            <strong className="text-primary">Webhook-first architecture:</strong> treat lifecycle
            transitions as signed events your services verify and apply idempotently.
          </li>
          <li>
            <strong className="text-primary">Idempotency expectations:</strong> deduplicate using
            stable identifiers when present; otherwise derive a safe transition key from payload
            fields you control.
          </li>
          <li>
            <strong className="text-primary">Integration overview:</strong> the public{" "}
            <Link href="/docs">
              /docs
            </Link>{" "}
            page is a CTO-friendly overview—not a full public API reference until published for your
            program.
          </li>
          <li>
            <strong className="text-primary">Operational predictability:</strong> approvals, rails,
            and controls exist to reduce unknown-unknowns in production money movement.
          </li>
        </ul>
        <p className="mt-8 text-sm text-muted">
          Hub: <Link href="/developers">
            Developers
          </Link>
          {" · "}
          <Link href="/guides">Guides</Link>
          {" · "}
          <Link href="/docs#glossary">
            Glossary
          </Link>
          {" · "}
          <Link href="/security">Security</Link>
          .
        </p>
      </Container>
    </Section>
  );
}
