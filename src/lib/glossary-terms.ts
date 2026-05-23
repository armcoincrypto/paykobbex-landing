import type { GuideSlug } from "@/lib/guides-meta";

/**
 * Canonical glossary entries for /glossary and /docs#glossary (single source of truth).
 * Copy is descriptive, bounded, and citation-friendly — not contractual enumeration.
 */
export type GlossaryGroupId =
  | "lifecycle"
  | "webhooks"
  | "operations"
  | "reconciliation"
  | "merchant";

export type GlossaryRelatedConcept = {
  href: string;
  label: string;
};

export type GlossaryTerm = {
  /** Stable anchor for /glossary#id */
  id: string;
  term: string;
  def: string;
  group: GlossaryGroupId;
  /** Optional deep links into evergreen guides */
  relatedGuides?: GuideSlug[];
  /** Optional cross-links to journal, hubs, or other glossary anchors */
  relatedConcepts?: GlossaryRelatedConcept[];
};

export const GLOSSARY_GROUPS: Array<{
  id: GlossaryGroupId;
  label: string;
  description: string;
  termIds: string[];
}> = [
  {
    id: "lifecycle",
    label: "Lifecycle semantics",
    description: "States, transitions, and machine-readable payment progression.",
    termIds: [
      "payment-lifecycle",
      "pending",
      "paid",
      "confirmed",
      "expired",
      "lifecycle-status",
      "payment",
      "payment-state-transition",
      "transaction-observation",
    ],
  },
  {
    id: "webhooks",
    label: "Webhooks & delivery",
    description: "Signed callbacks, secrets, idempotent consumption, and replay-safe handling.",
    termIds: [
      "signed-webhook",
      "webhook-secret",
      "idempotency",
      "webhook-verification",
      "raw-body-verification",
      "idempotent-processing",
      "duplicate-webhook-suppression",
      "replay-protection",
      "webhook-replay-window",
    ],
  },
  {
    id: "reconciliation",
    label: "Reconciliation architecture",
    description: "Three-plane alignment, exception discipline, and ledger mapping controls.",
    termIds: [
      "reconciliation",
      "three-plane-reconciliation",
      "commerce-reconciliation",
      "provider-reconciliation",
      "finance-reconciliation",
      "exception-queue",
      "merchant-ledger-state",
      "operational-drift",
    ],
  },
  {
    id: "operations",
    label: "Operations & finance",
    description: "Finality, recognition, settlement checkpoints, and treasury posting discipline.",
    termIds: [
      "merchant-balance",
      "settlement-finality",
      "confirmations",
      "policy-confirmation",
      "treasury-recognition",
      "operational-finality",
      "settlement-eligibility",
      "settlement-checkpoint",
      "asynchronous-settlement",
      "treasury-posting",
      "broadcast-acknowledgement",
    ],
  },
  {
    id: "merchant",
    label: "Merchant controls & rails",
    description: "Access gating, rail abstraction, settlement vs payout boundaries.",
    termIds: [
      "merchant-approval",
      "selected-rails",
      "withdrawal-request",
      "settlement-rail",
      "payout-rail",
      "payment-rail-abstraction",
      "payout-orchestration",
    ],
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "payment-lifecycle",
    term: "Payment lifecycle",
    def: "The progression of a single payment object through coarse states such as Pending, Paid, Confirmed, and terminal branches such as Expired. Exact names, ordering, and edge transitions depend on your approved deployment and enabled rails.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle", "payment-lifecycle-decision-tree"],
    relatedConcepts: [
      { href: "/glossary#payment-state-transition", label: "Payment state transition" },
      { href: "/blog/payment-infrastructure", label: "Payment infrastructure hub" },
    ],
  },
  {
    id: "pending",
    term: "Pending",
    def: "Payment created / awaiting detection; not a guarantee of eventual success.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle"],
  },
  {
    id: "paid",
    term: "Paid",
    def: "Payment detected but not final for your reconciliation rules (exact detection rules are deployment-specific). Not interchangeable with Confirmed — finance and entitlements should follow your confirmation policy, not detection alone.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle", "reconciliation-and-confirmations"],
    relatedConcepts: [{ href: "/glossary#transaction-observation", label: "Transaction observation" }],
  },
  {
    id: "confirmed",
    term: "Confirmed",
    def: "Confirmation semantics met for the rail and policy you operate under — the usual gate for finality when confirmations matter. Differs from Paid when detection precedes policy-defined finality.",
    group: "lifecycle",
    relatedGuides: ["reconciliation-and-confirmations", "payment-lifecycle"],
    relatedConcepts: [{ href: "/glossary#operational-finality", label: "Operational finality" }],
  },
  {
    id: "expired",
    term: "Expired",
    def: "Payment window ended or configuration marks the path as expired—typically terminal for the original attempt unless recreated.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle"],
  },
  {
    id: "lifecycle-status",
    term: "Lifecycle status",
    def: "A machine-readable label used for reconciliation and automation; treat enums as deployment-specific, not universal constants.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle", "reconciliation-and-confirmations"],
    relatedConcepts: [{ href: "/glossary#merchant-ledger-state", label: "Merchant ledger state" }],
  },
  {
    id: "payment",
    term: "Payment",
    def: "A server-created payable object with an amount, rail context, and stable `payment_id` used across API, portal, and webhooks.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle", "server-side-api-keys"],
  },
  {
    id: "payment-state-transition",
    term: "Payment state transition",
    def: "An auditable change from one lifecycle status to another, triggered by verified events, policy rules, or operator action—not an informal UI label update.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle", "payment-lifecycle-decision-tree"],
    relatedConcepts: [
      { href: "/glossary#lifecycle-status", label: "Lifecycle status" },
      { href: "/blog/payment-detection-vs-settlement-finality", label: "Detection vs finality" },
    ],
  },
  {
    id: "transaction-observation",
    term: "Transaction observation",
    def: "A rail-level signal that value moved or a payment attempt was detected. Observations start operational clocks; they do not by themselves authorize treasury posting or fulfillment.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle", "reconciliation-and-confirmations"],
    relatedConcepts: [{ href: "/glossary#paid", label: "Paid" }],
  },
  {
    id: "signed-webhook",
    term: "Signed webhook",
    def: "An HTTPS callback carrying a lifecycle event with a signature your backend verifies over raw body bytes before mutating internal state.",
    group: "webhooks",
    relatedGuides: ["webhook-verification", "webhook-replay-handling"],
    relatedConcepts: [{ href: "/glossary#raw-body-verification", label: "Raw-body verification" }],
  },
  {
    id: "webhook-secret",
    term: "Webhook secret",
    def: "Shared secret material used to verify webhook authenticity; must live in server-side configuration and secret stores—never in browsers, mobile apps, or public repositories.",
    group: "webhooks",
    relatedGuides: ["webhook-verification", "server-side-api-keys"],
  },
  {
    id: "idempotency",
    term: "Idempotency",
    def: "Applying the same logical event more than once without corrupting state. Required for webhook retries and other at-least-once delivery paths.",
    group: "webhooks",
    relatedGuides: ["webhook-verification", "webhook-replay-handling"],
    relatedConcepts: [{ href: "/glossary#idempotent-processing", label: "Idempotent processing" }],
  },
  {
    id: "webhook-verification",
    term: "Webhook verification",
    def: "Proving authenticity of a callback over raw request bytes with server-side secret material before mutating lifecycle or ledger state.",
    group: "webhooks",
    relatedGuides: ["webhook-verification"],
    relatedConcepts: [{ href: "/glossary#raw-body-verification", label: "Raw-body verification" }],
  },
  {
    id: "raw-body-verification",
    term: "Raw-body verification",
    def: "Computing and comparing a signature over the exact HTTP body bytes received—before JSON parsing or middleware re-encoding alters the payload.",
    group: "webhooks",
    relatedGuides: ["webhook-verification"],
    relatedConcepts: [
      { href: "/glossary#signed-webhook", label: "Signed webhook" },
      { href: "/guides/webhook-verification", label: "Webhook verification guide" },
    ],
  },
  {
    id: "idempotent-processing",
    term: "Idempotent processing",
    def: "Handler logic that produces the same durable outcome when the same logical event is delivered multiple times—typically enforced with event keys and uniqueness constraints.",
    group: "webhooks",
    relatedGuides: ["webhook-replay-handling"],
    relatedConcepts: [{ href: "/glossary#duplicate-webhook-suppression", label: "Duplicate webhook suppression" }],
  },
  {
    id: "duplicate-webhook-suppression",
    term: "Duplicate webhook suppression",
    def: "Mechanisms that detect and no-op repeated deliveries of the same event—distinct from rejecting forgeries; both are required under at-least-once delivery.",
    group: "webhooks",
    relatedGuides: ["webhook-replay-handling"],
    relatedConcepts: [{ href: "/blog/webhook-replay-ordering-controls", label: "Replay and ordering controls" }],
  },
  {
    id: "replay-protection",
    term: "Replay protection",
    def: "Controls that limit harm from re-delivered or captured webhook payloads—combining verification, idempotency keys, optional timestamp windows, and ordering rules.",
    group: "webhooks",
    relatedGuides: ["webhook-replay-handling"],
    relatedConcepts: [{ href: "/glossary#webhook-replay-window", label: "Webhook replay window" }],
  },
  {
    id: "webhook-replay-window",
    term: "Webhook replay window",
    def: "A policy-bound time range within which a signed callback is accepted; outside the window, handlers reject or quarantine events even when signatures verify.",
    group: "webhooks",
    relatedGuides: ["webhook-replay-handling"],
    relatedConcepts: [{ href: "/glossary#replay-protection", label: "Replay protection" }],
  },
  {
    id: "reconciliation",
    term: "Reconciliation",
    def: "Mapping external payment states to internal orders, entitlements, and accounting rules. You own the business mapping; product semantics define what statuses mean operationally.",
    group: "reconciliation",
    relatedGuides: ["reconciliation-and-confirmations", "reconciliation-checklist"],
    relatedConcepts: [
      { href: "/glossary#three-plane-reconciliation", label: "Three-plane reconciliation" },
      { href: "/blog/reconciliation", label: "Reconciliation hub" },
    ],
  },
  {
    id: "three-plane-reconciliation",
    term: "Three-plane reconciliation",
    def: "Aligning commerce records (orders/invoices), provider lifecycle signals (API/webhooks), and finance postings (ledger/treasury)—each plane may disagree until matchers and exception queues resolve gaps.",
    group: "reconciliation",
    relatedGuides: ["reconciliation-checklist"],
    relatedConcepts: [
      { href: "/glossary#commerce-reconciliation", label: "Commerce reconciliation" },
      { href: "/blog/three-plane-reconciliation-architecture", label: "Three-plane architecture" },
    ],
  },
  {
    id: "commerce-reconciliation",
    term: "Commerce reconciliation",
    def: "Matching payment attempts to commercial objects—orders, subscriptions, invoices—using stable references and tolerances defined by your business rules.",
    group: "reconciliation",
    relatedGuides: ["reconciliation-checklist"],
    relatedConcepts: [{ href: "/glossary#three-plane-reconciliation", label: "Three-plane reconciliation" }],
  },
  {
    id: "provider-reconciliation",
    term: "Provider reconciliation",
    def: "Aligning your internal payment state with provider-reported lifecycle events and balances—using verified webhooks, API reads, and audit trails rather than explorer screenshots alone.",
    group: "reconciliation",
    relatedGuides: ["reconciliation-and-confirmations"],
    relatedConcepts: [{ href: "/glossary#lifecycle-status", label: "Lifecycle status" }],
  },
  {
    id: "finance-reconciliation",
    term: "Finance reconciliation",
    def: "The books-ready alignment between recognized payments and ledger/treasury records—often the strictest plane, with explicit posting gates and period close sign-off.",
    group: "reconciliation",
    relatedGuides: ["treasury-recognition-flow", "reconciliation-checklist"],
    relatedConcepts: [{ href: "/glossary#treasury-posting", label: "Treasury posting" }],
  },
  {
    id: "exception-queue",
    term: "Exception queue",
    def: "A owned work queue for payments that fail automated matching—underpayments, wrong references, timing skew, or ambiguous rail outcomes—before silent posting or manual spreadsheet fixes.",
    group: "reconciliation",
    relatedGuides: ["reconciliation-checklist"],
    relatedConcepts: [{ href: "/blog/exception-taxonomy-crypto-payment-operations", label: "Exception taxonomy" }],
  },
  {
    id: "merchant-ledger-state",
    term: "Merchant ledger state",
    def: "Your internal representation of payment and balance outcomes under accounting rules—distinct from explorer visibility or a single lifecycle label on the provider side.",
    group: "reconciliation",
    relatedGuides: ["reconciliation-and-confirmations"],
    relatedConcepts: [{ href: "/glossary#merchant-balance", label: "Merchant balance" }],
  },
  {
    id: "operational-drift",
    term: "Operational drift",
    def: "Gradual divergence between commerce, provider, and finance planes—often from informal shortcuts, manual overrides, or unowned exception handling—detected through reconciliation controls.",
    group: "reconciliation",
    relatedGuides: ["reconciliation-checklist"],
    relatedConcepts: [{ href: "/blog/operational-settlement-drift-recovery", label: "Drift and recovery" }],
  },
  {
    id: "merchant-approval",
    term: "Merchant approval",
    def: "Access gating and environment setup required before API keys and rails are live for your integration.",
    group: "merchant",
    relatedGuides: ["merchant-onboarding"],
  },
  {
    id: "selected-rails",
    term: "Selected rails",
    def: "The enabled networks/assets and operational modes configured for your merchant account—not “everything everywhere.”",
    group: "merchant",
    relatedGuides: ["merchant-onboarding", "merchant-integration-architecture"],
    relatedConcepts: [{ href: "/glossary#payment-rail-abstraction", label: "Payment rail abstraction" }],
  },
  {
    id: "withdrawal-request",
    term: "Withdrawal request",
    def: "A merchant-initiated request to move funds subject to controls and configuration; not a promise of instant universal settlement.",
    group: "merchant",
    relatedGuides: ["merchant-onboarding", "settlement-vs-payout"],
    relatedConcepts: [{ href: "/glossary#payout-rail", label: "Payout rail" }],
  },
  {
    id: "settlement-rail",
    term: "Settlement rail",
    def: "The configured network/asset path used to observe and confirm inbound merchant payments—bounded to enabled rails, not an open-ended chain inventory.",
    group: "merchant",
    relatedGuides: ["settlement-vs-payout", "merchant-integration-architecture"],
    relatedConcepts: [{ href: "/glossary#selected-rails", label: "Selected rails" }],
  },
  {
    id: "payout-rail",
    term: "Payout rail",
    def: "The operational path for merchant-initiated fund movement after internal controls approve a withdrawal—distinct from inbound payment detection and confirmation.",
    group: "merchant",
    relatedGuides: ["settlement-vs-payout"],
    relatedConcepts: [{ href: "/glossary#payout-orchestration", label: "Payout orchestration" }],
  },
  {
    id: "payment-rail-abstraction",
    term: "Payment rail abstraction",
    def: "An integration layer that exposes stable payment semantics (amount, references, lifecycle) while rail-specific detection rules remain configuration-bound.",
    group: "merchant",
    relatedGuides: ["merchant-integration-architecture"],
    relatedConcepts: [{ href: "/glossary#settlement-rail", label: "Settlement rail" }],
  },
  {
    id: "payout-orchestration",
    term: "Payout orchestration",
    def: "The controlled workflow from approved withdrawal request through execution, status tracking, and finance recognition—subject to merchant policy, not automatic on every Confirmed payment.",
    group: "merchant",
    relatedGuides: ["settlement-vs-payout", "treasury-recognition-flow"],
  },
  {
    id: "merchant-balance",
    term: "Merchant balance",
    def: "A ledger-oriented view of funds attributed to your merchant account under product accounting rules—not a generic wallet slogan.",
    group: "operations",
    relatedConcepts: [{ href: "/glossary#merchant-ledger-state", label: "Merchant ledger state" }],
  },
  {
    id: "settlement-finality",
    term: "Settlement finality",
    def: "The point where your organization accepts economic outcome for operational and accounting purposes—often stricter than on-chain detection or a single lifecycle label. Rail, asset, and reversal policy matter.",
    group: "operations",
    relatedGuides: ["reconciliation-and-confirmations", "payment-lifecycle"],
    relatedConcepts: [{ href: "/glossary#operational-finality", label: "Operational finality" }],
  },
  {
    id: "confirmations",
    term: "Confirmations",
    def: "Depth or policy signals on a rail that inform risk before recognition. Confirmations reduce some risks; they do not replace merchant-specific posting rules or treasury policy.",
    group: "operations",
    relatedGuides: ["reconciliation-and-confirmations"],
  },
  {
    id: "policy-confirmation",
    term: "Policy confirmation",
    def: "The merchant-defined gate where a payment meets your configured rules for operational confirmation—distinct from explorer detection and from books-ready reconciliation.",
    group: "operations",
    relatedGuides: ["payment-lifecycle", "reconciliation-and-confirmations"],
    relatedConcepts: [{ href: "/glossary#settlement-checkpoint", label: "Settlement checkpoint" }],
  },
  {
    id: "treasury-recognition",
    term: "Treasury recognition",
    def: "When finance accepts funds for allocation, reporting, or release under internal controls—typically the strictest recognition moment in merchant operations.",
    group: "operations",
    relatedGuides: ["treasury-recognition-flow", "reconciliation-and-confirmations"],
    relatedConcepts: [{ href: "/glossary#treasury-posting", label: "Treasury posting" }],
  },
  {
    id: "operational-finality",
    term: "Operational finality",
    def: "The point where operations treats a payment as closed for fulfillment and support purposes—may precede or follow books-ready finance recognition depending on policy.",
    group: "operations",
    relatedGuides: ["payment-lifecycle", "reconciliation-and-confirmations"],
    relatedConcepts: [{ href: "/glossary#settlement-finality", label: "Settlement finality" }],
  },
  {
    id: "settlement-eligibility",
    term: "Settlement eligibility",
    def: "Whether a detected payment meets configured rules—amount, asset, reference, timing—to advance toward confirmation or treasury posting; ineligible attempts route to exception handling.",
    group: "operations",
    relatedGuides: ["reconciliation-checklist"],
    relatedConcepts: [{ href: "/glossary#exception-queue", label: "Exception queue" }],
  },
  {
    id: "settlement-checkpoint",
    term: "Settlement checkpoint",
    def: "An explicit control gate—automated or human—where a payment must satisfy policy before the next lifecycle or ledger transition is permitted.",
    group: "operations",
    relatedGuides: ["payment-lifecycle-decision-tree"],
    relatedConcepts: [{ href: "/glossary#policy-confirmation", label: "Policy confirmation" }],
  },
  {
    id: "asynchronous-settlement",
    term: "Asynchronous settlement",
    def: "Settlement outcomes that complete after initial detection—common on blockchains and batch treasury processes—requiring lifecycle states that do not collapse detection into finality.",
    group: "operations",
    relatedGuides: ["payment-lifecycle", "settlement-vs-payout"],
    relatedConcepts: [{ href: "/glossary#transaction-observation", label: "Transaction observation" }],
  },
  {
    id: "treasury-posting",
    term: "Treasury posting",
    def: "Recording funds in treasury or general ledger systems under finance controls—distinct from marking a payment Confirmed in the provider lifecycle.",
    group: "operations",
    relatedGuides: ["treasury-recognition-flow"],
    relatedConcepts: [{ href: "/glossary#finance-reconciliation", label: "Finance reconciliation" }],
  },
  {
    id: "broadcast-acknowledgement",
    term: "Broadcast acknowledgement",
    def: "Observing that a transaction was accepted by the network—useful operationally but not equivalent to confirmation depth, policy confirmation, or treasury posting.",
    group: "operations",
    relatedGuides: ["payment-lifecycle"],
    relatedConcepts: [{ href: "/glossary#transaction-observation", label: "Transaction observation" }],
  },
];

export function glossaryTermsForGroup(groupId: GlossaryGroupId): GlossaryTerm[] {
  const ids = GLOSSARY_GROUPS.find((g) => g.id === groupId)?.termIds ?? [];
  return ids
    .map((id) => GLOSSARY_TERMS.find((t) => t.id === id))
    .filter((t): t is GlossaryTerm => Boolean(t));
}
