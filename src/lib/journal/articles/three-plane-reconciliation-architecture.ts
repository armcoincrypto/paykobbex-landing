import type { JournalArticle } from "@/lib/journal/types";

export const threePlaneReconciliationArchitecture: JournalArticle = {
  slug: "three-plane-reconciliation-architecture",
  title: "Three-Plane Reconciliation Architecture for Crypto Payments",
  metaTitle: "Three-Plane Reconciliation Architecture",
  metaDescription:
    "Commerce, provider, and finance reconciliation planes for crypto payment operations—how to align orders, lifecycle signals, and ledger posting without collapsing detection into finality.",
  category: "Reconciliation & operations",
  hubSlug: "reconciliation",
  excerpt:
    "Reconciliation fails when teams optimize one plane. Orders, provider lifecycle, and finance books each tell a different story until matchers make the differences explicit.",
  seoFocus: [
    "three-way reconciliation crypto",
    "payment reconciliation architecture",
    "commerce provider finance alignment",
  ],
  keyTakeaways: [
    "Commerce plane tracks what you sold; provider plane tracks what the payment system observed; finance plane tracks what you recognized.",
    "Matchers should declare tolerances per plane pair—not one global “paid means done.”",
    "Disagreement is normal during async settlement; architecture should surface gaps, not hide them.",
    "Webhook-verified provider events feed provider plane; they do not automatically satisfy finance plane.",
    "Period close is a finance-plane ceremony with evidence from the other planes—not a script that runs once.",
  ],
  internalLinks: [
    {
      href: "/glossary#three-plane-reconciliation",
      label: "Three-plane reconciliation",
      reason: "Canonical glossary definition.",
    },
    {
      href: "/guides/reconciliation-checklist",
      label: "Reconciliation checklist",
      reason: "Operational implementation steps.",
    },
    {
      href: "/blog/payment-detection-vs-settlement-finality",
      label: "Detection vs finality",
      reason: "State separation vocabulary.",
    },
  ],
  faq: [
    {
      question: "Is three-plane reconciliation the same as three-way accounting reconciliation?",
      answer:
        "Related but not identical. This model separates commerce, provider lifecycle, and finance recognition for payment operations—especially when provider states arrive asynchronously via webhooks.",
    },
    {
      question: "Which plane should webhooks update?",
      answer:
        "Provider plane first—after verification and idempotency. Commerce and finance planes update through explicit rules and matchers, not implicit handler side effects.",
    },
    {
      question: "How often should planes be compared?",
      answer:
        "Continuously for high-volume merchants at the matcher level; at minimum daily with intraday alerts on material thresholds.",
    },
    {
      question: "What if planes disagree at month end?",
      answer:
        "That is why exception queues exist. Finance close should not force agreement by deleting provider history or overwriting commerce records.",
    },
  ],
  blocks: [
    {
      type: "p",
      text: "Single-plane thinking is seductive. Commerce sees an order marked paid. Engineering sees a Confirmed webhook. Finance sees a bank balance move. Each team declares victory. Month end reveals the gaps: entitlements posted without treasury recognition, or treasury moved without matching order references.",
    },
    {
      type: "p",
      text: "Three-plane reconciliation architecture names the planes, defines allowed transitions between them, and builds matchers that produce either alignment or a routed exception—not silent drift.",
    },
    {
      type: "h2",
      id: "planes",
      text: "The three planes",
    },
    {
      type: "definition",
      term: "Commerce reconciliation",
      text: "Matching payment attempts to orders, invoices, or subscriptions using merchant references and tolerances.",
    },
    {
      type: "definition",
      term: "Provider reconciliation",
      text: "Aligning internal state with verified provider lifecycle events and balances—not explorer screenshots alone.",
    },
    {
      type: "definition",
      term: "Finance reconciliation",
      text: "Books-ready alignment between recognized payments and ledger or treasury records under finance controls.",
    },
    {
      type: "h2",
      id: "data-flow",
      text: "Data flow without collapsing planes",
    },
    {
      type: "ol",
      items: [
        "Commerce creates payable intent with stable references and expected amount.",
        "Provider plane receives server-created payment object and lifecycle transitions.",
        "Verified webhooks update provider state through idempotent handlers.",
        "Matchers compare commerce ↔ provider on configured keys and tolerances.",
        "Finance matchers compare provider ↔ ledger using recognition policy.",
        "Exceptions route to taxonomy-owned queues when matchers fail.",
      ],
    },
    {
      type: "h2",
      id: "matchers",
      text: "Matcher design principles",
    },
    {
      type: "p",
      text: "Matchers are not one SQL join. Each plane pair may use different keys: commerce may key on order_id while provider keys on payment_id with a mapping table. Document tolerances for amount drift, timing windows, and partial payments explicitly.",
    },
    {
      type: "callout",
      title: "Design constraint",
      text: "If a matcher cannot explain why it matched two records, it will not explain mismatches to auditors either.",
    },
    {
      type: "h2",
      id: "async",
      text: "Async settlement across planes",
    },
    {
      type: "p",
      text: "Provider plane may show Paid while finance plane waits for Confirmed or treasury posting rules. Architecture should represent intermediate states without forcing commerce to pretend finality. Customer communications, fulfillment, and recognition can legitimately diverge when policy says so—as long as the divergence is configured, not accidental.",
    },
    {
      type: "h2",
      id: "controls",
      text: "Controls finance should demand",
    },
    {
      type: "ul",
      items: [
        "Immutable event log for provider plane transitions.",
        "Separation of duties on manual overrides.",
        "Exception resolution codes tied to taxonomy.",
        "Period close checklist referencing all three planes.",
        "Drift detection when planes diverge beyond thresholds.",
      ],
    },
    {
      type: "h2",
      id: "kobbopay-context",
      text: "Using provider semantics without outsourcing policy",
    },
    {
      type: "p",
      text: "Kobbopay describes explicit lifecycle semantics and signed webhooks as inputs to provider-plane alignment. Your finance plane still owns recognition timing, treasury posting, and exception ownership—bounded to configured rails and merchant environments.",
    },
  ],
};
