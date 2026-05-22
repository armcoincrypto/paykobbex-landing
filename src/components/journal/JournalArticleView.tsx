import { Link } from "@/components/primitives/link";
import { Container } from "@/components/primitives/Container";
import { CTAGroup } from "@/components/primitives/CTAGroup";
import { JournalArticleBody } from "@/components/journal/JournalArticleBody";
import { JournalArticleRelations } from "@/components/journal/JournalArticleRelations";
import { JournalOperationalReferences } from "@/components/journal/JournalOperationalReferences";
import { JournalArticleDiagrams } from "@/components/journal/JournalArticleDiagrams";
import { JsonLd } from "@/components/seo/JsonLd";
import type { JournalArticleEntry, JournalBlock } from "@/lib/journal";
import { journalArticleJsonLd, journalHubPath } from "@/lib/journal";

function journalSectionNav(blocks: JournalBlock[]) {
  return blocks.filter(
    (block): block is Extract<JournalBlock, { type: "h2" }> => block.type === "h2",
  );
}

export function JournalArticleView({ article }: { article: JournalArticleEntry }) {
  const sections = journalSectionNav(article.blocks);
  const hubPath = journalHubPath(article.hubSlug);

  return (
    <>
      <JsonLd id={`ld-json-journal-${article.slug}`} data={journalArticleJsonLd(article)} />

      <article className="journal-article">
        <div className="journal-article__frame" aria-hidden="true" />
        <div className="journal-article__atmosphere" aria-hidden="true" />
        <Container className="journal-article__shell">
          <nav className="journal-article__wayfinding" aria-label="Breadcrumb">
            <Link href="/" className="journal-article__wayfinding-link" muted>
              Home
            </Link>
            <span className="journal-article__wayfinding-sep" aria-hidden="true">
              /
            </span>
            <Link href="/blog" className="journal-article__wayfinding-link" muted>
              Journal
            </Link>
            <span className="journal-article__wayfinding-sep" aria-hidden="true">
              /
            </span>
            <Link href={hubPath} className="journal-article__wayfinding-link" muted>
              {article.category}
            </Link>
            <span className="journal-article__wayfinding-sep" aria-hidden="true">
              /
            </span>
            <span className="journal-article__wayfinding-current">Article</span>
          </nav>

          <header className="journal-article__intro">
            <div className="journal-article__intro-main">
              <Link href={hubPath} className="journal-article__category journal-article__category--link no-underline">
                {article.category}
              </Link>
              <h1 className="journal-article__title">{article.title}</h1>
              <p className="journal-article__dek">{article.excerpt}</p>
              <div className="journal-article__intro-meta">
                <span className="journal-article__intro-meta-item">
                  {article.readingTimeMinutes} min read
                </span>
                <span className="journal-article__intro-meta-sep" aria-hidden="true">
                  ·
                </span>
                <span className="journal-article__intro-meta-item">Operational journal</span>
                {article.relations.series ? (
                  <>
                    <span className="journal-article__intro-meta-sep" aria-hidden="true">
                      ·
                    </span>
                    <span className="journal-article__intro-meta-item">
                      {article.relations.series.name} ({article.relations.series.position}/
                      {article.relations.series.total})
                    </span>
                  </>
                ) : null}
              </div>
            </div>
            <div className="journal-article__intro-accent" aria-hidden="true">
              <span className="journal-ornament journal-ornament--verify" />
            </div>
          </header>

          <div className="journal-article__layout">
            <div className="journal-article__main">
              <aside className="journal-lede" aria-labelledby="journal-takeaways">
                <div className="journal-lede__header">
                  <h2 id="journal-takeaways" className="journal-lede__title">
                    Key takeaways
                  </h2>
                  <span className="journal-lede__mark" aria-hidden="true" />
                </div>
                <ol className="journal-lede__list">
                  {article.keyTakeaways.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </aside>

              <JournalArticleRelations article={article} />

              <JournalArticleDiagrams slug={article.slug} />

              <div className="journal-article__prose-rail">
                <div className="journal-article__prose-rail-line" aria-hidden="true" />
                <div className="journal-article__prose-wrap">
                  <JournalArticleBody blocks={article.blocks} />
                </div>
              </div>

              <div className="journal-section-divider" aria-hidden="true" />

              <section className="journal-faq-block" aria-labelledby="journal-faq">
                <h2 id="journal-faq" className="journal-section__label">
                  Frequently asked questions
                </h2>
                <dl className="journal-faq">
                  {article.faq.map((item, faqIndex) => (
                    <div
                      key={item.question}
                      className="journal-faq__item"
                      data-faq-index={faqIndex}
                    >
                      <dt className="journal-faq__q">{item.question}</dt>
                      <dd className="journal-faq__a">{item.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <div className="journal-section-divider" aria-hidden="true" />

              <section className="journal-related-block" aria-labelledby="journal-related">
                <h2 id="journal-related" className="journal-section__label">
                  Related operational reading
                </h2>
                <ul className="journal-related-grid">
                  {article.internalLinks.map((link) => (
                    <li key={link.href} className="journal-related-grid__item">
                      <Link href={link.href} className="journal-related-grid__link no-underline">
                        <span className="journal-related-grid__label">{link.label}</span>
                        <span className="journal-related-grid__arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                      <p className="journal-related-grid__reason">{link.reason}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <JournalOperationalReferences article={article} />

              <footer className="journal-article-cta" aria-labelledby="journal-cta-heading">
                <h2 id="journal-cta-heading" className="journal-article-cta__title">
                  Discuss your operational model
                </h2>
                <p className="journal-article-cta__copy">
                  Kobbopay works with approved merchants on selected rails. If your team is
                  designing lifecycle, webhook, or reconciliation controls, start with a bounded
                  integration review—not a generic demo.
                </p>
                <CTAGroup className="journal-article-cta__actions">
                  <Link
                    href="/contact#merchant-intake"
                    variant="button-primary"
                    className="no-underline"
                    conv="request_access_click"
                  >
                    Request access
                  </Link>
                  <Link href="/guides" variant="button-secondary" className="no-underline" muted>
                    Read guides
                  </Link>
                </CTAGroup>
              </footer>
            </div>

            <aside className="journal-article__rail" aria-label="Article context">
              <div className="journal-article__rail-sticky">
                <section className="journal-rail-panel" aria-labelledby="journal-rail-context">
                  <h2 id="journal-rail-context" className="journal-rail-panel__title">
                    Article context
                  </h2>
                  <dl className="journal-rail-panel__meta">
                    <div>
                      <dt>Topic hub</dt>
                      <dd>
                        <Link href={hubPath} className="journal-rail-panel__hub-link no-underline">
                          {article.category}
                        </Link>
                      </dd>
                    </div>
                    <div>
                      <dt>Reading time</dt>
                      <dd>{article.readingTimeMinutes} min</dd>
                    </div>
                  </dl>
                  {article.seoFocus.length > 0 ? (
                    <>
                      <p className="journal-rail-panel__topics-label">Topics</p>
                      <ul className="journal-rail-panel__topics list-none p-0 m-0">
                        {article.seoFocus.map((topic) => (
                          <li key={topic}>
                            <span className="journal-rail-panel__topic">{topic}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : null}
                </section>

                {sections.length > 0 ? (
                  <nav
                    className="journal-rail-panel journal-rail-panel--toc"
                    aria-labelledby="journal-rail-toc"
                  >
                    <h2 id="journal-rail-toc" className="journal-rail-panel__title">
                      In this article
                    </h2>
                    <ol className="journal-rail-toc list-none p-0 m-0">
                      {sections.map((section) => (
                        <li key={section.id}>
                          <a href={`#${section.id}`} className="journal-rail-toc__link">
                            {section.text}
                          </a>
                        </li>
                      ))}
                    </ol>
                  </nav>
                ) : null}

                <div className="journal-rail-panel__ornament" aria-hidden="true">
                  <span className="journal-ornament journal-ornament--ledger journal-ornament--sm" />
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </article>
    </>
  );
}
