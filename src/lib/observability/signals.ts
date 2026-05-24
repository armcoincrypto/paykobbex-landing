/** Bounded operational signals for payment systems observability — qualitative, not live metrics. */

export type OperationalSignalId =
  | "webhook-recency"
  | "checkpoint-lag"
  | "exception-queue-depth"
  | "reconciliation-drift"
  | "provider-latency"
  | "payout-review-backlog";

export type OperationalSignal = {
  id: OperationalSignalId;
  name: string;
  definition: string;
  healthyPattern: string;
  investigateWhen: string;
  typicalOwner: string;
  incidentClasses: string[];
};

export const OPERATIONAL_SIGNALS: OperationalSignal[] = [
  {
    id: "webhook-recency",
    name: "Webhook recency",
    definition:
      "Time since the last successfully verified webhook was processed for a merchant environment—or per-endpoint if you shard consumers.",
    healthyPattern:
      "Recency stays within thresholds you define per traffic profile; occasional gaps align with known quiet periods.",
    investigateWhen:
      "Recency grows while commerce or provider planes show activity; spikes after deploys or secret rotation.",
    typicalOwner: "Integration engineering / SRE",
    incidentClasses: ["Webhook", "Provider"],
  },
  {
    id: "checkpoint-lag",
    name: "Checkpoint lag",
    definition:
      "Elapsed time between lifecycle milestones (detection → eligibility → policy confirmation → finance reconciliation).",
    healthyPattern:
      "Lag distributions match rail and confirmation policy expectations documented internally.",
    investigateWhen:
      "Payments stall between checkpoints; lag grows faster than historical baseline for the same rail.",
    typicalOwner: "Payment operations",
    incidentClasses: ["Settlement", "Detection"],
  },
  {
    id: "exception-queue-depth",
    name: "Exception queue depth",
    definition:
      "Count of open, taxonomy-owned exceptions awaiting resolution—segmented by class and age bucket.",
    healthyPattern:
      "Depth stable or draining during business hours; new items match known noise patterns.",
    investigateWhen:
      "Depth grows monotonically; aging items exceed internal review targets; single class dominates.",
    typicalOwner: "Operations / finance",
    incidentClasses: ["Reconciliation", "Settlement"],
  },
  {
    id: "reconciliation-drift",
    name: "Reconciliation drift",
    definition:
      "Persistent mismatch between commerce, provider, and finance plane states after matchers run—not one-off timing skew.",
    healthyPattern:
      "Drift items are rare, classified, and tied to known async windows.",
    investigateWhen:
      "Same payment_id fails matchers repeatedly; drift clusters by rail, merchant, or time window.",
    typicalOwner: "Finance reconciliation",
    incidentClasses: ["Reconciliation"],
  },
  {
    id: "provider-latency",
    name: "Provider latency",
    definition:
      "Response time and error rate for provider API reads/writes and webhook delivery attempts—observed from your integration boundary.",
    healthyPattern:
      "Latency and error rates within bands you track per environment; retries succeed without handler exhaustion.",
    investigateWhen:
      "Elevated timeouts; read failures block status reconciliation; retry storms correlate with consumer crashes.",
    typicalOwner: "Integration engineering",
    incidentClasses: ["Provider", "Webhook"],
  },
  {
    id: "payout-review-backlog",
    name: "Payout review backlog",
    definition:
      "Open payout or withdrawal requests awaiting treasury review, dual control, or ledger eligibility confirmation.",
    healthyPattern:
      "Backlog drains on schedule; holds are policy-driven with documented reasons.",
    investigateWhen:
      "Requests exceed recognized balance checks; backlog grows during unrelated settlement incidents.",
    typicalOwner: "Treasury / finance",
    incidentClasses: ["Payout", "Reconciliation"],
  },
];

export const SIGNAL_CATALOG_TABLE = {
  caption: "Signal catalog summary — define thresholds internally; this site does not publish live metrics.",
  headers: ["Signal", "What it measures", "Typical owner", "Incident classes"],
  rows: OPERATIONAL_SIGNALS.map((s) => [
    s.name,
    s.definition.slice(0, 120) + (s.definition.length > 120 ? "…" : ""),
    s.typicalOwner,
    s.incidentClasses.join(", "),
  ]),
};
