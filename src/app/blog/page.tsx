import { JournalHome } from "@/components/journal/JournalHome";
import { JsonLd } from "@/components/seo/JsonLd";
import { JOURNAL_ARTICLES, journalIndexJsonLd, journalIndexMetadata } from "@/lib/journal";

export const metadata = journalIndexMetadata();

export default function BlogPage() {
  return (
    <>
      <JsonLd id="ld-json-journal-index" data={journalIndexJsonLd(JOURNAL_ARTICLES)} />
      <JournalHome />
    </>
  );
}
