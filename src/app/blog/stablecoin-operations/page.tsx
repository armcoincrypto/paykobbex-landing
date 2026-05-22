import { notFound } from "next/navigation";
import { JournalHubView } from "@/components/journal/JournalHubView";
import { getJournalHub, journalHubMetadata } from "@/lib/journal";

const SLUG = "stablecoin-operations" as const;

export function generateMetadata() {
  const hub = getJournalHub(SLUG);
  if (!hub) return {};
  return journalHubMetadata(hub);
}

export default function StablecoinOperationsHubPage() {
  const hub = getJournalHub(SLUG);
  if (!hub) notFound();
  return <JournalHubView hub={hub} />;
}
