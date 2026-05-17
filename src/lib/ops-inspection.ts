/** Conceptual route groups for infrastructure inspection (not live data). */
export type OpsInspectRoute =
  | "ingress"
  | "verify"
  | "settlement"
  | "reconcile"
  | "egress"
  | "review";

/** Journey lens — contextual emphasis without user accounts or selectors. */
export type OpsJourneyLens = "engineering" | "finance" | "operations";

export type OpsInspectState = {
  focus: OpsInspectRoute;
  downstream: OpsInspectRoute[];
  /** Highlights gated request-access CTA when approval/review is inspected. */
  linkGate?: boolean;
  /** Contextual operational emphasis (P29). */
  lens?: OpsJourneyLens;
} | null;

export type OpsJourneyGuidanceLink = {
  label: string;
  href: string;
};

/** Operational narrative for a single inspectable stage (conceptual only). */
export type OpsInspectNode = {
  focus: OpsInspectRoute;
  downstream: OpsInspectRoute[];
  tag: string;
  hint: string;
  ownership: string;
  affects: string;
  purpose: string;
  consequence: string;
  causeEffect: string;
  trustBoundary?: string;
  riskPrevented?: string;
  /** Contextual journey emphasis for this stage (P29). */
  journeyLens: OpsJourneyLens;
  /** Role-aware procedural echo (P29). */
  personaEcho?: string;
  /** Readiness semantics for mature integrations (P29). */
  readiness?: string;
  /** Governance / policy ownership (P30, optional override). */
  governance?: string;
  /** Failure isolation framing (P30, optional override). */
  isolation?: string;
  /** Procedural accountability (P30, optional override). */
  accountability?: string;
  linkGate?: boolean;
};

/** Production credibility semantics per route (P30). */
export type OpsCredibilityContext = {
  governance: string;
  isolation: string;
  accountability: string;
};

export const lifecycleInspectNodes: OpsInspectNode[] = [
  {
    focus: "settlement",
    downstream: ["settlement"],
    tag: "STATE · POLICY GATED",
    hint: "Created — awaiting on-chain detection",
    ownership: "Policy-controlled",
    affects: "Detection path · rail-scoped",
    purpose: "Detection exists before settlement confidence.",
    consequence: "Downstream stages assume an explicit open attempt — not implicit completion.",
    causeEffect: "Engineering watches detection — finance does not recognize revenue yet.",
    trustBoundary: "Settlement semantics differ from detection semantics.",
    riskPrevented: "Premature revenue recognition from chain activity alone.",
    journeyLens: "engineering",
    personaEcho: "Engineering verifies API-created state before settlement confidence.",
    readiness: "Engineering readiness: explicit lifecycle labels before recognition.",
  },
  {
    focus: "settlement",
    downstream: ["settlement", "reconcile"],
    tag: "LEDGER · PROVISIONAL",
    hint: "Detected state is not finality",
    ownership: "Merchant-owned books",
    affects: "Downstream · reconciliation semantics",
    purpose: "Observed funds are not necessarily recognized revenue.",
    consequence: "Reconciliation ownership activates — confirmation rules apply next.",
    causeEffect: "Finance and engineering view this state differently by design.",
    trustBoundary: "Operational ownership changes after detection — not after API create.",
    riskPrevented: "Treating chain visibility as final settlement.",
    journeyLens: "finance",
    personaEcho: "Finance recognizes settled funds under policy — not on detection alone.",
    readiness: "Reconciliation readiness: provisional state stays separate from finality.",
  },
  {
    focus: "reconcile",
    downstream: ["reconcile"],
    tag: "LEDGER · RECONCILE REQUIRED",
    hint: "Finance owns recognition rules",
    ownership: "Finance / treasury policy",
    affects: "Finality · policy + rail thresholds",
    purpose: "Recognition rules depend on rail policy and confirmation semantics.",
    consequence: "Books may treat this as final only when your policy thresholds are met.",
    causeEffect: "Treasury controls align to rail-enabled thresholds — not a single paid flag.",
    trustBoundary: "Reconciliation boundaries sit outside the payment API surface.",
    riskPrevented: "Collapsing policy, rail, and ledger semantics into one boolean.",
    journeyLens: "finance",
    personaEcho: "Finance owns confirmation semantics and ledger alignment.",
    readiness: "Recognition workflows depend on reconciliation policy.",
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
    purpose: "Lifecycle transitions surface as signed events to your stack.",
    consequence: "Your consumer must treat delivery as untrusted until verified.",
    causeEffect: "Merchant backend receives the signal — verification is still required.",
    trustBoundary: "Ingress is signed — not implicitly trusted.",
    riskPrevented: "Acting on unverified callback payloads.",
    journeyLens: "engineering",
    personaEcho: "Engineering verifies signatures before mutation.",
    readiness: "Webhook consumers should remain replay-safe.",
  },
  {
    focus: "ingress",
    downstream: ["ingress", "verify"],
    tag: "INGRESS · SIGNED",
    hint: "HTTPS POST · signature over raw bytes",
    ownership: "Merchant-owned endpoint",
    affects: "Downstream · verification boundary",
    purpose: "Signed POST preserves integrity over the raw request body.",
    consequence: "Verification boundary must run before parse or state mutation.",
    causeEffect: "Signature is checked on bytes — not on a re-serialized JSON view.",
    trustBoundary: "Raw-body verification prevents signature drift.",
    riskPrevented: "Signature mismatch from parsed-body verification.",
    journeyLens: "engineering",
    personaEcho: "Engineering verifies signatures before mutation.",
    readiness: "Server-side API keys and raw-body verification stay paired.",
  },
  {
    focus: "verify",
    downstream: ["verify", "egress"],
    tag: "VERIFY · RAW BODY · SIGNED",
    hint: "Raw body checked before parse",
    ownership: "Server-side verification",
    affects: "Downstream · idempotent apply",
    purpose: "Verification occurs before state mutation.",
    consequence: "Apply may proceed only after the trust boundary passes.",
    causeEffect: "Apply depends on verification — retries stay safe downstream.",
    trustBoundary: "Server-side ownership — never client-trusted secrets.",
    riskPrevented: "State updates from forged or replayed callbacks.",
    journeyLens: "engineering",
    personaEcho: "Engineering verifies signatures before mutation.",
    readiness: "Verification precedes parse, apply, and internal state updates.",
    governance: "Verification authority stays server-side.",
    isolation: "State mutation isolated until signature trust passes.",
    accountability: "Engineering signs off on trust before apply.",
  },
  {
    focus: "egress",
    downstream: ["egress"],
    tag: "QUEUE · RETRY SAFE",
    hint: "Idempotent apply · retries expected",
    ownership: "Merchant-owned consumer",
    affects: "Internal ledger / order state",
    purpose: "Idempotent apply absorbs duplicate deliveries without double effects.",
    consequence: "Internal systems converge — external retries are normal.",
    causeEffect: "Downstream ledger updates assume at-least-once delivery.",
    trustBoundary: "Consumer owns idempotency keys and deduplication policy.",
    riskPrevented: "Double-spend in internal order state from retries.",
    journeyLens: "engineering",
    personaEcho: "Engineering designs consumers for at-least-once delivery.",
    readiness: "Webhook consumers should remain replay-safe.",
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
    purpose: "Intake establishes rails intent before technical enablement.",
    consequence: "Unsupported combinations should fail early — not in production.",
    causeEffect: "Policy review precedes environment configuration.",
    trustBoundary: "Merchant-owned application data — operations assesses fit.",
    riskPrevented: "Production paths enabled without fit review.",
    journeyLens: "operations",
    personaEcho: "Operations reviews enablement scope before production paths open.",
    readiness: "Operational fit is reviewed before production enablement.",
  },
  {
    focus: "review",
    downstream: ["review"],
    tag: "REVIEW · GATE",
    hint: "Risk and fit assessed procedurally",
    ownership: "Operations review",
    affects: "Technical outline gate",
    purpose: "Risk and fit are assessed before integration depth increases.",
    consequence: "Technical outline proceeds only after qualification.",
    causeEffect: "Review gate blocks premature production assumptions.",
    riskPrevented: "High-risk integrations entering live traffic unchecked.",
    journeyLens: "operations",
    personaEcho: "Operations reviews enablement scope before production paths open.",
    readiness: "Production enablement follows operational review.",
  },
  {
    focus: "review",
    downstream: ["review", "verify"],
    tag: "SERVER-SIDE · OUTLINE",
    hint: "Integration outline before production",
    ownership: "Merchant engineering",
    affects: "Webhook + API readiness",
    purpose: "Integration outline aligns webhook and API expectations.",
    consequence: "Verification and lifecycle semantics are agreed before go-live.",
    causeEffect: "Engineering maps server-side verification before enablement.",
    trustBoundary: "Server-side secrets remain off client surfaces.",
    riskPrevented: "Live traffic before webhook verification is understood.",
    journeyLens: "engineering",
    personaEcho: "Engineering maps verification and lifecycle semantics before go-live.",
    readiness: "Engineering readiness: webhook verification understood before rollout.",
  },
  {
    focus: "review",
    downstream: ["review", "ingress"],
    tag: "ENVIRONMENT · GATED",
    hint: "Approval gates environment access",
    ownership: "Policy-controlled",
    affects: "Request access · production keys",
    purpose: "Environment access is gated before production enablement.",
    consequence: "Portal, rails, and endpoints unlock after approval — not at signup.",
    causeEffect: "Request access follows review — production keys are not self-serve.",
    trustBoundary: "Policy gating controls operational enablement.",
    riskPrevented: "Anonymous production credentials on day one.",
    journeyLens: "operations",
    personaEcho: "Operations reviews enablement scope before production paths open.",
    readiness: "Production enablement follows operational review.",
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
  purpose: "Settlement depth separates detection, provisional, and final semantics.",
  consequence: "Finance and engineering share vocabulary — not one “paid” flag.",
  causeEffect: "Operational ownership shifts when confirmation thresholds are met.",
  trustBoundary: "Reconciliation boundaries differ from API lifecycle labels.",
  riskPrevented: "Accounting drift from ambiguous finality.",
  journeyLens: "finance",
  personaEcho: "Finance owns confirmation semantics and ledger alignment.",
  readiness: "Recognition workflows depend on reconciliation policy.",
  governance: "Finance owns recognition authority.",
  isolation: "Ledger finality isolated from API lifecycle labels.",
  accountability: "Treasury policy governs operational signoff on recognition.",
};

export const narrativeBeacons: Record<OpsInspectRoute, string> = {
  ingress: "Signed events enter your stack — trust boundaries apply before mutation.",
  verify: "Verification occurs before state mutation on merchant systems.",
  settlement: "Detection and settlement confidence are intentionally separate stages.",
  reconcile: "Finance owns recognition — operational labels are not your ledger.",
  egress: "Idempotent apply closes the loop — retries remain expected.",
  review: "Operational gating precedes environment and production enablement.",
};

/** Contextual doc links surfaced on route focus (P29). */
export const journeyGuidanceByRoute: Record<OpsInspectRoute, readonly OpsJourneyGuidanceLink[]> = {
  ingress: [
    { label: "Webhook verification", href: "/guides/webhook-verification" },
    { label: "Integration docs", href: "/docs" },
  ],
  verify: [
    { label: "Webhook verification", href: "/guides/webhook-verification" },
    { label: "Server-side API keys", href: "/guides/server-side-api-keys" },
  ],
  egress: [
    { label: "Webhook verification", href: "/guides/webhook-verification" },
    { label: "Payment lifecycle", href: "/guides/payment-lifecycle" },
  ],
  settlement: [
    { label: "Payment lifecycle", href: "/guides/payment-lifecycle" },
    { label: "Reconciliation & confirmations", href: "/guides/reconciliation-and-confirmations" },
  ],
  reconcile: [
    { label: "Reconciliation & confirmations", href: "/guides/reconciliation-and-confirmations" },
    { label: "Confirmation semantics", href: "/guides/reconciliation-and-confirmations" },
  ],
  review: [
    { label: "Onboarding expectations", href: "/onboarding" },
    { label: "Merchant onboarding guide", href: "/guides/merchant-onboarding" },
  ],
};

/** Route-level persona and readiness when inspecting a route group (P29). */
export const journeyContextByRoute: Record<
  OpsInspectRoute,
  { personaEcho: string; readiness: string }
> = {
  ingress: {
    personaEcho: "Engineering verifies signatures before mutation.",
    readiness: "Webhook consumers should remain replay-safe.",
  },
  verify: {
    personaEcho: "Engineering verifies signatures before mutation.",
    readiness: "Verification precedes state mutation on your systems.",
  },
  egress: {
    personaEcho: "Engineering designs consumers for at-least-once delivery.",
    readiness: "Webhook consumers should remain replay-safe.",
  },
  settlement: {
    personaEcho: "Finance and engineering share lifecycle vocabulary by design.",
    readiness: "Settlement semantics vary by enabled rail and policy.",
  },
  reconcile: {
    personaEcho: "Finance recognizes settled funds under policy.",
    readiness: "Recognition workflows depend on reconciliation policy.",
  },
  review: {
    personaEcho: "Operations reviews enablement scope before production paths open.",
    readiness: "Production enablement follows operational review.",
  },
};

export const opsStorySequence = [
  { step: "01", label: "API-created payments", route: "settlement" as const },
  { step: "02", label: "Detection semantics", route: "settlement" as const },
  { step: "03", label: "Verification boundary", route: "verify" as const },
  { step: "04", label: "Settlement logic", route: "settlement" as const },
  { step: "05", label: "Reconciliation ownership", route: "reconcile" as const },
  { step: "06", label: "Operational gating", route: "review" as const },
  { step: "07", label: "Controlled enablement", route: "ingress" as const },
] as const;

/** Guided operational maturity journey (P29E + P30 governance). */
export const opsMaturityJourney = [
  {
    step: "01",
    label: "Infrastructure surface",
    route: "settlement" as const,
    lens: "engineering" as const,
    readiness: "Explicit lifecycles before recognition.",
    governance: "Operational labels remain bounded — not implicit finality.",
  },
  {
    step: "02",
    label: "Verification correctness",
    route: "verify" as const,
    lens: "engineering" as const,
    readiness: "Verify before parse or apply.",
    governance: "Verification precedes mutation — scoped engineering authority.",
  },
  {
    step: "03",
    label: "Replay-safe processing",
    route: "egress" as const,
    lens: "engineering" as const,
    readiness: "Webhook consumers should remain replay-safe.",
    governance: "Retries stay contained — consumer owns deduplication.",
  },
  {
    step: "04",
    label: "Settlement semantics",
    route: "settlement" as const,
    lens: "finance" as const,
    readiness: "Settlement semantics vary by rail.",
    governance: "Settlement uncertainty stays explicit — policy-scoped.",
  },
  {
    step: "05",
    label: "Reconciliation discipline",
    route: "reconcile" as const,
    lens: "finance" as const,
    readiness: "Recognition workflows depend on reconciliation policy.",
    governance: "Finance owns recognition authority — labels are not the ledger.",
  },
  {
    step: "06",
    label: "Operational review",
    route: "review" as const,
    lens: "operations" as const,
    readiness: "Production enablement follows operational review.",
    governance: "Enablement governance — review before production paths.",
  },
  {
    step: "07",
    label: "Controlled production enablement",
    route: "ingress" as const,
    lens: "operations" as const,
    readiness: "Scoped environments and procedural keys.",
    governance: "Environment isolation — rollout stays intentionally bounded.",
  },
] as const;

/** Static governance principles (conceptual — not certifications). */
export const opsGovernancePrinciples = [
  "Policy ownership — scoped operational authority.",
  "Failures stay bounded — surfaces do not cascade unchecked.",
  "Verification precedes state mutation.",
  "Finance owns recognition — engineering owns verification.",
  "Production enablement follows operational review.",
] as const;

/** Route-level production credibility (P30). */
export const credibilityContextByRoute: Record<OpsInspectRoute, OpsCredibilityContext> = {
  ingress: {
    governance: "Ingress trust is bounded — delivery is not authority.",
    isolation: "Signed events stay isolated until verified on your stack.",
    accountability: "Engineering owns endpoint verification before mutation.",
  },
  verify: {
    governance: "Verification authority stays server-side.",
    isolation: "Parse and apply remain behind the verify boundary.",
    accountability: "Engineering signs off on trust before state changes.",
  },
  egress: {
    governance: "Consumer policy governs idempotency and replay handling.",
    isolation: "Duplicate delivery contained by deduplication — not ignored.",
    accountability: "Engineering owns replay-safe consumer semantics.",
  },
  settlement: {
    governance: "Settlement semantics are policy-scoped per rail.",
    isolation: "Detection, provisional, and final states stay separated.",
    accountability: "Finance and engineering share labels — distinct ownership.",
  },
  reconcile: {
    governance: "Recognition rules sit under treasury policy.",
    isolation: "Reconciliation scope stays outside API convenience fields.",
    accountability: "Finance owns finality — operational signoff on recognition.",
  },
  review: {
    governance: "Operational review authority gates enablement.",
    isolation: "Environments stay partitioned until fit is confirmed.",
    accountability: "Operations owns enablement scope — not self-serve production.",
  },
};

/** Plane-level credibility beacon on inspect (P30). */
export const credibilityBeacons: Record<OpsInspectRoute, string> = {
  ingress: "Bounded trust at ingress — procedural accountability before mutation.",
  verify: "Verification discipline — failures isolated before state change.",
  egress: "Replay containment — procedural resilience without alarm theater.",
  settlement: "Settlement governance — uncertainty explicit, not collapsed.",
  reconcile: "Reconciliation authority — finance ownership stays legible.",
  review: "Enablement governance — production paths remain intentionally controlled.",
};

export const journeyLensLabels: Record<OpsJourneyLens, string> = {
  engineering: "Engineering · APIs & verification",
  finance: "Finance · reconciliation & recognition",
  operations: "Operations · enablement & review",
};

export function inspectStateFromNode(node: OpsInspectNode): NonNullable<OpsInspectState> {
  return {
    focus: node.focus,
    downstream: node.downstream,
    linkGate: node.linkGate,
    lens: node.journeyLens,
  };
}

export function resolveJourneyLens(
  route: OpsInspectRoute,
  linkGate?: boolean,
): OpsJourneyLens {
  if (linkGate || route === "review") return "operations";
  if (route === "reconcile") return "finance";
  if (route === "verify" || route === "egress") return "engineering";
  if (route === "ingress") return linkGate ? "operations" : "engineering";
  if (route === "settlement") return "finance";
  return "engineering";
}

export function getNarrativeBeacon(route: OpsInspectRoute): string {
  return narrativeBeacons[route];
}

export function getJourneyContext(route: OpsInspectRoute) {
  return journeyContextByRoute[route];
}

export function getJourneyGuidance(route: OpsInspectRoute) {
  return journeyGuidanceByRoute[route];
}

export function getCredibilityContext(route: OpsInspectRoute): OpsCredibilityContext {
  return credibilityContextByRoute[route];
}

export function getCredibilityBeacon(route: OpsInspectRoute): string {
  return credibilityBeacons[route];
}

/** Merged credibility for a stage — node overrides route defaults. */
export function getCredibilityForNode(node: OpsInspectNode): OpsCredibilityContext {
  const base = credibilityContextByRoute[node.focus];
  return {
    governance: node.governance ?? base.governance,
    isolation: node.isolation ?? base.isolation,
    accountability: node.accountability ?? base.accountability,
  };
}
