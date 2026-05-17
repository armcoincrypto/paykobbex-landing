import { WebhookFlowDiagram } from "@/components/diagrams/WebhookFlowDiagram";
import { VerificationBoundaryDiagram } from "@/components/diagrams/VerificationBoundaryDiagram";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { ConfirmationDepthStack } from "@/components/proof/ConfirmationDepthStack";
import { LifecycleLaneInstrument } from "@/components/proof/LifecycleLaneInstrument";
import { MerchantReviewPipeline } from "@/components/proof/MerchantReviewPipeline";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
const operations: Array<{ title: string; body: string }> = [
  {
    title: "Lifecycle visibility",
    body: "Payments move through explicit states so engineering, finance, and support share vocabulary. Detected on-chain activity is not collapsed into “final” without your reconciliation rules.",
  },
  {
    title: "Webhook operations",
    body: "Lifecycle transitions emit signed HTTPS callbacks. Your backend verifies signatures on raw bytes, then applies idempotent updates so retries are expected—not exceptional.",
  },
  {
    title: "Merchant review boundaries",
    body: "Production access, rails, and webhook endpoints are enabled after intake and approval. Unsupported combinations should fail at creation time where possible.",
  },
  {
    title: "Confirmation semantics",
    body: "Paid and Confirmed mean different things. Map them to internal accounting and treasury controls—exact thresholds depend on enabled rails and your policy.",
  },
  {
    title: "Reconciliation flow",
    body: "Finance teams align ledger entries to lifecycle states and webhook events. This site does not publish fee percentages or settlement SLAs unless commercially approved for your segment.",
  },
  {
    title: "Withdrawal controls",
    body: "Merchants initiate withdrawal requests. Execution follows operational controls and configuration—not a promise of universal instant on-chain settlement.",
  },
];

/**
 * How infrastructure actually operates — systems visibility, not “why choose us.”
 */
export function InfrastructureOperationsSection() {
  const headingId = "home-heading-infrastructure-operates";

  return (
    <Section id="how-infrastructure-operates" tone="default" className="proof-section">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
          Operational systems
        </p>
        <h2 id={headingId} className="mt-3 max-w-[28ch] text-h2 font-semibold text-primary">
          How infrastructure actually operates
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted sm:text-body">
          Kobbopay is designed as visible infrastructure: explicit lifecycles, signed webhooks,
          merchant review gates, and operational boundaries you can map to your own controls. The
          visuals below are conceptual instrumentation — not live dashboards, metrics, or client
          logos.
        </p>

        <div className="mt-12 proof-bento">
          <article className="proof-bento-lifecycle">
            <VerificationFramePanel
              label="Lifecycle lane"
              sublabel="State transitions (conceptual)"
              labelledBy={headingId}
            >
              <LifecycleLaneInstrument className="mb-2" />
              <ul className="mt-4 list-disc space-y-1.5 pl-4 text-xs leading-relaxed text-muted">
                <li>
                  <strong className="text-primary">Pending</strong> — created / awaiting detection.
                </li>
                <li>
                  <strong className="text-primary">Paid</strong> — detected, not final for your books.
                </li>
                <li>
                  <strong className="text-primary">Confirmed</strong> — policy + rail semantics met.
                </li>
                <li>
                  <strong className="text-primary">Expired</strong> — terminal branch for the attempt.
                </li>
              </ul>
            </VerificationFramePanel>
          </article>

          <aside className="proof-bento-confirm flex flex-col gap-4">
            <VerificationFramePanel label="Confirmation depth" sublabel="Settlement visibility">
              <ConfirmationDepthStack />
              <p className="mt-10 text-xs leading-relaxed text-muted">
                Depth reflects policy: what is detected, what is provisional, and what is final for
                your books — not a single “paid” boolean.
              </p>
            </VerificationFramePanel>
          </aside>

          <article className="proof-bento-webhook space-y-4">
            <WebhookFlowDiagram variant="compact" diagramLabelledBy={headingId} />
          </article>

          <article className="proof-bento-review">
            <MerchantReviewPipeline labelledBy={headingId} />
          </article>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:items-start">
          <div className="proof-editorial-rail space-y-6">
            {operations.map((op, i) => (
              <div key={op.title}>
                <p className="proof-workflow-index">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-h3 font-semibold text-primary">{op.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{op.body}</p>
              </div>
            ))}
          </div>
          <div className="min-w-0">
            <VerificationBoundaryDiagram className="[&_h2]:text-h3 [&_h2]:mt-0" />
            <p className="mt-6 text-sm text-muted">
              Selected rails: networks and assets are enabled per merchant configuration.{" "}
              <Link href="/docs">Integration docs</Link>
              {" · "}
              <Link href="/glossary">Glossary</Link>
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
