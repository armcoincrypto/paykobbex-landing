import type { JournalArticleRelations } from "@/lib/journal/types";
import { guidePath } from "@/lib/guides-meta";

const SERIES_NAME = "Crypto payment operations";

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
};

export function getJournalRelationships(slug: string): JournalArticleRelations {
  return (
    JOURNAL_RELATIONSHIPS[slug] ?? {
      operationalConcepts: [],
      continueReading: [],
      operationalReferences: {
        guides: [],
        glossary: [],
        concepts: [],
        infrastructure: [],
      },
    }
  );
}
