import type { JournalArticle } from "@/lib/journal/types";

export const operationalSettlementDriftRecovery: JournalArticle = {
  slug: "operational-settlement-drift-recovery",
  title: "Operational Settlement Drift and Recovery in Crypto Payments",
  metaTitle: "Operational Settlement Drift and Recovery",
  metaDescription:
    "Detecting and recovering operational drift when commerce, provider lifecycle, and finance planes diverge—settlement checkpoints, reconciliation signals, and bounded recovery playbooks.",
  category: "Settlement & confirmations",
  hubSlug: "settlement-operations",
  excerpt:
    "Drift is the slow misalignment between what sales thinks happened, what webhooks recorded, and what finance recognized. Recovery requires checkpoints—not another dashboard.",
  seoFocus: [
    "settlement drift payment operations",
    "operational drift recovery",
    "payment reconciliation recovery",
  ],
  keyTakeaways: [
    "Drift accumulates from informal overrides, missing idempotency, and ambiguous finality language.",
    "Settlement checkpoints make progression explicit—automation cannot skip gates without recorded approval.",
    "Recovery playbooks start with re-baselining provider event logs, not rewriting commerce history.",
    "Treasury recognition should lag policy confirmation by design when controls require it.",
    "Post-incident reviews should update taxonomy and matchers—not only blame a single handler bug.",
  ],
  internalLinks: [
    {
      href: "/glossary#operational-drift",
      label: "Operational drift",
      reason: "Definition anchor.",
    },
    {
      href: "/blog/three-plane-reconciliation-architecture",
      label: "Three-plane architecture",
      reason: "Structural model for drift detection.",
    },
    {
      href: "/guides/payment-lifecycle-decision-tree",
      label: "Lifecycle decision tree",
      reason: "Checkpoint-oriented operator paths.",
    },
  ],
  faq: [
    {
      question: "How is drift different from an exception?",
      answer:
        "Exceptions are point-in-time mismatches with identifiable records. Drift is systematic divergence—often from repeated informal fixes that never closed the underlying control gap.",
    },
    {
      question: "Can drift be detected automatically?",
      answer:
        "Partially. Compare plane totals, aging unmatched records, and lifecycle states stuck between checkpoints. Human review still validates root cause.",
    },
    {
      question: "Should we rebuild state from chain explorers?",
      answer:
        "Explorers help investigate; they are not your system of record. Recovery should replay verified provider events and commerce references, then realign finance with documented approval.",
    },
    {
      question: "What prevents drift from returning?",
      answer:
        "Named checkpoints, exception taxonomy enforcement, and removing support shortcuts that bypass provider-plane transitions.",
    },
  ],
  blocks: [
    {
      type: "p",
      text: "Drift rarely arrives as a catastrophic outage. It arrives as small compromises: a webhook handler that sets “paid” on detection, a finance analyst who posts from a portal export, a product manager who adds a fulfillment shortcut for VIP customers. Each compromise is defensible in isolation. Together they erode settlement discipline until month end becomes archaeology.",
    },
    {
      type: "definition",
      term: "Operational drift",
      text: "Gradual divergence between commerce, provider, and finance planes—often from unowned exceptions and informal overrides.",
    },
    {
      type: "h2",
      id: "signals",
      text: "Early signals finance and engineering both miss",
    },
    {
      type: "ul",
      items: [
        "Growing count of lifecycle states manually edited outside webhook flow.",
        "Support macros that reference explorer links instead of payment_id.",
        "Matcher auto-resolve rate climbing without documented tolerance changes.",
        "Treasury postings timestamped before provider Confirmed events.",
        "Repeat exception classes closed with generic “other” codes.",
      ],
    },
    {
      type: "h2",
      id: "checkpoints",
      text: "Settlement checkpoints as drift guardrails",
    },
    {
      type: "p",
      text: "Checkpoints encode policy: which transitions require automated matchers, which require human approval, and which are forbidden entirely. Without checkpoints, teams debate finality in tickets instead of configuration.",
    },
    {
      type: "definition",
      term: "Settlement checkpoint",
      text: "An explicit gate where a payment must satisfy policy before the next lifecycle or ledger transition.",
    },
    {
      type: "h2",
      id: "recovery",
      text: "Recovery playbook (bounded)",
    },
    {
      type: "ol",
      items: [
        "Freeze informal override tools during investigation window.",
        "Export immutable provider event log for affected period.",
        "Re-run matchers commerce ↔ provider with unchanged tolerances.",
        "Classify gaps using exception taxonomy—do not merge classes for speed.",
        "Finance re-posts or reverses with documented approval tied to payment_id.",
        "Add or tighten checkpoints that would have blocked the drift path.",
      ],
    },
    {
      type: "callout",
      title: "Recovery anti-pattern",
      text: "Bulk-updating commerce orders to match finance without provider-plane evidence recreates the drift you are trying to eliminate.",
    },
    {
      type: "h2",
      id: "async-settlement",
      text: "Drift during asynchronous settlement",
    },
    {
      type: "p",
      text: "Async settlement is legitimate. Drift is not. When detection precedes confirmation by hours or days, planes should represent intermediate truth—not collapse to a single “done” flag because marketing promised instant delivery.",
    },
    {
      type: "h2",
      id: "governance",
      text: "Governance that sticks",
    },
    {
      type: "p",
      text: "Assign drift metrics to operational reviews: unmatched value by plane pair, exception age, override counts by role. Tie engineering roadmap items to drift root causes, not only uptime. Kobbopay’s public positioning on explicit lifecycles and reconciliation language supports this governance—implementation remains merchant-owned.",
    },
  ],
};
