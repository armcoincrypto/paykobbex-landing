# Deployment checklist — pay.kobbex.com (static export)

Use this before and after every production deploy of the marketing site (`paykobbex.com`). This repo is a **Next.js static export** only; it does not deploy application backends from here.

## 1. Verify locally

```bash
cd /opt/paykobbex-landing   # or your clone path
npm run verify
```

`verify` runs **lint**, **content claims** (`scripts/check-content-claims.mjs`), and **production build**. Fix failures before rsync.

## 2. Deploy static output

```bash
rsync -av --delete out/ /var/www/pay.kobbex.com/
```

- **`--delete`** removes files on the server that no longer exist in `out/` (avoid stale HTML).
- Adjust the destination path if your server layout differs.

## 3. Smoke checks (HTTP)

Run from anywhere with `curl`:

```bash
BASE=https://pay.kobbex.com

for p in / /docs /guides /glossary /security /contact /llms.txt; do
  echo "=== HEAD $p ==="
  curl -sI --max-time 15 "$BASE$p" | head -n 3
done
```

Expect **HTTP/2 200** (or **200** on HTTP/1.1) for each path. `/llms.txt` should report **`content-type: text/plain`**.

## 4. Sitemap and robots

```bash
curl -sS --max-time 15 https://pay.kobbex.com/sitemap.xml | head -40
curl -sS --max-time 15 https://pay.kobbex.com/robots.txt
```

Confirm:

- **`sitemap.xml`** lists key routes (home, docs, guides hub, guide pages, glossary, legal, etc.).
- **`robots.txt`** allows crawling and references the sitemap; optional comment points to **`/llms.txt`** for AI citation guidance.

## 5. Optional content grep (production tree)

If you keep a copy of `out/` after build:

```bash
grep -R "best payment gateway\|#1 crypto\|SOC 2 certified\|ISO 27001 certified\|instant payouts" -n out/ 2>/dev/null | head -20 || true
```

Investigate any unexpected hits (negated copy in HTML may still match; use judgment).

## 6. Rollback

If a deploy is bad, restore the previous `out/` artifact (or re-run rsync from a known-good backup):

```bash
rsync -av --delete /path/to/backup/out/ /var/www/pay.kobbex.com/
```

Or revert the offending git commit, then:

```bash
npm run verify && rsync -av --delete out/ /var/www/pay.kobbex.com/
```

## 7. Adding GitHub Actions later

This environment had **no `git remote` configured**, so a workflow file was **not** added automatically. When the project is pushed to GitHub, add `.github/workflows/verify.yml` with:

- `actions/checkout@v4`
- `actions/setup-node@v4` (Node 20 LTS or match your runtime)
- `npm ci`
- `npm run verify`

Paste the sample workflow from `docs/CONTENT_POLICY.md` companion notes or generate from the team template—keep the job idempotent and read-only (no deploy secrets in this repo unless you intentionally add them).
