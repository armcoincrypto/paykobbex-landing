import { Link } from "@/components/primitives/link";
import type { JournalArticleEntry } from "@/lib/journal";
import { journalArticlePath } from "@/lib/journal";
import { cn } from "@/lib/cn";

export function JournalArticleCard({
  article,
  featured = false,
  index = 0,
}: {
  article: JournalArticleEntry;
  featured?: boolean;
  index?: number;
}) {
  const href = journalArticlePath(article.slug);

  if (featured) {
    return (
      <article className="journal-card journal-card--featured">
        <div className="journal-card__featured-layout">
          <div className="journal-card__featured-visual" aria-hidden="true">
            <div className="journal-ornament journal-ornament--rails">
              <span className="journal-ornament__node journal-ornament__node--a" />
              <span className="journal-ornament__node journal-ornament__node--b" />
              <span className="journal-ornament__node journal-ornament__node--c" />
              <span className="journal-ornament__boundary" />
            </div>
          </div>
          <div className="journal-card__featured-body">
            <div className="journal-card__meta journal-card__meta--featured">
              <span className="journal-card__badge">Featured</span>
              <span className="journal-card__category">{article.category}</span>
              <span
                className="journal-card__time"
                aria-label={`${article.readingTimeMinutes} minute read`}
              >
                {article.readingTimeMinutes} min read
              </span>
            </div>
            <h2 className="journal-card__title journal-card__title--featured">
              <Link href={href} className="journal-card__title-link no-underline">
                {article.title}
              </Link>
            </h2>
            <p className="journal-card__excerpt">{article.excerpt}</p>
            <Link href={href} className="journal-card__cta journal-card__cta--featured no-underline">
              <span>Read featured article</span>
              <span className="journal-card__cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "journal-card",
        index % 3 === 1 && "journal-card--compact",
      )}
    >
      <div className="journal-card__rail" aria-hidden="true" />
      <div className="journal-card__meta">
        <span className="journal-card__category">{article.category}</span>
        <span
          className="journal-card__time"
          aria-label={`${article.readingTimeMinutes} minute read`}
        >
          {article.readingTimeMinutes} min
        </span>
      </div>
      <h2 className="journal-card__title">
        <Link href={href} className="journal-card__title-link no-underline">
          {article.title}
        </Link>
      </h2>
      <p className="journal-card__excerpt">{article.excerpt}</p>
      <Link href={href} className="journal-card__cta no-underline">
        <span>Read article</span>
        <span className="journal-card__cta-arrow" aria-hidden="true">
          →
        </span>
      </Link>
    </article>
  );
}
