import type { OperationalLinkGroup } from "@/lib/operational-links";
import type { PlaybookSlug } from "@/lib/playbooks/meta";
import type { PlaybookDocument } from "@/components/playbooks/PlaybookView";

type PlaybookInput = {
  objective: string;
  prerequisites: string[];
  signals: string[];
  decisions: string[];
  escalation: string[];
  failures: string[];
  recovery: string[];
  related: OperationalLinkGroup;
};

function definePlaybook(input: PlaybookInput): PlaybookDocument {
  return {
    sections: [
      {
        id: "objective",
        title: "Objective",
        index: "01",
        blocks: [{ type: "p", text: input.objective }],
      },
      {
        id: "prerequisites",
        title: "Prerequisites",
        index: "02",
        blocks: [{ type: "ul", items: input.prerequisites }],
      },
      {
        id: "signals",
        title: "Operational signals",
        index: "03",
        blocks: [{ type: "ul", items: input.signals }],
      },
      {
        id: "decisions",
        title: "Decision points",
        index: "04",
        blocks: [{ type: "ul", items: input.decisions }],
      },
      {
        id: "escalation",
        title: "Escalation paths",
        index: "05",
        blocks: [{ type: "ul", items: input.escalation }],
      },
      {
        id: "failures",
        title: "Failure modes",
        index: "06",
        blocks: [{ type: "ul", items: input.failures }],
      },
      {
        id: "recovery",
        title: "Recovery patterns",
        index: "07",
        blocks: [{ type: "ol", items: input.recovery }],
      },
    ],
    related: input.related,
  };
}

const emptyLinks = (): OperationalLinkGroup => ({
  glossary: [],
  guides: [],
  articles: [],
  references: [],
  playbooks: [],
});

export const PLAYBOOK_CONTENT: Record<PlaybookSlug, PlaybookDocument> = {
  "merchant-onboarding-rollout": definePlaybook({
    objective:
      "Move an approved merchant from integration review to a bounded production rollout with validated rails, webhook endpoints, and reconciliation matchers—without skipping environment gates.",
    prerequisites: [
      "Merchant approval recorded with enabled rails documented.",
      "Separate sandbox and production secrets provisioned server-side.",
      "Lifecycle vocabulary agreed between finance, support, and engineering.",
      "Webhook endpoint deployed with raw-body verification in non-production first.",
    ],
    signals: [
      "Sandbox payments complete full lifecycle without manual overrides.",
      "Matchers produce expected exceptions for deliberate negative tests.",
      "Finance confirms recognition policy mapping for Confirmed vs treasury posting.",
    ],
    decisions: [
      "Which rails go live first versus staged enablement.",
      "Whether low-risk SKUs may fulfill on Paid while finance waits for Confirmed.",
      "Who approves production API key activation and webhook secret cutover.",
    ],
    escalation: [
      "Integration engineering → payment operations lead for rail mismatches.",
      "Finance controller → treasury for recognition policy exceptions.",
      "Security → secret rotation if credentials exposed during rollout.",
    ],
    failures: [
      "Production keys activated before webhook verification passes staging tests.",
      "Support macros that mark paid without payment_id references.",
      "Reconciliation matchers copied from demo data with wrong tolerances.",
    ],
    recovery: [
      "Freeze production posting; retain sandbox for replay testing.",
      "Re-baseline lifecycle transitions from verified provider events.",
      "Re-run matchers with documented tolerances before re-enabling auto-resolve.",
      "Publish internal rollout checklist updates from root cause.",
    ],
    related: {
      ...emptyLinks(),
      usedDuring: ["Merchant access approval", "Environment promotion", "First production payment"],
      guides: [
        { href: "/guides/merchant-onboarding", label: "Merchant onboarding", reason: "Expectations" },
        { href: "/guides/merchant-integration-architecture", label: "Integration architecture" },
      ],
      references: [{ href: "/references/rail-selection-matrix", label: "Rail selection matrix" }],
      glossary: [{ href: "/glossary#merchant-approval", label: "Merchant approval" }],
      playbooks: [{ href: "/playbooks/webhook-secret-rotation", label: "Webhook secret rotation" }],
    },
  }),

  "webhook-secret-rotation": definePlaybook({
    objective:
      "Rotate webhook secrets with overlapping verification keys, validated handlers, and observable cutover—minimizing false verification failures and duplicate processing incidents.",
    prerequisites: [
      "Document current signing algorithm and header names per environment.",
      "Dual-secret verification supported in handler (current + next).",
      "Idempotency store healthy; duplicate metrics baselined.",
      "Rollback secret retained in secure vault until cutover completes.",
    ],
    signals: [
      "Elevated 401/403 on webhook endpoint during partial deploys.",
      "Verification failure rate spike after config push.",
      "Provider retry volume increasing without matching business events.",
    ],
    decisions: [
      "Rotation window length and overlap duration.",
      "Whether to pause auto-fulfillment during cutover.",
      "Emergency rollback versus forward-fix when both secrets fail verification.",
    ],
    escalation: [
      "On-call engineering → security for suspected secret exposure.",
      "Payment operations → finance if verified events stop updating provider plane.",
      "Provider support → delivery gap exceeds configured retry window.",
    ],
    failures: [
      "Single-secret handler deployed before overlap period ends.",
      "Logging full signatures or secrets during debugging.",
      "Returning 2xx before idempotency write while rotation triggers retries.",
    ],
    recovery: [
      "Re-enable previous secret; confirm verification success rate normalizes.",
      "Replay failed events from provider dashboard or API read if available.",
      "Audit idempotency store for partial applies during outage window.",
      "Post-incident: tighten rotation runbook and CI fixture tests.",
    ],
    related: {
      ...emptyLinks(),
      usedDuring: ["Scheduled rotation", "Suspected credential exposure", "Environment promotion"],
      failureRelationships: ["Duplicate webhook delivery", "Out-of-order lifecycle events"],
      guides: [
        { href: "/guides/webhook-verification", label: "Webhook verification" },
        { href: "/guides/webhook-replay-handling", label: "Webhook replay handling" },
      ],
      references: [{ href: "/references/webhook-delivery-expectations", label: "Webhook delivery model" }],
      articles: [{ href: "/blog/webhook-replay-ordering-controls", label: "Replay and ordering controls" }],
      glossary: [
        { href: "/glossary#webhook-secret", label: "Webhook secret" },
        { href: "/glossary#replay-protection", label: "Replay protection" },
      ],
    },
  }),

  "settlement-operations-checklist": definePlaybook({
    objective:
      "Run recurring settlement operations with explicit separation between detection, policy confirmation, and treasury recognition—surfacing drift before period close.",
    prerequisites: [
      "Lifecycle enums documented per environment.",
      "Settlement checkpoints configured with owners.",
      "Dashboards or reports for stuck states (Paid without Confirmed, etc.).",
    ],
    signals: [
      "Growing count of manual lifecycle overrides.",
      "Increasing age of payments in intermediate states.",
      "Mismatch between provider plane totals and commerce fulfilled orders.",
    ],
    decisions: [
      "Which states auto-advance versus require human review.",
      "When to open exception queue versus wait for confirmations.",
      "Whether to throttle fulfillment during rail instability.",
    ],
    escalation: [
      "Operations → finance for recognition policy exceptions.",
      "Engineering → provider support for detection gaps.",
      "Treasury → compliance for high-value holds.",
    ],
    failures: [
      "Treating explorer visibility as Confirmed for all SKUs.",
      "Skipping checkpoint review during high volume.",
      "Collapsing async settlement into single paid flag.",
    ],
    recovery: [
      "Run settlement checkpoint audit on affected payment_ids.",
      "Route ambiguous cases to exception taxonomy classes.",
      "Communicate customer-visible delays with policy-backed language.",
      "Update checkpoint config from drift root cause.",
    ],
    related: {
      ...emptyLinks(),
      guides: [
        { href: "/guides/payment-lifecycle-decision-tree", label: "Lifecycle decision tree" },
        { href: "/guides/settlement-vs-payout", label: "Settlement vs payout" },
      ],
      references: [{ href: "/references/settlement-checkpoint-model", label: "Settlement checkpoint model" }],
      articles: [{ href: "/blog/payment-detection-vs-settlement-finality", label: "Detection vs finality" }],
      playbooks: [{ href: "/playbooks/confirmation-policy-escalation", label: "Confirmation escalation" }],
    },
  }),

  "reconciliation-close-procedure": definePlaybook({
    objective:
      "Close an accounting period with three-plane alignment evidence—commerce, provider lifecycle, and finance postings—or explicitly owned exceptions.",
    prerequisites: [
      "Matchers frozen for close window (no tolerance changes mid-close).",
      "Exception queue aged items reviewed by owner.",
      "Finance sign-off roles assigned.",
    ],
    signals: [
      "Unmatched value exceeds materiality threshold.",
      "Exceptions reopened after prior close.",
      "Provider plane events missing for posted commerce orders.",
    ],
    decisions: [
      "Whether to invoke reconciliation freeze for new auto-posting.",
      "Which exception classes block close versus carry forward.",
      "Adjustments requiring dual control.",
    ],
    escalation: [
      "Finance close owner → engineering for provider plane gaps.",
      "Support → operations for reference mismatch spikes.",
      "Executive → policy exception for material unresolved items.",
    ],
    failures: [
      "Force-balancing by editing commerce records without provider evidence.",
      "Closing with generic exception codes only.",
      "Ignoring timing-skew class during async settlement week.",
    ],
    recovery: [
      "Apply reconciliation freeze; stop silent auto-resolve.",
      "Re-run matchers with frozen tolerances.",
      "Document carry-forward exceptions with payment_id evidence.",
      "Schedule drift investigation if systematic class emerges.",
    ],
    related: {
      ...emptyLinks(),
      usedDuring: ["Month-end close", "Quarter-end close", "Audit preparation"],
      guides: [{ href: "/guides/reconciliation-checklist", label: "Reconciliation checklist" }],
      references: [{ href: "/references/reconciliation-state-model", label: "Reconciliation state model" }],
      articles: [{ href: "/blog/three-plane-reconciliation-architecture", label: "Three-plane architecture" }],
      playbooks: [
        { href: "/playbooks/exception-queue-triage", label: "Exception queue triage" },
        { href: "/playbooks/treasury-recognition-procedure", label: "Treasury recognition" },
      ],
    },
  }),

  "treasury-recognition-procedure": definePlaybook({
    objective:
      "Post treasury recognition only when finance reconciliation gates pass—distinct from lifecycle Confirmed and from customer fulfillment decisions.",
    prerequisites: [
      "Recognition policy matrix approved by finance.",
      "Dual-control workflow for material postings.",
      "Mapping from payment_id to ledger accounts documented.",
    ],
    signals: [
      "Treasury postings timestamped before provider Confirmed events.",
      "Merchant balance diverges from finance ledger.",
      "Payout requests exceed recognized balance.",
    ],
    decisions: [
      "Which SKUs require treasury posting before fulfillment.",
      "Hold versus release for ambiguous rail outcomes.",
      "Payout approval separate from recognition posting.",
    ],
    escalation: [
      "Treasury analyst → controller for policy exceptions.",
      "Engineering → operations for provider plane gaps blocking posting.",
    ],
    failures: [
      "Using Confirmed webhook as automatic treasury posting trigger without finance rules.",
      "Recognizing on detection for high-value flows.",
    ],
    recovery: [
      "Reverse posting with documented approval tied to payment_id.",
      "Reconcile provider events and rematch finance plane.",
      "Tighten checkpoint between Confirmed and treasury posting.",
    ],
    related: {
      ...emptyLinks(),
      guides: [{ href: "/guides/treasury-recognition-flow", label: "Treasury recognition flow" }],
      references: [{ href: "/references/confirmation-policy-matrix", label: "Confirmation policy matrix" }],
      glossary: [
        { href: "/glossary#treasury-recognition", label: "Treasury recognition" },
        { href: "/glossary#treasury-posting", label: "Treasury posting" },
      ],
      playbooks: [{ href: "/playbooks/merchant-payout-review", label: "Payout review" }],
    },
  }),

  "delayed-settlement-recovery": definePlaybook({
    objective:
      "Manage customer and finance expectations when confirmation or treasury posting legitimately lags detection—without informal paid shortcuts.",
    prerequisites: [
      "Async settlement lifecycle documented per rail.",
      "Customer communication templates aligned to lifecycle states.",
      "Exception taxonomy includes timing-skew class.",
    ],
    signals: [
      "Paid state aging beyond configured SLA internally (your policy—not a public SLA claim).",
      "Support tickets referencing block explorers instead of payment_id.",
      "Webhook delivery gaps during rail congestion.",
    ],
    decisions: [
      "Continue fulfillment on Paid versus wait for Confirmed.",
      "When to open timing-skew exception versus wait.",
      "Customer refund or re-attempt policy for expired windows.",
    ],
    escalation: [
      "Support → operations for stuck lifecycle states.",
      "Operations → provider support for delayed events.",
      "Finance → treasury for extended holds.",
    ],
    failures: [
      "Manual Confirmed overrides without provider event.",
      "Promising instant finality in customer chat.",
    ],
    recovery: [
      "Verify provider event log for payment_id.",
      "Apply lifecycle decision tree paths.",
      "Close or escalate timing-skew exceptions with evidence.",
    ],
    related: {
      ...emptyLinks(),
      references: [{ href: "/references/asynchronous-settlement-lifecycle", label: "Async settlement lifecycle" }],
      articles: [{ href: "/blog/operational-settlement-drift-recovery", label: "Settlement drift recovery" }],
      playbooks: [{ href: "/playbooks/confirmation-policy-escalation", label: "Confirmation escalation" }],
    },
  }),

  "duplicate-payment-investigation": definePlaybook({
    objective:
      "Determine whether duplicate signals are benign retries, duplicate commerce intents, or reconciliation errors—before double fulfillment or double posting.",
    prerequisites: [
      "Idempotency keys logged with payment_id and event type.",
      "Commerce reference uniqueness rules documented.",
      "Duplicate taxonomy distinguishes webhook vs chain vs order duplication.",
    ],
    signals: [
      "Same payment_id with multiple Confirmed transitions.",
      "Two payment_ids for one order reference.",
      "Idempotency store shows skipped duplicates rising.",
    ],
    decisions: [
      "Refund versus credit versus apply to balance.",
      "Whether to halt fulfillment pending investigation.",
      "Provider dispute versus internal matcher bug.",
    ],
    escalation: [
      "Support → finance for customer balance impact.",
      "Engineering → payment operations for handler bugs.",
    ],
    failures: [
      "Issuing refund and fulfillment for both signals without investigation.",
      "Deleting idempotency records to unblock handler.",
    ],
    recovery: [
      "Collect provider event timeline for all involved payment_ids.",
      "Map commerce references across three planes.",
      "Apply resolution code from exception taxonomy.",
    ],
    related: {
      ...emptyLinks(),
      articles: [{ href: "/blog/webhook-replay-ordering-controls", label: "Webhook replay controls" }],
      references: [{ href: "/references/provider-retry-semantics", label: "Provider retry semantics" }],
      playbooks: [{ href: "/playbooks/exception-queue-triage", label: "Exception triage" }],
    },
  }),

  "underpayment-overpayment-handling": definePlaybook({
    objective:
      "Resolve amount mismatches with explicit tolerance policy—routing to exception queues instead of silent acceptance or rejection.",
    prerequisites: [
      "Amount tolerances defined per asset and rail.",
      "Customer communication policy for partial payments.",
      "Finance rules for posting under/over amounts.",
    ],
    signals: [
      "Matcher failures on amount dimension only.",
      "Support tickets about partial wallet sends.",
      "Treasury holds on aggregate micro-differences.",
    ],
    decisions: [
      "Auto-accept within tolerance versus always review.",
      "Recreate payment versus manual allocation.",
      "Refund excess or credit merchant balance.",
    ],
    escalation: [
      "Support → treasury for material overpayment.",
      "Finance → policy owner for tolerance changes.",
    ],
    failures: [
      "Accepting any positive amount without reference check.",
      "Writing off differences without resolution metadata.",
    ],
    recovery: [
      "Classify as amount mismatch exception.",
      "Document observed vs expected with rail context.",
      "Execute customer resolution per playbook policy.",
    ],
    related: {
      ...emptyLinks(),
      articles: [{ href: "/blog/exception-taxonomy-crypto-payment-operations", label: "Exception taxonomy" }],
      glossary: [{ href: "/glossary#settlement-eligibility", label: "Settlement eligibility" }],
    },
  }),

  "exception-queue-triage": definePlaybook({
    objective:
      "Route exception queue items to the correct owner with required evidence—preventing informal overrides and operational drift.",
    prerequisites: [
      "Exception taxonomy published internally.",
      "Queue filters by class, age, and materiality.",
      "Owners assigned per class (support, treasury, engineering, finance).",
    ],
    signals: [
      "Queue depth growing faster than close rate.",
      "Repeat classes tied to same SKU or rail.",
      "High rate of generic/other resolution codes.",
    ],
    decisions: [
      "Auto-resolve eligibility per class.",
      "When to escalate to finance close blocker.",
      "Merge versus split related payment_ids.",
    ],
    escalation: [
      "Class owner → operations lead when SLA breached internally.",
      "Engineering → provider when provider plane data missing.",
    ],
    failures: [
      "Closing exceptions without payment_id.",
      "Support overriding lifecycle without exception record.",
    ],
    recovery: [
      "Reopen incorrectly closed items with audit note.",
      "Run taxonomy training for repeat mistake patterns.",
      "Instrument matchers to reduce false positives.",
    ],
    related: {
      ...emptyLinks(),
      articles: [{ href: "/blog/exception-taxonomy-crypto-payment-operations", label: "Exception taxonomy" }],
      guides: [{ href: "/guides/reconciliation-checklist", label: "Reconciliation checklist" }],
      playbooks: [{ href: "/playbooks/reconciliation-close-procedure", label: "Reconciliation close" }],
    },
  }),

  "provider-outage-response": definePlaybook({
    objective:
      "Maintain operational control when provider API or webhook delivery degrades—using freeze patterns and customer communication without inventing uptime guarantees.",
    prerequisites: [
      "Health checks on webhook recency and API error rates.",
      "Reconciliation freeze procedure documented.",
      "Status communication templates that avoid unverified promises.",
    ],
    signals: [
      "Webhook recency lag beyond internal threshold.",
      "API read failures for payment status.",
      "Growing stuck Pending/Paid populations.",
    ],
    decisions: [
      "Enable reconciliation freeze for auto-posting.",
      "Pause high-risk fulfillment.",
      "Switch to manual status checks if available.",
    ],
    escalation: [
      "Operations → provider support with correlation ids.",
      "Customer support → operations for ticket surge.",
    ],
    failures: [
      "Assuming outage equals payment failure without evidence.",
      "Disabling verification to accept unauthenticated callbacks.",
    ],
    recovery: [
      "Backfill provider plane from event log after recovery.",
      "Re-run matchers for outage window.",
      "Clear freeze with finance sign-off.",
    ],
    related: {
      ...emptyLinks(),
      playbooks: [
        { href: "/playbooks/reconciliation-close-procedure", label: "Reconciliation close" },
        { href: "/playbooks/delayed-settlement-recovery", label: "Delayed settlement" },
      ],
      references: [{ href: "/references/webhook-delivery-expectations", label: "Webhook delivery model" }],
    },
  }),

  "confirmation-policy-escalation": definePlaybook({
    objective:
      "Escalate payments requiring human confirmation when automated policy gates cannot classify risk—preserving audit trails.",
    prerequisites: [
      "Confirmation policy matrix with amount tiers and rails.",
      "Escalation roster and after-hours coverage defined internally.",
      "Audit log for manual confirmations.",
    ],
    signals: [
      "Payments exceeding auto-confirm threshold.",
      "Ambiguous rail outcomes after detection.",
      "Sanctions or velocity flags (if configured).",
    ],
    decisions: [
      "Confirm versus hold versus reject attempt.",
      "Temporary fulfillment hold scope.",
      "Whether to require dual approval.",
    ],
    escalation: [
      "Operations analyst → finance controller for material amounts.",
      "Compliance → legal for flagged jurisdictions if applicable.",
    ],
    failures: [
      "Confirming via chat without system record.",
      "Using explorer screenshots as sole evidence.",
    ],
    recovery: [
      "Record decision with payment_id, actor, timestamp, rationale.",
      "Apply lifecycle transition through normal provider flow when possible.",
    ],
    related: {
      ...emptyLinks(),
      references: [{ href: "/references/confirmation-policy-matrix", label: "Confirmation policy matrix" }],
      articles: [{ href: "/blog/settlement-checkpoint-escalation-patterns", label: "Checkpoint escalation" }],
      playbooks: [{ href: "/playbooks/settlement-operations-checklist", label: "Settlement checklist" }],
    },
  }),

  "merchant-payout-review": definePlaybook({
    objective:
      "Review withdrawal requests against merchant balance, recognition state, and payout orchestration controls before execution.",
    prerequisites: [
      "Payout policy separates recognized balance from in-flight payments.",
      "Dual-control for material outbound movement.",
      "Payout rail configuration documented.",
    ],
    signals: [
      "Payout request exceeds recognized merchant balance.",
      "Recent exception queue items unresolved for same merchant.",
      "Rail mismatch between settlement and payout configuration.",
    ],
    decisions: [
      "Approve, delay, or reject payout request.",
      "Partial payout versus wait for recognition.",
      "Manual treasury execution versus automated orchestration.",
    ],
    escalation: [
      "Treasury → finance controller for policy exceptions.",
      "Operations → engineering for balance computation discrepancies.",
    ],
    failures: [
      "Executing payout from detected-but-unrecognized funds.",
      "Skipping reconciliation check during urgent requests.",
    ],
    recovery: [
      "Hold payout; reconcile merchant ledger state.",
      "Communicate delay with policy-backed reason.",
      "Resume orchestration after gates pass.",
    ],
    related: {
      ...emptyLinks(),
      guides: [{ href: "/guides/settlement-vs-payout", label: "Settlement vs payout" }],
      references: [{ href: "/references/merchant-ledger-transitions", label: "Ledger transitions" }],
      glossary: [{ href: "/glossary#payout-orchestration", label: "Payout orchestration" }],
    },
  }),

  "payment-incident-triage": definePlaybook({
    objective:
      "Classify an operational degradation from signals into an incident class, collect minimum evidence, and route to the correct playbook and reference—without defaulting to the wrong plane’s fix.",
    prerequisites: [
      "Operational signal catalog with internally defined thresholds.",
      "Incident taxonomy agreed across integration, operations, finance, and treasury.",
      "Correlation identifiers (payment_id, merchant_id, time window) available.",
      "Access to playbooks index and integration references.",
    ],
    signals: [
      "One or more catalog signals outside internal threshold (webhook recency, checkpoint lag, queue depth, drift, provider latency, payout backlog).",
      "Customer or support tickets clustering around stuck payments.",
      "Deploy, secret rotation, or rail change preceding degradation.",
      "Multiple signals degrading together (often provider + webhook + checkpoint lag).",
    ],
    decisions: [
      "Is this primarily detection, settlement, webhook, provider, reconciliation, or payout?",
      "Is evidence sufficient to open a specialized playbook—or is freeze/hold safer first?",
      "Does the incident affect period close, payout execution, or customer fulfillment?",
      "Should provider outage response precede exception triage?",
    ],
    escalation: [
      "Unclear class → payment operations lead facilitates joint triage.",
      "Material treasury or payout risk → finance controller before irreversible action.",
      "Sustained provider degradation → provider support with correlation ids.",
      "Security-sensitive webhook verification spike → security + integration engineering.",
    ],
    failures: [
      "Opening reconciliation close for a pure webhook verification deploy mistake.",
      "Confirming payments manually to clear checkpoint lag without audit trail.",
      "Treating provider outage as payment failure and reversing commerce state.",
      "Skipping signal catalog and jumping to ad-hoc explorer checks.",
    ],
    recovery: [
      "Record time window, affected rails, and degrading signals with owners.",
      "Assign incident class using taxonomy on /incidents.",
      "Open primary playbook for that class; link secondary playbooks if needed.",
      "Attach supporting reference (state model, delivery expectations, signal catalog).",
      "Schedule post-incident matcher or observability gap review internally.",
    ],
    related: {
      ...emptyLinks(),
      references: [
        { href: "/references/operational-signal-catalog", label: "Operational signal catalog" },
        { href: "/references/payment-health-dashboard-model", label: "Dashboard model" },
      ],
      playbooks: [
        { href: "/playbooks/provider-outage-response", label: "Provider outage response" },
        { href: "/playbooks/exception-queue-triage", label: "Exception queue triage" },
      ],
      articles: [{ href: "/blog/exception-taxonomy-crypto-payment-operations", label: "Exception taxonomy" }],
      usedDuring: [
        "On-call intake when multiple signals degrade",
        "Post-deploy webhook verification spikes",
        "Period-close risk reviews",
      ],
      failureRelationships: [
        "Misclassified incidents extend mean time to correct playbook",
        "Single-plane fixes that worsen drift",
      ],
    },
  }),
};

export function getPlaybookContent(slug: PlaybookSlug): PlaybookDocument {
  return PLAYBOOK_CONTENT[slug];
}
