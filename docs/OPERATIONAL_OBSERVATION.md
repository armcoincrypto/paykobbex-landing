# Operational observation (post–P14)

**Superseded as primary process by** `docs/EVIDENCE_GUIDED_REFINEMENT.md` (P15). Use this file for quick ops-page signals; use P15 for categorization, prioritization, and ship decisions.

## Weekly (Plausible + GSC)

| Signal | Where | What to look for |
|--------|--------|------------------|
| Onboarding intent | Plausible: `request_access_click`, `onboarding_view`, `/contact` | Clicks without form completion → intake friction |
| Docs depth | Plausible: `docs_view`, `/docs`, time on page | High entry, low scroll → tighten overview or nav |
| Guides | Plausible: `guides_view`, `/guides/*` | Which guides get traffic vs drop-off |
| Operations | Plausible: `operations_view`, `/operations` | Walkthrough engagement; footer-only discovery? |
| Search queries | GSC → Performance → Queries | Add glossary/docs terms users already search |
| Landing pages | GSC + Plausible top pages | Double down on pages that convert to contact |

## Decision rules

1. **Hesitation on `/operations`** — add cross-links from the guide that sent traffic; do not add fake proof.
2. **Drop on webhook guide** — check mobile instrument layout; add one production-reality bullet if retries confuse (2+ weeks).
3. **Contact without docs** — link `/operations#merchant-review` from `/onboarding` (shipped P15).
4. **High `/docs`, low `/guides`** — docs overview is working; add one inline link per doc section, not new pages.

## Do not

- Add fake metrics, logos, or testimonials based on traffic.
- Promise SLAs or instant activation from funnel data.
- Expand scope without an observed confusion pattern (repeat for 2+ weeks per `docs/EVIDENCE_GUIDED_REFINEMENT.md`).

## Baseline (P16 week of 2026-05-16)

See full snapshot in `docs/EVIDENCE_GUIDED_REFINEMENT.md` § P16.

| Metric | Week of 2026-05-16 |
|--------|---------------------|
| `operations_view` | _pending Plausible_ |
| `onboarding_view` | _pending Plausible_ |
| `request_access_click` | _pending Plausible_ |
| Top guide URL | _pending Plausible_ |
| Top GSC query | _pending GSC_ |
| Top confusion category | none logged |
| Server proxy `/operations` vs `/docs` | W1: 3 vs 12 (~25%) · W2: 4 vs 13 (~31%) |
| P17 public change | **none** (Plausible W1+W2 required for nav) |
