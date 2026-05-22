import { Link } from "@/components/primitives/link";
import type { JournalArticleEntry } from "@/lib/journal";

export function JournalOperationalReferences({ article }: { article: JournalArticleEntry }) {
  const refs = article.relations.operationalReferences;
  const hasContent =
    refs.guides.length > 0 ||
    refs.glossary.length > 0 ||
    refs.concepts.length > 0 ||
    refs.infrastructure.length > 0;

  if (!hasContent) return null;

  return (
    <section className="journal-refs" aria-labelledby="journal-refs-heading">
      <h2 id="journal-refs-heading" className="journal-section__label">
        Operational references
      </h2>
      <div className="journal-refs__layout">
        {refs.guides.length > 0 ? (
          <div className="journal-refs__column">
            <h3 className="journal-refs__heading">Related guides</h3>
            <ul className="journal-refs__list list-none p-0 m-0">
              {refs.guides.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="journal-refs__link no-underline">
                    {g.label}
                  </Link>
                  {g.reason ? <p className="journal-refs__reason">{g.reason}</p> : null}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {refs.glossary.length > 0 ? (
          <div className="journal-refs__column">
            <h3 className="journal-refs__heading">Glossary</h3>
            <ul className="journal-refs__list list-none p-0 m-0">
              {refs.glossary.map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="journal-refs__link no-underline">
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {refs.concepts.length > 0 ? (
          <div className="journal-refs__column">
            <h3 className="journal-refs__heading">Operational concepts</h3>
            <ul className="journal-refs__chips list-none p-0 m-0">
              {refs.concepts.map((c) => (
                <li key={c.label}>
                  {c.href ? (
                    <Link href={c.href} className="journal-refs__chip no-underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span className="journal-refs__chip">{c.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {refs.infrastructure.length > 0 ? (
          <div className="journal-refs__column">
            <h3 className="journal-refs__heading">Infrastructure references</h3>
            <ul className="journal-refs__list list-none p-0 m-0">
              {refs.infrastructure.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="journal-refs__link no-underline">
                    {item.label}
                  </Link>
                  <p className="journal-refs__reason">{item.reason}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
