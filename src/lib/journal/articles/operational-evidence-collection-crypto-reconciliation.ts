import type { JournalArticle } from "@/lib/journal/types";

export const operationalEvidenceCollection: JournalArticle = {
  slug: "operational-evidence-collection-crypto-reconciliation",
  title: "Operational Evidence Collection in Crypto Payment Reconciliation",
  metaTitle: "Operational Evidence Collection for Reconciliation",
  metaDescription:
    "What finance and operations should retain for crypto payment reconciliation—payment_id trails, provider events, and commerce references without explorer-only audits.",
  category: "Reconciliation & operations",
  hubSlug: "reconciliation",
  excerpt:
    "Audits fail when evidence lives in chat screenshots. Evidence collection defines what to retain from commerce, provider, and finance planes—before exceptions become disputes.",
  seoFocus: ["reconciliation evidence", "payment audit trail", "crypto payment operations"],
  keyTakeaways: [
    "Evidence packages should be reconstructable from systems—not ad hoc explorer links.",
    "Provider plane evidence starts with verified webhook logs and API reads—not informal status.",
    "Commerce plane evidence ties payment_id to order references with tolerance metadata.",
    "Finance plane evidence links posting decisions to reconciliation matcher outcomes.",
    "Exception resolution codes must reference the same identifiers finance uses at close.",
  ],
  internalLinks: [
    { href: "/playbooks/reconciliation-close-procedure", label: "Reconciliation close playbook", reason: "Close ceremony." },
    { href: "/references/reconciliation-state-model", label: "Reconciliation state model", reason: "Plane vocabulary." },
  ],
  faq: [
    {
      question: "Is a block explorer screenshot sufficient evidence?",
      answer:
        "Rarely alone. Explorers help investigate but are not your system of record. Pair external observation with provider payment_id events and internal matcher outcomes.",
    },
    {
      question: "How long should webhook bodies be retained?",
      answer: "Follow security and privacy policy—often redacted or hashed payloads with identifiers, not indefinite raw secret-adjacent archives in unsecured stores.",
    },
    {
      question: "What is the minimum identifier set?",
      answer: "payment_id, merchant reference, rail context, lifecycle timestamps, exception class, resolution actor, and matcher version/tolerances used at close.",
    },
    {
      question: "Does Kobbopay define retention periods?",
      answer: "Public materials describe operational discipline; retention schedules remain merchant-owned and jurisdiction-specific.",
    },
  ],
  blocks: [
    {
      type: "p",
      text: "Reconciliation disputes are won or lost on evidence quality, not on how quickly someone can open a block explorer. When commerce, provider, and finance planes disagree, teams need a shared evidence package that explains what each system knew, when it knew it, and who approved transitions.",
    },
    {
      type: "h2",
      id: "package",
      text: "Minimum evidence package",
    },
    {
      type: "ul",
      items: [
        "payment_id and merchant reference used across planes.",
        "Provider lifecycle timeline from verified events (not handler logs alone).",
        "Commerce order state at detection, confirmation, and fulfillment gates.",
        "Finance posting records with approval metadata.",
        "Matcher outcome: auto-matched, exception class, or manual override code.",
      ],
    },
    {
      type: "h2",
      id: "collection",
      text: "Collection discipline during operations",
    },
    {
      type: "p",
      text: "Collect evidence at exception creation—not only at month end. Exception queues should store structured fields finance can export. Support narratives belong in supplemental notes, not as the sole system of record.",
    },
    {
      type: "callout",
      title: "Freeze note",
      text: "During reconciliation freeze, preserve matcher configuration versions so close results are reproducible.",
    },
    {
      type: "h2",
      id: "provider",
      text: "Provider plane specifics",
    },
    {
      type: "p",
      text: "Store verification outcomes (pass/fail) with correlation ids. For duplicates, retain idempotency keys that explain why later events no-oped. For outages, retain gap windows and backfill batches used after recovery.",
    },
    {
      type: "p",
      text: "Kobbopay emphasizes signed webhooks and explicit lifecycle semantics as inputs—your evidence model should show how those signals mapped to internal states under your policy.",
    },
  ],
};
