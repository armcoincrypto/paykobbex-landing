import type { JournalArticle, JournalBlock, JournalHub } from "@/lib/journal/types";
import type { JournalArticleRelations } from "@/lib/journal/types";
import type { Metadata } from "next";
import { OG_IMAGE, OG_IMAGES, SITE_URL } from "@/lib/site";
import { journalHubPath } from "@/lib/journal/hubs";

function blockText(block: JournalBlock): string {
  switch (block.type) {
    case "p":
    case "callout":
      return block.text;
    case "definition":
      return `${block.term} ${block.text}`;
    case "quote":
      return block.text;
    case "h2":
    case "h3":
      return block.text;
    case "ul":
    case "ol":
      return block.items.join(" ");
    default:
      return "";
  }
}

export function estimateReadingMinutes(blocks: JournalBlock[]): number {
  const words = blocks
    .map(blockText)
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(6, Math.ceil(words / 220));
}

export function enrichArticle(article: JournalArticle): JournalArticle & { readingTimeMinutes: number } {
  return {
    ...article,
    readingTimeMinutes: estimateReadingMinutes(article.blocks),
  };
}

export function journalArticlePath(slug: string): string {
  return `/blog/${slug}`;
}

export function journalArticleMetadata(article: JournalArticle): Metadata {
  const path = journalArticlePath(article.slug);
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: `${article.metaTitle} — Kobbopay Journal`,
      description: article.metaDescription,
      url: `${SITE_URL}${path}`,
      type: "article",
      images: [...OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.metaTitle} — Kobbopay Journal`,
      description: article.metaDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export function journalArticleJsonLd(
  article: JournalArticle & { readingTimeMinutes: number },
  relations?: JournalArticleRelations,
) {
  const url = `${SITE_URL}${journalArticlePath(article.slug)}`;
  const hubUrl = `${SITE_URL}${journalHubPath(article.hubSlug)}`;
  const blogUrl = `${SITE_URL}/blog`;
  const seriesUrl = `${SITE_URL}/research#series`;

  const glossaryMentions =
    relations?.operationalReferences.glossary.slice(0, 6).map((g) => ({
      "@type": "DefinedTerm" as const,
      name: g.label,
      url: g.href.startsWith("http") ? g.href : `${SITE_URL}${g.href}`,
    })) ?? [];

  const graph: Record<string, unknown>[] = [
    {
      "@type": "TechArticle",
      "@id": `${url}#article`,
      headline: article.title,
      description: article.metaDescription,
      url,
      inLanguage: "en",
      articleSection: article.category,
      publisher: {
        "@type": "Organization",
        name: "Kobbopay",
        url: SITE_URL,
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: article.seoFocus.join(", "),
      timeRequired: `PT${article.readingTimeMinutes}M`,
      isPartOf: [
        { "@type": "CollectionPage", "@id": hubUrl, name: article.category },
        { "@type": "CollectionPage", "@id": blogUrl, name: "Kobbopay Journal" },
      ],
      ...(glossaryMentions.length > 0 ? { about: glossaryMentions } : {}),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Journal", item: blogUrl },
        { "@type": "ListItem", position: 3, name: "Research", item: `${SITE_URL}/research` },
        {
          "@type": "ListItem",
          position: 4,
          name: article.category,
          item: hubUrl,
        },
        { "@type": "ListItem", position: 5, name: article.title, item: url },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: article.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
  ];

  if (relations?.series) {
    graph.push({
      "@type": "ItemList",
      "@id": `${url}#series`,
      name: relations.series.name,
      url: seriesUrl,
      numberOfItems: relations.series.total,
      itemListOrder: "https://schema.org/ItemListOrderAscending",
      itemListElement: {
        "@type": "ListItem",
        position: relations.series.position,
        name: article.title,
        url,
      },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

export function journalHubMetadata(hub: JournalHub): Metadata {
  const path = journalHubPath(hub.slug);
  return {
    title: hub.metaTitle,
    description: hub.metaDescription,
    alternates: { canonical: `${SITE_URL}${path}` },
    openGraph: {
      title: hub.metaTitle,
      description: hub.metaDescription,
      url: `${SITE_URL}${path}`,
      type: "website",
      images: [...OG_IMAGES],
    },
    twitter: {
      card: "summary_large_image",
      title: hub.metaTitle,
      description: hub.metaDescription,
      images: [OG_IMAGE.url],
    },
  };
}

export function journalHubJsonLd(hub: JournalHub, articleUrls: string[]) {
  const url = `${SITE_URL}${journalHubPath(hub.slug)}`;
  const blogUrl = `${SITE_URL}/blog`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": url,
        name: hub.title,
        description: hub.metaDescription,
        url,
        inLanguage: "en",
        isPartOf: { "@type": "CollectionPage", "@id": blogUrl, name: "Kobbopay Journal" },
        publisher: { "@type": "Organization", name: "Kobbopay", url: SITE_URL },
        hasPart: articleUrls.map((articleUrl) => ({
          "@type": "TechArticle",
          url: articleUrl,
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Journal", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: hub.title, item: url },
        ],
      },
    ],
  };
}
