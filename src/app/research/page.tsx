import { JournalResearchIndex } from "@/components/journal/JournalResearchIndex";
import { researchIndexMetadata } from "@/lib/journal/search-metadata";

export const metadata = researchIndexMetadata();

export default function ResearchPage() {
  return <JournalResearchIndex />;
}
