import type { Metadata } from "next";
import { JournalHome } from "@/components/journal/JournalHome";
import { SITE_URL, OG_IMAGES, OG_IMAGE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Kobbopay Journal — operational notes on crypto payments, settlement, webhooks, and merchant infrastructure.",
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Kobbopay Journal",
    description:
      "Operational notes on crypto payments, settlement, webhooks, and merchant infrastructure.",
    url: `${SITE_URL}/blog`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kobbopay Journal — Kobbopay",
    description:
      "Operational notes on crypto payments, settlement, webhooks, and merchant infrastructure.",
    images: [OG_IMAGE.url],
  },
};

export default function BlogPage() {
  return <JournalHome />;
}
