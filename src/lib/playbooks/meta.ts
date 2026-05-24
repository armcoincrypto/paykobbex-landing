import type { Metadata } from "next";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export type PlaybookSlug =
  | "merchant-onboarding-rollout"
  | "webhook-secret-rotation"
  | "settlement-operations-checklist"
  | "reconciliation-close-procedure"
  | "treasury-recognition-procedure"
  | "delayed-settlement-recovery"
  | "duplicate-payment-investigation"
  | "underpayment-overpayment-handling"
  | "exception-queue-triage"
  | "provider-outage-response"
  | "confirmation-policy-escalation"
  | "merchant-payout-review"
  | "payment-incident-triage";

export type PlaybookCluster =
  | "infrastructure"
  | "webhooks"
  | "settlement"
  | "reconciliation"
  | "treasury"
  | "observability";

export const PLAYBOOK_ENTRIES: Array<{
  slug: PlaybookSlug;
  title: string;
  shortTitle: string;
  description: string;
  cluster: PlaybookCluster;
}> = [
  {
    slug: "merchant-onboarding-rollout",
    title: "Merchant onboarding rollout playbook",
    shortTitle: "Onboarding rollout",
    description:
      "Environment progression, rail enablement, integration validation, and go-live gates for approved merchant deployments—without invented timelines.",
    cluster: "infrastructure",
  },
  {
    slug: "webhook-secret-rotation",
    title: "Webhook secret rotation playbook",
    shortTitle: "Webhook secret rotation",
    description:
      "Overlapping secrets, verification cutover, handler validation, and rollback boundaries for production webhook endpoints.",
    cluster: "webhooks",
  },
  {
    slug: "settlement-operations-checklist",
    title: "Settlement operations checklist",
    shortTitle: "Settlement operations",
    description:
      "Daily and incident-oriented settlement controls: detection vs confirmation discipline, checkpoint review, and drift signals.",
    cluster: "settlement",
  },
  {
    slug: "reconciliation-close-procedure",
    title: "Reconciliation close procedure",
    shortTitle: "Reconciliation close",
    description:
      "Period-close workflow across commerce, provider, and finance planes—with freeze options and evidence requirements.",
    cluster: "reconciliation",
  },
  {
    slug: "treasury-recognition-procedure",
    title: "Treasury recognition procedure",
    shortTitle: "Treasury recognition",
    description:
      "Finance posting gates, dual-control checkpoints, and separation from lifecycle Confirmed states.",
    cluster: "treasury",
  },
  {
    slug: "delayed-settlement-recovery",
    title: "Delayed settlement recovery workflow",
    shortTitle: "Delayed settlement recovery",
    description:
      "When async settlement stretches hours or days—customer communication, exception routing, and finance hold patterns.",
    cluster: "settlement",
  },
  {
    slug: "duplicate-payment-investigation",
    title: "Duplicate payment investigation workflow",
    shortTitle: "Duplicate payment investigation",
    description:
      "Separate duplicate webhooks, duplicate chain observations, and duplicate commerce intents with evidence-first triage.",
    cluster: "reconciliation",
  },
  {
    slug: "underpayment-overpayment-handling",
    title: "Underpayment and overpayment handling",
    shortTitle: "Under/overpayment handling",
    description:
      "Tolerance policies, exception classes, customer resolution paths, and finance posting boundaries.",
    cluster: "reconciliation",
  },
  {
    slug: "exception-queue-triage",
    title: "Exception queue triage workflow",
    shortTitle: "Exception queue triage",
    description:
      "Route taxonomy-owned exceptions to support, treasury, engineering, or finance with SLAs defined by your policy—not ours.",
    cluster: "reconciliation",
  },
  {
    slug: "provider-outage-response",
    title: "Provider outage operational response",
    shortTitle: "Provider outage response",
    description:
      "Webhook gaps, API unavailability, and reconciliation freeze patterns when infrastructure signals degrade.",
    cluster: "infrastructure",
  },
  {
    slug: "confirmation-policy-escalation",
    title: "Confirmation policy escalation workflow",
    shortTitle: "Confirmation escalation",
    description:
      "When rail risk, amount thresholds, or ambiguous outcomes require human confirmation before progression.",
    cluster: "settlement",
  },
  {
    slug: "merchant-payout-review",
    title: "Merchant payout review workflow",
    shortTitle: "Payout review",
    description:
      "Withdrawal request validation, balance reconciliation, and payout orchestration gates before execution.",
    cluster: "treasury",
  },
  {
    slug: "payment-incident-triage",
    title: "Payment incident triage playbook",
    shortTitle: "Payment incident triage",
    description:
      "Classify degrading signals into incident classes and route to the correct playbook and reference—without skipping evidence or inventing severity levels.",
    cluster: "observability",
  },
];

export const PLAYBOOK_SLUGS = PLAYBOOK_ENTRIES.map((e) => e.slug);

export function playbookPath(slug: PlaybookSlug): string {
  return `/playbooks/${slug}`;
}

export function playbookMetadata(slug: PlaybookSlug): Metadata {
  const entry = PLAYBOOK_ENTRIES.find((e) => e.slug === slug)!;
  const path = playbookPath(slug);
  return {
    title: entry.shortTitle,
    description: entry.description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: `${entry.shortTitle} — Kobbopay playbooks`,
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

export function playbookBreadcrumbJsonLd(slug: PlaybookSlug, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Playbooks", item: `${SITE_URL}/playbooks` },
      { "@type": "ListItem", position: 3, name: name, item: `${SITE_URL}${playbookPath(slug)}` },
    ],
  };
}
