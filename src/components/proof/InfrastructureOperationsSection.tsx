import { VerificationBoundaryDiagram } from "@/components/diagrams/VerificationBoundaryDiagram";
import { OperationalPrinciplesMatrix } from "@/components/proof/OperationalPrinciplesMatrix";
import { Container } from "@/components/primitives/Container";
import { Link } from "@/components/primitives/link";
import { Section } from "@/components/primitives/Section";
import { ConfirmationDepthStack } from "@/components/proof/ConfirmationDepthStack";
import { ReconciliationInspectZone } from "@/components/proof/ReconciliationInspectZone";
import { LifecycleLaneInstrument } from "@/components/proof/LifecycleLaneInstrument";
import { MerchantReviewPipeline } from "@/components/proof/MerchantReviewPipeline";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { OpsEcosystemGuidance } from "@/components/proof/OpsEcosystemGuidance";
import { OpsEnvironmentProgression } from "@/components/proof/OpsEnvironmentProgression";
import { WebhookPropagationStrip } from "@/components/proof/WebhookPropagationStrip";

const operations: Array<{ title: string; body: string; zone?: "reconcile" }> = [
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
    zone: "reconcile",
  },
  {
    title: "Reconciliation flow",
    body: "Finance teams align ledger entries to lifecycle states and webhook events. This site does not publish fee percentages or settlement SLAs unless commercially approved for your segment.",
    zone: "reconcile",
  },
  {
    title: "Withdrawal controls",
    body: "Merchants initiate withdrawal requests. Execution follows operational controls and configuration—not a promise of universal instant on-chain settlement.",
  },
];

const frameSecondary = "vf-frame vf-frame--tier-secondary ops-instrument-surface";

/**
 * How infrastructure actually operates — unified platform shell (P19).
 */
export function InfrastructureOperationsSection() {
  const headingId = "home-heading-infrastructure-operates";

  return (
    <Section
      id="how-infrastructure-operates"
      tone="default"
      className="proof-section home-ops-follow home-ops-deep home-ops-story home-ops-journey home-ops-credibility home-ops-ecosystem home-ops-premium home-platform-ops"
    >
      <Container>
        <div className="ops-platform">
          <header className="ops-platform__thesis ops-editorial proof-section-header">
            <div className="ops-editorial__masthead">
              <div className="ops-editorial__identity">
                <span className="ops-editorial__section-index" aria-hidden="true">
                  01
                </span>
                <p className="ops-editorial__eyebrow">Operating model</p>
                <span className="ops-editorial__layer-tag">Platform thesis</span>
              </div>
              <aside className="ops-editorial__meta-rail" aria-label="Section context">
                <p className="ops-editorial__meta-line">Control plane</p>
                <p className="ops-editorial__meta-line">Governed access</p>
              </aside>
            </div>

            <div className="ops-editorial__signature" aria-hidden="true" />

            <div className="ops-editorial__hero">
              <h2 id={headingId} className="ops-editorial__title">
                How infrastructure actually operates
              </h2>
            </div>

            <div className="ops-editorial__body">
              <p className="ops-editorial__lead">
                Kobbopay is designed as visible infrastructure: explicit lifecycles, signed
                webhooks, merchant review gates, and operational boundaries you can map to your own
                controls.
              </p>
            </div>
          </header>

          <div className="ops-platform__control ops-tier-primary">
            <p className="ops-platform__control-label" aria-hidden="true">
              Operational control plane
            </p>
            <div className="ops-control-plane proof-env-maturity proof-env-maturity--choreo">
              <div className="ops-control-plane__frame">
                <OpsEnvironmentProgression />
                <div className="ops-control-plane__divider" aria-hidden="true" />
                <OpsEcosystemGuidance />
              </div>
            </div>
          </div>

          <div
            className="ops-platform__instruments"
            aria-label="Settlement, transport, and approval instrumentation"
          >
            <section className="ops-platform__cluster ops-platform__cluster--settlement">
              <header className="ops-platform__cluster-head">
                <span className="ops-platform__cluster-index">A</span>
                <div>
                  <h3 className="ops-platform__cluster-title">Settlement &amp; lifecycle</h3>
                  <p className="ops-platform__cluster-meta">
                    State progression and finance-owned recognition
                  </p>
                </div>
              </header>
              <div className="ops-platform__cluster-grid ops-platform__cluster-grid--settlement">
                <VerificationFramePanel
                  label="Lifecycle lane"
                  className={frameSecondary}
                  labelledBy={headingId}
                >
                  <div className="proof-bento-instrument proof-bento-instrument--state-engine">
                    <LifecycleLaneInstrument
                      variant="state-engine"
                      className="mb-0"
                      showTelemetry={false}
                      showInspectCopy={false}
                      animate
                      interactive={false}
                    />
                  </div>
                  <div className="proof-bento-annotation ops-state-engine-legend ops-tier-annotation">
                    <dl className="ops-state-engine-legend__grid">
                      <div>
                        <dt>Pending</dt>
                        <dd>created / awaiting detection.</dd>
                      </div>
                      <div>
                        <dt>Paid</dt>
                        <dd>detected, not final for your books.</dd>
                      </div>
                      <div>
                        <dt>Confirmed</dt>
                        <dd>policy + rail semantics met.</dd>
                      </div>
                      <div>
                        <dt>Expired</dt>
                        <dd>terminal branch for the attempt.</dd>
                      </div>
                    </dl>
                  </div>
                </VerificationFramePanel>

                <VerificationFramePanel label="Confirmation depth" className={frameSecondary}>
                  <ReconciliationInspectZone className="proof-bento-instrument--settlement">
                    <ConfirmationDepthStack variant="settlement-intelligence" animate />
                  </ReconciliationInspectZone>
                </VerificationFramePanel>
              </div>
            </section>

            <section className="ops-platform__cluster ops-platform__cluster--transport">
              <header className="ops-platform__cluster-head">
                <span className="ops-platform__cluster-index">B</span>
                <div>
                  <h3 className="ops-platform__cluster-title">Signed transport</h3>
                  <p className="ops-platform__cluster-meta">
                    Webhook pipeline and server-side verification path
                  </p>
                </div>
              </header>
              <VerificationFramePanel
                label="Webhook verification"
                className={frameSecondary}
                labelledBy={headingId}
              >
                <div className="proof-bento-instrument proof-bento-instrument--state-engine">
                  <WebhookPropagationStrip
                    variant="state-engine"
                    showTelemetry={false}
                    showInspectCopy={false}
                    animate
                    interactive={false}
                  />
                </div>
              </VerificationFramePanel>
            </section>

            <section className="ops-platform__cluster ops-platform__cluster--governance">
              <header className="ops-platform__cluster-head">
                <span className="ops-platform__cluster-index">C</span>
                <div>
                  <h3 className="ops-platform__cluster-title">
                    Merchant approval &amp; access
                  </h3>
                  <p className="ops-platform__cluster-meta">
                    Controlled production gates — not self-serve keys on day one
                  </p>
                </div>
              </header>
              <MerchantReviewPipeline
                variant="approval-pipeline"
                labelledBy={headingId}
                compact
                showInspectCopy={false}
                interactive={false}
                className={frameSecondary}
              />
            </section>
          </div>

          <section className="ops-platform__support ops-tier-support" aria-labelledby="ops-platform-support-heading">
            <header className="ops-platform__support-head">
              <span className="ops-platform__support-index" aria-hidden="true">
                D
              </span>
              <div>
                <h3 id="ops-platform-support-heading" className="ops-platform__support-title">
                  Integration architecture
                </h3>
                <p className="ops-platform__support-meta">
                  Operational principles and verification boundaries for production teams
                </p>
              </div>
            </header>

            <OperationalPrinciplesMatrix principles={operations} embedded />

            <div className="ops-platform__boundary">
              <VerificationBoundaryDiagram variant="premium" settle={false} />
            </div>

            <p className="ops-platform__rails-note">
              Selected rails: networks and assets are enabled per merchant configuration.{" "}
              <Link href="/docs">Integration docs</Link>
              {" · "}
              <Link href="/glossary">Glossary</Link>
            </p>
          </section>

          <p className="ops-platform__disclaimer ops-tier-annotation">
            <span className="ops-platform__disclaimer-led" aria-hidden="true" />
            Conceptual instrumentation on this page — not live dashboards, metrics, or client logos.
          </p>
        </div>
      </Container>
    </Section>
  );
}
