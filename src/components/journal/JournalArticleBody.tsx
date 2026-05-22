import type { JournalBlock } from "@/lib/journal/types";
import { cn } from "@/lib/cn";
import { JournalEntityText } from "@/components/journal/JournalEntityText";

export function JournalArticleBody({
  blocks,
  className,
}: {
  blocks: JournalBlock[];
  className?: string;
}) {
  const linkedPhrases = new Set<string>();

  return (
    <div className={cn("journal-prose", className)}>
      {blocks.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p key={index} className="journal-prose__p">
                <JournalEntityText text={block.text} linkedPhrases={linkedPhrases} />
              </p>
            );
          case "h2":
            return (
              <h2 key={index} id={block.id} className="journal-prose__h2">
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={index} id={block.id} className="journal-prose__h3">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={index} className="journal-prose__ul">
                {block.items.map((item) => (
                  <li key={item}>
                    <JournalEntityText text={item} linkedPhrases={linkedPhrases} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index} className="journal-prose__ol">
                {block.items.map((item) => (
                  <li key={item}>
                    <JournalEntityText text={item} linkedPhrases={linkedPhrases} />
                  </li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside key={index} className="journal-prose__callout journal-prose__callout--ops">
                {block.title ? (
                  <p className="journal-prose__callout-title">{block.title}</p>
                ) : null}
                <p className="journal-prose__callout-text">
                  <JournalEntityText text={block.text} linkedPhrases={linkedPhrases} />
                </p>
              </aside>
            );
          case "definition":
            return (
              <aside key={index} className="journal-definition">
                <p className="journal-definition__label">Definition</p>
                <p className="journal-definition__term">{block.term}</p>
                <p className="journal-definition__text">{block.text}</p>
              </aside>
            );
          case "quote":
            return (
              <blockquote key={index} className="journal-quote">
                <p className="journal-quote__text">{block.text}</p>
                {block.attribution ? (
                  <footer className="journal-quote__attr">{block.attribution}</footer>
                ) : null}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
