import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";

/** Value narrative without testimonials, logos, or invented metrics. */
export function WhyTeamsChooseSection() {
  return (
    <Section id="why-teams-choose-kobbopay" tone="default">
      <Container className="max-w-3xl">
        <h2 className="text-h2 font-semibold text-primary">Why teams choose Kobbopay</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-body">
          Teams adopt infrastructure when the operational model matches how they ship software. We
          focus on clarity over hype: explicit states, verifiable webhooks, and conservative public
          positioning.
        </p>
        <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted sm:text-body">
          <li>
            <strong className="text-primary">Explicit lifecycle model</strong> so finance and
            engineering can agree on what “paid” means versus “confirmed” for your policies.
          </li>
          <li>
            <strong className="text-primary">Signed webhook approach</strong> that fits server-side
            verification and replay-safe consumers.
          </li>
          <li>
            <strong className="text-primary">Operational clarity</strong> around approvals, rails,
            and withdrawal requests—described as controls, not vague “instant everything” language.
          </li>
          <li>
            <strong className="text-primary">Selected rails</strong> enabled per environment rather
            than open-ended global coverage claims on a marketing site.
          </li>
          <li>
            <strong className="text-primary">Merchant portal</strong> for day-to-day visibility and
            configuration appropriate to your deployment.
          </li>
          <li>
            <strong className="text-primary">Conservative trust positioning:</strong> no fake
            testimonials, no borrowed logos, and no unverifiable compliance badges here.
          </li>
        </ul>
        <p className="mt-8 text-sm text-muted">
          Product detail: <Link href="/features">Features</Link>
          {" · "}
          <Link href="/use-cases">Use cases</Link>
          {" · "}
          <Link href="/guides">Guides</Link>
          {" · "}
          <Link href="/glossary">Glossary</Link>
          {" · "}
          <Link href="/docs">
            Docs
          </Link>
          .
        </p>
      </Container>
    </Section>
  );
}
