/** Longest phrases first — first mention per article is linked in prose. */
export const JOURNAL_ENTITY_PHRASES: Array<{ phrase: string; href: string }> = [
  { phrase: "settlement finality", href: "/glossary#settlement-finality" },
  { phrase: "policy confirmation", href: "/glossary#policy-confirmation" },
  { phrase: "treasury recognition", href: "/glossary#treasury-recognition" },
  { phrase: "webhook verification", href: "/glossary#webhook-verification" },
  { phrase: "payment detection", href: "/blog/settlement-operations" },
  { phrase: "reconciliation", href: "/glossary#reconciliation" },
  { phrase: "confirmations", href: "/glossary#confirmations" },
  { phrase: "idempotency", href: "/glossary#idempotency" },
  { phrase: "finality", href: "/glossary#settlement-finality" },
  { phrase: "settlement", href: "/blog/settlement-operations" },
];

export type EntityLinkSegment =
  | { type: "text"; value: string }
  | { type: "link"; value: string; href: string };

export function splitWithEntityLinks(
  text: string,
  linkedPhrases: Set<string>,
): EntityLinkSegment[] {
  const lower = text.toLowerCase();
  let bestIndex = -1;
  let bestPhrase: (typeof JOURNAL_ENTITY_PHRASES)[number] | null = null;

  for (const entry of JOURNAL_ENTITY_PHRASES) {
    if (linkedPhrases.has(entry.phrase.toLowerCase())) continue;
    const idx = lower.indexOf(entry.phrase.toLowerCase());
    if (idx === -1) continue;
    const isWordBoundary =
      (idx === 0 || !/\w/.test(text[idx - 1] ?? "")) &&
      (idx + entry.phrase.length >= text.length ||
        !/\w/.test(text[idx + entry.phrase.length] ?? ""));
    if (!isWordBoundary) continue;
    if (bestIndex === -1 || idx < bestIndex) {
      bestIndex = idx;
      bestPhrase = entry;
    }
  }

  if (!bestPhrase || bestIndex === -1) {
    return [{ type: "text", value: text }];
  }

  const matchLen = bestPhrase.phrase.length;
  const matched = text.slice(bestIndex, bestIndex + matchLen);
  linkedPhrases.add(bestPhrase.phrase.toLowerCase());

  const before = text.slice(0, bestIndex);
  const after = text.slice(bestIndex + matchLen);

  const linkSegment: EntityLinkSegment = {
    type: "link",
    value: matched,
    href: bestPhrase.href,
  };

  return [
    ...splitWithEntityLinks(before, linkedPhrases),
    linkSegment,
    ...splitWithEntityLinks(after, linkedPhrases),
  ].filter((s) => s.type !== "text" || s.value.length > 0);
}
