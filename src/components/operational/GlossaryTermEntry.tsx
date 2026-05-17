import { Link } from "@/components/primitives/link";
import type { GlossaryTerm } from "@/lib/glossary-terms";
import { GUIDE_ENTRIES, guidePath } from "@/lib/guides-meta";

function guideTitle(slug: NonNullable<GlossaryTerm["relatedGuides"]>[number]): string {
  return GUIDE_ENTRIES.find((g) => g.slug === slug)?.shortTitle ?? slug;
}

/** Single glossary term — infrastructure terminology entry. */
export function GlossaryTermEntry({ term }: { term: GlossaryTerm }) {
  return (
    <article id={term.id} className="ops-glossary-term scroll-mt-28">
      <p className="font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-accent/90">
        {term.id.replace(/-/g, " · ")}
      </p>
      <h3 className="mt-2 text-h3 font-semibold text-primary">{term.term}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{term.def}</p>
      {term.relatedGuides?.length ? (
        <p className="mt-3 text-xs text-muted">
          <span className="font-semibold text-primary">Guides:</span>{" "}
          {term.relatedGuides.map((slug, i) => (
            <span key={slug}>
              {i > 0 ? " · " : null}
              <Link href={guidePath(slug)} className="text-muted hover:text-primary">
                {guideTitle(slug)}
              </Link>
            </span>
          ))}
        </p>
      ) : null}
    </article>
  );
}
