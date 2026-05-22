import type { JournalHub, JournalHubSlug } from "@/lib/journal/types";

export const JOURNAL_HUBS: JournalHub[] = [
  {
    slug: "settlement-operations",
    title: "Settlement operations",
    metaTitle: "Settlement Operations — Kobbopay Journal",
    metaDescription:
      "Editorial hub on crypto payment detection, confirmations, settlement finality, and finance-grade recognition discipline for B2B merchants.",
    eyebrow: "Topic hub · Settlement",
    lead: "How engineering observations become finance-grade recognition—and why detection, policy confirmation, and books finality must stay distinct.",
    introduction: [
      "Settlement operations is where blockchain visibility meets merchant policy. Teams that collapse “we saw funds” into “we can recognize revenue” inherit reconciliation debt, support escalations, and audit friction.",
      "This hub collects journal work on confirmations, finality language, and the operational boundaries between rail detection and books-ready states. It is written for finance operators, treasury leads, and integration engineers who share one lifecycle vocabulary.",
      "Kobbopay describes payment infrastructure with explicit lifecycle semantics—Pending, Paid, Confirmed, and terminal branches—bounded to configured rails and merchant environments. Nothing here replaces your accounting policy or legal agreements.",
    ],
    operationalThemes: [
      "Detection vs policy confirmation vs books finality",
      "Confirmation depth as risk input—not a universal guarantee",
      "Shared lifecycle vocabulary across finance and engineering",
      "Webhook and portal signals mapped to auditable states",
      "Human review gates for ambiguous rail outcomes",
    ],
    infrastructureConcepts: [
      {
        term: "Payment detection",
        description:
          "An observation that value moved on a monitored rail. Detection timestamps start operational clocks; they do not, by themselves, close books.",
      },
      {
        term: "Policy confirmation",
        description:
          "The merchant-defined gate where entitlements, fulfillment, or internal posting rules accept a payment as operationally confirmed under your deployment.",
      },
      {
        term: "Settlement boundary",
        description:
          "The control line where finance recognizes economic outcome—often stricter than explorer visibility or a single lifecycle label.",
      },
    ],
    relatedGuides: [
      { slug: "payment-lifecycle", reason: "Align coarse states across teams." },
      { slug: "reconciliation-and-confirmations", reason: "Separate detection from finality in controls." },
    ],
    semanticLinks: [
      {
        href: "/glossary#confirmed",
        label: "Confirmed",
        reason: "Lifecycle term used in audit conversations.",
      },
      {
        href: "/glossary#settlement-finality",
        label: "Settlement finality",
        reason: "Bounded definition for recognition language.",
      },
      {
        href: "/operations",
        label: "Operations overview",
        reason: "Public description of operational controls.",
      },
    ],
  },
  {
    slug: "webhook-security",
    title: "Webhook security",
    metaTitle: "Webhook Security — Kobbopay Journal",
    metaDescription:
      "Editorial hub on signed webhook verification, idempotent consumption, and integration discipline for crypto payment event delivery.",
    eyebrow: "Topic hub · Webhooks",
    lead: "At-least-once delivery is normal. Security and correctness come from verification, idempotency, and explicit lifecycle mapping—not from trusting payload shape alone.",
    introduction: [
      "Webhook security is not a checkbox on an integration guide. It is how your system survives retries, proxy buffering, partial deploys, and ambiguous chain events without corrupting orders or ledger postings.",
      "This hub groups journal articles on signature verification over raw bytes, secret handling, and the operational contract between delivery infrastructure and finance-facing state machines.",
      "Kobbopay positions signed webhooks as part of B2B payment infrastructure with server-side secrets and bounded rails—not as browser callbacks or informal notifications.",
    ],
    operationalThemes: [
      "Raw-body signature verification before mutation",
      "Idempotent handlers for duplicate delivery",
      "Secret rotation and environment separation",
      "Explicit mapping from events to lifecycle states",
      "Failure modes: replay, reorder, partial processing",
    ],
    infrastructureConcepts: [
      {
        term: "Signed webhook",
        description:
          "HTTPS callback with a verifiable signature over the exact bytes your handler processes—never a prettified JSON re-serialization.",
      },
      {
        term: "Idempotency",
        description:
          "Applying the same logical event multiple times without corrupting state; mandatory when delivery is at-least-once.",
      },
      {
        term: "Verification node",
        description:
          "The server-side checkpoint where authenticity is proven before lifecycle transitions propagate to internal systems.",
      },
    ],
    relatedGuides: [
      { slug: "webhook-verification", reason: "Canonical verification patterns." },
      { slug: "server-side-api-keys", reason: "Where secrets and keys belong." },
    ],
    semanticLinks: [
      { href: "/glossary#signed-webhook", label: "Signed webhook", reason: "Stable glossary anchor." },
      { href: "/glossary#idempotency", label: "Idempotency", reason: "Retry-safe consumption." },
      { href: "/developers", label: "Developers", reason: "Integration entry points." },
    ],
  },
  {
    slug: "reconciliation",
    title: "Reconciliation",
    metaTitle: "Reconciliation — Kobbopay Journal",
    metaDescription:
      "Editorial hub on reconciliation flows, ledger alignment, exception handling, and operational discipline for crypto payment operations.",
    eyebrow: "Topic hub · Reconciliation",
    lead: "Reconciliation is the routine work of aligning external payment signals with internal orders, entitlements, and accounting rules—owned by the merchant, informed by infrastructure semantics.",
    introduction: [
      "Reliable reconciliation is not a dashboard feature. It is a set of controls: stable identifiers, auditable transitions, exception queues, and language finance can defend under review.",
      "This hub collects journal writing on mapping lifecycle states to books, handling ambiguity, and designing workflows that stay calm under volume—not forensic under surprise.",
      "Kobbopay emphasizes reconciliation-oriented lifecycle language and merchant-owned business mapping. Product semantics define what statuses mean operationally; your policies define what is final.",
    ],
    operationalThemes: [
      "External signals vs internal order state",
      "Exception queues and human review paths",
      "Audit trails: timestamps, rail context, references",
      "Preventing informal “looks paid” shortcuts",
      "Periodic alignment with treasury and support",
    ],
    infrastructureConcepts: [
      {
        term: "Reconciliation",
        description:
          "Mapping external payment states to internal orders and accounting rules—you own the business mapping.",
      },
      {
        term: "Merchant balance",
        description:
          "Ledger-oriented view of attributed funds under product accounting rules—not a generic wallet balance slogan.",
      },
      {
        term: "Exception handling",
        description:
          "Operational path when amounts, memos, or rails do not match expectation—before silent posting.",
      },
    ],
    relatedGuides: [
      { slug: "reconciliation-and-confirmations", reason: "Confirmations vs books-ready gates." },
      { slug: "payment-lifecycle", reason: "Shared state vocabulary." },
    ],
    semanticLinks: [
      { href: "/glossary#reconciliation", label: "Reconciliation", reason: "Glossary definition." },
      { href: "/glossary#merchant-balance", label: "Merchant balance", reason: "Treasury-facing term." },
      { href: "/guides/reconciliation-and-confirmations", label: "Reconciliation guide", reason: "Evergreen reference." },
    ],
  },
  {
    slug: "payment-infrastructure",
    title: "Payment infrastructure",
    metaTitle: "Payment Infrastructure — Kobbopay Journal",
    metaDescription:
      "Editorial hub on production-grade crypto payment infrastructure: architecture discipline, lifecycle design, and enterprise integration patterns.",
    eyebrow: "Topic hub · Infrastructure",
    lead: "Production-grade payment infrastructure is an operational system—APIs, webhooks, lifecycle semantics, and controls—not a collection of chain adapters.",
    introduction: [
      "Infrastructure articles address how serious teams design boundaries: what is server-side only, what is merchant-configured, and what must never be implied by marketing language.",
      "This hub groups journal work on architecture choices, operational reliability, and the difference between demo integrations and environments finance will trust.",
      "Kobbopay is positioned as API-first B2B crypto payment infrastructure with reviewed merchant access, selected rails, and explicit operational procedures for production enablement.",
    ],
    operationalThemes: [
      "Server-side authority and secret boundaries",
      "Lifecycle machines finance can audit",
      "Environment separation and configuration discipline",
      "Operational runbooks—not feature lists",
      "Bounded claims aligned to deployment reality",
    ],
    infrastructureConcepts: [
      {
        term: "Lifecycle semantics",
        description:
          "Machine-readable states and transitions used for automation and reconciliation—not informal labels in support tickets.",
      },
      {
        term: "Selected rails",
        description:
          "Enabled networks and assets for your merchant environment—not universal multi-chain promises.",
      },
      {
        term: "Merchant approval",
        description:
          "Access gating and setup before keys and rails are live for production traffic.",
      },
    ],
    relatedGuides: [
      { slug: "server-side-api-keys", reason: "Secret and key boundaries." },
      { slug: "merchant-onboarding", reason: "Approval and rail enablement." },
    ],
    semanticLinks: [
      { href: "/docs", label: "Documentation", reason: "Technical integration reference." },
      { href: "/glossary#payment-lifecycle", label: "Payment lifecycle", reason: "Core vocabulary." },
      { href: "/features", label: "Features", reason: "Product surface overview." },
    ],
  },
  {
    slug: "stablecoin-operations",
    title: "Stablecoin operations",
    metaTitle: "Stablecoin Operations — Kobbopay Journal",
    metaDescription:
      "Editorial hub on USDT business payments, treasury visibility, and operational discipline for stablecoin merchant flows.",
    eyebrow: "Topic hub · Stablecoins",
    lead: "Stablecoin operations combine treasury expectations with rail-specific settlement behavior—where “stable” does not mean “simple for finance.”",
    introduction: [
      "Stablecoin merchant flows still require lifecycle discipline, reconciliation design, and clear language about detection versus recognition. Treasury teams care about attribution, exceptions, and audit trails—not ticker symbols.",
      "This hub collects journal work on USDT business payments and the operational controls that keep treasury, support, and engineering aligned under volume.",
      "Kobbopay describes stablecoin support as part of configured rails and merchant environments—bounded, reviewed, and operational—not as universal instant settlement.",
    ],
    operationalThemes: [
      "Treasury visibility vs explorer screenshots",
      "Rail-specific confirmation and exception behavior",
      "Invoice matching, memos, and underpayment handling",
      "Recognition policy for operational “stable” assets",
      "Coordination between treasury and integration teams",
    ],
    infrastructureConcepts: [
      {
        term: "Treasury recognition",
        description:
          "When finance accepts economic outcome for allocation and reporting—often stricter than on-chain visibility.",
      },
      {
        term: "Rail context",
        description:
          "Network, asset, and configuration boundaries that define what “paid” means for a given attempt.",
      },
      {
        term: "Operational stablecoin flow",
        description:
          "End-to-end path from payable creation through detection, confirmation policy, and reconciliation—not a single explorer check.",
      },
    ],
    relatedGuides: [
      { slug: "payment-lifecycle", reason: "States for stablecoin attempts." },
      { slug: "reconciliation-and-confirmations", reason: "Recognition vs detection." },
    ],
    semanticLinks: [
      { href: "/glossary#treasury-recognition", label: "Treasury recognition", reason: "Finance-grade term." },
      { href: "/glossary#paid", label: "Paid", reason: "Not interchangeable with Confirmed." },
      { href: "/pricing", label: "Pricing", reason: "Commercial context for merchants." },
    ],
  },
];

export const JOURNAL_HUB_SLUGS = JOURNAL_HUBS.map((h) => h.slug);

export function journalHubPath(slug: JournalHubSlug): string {
  return `/blog/${slug}`;
}

export function getJournalHub(slug: string): JournalHub | undefined {
  return JOURNAL_HUBS.find((h) => h.slug === slug);
}
