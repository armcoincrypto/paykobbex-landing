import { notFound } from "next/navigation";
import { ReferenceLayout } from "@/components/references/ReferenceLayout";
import { ReferenceView } from "@/components/references/ReferenceView";
import { JsonLd } from "@/components/seo/JsonLd";
import { getReferenceContent } from "@/lib/references/content";
import {
  REFERENCE_ENTRIES,
  REFERENCE_SLUGS,
  referenceBreadcrumbJsonLd,
  referenceMetadata,
  type ReferenceSlug,
} from "@/lib/references/meta";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return REFERENCE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  if (!REFERENCE_SLUGS.includes(slug as ReferenceSlug)) return {};
  return referenceMetadata(slug as ReferenceSlug);
}

export default async function ReferencePage({ params }: PageProps) {
  const { slug } = await params;
  if (!REFERENCE_SLUGS.includes(slug as ReferenceSlug)) notFound();

  const entry = REFERENCE_ENTRIES.find((e) => e.slug === slug)!;
  const document = getReferenceContent(slug as ReferenceSlug);

  return (
    <>
      <JsonLd
        id={`ld-json-reference-${slug}`}
        data={referenceBreadcrumbJsonLd(slug as ReferenceSlug, entry.shortTitle)}
      />
      <ReferenceLayout title={entry.title} lead={entry.description}>
        <ReferenceView document={document} />
      </ReferenceLayout>
    </>
  );
}
