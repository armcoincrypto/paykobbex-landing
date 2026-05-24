import type { JournalHubSlug } from "@/lib/journal/types";
import type { GuideSlug } from "@/lib/guides-meta";
import type { PlaybookSlug } from "@/lib/playbooks/meta";
import type { ReferenceSlug } from "@/lib/references/meta";
import { journalHubPath } from "@/lib/journal/hubs";

export type TopicalClusterId =
  | "settlement"
  | "webhooks"
  | "reconciliation"
  | "infrastructure"
  | "stablecoin-operations";

export type TopicalCluster = {
  id: TopicalClusterId;
  name: string;
  hubSlug: JournalHubSlug;
  primaryIntent: string;
  concepts: Array<{ term: string; href: string }>;
  articleSlugs: string[];
  guideSlugs: GuideSlug[];
  playbookSlugs: PlaybookSlug[];
  referenceSlugs: ReferenceSlug[];
  relatedClusterIds: TopicalClusterId[];
};

/** Institutional topical clusters — one primary hub per cluster to limit cannibalization. */
export const TOPICAL_CLUSTERS: TopicalCluster[] = [
  {
    id: "settlement",
    name: "Settlement operations",
    hubSlug: "settlement-operations",
    primaryIntent:
      "Detection vs finality, confirmation policy, treasury recognition, and settlement checkpoint discipline.",
    concepts: [
      { term: "Settlement finality", href: "/glossary#settlement-finality" },
      { term: "Policy confirmation", href: "/glossary#policy-confirmation" },
      { term: "Operational finality", href: "/glossary#operational-finality" },
      { term: "Settlement checkpoint", href: "/glossary#settlement-checkpoint" },
      { term: "Treasury recognition", href: "/glossary#treasury-recognition" },
    ],
    articleSlugs: [
      "payment-detection-vs-settlement-finality",
      "operational-settlement-drift-recovery",
      "settlement-checkpoint-escalation-patterns",
    ],
    guideSlugs: ["payment-lifecycle", "payment-lifecycle-decision-tree", "settlement-vs-payout"],
    playbookSlugs: [
      "settlement-operations-checklist",
      "delayed-settlement-recovery",
      "confirmation-policy-escalation",
      "payment-incident-triage",
    ],
    referenceSlugs: [
      "confirmation-policy-matrix",
      "settlement-checkpoint-model",
      "asynchronous-settlement-lifecycle",
      "operational-signal-catalog",
      "payment-health-dashboard-model",
    ],
    relatedClusterIds: ["reconciliation", "webhooks", "infrastructure"],
  },
  {
    id: "webhooks",
    name: "Webhook security",
    hubSlug: "webhook-security",
    primaryIntent:
      "Signed webhooks, raw-body verification, replay protection, idempotent consumers, and ordering discipline.",
    concepts: [
      { term: "Signed webhook", href: "/glossary#signed-webhook" },
      { term: "Raw-body verification", href: "/glossary#raw-body-verification" },
      { term: "Replay protection", href: "/glossary#replay-protection" },
      { term: "Idempotent processing", href: "/glossary#idempotent-processing" },
      { term: "Webhook replay window", href: "/glossary#webhook-replay-window" },
    ],
    articleSlugs: ["verify-crypto-webhooks-safely", "webhook-replay-ordering-controls"],
    guideSlugs: ["webhook-verification", "webhook-replay-handling", "server-side-api-keys"],
    playbookSlugs: ["webhook-secret-rotation", "provider-outage-response", "payment-incident-triage"],
    referenceSlugs: ["provider-retry-semantics", "webhook-delivery-expectations", "operational-signal-catalog"],
    relatedClusterIds: ["settlement", "reconciliation", "infrastructure"],
  },
  {
    id: "reconciliation",
    name: "Reconciliation",
    hubSlug: "reconciliation",
    primaryIntent:
      "Three-plane alignment, exception queues, finance reconciliation, and merchant-owned ledger mapping.",
    concepts: [
      { term: "Three-plane reconciliation", href: "/glossary#three-plane-reconciliation" },
      { term: "Exception queue", href: "/glossary#exception-queue" },
      { term: "Commerce reconciliation", href: "/glossary#commerce-reconciliation" },
      { term: "Finance reconciliation", href: "/glossary#finance-reconciliation" },
      { term: "Operational drift", href: "/glossary#operational-drift" },
    ],
    articleSlugs: [
      "reliable-reconciliation-flows",
      "exception-taxonomy-crypto-payment-operations",
      "three-plane-reconciliation-architecture",
      "operational-evidence-collection-crypto-reconciliation",
      "reconciling-asynchronous-settlement-systems",
    ],
    guideSlugs: ["reconciliation-and-confirmations", "reconciliation-checklist"],
    playbookSlugs: [
      "reconciliation-close-procedure",
      "exception-queue-triage",
      "duplicate-payment-investigation",
      "underpayment-overpayment-handling",
      "payment-incident-triage",
    ],
    referenceSlugs: ["reconciliation-state-model", "merchant-ledger-transitions", "operational-signal-catalog"],
    relatedClusterIds: ["settlement", "webhooks", "stablecoin-operations"],
  },
  {
    id: "infrastructure",
    name: "Payment infrastructure",
    hubSlug: "payment-infrastructure",
    primaryIntent:
      "Merchant rails, operational lifecycle, policy gating, and treasury orchestration boundaries.",
    concepts: [
      { term: "Payment lifecycle", href: "/glossary#payment-lifecycle" },
      { term: "Payment rail abstraction", href: "/glossary#payment-rail-abstraction" },
      { term: "Selected rails", href: "/glossary#selected-rails" },
      { term: "Merchant approval", href: "/glossary#merchant-approval" },
    ],
    articleSlugs: ["production-grade-crypto-payment-infrastructure"],
    guideSlugs: ["merchant-integration-architecture", "merchant-onboarding", "server-side-api-keys"],
    playbookSlugs: ["merchant-onboarding-rollout", "provider-outage-response", "payment-incident-triage"],
    referenceSlugs: ["rail-selection-matrix", "operational-signal-catalog", "payment-health-dashboard-model"],
    relatedClusterIds: ["settlement", "webhooks", "reconciliation", "stablecoin-operations"],
  },
  {
    id: "stablecoin-operations",
    name: "Stablecoin operations",
    hubSlug: "stablecoin-operations",
    primaryIntent:
      "USDT operational flows, treasury separation, network abstraction, and settlement vs payout.",
    concepts: [
      { term: "Treasury recognition", href: "/glossary#treasury-recognition" },
      { term: "Treasury posting", href: "/glossary#treasury-posting" },
      { term: "Settlement rail", href: "/glossary#settlement-rail" },
      { term: "Payout rail", href: "/glossary#payout-rail" },
    ],
    articleSlugs: ["usdt-business-payments"],
    guideSlugs: ["treasury-recognition-flow", "settlement-vs-payout", "payment-lifecycle"],
    playbookSlugs: ["treasury-recognition-procedure", "merchant-payout-review", "payment-incident-triage"],
    referenceSlugs: [
      "merchant-ledger-transitions",
      "asynchronous-settlement-lifecycle",
      "payment-health-dashboard-model",
    ],
    relatedClusterIds: ["settlement", "reconciliation", "infrastructure"],
  },
];

export function getClusterForArticle(slug: string): TopicalCluster | undefined {
  return TOPICAL_CLUSTERS.find((c) => c.articleSlugs.includes(slug));
}

export function getClusterById(id: TopicalClusterId): TopicalCluster | undefined {
  return TOPICAL_CLUSTERS.find((c) => c.id === id);
}

export function clusterHubPath(id: TopicalClusterId): string {
  const cluster = getClusterById(id);
  return cluster ? journalHubPath(cluster.hubSlug) : "/blog";
}
