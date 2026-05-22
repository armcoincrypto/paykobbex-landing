import type { Metadata } from "next";
import { JournalAuthorityPage } from "@/components/journal/JournalAuthorityPage";
import {
  EDITORIAL_PRINCIPLES_SECTIONS,
  editorialPrinciplesJsonLd,
} from "@/lib/journal/authority-content";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Editorial principles",
  description:
    "How Kobbopay Journal writes about crypto payment operations—operational perspective, bounded terminology, and infrastructure-first editorial standards.",
  alternates: { canonical: `${SITE_URL}/editorial-principles` },
  openGraph: {
    title: "Editorial principles — Kobbopay Journal",
    description:
      "Operational editorial standards: detection vs finality, reconciliation discipline, and bounded terminology.",
    url: `${SITE_URL}/editorial-principles`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial principles — Kobbopay",
    description: "Kobbopay Journal editorial and EEAT standards.",
    images: [OG_IMAGE.url],
  },
};

export default function EditorialPrinciplesPage() {
  return (
    <JournalAuthorityPage
      eyebrow="Kobbopay Journal"
      title="Editorial principles"
      lead="How we write about crypto payment operations—with operational honesty, bounded claims, and vocabulary finance and engineering can share under review."
      sections={EDITORIAL_PRINCIPLES_SECTIONS}
      jsonLd={editorialPrinciplesJsonLd()}
      footerLinks={[
        { href: "/blog", label: "Journal" },
        { href: "/about", label: "About" },
        { href: "/glossary", label: "Glossary" },
      ]}
    />
  );
}
