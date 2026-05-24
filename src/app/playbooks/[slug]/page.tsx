import { notFound } from "next/navigation";
import { PlaybookLayout } from "@/components/playbooks/PlaybookLayout";
import { PlaybookView } from "@/components/playbooks/PlaybookView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPlaybookContent } from "@/lib/playbooks/content";
import {
  PLAYBOOK_ENTRIES,
  PLAYBOOK_SLUGS,
  playbookBreadcrumbJsonLd,
  playbookMetadata,
  type PlaybookSlug,
} from "@/lib/playbooks/meta";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PLAYBOOK_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!PLAYBOOK_SLUGS.includes(slug as PlaybookSlug)) return {};
  return playbookMetadata(slug as PlaybookSlug);
}

export default async function PlaybookPage({ params }: PageProps) {
  const { slug } = await params;
  if (!PLAYBOOK_SLUGS.includes(slug as PlaybookSlug)) notFound();

  const entry = PLAYBOOK_ENTRIES.find((e) => e.slug === slug)!;
  const document = getPlaybookContent(slug as PlaybookSlug);

  return (
    <>
      <JsonLd id={`ld-json-playbook-${slug}`} data={playbookBreadcrumbJsonLd(slug as PlaybookSlug, entry.shortTitle)} />
      <PlaybookLayout title={entry.title} lead={entry.description}>
        <PlaybookView document={document} />
      </PlaybookLayout>
    </>
  );
}
