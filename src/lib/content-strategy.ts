/**
 * P8 — Content authority architecture (marketing site only).
 *
 * Evergreen technical spine: /docs, /security, /glossary
 * Operational education: /guides/* (short, answer-first pages)
 * Conversion / trust: /contact, homepage trust sections
 *
 * Rules: bounded claims, no fabricated metrics, no fake certifications, no “crypto news” filler.
 */
export const AUTHORITY_HUB_ROUTES = ["/docs", "/guides", "/glossary", "/security", "/contact"] as const;
