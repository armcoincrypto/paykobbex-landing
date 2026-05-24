/** Conceptual dashboard views — what each role should see, not a live product UI. */

export type DashboardViewId =
  | "finance"
  | "integration"
  | "support"
  | "treasury"
  | "executive";

export type DashboardView = {
  id: DashboardViewId;
  title: string;
  primaryQuestions: string[];
  signalsConsumed: string[];
  mustNotCollapse: string;
  antiPatterns: string[];
};

export const PAYMENT_HEALTH_DASHBOARD_VIEWS: DashboardView[] = [
  {
    id: "finance",
    title: "Finance view",
    primaryQuestions: [
      "Which payments are books-ready versus merely detected?",
      "Where do matchers fail across commerce, provider, and finance planes?",
      "What exceptions block period close?",
    ],
    signalsConsumed: [
      "Reconciliation drift",
      "Exception queue depth",
      "Checkpoint lag (finance gates)",
    ],
    mustNotCollapse:
      "Provider Confirmed labels into treasury posted without reconciliation evidence.",
    antiPatterns: [
      "Single green paid flag for GL posting",
      "Dashboard exports without payment_id correlation",
    ],
  },
  {
    id: "integration",
    title: "Integration engineer view",
    primaryQuestions: [
      "Are webhooks verified, idempotent, and recent?",
      "Where do handlers crash or exhaust retries?",
      "Which rails show elevated provider latency?",
    ],
    signalsConsumed: ["Webhook recency", "Provider latency", "Checkpoint lag (detection → Paid)"],
    mustNotCollapse:
      "HTTP 200 responses into successful side effects without idempotency persistence.",
    antiPatterns: [
      "Signature success rate only—no duplicate or ordering visibility",
      "Mixing sandbox and production signals on one panel",
    ],
  },
  {
    id: "support",
    title: "Support / operator view",
    primaryQuestions: [
      "What lifecycle state should support quote to the customer?",
      "Which exceptions are owned and within review?",
      "Is fulfillment allowed under merchant policy?",
    ],
    signalsConsumed: [
      "Checkpoint lag",
      "Exception queue depth",
      "Webhook recency (indirect stuck states)",
    ],
    mustNotCollapse:
      "Explorer screenshots or chat overrides into authoritative lifecycle truth.",
    antiPatterns: [
      "Support edits commerce state without exception record",
      "Customer-facing copy promises settlement not yet confirmed",
    ],
  },
  {
    id: "treasury",
    title: "Treasury view",
    primaryQuestions: [
      "Which balances are recognized versus in-flight?",
      "What payout requests await dual control?",
      "Are settlement and payout rails aligned?",
    ],
    signalsConsumed: [
      "Payout review backlog",
      "Checkpoint lag (recognition → posting)",
      "Reconciliation drift (ledger vs provider)",
    ],
    mustNotCollapse:
      "Detected inbound funds into payout eligibility without recognition gates.",
    antiPatterns: [
      "Payout queue without ledger state context",
      "Urgent manual payouts skipping reconciliation check",
    ],
  },
  {
    id: "executive",
    title: "Executive health view",
    primaryQuestions: [
      "Are payment systems degrading by class (webhook, settlement, reconciliation)?",
      "Where are open incidents concentrated?",
      "Is period close at risk from exception or drift trends?",
    ],
    signalsConsumed: [
      "Aggregate signal trends you define internally",
      "Incident class counts (not vanity uptime percentages)",
      "Exception queue aging buckets",
    ],
    mustNotCollapse:
      "Multiple incident classes into a single uptime percentage without taxonomy.",
    antiPatterns: [
      "Fake SLA dashboards with invented numbers",
      "Hiding reconciliation drift behind gross payment volume",
    ],
  },
];

export const DASHBOARD_VIEWS_TABLE = {
  caption: "Role-oriented views — design your internal dashboards against these questions.",
  headers: ["View", "Primary questions (sample)", "Key signals"],
  rows: PAYMENT_HEALTH_DASHBOARD_VIEWS.map((v) => [
    v.title,
    v.primaryQuestions[0],
    v.signalsConsumed.join("; "),
  ]),
};
