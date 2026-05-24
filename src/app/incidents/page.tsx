import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalMatrixTable } from "@/components/operational/OperationalMatrixTable";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { INCIDENT_TAXONOMY, PLAYBOOK_ROUTING_MATRIX, ROUTING_TABLE } from "@/lib/observability/incidents";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Payment incident taxonomy",
  description:
    "Incident classes for crypto payment operations—detection, settlement, webhook, provider, reconciliation, payout—and signal-to-playbook routing without invented incident stories.",
  alternates: { canonical: `${SITE_URL}/incidents` },
  openGraph: {
    title: "Payment incident taxonomy — Kobbopay",
    description: "Classify payment incidents and route to operational playbooks and integration references.",
    url: `${SITE_URL}/incidents`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment incident taxonomy — Kobbopay",
    description: "Signal → incident class → playbook → reference routing for payment operations.",
    images: [OG_IMAGE.url],
  },
};

const breadcrumbJson = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Incidents", item: `${SITE_URL}/incidents` },
  ],
};

export default function IncidentsPage() {
  return (
    <>
      <JsonLd id="ld-json-incidents-bc" data={breadcrumbJson} />

      <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            className="ops-page-header--hero"
            eyebrow="Incidents"
            title="Which playbook should I open?"
            lead={
              <>
                Payment incidents are not interchangeable. Classify by{" "}
                <strong className="text-primary">operational signal</strong> and{" "}
                <strong className="text-primary">incident class</strong>, then open the playbook and
                reference that match your plane of failure. When uncertain, start with{" "}
                <Link href="/playbooks/payment-incident-triage">payment incident triage</Link>.
              </>
            }
          >
            <p className="text-sm text-muted">
              Signals: <Link href="/observability">Observability</Link> ·{" "}
              <Link href="/references/operational-signal-catalog">Signal catalog</Link> ·{" "}
              <Link href="/playbooks">All playbooks</Link>
            </p>
          </OperationalPageHeader>
        </Container>
      </Section>

      <Section tone="muted" id="taxonomy" className="incidents-taxonomy">
        <Container className="max-w-content">
          <h2 className="text-h2 font-semibold text-primary">Incident taxonomy</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Six classes cover the majority of production payment operations incidents. Each class maps to a
            primary playbook—secondary playbooks handle adjacent failure modes.
          </p>
          <ul className="incidents-taxonomy__list">
            {INCIDENT_TAXONOMY.map((incident) => (
              <li key={incident.id}>
                <VerificationFramePanel label={incident.title} sublabel="Incident class">
                  <p className="text-sm text-muted">{incident.description}</p>
                  <p className="mt-3 text-xs font-medium uppercase tracking-wide text-primary">
                    Characteristic signals
                  </p>
                  <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-muted">
                    {incident.characteristicSignals.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm">
                    <span className="font-medium text-primary">Primary playbook:</span>{" "}
                    <Link href={incident.primaryPlaybook.href}>{incident.primaryPlaybook.label}</Link>
                  </p>
                  {incident.secondaryPlaybooks.length > 0 ? (
                    <p className="mt-2 text-sm text-muted">
                      Also consider:{" "}
                      {incident.secondaryPlaybooks.map((p, i) => (
                        <span key={p.href}>
                          {i > 0 ? " · " : null}
                          <Link href={p.href}>{p.label}</Link>
                        </span>
                      ))}
                    </p>
                  ) : null}
                  <p className="mt-2 text-sm text-muted">
                    References:{" "}
                    {incident.references.map((r, i) => (
                      <span key={r.href}>
                        {i > 0 ? " · " : null}
                        <Link href={r.href}>{r.label}</Link>
                      </span>
                    ))}
                  </p>
                </VerificationFramePanel>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="default" id="routing" className="incidents-routing">
        <Container className="max-w-content">
          <h2 className="text-h2 font-semibold text-primary">Signal → playbook routing</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Direct routing when the signal and class are already clear. The summary table uses playbook
            names; linked routes follow in the list below.
          </p>
          <OperationalMatrixTable table={ROUTING_TABLE} />
          <ul className="incidents-routing__list">
            {PLAYBOOK_ROUTING_MATRIX.map((route) => (
              <li key={route.signal} className="text-sm text-muted">
                <span className="font-medium text-primary">{route.signal}</span>
                {" → "}
                {route.incidentClass}
                {" → "}
                <Link href={route.playbook.href}>{route.playbook.label}</Link>
                {" + "}
                <Link href={route.reference.href}>{route.reference.label}</Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section tone="muted" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-content">
          <VerificationFramePanel label="When class is unclear" sublabel="Start here">
            <p className="text-sm text-muted">
              Open{" "}
              <Link href="/playbooks/payment-incident-triage">payment incident triage</Link> to classify
              signals, assign incident class, and route to the correct playbook without skipping evidence
              collection.
            </p>
          </VerificationFramePanel>
        </Container>
      </Section>
    </>
  );
}
