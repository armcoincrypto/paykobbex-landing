/**
 * P14 — Operational realism copy (bounded, illustrative, no fake proof).
 * Single source for /operations and cross-page callouts.
 */

export type WalkthroughInstrument =
  | "lifecycle"
  | "webhook"
  | "reconciliation"
  | "review"
  | "withdrawal"
  | "escalation";

export type OperationalWalkthrough = {
  id: string;
  index: string;
  title: string;
  summary: string;
  /** Clearly illustrative — not a customer story. */
  disclaimer: string;
  instrument: WalkthroughInstrument;
  phases: Array<{ label: string; detail: string }>;
};

export type MerchantJourneyFlow = {
  id: string;
  title: string;
  summary: string;
  disclaimer: string;
  goal: string;
  integration: string;
  lifecycle: string;
  reconciliation: string;
  webhooks: string;
  finance: string;
  support: string;
};

export const OPERATIONS_DISCLAIMER =
  "Illustrative operational flows on this marketing site describe how teams typically work with B2B payment infrastructure. They are not customer testimonials, not performance guarantees, and not quotes from live merchant data.";

export const OPERATIONAL_WALKTHROUGHS: OperationalWalkthrough[] = [
  {
    id: "lifecycle-create-to-confirmed",
    index: "01",
    title: "Payment lifecycle (create → confirmed)",
    summary:
      "How a single payment object moves through explicit states when your backend creates the payment and your systems consume lifecycle signals.",
    disclaimer: "Example operational flow — state names and timing depend on your enabled rails and policy.",
    instrument: "lifecycle",
    phases: [
      {
        label: "Create (server)",
        detail:
          "Your backend creates a payment with a stable identifier. The payer receives instructions for the enabled rail — not a browser-held API key.",
      },
      {
        label: "Pending",
        detail:
          "The payment exists before on-chain detection. Support and finance should treat Pending as “open,” not as success or failure.",
      },
      {
        label: "Paid",
        detail:
          "Funds may be detected while your policy still treats the payment as provisional. This is where teams often confuse detection with finality.",
      },
      {
        label: "Confirmed",
        detail:
          "Confirmation semantics for your deployment are met. Entitlements and revenue recognition should align to this gate — not to Paid alone.",
      },
      {
        label: "Expired (branch)",
        detail:
          "The payment window ends or configuration marks the attempt terminal. Reconciliation should close the original attempt without silent reuse.",
      },
    ],
  },
  {
    id: "webhook-retries",
    index: "02",
    title: "Webhook handling (delivery, verify, apply)",
    summary:
      "Signed callbacks are asynchronous. Retries are normal; your consumer must verify on raw bytes and write idempotently.",
    disclaimer: "Example operational flow — not a delivery SLA or latency guarantee.",
    instrument: "webhook",
    phases: [
      {
        label: "Emit",
        detail: "A lifecycle transition triggers an HTTPS POST with a signed body to your endpoint.",
      },
      {
        label: "Verify",
        detail:
          "Your server validates the signature over raw bytes before parsing JSON. Fail closed with 401 on bad signatures.",
      },
      {
        label: "Persist",
        detail:
          "Record the event or enqueue safe work before returning 2xx. Returning success before durable writes creates ghost acknowledgements.",
      },
      {
        label: "Retry",
        detail:
          "Transient failures and timeouts cause redelivery. Idempotent upserts prevent duplicate shipments, credits, or ledger posts.",
      },
      {
        label: "Reconcile",
        detail:
          "Periodic API reads backstop webhook gaps. Finance should not assume webhooks alone are the only source of truth.",
      },
    ],
  },
  {
    id: "reconciliation-day",
    index: "03",
    title: "Reconciliation (detection ≠ books)",
    summary:
      "Finance and engineering align external lifecycle states to internal orders, revenue, and exceptions — often on a schedule, not in real time.",
    disclaimer: "Example operational flow — not universal accounting advice.",
    instrument: "reconciliation",
    phases: [
      {
        label: "Export states",
        detail: "Pull authoritative statuses or event logs for the reconciliation window your team defines.",
      },
      {
        label: "Map rules",
        detail:
          "Document which external state satisfies which internal gate (for example Paid vs Confirmed for entitlements).",
      },
      {
        label: "Exception queue",
        detail:
          "Paid-but-not-confirmed, duplicate webhooks, and late confirmations land in an exception queue — not silent auto-fix.",
      },
      {
        label: "Close period",
        detail:
          "Treasury signs off when open payments match policy. Expired and abandoned attempts should have explicit handling.",
      },
    ],
  },
  {
    id: "merchant-review",
    index: "04",
    title: "Merchant review (access and rails)",
    summary:
      "Production access and rail enablement follow intake, qualification, and technical alignment — not anonymous instant keys.",
    disclaimer: "Example operational flow — timelines are not published on this site.",
    instrument: "review",
    phases: [
      {
        label: "Intake",
        detail: "Use case, geography, rails intent, and technical contact — without secrets in email.",
      },
      {
        label: "Qualification",
        detail: "Fit and risk review determine whether the model matches B2B server-to-server operations.",
      },
      {
        label: "Technical alignment",
        detail: "Lifecycle mapping, webhook verification, and idempotency patterns are agreed before go-live.",
      },
      {
        label: "Approval",
        detail: "Environment configuration and selected rails are enabled intentionally for your integration.",
      },
    ],
  },
  {
    id: "withdrawal-boundary",
    index: "05",
    title: "Withdrawal requests (controls)",
    summary:
      "Merchants initiate withdrawal requests. Execution follows operational controls — not a promise of universal instant settlement.",
    disclaimer: "Example operational flow — controls vary by deployment.",
    instrument: "withdrawal",
    phases: [
      {
        label: "Initiate",
        detail: "A merchant-initiated request is recorded with amount and destination context per policy.",
      },
      {
        label: "Review",
        detail: "Operational controls may include limits, holds, or manual review — this is discipline, not hidden friction.",
      },
      {
        label: "Execute",
        detail: "On-chain or treasury execution follows configuration. Failures should surface as operational states, not silent drops.",
      },
      {
        label: "Reconcile",
        detail: "Finance maps completed movements to ledger entries separate from payment lifecycle semantics.",
      },
    ],
  },
  {
    id: "escalation-delivery",
    index: "06",
    title: "Escalation (webhook or integration drift)",
    summary:
      "When delivery fails or semantics diverge, mature teams route to engineering and finance — not “toggle until it works.”",
    disclaimer: "Example operational flow — not a published support SLA.",
    instrument: "escalation",
    phases: [
      {
        label: "Detect",
        detail: "Monitor non-2xx rates, signature failures, and growing exception queues — not only payer complaints.",
      },
      {
        label: "Triage",
        detail: "Classify: endpoint outage, bad secret rotation, schema drift, or mapping bug in your consumer.",
      },
      {
        label: "Coordinate",
        detail: "Engineering fixes verification and idempotency; finance pauses automated settlement if needed.",
      },
      {
        label: "Verify",
        detail: "Replay or backfill from API reads after fix. Document root cause — retries will happen again.",
      },
    ],
  },
];

export const MERCHANT_JOURNEY_FLOWS: MerchantJourneyFlow[] = [
  {
    id: "saas-billing",
    title: "SaaS billing (illustrative)",
    summary:
      "A B2B software team enables paid plans using server-created payments and webhook-driven entitlements.",
    disclaimer: "Example operational flow — not a named customer or measured outcome.",
    goal: "Convert a subscription checkout into a durable entitlement with finance-visible states.",
    integration:
      "Checkout calls your backend; your backend creates payments and stores payment_id on the subscription record. API keys remain server-side.",
    lifecycle:
      "Provision on Confirmed (or your policy equivalent), not on Pending. Handle Expired for abandoned checkouts without granting access.",
    reconciliation:
      "Daily job compares Confirmed payments to recognized revenue. Paid-but-not-confirmed subscriptions stay in a visible exception state.",
    webhooks:
      "Idempotent consumer updates plan tier. Retries must not double-extend billing periods.",
    finance:
      "Recognize revenue when your policy says final — often Confirmed, not first detection. Document FX and rail fees separately if applicable.",
    support:
      "Support searches by order id and payment_id. Escalations for “paid but locked out” usually mean lifecycle mapping drift, not portal magic fixes.",
  },
  {
    id: "marketplace-settlement",
    title: "Marketplace settlement (illustrative)",
    summary:
      "A marketplace separates buyer checkout from seller settlement with explicit lifecycle and review boundaries.",
    disclaimer: "Example operational flow — legal and marketplace models vary widely.",
    goal: "Collect buyer funds with clear states while seller payouts follow separate operational controls.",
    integration:
      "Marketplace backend creates payments per order; seller balances update only through documented transitions.",
    lifecycle:
      "Buyer payment may reach Confirmed before seller withdrawal eligibility. Do not collapse buyer and seller ledgers.",
    reconciliation:
      "Match order lines to lifecycle states; hold disputed orders in exception queues until policy clears them.",
    webhooks:
      "Separate internal events for buyer Confirmed vs seller withdrawal initiated. Deduplicate aggressively on retries.",
    finance:
      "Treasury tracks float and settlement timing per rail. Withdrawal requests are not instant universal payouts.",
    support:
      "Disputes route to ops with payment_id, state history, and webhook audit — not ad-hoc manual chain transfers from support staff.",
  },
  {
    id: "wallet-top-up",
    title: "Wallet top-up (illustrative)",
    summary:
      "A product credits internal balances after explicit confirmation semantics — not at first mempool sight.",
    disclaimer: "Example operational flow — custody and balance models are deployment-specific.",
    goal: "Let users add funds with operational visibility and supportable state definitions.",
    integration:
      "Mobile or web UI calls your backend; backend creates payment and polls or subscribes via webhooks for updates.",
    lifecycle:
      "Show Pending and Paid distinctly in UI copy. Credit spendable balance on Confirmed per your policy.",
    reconciliation:
      "Nightly compare internal balance ledger to Confirmed top-ups. Investigate stuck Paid states past thresholds.",
    webhooks:
      "Consumer updates balance idempotently. Late Confirmed after user complaint triggers exception workflow, not silent overwrite.",
    finance:
      "Treat top-ups as liabilities until your policy marks them settled. Do not promise instant finality across all rails.",
    support:
      "Support scripts reference lifecycle states, not “blockchain says sent.” Escalate stuck Paid to engineering with payment_id.",
  },
  {
    id: "invoice-collection",
    title: "Invoice collection (illustrative)",
    summary:
      "Accounts receivable issues a crypto payable tied to an invoice id with explicit expiry and reconciliation.",
    disclaimer: "Example operational flow — not tax or legal advice.",
    goal: "Close invoices when policy-defined finality is met — with audit-friendly state history.",
    integration:
      "ERP or billing system creates payment via API; payer pays to returned instructions; webhooks update invoice status.",
    lifecycle:
      "Invoice open → Pending payment → Paid (detected) → Confirmed (final) or Expired. Partial payments may need custom handling.",
    reconciliation:
      "AR team matches Confirmed payments to open invoices. Expired attempts require re-issue or manual follow-up — not silent reuse.",
    webhooks:
      "Invoice consumer is idempotent. Duplicate webhook must not mark paid twice on split-payment mistakes.",
    finance:
      "Revenue recognition follows Confirmed mapping. FX and fees documented per your treasury rules.",
    support:
      "Collections uses payment_id in comms. “Wrong amount sent” cases land in exception queue — not automatic write-off.",
  },
];

export const PRODUCTION_REALITIES: Array<{ title: string; body: string }> = [
  {
    title: "Retries are normal",
    body: "Webhook delivery is at-least-once. Design consumers to tolerate duplicates and out-of-order arrivals where possible.",
  },
  {
    title: "Asynchronous by design",
    body: "Payers, chains, and your servers operate on different clocks. UI and finance should not assume synchronous finality.",
  },
  {
    title: "Eventual consistency",
    body: "API reads, webhooks, and portal views may briefly diverge during transitions. Reconciliation jobs exist to converge truth.",
  },
  {
    title: "Ordering considerations",
    body: "A Confirmed webhook might arrive before your handler processes Paid. State machines should tolerate non-linear arrival when ids match.",
  },
  {
    title: "Review windows",
    body: "Merchant approval and withdrawal controls introduce human time. That is operational maturity — not a broken product.",
  },
  {
    title: "Verification failures are operational signals",
    body: "Invalid signatures, clock skew, or secret rotation gaps should fail closed and surface in monitoring — not be masked as generic 500s.",
  },
  {
    title: "Reconciliation exceptions are expected",
    body: "Paid-but-not-confirmed, late confirmations, and mapping drift belong in an exception queue with owners — not silent auto-adjustment.",
  },
];

/** P19 — governance and ownership boundaries (institutional tone, no fake process claims). */
export const INSTITUTIONAL_GOVERNANCE: Array<{ title: string; body: string }> = [
  {
    title: "Ownership boundaries",
    body: "Engineering owns webhook verification, consumers, and deployment configuration. Finance owns recognition rules and period close. Product semantics define external states — your mapping is explicit and versioned.",
  },
  {
    title: "Escalation routing",
    body: "Classify issues by signal: delivery failures, signature errors, lifecycle mapping drift, reconciliation exceptions, or treasury controls. Route with payment_id and state history — not ad-hoc wallet access.",
  },
  {
    title: "Reconciliation responsibility",
    body: "Detection on the rail does not replace your books. Scheduled reconciliation compares authoritative API or event exports to internal orders — exceptions are reviewed, not assumed away.",
  },
  {
    title: "Operational review cycles",
    body: "Merchant access, rail enablement, and sensitive controls follow intake and review — not anonymous self-serve production keys. Changes to scope or rails are deliberate configuration events.",
  },
  {
    title: "Integration change management",
    body: "Webhook endpoints, secrets, and lifecycle mappings evolve. Treat secret rotation, schema adjustments, and consumer deploys as coordinated changes with rollback plans.",
  },
  {
    title: "Monitoring expectations",
    body: "Track non-2xx webhook responses, signature failure rates, growing exception queues, and stuck Paid states on your side. Operational issues usually appear in logs before finance escalations.",
  },
];

/** P19 — environment and rollout realism for docs/onboarding. */
export const ENVIRONMENT_REALITIES: Array<{ title: string; body: string }> = [
  {
    title: "Separate environments",
    body: "Non-production and production use distinct configuration: API credentials, webhook URLs, rails, and confirmation policy. Do not share secrets across environments.",
  },
  {
    title: "Scoped approval",
    body: "Approval can be partial: limited rails, staged access, or operational holds until mapping and monitoring meet your production bar.",
  },
  {
    title: "Configuration drift",
    body: "Portal settings, consumer code, and finance rules can diverge over time. Periodic alignment reviews reduce “paid in portal, wrong in ERP” incidents.",
  },
  {
    title: "Controlled rollout",
    body: "Rollout is sequenced: mapping agreement, verification tests, monitoring baselines, then production traffic — integrations mature over weeks, not a single deploy.",
  },
];

/** P19 — security page incident classes (procedural, not SOC theater). */
export const SECURITY_INCIDENT_CLASSES: Array<{ title: string; owner: string; body: string }> = [
  {
    title: "Delivery / transport",
    owner: "Merchant engineering",
    body: "TLS, DNS, timeouts, and HTTP errors on your webhook endpoint. Fix ingress and consumer availability first.",
  },
  {
    title: "Authentication / signature",
    owner: "Merchant engineering",
    body: "Secret mismatch, raw-body handling, or rotation drift. Fail closed; never parse untrusted payloads.",
  },
  {
    title: "Lifecycle mapping",
    owner: "Engineering + product ops",
    body: "Paid vs Confirmed semantics misaligned with entitlements or UI. Update state machines and documented mapping.",
  },
  {
    title: "Reconciliation exception",
    owner: "Finance + engineering",
    body: "Books diverge from authoritative payment states. Hold automated settlement until the exception queue is cleared per policy.",
  },
];

export const CONSTRAINT_PRINCIPLES: Array<{ title: string; why: string }> = [
  {
    title: "Merchant approval",
    why: "Gates production access and configuration so integrations match risk, geography, and rails you can support.",
  },
  {
    title: "Selected rails",
    why: "Enables only agreed networks and assets — failures at creation are preferable to silent partial support.",
  },
  {
    title: "Confirmation depth",
    why: "Separates detection from finality so finance and engineering do not share one overloaded “paid” boolean.",
  },
  {
    title: "Operational controls",
    why: "Withdrawal and sensitive actions follow policy — discipline that reduces unbounded automated movement.",
  },
  {
    title: "Signed webhooks",
    why: "Forces server-side verification before internal mutation — a boundary, not a convenience feature.",
  },
];

export const SUPPORT_MATURITY_SIGNALS: Array<{ title: string; body: string }> = [
  {
    title: "Onboarding coordination",
    body: "Intake, technical review, and environment enablement are coordinated — not a single anonymous signup button.",
  },
  {
    title: "Integration iteration",
    body: "Expect multiple webhook test cycles, idempotency fixes, and mapping clarifications across environments before steady production traffic.",
  },
  {
    title: "Webhook monitoring",
    body: "Monitor non-2xx delivery, signature failures, and consumer error rates on your side. Operational drift surfaces in logs before treasury escalations.",
  },
  {
    title: "Escalation paths",
    body: "Engineering owns verification and consumers; finance owns recognition rules and exception queues. Route with payment_id — not wallet access.",
  },
];
