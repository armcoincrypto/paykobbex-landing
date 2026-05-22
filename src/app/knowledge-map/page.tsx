import { JournalKnowledgeMap } from "@/components/journal/JournalKnowledgeMap";
import { knowledgeMapMetadata } from "@/lib/journal/search-metadata";

export const metadata = knowledgeMapMetadata();

export default function KnowledgeMapPage() {
  return <JournalKnowledgeMap />;
}
