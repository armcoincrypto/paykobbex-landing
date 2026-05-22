import { Link } from "@/components/primitives/link";
import type { JournalArticleEntry } from "@/lib/journal";
import { getJournalArticle, journalArticlePath } from "@/lib/journal";

export function JournalArticleRelations({ article }: { article: JournalArticleEntry }) {
  const { relations } = article;
  const hasSeries = Boolean(relations.series);
  const hasPrereq = Boolean(relations.prerequisite);
  const hasConcepts = relations.operationalConcepts.length > 0;
  const hasContinue = relations.continueReading.length > 0;

  if (!hasSeries && !hasPrereq && !hasConcepts && !hasContinue) {
    return null;
  }

  return (
    <section className="journal-graph" aria-labelledby="journal-graph-heading">
      <h2 id="journal-graph-heading" className="journal-section__label">
        Article relationships
      </h2>
      <div className="journal-graph__grid">
        {hasSeries ? (
          <div className="journal-graph__cell">
            <p className="journal-graph__label">Part of series</p>
            <p className="journal-graph__value">
              {relations.series!.name}
              <span className="journal-graph__meta">
                {" "}
                · {relations.series!.position} of {relations.series!.total}
              </span>
            </p>
          </div>
        ) : null}

        {hasPrereq ? (
          <div className="journal-graph__cell">
            <p className="journal-graph__label">Prerequisite reading</p>
            <Link
              href={journalArticlePath(relations.prerequisite!.slug)}
              className="journal-graph__link no-underline"
            >
              {relations.prerequisite!.label}
            </Link>
            <p className="journal-graph__reason">{relations.prerequisite!.reason}</p>
          </div>
        ) : null}

        {hasConcepts ? (
          <div className="journal-graph__cell journal-graph__cell--wide">
            <p className="journal-graph__label">Related operational concepts</p>
            <ul className="journal-graph__chips list-none p-0 m-0">
              {relations.operationalConcepts.map((concept) => (
                <li key={concept}>
                  <span className="journal-graph__chip">{concept}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {hasContinue ? (
          <div className="journal-graph__cell journal-graph__cell--wide">
            <p className="journal-graph__label">Continue reading</p>
            <ul className="journal-graph__continue list-none p-0 m-0">
              {relations.continueReading.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={journalArticlePath(item.slug)}
                    className="journal-graph__link no-underline"
                  >
                    {getJournalArticle(item.slug)?.title ?? item.slug}
                  </Link>
                  <span className="journal-graph__reason"> — {item.reason}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
