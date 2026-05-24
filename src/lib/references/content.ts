import type { ReferenceSlug } from "@/lib/references/meta";
import type { ReferenceDocument } from "@/components/references/ReferenceView";
import type { OperationalLinkGroup } from "@/lib/operational-links";

const links = (partial: Partial<OperationalLinkGroup>): OperationalLinkGroup => ({
  glossary: partial.glossary ?? [],
  guides: partial.guides ?? [],
  articles: partial.articles ?? [],
  references: partial.references ?? [],
  playbooks: partial.playbooks ?? [],
  usedDuring: partial.usedDuring,
  failureRelationships: partial.failureRelationships,
});

export const REFERENCE_CONTENT: Record<ReferenceSlug, ReferenceDocument> = {
  "rail-selection-matrix": {
    sections: [
      {
        id: "purpose",
        title: "Purpose",
        index: "01",
        paragraphs: [
          "Use this matrix when enabling inbound settlement or outbound payout rails for an approved merchant environment. It frames tradeoffs—you still document exact configuration in your internal runbooks.",
        ],
      },
      {
        id: "matrix",
        title: "Decision dimensions",
        index: "02",
        paragraphs: ["Score each candidate rail against operational maturity—not marketing coverage."],
        table: {
          caption: "Illustrative dimensions (merchant-defined weighting).",
          headers: ["Dimension", "Lower operational cost", "Higher operational cost"],
          rows: [
            ["Reconciliation complexity", "Single asset, stable memos", "Multi-hop, memo-less sends"],
            ["Confirmation latency", "Predictable confirmation policy", "Long async finality windows"],
            ["Exception volume history", "Low taxonomy noise in sandbox", "Frequent amount/reference mismatches"],
            ["Treasury posting clarity", "Clear recognition gates", "Ambiguous detection vs posting"],
            ["Webhook maturity", "Documented events + retries", "Sparse event catalog"],
          ],
        },
      },
    ],
    related: links({
      guides: [{ href: "/guides/merchant-integration-architecture", label: "Integration architecture" }],
      playbooks: [{ href: "/playbooks/merchant-onboarding-rollout", label: "Onboarding rollout" }],
      glossary: [{ href: "/glossary#selected-rails", label: "Selected rails" }],
    }),
  },

  "confirmation-policy-matrix": {
    sections: [
      {
        id: "purpose",
        title: "Purpose",
        index: "01",
        paragraphs: [
          "Map merchant use cases to confirmation depth and human review requirements. This is policy design—not a guarantee about chain behavior.",
        ],
        table: {
          headers: ["Use case tier", "Typical gate", "Human review trigger"],
          rows: [
            ["Low materiality digital goods", "Paid or Confirmed per policy", "Amount tolerance breach"],
            ["Standard B2B invoice", "Confirmed per rail policy", "Reference mismatch"],
            ["High materiality / treasury", "Confirmed + finance reconciliation", "Any ambiguity or sanctions flag"],
            ["Payout initiation", "Recognized balance + dual control", "Ledger/provider disagreement"],
          ],
        },
      },
    ],
    related: links({
      playbooks: [{ href: "/playbooks/confirmation-policy-escalation", label: "Confirmation escalation" }],
      guides: [{ href: "/guides/payment-lifecycle-decision-tree", label: "Lifecycle decision tree" }],
      glossary: [{ href: "/glossary#policy-confirmation", label: "Policy confirmation" }],
    }),
  },

  "reconciliation-state-model": {
    sections: [
      {
        id: "planes",
        title: "Plane states",
        index: "01",
        paragraphs: [
          "Each plane maintains its own state machine. Matchers connect planes; they do not collapse them.",
        ],
        table: {
          headers: ["Plane", "Example states", "Owner"],
          rows: [
            ["Commerce", "Open, fulfilled, refunded, disputed", "Merchant product/support"],
            ["Provider", "Pending, Paid, Confirmed, Expired", "Integration + operations"],
            ["Finance", "Unposted, recognized, posted, adjusted", "Finance/treasury"],
          ],
        },
      },
      {
        id: "transitions",
        title: "Allowed transitions",
        index: "02",
        paragraphs: [
          "Illegal transitions (e.g., finance posted without provider Confirmed when policy requires it) should fail matchers and route to exceptions—not silent fixes.",
        ],
      },
    ],
    related: links({
      articles: [{ href: "/blog/three-plane-reconciliation-architecture", label: "Three-plane architecture" }],
      playbooks: [{ href: "/playbooks/reconciliation-close-procedure", label: "Reconciliation close" }],
    }),
  },

  "settlement-checkpoint-model": {
    sections: [
      {
        id: "checkpoints",
        title: "Checkpoint types",
        index: "01",
        paragraphs: ["Checkpoints are explicit gates—not implicit hope."],
        table: {
          headers: ["Checkpoint", "Question answered", "Typical owner"],
          rows: [
            ["Detection", "Did we observe a payment attempt?", "Integration"],
            ["Eligibility", "Does amount/asset/reference match?", "Operations"],
            ["Policy confirmation", "Does merchant policy allow Confirmed?", "Operations/finance"],
            ["Finance reconciliation", "Do books-ready rules pass?", "Finance"],
            ["Treasury posting", "May funds be recognized/released?", "Treasury"],
          ],
        },
      },
    ],
    related: links({
      articles: [{ href: "/blog/settlement-checkpoint-escalation-patterns", label: "Checkpoint escalation" }],
      playbooks: [{ href: "/playbooks/settlement-operations-checklist", label: "Settlement checklist" }],
    }),
  },

  "provider-retry-semantics": {
    sections: [
      {
        id: "comparison",
        title: "Conceptual comparison",
        index: "01",
        paragraphs: [
          "Validate exact retry behavior against your environment documentation. This table compares responsibilities—not vendor rankings.",
        ],
        table: {
          headers: ["Concern", "Provider responsibility", "Merchant responsibility"],
          rows: [
            ["Delivery attempts", "Retry on non-2xx/timeout per their policy", "Idempotent handlers + durable writes"],
            ["Duplicate delivery", "At-least-once common", "Duplicate suppression store"],
            ["Ordering", "May reorder under failure", "State machine ordering rules"],
            ["Signature", "Sign per documented algorithm", "Verify raw bytes server-side"],
          ],
        },
      },
    ],
    related: links({
      articles: [{ href: "/blog/webhook-replay-ordering-controls", label: "Replay and ordering" }],
      references: [{ href: "/references/webhook-delivery-expectations", label: "Webhook delivery model" }],
    }),
  },

  "webhook-delivery-expectations": {
    sections: [
      {
        id: "model",
        title: "Expectation model",
        index: "01",
        paragraphs: [
          "Design handlers assuming duplicates, delay, and reorder—not single perfect delivery.",
        ],
        table: {
          headers: ["Signal", "Healthy pattern", "Investigate when"],
          rows: [
            ["Verification failures", "Low stable baseline", "Spike after deploy/rotation"],
            ["Duplicate rate", "Stable with idempotent no-ops", "Duplicates cause side effects"],
            ["Recency lag", "Within internal SLO you define", "Growing stuck lifecycles"],
            ["Out-of-order", "Safe no-ops/buffer", "Crash loops / retry exhaustion"],
          ],
        },
      },
    ],
    related: links({
      guides: [{ href: "/guides/webhook-replay-handling", label: "Webhook replay handling" }],
      playbooks: [{ href: "/playbooks/webhook-secret-rotation", label: "Secret rotation" }],
    }),
  },

  "asynchronous-settlement-lifecycle": {
    sections: [
      {
        id: "lifecycle",
        title: "Intermediate states",
        index: "01",
        paragraphs: [
          "Async settlement requires visible intermediate truth across planes—especially when customer communication and fulfillment policies diverge from treasury posting.",
        ],
        table: {
          headers: ["Phase", "Provider plane", "Commerce may", "Finance may"],
          rows: [
            ["Detection", "Paid", "Notify pending detection", "Not post"],
            ["Policy wait", "Paid or intermediate", "Hold high-risk SKUs", "Not post"],
            ["Confirmed", "Confirmed", "Fulfill per policy", "Begin reconciliation"],
            ["Recognized", "Confirmed", "Complete order", "Treasury posting allowed"],
          ],
        },
      },
    ],
    related: links({
      articles: [{ href: "/blog/reconciling-asynchronous-settlement-systems", label: "Async settlement reconciliation" }],
      playbooks: [{ href: "/playbooks/delayed-settlement-recovery", label: "Delayed settlement recovery" }],
    }),
  },

  "merchant-ledger-transitions": {
    sections: [
      {
        id: "states",
        title: "Ledger states",
        index: "01",
        paragraphs: [
          "Merchant ledger state is your internal books representation—aligned to, but not identical with, provider lifecycle labels.",
        ],
        table: {
          headers: ["Ledger state", "Meaning", "Typical provider prerequisite"],
          rows: [
            ["Attributed (unrecognized)", "Detected internally", "Paid or equivalent"],
            ["Recognized", "Finance acceptance for allocation", "Confirmed + reconciliation pass"],
            ["Posted", "Ledger entry recorded", "Finance approval"],
            ["Reserved for payout", "Funds earmarked", "Payout request validated"],
            ["Paid out", "Outbound movement executed", "Orchestration complete"],
          ],
        },
      },
    ],
    related: links({
      references: [{ href: "/references/reconciliation-state-model", label: "Reconciliation state model" }],
      playbooks: [{ href: "/playbooks/merchant-payout-review", label: "Payout review" }],
      glossary: [{ href: "/glossary#merchant-ledger-state", label: "Merchant ledger state" }],
    }),
  },

  "operational-signal-catalog": {
    sections: [
      {
        id: "purpose",
        title: "Purpose",
        index: "01",
        paragraphs: [
          "Use this catalog when designing observability for crypto payment operations. Signals are qualitative patterns—you define thresholds, dashboards, and alerts internally.",
        ],
      },
      {
        id: "catalog",
        title: "Signal definitions",
        index: "02",
        paragraphs: ["Each signal maps to incident classes and playbooks via /incidents routing."],
        table: {
          caption: "Six core operational signals (bounded definitions).",
          headers: ["Signal", "Measures", "Investigate when", "Typical owner"],
          rows: [
            [
              "Webhook recency",
              "Time since last verified webhook processed",
              "Grows while activity continues; post-deploy spikes",
              "Integration / SRE",
            ],
            [
              "Checkpoint lag",
              "Time between lifecycle checkpoints",
              "Stalls exceed rail/policy expectations",
              "Payment operations",
            ],
            [
              "Exception queue depth",
              "Open taxonomy-owned exceptions",
              "Monotonic growth; aging beyond internal targets",
              "Operations / finance",
            ],
            [
              "Reconciliation drift",
              "Persistent three-plane mismatch",
              "Repeat matcher failures for same payment_id",
              "Finance reconciliation",
            ],
            [
              "Provider latency",
              "API latency/errors at integration boundary",
              "Timeouts block status reads; retry storms",
              "Integration engineering",
            ],
            [
              "Payout review backlog",
              "Withdrawals awaiting treasury review",
              "Growth during settlement incidents; eligibility failures",
              "Treasury / finance",
            ],
          ],
        },
      },
      {
        id: "routing",
        title: "Signal → action",
        index: "03",
        paragraphs: [
          "Degrading signals do not imply a single root cause. Classify incident class, then route: /incidents for the matrix, payment incident triage when unclear.",
        ],
      },
    ],
    related: links({
      playbooks: [{ href: "/playbooks/payment-incident-triage", label: "Payment incident triage" }],
      references: [{ href: "/references/payment-health-dashboard-model", label: "Dashboard model" }],
      articles: [{ href: "/blog/operational-settlement-drift-recovery", label: "Settlement drift recovery" }],
    }),
  },

  "payment-health-dashboard-model": {
    sections: [
      {
        id: "purpose",
        title: "Purpose",
        index: "01",
        paragraphs: [
          "Internal dashboards should be role-oriented—not one chart for every team. This model lists questions each view must answer and anti-patterns that hide operational risk.",
        ],
      },
      {
        id: "views",
        title: "Role-oriented views",
        index: "02",
        paragraphs: ["No live dashboard is hosted on this site; use this as a design checklist."],
        table: {
          headers: ["View", "Must answer", "Key signals", "Anti-pattern"],
          rows: [
            [
              "Finance",
              "What is books-ready vs detected?",
              "Drift, exception depth, checkpoint lag",
              "Single paid flag drives GL posting",
            ],
            [
              "Integration engineer",
              "Are webhooks verified and recent?",
              "Webhook recency, provider latency",
              "200 OK without idempotency visibility",
            ],
            [
              "Support / operator",
              "What state can support quote?",
              "Checkpoint lag, exception queue",
              "Chat overrides without exception record",
            ],
            [
              "Treasury",
              "What is recognized vs in-flight?",
              "Payout backlog, ledger drift",
              "Payout queue without ledger context",
            ],
            [
              "Executive health",
              "Which incident classes are degrading?",
              "Trends you define; class counts",
              "Vanity uptime without taxonomy",
            ],
          ],
        },
      },
      {
        id: "integrity",
        title: "Dashboard integrity",
        index: "03",
        paragraphs: [
          "Never collapse commerce, provider, and finance planes into one indicator. Never publish fake SLA percentages on public marketing surfaces—track thresholds internally.",
        ],
      },
    ],
    related: links({
      references: [{ href: "/references/operational-signal-catalog", label: "Signal catalog" }],
      playbooks: [{ href: "/playbooks/payment-incident-triage", label: "Incident triage" }],
      guides: [{ href: "/guides/reconciliation-checklist", label: "Reconciliation checklist" }],
    }),
  },
};

export function getReferenceContent(slug: ReferenceSlug): ReferenceDocument {
  return REFERENCE_CONTENT[slug];
}
