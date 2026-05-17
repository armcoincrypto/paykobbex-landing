# Analytics (marketing site)

Privacy-first measurement for **pay.kobbex.com**. No ad-tech, no fingerprinting SDKs, and **no wallet addresses, chain payloads, API keys, webhook secrets, or private keys** in custom events or props.

## Production activation (Plausible)

Production builds use **Plausible** with domain **`pay.kobbex.com`**. Environment is set in **`.env.production`** (loaded automatically by `next build`; values are public `NEXT_PUBLIC_*` only).

### Exact environment variables

| Variable | Production value |
| --- | --- |
| `NEXT_PUBLIC_ANALYTICS_PROVIDER` | `plausible` |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | `pay.kobbex.com` |
| `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL` | `https://plausible.io/js/script.js` (override if self-hosting Plausible) |

Copy from **`.env.example`** for local experiments. To ship **without** analytics, set `NEXT_PUBLIC_ANALYTICS_PROVIDER=none` and rebuild (see rollback below).

### Alternative: Umami

- `NEXT_PUBLIC_ANALYTICS_PROVIDER=umami`
- `NEXT_PUBLIC_UMAMI_WEBSITE_ID=…`
- `NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://…/script.js`

Use **either** Plausible **or** Umami, not both (`AnalyticsRoot` loads one script path).

## Plausible goals (custom events)

Register these **exact names** as goals in the Plausible dashboard (site: `pay.kobbex.com`):

1. `request_access_click`
2. `docs_view`
3. `guides_view`
4. `operations_view` *(P15 — evidence collection)*
5. `onboarding_view` *(P15 — evidence collection)*
6. `contact_click`
7. `merchant_login_click`

| Goal | When it fires |
| --- | --- |
| `request_access_click` | User clicks a **Request access** CTA (`data-conv` on `Link`). |
| `docs_view` | User lands on `/docs` (once per browser tab session, `RouteIntentBeacon` + `sessionStorage`). |
| `guides_view` | User lands on `/guides` or a guide subpath (same de-dupe). |
| `operations_view` | User lands on `/operations` (same de-dupe). |
| `onboarding_view` | User lands on `/onboarding` (same de-dupe). |
| `contact_click` | User lands on `/contact` **or** clicks a mailto / email action with `data-conv`. |
| `merchant_login_click` | User clicks merchant portal / login (`data-conv`). |

Evidence review process: `docs/EVIDENCE_GUIDED_REFINEMENT.md`. Weekly export: `npm run evidence:weekly` (`docs/EVIDENCE_PIPELINE.md`).

Implementation: `src/lib/conversion-events.ts`, `src/components/analytics/AnalyticsRoot.tsx` (click delegation), `src/components/analytics/RouteIntentBeacon.tsx` (route intents), `src/lib/analytics-track.ts`.

## Verify live events

1. **Build** with production env (`npm run build` uses `.env.production`).
2. **Deploy** the `out/` directory to the static host.
3. In the browser, open **https://pay.kobbex.com/contact#merchant-intake** with devtools → Network: confirm a single request to **`plausible.io/js/script.js`** (or your self-hosted script URL).
4. In Plausible → **Realtime**, trigger: navigate to `/docs`, `/guides`, `/operations`, `/onboarding`, `/contact`, click **Request access** and a merchant login link.
5. Under **Goals** (or Events, depending on Plausible UI), confirm all seven names increment after a few minutes.

**HTML sanity check (single script):** there must be **only one** `<script>` tag pointing at the Plausible script URL in each page HTML. `AnalyticsRoot` is mounted once in `src/app/layout.tsx`.

```bash
# After static export: one preload hint to the Plausible script (Next.js + next/script).
grep -c 'plausible.io/js/script.js' out/contact.html   # expect: 1 (preload link in <head>)

# Executable script: a single next/script instance in `AnalyticsRoot` injects one
# <script src="https://plausible.io/js/script.js" ...> at runtime after hydration
# (deduped by src). Confirm in browser DevTools → Elements → search for plausible.io.
```

## What data must never be sent

- **Never** attach PII, wallet addresses, transaction hashes, API payloads, API keys, webhook secrets, private keys, or seed phrases to Plausible custom props (we only send event names + `surface: "marketing"` for Plausible where applicable).
- **Never** log form field contents to analytics; the merchant intake form is client-side **mailto** only.
- **Never** add third-party remarketing or identity-resolution pixels to this repo without a separate security + legal review.

## Rollback

1. Set `NEXT_PUBLIC_ANALYTICS_PROVIDER=none` in `.env.production` (or remove `.env.production` and build with no Plausible vars).
2. Rebuild: `npm run build`
3. Redeploy `out/`.

No server-side migration is required; analytics is entirely build-time for the static site.

## Explicit non-goals

- No fingerprinting SDKs.
- No remarketing pixels.
- No wallet / transaction / API body logging from the marketing frontend.
