import { Link } from "@/components/primitives/link";
import { TOPICAL_CLUSTERS, clusterHubPath } from "@/lib/journal/topical-clusters";
import { journalArticlePath, JOURNAL_ARTICLES } from "@/lib/journal";

export function JournalTopicalClusters({ compact = false }: { compact?: boolean }) {
  return (
    <section className="journal-clusters" aria-labelledby="journal-clusters-heading">
      <h2 id="journal-clusters-heading" className="journal-index__section-label">
        Topical clusters
      </h2>
      <ul className={`journal-clusters__grid list-none p-0 m-0 ${compact ? "journal-clusters__grid--compact" : ""}`}>
        {TOPICAL_CLUSTERS.map((cluster) => (
          <li key={cluster.id} className="journal-clusters__item">
            <Link href={clusterHubPath(cluster.id)} className="journal-clusters__link no-underline">
              <span className="journal-clusters__name">{cluster.name}</span>
              {!compact ? (
                <span className="journal-clusters__intent">{cluster.primaryIntent}</span>
              ) : null}
            </Link>
            <ul className="journal-clusters__articles list-none p-0 m-0">
              {cluster.articleSlugs.map((slug) => {
                const article = JOURNAL_ARTICLES.find((a) => a.slug === slug);
                return (
                  <li key={slug}>
                    <Link href={journalArticlePath(slug)} className="journal-clusters__article-link no-underline" muted>
                      {article?.metaTitle ?? slug}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
}
