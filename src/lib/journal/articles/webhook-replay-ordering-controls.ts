import type { JournalArticle } from "@/lib/journal/types";

export const webhookReplayOrderingControls: JournalArticle = {
  slug: "webhook-replay-ordering-controls",
  title: "Webhook Replay and Ordering Controls for Payment Operators",
  metaTitle: "Webhook Replay and Ordering Controls",
  metaDescription:
    "Replay protection, webhook ordering guarantees, duplicate delivery handling, and provider retry semantics for crypto payment webhooks—beyond signature verification alone.",
  category: "Webhooks & security",
  hubSlug: "webhook-security",
  excerpt:
    "Verification proves authenticity—not correctness over time. Replay and ordering controls keep at-least-once delivery from becoming at-least-twice ledger corruption.",
  seoFocus: [
    "webhook replay protection",
    "webhook ordering guarantees",
    "duplicate webhook handling",
  ],
  keyTakeaways: [
    "At-least-once delivery is the default; design for duplicates and reordering from day one.",
    "Replay windows bound how long verified payloads remain actionable—especially after secret rotation.",
    "Idempotency keys should be derived from provider event identity, not only HTTP request ids.",
    "Out-of-order events require state machines that no-op safely or buffer—not crash and retry forever.",
    "Provider retry semantics define when your 2xx response stops delivery; document them per environment.",
  ],
  internalLinks: [
    {
      href: "/blog/verify-crypto-webhooks-safely",
      label: "Verify crypto webhooks safely",
      reason: "Verification foundation.",
    },
    {
      href: "/guides/webhook-replay-handling",
      label: "Webhook replay handling guide",
      reason: "Implementation reference with worked example.",
    },
    {
      href: "/glossary#replay-protection",
      label: "Replay protection",
      reason: "Glossary anchor.",
    },
  ],
  faq: [
    {
      question: "Is timestamp validation enough for replay protection?",
      answer:
        "It helps but is not sufficient alone. Combine skew checks with idempotency stores and optional replay windows; clock drift and delayed retries still occur in production.",
    },
    {
      question: "Should handlers return 2xx before durable writes complete?",
      answer:
        "Only if you have another durable queue and idempotent consumers. Otherwise retries will duplicate work—or 2xx will lie about completion.",
    },
    {
      question: "How do ordering guarantees differ from ordering assumptions?",
      answer:
        "Assumptions are what you hope providers do. Guarantees are what your state machine enforces regardless of delivery order—via buffering, versioning, or monotonic transition rules.",
    },
    {
      question: "Does Kobbopay document retry behavior publicly?",
      answer:
        "Public materials emphasize signed webhooks and server-side integration patterns. Validate retry and event catalog details against your environment configuration—not marketing summaries alone.",
    },
  ],
  blocks: [
    {
      type: "p",
      text: "Teams that master HMAC verification still lose money to replay and ordering failures. A perfectly signed duplicate posts twice. A Confirmed event arrives before Paid during a partial outage. A handler crashes after side effects but before idempotency persistence—then retries amplify the damage.",
    },
    {
      type: "p",
      text: "Replay and ordering controls sit beside verification in the control plane. They define how long events remain valid, how duplicates suppress, and how state machines behave when the network does not respect your preferred narrative sequence.",
    },
    {
      type: "h2",
      id: "replay",
      text: "Replay protection layers",
    },
    {
      type: "definition",
      term: "Replay protection",
      text: "Controls limiting harm from re-delivered or captured payloads—verification, idempotency, optional timestamp windows, and ordering rules together.",
    },
    {
      type: "ul",
      items: [
        "Signature verification on raw bytes.",
        "Idempotency store with uniqueness on provider event identity.",
        "Optional webhook replay window rejecting stale timestamps.",
        "Secret rotation with overlapping verification keys.",
        "Audit logs without storing secrets or full payload archives insecurely.",
      ],
    },
    {
      type: "h2",
      id: "duplicates",
      text: "Duplicate delivery handling",
    },
    {
      type: "p",
      text: "Duplicates are often legitimate retries—not attacks. Duplicate webhook suppression should return success when the logical event already applied, so providers stop retrying without re-running side effects.",
    },
    {
      type: "definition",
      term: "Duplicate webhook suppression",
      text: "Detecting and no-oping repeated deliveries of the same logical event under at-least-once delivery.",
    },
    {
      type: "h2",
      id: "ordering",
      text: "Ordering guarantees your state machine must enforce",
    },
    {
      type: "p",
      text: "Do not assume causal ordering from provider queues. Implement transition tables: allowed source states, required fields, and whether late events upgrade or no-op. Buffering is acceptable when bounded; unbounded buffers become hidden debt.",
    },
    {
      type: "callout",
      title: "Production lesson",
      text: "Crash-looping handlers on out-of-order events exhaust provider retry budgets and starve legitimate deliveries—sometimes misdiagnosed as provider instability.",
    },
    {
      type: "h2",
      id: "retries",
      text: "Provider retry orchestration",
    },
    {
      type: "p",
      text: "Document when providers retry (timeouts, non-2xx, specific error classes), backoff behavior, and maximum attempt windows. Your 2xx should mean “safe for you to stop”—either because work is durable or because idempotent skip occurred.",
    },
    {
      type: "h2",
      id: "sequencing",
      text: "Event sequencing assumptions to write down",
    },
    {
      type: "ol",
      items: [
        "Which events may arrive multiple times?",
        "Which pairs may arrive out of order?",
        "Which events are terminal for a payment_id?",
        "Which side effects require Confirmed versus Paid?",
        "What happens when an event references unknown payment_id?",
      ],
    },
    {
      type: "h2",
      id: "testing",
      text: "Testing replay and order scenarios",
    },
    {
      type: "p",
      text: "Fixture tests for duplicate delivery bursts, reversed event order, and crash between side effect and idempotency write. Chaos tests should validate that non-2xx responses produce intentional retry behavior—not accidental infinite loops.",
    },
  ],
};
