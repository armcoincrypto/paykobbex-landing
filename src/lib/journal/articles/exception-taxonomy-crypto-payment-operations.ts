import type { JournalArticle } from "@/lib/journal/types";

export const exceptionTaxonomyCryptoPaymentOperations: JournalArticle = {
  slug: "exception-taxonomy-crypto-payment-operations",
  title: "An Exception Taxonomy for Crypto Payment Operations",
  metaTitle: "Exception Taxonomy for Crypto Payment Operations",
  metaDescription:
    "Structured exception classes for crypto payment reconciliation—underpayments, reference mismatches, timing skew, and ambiguous rail outcomes with owned queues instead of silent fixes.",
  category: "Reconciliation & operations",
  hubSlug: "reconciliation",
  excerpt:
    "Forensic reconciliation begins when exceptions have no name. A bounded taxonomy turns chaos into routable work finance, support, and engineering can defend.",
  seoFocus: [
    "payment exception handling",
    "crypto reconciliation exceptions",
    "exception queue operations",
  ],
  keyTakeaways: [
    "Name exception classes before building matchers—ambiguous buckets become permanent spreadsheet culture.",
    "Route each class to an owner: support, treasury, engineering, or finance—with SLAs, not heroics.",
    "Separate amount tolerances, reference mismatches, and lifecycle timing skew—they need different controls.",
    "Exception queues require immutable references: payment_id, order_id, rail context, and observed timestamps.",
    "Closing an exception should produce auditable resolution metadata, not silent state overrides.",
  ],
  internalLinks: [
    {
      href: "/guides/reconciliation-checklist",
      label: "Reconciliation checklist",
      reason: "Implementation-oriented control list.",
    },
    {
      href: "/blog/reliable-reconciliation-flows",
      label: "Reliable reconciliation flows",
      reason: "Foundational three-plane framing.",
    },
    {
      href: "/glossary#exception-queue",
      label: "Exception queue",
      reason: "Stable glossary anchor.",
    },
  ],
  faq: [
    {
      question: "How many exception types should we start with?",
      answer:
        "Start with six to ten high-volume classes you already argue about in Slack—underpayment, overpayment, wrong reference, duplicate detection, timing skew, and policy hold. Expand when volume justifies finer routing.",
    },
    {
      question: "Should every exception block fulfillment?",
      answer:
        "Policy decision. Many teams allow low-risk SKUs to proceed on Paid while finance exceptions resolve Confirmed posting—but the policy must be explicit and measurable, not improvised per ticket.",
    },
    {
      question: "Who owns the exception queue?",
      answer:
        "Operations or finance operations usually owns routing; engineering owns tooling and matchers. Support executes playbooks. Ambiguity here is how drift starts.",
    },
    {
      question: "Does Kobbopay define exception types for merchants?",
      answer:
        "Public materials describe lifecycle semantics and reconciliation discipline. Your business mapping and exception taxonomy remain merchant-owned—aligned to your rails and accounting policy.",
    },
  ],
  blocks: [
    {
      type: "p",
      text: "Most reconciliation programs fail quietly. Payments mostly match. Exceptions become anecdotes: a support agent overrides a flag, treasury posts from an explorer screenshot, engineering hotfixes a handler. Without a taxonomy, every incident feels unique—and teams rebuild the same arguments under new ticket numbers.",
    },
    {
      type: "p",
      text: "An exception taxonomy is not bureaucracy. It is routing infrastructure. Each class names a failure mode, expected evidence, default owner, and permitted transitions. Finance can report on volumes. Engineering can instrument matchers. Support stops improvising language that auditors cannot replay.",
    },
    {
      type: "h2",
      id: "why-taxonomy",
      text: "Why unstructured exceptions become operational debt",
    },
    {
      type: "p",
      text: "Crypto payment operations amplify ambiguity: memos, multi-hop transfers, partial payments, chain reorganisation policies, and webhook retries all produce edge cases. When those edges land in a generic “needs review” bucket, mean time to resolve grows while trust in lifecycle labels shrinks.",
    },
    {
      type: "definition",
      term: "Exception queue",
      text: "An owned work queue for payments that fail automated matching—before silent posting or informal overrides.",
    },
    {
      type: "h2",
      id: "core-classes",
      text: "Core exception classes to define early",
    },
    {
      type: "ul",
      items: [
        "Amount mismatch — underpayment, overpayment, or tolerance breach versus expected commerce amount.",
        "Reference mismatch — payer omitted or corrupted invoice, order, or memo references.",
        "Duplicate observation — multiple detections for one commerce intent or one chain event replayed across systems.",
        "Timing skew — lifecycle event arrived before prerequisites exist (out-of-order webhooks).",
        "Rail or asset mismatch — payment observed on a non-enabled rail or wrong asset for the configured attempt.",
        "Policy hold — sanctions, velocity, or manual treasury gate blocking progression despite detection.",
        "Ambiguous finality — detection present but confirmation policy cannot yet classify outcome.",
      ],
    },
    {
      type: "h2",
      id: "routing",
      text: "Routing rules beat heroic triage",
    },
    {
      type: "p",
      text: "Each class should map to a playbook: required fields, allowed auto-resolution, escalation path, and finance sign-off rules. Underpayments might auto-close only below configured thresholds. Reference mismatches might never auto-post. Timing skew might buffer events rather than opening finance exceptions.",
    },
    {
      type: "callout",
      title: "Anti-pattern",
      text: "Letting support “mark paid” without exception metadata destroys three-plane reconciliation. The commerce plane thinks the order closed; finance never received a posting gate.",
    },
    {
      type: "h2",
      id: "evidence",
      text: "Evidence packages auditors expect",
    },
    {
      type: "ol",
      items: [
        "Stable identifiers — payment_id, merchant reference, order_id.",
        "Rail context — network, asset, configured attempt parameters.",
        "Timestamps — detection, webhook receipt, policy confirmation, resolution.",
        "Actor — automated matcher, operator id, or approved override role.",
        "Resolution code — from taxonomy, not free-text only.",
      ],
    },
    {
      type: "h2",
      id: "metrics",
      text: "Metrics that prove the taxonomy works",
    },
    {
      type: "p",
      text: "Track exception volume by class, age in queue, repeat offenders (same reference patterns), and re-open rate after period close. Spikes in timing skew often indicate webhook ordering gaps; spikes in reference mismatch often indicate checkout UX or invoice generation bugs—not “crypto being crypto.”",
    },
    {
      type: "h2",
      id: "implementation",
      text: "Implementing without a new platform",
    },
    {
      type: "p",
      text: "Start with enums in your reconciliation store, not a workflow product evaluation. Matchers write exception records with class codes. Support tools filter by class. Engineering adds instrumentation per class before building generic AI triage fantasies.",
    },
    {
      type: "p",
      text: "Kobbopay’s public journal emphasizes merchant-owned mapping and explicit lifecycle semantics—useful foundations when your taxonomy references provider states without collapsing them into books-ready labels.",
    },
  ],
};
