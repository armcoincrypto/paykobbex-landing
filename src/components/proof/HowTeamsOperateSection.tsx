import { ArchitectureDiagram } from "@/components/diagrams/ArchitectureDiagram";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { LifecycleLaneInstrument } from "@/components/proof/LifecycleLaneInstrument";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { WebhookPropagationStrip } from "@/components/proof/WebhookPropagationStrip";

const workflows: Array<{
  index: string;
  title: string;
  body: string;
  visual?: "lifecycle" | "webhook" | "architecture";
}> = [
  {
    index: "01",
    title: "Reconciliation workflows",
    body: "Finance maps Pending, Paid, and Confirmed to internal books. Webhook events and API reads should converge on the same identifiers — your team defines the cutover rules.",
    visual: "lifecycle",
  },
  {
    index: "02",
    title: "Webhook-first integrations",
    body: "Server backends verify signatures on raw POST bodies, then upsert orders and ledger hooks idempotently. Checkout surfaces call your API — never hold payment keys in the browser.",
    visual: "webhook",
  },
  {
    index: "03",
    title: "Operational review",
    body: "Support and risk teams use explicit states instead of ad-hoc “looks paid” judgments. Merchant portal visibility follows what your deployment exposes after approval.",
  },
  {
    index: "04",
    title: "Lifecycle-aware accounting",
    body: "Treasury treats Paid and Confirmed as distinct signals. Expired is a first-class terminal branch for the original attempt — not a silent failure mode.",
    visual: "lifecycle",
  },
  {
    index: "05",
    title: "Merchant controls",
    body: "Keys, webhook endpoints, and operational settings live behind merchant access controls. Sensitive actions may require 2FA where enabled for your environment.",
  },
  {
    index: "06",
    title: "Rails enablement",
    body: "Networks and assets are enabled per configuration. Creation-time failures for unsupported combinations are preferable to silent partial support.",
    visual: "architecture",
  },
];

function WorkflowVisual({ kind }: { kind: NonNullable<(typeof workflows)[number]["visual"]> }) {
  if (kind === "lifecycle") {
    return <LifecycleLaneInstrument compact animate={false} />;
  }
  if (kind === "webhook") {
    return <WebhookPropagationStrip />;
  }
  return (
    <ArchitectureDiagram
      variant="compact"
      className="[&_figure]:border-0 [&_figure]:bg-transparent [&_figure]:p-0 [&_figure]:shadow-none [&_figure]:ring-0 [&_ol]:hidden"
    />
  );
}

/** How serious teams use Kobbopay — educational, diagram-supported, not a feature grid. */
export function HowTeamsOperateSection() {
  const headingId = "home-heading-how-teams-operate";

  return (
    <Section id="how-teams-operate" tone="muted" className="proof-section">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Team operations
        </p>
        <h2 id={headingId} className="mt-3 max-w-[22ch] text-h2 font-semibold text-primary">
          How teams operate on Kobbopay
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-body">
          Serious merchants treat Kobbopay as infrastructure: explicit states, server-side secrets,
          and operational gates. These workflows describe how engineering, finance, and operations
          typically align — not a checklist of marketing features.
        </p>

        <div className="mt-12 space-y-10">
          {workflows.map((wf) => (
            <article
              key={wf.index}
              className="grid gap-6 border-t border-border-subtle/70 pt-10 first:border-t-0 first:pt-0 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] lg:gap-10 lg:items-start"
            >
              <div>
                <p className="proof-workflow-index">{wf.index}</p>
                <h3 className="mt-2 text-h3 font-semibold text-primary">{wf.title}</h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{wf.body}</p>
              </div>
              {wf.visual ? (
                <VerificationFramePanel
                  label="Workflow instrument"
                  sublabel="Conceptual"
                  labelledBy={headingId}
                  className="lg:mt-6"
                >
                  <WorkflowVisual kind={wf.visual} />
                </VerificationFramePanel>
              ) : (
                <div className="hidden lg:block" aria-hidden="true" />
              )}
            </article>
          ))}
        </div>

        <p className="mt-12 text-sm text-muted">
          <Link href="/guides">Operational guides</Link>
          {" · "}
          <Link href="/docs">Integration docs</Link>
          {" · "}
          <Link href="/request-access" conv="request_access_click">
            Request access
          </Link>
        </p>
      </Container>
    </Section>
  );
}
