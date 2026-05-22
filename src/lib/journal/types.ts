import type { GuideSlug } from "@/lib/guides-meta";

export type JournalHubSlug =
  | "settlement-operations"
  | "webhook-security"
  | "reconciliation"
  | "payment-infrastructure"
  | "stablecoin-operations";

export type JournalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; id: string; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "callout"; title?: string; text: string }
  | { type: "definition"; term: string; text: string }
  | { type: "quote"; text: string; attribution?: string };

export type JournalFaqItem = {
  question: string;
  answer: string;
};

export type JournalInternalLink = {
  href: string;
  label: string;
  reason: string;
};

export type JournalContinueReading = {
  slug: string;
  reason: string;
};

export type JournalSeriesInfo = {
  name: string;
  position: number;
  total: number;
};

export type JournalPrerequisite = {
  slug: string;
  label: string;
  reason: string;
};

export type JournalOperationalReferences = {
  guides: Array<{ href: string; label: string; reason?: string }>;
  glossary: Array<{ href: string; label: string }>;
  concepts: Array<{ label: string; href?: string }>;
  infrastructure: JournalInternalLink[];
};

export type JournalArticleRelations = {
  series?: JournalSeriesInfo;
  prerequisite?: JournalPrerequisite;
  operationalConcepts: string[];
  continueReading: JournalContinueReading[];
  operationalReferences: JournalOperationalReferences;
};

export type JournalArticle = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  category: string;
  hubSlug: JournalHubSlug;
  excerpt: string;
  seoFocus: string[];
  keyTakeaways: string[];
  internalLinks: JournalInternalLink[];
  faq: JournalFaqItem[];
  blocks: JournalBlock[];
};

export type JournalHubGuideRef = {
  slug: GuideSlug;
  reason: string;
};

export type JournalHub = {
  slug: JournalHubSlug;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  lead: string;
  introduction: string[];
  operationalThemes: string[];
  infrastructureConcepts: Array<{ term: string; description: string }>;
  relatedGuides: JournalHubGuideRef[];
  semanticLinks: JournalInternalLink[];
};
