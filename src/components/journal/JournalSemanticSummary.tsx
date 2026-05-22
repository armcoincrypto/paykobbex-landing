import { Link } from "@/components/primitives/link";
import type { JournalArticleEntry } from "@/lib/journal";
import { getArticleAiSummary } from "@/lib/journal/publication";
import { getClusterForArticle } from "@/lib/journal/topical-clusters";
import { journalHubPath } from "@/lib/journal";

export function JournalSemanticSummary({ article }: { article: JournalArticleEntry }) {
  const summary = getArticleAiSummary(article);
  const cluster = getClusterForArticle(article.slug);

  return (
    <section className="journal-semantic" aria-labelledby="journal-semantic-heading">
      <h2 id="journal-semantic-heading" className="journal-section__label">
        Operational summary
      </h2>
      <p className="journal-semantic__summary">{summary}</p>
      {cluster ? (
        <div className="journal-semantic__cluster">
          <p className="journal-semantic__cluster-label">Topical cluster</p>
          <Link href={journalHubPath(cluster.hubSlug)} className="journal-semantic__cluster-link no-underline">
            {cluster.name}
          </Link>
          <ul className="journal-semantic__concepts list-none p-0 m-0">
            {cluster.concepts.map((c) => (
              <li key={c.href}>
                <Link href={c.href} className="journal-semantic__concept-link no-underline" muted>
                  {c.term}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="journal-semantic__index-links">
        <Link href="/knowledge-map" className="no-underline" muted>
          Knowledge map
        </Link>
        <span aria-hidden="true"> · </span>
        <Link href="/research" className="no-underline" muted>
          Research index
        </Link>
      </p>
    </section>
  );
}
