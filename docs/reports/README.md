# Evidence reports (generated)

This folder receives **read-only** weekly exports from:

```bash
npm run evidence:weekly
```

## Files

| Pattern | Description |
| --- | --- |
| `plausible-weekly-YYYY-MM-DD.json` | Plausible Stats API export |
| `plausible-summary-YYYY-MM-DD.md` | Human summary |
| `gsc-weekly-YYYY-MM-DD.json` | Search Console export |
| `gsc-summary-YYYY-MM-DD.md` | Human summary |
| `weekly-evidence-YYYY-MM-DD.*` | Rollup + P21 readiness |

Generated artifacts are **gitignored** (business metrics). Store copies in your internal drive if the team needs history.

## Setup

See `docs/EVIDENCE_PIPELINE.md` — credentials live in `.env.local` only.
