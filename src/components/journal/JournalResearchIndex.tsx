import { Link } from "@/components/primitives/link";
import { Container } from "@/components/primitives/Container";
import { JournalArticleCard } from "@/components/journal/JournalArticleCard";
import { JournalTopicalClusters } from "@/components/journal/JournalTopicalClusters";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getJournalFeaturedArticle,
  JOURNAL_SERIES,
  JOURNAL_ARTICLES,
  journalArticlePath,
} from "@/lib/journal";
import { JOURNAL_TOPIC_ROADMAP } from "@/lib/journal/publication";
import { SITE_URL } from "@/lib/site";

function researchIndexJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/research`,
        name: "Kobbopay operational research",
        description:
          "Curated operational research on crypto payment settlement, webhooks, reconciliation, and infrastructure.",
        url: `${SITE_URL}/research`,
        isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Kobbopay" },
        hasPart: JOURNAL_ARTICLES.map((a) => ({
          "@type": "TechArticle",
          url: `${SITE_URL}${journalArticlePath(a.slug)}`,
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${SITE_URL}/research#series`,
        name: JOURNAL_SERIES.name,
        description: JOURNAL_SERIES.description,
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        numberOfItems: JOURNAL_SERIES.articleSlugs.length,
        itemListElement: JOURNAL_SERIES.articleSlugs.map((slug, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}${journalArticlePath(slug)}`,
        })),
      },
    ],
  };
}

export function JournalResearchIndex() {
  const featured = getJournalFeaturedArticle();

  return (
    <>
      <JsonLd id="ld-json-research" data={researchIndexJsonLd()} />

      <div className="journal-publication">
        <div className="journal-publication__frame" aria-hidden="true" />
        <Container className="journal-publication__container">
          <header className="journal-masthead">
            <p className="journal-masthead__eyebrow">Kobbopay · Research</p>
            <h1 className="journal-masthead__title">Operational payment research</h1>
            <p className="journal-masthead__lead">
              Curated infrastructure research for finance, treasury, engineering, and payment
              operations—settlement discipline, webhook verification, reconciliation, and merchant
              controls.
            </p>
            <div className="journal-masthead__stats">
              <Link href="/blog" className="journal-index__footer-link no-underline" muted>
                Full journal
              </Link>
              <span className="journal-masthead__stat-sep">·</span>
              <Link href="/knowledge-map" className="journal-index__footer-link no-underline" muted>
                Knowledge map
              </Link>
              <span className="journal-masthead__stat-sep">·</span>
              <Link href="/editorial-principles" className="journal-index__footer-link no-underline" muted>
                Editorial principles
              </Link>
            </div>
          </header>

          <section aria-labelledby="research-featured">
            <h2 id="research-featured" className="journal-index__section-label">
              Featured research
            </h2>
            <JournalArticleCard article={featured} featured />
          </section>

          <section id="series" className="journal-research__series" aria-labelledby="research-series">
            <h2 id="research-series" className="journal-index__section-label">
              {JOURNAL_SERIES.name}
            </h2>
            <p className="journal-research__series-desc">{JOURNAL_SERIES.description}</p>
            <ol className="journal-research__series-list list-none p-0 m-0">
              {JOURNAL_SERIES.articleSlugs.map((slug, index) => {
                const article = JOURNAL_ARTICLES.find((a) => a.slug === slug)!;
                return (
                  <li key={slug} className="journal-research__series-item">
                    <span className="journal-research__series-num">{index + 1}</span>
                    <JournalArticleCard article={article} index={index} />
                  </li>
                );
              })}
            </ol>
          </section>

          <JournalTopicalClusters compact />

          <section className="journal-research__roadmap" aria-labelledby="research-roadmap">
            <h2 id="research-roadmap" className="journal-index__section-label">
              Topic roadmap
            </h2>
            <p className="journal-research__roadmap-note">
              Editorial queue for future operational notes. No publication dates until content ships.
            </p>
            <ul className="journal-research__roadmap-list list-none p-0 m-0">
              {JOURNAL_TOPIC_ROADMAP.map((entry) => (
                <li key={entry.topic} className="journal-research__roadmap-entry">
                  <span className={`journal-research__roadmap-status journal-research__roadmap-status--${entry.status}`}>
                    {entry.status}
                  </span>
                  <div>
                    {entry.slug ? (
                      <Link href={journalArticlePath(entry.slug)} className="journal-research__roadmap-title no-underline">
                        {entry.topic}
                      </Link>
                    ) : (
                      <span className="journal-research__roadmap-title">{entry.topic}</span>
                    )}
                    <p className="journal-research__roadmap-meta">
                      {entry.cluster} — {entry.note}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </div>
    </>
  );
}
