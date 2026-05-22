import type { JournalAuthoritySection } from "@/components/journal/JournalAuthorityPage";
import { SITE_URL } from "@/lib/site";

export const EDITORIAL_PRINCIPLES_SECTIONS: JournalAuthoritySection[] = [
  {
    id: "perspective",
    title: "Operational perspective",
    paragraphs: [
      "Kobbopay Journal is written for teams operating crypto payment infrastructure—finance, treasury, engineering, and payment operations—not for speculative markets or headline-driven news cycles.",
      "Articles describe controls, lifecycle semantics, and integration discipline that merchants can implement. We write from production constraints: configured rails, reviewed access, and environment-specific behavior.",
    ],
  },
  {
    id: "marketing",
    title: "What we avoid",
    paragraphs: [
      "We do not publish unsupported guarantees, universal settlement promises, or language that collapses detection into finality. Marketing superlatives and “instant everywhere” claims create audit debt for readers—we avoid them in editorial copy.",
    ],
    list: [
      "Speculative price commentary or token promotion",
      "Implied regulatory approvals we do not document",
      "Anonymous authority or fabricated bylines",
      "Engagement metrics, comment widgets, or social-proof theater",
    ],
  },
  {
    id: "finality",
    title: "Detection vs finality",
    paragraphs: [
      "A recurring editorial standard is separating payment detection from settlement finality and from books-ready reconciliation. Journal pieces should make that distinction legible in vocabulary, diagrams, and examples.",
      "When we reference confirmations, we treat them as risk inputs to merchant policy—not as a single global threshold that replaces finance controls.",
    ],
  },
  {
    id: "reconciliation",
    title: "Reconciliation discipline",
    paragraphs: [
      "Reconciliation is merchant-owned business mapping informed by infrastructure semantics. Editorial content should reinforce exception paths, audit trails, and shared lifecycle vocabulary—not dashboard shortcuts.",
    ],
  },
  {
    id: "terminology",
    title: "Bounded terminology",
    paragraphs: [
      "Terms like Paid, Confirmed, Pending, and Expired are described in deployment-specific ways. We link to the glossary for stable definitions and prefer bounded phrasing: “under your policy,” “for configured rails,” “when finance accepts.”",
    ],
  },
  {
    id: "infrastructure",
    title: "Infrastructure-first philosophy",
    paragraphs: [
      "Journal articles complement guides and documentation—they do not replace merchant agreements or legal advice. The editorial goal is institutional clarity: readers should leave with operational models they can defend under review.",
    ],
  },
];

export const ABOUT_SECTIONS: JournalAuthoritySection[] = [
  {
    id: "positioning",
    title: "What Kobbopay is",
    paragraphs: [
      "Kobbopay is API-first crypto payment infrastructure for B2B merchants. The product centers on server-created payables, explicit lifecycle semantics, signed webhooks, and reconciliation-oriented operations—not consumer checkout gimmicks.",
      "Access is reviewed. Rails and environments are configured per merchant. Production enablement follows operational procedures, not marketing timelines.",
    ],
  },
  {
    id: "reliability",
    title: "Operational reliability",
    paragraphs: [
      "Reliability means predictable lifecycle behavior, verifiable event delivery, and language finance can audit. It does not mean pretending blockchains remove policy, exceptions, or treasury controls.",
    ],
  },
  {
    id: "settlement",
    title: "Settlement clarity",
    paragraphs: [
      "We document the difference between observing funds on a rail and recognizing economic outcome in merchant books. Settlement clarity is shared vocabulary across engineering, support, and finance—not a single green status in a UI.",
    ],
  },
  {
    id: "onboarding",
    title: "Controlled merchant onboarding",
    paragraphs: [
      "Merchants proceed through approval gating, rail enablement, and bounded integration review before production traffic. Onboarding expectations are described in guides and intake flows—not implied by public feature lists alone.",
    ],
  },
  {
    id: "webhooks",
    title: "Webhook verification",
    paragraphs: [
      "Signed webhooks and server-side secrets are part of the trust boundary. Integrations are expected to verify raw payloads, implement idempotency, and map events to explicit lifecycle states.",
    ],
  },
  {
    id: "reconciliation",
    title: "Reconciliation discipline",
    paragraphs: [
      "Infrastructure supplies stable identifiers and machine-readable statuses; merchants supply mapping to orders, entitlements, and ledger rules. Kobbopay editorial and documentation reinforce that separation consistently.",
    ],
  },
  {
    id: "treasury",
    title: "Treasury visibility",
    paragraphs: [
      "Treasury teams need attribution, rail context, and exception paths—not explorer screenshots in chat. Journal and product language emphasize ledger-oriented views and audit-friendly transitions where configuration allows.",
    ],
  },
];

export function editorialPrinciplesJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${SITE_URL}/editorial-principles`,
        name: "Editorial principles — Kobbopay Journal",
        description:
          "How Kobbopay Journal writes about crypto payment operations with bounded, infrastructure-first terminology.",
        url: `${SITE_URL}/editorial-principles`,
        publisher: { "@type": "Organization", name: "Kobbopay", url: SITE_URL },
      },
    ],
  };
}

export function aboutJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${SITE_URL}/about`,
        name: "About Kobbopay",
        description:
          "Institutional positioning for API-first B2B crypto payment infrastructure.",
        url: `${SITE_URL}/about`,
        publisher: { "@type": "Organization", name: "Kobbopay", url: SITE_URL },
      },
    ],
  };
}
