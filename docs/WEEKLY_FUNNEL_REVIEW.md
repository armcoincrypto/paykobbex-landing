# Weekly funnel review (lightweight)

A **30–45 minute** recurring checklist for whoever owns growth + ops on the marketing site. Goal: spot drift in intent, broken flows, and unanswered merchants.

## 1. Plausible traffic

- [ ] Open Plausible for **pay.kobbex.com** (or your self-hosted dashboard).
- [ ] Compare **unique visitors** and **pageviews** week over week; note any spike or collapse.
- [ ] Confirm the Plausible script still loads on `/` and `/contact` (spot-check in browser devtools → Network).

## 2. Conversion events (custom goals)

In Plausible → **Goals** (or custom events view), review counts for:

- `request_access_click`
- `docs_view`
- `guides_view`
- `contact_click`
- `merchant_login_click`

- [ ] Note the ratio **request_access_click** → **contact_click** (page + mailto clicks are both `contact_click` in our model — interpret with context from `docs/ANALYTICS.md`).
- [ ] Flag if **docs_view** or **guides_view** drops while **request_access_click** rises (possible confused users).

## 3. Contact emails (inbox)

- [ ] Clear **`lead-new`** backlog or assign owners (`docs/INQUIRY_HANDLING_RUNBOOK.md`).
- [ ] Count inbound threads with subject **Kobbopay — merchant access inquiry**.
- [ ] Verify at least one person has **vacation coverage** on the intake mailbox.

## 4. Unanswered leads

- [ ] Any thread with **no outbound reply** beyond your internal SLA? List and assign.
- [ ] Any **bounce** or mailbox full errors? Fix forwarding.

## 5. Top pages (site)

- [ ] Top entry and exit pages in Plausible; anything unexpected (404s, old URLs)?
- [ ] Click paths toward `/contact#merchant-intake` and `/onboarding`.

## 6. Search queries (Google Search Console)

- [ ] GSC → Performance → **Queries** (last 7–28 days).
- [ ] Note top queries driving impressions/clicks; any misleading queries worth addressing in copy?
- [ ] Check **Coverage** / **Page experience** for regressions on `/contact` or `/docs`.

## 7. One content improvement (decision)

- [ ] Pick **one** change for the coming week (FAQ line, clearer rails disclaimer, diagram alt text, onboarding FAQ, etc.).
- [ ] Log it in your tracker with owner and ship date.

## 8. Optional: export snapshot

- [ ] Screenshot or CSV export Plausible + GSC for the week and store in your internal drive (helps post-mortems).
