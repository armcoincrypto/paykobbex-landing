import { Link } from "@/components/primitives/link";
import { Container } from "@/components/primitives/Container";
import { JournalArticleCard } from "@/components/journal/JournalArticleCard";
import { getJournalIndexArticles, JOURNAL_HUBS, journalHubPath } from "@/lib/journal";

const JOURNAL_TAXONOMY = [
  "Settlement",
  "Webhooks",
  "Reconciliation",
  "Infrastructure",
] as const;

export function JournalHome() {
  const { featured, articles } = getJournalIndexArticles();

  return (
    <div className="journal-publication">
      <div className="journal-publication__frame" aria-hidden="true" />
      <div className="journal-publication__atmosphere" aria-hidden="true" />
      <Container className="journal-publication__container">
        <header className="journal-masthead">
          <div className="journal-masthead__main">
            <div className="journal-masthead__brand">
              <p className="journal-masthead__eyebrow">Kobbopay · Operational journal</p>
              <h1 className="journal-masthead__title">Infrastructure notes for payment operators</h1>
            </div>
            <p className="journal-masthead__lead">
              Long-form guidance on settlement discipline, webhook verification, reconciliation
              controls, and merchant infrastructure—for finance, engineering, and operations teams.
            </p>
            <ul className="journal-masthead__taxonomy list-none p-0 m-0" aria-label="Editorial scope">
              {JOURNAL_TAXONOMY.map((topic) => (
                <li key={topic}>
                  <span className="journal-masthead__taxonomy-tag">{topic}</span>
                </li>
              ))}
            </ul>
            <div className="journal-masthead__stats" aria-hidden="true">
              <span className="journal-masthead__stat">{articles.length + 1} articles</span>
              <span className="journal-masthead__stat-sep">·</span>
              <span className="journal-masthead__stat">Institutional editorial</span>
            </div>
          </div>

          <aside className="journal-masthead__panel" aria-label="Publication context">
            <div className="journal-masthead__panel-visual" aria-hidden="true">
              <span className="journal-ornament journal-ornament--ledger" />
            </div>
            <p className="journal-masthead__panel-label">Publication scope</p>
            <p className="journal-masthead__panel-copy">
              Written for teams operating crypto payment lifecycles—not headline news. Each piece
              maps to controls you implement in production.
            </p>
            <ul className="journal-masthead__panel-list list-none p-0 m-0">
              <li>
                <span className="journal-masthead__panel-mark" aria-hidden="true" />
                Detection vs settlement finality
              </li>
              <li>
                <span className="journal-masthead__panel-mark" aria-hidden="true" />
                Webhook verification discipline
              </li>
              <li>
                <span className="journal-masthead__panel-mark" aria-hidden="true" />
                Reconciliation and ledger alignment
              </li>
            </ul>
          </aside>
        </header>

        <section className="journal-index__featured" aria-labelledby="journal-featured-heading">
          <h2 id="journal-featured-heading" className="journal-index__section-label">
            Featured
          </h2>
          <JournalArticleCard article={featured} featured />
        </section>

        <section className="journal-index__hubs" aria-labelledby="journal-hubs-heading">
          <h2 id="journal-hubs-heading" className="journal-index__section-label">
            Topic hubs
          </h2>
          <ul className="journal-index__hubs-grid list-none p-0 m-0">
            {JOURNAL_HUBS.map((hub) => (
              <li key={hub.slug}>
                <Link href={journalHubPath(hub.slug)} className="journal-index__hub-link no-underline">
                  <span className="journal-index__hub-title">{hub.title}</span>
                  <span className="journal-index__hub-lead">{hub.lead}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="journal-index__rule" aria-hidden="true" />

        <section className="journal-index__catalog" aria-labelledby="journal-catalog-heading">
          <h2 id="journal-catalog-heading" className="journal-index__section-label">
            All articles
          </h2>
          <ul className="journal-index__grid list-none p-0 m-0">
            {articles.map((article, index) => (
              <li key={article.slug} className="journal-index__grid-item">
                <JournalArticleCard article={article} index={index} />
              </li>
            ))}
          </ul>
        </section>

        <aside className="journal-index__footer-cta">
          <p className="journal-index__footer-cta-label">Continue in product docs</p>
          <p className="journal-index__footer-cta-copy">
            Journal articles complement integration guides and operational documentation—not
            replace them.
          </p>
          <div className="journal-index__footer-cta-links">
            <Link href="/guides" className="journal-index__footer-link no-underline" muted>
              Guides
            </Link>
            <Link href="/docs" className="journal-index__footer-link no-underline" muted>
              Docs
            </Link>
            <Link
              href="/contact#merchant-intake"
              className="journal-index__footer-link journal-index__footer-link--primary no-underline"
              conv="request_access_click"
            >
              Request access
            </Link>
            <Link href="/editorial-principles" className="journal-index__footer-link no-underline" muted>
              Editorial principles
            </Link>
            <Link href="/about" className="journal-index__footer-link no-underline" muted>
              About
            </Link>
          </div>
        </aside>
      </Container>
    </div>
  );
}
