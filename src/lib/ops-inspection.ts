/** Conceptual route groups for infrastructure inspection (not live data). */
export type OpsInspectRoute =
  | "ingress"
  | "verify"
  | "settlement"
  | "reconcile"
  | "egress"
  | "review";

export type OpsInspectState = {
  focus: OpsInspectRoute;
  downstream: OpsInspectRoute[];
  /** Highlights gated request-access CTA when approval/review is inspected. */
  linkGate?: boolean;
} | null;

export type OpsInspectNode = {
  focus: OpsInspectRoute;
  downstream: OpsInspectRoute[];
  tag: string;
  hint: string;
  ownership: string;
  affects: string;
  linkGate?: boolean;
};

export const lifecycleInspectNodes: OpsInspectNode[] = [
  {
    focus: "settlement",
    downstream: ["settlement"],
    tag: "STATE · POLICY GATED",
    hint: "Created — awaiting on-chain detection",
    ownership: "Policy-controlled",
    affects: "Detection path · rail-scoped",
  },
  {
    focus: "settlement",
    downstream: ["settlement", "reconcile"],
    tag: "LEDGER · PROVISIONAL",
    hint: "Detected state is not finality",
    ownership: "Merchant-owned books",
    affects: "Downstream · reconciliation semantics",
  },
  {
    focus: "reconcile",
    downstream: ["reconcile"],
    tag: "LEDGER · RECONCILE REQUIRED",
    hint: "Finance owns recognition rules",
    ownership: "Finance / treasury policy",
    affects: "Finality · policy + rail thresholds",
  },
];

export const webhookInspectNodes: OpsInspectNode[] = [
  {
    focus: "ingress",
    downstream: ["ingress"],
    tag: "STATE · TRANSITION",
    hint: "Merchant backend → signed event",
    ownership: "Server-side emit",
    affects: "Lifecycle transition signal",
  },
  {
    focus: "ingress",
    downstream: ["ingress", "verify"],
    tag: "INGRESS · SIGNED",
    hint: "HTTPS POST · signature over raw bytes",
    ownership: "Merchant-owned endpoint",
    affects: "Downstream · verification boundary",
  },
  {
    focus: "verify",
    downstream: ["verify", "egress"],
    tag: "VERIFY · RAW BODY · SIGNED",
    hint: "Raw body checked before parse",
    ownership: "Server-side verification",
    affects: "Downstream · idempotent apply",
  },
  {
    focus: "egress",
    downstream: ["egress"],
    tag: "QUEUE · RETRY SAFE",
    hint: "Idempotent apply · retries expected",
    ownership: "Merchant-owned consumer",
    affects: "Internal ledger / order state",
  },
];

export const reviewInspectNodes: OpsInspectNode[] = [
  {
    focus: "review",
    downstream: ["review"],
    tag: "POLICY · INTAKE",
    hint: "Use case and rails intent captured",
    ownership: "Merchant-owned application",
    affects: "Qualification queue",
  },
  {
    focus: "review",
    downstream: ["review"],
    tag: "REVIEW · GATE",
    hint: "Risk and fit assessed procedurally",
    ownership: "Operations review",
    affects: "Technical outline gate",
  },
  {
    focus: "review",
    downstream: ["review", "verify"],
    tag: "SERVER-SIDE · OUTLINE",
    hint: "Integration outline before production",
    ownership: "Merchant engineering",
    affects: "Webhook + API readiness",
  },
  {
    focus: "review",
    downstream: ["review", "ingress"],
    tag: "ENVIRONMENT · GATED",
    hint: "Approval gates environment access",
    ownership: "Policy-controlled",
    affects: "Request access · production keys",
    linkGate: true,
  },
];

export const reconcileInspect: OpsInspectNode = {
  focus: "reconcile",
  downstream: ["reconcile", "settlement"],
  tag: "SETTLEMENT · DEPTH",
  hint: "Finance owns recognition rules",
  ownership: "Finance / treasury policy",
  affects: "Paid vs confirmed · not one boolean",
};
