import { Link } from "@/components/primitives/link";
import { Container } from "@/components/primitives/Container";
import { JournalArticleCard } from "@/components/journal/JournalArticleCard";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getJournalArticlesByHub,
  journalHubJsonLd,
} from "@/lib/journal";
import type { JournalHub } from "@/lib/journal";
import { GUIDE_ENTRIES, guidePath } from "@/lib/guides-meta";
import { SITE_URL } from "@/lib/site";
import { HubResearchDiagram } from "@/components/journal/diagrams/HubResearchDiagram";

export function JournalHubView({ hub }: { hub: JournalHub }) {
  const articles = getJournalArticlesByHub(hub.slug);
  const articleUrls = articles.map((a) => `${SITE_URL}/blog/${a.slug}`);

  return (
    <>
      <JsonLd id={`ld-json-hub-${hub.slug}`} data={journalHubJsonLd(hub, articleUrls)} />

      <div className="journal-publication journal-hub">
        <div className="journal-publication__frame" aria-hidden="true" />
        <div className="journal-publication__atmosphere" aria-hidden="true" />
        <Container className="journal-publication__container">
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
            <span className="journal-article__wayfinding-current">{hub.title}</span>
          </nav>

          <header className="journal-hub__intro">
            <div className="journal-hub__intro-grid">
              <div className="journal-hub__intro-copy">
                <p className="journal-masthead__eyebrow">{hub.eyebrow}</p>
                <h1 className="journal-hub__title">{hub.title}</h1>
                <p className="journal-hub__lead">{hub.lead}</p>
                {hub.introduction.map((para) => (
                  <p key={para.slice(0, 40)} className="journal-hub__intro-p">
                    {para}
                  </p>
                ))}
              </div>
              <div className="journal-hub__intro-visual" aria-hidden="false">
                <HubResearchDiagram hubSlug={hub.slug} />
              </div>
            </div>
          </header>

          <div className="journal-hub__layout">
            <div className="journal-hub__main">
              <section aria-labelledby="hub-articles">
                <h2 id="hub-articles" className="journal-index__section-label">
                  Journal articles
                </h2>
                <ul className="journal-hub__articles list-none p-0 m-0">
                  {articles.map((article, index) => (
                    <li key={article.slug}>
                      <JournalArticleCard article={article} index={index} />
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <aside className="journal-hub__rail">
              <section className="journal-rail-panel" aria-labelledby="hub-themes">
                <h2 id="hub-themes" className="journal-rail-panel__title">
                  Operational themes
                </h2>
                <ul className="journal-hub__themes list-none p-0 m-0">
                  {hub.operationalThemes.map((theme) => (
                    <li key={theme}>{theme}</li>
                  ))}
                </ul>
              </section>

              <section className="journal-rail-panel" aria-labelledby="hub-concepts">
                <h2 id="hub-concepts" className="journal-rail-panel__title">
                  Infrastructure concepts
                </h2>
                <dl className="journal-hub__concepts">
                  {hub.infrastructureConcepts.map((c) => (
                    <div key={c.term}>
                      <dt>{c.term}</dt>
                      <dd>{c.description}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="journal-rail-panel" aria-labelledby="hub-guides">
                <h2 id="hub-guides" className="journal-rail-panel__title">
                  Related guides
                </h2>
                <ul className="journal-hub__guides list-none p-0 m-0">
                  {hub.relatedGuides.map((ref) => {
                    const guide = GUIDE_ENTRIES.find((g) => g.slug === ref.slug);
                    return (
                      <li key={ref.slug}>
                        <Link href={guidePath(ref.slug)} className="journal-refs__link no-underline">
                          {guide?.shortTitle ?? ref.slug}
                        </Link>
                        <p className="journal-refs__reason">{ref.reason}</p>
                      </li>
                    );
                  })}
                </ul>
              </section>

              <section className="journal-rail-panel" aria-labelledby="hub-links">
                <h2 id="hub-links" className="journal-rail-panel__title">
                  Semantic links
                </h2>
                <ul className="journal-hub__semantic list-none p-0 m-0">
                  {hub.semanticLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="journal-refs__link no-underline">
                        {link.label}
                      </Link>
                      <p className="journal-refs__reason">{link.reason}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <p className="journal-hub__back">
                <Link href="/blog" className="journal-index__footer-link no-underline" muted>
                  ← All journal articles
                </Link>
              </p>
            </aside>
          </div>
        </Container>
      </div>
    </>
  );
}
