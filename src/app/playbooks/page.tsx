import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { OpsHubAside } from "@/components/operational/OpsHubAside";
import { PLAYBOOK_ENTRIES, playbookPath } from "@/lib/playbooks/meta";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operational playbooks",
  description:
    "Institutional operational playbooks for crypto payment merchants: onboarding rollout, webhook rotation, reconciliation close, treasury recognition, exception triage, and payout review—evidence-oriented, not marketing filler.",
  alternates: { canonical: `${SITE_URL}/playbooks` },
  openGraph: {
    title: "Operational playbooks — Kobbopay",
    description: "Procedural workflows for payment operators, finance, and integration engineers.",
    url: `${SITE_URL}/playbooks`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Operational playbooks — Kobbopay",
    description: "Merchant operational playbooks for crypto payment infrastructure.",
    images: [OG_IMAGE.url],
  },
};

export default function PlaybooksHubPage() {
  return (
    <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16 pb-[var(--token-section-loose)]">
      <Container className="max-w-content">
        <OperationalPageHeader
          className="ops-page-header--hero"
          eyebrow="Playbooks"
          title="Operational workflow authority"
          lead={
            <>
              Procedural playbooks for teams running crypto payment operations—objectives, decision points,
              escalation paths, and recovery patterns. Complement{" "}
              <Link href="/guides">guides</Link> (education) and{" "}
              <Link href="/blog">journal research</Link> (depth).
            </>
          }
        >
          <p className="text-sm text-muted">
            Integration references: <Link href="/references">/references</Link>. Observability:{" "}
            <Link href="/observability">/observability</Link>. Incident routing:{" "}
            <Link href="/incidents">/incidents</Link>. Glossary: <Link href="/glossary">/glossary</Link>.
          </p>
        </OperationalPageHeader>

        <ul className="ops-hub-list">
          {PLAYBOOK_ENTRIES.map((entry, i) => (
            <li key={entry.slug} className="ops-hub-row">
              <article className="ops-hub-row__content">
                <p className="proof-workflow-index">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 text-h2 font-semibold text-primary">
                  <Link href={playbookPath(entry.slug)} className="text-primary no-underline hover:text-accent">
                    {entry.shortTitle}
                  </Link>
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">{entry.description}</p>
                <p className="ops-hub-row__cta text-sm font-medium">
                  <Link href={playbookPath(entry.slug)}>Open playbook →</Link>
                </p>
              </article>
              <OpsHubAside index={String(i + 1).padStart(2, "0")} kind="Playbook" />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
