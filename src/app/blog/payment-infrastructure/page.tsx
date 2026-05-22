import { notFound } from "next/navigation";
import { JournalHubView } from "@/components/journal/JournalHubView";
import { getJournalHub, journalHubMetadata } from "@/lib/journal";

const SLUG = "payment-infrastructure" as const;

export function generateMetadata() {
  const hub = getJournalHub(SLUG);
  if (!hub) return {};
  return journalHubMetadata(hub);
}

export default function PaymentInfrastructureHubPage() {
  const hub = getJournalHub(SLUG);
  if (!hub) notFound();
  return <JournalHubView hub={hub} />;
}
