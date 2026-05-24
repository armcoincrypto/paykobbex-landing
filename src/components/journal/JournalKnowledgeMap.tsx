import { Link } from "@/components/primitives/link";
import { Container } from "@/components/primitives/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildKnowledgeGraph, knowledgeMapJsonLd } from "@/lib/journal/knowledge-graph";

export function JournalKnowledgeMap() {
  const graph = buildKnowledgeGraph();

  return (
    <>
      <JsonLd id="ld-json-knowledge-map" data={knowledgeMapJsonLd()} />

      <div className="journal-publication journal-authority">
        <div className="journal-publication__frame" aria-hidden="true" />
        <Container className="journal-publication__container journal-authority__container journal-knowledge-map journal-knowledge-map--atlas">
          <header className="journal-authority__intro">
            <p className="journal-masthead__eyebrow">Kobbopay · Knowledge architecture</p>
            <h1 className="journal-authority__title">Operational knowledge map</h1>
            <p className="journal-authority__lead">
              A structured index of topical clusters, journal research, guides, and glossary terms—for
              operators, finance teams, developers, and systems that map institutional payment
              infrastructure concepts.
            </p>
          </header>

          <nav className="journal-knowledge-map__nav" aria-label="Authority surfaces">
            {graph.authority.map((node) => (
              <Link key={node.href} href={node.href} className="journal-knowledge-map__nav-link no-underline" muted>
                {node.label}
              </Link>
            ))}
          </nav>

          <section aria-labelledby="km-series">
            <h2 id="km-series" className="journal-authority__section-title">
              Research series
            </h2>
            <p className="journal-authority__p">{graph.series.name} — canonical reading order.</p>
            <ol className="journal-knowledge-map__series list-none p-0 m-0">
              {graph.series.articles.map((item, i) => (
                <li key={item.href}>
                  <span className="journal-knowledge-map__series-pos">{i + 1}.</span>
                  <Link href={item.href} className="journal-knowledge-map__series-link no-underline">
                    {item.label}
                  </Link>
                  {item.summary ? (
                    <p className="journal-knowledge-map__series-summary">{item.summary}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          </section>

          {graph.clusters.map((cluster) => (
            <section
              key={cluster.id}
              id={`cluster-${cluster.id}`}
              className="journal-knowledge-map__cluster"
              aria-labelledby={`cluster-${cluster.id}-title`}
            >
              <h2 id={`cluster-${cluster.id}-title`} className="journal-authority__section-title">
                <Link href={cluster.hubHref} className="no-underline">
                  {cluster.name}
                </Link>
              </h2>
              <p className="journal-authority__p">{cluster.intent}</p>

              <div className="journal-knowledge-map__columns">
                <div>
                  <h3 className="journal-knowledge-map__col-title">Concepts</h3>
                  <ul className="list-none p-0 m-0">
                    {cluster.concepts.map((c) => (
                      <li key={c.href}>
                        <Link href={c.href} className="no-underline" muted>
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="journal-knowledge-map__col-title">Articles</h3>
                  <ul className="list-none p-0 m-0">
                    {cluster.articles.map((a) => (
                      <li key={a.href}>
                        <Link href={a.href} className="no-underline">
                          {a.label}
                        </Link>
                        {a.summary ? (
                          <p className="journal-knowledge-map__item-summary">{a.summary}</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="journal-knowledge-map__col-title">Guides</h3>
                  <ul className="list-none p-0 m-0">
                    {cluster.guides.map((g) => (
                      <li key={g.href}>
                        <Link href={g.href} className="no-underline" muted>
                          {g.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="journal-knowledge-map__col-title">Playbooks</h3>
                  <ul className="list-none p-0 m-0">
                    {cluster.playbooks.map((p) => (
                      <li key={p.href}>
                        <Link href={p.href} className="no-underline" muted>
                          {p.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="journal-knowledge-map__col-title">References</h3>
                  <ul className="list-none p-0 m-0">
                    {cluster.references.map((r) => (
                      <li key={r.href}>
                        <Link href={r.href} className="no-underline" muted>
                          {r.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {cluster.relatedHubs.length > 0 ? (
                <p className="journal-knowledge-map__related">
                  <span className="journal-knowledge-map__related-label">Related clusters:</span>{" "}
                  {cluster.relatedHubs.map((h, i) => (
                    <span key={h.href}>
                      {i > 0 ? " · " : null}
                      <Link href={h.href} className="no-underline" muted>
                        {h.label}
                      </Link>
                    </span>
                  ))}
                </p>
              ) : null}
            </section>
          ))}
        </Container>
      </div>
    </>
  );
}
