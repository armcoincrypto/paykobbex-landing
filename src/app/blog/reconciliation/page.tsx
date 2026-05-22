import { notFound } from "next/navigation";
import { JournalHubView } from "@/components/journal/JournalHubView";
import { getJournalHub, journalHubMetadata } from "@/lib/journal";

const SLUG = "reconciliation" as const;

export function generateMetadata() {
  const hub = getJournalHub(SLUG);
  if (!hub) return {};
  return journalHubMetadata(hub);
}

export default function ReconciliationHubPage() {
  const hub = getJournalHub(SLUG);
  if (!hub) notFound();
  return <JournalHubView hub={hub} />;
}
