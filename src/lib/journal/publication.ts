import type { JournalArticle } from "@/lib/journal/types";

export const JOURNAL_SERIES_ID = "crypto-payment-operations";

export const JOURNAL_SERIES = {
  id: JOURNAL_SERIES_ID,
  name: "Crypto payment operations",
  description:
    "A five-part operational research series on detection, webhooks, reconciliation, stablecoin treasury flows, and production infrastructure—written for finance, engineering, and payment operators.",
  /** Canonical reading order (no publication dates). */
  articleSlugs: [
    "payment-detection-vs-settlement-finality",
    "verify-crypto-webhooks-safely",
    "reliable-reconciliation-flows",
    "usdt-business-payments",
    "production-grade-crypto-payment-infrastructure",
  ] as const,
};

export const JOURNAL_RECONCILIATION_SERIES = {
  id: "reconciliation-operations",
  name: "Reconciliation operations",
  description:
    "Deep reconciliation research: three-plane architecture, exception taxonomy, and settlement drift recovery—for finance and payment operations teams.",
  articleSlugs: [
    "reliable-reconciliation-flows",
    "three-plane-reconciliation-architecture",
    "exception-taxonomy-crypto-payment-operations",
    "operational-settlement-drift-recovery",
  ] as const,
};

export const JOURNAL_WEBHOOK_DEPTH_SERIES = {
  id: "webhook-operations",
  name: "Webhook operations",
  description:
    "Verification, replay protection, and ordering discipline for at-least-once payment event delivery.",
  articleSlugs: ["verify-crypto-webhooks-safely", "webhook-replay-ordering-controls"] as const,
};

export type RoadmapEntryStatus = "published" | "planned";

export type JournalRoadmapEntry = {
  topic: string;
  status: RoadmapEntryStatus;
  slug?: string;
  cluster: string;
  note: string;
};

/** Topic roadmap for editorial cadence — planned entries have no fake dates. */
export const JOURNAL_TOPIC_ROADMAP: JournalRoadmapEntry[] = [
  {
    topic: "Payment detection vs settlement finality",
    status: "published",
    slug: "payment-detection-vs-settlement-finality",
    cluster: "Settlement",
    note: "Foundational vocabulary for finance and engineering alignment.",
  },
  {
    topic: "Signed webhook verification",
    status: "published",
    slug: "verify-crypto-webhooks-safely",
    cluster: "Webhooks",
    note: "Raw-body verification and idempotent consumption.",
  },
  {
    topic: "Reliable reconciliation flows",
    status: "published",
    slug: "reliable-reconciliation-flows",
    cluster: "Reconciliation",
    note: "Three-plane alignment and exception discipline.",
  },
  {
    topic: "USDT business payments",
    status: "published",
    slug: "usdt-business-payments",
    cluster: "Stablecoin operations",
    note: "Treasury lane vs settlement vs payout.",
  },
  {
    topic: "Production-grade payment infrastructure",
    status: "published",
    slug: "production-grade-crypto-payment-infrastructure",
    cluster: "Infrastructure",
    note: "Layered trust boundaries and lifecycle contracts.",
  },
  {
    topic: "Exception taxonomy for payment operations",
    status: "published",
    slug: "exception-taxonomy-crypto-payment-operations",
    cluster: "Reconciliation",
    note: "Structured exception classes for finance and support routing.",
  },
  {
    topic: "Three-plane reconciliation architecture",
    status: "published",
    slug: "three-plane-reconciliation-architecture",
    cluster: "Reconciliation",
    note: "Commerce, provider, and finance plane alignment.",
  },
  {
    topic: "Operational settlement drift and recovery",
    status: "published",
    slug: "operational-settlement-drift-recovery",
    cluster: "Settlement",
    note: "Checkpoint guardrails and bounded recovery playbooks.",
  },
  {
    topic: "Webhook replay and ordering controls",
    status: "published",
    slug: "webhook-replay-ordering-controls",
    cluster: "Webhooks",
    note: "Replay windows, duplicate suppression, and ordering guarantees.",
  },
];

/** One-paragraph machine-readable summary per article (derived from published copy). */
export const JOURNAL_ARTICLE_AI_SUMMARIES: Record<string, string> = {
  "payment-detection-vs-settlement-finality":
    "Explains why on-chain payment detection is not settlement finality or books-ready recognition, and how merchants should separate detection, policy confirmation, and reconciliation gates.",
  "verify-crypto-webhooks-safely":
    "Covers signed webhook verification over raw request bytes, idempotent handlers, and mapping verified events to explicit lifecycle states—not informal paid flags.",
  "reliable-reconciliation-flows":
    "Describes reconciliation as merchant-owned mapping between commerce, provider lifecycle signals, and finance records—with exception queues instead of silent posting.",
  "usdt-business-payments":
    "Frames USDT merchant flows with treasury recognition, network abstraction, and the operational distinction between settlement and payout requests.",
  "production-grade-crypto-payment-infrastructure":
    "Defines production infrastructure as layered server-side trust boundaries, lifecycle semantics, and bounded rails—not checkout widgets or marketing feature lists.",
  "exception-taxonomy-crypto-payment-operations":
    "Defines structured exception classes—amount, reference, timing, and rail mismatches—with owned queues and auditable resolution instead of informal overrides.",
  "three-plane-reconciliation-architecture":
    "Maps commerce, provider lifecycle, and finance reconciliation planes with explicit matchers and tolerances—without collapsing detection into books-ready finality.",
  "operational-settlement-drift-recovery":
    "Explains operational drift between planes, settlement checkpoint guardrails, and bounded recovery playbooks grounded in verified provider events.",
  "webhook-replay-ordering-controls":
    "Covers replay protection, duplicate suppression, out-of-order delivery, and provider retry semantics beyond raw-body signature verification.",
};

export function getArticleAiSummary(
  article: Pick<JournalArticle, "slug" | "excerpt" | "seoFocus">,
): string {
  return (
    JOURNAL_ARTICLE_AI_SUMMARIES[article.slug] ??
    `${article.excerpt} Topics: ${article.seoFocus.join("; ")}.`
  );
}
