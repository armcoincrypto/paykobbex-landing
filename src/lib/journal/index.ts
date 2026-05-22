import { paymentDetectionVsSettlementFinality } from "@/lib/journal/articles/payment-detection-vs-settlement-finality";
import { verifyCryptoWebhooksSafely } from "@/lib/journal/articles/verify-crypto-webhooks-safely";
import { usdtBusinessPayments } from "@/lib/journal/articles/usdt-business-payments";
import { reliableReconciliationFlows } from "@/lib/journal/articles/reliable-reconciliation-flows";
import { productionGradeCryptoPaymentInfrastructure } from "@/lib/journal/articles/production-grade-crypto-payment-infrastructure";
import {
  enrichArticle,
  journalArticleMetadata,
  journalArticlePath,
  journalArticleJsonLd,
  journalHubMetadata,
  journalHubJsonLd,
} from "@/lib/journal/utils";
import { getJournalRelationships } from "@/lib/journal/relationships";
import type { JournalArticle, JournalArticleRelations, JournalHubSlug } from "@/lib/journal/types";
import {
  JOURNAL_HUBS,
  JOURNAL_HUB_SLUGS,
  getJournalHub,
  journalHubPath,
} from "@/lib/journal/hubs";

const RAW_ARTICLES: JournalArticle[] = [
  paymentDetectionVsSettlementFinality,
  verifyCryptoWebhooksSafely,
  usdtBusinessPayments,
  reliableReconciliationFlows,
  productionGradeCryptoPaymentInfrastructure,
];

export const JOURNAL_FEATURED_SLUG = "payment-detection-vs-settlement-finality";

export type JournalArticleEntry = JournalArticle & {
  readingTimeMinutes: number;
  relations: JournalArticleRelations;
};

export const JOURNAL_ARTICLES: JournalArticleEntry[] = RAW_ARTICLES.map((article) => ({
  ...enrichArticle(article),
  relations: getJournalRelationships(article.slug),
}));

export const JOURNAL_SLUGS = JOURNAL_ARTICLES.map((a) => a.slug);

export function getJournalFeaturedArticle(): JournalArticleEntry {
  return (
    JOURNAL_ARTICLES.find((a) => a.slug === JOURNAL_FEATURED_SLUG) ?? JOURNAL_ARTICLES[0]
  );
}

export function getJournalIndexArticles(): {
  featured: JournalArticleEntry;
  articles: JournalArticleEntry[];
} {
  const featured = getJournalFeaturedArticle();
  return {
    featured,
    articles: JOURNAL_ARTICLES.filter((a) => a.slug !== featured.slug),
  };
}

export function getJournalArticle(slug: string): JournalArticleEntry | undefined {
  return JOURNAL_ARTICLES.find((a) => a.slug === slug);
}

export function getJournalArticlesByHub(hubSlug: JournalHubSlug): JournalArticleEntry[] {
  return JOURNAL_ARTICLES.filter((a) => a.hubSlug === hubSlug);
}

export {
  journalArticleMetadata,
  journalArticlePath,
  journalArticleJsonLd,
  journalHubMetadata,
  journalHubJsonLd,
  JOURNAL_HUBS,
  JOURNAL_HUB_SLUGS,
  getJournalHub,
  journalHubPath,
};

export type {
  JournalArticle,
  JournalBlock,
  JournalFaqItem,
  JournalInternalLink,
  JournalHub,
  JournalHubSlug,
  JournalArticleRelations,
} from "@/lib/journal/types";
