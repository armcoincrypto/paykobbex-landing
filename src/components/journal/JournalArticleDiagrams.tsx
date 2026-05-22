import {
  ArticleDiagramFigure,
  getArticleDiagrams,
} from "@/lib/journal/article-diagrams";

export function JournalArticleDiagrams({ slug }: { slug: string }) {
  const diagrams = getArticleDiagrams(slug);
  if (diagrams.length === 0) return null;

  return (
    <section className="jr-figures" aria-labelledby="journal-research-figures">
      <h2 id="journal-research-figures" className="journal-section__label">
        Operational research figures
      </h2>
      <div className="jr-figures__stack">
        {diagrams.map((spec) => (
          <ArticleDiagramFigure key={spec.id} spec={spec} />
        ))}
      </div>
    </section>
  );
}
