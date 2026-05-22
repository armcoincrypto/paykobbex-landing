import type { JournalArticle } from "@/lib/journal/types";

export const paymentDetectionVsSettlementFinality: JournalArticle = {
  slug: "payment-detection-vs-settlement-finality",
  title: "Why Payment Detection Is Not the Same as Settlement Finality",
  metaTitle: "Payment Detection vs Settlement Finality",
  metaDescription:
    "Crypto payment confirmations, settlement finality, and reconciliation discipline for merchants—why detecting funds on-chain is not the same as closing books.",
  category: "Settlement & confirmations",
  hubSlug: "settlement-operations",
  excerpt:
    "Teams that treat “we saw the transaction” as “we can recognize revenue” inherit reconciliation debt. Detection, policy confirmation, and books finality are different operational states.",
  seoFocus: [
    "crypto payment confirmations",
    "settlement finality",
    "blockchain payment reconciliation",
  ],
  keyTakeaways: [
    "On-chain detection is an observation event; settlement finality is a policy and accounting decision tied to confirmations and reversibility risk.",
    "Finance, treasury, and engineering need a shared vocabulary—Pending, Paid, Confirmed, and books-ready are not interchangeable labels.",
    "Reconciliation workflows should separate rail detection, merchant confirmation policy, and ledger posting gates.",
    "Webhook and portal signals must map to explicit lifecycle states, not informal “looks paid” status.",
    "Production-grade infrastructure documents which transitions require human review versus automated posting.",
  ],
  internalLinks: [
    {
      href: "/guides/reconciliation-and-confirmations",
      label: "Reconciliation & confirmations guide",
      reason: "Align lifecycle vocabulary with accounting controls.",
    },
    {
      href: "/guides/payment-lifecycle",
      label: "Payment lifecycle guide",
      reason: "Map operational states across engineering and finance.",
    },
    {
      href: "/glossary",
      label: "Glossary",
      reason: "Stable definitions for support and audit conversations.",
    },
    {
      href: "/operations",
      label: "Operations",
      reason: "See how Kobbopay describes operational controls on the public site.",
    },
  ],
  faq: [
    {
      question: "Is a confirmed on-chain transaction always final for accounting?",
      answer:
        "Not necessarily. Accounting finality depends on your policy, asset, rail, reversal windows, and internal controls. On-chain depth reduces some risks but does not replace merchant-specific recognition rules.",
    },
    {
      question: "What should engineering expose to finance?",
      answer:
        "Separate signals: detected funds, policy-confirmed payment, and books-ready reconciliation. Each should have timestamps, rail context, and references finance can audit.",
    },
    {
      question: "Can one webhook mean “settled”?",
      answer:
        "Only if your integration contract defines that mapping—and finance agrees. Many teams use multiple events or states because detection and finality occur at different times.",
    },
    {
      question: "Where does Kobbopay fit in this model?",
      answer:
        "Kobbopay is positioned as B2B payment infrastructure with explicit lifecycle semantics, signed webhooks, and reconciliation-oriented language—bounded to configured rails and merchant environments.",
    },
  ],
  blocks: [
    {
      type: "p",
      text: "A merchant integration team sees an incoming transfer on a blockchain explorer and declares the invoice paid. Treasury receives a screenshot in chat. Support closes the ticket. Two days later, finance discovers the amount was underpaid, sent on the wrong memo, or subject to a reorg policy the engineering team never documented. The argument is not about blockchains being unreliable—it is about conflating payment detection with settlement finality.",
    },
    {
      type: "p",
      text: "For B2B crypto payment infrastructure, the distinction is operational, not academic. Detection is an observation that value moved in a rail you monitor. Settlement finality—especially books finality—is the controlled decision that your organization accepts the economic outcome and will recognize, allocate, or release goods accordingly. When those moments collapse into one informal “paid” flag, reconciliation becomes forensic work instead of routine operations.",
    },
    {
      type: "h2",
      id: "definitions",
      text: "Three layers merchants actually run",
    },
    {
      type: "definition",
      term: "Settlement finality",
      text: "The point where finance policy recognizes funds as operationally final for merchant books—often stricter than on-chain detection or a single Paid label.",
    },
    {
      type: "h3",
      id: "detection",
      text: "Detection: value observed on a configured rail",
    },
    {
      type: "p",
      text: "Detection means your systems (or your provider) observed a transaction that plausibly satisfies payment intent: correct asset, address, amount within tolerance, and reference metadata where required. Detection can arrive from indexer feeds, node listeners, custodial statements, or provider callbacks. It is fast and necessary—but it is still an observation with parsing rules, latency, and edge cases such as partial payments or batch transfers.",
    },
    {
      type: "h3",
      id: "policy-confirmation",
      text: "Policy confirmation: merchant rules satisfied",
    },
    {
      type: "p",
      text: "Policy confirmation applies merchant-specific gates: KYC tier, invoice matching, underpayment handling, high-value review, or treasury approval for certain corridors. This layer is where payment operations earn trust with finance. It is also where many “crypto payment gateway” integrations fail—they jump from detection to “Confirmed” without documenting who owns the policy layer.",
    },
    {
      type: "h3",
      id: "books-finality",
      text: "Books finality: accounting and reconciliation alignment",
    },
    {
      type: "p",
      text: "Books finality means your ledger, ERP, or reconciliation system agrees the payment is closed for the period you care about, with traceable references and exception handling for chargebacks, returns, or internal transfers. On public marketing sites, responsible infrastructure vendors avoid promising universal instant finality; they describe lifecycle semantics and reconciliation discipline bounded to enabled rails.",
    },
    {
      type: "h2",
      id: "why-teams-collapse-states",
      text: "Why teams collapse detection and finality",
    },
    {
      type: "p",
      text: "The collapse is usually organizational pressure, not ignorance. Product wants a green checkmark at checkout. Engineering wants a single webhook to drive fulfillment. Finance is consulted late. The result is a boolean paid flag in application code that silently becomes the general ledger trigger. Under load, that design produces duplicate shipments, premature revenue recognition, and month-end surprises when chain reorganizations, memo errors, or stablecoin issuer pauses were never modeled.",
    },
    {
      type: "ul",
      items: [
        "Single webhook handlers that both unlock goods and post revenue without idempotency keys tied to accounting batches.",
        "Explorer screenshots used as audit evidence instead of immutable event logs with correlation IDs.",
        "Assuming all stablecoin transfers share the same confirmation policy across chains and custodians.",
        "Support tools that let agents override lifecycle states without a second control for high-value payments.",
      ],
    },
    {
      type: "callout",
      title: "Operational principle",
      text: "If only one team understands the difference between “seen on-chain” and “ready for books,” you do not have a payment system—you have a messaging system with financial side effects.",
    },
    {
      type: "h2",
      id: "confirmations",
      text: "Confirmations, reversibility, and rail heterogeneity",
    },
    {
      type: "p",
      text: "Crypto payment confirmations are rail-specific. Finality on one network is not identical to another; custodial models introduce settlement windows that do not match block heights. Merchant crypto processing programs must document confirmation thresholds per asset and environment, including sandbox versus production differences. Infrastructure should expose those thresholds as configuration, not tribal knowledge in a runbook footnote.",
    },
    {
      type: "p",
      text: "Reconciliation teams should ask: what event is authoritative for each transition? A signed webhook after server-side verification is authoritative for automation only when its semantics are explicit. If your handler treats the first detection callback as Confirmed, you have chosen a risky policy—document it, defend it, and monitor exceptions.",
    },
    {
      type: "p",
      text: "Reorg policies, mempool visibility, and custodial hold periods are not abstract risks—they are inputs to settlement finality. A payment operator should maintain a table per rail: minimum confirmations, maximum acceptable reversal window, and whether detection events may fire before those thresholds are met. Engineering dashboards should show payments stuck between detected and confirmed, not hide them inside a generic processing state.",
    },
    {
      type: "h2",
      id: "portal-api-alignment",
      text: "Portal, API, and webhook alignment",
    },
    {
      type: "p",
      text: "Merchants consume payment state through APIs, portals, and webhooks simultaneously. When each surface uses different words for the same underlying transition, support tickets become translation work. Your public documentation, internal runbooks, and ERP mapping tables should reference one lifecycle ID scheme. If the portal color changes at Paid while finance waits for Confirmed, the disagreement must be documented as policy—not discovered during an audit.",
    },
    {
      type: "p",
      text: "Polling complements events but should not invent parallel semantics. If engineers poll payment status for fulfillment, the polled states must match webhook payloads field-for-field. Divergence creates ghost incidents: webhooks say Pending while polling says Paid because caches lag. Operational crypto systems treat the provider lifecycle store as authoritative and use polling as a backstop with identical vocabulary.",
    },
    {
      type: "h2",
      id: "support-playbooks",
      text: "Support playbooks without accidental finality",
    },
    {
      type: "p",
      text: "Customer support tools need guardrails. Agents under pressure want one-click “mark paid.” Without role-based constraints, they can force finality for payments that failed policy checks. Playbooks should list which states agents may transition, which require treasury approval, and which must remain engineering-owned. Every manual override should capture actor, reason code, and ticket reference—data finance can reconcile later.",
    },
    {
      type: "h3",
      id: "partial-payments",
      text: "Partial payments and memo ambiguity",
    },
    {
      type: "p",
      text: "Detection fires when funds arrive; policy may still reject the payment. Partial payments are routine in crypto B2B flows: sender covers invoice minus fees, or splits across two transactions. If detection auto-closes tickets, underpayment exceptions surface late. Define tolerances per asset and business line, and route exceptions to payment operations queues instead of silent write-offs.",
    },
    {
      type: "h2",
      id: "reconciliation-implications",
      text: "Blockchain payment reconciliation without category errors",
    },
    {
      type: "p",
      text: "Blockchain payment reconciliation works when categories stay clean: expected invoice, observed transfer, policy outcome, ledger entry. When detection and finality share one label, matchers produce false positives—especially for USDT merchant payments and other stablecoin flows where multiple transfers look identical without rigorous reference fields.",
    },
    {
      type: "p",
      text: "Treasury reconciliation benefits from parallel views: rail activity, provider lifecycle, and internal books. Matching algorithms should tolerate timing skew between detection and books posting while surfacing stuck states explicitly. “Paid in portal, not in ERP” is a workflow problem with a defined owner, not an all-hands chat thread.",
    },
    {
      type: "h2",
      id: "finance-questions",
      text: "Questions finance should ask before go-live",
    },
    {
      type: "ol",
      items: [
        "Which lifecycle state triggers revenue recognition versus fulfillment only?",
        "What confirmation depth is required per asset and corridor in production?",
        "Who approves exceptions when amount, asset, or sender does not match invoice rules?",
        "How are duplicate webhooks and retried callbacks prevented from double-posting?",
        "What is the monthly process to reconcile provider reports to ERP with immutable references?",
      ],
    },
    {
      type: "h2",
      id: "metrics",
      text: "Metrics that expose category mistakes early",
    },
    {
      type: "p",
      text: "Measure time-between-states: detection-to-confirmed, confirmed-to-posted, and posted-to-reconciled. Spike in detection-to-confirmed latency often means rail congestion or misconfigured thresholds—not “blockchain is slow.” Spike in confirmed-to-posted means finance gating or broken ERP integration. Good metrics reduce debates about whether a problem is technical or procedural.",
    },
    {
      type: "ul",
      items: [
        "Count payments with detection events but no confirmation within policy window.",
        "Track manual overrides per 1,000 payments—rising overrides mean ambiguous tooling.",
        "Report webhook verification failures separately from lifecycle transition failures.",
        "Monitor duplicate event deliveries and idempotent suppressions—healthy at scale.",
      ],
    },
    {
      type: "h2",
      id: "infrastructure-expectations",
      text: "What infrastructure should make explicit",
    },
    {
      type: "p",
      text: "Production-grade crypto payment infrastructure publishes lifecycle vocabulary, documents webhook meanings, and separates operational signals from marketing language. It does not replace your accounting policy—but it should not fight it with ambiguous states. Teams evaluating a merchant payment gateway should score vendors on semantic clarity, not banner counts of supported tickers.",
    },
    {
      type: "p",
      text: "Ask vendors for event catalogs: which events may fire before confirmation thresholds, which imply policy confirmation, and which are informational only. Sandbox environments should let you simulate partial payments, retries, and late confirmations without production credentials. If sandbox only demonstrates happy-path Paid, you will learn the hard way in month-end close.",
    },
    {
      type: "p",
      text: "Kobbopay’s public positioning emphasizes explicit payment lifecycles, signed webhooks, and reconciliation-oriented operations for approved merchants on selected rails. That framing is intentional: infrastructure earns trust when detection, confirmation, and books finality can be explained in the same meeting with finance, engineering, and compliance present—without inventing guarantees the public site does not make.",
    },
    {
      type: "p",
      text: "Settlement finality is a discipline you operationalize—not a label you paste on a webhook. Start by naming the three layers in every diagram, every dashboard, and every finance mapping. Detection is observation. Confirmation is policy. Books finality is reconciliation. Keep them separate and your crypto payment confirmations become a system finance can defend, not a story support retells from screenshots.",
    },
  ],
};
