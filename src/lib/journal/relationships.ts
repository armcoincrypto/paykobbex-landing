import type { JournalArticleRelations } from "@/lib/journal/types";
import { guidePath } from "@/lib/guides-meta";

const SERIES_NAME = "Crypto payment operations";

const DISTRIBUTION_SURFACES = [
  {
    href: "/research",
    label: "Research index",
    reason: "Curated operational research and reading order.",
  },
  {
    href: "/knowledge-map",
    label: "Knowledge map",
    reason: "Topical cluster graph for concepts, hubs, and guides.",
  },
] as const;

export const JOURNAL_RELATIONSHIPS: Record<string, JournalArticleRelations> = {
  "payment-detection-vs-settlement-finality": {
    series: { name: SERIES_NAME, position: 1, total: 5 },
    operationalConcepts: [
      "Payment detection",
      "Settlement finality",
      "Policy confirmation",
      "Confirmations",
      "Books finality",
    ],
    continueReading: [
      {
        slug: "reliable-reconciliation-flows",
        reason: "Design workflows that keep detection and finality separated in practice.",
      },
      {
        slug: "verify-crypto-webhooks-safely",
        reason: "Map verified events to lifecycle states finance can audit.",
      },
    ],
    operationalReferences: {
      guides: [
        {
          href: guidePath("reconciliation-and-confirmations"),
          label: "Reconciliation & confirmations",
          reason: "Align lifecycle vocabulary with accounting controls.",
        },
        {
          href: guidePath("payment-lifecycle"),
          label: "Payment lifecycle",
          reason: "Operational definitions for Pending, Paid, Confirmed.",
        },
      ],
      glossary: [
        { href: "/glossary#settlement-finality", label: "Settlement finality" },
        { href: "/glossary#confirmed", label: "Confirmed" },
        { href: "/glossary#paid", label: "Paid" },
        { href: "/glossary#policy-confirmation", label: "Policy confirmation" },
      ],
      concepts: [
        { label: "Detection vs finality", href: "/blog/settlement-operations" },
        { label: "Confirmation depth", href: "/glossary#confirmations" },
        { label: "Treasury recognition", href: "/glossary#treasury-recognition" },
      ],
      infrastructure: [
        {
          href: "/operations",
          label: "Operations",
          reason: "Public operational control framing.",
        },
        {
          href: "/editorial-principles",
          label: "Editorial principles",
          reason: "How Kobbopay Journal writes about operations.",
        },
      ],
    },
  },
  "verify-crypto-webhooks-safely": {
    series: { name: SERIES_NAME, position: 2, total: 5 },
    prerequisite: {
      slug: "payment-detection-vs-settlement-finality",
      label: "Payment detection vs settlement finality",
      reason: "Establish lifecycle vocabulary before wiring event handlers.",
    },
    operationalConcepts: [
      "Webhook verification",
      "Signed webhooks",
      "Idempotency",
      "Raw-body signatures",
      "Lifecycle mapping",
    ],
    continueReading: [
      {
        slug: "webhook-replay-ordering-controls",
        reason: "Replay protection and ordering beyond signature verification.",
      },
      {
        slug: "reliable-reconciliation-flows",
        reason: "Consume verified events into reconciliation-safe workflows.",
      },
      {
        slug: "production-grade-crypto-payment-infrastructure",
        reason: "Place webhooks inside broader infrastructure boundaries.",
      },
    ],
    operationalReferences: {
      guides: [
        {
          href: guidePath("webhook-verification"),
          label: "Webhook verification",
          reason: "Canonical verification patterns.",
        },
        {
          href: guidePath("server-side-api-keys"),
          label: "Server-side API keys",
          reason: "Secret storage boundaries.",
        },
      ],
      glossary: [
        { href: "/glossary#signed-webhook", label: "Signed webhook" },
        { href: "/glossary#webhook-secret", label: "Webhook secret" },
        { href: "/glossary#idempotency", label: "Idempotency" },
        { href: "/glossary#webhook-verification", label: "Webhook verification" },
      ],
      concepts: [
        { label: "Verification node", href: "/blog/webhook-security" },
        { label: "At-least-once delivery", href: "/blog/webhook-security" },
        { label: "Event-to-state mapping", href: "/guides/payment-lifecycle" },
      ],
      infrastructure: [
        { href: "/developers", label: "Developers", reason: "Integration entry points." },
        { href: "/docs", label: "Documentation", reason: "Technical reference surfaces." },
      ],
    },
  },
  "reliable-reconciliation-flows": {
    series: { name: SERIES_NAME, position: 3, total: 5 },
    prerequisite: {
      slug: "payment-detection-vs-settlement-finality",
      label: "Payment detection vs settlement finality",
      reason: "Finality language must be stable before designing reconciliation controls.",
    },
    operationalConcepts: [
      "Reconciliation",
      "Exception queues",
      "Ledger alignment",
      "Audit trails",
      "Merchant balance",
    ],
    continueReading: [
      {
        slug: "usdt-business-payments",
        reason: "Apply reconciliation discipline to stablecoin treasury flows.",
      },
      {
        slug: "production-grade-crypto-payment-infrastructure",
        reason: "Embed reconciliation in infrastructure architecture.",
      },
    ],
    operationalReferences: {
      guides: [
        {
          href: guidePath("reconciliation-and-confirmations"),
          label: "Reconciliation & confirmations",
          reason: "Evergreen reconciliation reference.",
        },
        {
          href: guidePath("payment-lifecycle"),
          label: "Payment lifecycle",
          reason: "Shared lifecycle vocabulary.",
        },
      ],
      glossary: [
        { href: "/glossary#reconciliation", label: "Reconciliation" },
        { href: "/glossary#merchant-balance", label: "Merchant balance" },
        { href: "/glossary#lifecycle-status", label: "Lifecycle status" },
      ],
      concepts: [
        { label: "Exception handling", href: "/blog/reconciliation" },
        { label: "Books-ready gates", href: "/blog/settlement-operations" },
        { label: "Internal order mapping", href: "/blog/reconciliation" },
      ],
      infrastructure: [
        { href: "/operations", label: "Operations", reason: "Operational control overview." },
        { href: "/glossary", label: "Glossary", reason: "Stable terms for audits." },
      ],
    },
  },
  "usdt-business-payments": {
    series: { name: SERIES_NAME, position: 4, total: 5 },
    prerequisite: {
      slug: "reliable-reconciliation-flows",
      label: "Reliable reconciliation flows",
      reason: "Treasury-grade stablecoin operations assume reconciliation discipline.",
    },
    operationalConcepts: [
      "USDT business payments",
      "Treasury visibility",
      "Rail context",
      "Treasury recognition",
      "Underpayment handling",
    ],
    continueReading: [
      {
        slug: "production-grade-crypto-payment-infrastructure",
        reason: "Consolidate stablecoin flows into production architecture.",
      },
      {
        slug: "payment-detection-vs-settlement-finality",
        reason: "Revisit finality language for treasury recognition policy.",
      },
    ],
    operationalReferences: {
      guides: [
        {
          href: guidePath("payment-lifecycle"),
          label: "Payment lifecycle",
          reason: "States for stablecoin payment attempts.",
        },
        {
          href: guidePath("reconciliation-and-confirmations"),
          label: "Reconciliation & confirmations",
          reason: "Recognition vs on-chain detection.",
        },
      ],
      glossary: [
        { href: "/glossary#treasury-recognition", label: "Treasury recognition" },
        { href: "/glossary#paid", label: "Paid" },
        { href: "/glossary#confirmed", label: "Confirmed" },
      ],
      concepts: [
        { label: "Stablecoin operations", href: "/blog/stablecoin-operations" },
        { label: "Treasury recognition", href: "/glossary#treasury-recognition" },
        { label: "Settlement operations", href: "/blog/settlement-operations" },
      ],
      infrastructure: [
        { href: "/use-cases", label: "Use cases", reason: "Merchant flow context." },
        { href: "/contact#merchant-intake", label: "Request access", reason: "Bounded integration review." },
      ],
    },
  },
  "production-grade-crypto-payment-infrastructure": {
    series: { name: SERIES_NAME, position: 5, total: 5 },
    prerequisite: {
      slug: "verify-crypto-webhooks-safely",
      label: "Verify crypto webhooks safely",
      reason: "Infrastructure design assumes verified, idempotent event consumption.",
    },
    operationalConcepts: [
      "Payment infrastructure",
      "Lifecycle semantics",
      "Server-side authority",
      "Selected rails",
      "Operational runbooks",
    ],
    continueReading: [
      {
        slug: "payment-detection-vs-settlement-finality",
        reason: "Return to foundational finality vocabulary.",
      },
    ],
    operationalReferences: {
      guides: [
        {
          href: guidePath("merchant-onboarding"),
          label: "Merchant onboarding",
          reason: "Approval and rail enablement.",
        },
        {
          href: guidePath("server-side-api-keys"),
          label: "Server-side API keys",
          reason: "Production secret boundaries.",
        },
      ],
      glossary: [
        { href: "/glossary#payment-lifecycle", label: "Payment lifecycle" },
        { href: "/glossary#selected-rails", label: "Selected rails" },
        { href: "/glossary#merchant-approval", label: "Merchant approval" },
      ],
      concepts: [
        { label: "Infrastructure architecture", href: "/blog/payment-infrastructure" },
        { label: "Webhook security", href: "/blog/webhook-security" },
        { label: "Reconciliation discipline", href: "/blog/reconciliation" },
      ],
      infrastructure: [
        { href: "/docs", label: "Documentation", reason: "Integration reference." },
        { href: "/about", label: "About Kobbopay", reason: "Institutional positioning." },
      ],
    },
  },
  "exception-taxonomy-crypto-payment-operations": {
    prerequisite: {
      slug: "reliable-reconciliation-flows",
      label: "Reliable reconciliation flows",
      reason: "Three-plane framing before naming exception classes.",
    },
    operationalConcepts: [
      "Exception queue",
      "Exception taxonomy",
      "Commerce reconciliation",
      "Finance reconciliation",
      "Operational drift",
    ],
    continueReading: [
      {
        slug: "three-plane-reconciliation-architecture",
        reason: "Structural model exceptions align against.",
      },
      {
        slug: "operational-settlement-drift-recovery",
        reason: "When unnamed exceptions become drift.",
      },
    ],
    operationalReferences: {
      guides: [
        {
          href: guidePath("reconciliation-checklist"),
          label: "Reconciliation checklist",
          reason: "Implementation control list.",
        },
        {
          href: guidePath("reconciliation-and-confirmations"),
          label: "Reconciliation & confirmations",
          reason: "Lifecycle alignment reference.",
        },
      ],
      glossary: [
        { href: "/glossary#exception-queue", label: "Exception queue" },
        { href: "/glossary#three-plane-reconciliation", label: "Three-plane reconciliation" },
        { href: "/glossary#operational-drift", label: "Operational drift" },
        { href: "/glossary#finance-reconciliation", label: "Finance reconciliation" },
      ],
      concepts: [
        { label: "Reconciliation hub", href: "/blog/reconciliation" },
        { label: "Settlement checkpoints", href: "/glossary#settlement-checkpoint" },
      ],
      infrastructure: [{ href: "/operations", label: "Operations", reason: "Control framing." }],
    },
  },
  "three-plane-reconciliation-architecture": {
    prerequisite: {
      slug: "reliable-reconciliation-flows",
      label: "Reliable reconciliation flows",
      reason: "Operational reconciliation vocabulary first.",
    },
    operationalConcepts: [
      "Three-plane reconciliation",
      "Commerce reconciliation",
      "Provider reconciliation",
      "Finance reconciliation",
      "Matcher design",
    ],
    continueReading: [
      {
        slug: "exception-taxonomy-crypto-payment-operations",
        reason: "Route plane mismatches into owned queues.",
      },
      {
        slug: "payment-detection-vs-settlement-finality",
        reason: "Finality language across planes.",
      },
    ],
    operationalReferences: {
      guides: [
        {
          href: guidePath("reconciliation-checklist"),
          label: "Reconciliation checklist",
          reason: "Plane-by-plane implementation steps.",
        },
        {
          href: guidePath("merchant-integration-architecture"),
          label: "Integration architecture",
          reason: "Layer boundaries between planes.",
        },
      ],
      glossary: [
        { href: "/glossary#three-plane-reconciliation", label: "Three-plane reconciliation" },
        { href: "/glossary#commerce-reconciliation", label: "Commerce reconciliation" },
        { href: "/glossary#provider-reconciliation", label: "Provider reconciliation" },
        { href: "/glossary#finance-reconciliation", label: "Finance reconciliation" },
        { href: "/glossary#merchant-ledger-state", label: "Merchant ledger state" },
      ],
      concepts: [{ label: "Reconciliation hub", href: "/blog/reconciliation" }],
      infrastructure: [{ href: "/docs", label: "Documentation", reason: "Integration reference." }],
    },
  },
  "operational-settlement-drift-recovery": {
    prerequisite: {
      slug: "payment-detection-vs-settlement-finality",
      label: "Payment detection vs settlement finality",
      reason: "Finality vocabulary before drift recovery.",
    },
    operationalConcepts: [
      "Operational drift",
      "Settlement checkpoint",
      "Async settlement",
      "Treasury posting",
      "Recovery playbook",
    ],
    continueReading: [
      {
        slug: "exception-taxonomy-crypto-payment-operations",
        reason: "Classify drift symptoms into exception taxonomy.",
      },
      {
        slug: "three-plane-reconciliation-architecture",
        reason: "Re-baseline planes during recovery.",
      },
    ],
    operationalReferences: {
      guides: [
        {
          href: guidePath("payment-lifecycle-decision-tree"),
          label: "Lifecycle decision tree",
          reason: "Checkpoint-oriented operator paths.",
        },
        {
          href: guidePath("reconciliation-checklist"),
          label: "Reconciliation checklist",
          reason: "Period close and matcher controls.",
        },
      ],
      glossary: [
        { href: "/glossary#operational-drift", label: "Operational drift" },
        { href: "/glossary#settlement-checkpoint", label: "Settlement checkpoint" },
        { href: "/glossary#asynchronous-settlement", label: "Asynchronous settlement" },
        { href: "/glossary#treasury-posting", label: "Treasury posting" },
      ],
      concepts: [
        { label: "Settlement operations hub", href: "/blog/settlement-operations" },
        { label: "Reconciliation hub", href: "/blog/reconciliation" },
      ],
      infrastructure: [{ href: "/operations", label: "Operations", reason: "Public control overview." }],
    },
  },
  "webhook-replay-ordering-controls": {
    prerequisite: {
      slug: "verify-crypto-webhooks-safely",
      label: "Verify crypto webhooks safely",
      reason: "Verification before replay and ordering controls.",
    },
    operationalConcepts: [
      "Replay protection",
      "Webhook replay window",
      "Duplicate webhook suppression",
      "Idempotent processing",
      "Event sequencing",
    ],
    continueReading: [
      {
        slug: "reliable-reconciliation-flows",
        reason: "Consume ordered events into reconciliation-safe workflows.",
      },
      {
        slug: "production-grade-crypto-payment-infrastructure",
        reason: "Place webhook controls inside infrastructure boundaries.",
      },
    ],
    operationalReferences: {
      guides: [
        {
          href: guidePath("webhook-replay-handling"),
          label: "Webhook replay handling",
          reason: "Implementation reference with worked example.",
        },
        {
          href: guidePath("webhook-verification"),
          label: "Webhook verification",
          reason: "Raw-body verification patterns.",
        },
      ],
      glossary: [
        { href: "/glossary#replay-protection", label: "Replay protection" },
        { href: "/glossary#webhook-replay-window", label: "Webhook replay window" },
        { href: "/glossary#duplicate-webhook-suppression", label: "Duplicate webhook suppression" },
        { href: "/glossary#idempotent-processing", label: "Idempotent processing" },
      ],
      concepts: [{ label: "Webhook security hub", href: "/blog/webhook-security" }],
      infrastructure: [{ href: "/developers", label: "Developers", reason: "Integration entry." }],
    },
  },
};

export function getJournalRelationships(slug: string): JournalArticleRelations {
  const base =
    JOURNAL_RELATIONSHIPS[slug] ?? {
      operationalConcepts: [],
      continueReading: [],
      operationalReferences: {
        guides: [],
        glossary: [],
        concepts: [],
        infrastructure: [],
      },
    };

  const existingHrefs = new Set(
    base.operationalReferences.infrastructure.map((l) => l.href),
  );
  const extraDistribution = DISTRIBUTION_SURFACES.filter(
    (l) => !existingHrefs.has(l.href),
  );

  return {
    ...base,
    operationalReferences: {
      ...base.operationalReferences,
      infrastructure: [
        ...base.operationalReferences.infrastructure,
        ...extraDistribution,
      ],
    },
  };
}
