import type { JournalArticle } from "@/lib/journal/types";

export const reliableReconciliationFlows: JournalArticle = {
  slug: "reliable-reconciliation-flows",
  title: "Designing Reliable Reconciliation Flows for Crypto Payments",
  metaTitle: "Reliable Crypto Reconciliation Flows",
  metaDescription:
    "Crypto reconciliation and treasury reconciliation patterns for payment operations teams—matching, exceptions, and books discipline without false finality.",
  category: "Reconciliation & operations",
  hubSlug: "reconciliation",
  excerpt:
    "Reconciliation is where payment operations earn trust. Design matchers, exception queues, and period close rituals that respect detection versus finality.",
  seoFocus: ["crypto reconciliation", "payment operations", "treasury reconciliation"],
  keyTakeaways: [
    "Reconciliation is a system of record alignment—not a one-shot script at month-end.",
    "Use three-way thinking: expected commerce events, provider lifecycle, and ledger postings.",
    "Exception queues with owners beat silent adjustments in spreadsheets.",
    "Automate matching only where tolerances and references are explicitly defined per rail.",
    "Close periods with immutable references finance can audit without explorer screenshots.",
  ],
  internalLinks: [
    { href: "/guides/reconciliation-and-confirmations", label: "Reconciliation guide", reason: "Core lifecycle alignment." },
    { href: "/operations", label: "Operations", reason: "Public operations positioning." },
    { href: "/glossary", label: "Glossary", reason: "Shared vocabulary for matchers." },
    { href: "/blog/payment-detection-vs-settlement-finality", label: "Detection vs finality", reason: "Foundational state separation." },
  ],
  faq: [
    {
      question: "How often should crypto reconciliation run?",
      answer: "Continuous matching for high-volume merchants; at minimum daily with intraday detection for material thresholds. Period close still requires explicit sign-off either way.",
    },
    {
      question: "What belongs in an exception queue?",
      answer: "Underpayments, wrong references, duplicate hashes, timing skew beyond tolerance, and manual overrides—each with owner, note, and resolution state.",
    },
    {
      question: "Can we reconcile using only block explorers?",
      answer: "Explorers help investigation; they are not durable systems of record. Prefer provider event logs and ERP references tied to payment IDs.",
    },
    {
      question: "Who owns reconciliation in a fintech merchant?",
      answer: "Finance owns books outcomes; payment operations owns matchers and queues; engineering owns pipelines and idempotency. One shared vocabulary prevents rework.",
    },
  ],
  blocks: [
    {
      type: "p",
      text: "Crypto reconciliation fails when treated as a spreadsheet sport at month-end. Payment operations teams move thousands of events daily—API-created payments, webhook transitions, custodial movements, and ERP journals. Treasury reconciliation requires matchers that understand references, tolerances, and timing skew without declaring victory when an amount merely looks close on-chain.",
    },
    {
      type: "p",
      text: "Payment operations maturity shows up in how exceptions age. A healthy program has a shrinking backlog of unexplained rows, not a heroic analyst who remembers why row 4,882 was “fine.” Designing reliable reconciliation flows means building systems where the default path is automated matching with human review reserved for true ambiguity—not the other way around.",
    },
    {
      type: "p",
      text: "Reliable flows start with vocabulary. Detection, policy confirmation, and books finality must remain distinct categories in data models and UI. When categories collapse, matchers optimize for the wrong objective—fast green checks instead of defensible close.",
    },
    {
      type: "h2",
      id: "scale",
      text: "Reconciliation at scale without heroics",
    },
    {
      type: "p",
      text: "Volume changes failure economics. At low volume, manual fixes feel free. At scale, a 0.1% exception rate is a daily queue. Design matchers and queues assuming scale from day one—even if day-one volume is small. Payment operations should measure cost-per-exception, not only exception count.",
    },
    {
      type: "p",
      text: "Batch windows help ERP and humans: hourly micro-batches for operations, daily summaries for finance, weekly trend reviews for product. Real-time everything sounds modern but often produces unreadable noise for treasury reconciliation.",
    },
    {
      type: "h2",
      id: "three-way",
      text: "Three-way alignment model",
    },
    {
      type: "definition",
      term: "Reconciliation",
      text: "Mapping external payment signals to internal orders, entitlements, and accounting rules—you own the business mapping; infrastructure supplies auditable lifecycle semantics.",
    },
    {
      type: "p",
      text: "Think in three parallel planes: commerce expectations (invoices, orders), provider lifecycle (payment states and events), and finance records (ledger lines). Reconciliation success means explainable links between planes for each period. Any plane without links is technical debt with an audit timestamp.",
    },
    {
      type: "h2",
      id: "roles",
      text: "Roles and ownership in payment operations",
    },
    {
      type: "p",
      text: "Payment operations owns matchers and daily exception triage. Finance owns period close and recognition policy. Engineering owns pipelines and data integrity. Compliance owns corridor approvals. When roles blur, exceptions sit in chat until month-end. RACI tables sound corporate—they prevent expensive silence.",
    },
    {
      type: "h2",
      id: "matching",
      text: "Matching rules that survive edge cases",
    },
    {
      type: "ul",
      items: [
        "Primary keys: payment ID, merchant reference, on-chain txid where applicable—document precedence when they disagree.",
        "Amount tolerances: explicit per asset for fees, rounding, and partial payments.",
        "Time windows: detection may precede ERP posting; allow skew with alerts beyond threshold.",
        "Duplicate protection: idempotency keys on events and uniqueness constraints in matcher outputs.",
      ],
    },
    {
      type: "h2",
      id: "detection-finality",
      text: "Reconciliation must respect detection versus finality",
    },
    {
      type: "p",
      text: "Matchers should not post to ERP on detection alone unless finance policy explicitly requires it—and that policy should be rare for B2B crypto. Most programs match on confirmed or books-ready states, using detection only for operational alerts. Mixing states in one matcher rule set guarantees false positives when confirmations lag.",
    },
    {
      type: "h2",
      id: "exceptions",
      text: "Exception queues are the product",
    },
    {
      type: "p",
      text: "Operators need queues, not email threads. Each exception should carry category, owner role, age, and allowed resolutions. Underpayment policies belong here—finance-approved paths to accept, top up, or refund—rather than ad hoc database edits.",
    },
    {
      type: "h3",
      id: "stuck-states",
      text: "Stuck states visibility",
    },
    {
      type: "p",
      text: "Dashboard stuck states: paid in portal, not in ERP; detected on-chain, not Confirmed; Confirmed, not posted. Payment operations runbooks should map each stuck pattern to a first responder. This is where crypto payment infrastructure either helps—with clear lifecycle semantics—or hurts—with ambiguous booleans.",
    },
    {
      type: "h2",
      id: "automation-limits",
      text: "Where automation should stop",
    },
    {
      type: "p",
      text: "Not every exception should auto-resolve. High-value mismatches, new counterparties, and policy overrides deserve human approval with retained notes. Automation should route and suggest—not silently post adjusting entries that finance discovers during audit.",
    },
    {
      type: "p",
      text: "Treasury reconciliation for internal wallet movements should never auto-match to customer invoices. Tag movement types explicitly in data models so matchers do not conflate customer deposits with sweeps.",
    },
    {
      type: "h2",
      id: "period-close",
      text: "Period close rituals",
    },
    {
      type: "ol",
      items: [
        "Freeze configuration changes that affect matchers during close window—or document exceptions.",
        "Export immutable provider reports with correlation IDs finance can archive.",
        "Reconcile exceptions to zero or to documented carry-forward with approver identity.",
        "Sign off books only when three-way links meet policy—not when explorers look quiet.",
      ],
    },
    {
      type: "callout",
      title: "Anti-pattern",
      text: "Re-running a matcher script until numbers ‘look close enough’ destroys audit defensibility. Fix rules, not outputs.",
    },
    {
      type: "h2",
      id: "treasury",
      text: "Treasury reconciliation and wallet movements",
    },
    {
      type: "p",
      text: "Wallet sweeps and internal transfers create false exceptions if matchers lack wallet role metadata. Treasury reconciliation should tag movement types—customer deposit, sweep, fee, manual adjustment—so automation does not fight legitimate internal flows.",
    },
    {
      type: "h2",
      id: "erp",
      text: "ERP and ledger integration patterns",
    },
    {
      type: "p",
      text: "Postings should reference provider payment IDs, not only txids. Txids help investigations; finance close requires stable business keys. Batch exports must align with ERP import windows—real-time posting is optional; explainable batching is mandatory.",
    },
    {
      type: "p",
      text: "When ERP is down, decide in advance whether to pause fulfillment, queue events, or allow fulfillment with delayed posting. Undocumented choices become revenue recognition debates.",
    },
    {
      type: "h2",
      id: "tooling",
      text: "Tooling expectations from vendors",
    },
    {
      type: "p",
      text: "Providers should expose event catalogs, stable IDs, and reports that tie to the same lifecycle states shown in portals. Kobbopay’s public copy emphasizes reconciliation and confirmations discipline; validate against your sandbox configuration rather than assuming marketing language equals your enabled rails.",
    },
    {
      type: "h2",
      id: "data-model",
      text: "Data model primitives matchers need",
    },
    {
      type: "p",
      text: "Store immutable provider event IDs, normalized amounts in minor units, asset identifiers, rail IDs, and merchant references on every payment row. Matchers fail when fields are nullable for convenience. Treat reference fields as required for B2B invoices above configured thresholds.",
    },
    {
      type: "p",
      text: "Version matcher rules per environment. A rule change in production without finance sign-off is a common source of silent mis-posting. Use feature flags with audit trails for tolerance adjustments during promotional campaigns.",
    },
    {
      type: "h2",
      id: "reporting",
      text: "Reporting finance can archive",
    },
    {
      type: "p",
      text: "Exports should include opening and closing exception balances, not only matched rows. Finance auditors ask what remained open at period end and why. Provider reports must tie to the same payment IDs your API returns—discrepancies become reconciliation tickets with owners.",
    },
    {
      type: "h2",
      id: "cross-team",
      text: "Cross-team rituals that prevent drift",
    },
    {
      type: "p",
      text: "Weekly payment operations reviews with finance: stuck states, new exception categories, upcoming rail enables. Monthly lifecycle vocabulary review: ensure support, engineering, and docs still agree on state meanings. Quarterly tabletop for issuer or chain incidents affecting confirmation policy.",
    },
    {
      type: "h2",
      id: "maturity",
      text: "Maturity markers for operators",
    },
    {
      type: "p",
      text: "Mature programs measure exception rate, mean time to resolve, and repeat causes. They improve matchers instead of hiring seasonal contractors to click through explorers. That maturity is how merchants earn finance trust while scaling crypto B2B payments.",
    },
    {
      type: "p",
      text: "Crypto reconciliation is not a project—it is a production service with SLAs internal finance agrees to. Design flows that respect detection versus finality, invest in exception queues, and close periods with evidence. That is how payment operations teams turn blockchain visibility into books discipline merchants can scale on.",
    },
    {
      type: "p",
      text: "Start your next integration review by drawing three columns—commerce, provider, ledger—and force every webhook and API state to land in one of them. If a state spans columns without documentation, you have found tomorrow’s month-end fire. Reliable reconciliation flows are built by naming those boundaries early and measuring exceptions until they are boring.",
    },
    {
      type: "p",
      text: "Treasury reconciliation improves when leadership treats matcher accuracy as a product metric, not a back-office chore. Fund the queues, version the rules, and review stuck states weekly—those rituals are how crypto payment operations earn the right to scale volume without scaling surprises.",
    },
    {
      type: "p",
      text: "Payment operations leaders should publish a monthly reconciliation quality note: exceptions opened, resolved, and carried forward. That note is how boards and auditors see discipline without conflating crypto visibility with financial control.",
    },
    {
      type: "p",
      text: "Crypto reconciliation quality is also a customer experience issue: buyers receive fewer erroneous receipts when internal states are clean. External confusion often mirrors internal matcher confusion—fix the system, reduce support load.",
    },
    {
      type: "p",
      text: "Treat reconciliation regressions as incidents with timelines and corrective actions—same as API outages. Regressions include rising false positives, new unmatched categories, or ERP import failures after a release.",
    },
  ],
};
