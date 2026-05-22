import { JournalHome } from "@/components/journal/JournalHome";
import { journalIndexMetadata } from "@/lib/journal/search-metadata";

export const metadata = journalIndexMetadata();

export default function BlogPage() {
  return <JournalHome />;
}
