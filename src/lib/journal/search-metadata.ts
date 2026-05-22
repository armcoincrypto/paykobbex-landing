import type { Metadata } from "next";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export function researchIndexMetadata(): Metadata {
  const path = "/research";
  const description =
    "Curated operational research from Kobbopay Journal—settlement finality, webhook verification, reconciliation, stablecoin treasury flows, and payment infrastructure for B2B teams.";
  return {
    title: "Operational research",
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: "Operational research — Kobbopay Journal",
      description,
      url: `${SITE_URL}${path}`,
      type: "website",
      images: [...OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: "Operational research — Kobbopay",
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function knowledgeMapMetadata(): Metadata {
  const path = "/knowledge-map";
  const description =
    "Machine-readable map of Kobbopay operational topics—clusters, journal articles, guides, and glossary terms for settlement, webhooks, reconciliation, and infrastructure.";
  return {
    title: "Operational knowledge map",
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: "Operational knowledge map — Kobbopay",
      description,
      url: `${SITE_URL}${path}`,
      type: "website",
      images: [...OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: "Knowledge map — Kobbopay",
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function journalIndexMetadata(): Metadata {
  const path = "/blog";
  const description =
    "Kobbopay Journal — operational research on crypto payment settlement, signed webhooks, reconciliation, stablecoin treasury flows, and B2B payment infrastructure.";
  return {
    title: "Journal — operational payment research",
    description,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: "Kobbopay Journal — operational payment research",
      description,
      url: `${SITE_URL}${path}`,
      type: "website",
      images: [...OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: "Kobbopay Journal",
      description,
      images: [OG_IMAGE.url],
    },
  };
}
