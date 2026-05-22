import type { JournalHubSlug } from "@/lib/journal/types";
import { guidePath, type GuideSlug } from "@/lib/guides-meta";
import { journalHubPath } from "@/lib/journal/hubs";

export type TopicalClusterId =
  | "settlement"
  | "webhooks"
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
  relatedClusterIds: TopicalClusterId[];
};

/** Institutional topical clusters — one primary hub per cluster to limit cannibalization. */
export const TOPICAL_CLUSTERS: TopicalCluster[] = [
  {
    id: "settlement",
    name: "Settlement operations",
    hubSlug: "settlement-operations",
    primaryIntent:
      "Detection vs finality, confirmation policy, treasury recognition, and reconciliation semantics.",
    concepts: [
      { term: "Settlement finality", href: "/glossary#settlement-finality" },
      { term: "Policy confirmation", href: "/glossary#policy-confirmation" },
      { term: "Confirmations", href: "/glossary#confirmations" },
      { term: "Treasury recognition", href: "/glossary#treasury-recognition" },
      { term: "Reconciliation", href: "/glossary#reconciliation" },
    ],
    articleSlugs: ["payment-detection-vs-settlement-finality"],
    guideSlugs: ["payment-lifecycle", "reconciliation-and-confirmations"],
    relatedClusterIds: ["webhooks", "infrastructure"],
  },
  {
    id: "webhooks",
    name: "Webhook security",
    hubSlug: "webhook-security",
    primaryIntent:
      "Signed webhooks, raw-body verification, replay-safe delivery, and idempotent consumers.",
    concepts: [
      { term: "Signed webhook", href: "/glossary#signed-webhook" },
      { term: "Webhook verification", href: "/glossary#webhook-verification" },
      { term: "Webhook secret", href: "/glossary#webhook-secret" },
      { term: "Idempotency", href: "/glossary#idempotency" },
    ],
    articleSlugs: ["verify-crypto-webhooks-safely"],
    guideSlugs: ["webhook-verification", "server-side-api-keys"],
    relatedClusterIds: ["settlement", "infrastructure"],
  },
  {
    id: "infrastructure",
    name: "Payment infrastructure",
    hubSlug: "payment-infrastructure",
    primaryIntent:
      "Merchant rails, operational lifecycle, policy gating, and treasury orchestration boundaries.",
    concepts: [
      { term: "Payment lifecycle", href: "/glossary#payment-lifecycle" },
      { term: "Selected rails", href: "/glossary#selected-rails" },
      { term: "Merchant approval", href: "/glossary#merchant-approval" },
      { term: "Lifecycle status", href: "/glossary#lifecycle-status" },
    ],
    articleSlugs: ["production-grade-crypto-payment-infrastructure"],
    guideSlugs: ["merchant-onboarding", "server-side-api-keys"],
    relatedClusterIds: ["settlement", "webhooks", "stablecoin-operations"],
  },
  {
    id: "stablecoin-operations",
    name: "Stablecoin operations",
    hubSlug: "stablecoin-operations",
    primaryIntent:
      "USDT operational flows, treasury separation, network abstraction, and settlement vs payout.",
    concepts: [
      { term: "Treasury recognition", href: "/glossary#treasury-recognition" },
      { term: "Paid", href: "/glossary#paid" },
      { term: "Confirmed", href: "/glossary#confirmed" },
      { term: "Reconciliation", href: "/glossary#reconciliation" },
    ],
    articleSlugs: ["usdt-business-payments"],
    guideSlugs: ["payment-lifecycle", "reconciliation-and-confirmations"],
    relatedClusterIds: ["settlement", "infrastructure"],
  },
];

export const RECONCILIATION_CLUSTER_ARTICLE = "reliable-reconciliation-flows";

/** Reconciliation spans settlement + stablecoin; linked from settlement cluster without duplicate hub. */
export function getClusterForArticle(slug: string): TopicalCluster | undefined {
  if (slug === RECONCILIATION_CLUSTER_ARTICLE) {
    return TOPICAL_CLUSTERS.find((c) => c.id === "settlement");
  }
  return TOPICAL_CLUSTERS.find((c) => c.articleSlugs.includes(slug));
}

export function getClusterById(id: TopicalClusterId): TopicalCluster | undefined {
  return TOPICAL_CLUSTERS.find((c) => c.id === id);
}

export function clusterHubPath(id: TopicalClusterId): string {
  const cluster = getClusterById(id);
  return cluster ? journalHubPath(cluster.hubSlug) : "/blog";
}
