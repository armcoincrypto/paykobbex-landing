import type { Metadata } from "next";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { OperationalMatrixTable } from "@/components/operational/OperationalMatrixTable";
import { OperationalPageHeader } from "@/components/operational/OperationalPageHeader";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { JsonLd } from "@/components/seo/JsonLd";
import { DASHBOARD_VIEWS_TABLE, PAYMENT_HEALTH_DASHBOARD_VIEWS } from "@/lib/observability/dashboard-views";
import { OPERATIONAL_SIGNALS, SIGNAL_CATALOG_TABLE } from "@/lib/observability/signals";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Operational observability",
  description:
    "Institutional observability concepts for crypto payment operations: signal catalog, role-oriented dashboard models, and bounded health semantics—no live metrics or fake dashboards.",
  alternates: { canonical: `${SITE_URL}/observability` },
  openGraph: {
    title: "Operational observability — Kobbopay",
    description:
      "Payment systems intelligence: webhook recency, checkpoint lag, exception queues, reconciliation drift, and treasury signals.",
    url: `${SITE_URL}/observability`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Operational observability — Kobbopay",
    description: "Signal catalog and dashboard concepts for B2B crypto payment operations.",
    images: [OG_IMAGE.url],
  },
};

const breadcrumbJson = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
    { "@type": "ListItem", position: 2, name: "Observability", item: `${SITE_URL}/observability` },
  ],
};

export default function ObservabilityPage() {
  return (
    <>
      <JsonLd id="ld-json-observability-bc" data={breadcrumbJson} />

      <Section tone="default" className="ops-page ops-page-hero-band pt-10 sm:pt-16">
        <Container className="max-w-content">
          <OperationalPageHeader
            className="ops-page-header--hero"
            eyebrow="Observability"
            title="Payment systems intelligence (conceptual)"
            lead={
              <>
                Observability for crypto payment infrastructure is plane-aware: what integration engineers,
                operators, finance, and treasury each need to see—and what must never be collapsed into a
                single green indicator. These pages define{" "}
                <strong className="text-primary">signals and views</strong>, not live dashboards or
                published metrics.
              </>
            }
          >
            <p className="text-sm text-muted">
              Full references:{" "}
              <Link href="/references/operational-signal-catalog">Signal catalog</Link> ·{" "}
              <Link href="/references/payment-health-dashboard-model">Dashboard model</Link> ·{" "}
              <Link href="/incidents">Incident taxonomy & routing</Link> ·{" "}
              <Link href="/playbooks/payment-incident-triage">Incident triage playbook</Link>
            </p>
          </OperationalPageHeader>
        </Container>
      </Section>

      <Section tone="muted" id="signals">
        <Container className="max-w-content">
          <h2 className="text-h2 font-semibold text-primary">Operational signal catalog</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Six bounded signals mature teams track internally. Thresholds are merchant-defined; Kobbopay
            does not publish SLA numbers or live telemetry on this site.
          </p>
          <OperationalMatrixTable table={SIGNAL_CATALOG_TABLE} />
          <ul className="mt-10 space-y-6">
            {OPERATIONAL_SIGNALS.map((signal) => (
              <li key={signal.id}>
                <VerificationFramePanel label={signal.name} sublabel={signal.typicalOwner}>
                  <p className="text-sm text-muted">{signal.definition}</p>
                  <p className="mt-2 text-sm text-muted">
                    <span className="font-medium text-primary">Healthy pattern:</span> {signal.healthyPattern}
                  </p>
                  <p className="mt-2 text-sm text-muted">
                    <span className="font-medium text-primary">Investigate when:</span> {signal.investigateWhen}
                  </p>
                </VerificationFramePanel>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm">
            <Link href="/references/operational-signal-catalog">Open full signal catalog reference →</Link>
          </p>
        </Container>
      </Section>

      <Section tone="default" id="dashboards">
        <Container className="max-w-content">
          <h2 className="text-h2 font-semibold text-primary">Operational dashboard concepts</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Role-oriented views prevent single-plane dashboards from hiding reconciliation drift, webhook
            gaps, or treasury risk. Design internal tooling against these questions—not vanity uptime
            percentages.
          </p>
          <OperationalMatrixTable table={DASHBOARD_VIEWS_TABLE} />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {PAYMENT_HEALTH_DASHBOARD_VIEWS.map((view) => (
              <VerificationFramePanel key={view.id} label={view.title} sublabel="Conceptual view">
                <p className="text-xs font-medium uppercase tracking-wide text-primary">Primary questions</p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted">
                  {view.primaryQuestions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ul>
                <p className="mt-3 text-sm text-muted">
                  <span className="font-medium text-primary">Must not collapse:</span> {view.mustNotCollapse}
                </p>
              </VerificationFramePanel>
            ))}
          </div>
          <p className="mt-8 text-sm">
            <Link href="/references/payment-health-dashboard-model">Open dashboard model reference →</Link>
          </p>
        </Container>
      </Section>

      <Section tone="muted" className="pb-[var(--token-section-loose)]">
        <Container className="max-w-content">
          <h2 className="text-h2 font-semibold text-primary">From signals to action</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            When a signal degrades, classify the incident, then open the matching playbook. Start with{" "}
            <Link href="/playbooks/payment-incident-triage">payment incident triage</Link> when the class is
            unclear.
          </p>
          <p className="mt-4 text-sm">
            <Link href="/incidents">Incident taxonomy and playbook routing →</Link>
          </p>
        </Container>
      </Section>
    </>
  );
}
