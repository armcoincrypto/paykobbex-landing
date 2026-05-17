import type { GuideSlug } from "@/lib/guides-meta";

/**
 * Canonical glossary entries for /glossary and /docs#glossary (single source of truth).
 * Copy is descriptive, bounded, and citation-friendly — not contractual enumeration.
 */
export type GlossaryGroupId = "lifecycle" | "webhooks" | "operations" | "merchant";

export type GlossaryTerm = {
  /** Stable anchor for /glossary#id */
  id: string;
  term: string;
  def: string;
  group: GlossaryGroupId;
  /** Optional deep links into evergreen guides */
  relatedGuides?: GuideSlug[];
};

export const GLOSSARY_GROUPS: Array<{
  id: GlossaryGroupId;
  label: string;
  description: string;
  termIds: string[];
}> = [
  {
    id: "lifecycle",
    label: "Lifecycle semantics",
    description: "States, transitions, and machine-readable payment progression.",
    termIds: ["payment-lifecycle", "pending", "paid", "confirmed", "expired", "lifecycle-status", "payment"],
  },
  {
    id: "webhooks",
    label: "Webhooks & delivery",
    description: "Signed callbacks, secrets, and idempotent consumption.",
    termIds: ["signed-webhook", "webhook-secret", "idempotency"],
  },
  {
    id: "operations",
    label: "Operations & finance",
    description: "Reconciliation, balances, and internal mapping discipline.",
    termIds: ["reconciliation", "merchant-balance"],
  },
  {
    id: "merchant",
    label: "Merchant controls",
    description: "Access gating, rails, and withdrawal boundaries.",
    termIds: ["merchant-approval", "selected-rails", "withdrawal-request"],
  },
];

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: "payment-lifecycle",
    term: "Payment lifecycle",
    def: "The progression of a single payment object through coarse states such as Pending, Paid, Confirmed, and terminal branches such as Expired. Exact names, ordering, and edge transitions depend on your approved deployment and enabled rails.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle", "reconciliation-and-confirmations"],
  },
  {
    id: "pending",
    term: "Pending",
    def: "Payment created / awaiting detection; not a guarantee of eventual success.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle"],
  },
  {
    id: "paid",
    term: "Paid",
    def: "Payment detected but not final for your reconciliation rules (exact detection rules are deployment-specific). Not interchangeable with Confirmed — finance and entitlements should follow your confirmation policy, not detection alone.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle", "reconciliation-and-confirmations"],
  },
  {
    id: "confirmed",
    term: "Confirmed",
    def: "Confirmation semantics met for the rail and policy you operate under — the usual gate for finality when confirmations matter. Differs from Paid when detection precedes policy-defined finality.",
    group: "lifecycle",
    relatedGuides: ["reconciliation-and-confirmations", "payment-lifecycle"],
  },
  {
    id: "expired",
    term: "Expired",
    def: "Payment window ended or configuration marks the path as expired—typically terminal for the original attempt unless recreated.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle"],
  },
  {
    id: "lifecycle-status",
    term: "Lifecycle status",
    def: "A machine-readable label used for reconciliation and automation; treat enums as deployment-specific, not universal constants.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle", "reconciliation-and-confirmations"],
  },
  {
    id: "payment",
    term: "Payment",
    def: "A server-created payable object with an amount, rail context, and stable `payment_id` used across API, portal, and webhooks.",
    group: "lifecycle",
    relatedGuides: ["payment-lifecycle", "server-side-api-keys"],
  },
  {
    id: "signed-webhook",
    term: "Signed webhook",
    def: "An HTTPS callback carrying a lifecycle event with a signature your backend verifies over raw body bytes before mutating internal state.",
    group: "webhooks",
    relatedGuides: ["webhook-verification"],
  },
  {
    id: "webhook-secret",
    term: "Webhook secret",
    def: "Shared secret material used to verify webhook authenticity; must live in server-side configuration and secret stores—never in browsers, mobile apps, or public repositories.",
    group: "webhooks",
    relatedGuides: ["webhook-verification", "server-side-api-keys"],
  },
  {
    id: "idempotency",
    term: "Idempotency",
    def: "Applying the same logical event more than once without corrupting state. Required for webhook retries and other at-least-once delivery paths.",
    group: "webhooks",
    relatedGuides: ["webhook-verification"],
  },
  {
    id: "reconciliation",
    term: "Reconciliation",
    def: "Mapping external payment states to internal orders, entitlements, and accounting rules. You own the business mapping; product semantics define what statuses mean operationally.",
    group: "operations",
    relatedGuides: ["reconciliation-and-confirmations"],
  },
  {
    id: "merchant-approval",
    term: "Merchant approval",
    def: "Access gating and environment setup required before API keys and rails are live for your integration.",
    group: "merchant",
    relatedGuides: ["merchant-onboarding"],
  },
  {
    id: "selected-rails",
    term: "Selected rails",
    def: "The enabled networks/assets and operational modes configured for your merchant account—not “everything everywhere.”",
    group: "merchant",
    relatedGuides: ["merchant-onboarding"],
  },
  {
    id: "withdrawal-request",
    term: "Withdrawal request",
    def: "A merchant-initiated request to move funds subject to controls and configuration; not a promise of instant universal settlement.",
    group: "merchant",
    relatedGuides: ["merchant-onboarding"],
  },
  {
    id: "merchant-balance",
    term: "Merchant balance",
    def: "A ledger-oriented view of funds attributed to your merchant account under product accounting rules—not a generic wallet slogan.",
    group: "operations",
  },
];

export function glossaryTermsForGroup(groupId: GlossaryGroupId): GlossaryTerm[] {
  const ids = GLOSSARY_GROUPS.find((g) => g.id === groupId)?.termIds ?? [];
  return ids
    .map((id) => GLOSSARY_TERMS.find((t) => t.id === id))
    .filter((t): t is GlossaryTerm => Boolean(t));
}
