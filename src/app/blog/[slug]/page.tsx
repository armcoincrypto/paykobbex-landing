import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JournalArticleView } from "@/components/journal";
import {
  JOURNAL_SLUGS,
  getJournalArticle,
  journalArticleMetadata,
} from "@/lib/journal";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return JOURNAL_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) return {};
  return journalArticleMetadata(article);
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getJournalArticle(slug);
  if (!article) notFound();
  return <JournalArticleView article={article} />;
}
