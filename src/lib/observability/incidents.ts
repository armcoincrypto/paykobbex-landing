/** Incident taxonomy and playbook routing — signal → class → playbook → reference. */

export type IncidentClassId =
  | "detection"
  | "settlement"
  | "webhook"
  | "provider"
  | "reconciliation"
  | "payout";

export type IncidentClass = {
  id: IncidentClassId;
  title: string;
  description: string;
  characteristicSignals: string[];
  primaryPlaybook: { href: string; label: string };
  secondaryPlaybooks: Array<{ href: string; label: string }>;
  references: Array<{ href: string; label: string }>;
};

export const INCIDENT_TAXONOMY: IncidentClass[] = [
  {
    id: "detection",
    title: "Detection incidents",
    description:
      "Payment attempts observed incorrectly, duplicated at source, or not attributed to commerce records—before policy confirmation.",
    characteristicSignals: ["Checkpoint lag at detection", "Duplicate chain sends", "Missing payment_id linkage"],
    primaryPlaybook: {
      href: "/playbooks/duplicate-payment-investigation",
      label: "Duplicate payment investigation",
    },
    secondaryPlaybooks: [{ href: "/playbooks/exception-queue-triage", label: "Exception queue triage" }],
    references: [
      { href: "/references/settlement-checkpoint-model", label: "Settlement checkpoint model" },
      { href: "/references/operational-signal-catalog", label: "Operational signal catalog" },
    ],
  },
  {
    id: "settlement",
    title: "Settlement incidents",
    description:
      "Lifecycle progression stalls between detection and policy confirmation—or confirmation policy cannot classify risk automatically.",
    characteristicSignals: ["Checkpoint lag", "Stuck Paid populations", "Confirmation policy triggers"],
    primaryPlaybook: {
      href: "/playbooks/delayed-settlement-recovery",
      label: "Delayed settlement recovery",
    },
    secondaryPlaybooks: [
      { href: "/playbooks/confirmation-policy-escalation", label: "Confirmation policy escalation" },
      { href: "/playbooks/settlement-operations-checklist", label: "Settlement operations checklist" },
    ],
    references: [
      { href: "/references/confirmation-policy-matrix", label: "Confirmation policy matrix" },
      { href: "/references/asynchronous-settlement-lifecycle", label: "Async settlement lifecycle" },
    ],
  },
  {
    id: "webhook",
    title: "Webhook incidents",
    description:
      "Signed event delivery, verification, ordering, or idempotency failures on merchant webhook consumers.",
    characteristicSignals: ["Webhook recency lag", "Verification failure spikes", "Duplicate side effects"],
    primaryPlaybook: {
      href: "/playbooks/webhook-secret-rotation",
      label: "Webhook secret rotation",
    },
    secondaryPlaybooks: [
      { href: "/playbooks/duplicate-payment-investigation", label: "Duplicate payment investigation" },
    ],
    references: [
      { href: "/references/webhook-delivery-expectations", label: "Webhook delivery model" },
      { href: "/references/provider-retry-semantics", label: "Provider retry semantics" },
    ],
  },
  {
    id: "provider",
    title: "Provider incidents",
    description:
      "Upstream API degradation, webhook gaps, or read failures that prevent authoritative provider plane updates.",
    characteristicSignals: ["Provider latency", "Webhook recency gap", "API error rate elevation"],
    primaryPlaybook: {
      href: "/playbooks/provider-outage-response",
      label: "Provider outage response",
    },
    secondaryPlaybooks: [
      { href: "/playbooks/reconciliation-close-procedure", label: "Reconciliation close (freeze)" },
    ],
    references: [
      { href: "/references/provider-retry-semantics", label: "Provider retry semantics" },
      { href: "/references/webhook-delivery-expectations", label: "Webhook delivery model" },
    ],
  },
  {
    id: "reconciliation",
    title: "Reconciliation incidents",
    description:
      "Persistent three-plane mismatch, exception queue overload, or period-close blockers requiring finance ownership.",
    characteristicSignals: ["Reconciliation drift", "Exception queue depth", "Matcher repeat failures"],
    primaryPlaybook: {
      href: "/playbooks/exception-queue-triage",
      label: "Exception queue triage",
    },
    secondaryPlaybooks: [
      { href: "/playbooks/reconciliation-close-procedure", label: "Reconciliation close procedure" },
      { href: "/playbooks/underpayment-overpayment-handling", label: "Under/overpayment handling" },
    ],
    references: [
      { href: "/references/reconciliation-state-model", label: "Reconciliation state model" },
      { href: "/references/operational-signal-catalog", label: "Operational signal catalog" },
    ],
  },
  {
    id: "payout",
    title: "Payout incidents",
    description:
      "Withdrawal requests blocked, ledger eligibility disagreements, or treasury review backlog threatening outbound movement.",
    characteristicSignals: ["Payout review backlog", "Ledger vs provider disagreement", "Recognition gate failures"],
    primaryPlaybook: {
      href: "/playbooks/merchant-payout-review",
      label: "Merchant payout review",
    },
    secondaryPlaybooks: [
      { href: "/playbooks/treasury-recognition-procedure", label: "Treasury recognition procedure" },
    ],
    references: [
      { href: "/references/merchant-ledger-transitions", label: "Merchant ledger transitions" },
      { href: "/references/payment-health-dashboard-model", label: "Payment health dashboard model" },
    ],
  },
];

export type PlaybookRoute = {
  signal: string;
  incidentClass: string;
  playbook: { href: string; label: string };
  reference: { href: string; label: string };
};

export const PLAYBOOK_ROUTING_MATRIX: PlaybookRoute[] = [
  {
    signal: "Webhook recency lag",
    incidentClass: "Webhook / Provider",
    playbook: { href: "/playbooks/payment-incident-triage", label: "Payment incident triage" },
    reference: { href: "/references/webhook-delivery-expectations", label: "Webhook delivery model" },
  },
  {
    signal: "Webhook recency lag (sustained, API errors)",
    incidentClass: "Provider",
    playbook: { href: "/playbooks/provider-outage-response", label: "Provider outage response" },
    reference: { href: "/references/provider-retry-semantics", label: "Provider retry semantics" },
  },
  {
    signal: "Checkpoint lag (detection → Paid)",
    incidentClass: "Detection / Settlement",
    playbook: { href: "/playbooks/delayed-settlement-recovery", label: "Delayed settlement recovery" },
    reference: { href: "/references/settlement-checkpoint-model", label: "Settlement checkpoint model" },
  },
  {
    signal: "Checkpoint lag (policy confirmation)",
    incidentClass: "Settlement",
    playbook: { href: "/playbooks/confirmation-policy-escalation", label: "Confirmation escalation" },
    reference: { href: "/references/confirmation-policy-matrix", label: "Confirmation policy matrix" },
  },
  {
    signal: "Exception queue depth rising",
    incidentClass: "Reconciliation",
    playbook: { href: "/playbooks/exception-queue-triage", label: "Exception queue triage" },
    reference: { href: "/references/reconciliation-state-model", label: "Reconciliation state model" },
  },
  {
    signal: "Reconciliation drift (repeat matcher failure)",
    incidentClass: "Reconciliation",
    playbook: { href: "/playbooks/reconciliation-close-procedure", label: "Reconciliation close" },
    reference: { href: "/references/reconciliation-state-model", label: "Reconciliation state model" },
  },
  {
    signal: "Provider latency / API errors",
    incidentClass: "Provider",
    playbook: { href: "/playbooks/provider-outage-response", label: "Provider outage response" },
    reference: { href: "/references/provider-retry-semantics", label: "Provider retry semantics" },
  },
  {
    signal: "Payout review backlog",
    incidentClass: "Payout",
    playbook: { href: "/playbooks/merchant-payout-review", label: "Merchant payout review" },
    reference: { href: "/references/merchant-ledger-transitions", label: "Ledger transitions" },
  },
  {
    signal: "Duplicate payment / replay side effects",
    incidentClass: "Webhook / Detection",
    playbook: { href: "/playbooks/duplicate-payment-investigation", label: "Duplicate investigation" },
    reference: { href: "/references/webhook-delivery-expectations", label: "Webhook delivery model" },
  },
  {
    signal: "Amount variance (under/over)",
    incidentClass: "Reconciliation",
    playbook: { href: "/playbooks/underpayment-overpayment-handling", label: "Under/overpayment handling" },
    reference: { href: "/references/reconciliation-state-model", label: "Reconciliation state model" },
  },
];

export const ROUTING_TABLE = {
  caption: "Start with payment incident triage when class is unclear; use rows below for direct routing.",
  headers: ["Signal", "Incident class", "Open playbook", "Supporting reference"],
  rows: PLAYBOOK_ROUTING_MATRIX.map((r) => [
    r.signal,
    r.incidentClass,
    r.playbook.label,
    r.reference.label,
  ]),
};
