# Evidence pipeline (measurement automation)

Operational, read-only exports for **pay.kobbex.com** refinement decisions. This pipeline **never** modifies the public marketing site, deploys, or generates SEO/copy changes automatically.

**Governance:** `docs/EVIDENCE_GUIDED_REFINEMENT.md` · **Analytics implementation:** `docs/ANALYTICS.md`

---

## Data sources

| Source | Type | Automation | Secret location |
| --- | --- | --- | --- |
| **Plausible** | Cloud Stats API v2 | `npm run evidence:weekly` | `.env.local` → `PLAUSIBLE_API_KEY` |
| **Google Search Console** | Search Analytics API | `npm run evidence:weekly` | `.env.local` → `GSC_CREDENTIALS_PATH` |
| **Inbox / conversations** | Qualitative | Manual | `docs/INQUIRY_HANDLING_RUNBOOK.md` |
| **Server logs** | Secondary only | Not automated | Do not use for ship decisions |

### Plausible discovery (P21)

| Check | Finding |
| --- | --- |
| Hosting | **Plausible Cloud** (`https://plausible.io/js/script.js` in `.env.production`) |
| Site id | `pay.kobbex.com` (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`) |
| API token in repo | **No** — only public `NEXT_PUBLIC_*` build vars |
| Self-hosted base URL | Optional override: `PLAUSIBLE_API_BASE_URL` |
| Existing export tooling | **Added** — `scripts/evidence/` |

### GSC discovery

| Check | Finding |
| --- | --- |
| Verification | `googlecfbf8ca40f4b4f2b.html` on production |
| API credentials in repo | **No** |
| Existing export tooling | **Added** — service-account JWT (no extra npm deps) |

---

## Weekly operational flow

1. **Monday (or fixed review day):** run `npm run evidence:weekly` on a trusted machine with credentials in `.env.local`.
2. Open `docs/reports/weekly-evidence-YYYY-MM-DD.md` and linked summaries.
3. Paste key tables into `docs/EVIDENCE_GUIDED_REFINEMENT.md` baseline section (or attach reports in your internal drive).
4. Log inbox themes in the **confusion log** (or “none”).
5. Apply P20 rules: **at most one** public refinement, or **no change**.
6. Record decision in the **refinement decision log**.

---

## Commands

```bash
# Copy secrets template (never commit .env.local)
cp .env.example .env.local
# Edit .env.local — add PLAUSIBLE_API_KEY and GSC_CREDENTIALS_PATH

npm run evidence:weekly
```

### Outputs (`docs/reports/`)

| File | Contents |
| --- | --- |
| `plausible-weekly-YYYY-MM-DD.json` | Machine-readable Plausible export |
| `plausible-summary-YYYY-MM-DD.md` | Human-readable Plausible summary |
| `gsc-weekly-YYYY-MM-DD.json` | Machine-readable GSC export |
| `gsc-summary-YYYY-MM-DD.md` | Human-readable GSC summary |
| `weekly-evidence-YYYY-MM-DD.json` | Rollup status + P21 readiness flags |
| `weekly-evidence-YYYY-MM-DD.md` | Rollup for reviewers |

Generated reports are **gitignored** (may contain business metrics). See `docs/reports/README.md`.

### Environment variables

Add to **`.env.local`** only (gitignored):

| Variable | Required | Description |
| --- | --- | --- |
| `PLAUSIBLE_API_KEY` | For Plausible export | Stats API key from Plausible → Settings → API Keys |
| `PLAUSIBLE_SITE_ID` | Optional | Defaults to `pay.kobbex.com` |
| `PLAUSIBLE_API_BASE_URL` | Optional | Defaults to `https://plausible.io` (self-hosted override) |
| `GSC_CREDENTIALS_PATH` | For GSC export | Absolute path to service account JSON |
| `GSC_SITE_URL` | Optional | Defaults to `https://pay.kobbex.com/` |
| `EVIDENCE_DATE_RANGE` | Optional | Plausible period (default `7d`) |
| `EVIDENCE_GSC_DAYS` | Optional | GSC window length (default `28`) |
| `EVIDENCE_DATE_STAMP` | Optional | Override report date `YYYY-MM-DD` |

---

## Fallback when APIs are unavailable

If either export is **blocked**, the script still writes summary files explaining what is missing. **Do not** ship public refinements from server-log proxies.

1. Read blocker text in `plausible-summary-*.md` / `gsc-summary-*.md`.
2. Complete manual dashboard export (screenshot/CSV) into your internal tracker.
3. Paste into `docs/EVIDENCE_GUIDED_REFINEMENT.md`.
4. Default decision: **no change**.

---

## Security rules

1. **Never** commit `.env.local`, API keys, or service account JSON.
2. **Never** log `PLAUSIBLE_API_KEY` or private keys to stdout (script redacts common patterns).
3. **Never** expose tokens in report files (post-write secret scan).
4. Reports are **read-only** artifacts for humans — not consumed by the static site build.
5. CI runs `npm run verify` only; evidence export runs **locally** or in a secured ops environment.

---

## Governance (automation boundaries)

| Rule | Enforcement |
| --- | --- |
| Reports do not change the site | Export script has no write access to `src/` or `out/` |
| No automatic SEO/copy optimization | Summaries end with human-review reminders |
| No AI-generated changes from metrics alone | Not implemented |
| Humans approve refinements | Decision log in `EVIDENCE_GUIDED_REFINEMENT.md` |
| Evidence informs, does not auto-ship | P20/P21 readiness flag in weekly rollup |

---

## Troubleshooting

| Symptom | Action |
| --- | --- |
| Plausible `401` | Regenerate Stats API key; check `PLAUSIBLE_SITE_ID` matches dashboard |
| Plausible goals all `0` | Register seven custom-event goals in dashboard; run Realtime test (`docs/EVIDENCE_GUIDED_REFINEMENT.md` § P18) |
| GSC `403` | Add service account email as user on the GSC property |
| GSC empty rows | Property may be new; wait for indexing + impression lag |
| Secret scan fail | Delete affected report files; fix script; re-run |

---

## Related docs

| Doc | Purpose |
| --- | --- |
| `docs/EVIDENCE_GUIDED_REFINEMENT.md` | Decision rules and logs |
| `docs/SEO_GROWTH_REVIEW.md` | GSC interpretation |
| `docs/WEEKLY_FUNNEL_REVIEW.md` | Inbox + funnel |
| `docs/ANALYTICS.md` | Client-side instrumentation |
