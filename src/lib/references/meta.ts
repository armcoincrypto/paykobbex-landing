import type { Metadata } from "next";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export type ReferenceSlug =
  | "rail-selection-matrix"
  | "confirmation-policy-matrix"
  | "reconciliation-state-model"
  | "settlement-checkpoint-model"
  | "provider-retry-semantics"
  | "webhook-delivery-expectations"
  | "asynchronous-settlement-lifecycle"
  | "merchant-ledger-transitions"
  | "operational-signal-catalog"
  | "payment-health-dashboard-model";

export const REFERENCE_ENTRIES: Array<{
  slug: ReferenceSlug;
  title: string;
  shortTitle: string;
  description: string;
}> = [
  {
    slug: "rail-selection-matrix",
    title: "Rail selection decision matrix",
    shortTitle: "Rail selection matrix",
    description:
      "Decision dimensions for enabling settlement and payout rails—risk, reconciliation cost, and operational maturity tradeoffs.",
  },
  {
    slug: "confirmation-policy-matrix",
    title: "Confirmation policy matrix",
    shortTitle: "Confirmation policy matrix",
    description:
      "Map amount tiers, asset types, and use cases to confirmation depth and human review gates—merchant-defined, not universal.",
  },
  {
    slug: "reconciliation-state-model",
    title: "Reconciliation state model",
    shortTitle: "Reconciliation state model",
    description:
      "States across commerce, provider, and finance planes—and allowed transitions when matchers succeed or fail.",
  },
  {
    slug: "settlement-checkpoint-model",
    title: "Settlement checkpoint model",
    shortTitle: "Settlement checkpoint model",
    description:
      "Checkpoint types, owners, and progression rules between detection, policy confirmation, and treasury posting.",
  },
  {
    slug: "provider-retry-semantics",
    title: "Provider retry semantics comparison",
    shortTitle: "Provider retry semantics",
    description:
      "Conceptual comparison of at-least-once delivery, handler response expectations, and idempotency responsibilities.",
  },
  {
    slug: "webhook-delivery-expectations",
    title: "Webhook delivery expectation model",
    shortTitle: "Webhook delivery model",
    description:
      "Ordering assumptions, duplicate delivery, replay windows, and observability signals for event-driven integrations.",
  },
  {
    slug: "asynchronous-settlement-lifecycle",
    title: "Asynchronous settlement lifecycle model",
    shortTitle: "Async settlement lifecycle",
    description:
      "Intermediate states when detection precedes confirmation and treasury posting—without collapsing to a single paid flag.",
  },
  {
    slug: "merchant-ledger-transitions",
    title: "Merchant ledger state transition reference",
    shortTitle: "Ledger state transitions",
    description:
      "Merchant ledger states, posting gates, and alignment with provider lifecycle labels under finance controls.",
  },
  {
    slug: "operational-signal-catalog",
    title: "Operational signal catalog",
    shortTitle: "Operational signal catalog",
    description:
      "Bounded observability signals for payment operations: webhook recency, checkpoint lag, exception depth, drift, provider latency, payout backlog.",
  },
  {
    slug: "payment-health-dashboard-model",
    title: "Payment health dashboard model",
    shortTitle: "Dashboard model",
    description:
      "Role-oriented dashboard concepts for finance, integration, support, treasury, and executive views—anti-patterns for single-plane dashboards.",
  },
];

export const REFERENCE_SLUGS = REFERENCE_ENTRIES.map((e) => e.slug);

export function referencePath(slug: ReferenceSlug): string {
  return `/references/${slug}`;
}

export function referenceMetadata(slug: ReferenceSlug): Metadata {
  const entry = REFERENCE_ENTRIES.find((e) => e.slug === slug)!;
  const path = referencePath(slug);
  return {
    title: entry.shortTitle,
    description: entry.description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: `${entry.shortTitle} — Kobbopay references`,
      description: entry.description,
      url: `${SITE_URL}${path}`,
      type: "website",
      images: [...OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.shortTitle} — Kobbopay`,
      description: entry.description,
      images: [OG_IMAGE.url],
    },
  };
}

export function referenceBreadcrumbJsonLd(slug: ReferenceSlug, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "References", item: `${SITE_URL}/references` },
      { "@type": "ListItem", position: 3, name: name, item: `${SITE_URL}${referencePath(slug)}` },
    ],
  };
}
