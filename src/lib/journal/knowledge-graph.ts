import { GLOSSARY_TERMS } from "@/lib/glossary-terms";
import { GUIDE_ENTRIES, guidePath } from "@/lib/guides-meta";
import { JOURNAL_ARTICLES, journalArticlePath, journalHubPath } from "@/lib/journal";
import { TOPICAL_CLUSTERS } from "@/lib/journal/topical-clusters";
import { JOURNAL_SERIES, JOURNAL_ARTICLE_AI_SUMMARIES } from "@/lib/journal/publication";
import { SITE_URL } from "@/lib/site";

export type KnowledgeGraphNode = {
  label: string;
  href: string;
  kind: "hub" | "article" | "guide" | "glossary" | "authority";
  summary?: string;
};

export type KnowledgeGraphCluster = {
  id: string;
  name: string;
  hubHref: string;
  intent: string;
  concepts: KnowledgeGraphNode[];
  articles: KnowledgeGraphNode[];
  guides: KnowledgeGraphNode[];
  relatedHubs: KnowledgeGraphNode[];
};

export function buildKnowledgeGraph(): {
  clusters: KnowledgeGraphCluster[];
  series: { name: string; articles: KnowledgeGraphNode[] };
  authority: KnowledgeGraphNode[];
} {
  const clusters: KnowledgeGraphCluster[] = TOPICAL_CLUSTERS.map((cluster) => {
    const articleSlugs = new Set(cluster.articleSlugs);

    return {
      id: cluster.id,
      name: cluster.name,
      hubHref: journalHubPath(cluster.hubSlug),
      intent: cluster.primaryIntent,
      concepts: cluster.concepts.map((c) => ({
        label: c.term,
        href: c.href,
        kind: "glossary" as const,
      })),
      articles: [...articleSlugs].map((slug) => {
        const article = JOURNAL_ARTICLES.find((a) => a.slug === slug)!;
        return {
          label: article.metaTitle,
          href: journalArticlePath(slug),
          kind: "article" as const,
          summary: JOURNAL_ARTICLE_AI_SUMMARIES[slug],
        };
      }),
      guides: cluster.guideSlugs.map((slug) => {
        const guide = GUIDE_ENTRIES.find((g) => g.slug === slug)!;
        return {
          label: guide.shortTitle,
          href: guidePath(slug),
          kind: "guide" as const,
        };
      }),
      relatedHubs: cluster.relatedClusterIds.map((id) => {
        const related = TOPICAL_CLUSTERS.find((c) => c.id === id)!;
        return {
          label: related.name,
          href: journalHubPath(related.hubSlug),
          kind: "hub" as const,
        };
      }),
    };
  });

  const seriesArticles = JOURNAL_SERIES.articleSlugs.map((slug) => {
    const article = JOURNAL_ARTICLES.find((a) => a.slug === slug)!;
    return {
      label: article.metaTitle,
      href: journalArticlePath(slug),
      kind: "article" as const,
      summary: JOURNAL_ARTICLE_AI_SUMMARIES[slug],
    };
  });

  const authority: KnowledgeGraphNode[] = [
    { label: "Journal index", href: "/blog", kind: "authority", summary: "Operational publication index." },
    { label: "Research index", href: "/research", kind: "authority", summary: "Curated operational research and series." },
    { label: "Editorial principles", href: "/editorial-principles", kind: "authority" },
    { label: "About Kobbopay", href: "/about", kind: "authority" },
    { label: "Glossary", href: "/glossary", kind: "authority", summary: `${GLOSSARY_TERMS.length} bounded operational terms.` },
    { label: "Guides", href: "/guides", kind: "authority" },
    { label: "Documentation", href: "/docs", kind: "authority" },
  ];

  return {
    clusters,
    series: { name: JOURNAL_SERIES.name, articles: seriesArticles },
    authority,
  };
}

export function knowledgeMapJsonLd() {
  const graph = buildKnowledgeGraph();
  const url = `${SITE_URL}/knowledge-map`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": url,
        name: "Kobbopay operational knowledge map",
        description:
          "Machine-readable map of topical clusters connecting journal hubs, articles, guides, and glossary terms for crypto payment operations.",
        url,
        inLanguage: "en",
        isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Kobbopay" },
        about: graph.clusters.map((c) => ({
          "@type": "Thing",
          name: c.name,
          description: c.intent,
          url: `${SITE_URL}${c.hubHref}`,
        })),
      },
      {
        "@type": "ItemList",
        name: JOURNAL_SERIES.name,
        itemListElement: graph.series.articles.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.label,
          url: `${SITE_URL}${item.href}`,
        })),
      },
    ],
  };
}
