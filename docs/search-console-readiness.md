# Search Console readiness — Kobbopay Journal (P27)

## Indexing checklist

- [ ] Submit `https://pay.kobbex.com/sitemap.xml` in Google Search Console
- [ ] Request indexing for new surfaces: `/research`, `/knowledge-map`
- [ ] Confirm hub URLs indexed: `/blog/settlement-operations`, `/blog/webhook-security`, `/blog/reconciliation`, `/blog/payment-infrastructure`, `/blog/stablecoin-operations`
- [ ] Confirm authority URLs: `/editorial-principles`, `/about`
- [ ] Validate `robots.txt` allows crawl and references sitemap + `llms.txt`

## Sitemap segmentation (recommendation)

Current: single `sitemap.xml` (acceptable for site size).

Optional future split when URL count grows:

- `sitemap-pages.xml` — marketing + docs
- `sitemap-journal.xml` — `/blog`, articles, hubs, `/research`, `/knowledge-map`
- `sitemap-guides.xml` — `/guides/*`

## Canonical validation

| URL | Canonical |
|-----|-----------|
| `/blog` | `https://pay.kobbex.com/blog` |
| `/research` | `https://pay.kobbex.com/research` |
| `/knowledge-map` | `https://pay.kobbex.com/knowledge-map` |
| `/blog/{slug}` | per-article |
| `/blog/{hub}` | per-hub |

No alias duplicates without canonical ( `/research` is distinct from `/blog` by design).

## Duplicate title audit

- Journal index: unique (“Journal — operational payment research”)
- Research: unique (“Operational research”)
- Knowledge map: unique (“Operational knowledge map”)
- Article `metaTitle` values: unique per slug
- Hub `metaTitle` values: unique per hub

## Crawl depth

- Home → Research / Blog / Knowledge map: depth 1
- Blog → Hubs → Articles: depth 2–3
- Knowledge map links to all clusters: depth 1 hub

## Structured data audit

- Articles: `TechArticle` + `FAQPage` + `BreadcrumbList` + optional `ItemList` (series)
- Hubs: `CollectionPage` + `isPartOf` journal
- Research: `CollectionPage` + series `ItemList`
- Knowledge map: `WebPage` + cluster `about`
- About: `AboutPage`
- Editorial: `WebPage`

Validate in Search Console Rich Results after deploy.

## AI discovery

- `https://pay.kobbex.com/llms.txt` — topical clusters, series order, article summaries
- `https://pay.kobbex.com/knowledge-map` — human + machine graph
