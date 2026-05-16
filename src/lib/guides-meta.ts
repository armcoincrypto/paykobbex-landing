import type { Metadata } from "next";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export type GuideSlug =
  | "payment-lifecycle"
  | "webhook-verification"
  | "reconciliation-and-confirmations"
  | "server-side-api-keys"
  | "merchant-onboarding";

export const GUIDE_ENTRIES: Array<{
  slug: GuideSlug;
  title: string;
  shortTitle: string;
  description: string;
}> = [
  {
    slug: "payment-lifecycle",
    title: "Payment lifecycle for B2B crypto integrations",
    shortTitle: "Payment lifecycle",
    description:
      "What Pending, Paid, Confirmed, and Expired mean operationally—and how teams align finance, support, and engineering without over-claiming finality.",
  },
  {
    slug: "webhook-verification",
    title: "Signed webhook verification for crypto payment events",
    shortTitle: "Webhook verification",
    description:
      "Why raw-body verification matters, how retries interact with idempotency, and what security teams should expect from a mature integration.",
  },
  {
    slug: "reconciliation-and-confirmations",
    title: "Reconciliation, confirmations, and lifecycle semantics",
    shortTitle: "Reconciliation & confirmations",
    description:
      "How to avoid collapsing “detected funds” into “final” when your accounting depends on confirmations—without inventing universal chain guarantees.",
  },
  {
    slug: "server-side-api-keys",
    title: "Server-side API keys for crypto payment APIs",
    shortTitle: "Server-side API keys",
    description:
      "Where secrets belong, what “server-to-server” implies for checkout UX, and common anti-patterns that create preventable incidents.",
  },
  {
    slug: "merchant-onboarding",
    title: "Merchant onboarding expectations for Kobbopay",
    shortTitle: "Merchant onboarding",
    description:
      "What approval gating is for, how rails get enabled, and what a serious integration discussion covers—without promising timelines you cannot keep publicly.",
  },
];

export function guidePath(slug: GuideSlug): string {
  return `/guides/${slug}`;
}

export function guideMetadata(slug: GuideSlug): Metadata {
  const g = GUIDE_ENTRIES.find((e) => e.slug === slug)!;
  const path = guidePath(slug);
  return {
    title: g.shortTitle,
    description: g.description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: `${g.shortTitle} — Kobbopay guides`,
      description: g.description,
      url: `${SITE_URL}${path}`,
      type: "website",
      images: [...OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: `${g.shortTitle} — Kobbopay`,
      description: g.description,
      images: [OG_IMAGE.url],
    },
  };
}

export function guideBreadcrumbJsonLd(slug: GuideSlug, name: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Guides", item: `${SITE_URL}/guides` },
      { "@type": "ListItem", position: 3, name: name, item: `${SITE_URL}${guidePath(slug)}` },
    ],
  };
}
