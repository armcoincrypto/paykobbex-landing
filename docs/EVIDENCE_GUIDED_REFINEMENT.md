# Evidence-guided refinement (P15)

**Purpose:** Move pay.kobbex.com from a well-reasoned infrastructure experience to a **continuously learning** one — using real signals, not redesign instinct.

**Cadence:** Weekly evidence review (45–60 min), same owner as `docs/WEEKLY_FUNNEL_REVIEW.md` and `docs/SEO_GROWTH_REVIEW.md`.

**Companion docs:**

| Doc | Role |
| --- | --- |
| `docs/SEO_GROWTH_REVIEW.md` | GSC + Plausible weekly snapshot |
| `docs/WEEKLY_FUNNEL_REVIEW.md` | Inbox, leads, funnel ops |
| `docs/OPERATIONAL_OBSERVATION.md` | Post-deploy ops page + guide signals |
| `docs/ANALYTICS.md` | Event names and implementation |
| `docs/INQUIRY_HANDLING_RUNBOOK.md` | Qualitative evidence from merchants |
| `docs/MERCHANT_INTAKE_PROCESS.md` | Onboarding coordination |

---

## Part 1 — Evidence collection system

### Sources (required weekly)

| Source | What it tells you | Where |
| --- | --- | --- |
| **Plausible** | On-site intent, route depth, CTA clicks | Dashboard → Goals + Top pages |
| **Google Search Console** | Search intent, CTR gaps, indexing | Performance → Queries / Pages |
| **Onboarding inquiries** | Real expectations vs site copy | Inbox: `Kobbopay — merchant access inquiry` |
| **Merchant emails** | Integration confusion, timeline pressure | Tagged threads (`lead-*`) |
| **Onboarding conversations** | Mapping, webhook, rails questions | Call notes (internal only) |
| **Docs usage** | `docs_view`, `/docs` time on page | Plausible |
| **Guides usage** | `guides_view`, per-guide URLs | Plausible |
| **Operations usage** | `operations_view`, anchor scroll (manual) | Plausible + spot-check |
| **Operational questions** | Paid vs Confirmed, retries, review | Inbox + FAQ themes |
| **Support confusion patterns** | Repeat phrases in tickets | Confusion log below |

### Categories (tag every finding)

| Code | Category | Example |
| --- | --- | --- |
| `LIFE` | Lifecycle semantics | “We shipped on Paid” |
| `WH` | Webhooks / idempotency | “Duplicate webhook credited twice” |
| `REC` | Reconciliation / finance | “When do we recognize revenue?” |
| `ONB` | Onboarding / approval | “How fast do we get keys?” |
| `RAIL` | Selected rails | “Why isn’t SOL enabled?” |
| `WD` | Withdrawal controls | “Why is payout pending review?” |
| `SEO` | Search / discovery | High impressions, low CTR on `/guides/...` |
| `UX` | Navigation / IA | Users land on `/docs`, never reach guides |
| `TRUST` | Trust / hype mismatch | “Are you instant like X?” |

### Prioritization (score each finding 1–3)

| Dimension | 1 (low) | 3 (high) |
| --- | --- | --- |
| **Frequency** | One-off email | Same question 2+ weeks or multiple leads |
| **Severity** | Cosmetic wording | Wrong operational expectation / integration risk |
| **Measurability** | Anecdote only | Plausible + GSC + inbox align |

**Ship a refinement only when total ≥ 7** (or frequency = 3 for two consecutive weeks).

### Weekly evidence review checklist

1. [ ] Export Plausible snapshot (UV, top pages, all goals including `operations_view`, `onboarding_view`).
2. [ ] Export GSC top 10 queries + low-CTR pages (28-day window).
3. [ ] Scan inbox for new confusion themes → **Confusion log**.
4. [ ] Scan onboarding threads for timeline / instant-access language → **Onboarding objection log**.
5. [ ] Compare `request_access_click` → `contact_click` → replies sent (funnel).
6. [ ] Record **one decision**: change | no change | instrument-only | investigate.
7. [ ] File decision in **Refinement decision log** (bottom of this doc).

---

## Part 2 — User understanding audit

### Hypothesized confusion zones

These are **hypotheses** until validated by evidence (Part 1). Do not expand content solely from this table.

| Zone | Likely misunderstanding | Validation signal | Refinement type (if confirmed) |
| --- | --- | --- | --- |
| **Paid vs Confirmed** | Treating detection as finality | Inbox `LIFE`; guide traffic to reconciliation; GSC “confirmed payment” | Glossary cross-link; one guide callout; `/operations#lifecycle-create-to-confirmed` link |
| **Retries vs duplicates** | “Bug” when webhook fires twice | Inbox `WH`; webhook guide exit without contact | One bullet in `ProductionRealityNote`; idempotency glossary link |
| **Merchant approval** | Anonymous instant production keys | Inbox `ONB`; high `request_access_click`, low quality intake | Onboarding FAQ; `/operations#merchant-review` link |
| **Selected rails** | “All chains supported” | Inbox `RAIL`; GSC asset/network queries | Features + onboarding copy tighten; glossary |
| **Onboarding timeline** | Same-day activation | Objection log “how long”; bounce from `/onboarding` | FAQ already bounded — link operations review flow |
| **Withdrawal controls** | Instant universal payout | Inbox `WD`; marketplace journey traffic | Operations walkthrough; constraint panel |
| **Webhook verification** | Parse JSON before verify | Technical review calls | Guide emphasis (existing); no new page |
| **Reconciliation** | Real-time books = detection | Finance questions `REC` | Reconciliation guide + operations walkthrough |

### Validation methods

| Method | Pass criteria |
| --- | --- |
| **2-week repetition** | Same category (`LIFE`, `WH`, …) appears in ≥2 weekly reviews |
| **Funnel correlation** | High `docs_view` + high `request_access_click` + intake mentions “didn’t understand X” |
| **GSC intent match** | Query maps to existing URL but CTR below site average at 50+ impressions |
| **Negative test** | After micro-refinement, theme does not recur for 4 weeks (optional) |

---

## Part 3 — Search intent analysis

### Weekly GSC audit

- [ ] **Impressions vs clicks** by page (identify low CTR).
- [ ] **Query clusters** — group by audience:
  - **Operators:** lifecycle, reconciliation, webhook retry
  - **Finance:** confirmation, settlement, reconciliation
  - **Developers:** API, webhook signature, idempotency
  - **Onboarding:** merchant onboarding, approval, sandbox
- [ ] **Indexed guide visibility** — each `/guides/*` in Pages report; note “Discovered not indexed”.
- [ ] **Terminology mismatch** — query uses “settled” but site says “Confirmed” (do not keyword-stuff; add glossary alias only if repeated).

### Refinement allowed (SEO) only when

1. URL is indexed.
2. Meaningful impressions (50+ in 28 days **or** clear week-over-week rise).
3. CTR below site average for that query cluster.
4. Change is **title + meta** or **one cross-link** — not a new page.

### Do not

- Chase irrelevant high-impression queries with new pages.
- Add “best crypto gateway” or volume claims for SEO.

---

## Part 4 — Onboarding friction analysis

### Funnel signals (Plausible)

| Signal | Healthy pattern | Friction pattern |
| --- | --- | --- |
| `onboarding_view` | Stable with `docs_view` / `guides_view` | High onboarding, zero docs/guides (wrong audience or vague homepage) |
| `request_access_click` | Correlates with `contact_click` | Many clicks, few contact landings (CTA confusion) |
| `contact_click` | Matches intake volume | High contact views, few emails (form/mailto friction) |
| `docs_view` → `request_access_click` | Docs before intent | `request_access_click` without docs (may need clearer prerequisites) |
| `guides_view` → `request_access_click` | Technical depth before intake | High guides, decline quality in inbox (integration not ready) |
| `merchant_login_click` | Some returning merchants | Spikes without approval (expectation mismatch) |

### Hesitation hypotheses (validate before changing)

| Hypothesis | Evidence needed | Surgical fix (examples) |
| --- | --- | --- |
| Review process unclear | ONB inbox + low scroll on onboarding | Link `/operations#merchant-review` |
| Docs feel disconnected from intake | docs_view ↑, contact ↓ | One line on `/docs` CTA: “After reading, use structured intake” |
| Operations hub undiscovered | Low `/operations` UV, footer-only paths | **Only if 2+ weeks low UV + high docs:** add nav link |
| Overexplained hero | High bounce on `/`, low scroll to `#operational-realism` | Shorten hero — **requires scroll evidence** |

### Never add

- Countdown timers, “limited slots,” fake urgency.
- Aggressive popups or live-chat widgets.
- Public SLA promises from funnel data.

---

## Part 5 — Operational content refinement

### Rule

Every addition must solve a **demonstrated** understanding problem (prioritization ≥ 7).

### Approved refinement types

| Type | Example |
| --- | --- |
| Edge-case sentence | “Late Confirmed after support ticket” in operations walkthrough |
| Cross-link | Guide → `/operations#webhook-retries` |
| Glossary precision | Paid vs Confirmed cross-reference |
| Production reality bullet | Retries normal — already in `ProductionRealityNote` |
| Intake template hint | Runbook macro for “Paid vs Confirmed” |

### Not approved without evidence

- New walkthroughs
- New merchant journey patterns
- New guides
- Longer homepage sections

---

## Part 6 — Trust signal validation

### Signals to evaluate (not vanity metrics)

| Signal | Measure effectiveness by |
| --- | --- |
| Operational clarity | Fewer `LIFE`/`WH` repeat questions; time on `/operations` |
| Docs depth | `docs_view` with downstream `request_access_click` and **qualified** intake |
| Onboarding realism | Fewer “instant activation” objections in inbox |
| Webhook semantics | Technical review passes faster; fewer idempotency incidents reported |
| Glossary precision | GSC clicks on glossary URLs; internal team cites terms |
| Security boundaries | Fewer “send us your keys” threads |
| Visual restraint | No increase in “is this legit?” tone emails |
| Absence of hype | No mismatch complaints vs competitors |

### Weak signals (do not optimize)

- Raw pageview counts alone.
- Time on page without funnel context.
- Social likes / shares (not instrumented — ignore).

### Strengthen when validated

Double down on what reduces confusion: **constraints as trust**, **illustrative operations**, **production-oriented docs** — not badges or logos.

---

## Part 7 — UX friction micro-audit

### Heuristic + evidence matrix (monthly)

| Area | Heuristic risk | Evidence to collect |
| --- | --- | --- |
| Confusing flows | Docs → contact without onboarding context | Path analysis in Plausible |
| Scroll fatigue | Long `/operations` on mobile | Manual mobile pass; exit pages |
| Navigation hesitation | Operations footer-only | `/operations` UV vs `/docs` |
| Anchor usage | Walkthrough IDs unused | Manual UTM or Plausible custom props (future) |
| Mobile friction | Checkpoint strip overflow | QA on deploy |
| Docs discoverability | GSC lands on `/` not `/docs` | Top landing pages |
| Glossary discoverability | Low `/glossary` UV | Link from high-traffic guides only if evidence |
| Onboarding path | Skip `/onboarding` | `onboarding_view` vs `request_access_click` |

### Surgical fix menu (pick one per week max)

- Single cross-link
- One FAQ sentence
- Title/meta tweak (SEO rules)
- Glossary definition precision
- Analytics goal addition (instrumentation, not UX)

**Not allowed:** redesign, new sections, motion, new pages.

---

## Part 8 — Observation logs (templates)

### Confusion log

| Week of | Category | Verbatim theme (no PII) | Source | Score | Action |
| --- | --- | --- | --- | --- | --- |
| | LIFE | | inbox | | |
| | WH | | call | | |

### Search query log

| Week of | Query | Page | Impr. | CTR | Action |
| --- | --- | --- | --- | --- | --- |
| | | | | | |

### Onboarding objection log

| Week of | Objection theme | Frequency | Site gap | Action |
| --- | --- | --- | --- | --- |
| | “Instant keys” | | timeline FAQ | none / link ops |
| | “All chains” | | selected rails | none |

### Refinement decision log

| Week of | Decision | Evidence summary | Shipped |
| --- | --- | --- | --- |
| YYYY-MM-DD | no change | flat traffic, healthy indexing | — |
| | cross-link | 2× ONB instant keys | onboarding → operations#merchant-review |

---

## Part 9 — Refinement philosophy

### Always

- Observe before changing.
- Prefer one surgical fix over a content sprint.
- Label illustrative flows; never add fake proof.
- Keep static export, a11y, claims guardrails (`npm run verify`).

### Never without evidence

- Redesigns or visual experiments.
- New guides (need repeated confusion, 2+ weeks).
- CTA escalation or urgency copy.
- New marketing pages or case studies.
- Navbar IA changes (unless 2+ weeks low discovery + high docs traffic).
- Fake metrics, SLAs, or testimonials.

### Vanity metrics (ignore for decisions)

- Pageviews without funnel context.
- “Growth hacks,” A/B noise on first 8–12 weeks.
- Competitor feature parity requests in isolation.

### Marketing drift protection

If a proposed change sounds like “startup crypto marketing,” reject it unless evidence shows users are **lost** without it — then solve with **clarity**, not hype.

---

## Part 10 — P15 instrumentation note

Route-level goals added for evidence collection:

| Event | Route |
| --- | --- |
| `operations_view` | `/operations` |
| `onboarding_view` | `/onboarding` |

Register in Plausible alongside existing five goals (`docs/ANALYTICS.md`).

---

## Weekly snapshot (copy)

```
Week of: YYYY-MM-DD
Reviewer:

Plausible: UV ___ | ops_view ___ | onboarding_view ___ | docs ___ | guides ___ | request_access ___ | contact ___

GSC: impr ___ | clicks ___ | CTR ___% | top query: ___

Confusion (top category): ___ | score: ___

Decision: [ no change | cross-link | glossary | title/meta | instrument | investigate ]

Shipped: ___
```

---

## P16 — Measured refinement sprint (2026-05-16)

**Sprint rule:** Baseline recorded **before** any P16 site change. One micro-refinement maximum per week unless score ≥ 7 on a second theme.

### Part 1 — Baseline snapshot (week of 2026-05-16)

#### Plausible (primary — paste from dashboard)

> **Status:** Not exported in-repo. Owner: paste counts from Plausible → Goals (7-day window ending 2026-05-16) into the table below after weekly review.

| Goal / metric | Count (7d) | Notes |
| --- | --- | --- |
| Unique visitors | _pending_ | |
| Pageviews | _pending_ | |
| `docs_view` | _pending_ | |
| `guides_view` | _pending_ | |
| `operations_view` | _pending_ | P15 goal — confirm registered |
| `onboarding_view` | _pending_ | P15 goal — confirm registered |
| `request_access_click` | _pending_ | |
| `contact_click` | _pending_ | |
| `merchant_login_click` | _pending_ | |
| Top landing page | _pending_ | |

#### Google Search Console (primary — paste from dashboard)

> **Status:** Not exported in-repo. Owner: GSC → Performance → last 7 days.

| Metric | Value (7d) | Notes |
| --- | --- | --- |
| Impressions | _pending_ | |
| Clicks | _pending_ | |
| CTR | _pending_ | |
| Avg position | _pending_ | |
| Indexed pages (approx) | _pending_ | Pages report; sitemap submitted 2026-05-16 |
| Top query #1 | _pending_ | |
| Top query #2 | _pending_ | |
| Top query #3 | _pending_ | |
| Low-CTR URL candidate | _pending_ | Only act if 50+ impr. and below avg CTR |

#### Qualitative (inbox / conversations)

| Source | Count / theme (7d) | Notes |
| --- | --- | --- |
| Merchant access inquiries | _pending_ | Subject: `Kobbopay — merchant access inquiry` |
| Repeat confusion themes | **none logged** | No inbox export in sprint environment |
| Onboarding objections | **none logged** | |

#### Server log proxy (secondary — not a substitute for Plausible)

**Window:** nginx `access.log` + `access.log.1` (~48h ending 2026-05-16). **Caveat:** includes bots/scanners; low volume; use for path **ratios** only until Plausible baseline is pasted.

| Path (2xx/3xx HTML) | Hits (proxy) |
| --- | ---: |
| `/contact` | 14 |
| `/onboarding` | 13 |
| `/docs` | 12 |
| `/guides` | 11 |
| `/glossary` | 11 |
| `/security` | 9 |
| `/features` | 4 |
| `/operations` | **3** |
| `/use-cases` | 2 |

**Proxy ratio:** `/operations` ≈ **25%** of `/docs` hits and **27%** of `/guides` hits → supports **discovery gap** hypothesis (footer + deep links; not primary nav).

---

### Part 2 — Confusion validation (P16)

| Zone | Evidence seen? | Repeated? | Severe? | Measurable? | Score | P16 action |
| --- | --- | --- | --- | --- | --- | --- |
| Paid vs Confirmed | Partial (P15 glossary) | No inbox | — | GSC pending | — | **Monitor** — no new copy |
| Retries vs duplicates | No | No | — | — | — | **Monitor** |
| Merchant review | Partial (P15 onboarding link) | No inbox | — | Proxy: onboarding 13 hits | — | **Monitor** |
| Selected rails | No | No | — | — | — | **Monitor** |
| Onboarding timeline | No | No | — | — | — | **Monitor** |
| Reconciliation | No | No | — | — | — | **Monitor** |
| Withdrawal controls | No | No | — | — | — | **Monitor** |
| Webhook verification | No | No | — | — | — | **Monitor** |

**Conclusion:** No confusion zone meets **ship threshold (≥7)** from qualitative data. P16 does **not** add guide paragraphs, glossary blocks, or title/meta changes without GSC/inbox evidence.

---

### Part 3–7 — P16 decisions

| Area | Finding | Decision |
| --- | --- | --- |
| **Search / CTR** | GSC not exported | **No title/meta changes** |
| **Onboarding** | No objection log; onboarding traffic present in proxy | **No copy change** (P15 link retained) |
| **Docs maturity** | No demonstrated misunderstanding | **No doc expansion** |
| **IA / discovery** | Proxy: `/operations` ≪ `/docs` and `/guides`; `/guides` hub lacked `/operations` link (docs hub already had it) | **One cross-link** on `/guides` → `/operations` |
| **Navbar** | Discovery gap suggested; fewer than 2 weeks of Plausible `operations_view` | **Deferred** — re-evaluate week of 2026-05-23 |

### P16 refinement decision log

| Week of | Decision | Evidence summary | Shipped |
| --- | --- | --- | --- |
| 2026-05-16 | cross-link | Server proxy: ops 3 vs guides 11; guides hub missing ops link; docs already linked | `/guides` → `/operations` |
| 2026-05-16 | investigate | Navbar ops link | Wait for Plausible week 2 (`operations_view` vs `docs_view`) |
| 2026-05-16 | no change | No inbox/GSC export; confusion zones not validated | title/meta, new guides, homepage |

---

## P16 — Governance reinforcement

Adds to Part 9 (effective after P16):

1. **No redesigns from taste alone** — includes “more premium,” motion, or hero expansion.
2. **No new pages** without the same confusion theme in **two** weekly reviews (score ≥ 7) or repeated GSC demand.
3. **No CTA escalation** without funnel evidence (`request_access_click` vs qualified replies).
4. **No operational copy changes** without inbox, call, or repeated Plausible path + qualitative alignment.
5. **No homepage expansion** without measurable scroll/exit data (Plausible or session recordings).
6. **Navbar IA:** requires **two consecutive weeks** of `operations_view` below one-third of `docs_view` (or equivalent path ratio) before adding a nav item.
7. **Server logs** are a **secondary** signal only — never override absent Plausible/GSC without labeling “proxy.”
8. **Weekly owner** must paste Plausible + GSC into baseline before approving a second refinement in the same week.

---

## Baseline (ongoing)

| Metric | Week of 2026-05-16 | Week of 2026-05-23 |
| --- | --- | --- |
| `operations_view` | _pending Plausible_ | _pending Plausible_ |
| `docs_view` | _pending Plausible_ | _pending Plausible_ |
| `operations_view` ÷ `docs_view` | _cannot compute_ | _cannot compute_ |
| `onboarding_view` | _pending Plausible_ | _pending Plausible_ |
| `request_access_click` | _pending Plausible_ | _pending Plausible_ |
| Top confusion category | none logged | none logged |
| Top GSC query | _pending GSC_ | _pending GSC_ |
| Refinement shipped | `/guides` → `/operations` cross-link | **no change** |

---

## P17 — Second-week measurement (2026-05-23)

**Prerequisite:** Real week-two Plausible + GSC + inbox data before any public-site change.

**Sprint outcome:** **No public-site change.** Documentation-only week; navbar decision **blocked** on missing primary signals.

### Week-two baseline (paste from dashboards)

#### Plausible (primary — required for navbar rule)

> **Status (sprint environment):** Not exported. **Owner action:** Paste 7-day window ending **2026-05-23** before overriding this decision.

| Goal / metric | W1 (2026-05-16) | W2 (2026-05-23) | Δ |
| --- | --- | --- | --- |
| Unique visitors | _pending_ | _pending_ | — |
| `docs_view` | _pending_ | _pending_ | — |
| `operations_view` | _pending_ | _pending_ | — |
| **Ratio** `operations_view` ÷ `docs_view` | _pending_ | _pending_ | — |
| `guides_view` | _pending_ | _pending_ | — |
| `onboarding_view` | _pending_ | _pending_ | — |
| `request_access_click` | _pending_ | _pending_ | — |
| `contact_click` | _pending_ | _pending_ | — |
| Top page #1 | _pending_ | _pending_ | — |

#### Google Search Console

| Metric | W1 | W2 | Δ |
| --- | --- | --- | --- |
| Impressions | _pending_ | _pending_ | — |
| Clicks | _pending_ | _pending_ | — |
| CTR | _pending_ | _pending_ | — |
| Low-CTR guide (50+ impr.) | _pending_ | _pending_ | — |

#### Qualitative

| Source | W2 |
| --- | --- |
| Merchant inquiries | _pending_ |
| Confusion categories | **none logged** |
| Onboarding objections | **none logged** |
| `LIFE` repeat | **no** |

#### Server log proxy (secondary only — W2 window)

**Window:** nginx `access.log` + `access.log.1` (~48–72h ending 2026-05-16 server date; shared vhost). **Not used for navbar decision.**

| Path | W1 proxy | W2 proxy | Δ |
| --- | ---: | ---: | ---: |
| `/docs` | 12 | 13 | +1 |
| `/guides` | 11 | 13 | +2 |
| `/operations` | 3 | **4** | +1 |
| `/onboarding` | 13 | 14 | +1 |
| `/contact` | 14 | 14 | 0 |

**W2 proxy ratio:** `/operations` ÷ `/docs` ≈ **31%** (4/13) — above ⅓ on proxy alone. **Does not satisfy P17 rule** (requires two weeks of **Plausible** `operations_view` vs `docs_view`).

---

### Week one vs week two comparison

| Signal | Comparable? | Finding |
| --- | --- | --- |
| Plausible goals | **No** (both weeks pending) | Cannot evaluate navbar rule |
| GSC CTR | **No** | No title/meta change |
| Inbox confusion | **No new data** | No LIFE / ONB refinements |
| Server proxy | Partial | Ops discovery up slightly; **insufficient** to override governance |

---

### P17 decision table

| Candidate change | Rule | Evidence | Decision |
| --- | --- | --- | --- |
| **Operations in primary nav** | `operations_view` &lt; ⅓ `docs_view` for **2 consecutive Plausible weeks** | Plausible W1 + W2 **missing** | **Reject** — do not add nav |
| Guide title/meta | 50+ impr., low CTR | GSC **missing** | **Reject** |
| Payment-lifecycle → `#lifecycle-create-to-confirmed` | `LIFE` repeats in inbox | **None** | **Reject** |
| Onboarding paragraph | Repeated objections | **None** | **Reject** |
| Any other copy / redesign | P16 governance | No validated zone | **Reject** |

**Shipped:** **no change** (public site unchanged since P16 guides cross-link).

---

### P17 refinement decision log

| Week of | Decision | Evidence summary | Shipped |
| --- | --- | --- | --- |
| 2026-05-23 | **no change** | Plausible + GSC not pasted; inbox empty; navbar rule not satisfiable on proxy alone | — |

---

### Next monitoring rule (post-P17)

1. **Blocker:** Paste Plausible W1 + W2 retroactively if possible, then re-run navbar ratio.
2. **Navbar:** Add **Operations** to `Navbar` only when **both** weeks show `operations_view` below 0.33 × `docs_view` (and ops remains strategically important).
3. If Plausible shows ratio **≥ ⅓** for either week → **do not** add nav; keep footer + cross-links.
4. **One change per week** maximum; prefer **no change** when primary data is missing.
5. Server log proxy may **investigate** only; it may not **ship** IA without Plausible alignment (governance § P16 item 7).

---

## P18 — Data completeness and measurement integrity (2026-05-16)

**Scope:** Analytics QA and evidence governance only. **No public-site UX, nav, content, or deploy** (instrumentation verified intact).

### Hard rule (effective immediately)

> **No IA or content refinement decisions may be made until Plausible goal exports and GSC performance exports are pasted into this doc for the review week — unless fixing a production analytics bug.**

Server-log proxies remain **investigate-only** and cannot override this rule.

---

### 1. Plausible setup status

| Check | Status | Evidence |
| --- | --- | --- |
| Provider enabled at build | **Pass** | `.env.production`: `NEXT_PUBLIC_ANALYTICS_PROVIDER=plausible` |
| Domain | **Pass** | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN=pay.kobbex.com` |
| Script URL | **Pass** | `https://plausible.io/js/script.js` (CDN returns HTTP 200) |
| Script on live pages | **Pass** | Preload to Plausible on `index`, `docs`, `guides`, `operations`, `onboarding`, `contact`, `login` HTML (1 ref each) |
| Single script instance | **Pass** | One `plausible.io/js/script.js` preload per page; `AnalyticsRoot` in `layout.tsx` |
| Custom props | **Pass** | `trackConversion` sends `{ surface: "marketing" }` only — no PII |
| Implementation reference | — | `docs/ANALYTICS.md`, `src/lib/conversion-events.ts` |

**Dashboard (owner):** Confirm site property **pay.kobbex.com** exists in Plausible and matches build-time domain.

---

### 2. Goal existence table (seven custom events)

Code defines exactly seven events (`src/lib/conversion-events.ts`). **Dashboard registration cannot be verified from CI** — owner must confirm goals in Plausible → Settings → Goals.

| Goal | Fires when (code) | In `CONVERSION_EVENTS` | Dashboard registered |
| --- | --- | --- | --- |
| `request_access_click` | Click on `Link` with `conv="request_access_click"` | Yes | **Owner verify** |
| `docs_view` | `RouteIntentBeacon` on `/docs` (once per tab session) | Yes | **Owner verify** |
| `guides_view` | `RouteIntentBeacon` on `/guides` and `/guides/*` | Yes | **Owner verify** |
| `operations_view` | `RouteIntentBeacon` on `/operations` | Yes | **Owner verify** |
| `onboarding_view` | `RouteIntentBeacon` on `/onboarding` | Yes | **Owner verify** |
| `contact_click` | `RouteIntentBeacon` on `/contact` + mailto `data-conv` | Yes | **Owner verify** |
| `merchant_login_click` | Click on `data-conv="merchant_login_click"` (e.g. `/login`) | Yes | **Owner verify** |

**Note:** `/login` does **not** emit a route-level goal on page load — only **`merchant_login_click`** on intentional click (by design).

---

### 3. Realtime event test table

**Automated (2026-05-16):** Static/live HTML + route-map audit — implementation **Pass**.

**Manual (owner — Plausible → Realtime):** Open Realtime in one tab; in another tab, run this sequence. Expect each custom event within ~1–2 minutes.

| Step | URL / action | Expected Plausible event | Code QA | Realtime (owner) |
| --- | --- | --- | --- | --- |
| 1 | `https://pay.kobbex.com/docs` | `docs_view` | Pass | _pending_ |
| 2 | `https://pay.kobbex.com/guides` | `guides_view` | Pass | _pending_ |
| 3 | `https://pay.kobbex.com/operations` | `operations_view` | Pass | _pending_ |
| 4 | `https://pay.kobbex.com/onboarding` | `onboarding_view` | Pass | _pending_ |
| 5 | `https://pay.kobbex.com/contact` | `contact_click` | Pass | _pending_ |
| 6 | `https://pay.kobbex.com/login` → click merchant login CTA | `merchant_login_click` | Pass | _pending_ |
| 7 | Any page → click **Request access** | `request_access_click` | Pass | _pending_ |

**De-dupe:** Route goals fire once per pathname per browser tab (`sessionStorage` key `kobbopay_conv_route:*`). Refreshing the same URL in the same tab may not re-fire — use a new tab or pathname to retest.

**DevTools check:** Network filter `plausible.io` → script loads; after hydration, custom events POST to Plausible (exact path depends on Plausible version).

---

### 4. GSC availability status

| Check | Status | Notes |
| --- | --- | --- |
| Verification file live | **Pass** | `https://pay.kobbex.com/googlecfbf8ca40f4b4f2b.html` → HTTP 200 |
| `robots.txt` | **Pass** | Allows `/`; sitemap URL declared |
| Sitemap live | **Pass** | `https://pay.kobbex.com/sitemap.xml` — **19** URLs including `/operations` |
| Sitemap processed (GSC UI) | **Owner verify** | GSC → Sitemaps → last read date / success |
| Pages indexed | **Owner verify** | GSC → Pages; site launch **2026-05-16** — may be early |
| Performance data | **Likely early** | Meaningful impressions often need days–weeks post-indexing |
| Priority URLs submitted | **Owner verify** | `/`, `/docs`, `/guides`, `/contact`, `/onboarding`, `/operations` per `docs/SEO_GROWTH_REVIEW.md` |

---

### 5. Data-readiness checklist (required before P19 refinement)

Complete **all** before any IA/content ship decision:

- [ ] All **seven** Plausible goals registered (names match exactly, case-sensitive).
- [ ] **Realtime test** (table §3) completed; owner marks each row Pass in Plausible UI.
- [ ] **Weekly export:** UV, pageviews, all seven goal counts (7-day window) pasted into baseline tables.
- [ ] **GSC export:** impressions, clicks, CTR, top 3 queries, low-CTR URL candidate pasted.
- [ ] **Qualitative:** inbox scan logged (or “none” for the week).
- [ ] **Ratio computed:** `operations_view` ÷ `docs_view` from Plausible (not server logs).

**P19 may start** when the checklist above is **complete for the active review week**. Until then, only analytics bugfixes or documentation updates are in scope.

---

### P18 decision log

| Date | Decision | Notes |
| --- | --- | --- |
| 2026-05-16 | **no public change** | Instrumentation QA pass; governance rule added |
| 2026-05-16 | **owner actions** | Register goals + Realtime test + paste W1/W2 Plausible/GSC |
