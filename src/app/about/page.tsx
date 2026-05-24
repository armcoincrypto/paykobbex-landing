import type { Metadata } from "next";
import { JournalAuthorityPage } from "@/components/journal/JournalAuthorityPage";
import { ABOUT_SECTIONS, aboutJsonLd } from "@/lib/journal/authority-content";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Kobbopay",
  description:
    "API-first B2B crypto payment infrastructure—operational reliability, settlement clarity, webhook verification, and reconciliation discipline for reviewed merchants.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About Kobbopay",
    description:
      "Institutional positioning for crypto payment infrastructure: lifecycle semantics, signed webhooks, and merchant-controlled reconciliation.",
    url: `${SITE_URL}/about`,
    type: "website",
    images: [...OG_IMAGES],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Kobbopay",
    description: "B2B crypto payment infrastructure positioning.",
    images: [OG_IMAGE.url],
  },
};

export default function AboutPage() {
  return (
    <JournalAuthorityPage
      eyebrow="Kobbopay"
      title="About"
      lead="API-first crypto payment infrastructure for merchants who need operational clarity—not marketing noise—across lifecycle, webhooks, and reconciliation."
      sections={ABOUT_SECTIONS}
      jsonLd={aboutJsonLd()}
      footerLinks={[
        { href: "/blog", label: "Journal" },
        { href: "/editorial-principles", label: "Editorial principles" },
        { href: "/docs", label: "Documentation" },
        { href: "/request-access", label: "Request access" },
      ]}
    />
  );
}
