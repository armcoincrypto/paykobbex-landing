# SEO & growth review (pay.kobbex.com)

First monitoring cycle after launch: **Search Console** (discovery + queries) + **Plausible** (on-site intent). Pair with `docs/WEEKLY_FUNNEL_REVIEW.md` (inbox + funnel ops) and `docs/ANALYTICS.md` (event implementation).

**Cadence:** weekly, **30–45 minutes**, same day each week (e.g. Monday).

---

## One-time setup (do once)

### 1. Plausible — create five custom-event goals

Site: **pay.kobbex.com** (dashboard property must match `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`).

In Plausible → **Settings** → **Goals** → **Add goal** → choose **Custom event** (wording may vary by Plausible version). Register **exact** event names (case-sensitive):

| Goal name | Type | Notes |
| --- | --- | --- |
| `request_access_click` | Custom event | CTA clicks to `/contact#merchant-intake` |
| `docs_view` | Custom event | Land on `/docs` (once per tab session) |
| `guides_view` | Custom event | Land on `/guides` or guide subpages |
| `contact_click` | Custom event | Land on `/contact` or mailto/email with `data-conv` |
| `merchant_login_click` | Custom event | Merchant portal / login links |

**Verify after setup:** open **Realtime**, then in another tab: visit `/docs`, `/guides`, `/contact`, click **Request access**, click a merchant login link. Goals should increment within a few minutes.

Implementation reference: `docs/ANALYTICS.md`, `src/lib/conversion-events.ts`.

### 2. Google Search Console — tracking note (baseline)

Keep this table updated in this file (or your team tracker). Dates below are **launch baseline** — adjust if your GSC UI shows different timestamps.

| Milestone | Date (UTC or local) | Notes |
| --- | --- | --- |
| **Marketing site launch** (production deploy) | 2026-05-16 | Git checkpoint: `Launch PayKobbex marketing site` |
| **Sitemap submitted** | _fill from GSC → Sitemaps_ | `https://pay.kobbex.com/sitemap.xml` |
| **Homepage indexed** | _fill from GSC → Pages / URL inspection_ | `https://pay.kobbex.com/` |
| **Priority URLs submitted** (manual indexing request) | _fill from GSC → URL inspection history_ | e.g. `/docs`, `/guides`, `/contact`, `/onboarding` |
| **GSC property verified** (HTML file) | 2026-05-16 | `googlecfbf8ca40f4b4f2b.html` live |

**Property:** `https://pay.kobbex.com/` (URL-prefix or domain property — use the same property for all weekly reviews).

**Do not** change production pages to “fix” GSC unless a real coverage/error issue appears.

---

## Weekly checklist

Work through in order. Export a short bullet summary for the team (Slack/doc).

### A. Google Search Console (last 7 days, compare to prior week)

- [ ] **Performance → Search results:** record **impressions**, **clicks**, **CTR**, **average position** (site-wide).
- [ ] **Indexed pages:** Pages → filter indexed vs not indexed; note new indexed URLs or regressions.
- [ ] **Top queries:** Performance → Queries — top 10 by impressions; flag irrelevant or misleading queries.
- [ ] **Low CTR opportunities:** pages/queries with **high impressions, low CTR** (e.g. CTR below site average with >100 impressions) — candidate for title/meta or clearer H1 on page (see decision rules below).
- [ ] **Coverage / indexing:** any new **Error** or **Excluded** reasons on key URLs (`/`, `/docs`, `/guides`, `/contact`, `/onboarding`).
- [ ] **Sitemap:** still “Success”; last read date recent.

### B. Plausible (last 7 days vs prior 7 days)

- [ ] **Unique visitors** and **pageviews** (trend).
- [ ] **Top pages** — confirm `/docs`, `/guides`, `/contact` appear as expected.
- [ ] **Goal counts** (custom events):
  - `docs_view`
  - `guides_view`
  - `contact_click`
  - `request_access_click`
  - `merchant_login_click`
- [ ] **Funnel sanity:** `request_access_click` and `contact_click` should not diverge wildly without explanation (see `docs/ANALYTICS.md` for double-counting on `/contact`).
- [ ] Spot-check script on `/` and `/contact` (Network → `plausible.io/js/script.js`).

### C. Cross-channel (optional, 5 min)

- [ ] Inbox: new **Kobbopay — merchant access inquiry** threads (`docs/INQUIRY_HANDLING_RUNBOOK.md`).
- [ ] Any 404 spikes on new paths in server logs (if available).

### D. One decision for next week

- [ ] Pick **one** action only: content, title/meta, new guide, or **no change** (see below).

---

## What to measure (weekly snapshot)

Copy this block into your weekly note:

```
Week of: YYYY-MM-DD
GSC: impressions ___ | clicks ___ | CTR ___% | avg position ___
GSC indexed pages (approx): ___
Top 3 queries: 1) ___ 2) ___ 3) ___
Plausible UV: ___ | pageviews: ___
Goals: request_access ___ | contact ___ | docs_view ___ | guides_view ___ | merchant_login ___
Decision: [ no change | title/meta | new guide | new section | other ]
```

---

## How to decide next content

| Signal | Likely action |
| --- | --- |
| Query clearly matches an existing page but CTR is low | Improve **title + meta description** first (bounded, honest copy). |
| Query matches a topic with no dedicated page | Add a **guide** or expand **`/docs`** section (one focused page, not a sprawl). |
| High `docs_view` / `guides_view`, low `request_access_click` | Clarify CTA on that page; check onboarding path (`/onboarding`, `/contact#merchant-intake`). |
| High impressions on irrelevant queries | Do **not** chase with new pages; optionally tighten copy to reduce mismatch (no keyword stuffing). |
| Flat traffic, healthy indexing, no errors | **No change** — consistency beats churn in first 8–12 weeks. |
| New coverage error on important URL | Fix technical/SEO issue (canonical, 404, redirect) — not a “content” project. |

**Priority content hubs (do not invent new IA without reason):** `/docs`, `/guides`, `/glossary`, `/onboarding`, `/contact`.

---

## When to improve title / meta

Do it when **all** apply:

1. URL is **indexed** and receiving **meaningful impressions** (rough guide: 50+ impressions in 28 days, or clearly rising).
2. **CTR is below** your site average for that query cluster.
3. Current title/meta is **vague** or **misaligned** with the query (not misleading).
4. You can state the page value in **one honest line** (merchant approval, selected rails, no fake claims — see `docs/CONTENT_POLICY.md`).

**Do not** change title/meta weekly “for SEO.” Batch changes; wait **2–4 weeks** after a change before judging GSC again.

---

## When to add a new guide

Add a guide when:

- A **recurring GSC query** or support question maps to a **single technical topic** (webhooks, lifecycle, idempotency, onboarding).
- An existing guide is **too long** and you are splitting for clarity (not duplication).
- You can link it from `/guides`, `/docs`, and one CTA path without orphan pages.

**Do not** add a guide when:

- Traffic is low but indexing is healthy (wait for demand signals).
- The topic is already covered on `/docs` with stable anchors — improve internal links instead.
- Motivation is only “publish more pages.”

After adding a guide: update `public/sitemap.xml`, `public/llms.txt` if citation hubs change, run `npm run verify`, deploy.

---

## When not to change anything

Stay the course when:

- Indexing is **stable or growing**, no critical coverage errors.
- Impressions are **growing** even if clicks are still small (normal early phase).
- Plausible goals show **steady or improving** intent (`docs_view`, `request_access_click`).
- You have **no query/CTR diagnosis** yet (insufficient data).

**Default for weeks 1–4 post-launch:** measure and log; **no structural site changes** unless something is broken.

---

## Related docs

| Doc | Purpose |
| --- | --- |
| `docs/ANALYTICS.md` | Plausible env, event names, verification |
| `docs/WEEKLY_FUNNEL_REVIEW.md` | Inbox, leads, Plausible + GSC ops checklist |
| `docs/CONTENT_POLICY.md` | Claim boundaries for any copy change |
| `docs/DEPLOYMENT_CHECKLIST.md` | Deploy after content/sitemap changes |

---

## Review log (append weekly)

| Week of | GSC clicks | GSC impr. | Indexed (note) | request_access | contact_click | docs_view | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 2026-05-16 | _baseline_ | _baseline_ | homepage + sitemap | _setup goals_ | | | Initial monitoring cycle |
