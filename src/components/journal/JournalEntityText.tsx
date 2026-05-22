import { Link } from "@/components/primitives/link";
import { splitWithEntityLinks } from "@/lib/journal/entity-links";

export function JournalEntityText({
  text,
  linkedPhrases,
}: {
  text: string;
  linkedPhrases: Set<string>;
}) {
  const segments = splitWithEntityLinks(text, linkedPhrases);

  return (
    <>
      {segments.map((segment, i) =>
        segment.type === "link" ? (
          <Link
            key={`${segment.href}-${i}`}
            href={segment.href}
            className="journal-entity-link no-underline"
          >
            {segment.value}
          </Link>
        ) : (
          <span key={i}>{segment.value}</span>
        ),
      )}
    </>
  );
}
