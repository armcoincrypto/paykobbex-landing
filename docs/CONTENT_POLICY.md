# Content policy — Kobbopay marketing site (pay.kobbex.com)

This document governs **public marketing copy** in this repository: homepage, guides, glossary, docs overview, security narrative, and legal-adjacent pages. It exists so contributors ship **credible infrastructure positioning** without accidental compliance theater or SEO spam.

## Approved positioning

- **Product type:** API-first B2B crypto **payment infrastructure** (server-created payments, explicit lifecycles, signed webhooks, merchant operations).
- **Access model:** **Merchant approval** and environment setup before production-style access.
- **Rails:** **Selected rails** enabled **per environment** where available—not universal coverage.
- **Integration style:** **Server-to-server**; **API keys and webhook secrets stay on merchant infrastructure** (secret stores), not in browsers or client apps.
- **Operations:** Withdrawals are **merchant-initiated requests** subject to **controls and configuration**—not a promise of universal instant settlement.
- **Trust tone:** **Conservative and bounded**; prefer “depends on deployment / contract / environment” over absolutes.

## Forbidden claims (do not publish)

Do **not** state or imply on this marketing site:

- **SOC 2 Type II certified**, **ISO 27001 certified**, or other certifications unless you have an approved, citeable, maintained public proof path (generally: don’t claim here).
- **Licensed exchange**, **regulated as …**, **government approved** (unless literally true with legal review and a stable citation—default: don’t).
- **Audited platform** / “independently audited” without named scope, date, and public report linkage (default: don’t).
- **Guaranteed settlement**, **instant payouts everywhere**, **100% uptime**, **no risk**.
- **Rankings:** “#1”, “best crypto payment gateway”, “top 10 payment processors”, “65+ coins supported” (invented inventory/volume).
- **Fake social proof:** customer logos without permission, fabricated testimonials, fake metrics, “used by millions”.

The automated checker **`npm run check:claims`** enforces a **baseline denylist** of risky phrases; it uses a **negation window** so bounded sentences like “we do not promise instant payouts” remain allowed. Extend the script when new spam patterns appear.

## Bounded wording rules

- Prefer **“where enabled”**, **“for your deployment”**, **“after merchant approval”**, **“subject to configuration”**.
- Lifecycle language: use **Pending / Paid / Confirmed / Expired** consistently; never promise a universal state machine on the marketing site.
- Webhooks: **verify on raw bytes**, then parse; **retries are normal**—call out **idempotency**.
- Pricing: **no public fee grid** unless commercially approved for a segment; send readers to **Contact** / **Pricing** process copy.

## Anti-scam wording (required where relevant)

Whenever onboarding, support, or contact flows are discussed, include clear guidance:

- **Never** send **private keys**, **seed phrases**, **API keys**, or **webhook secrets** in email, chat, tickets, or “verification” forms.
- Legitimate teams **do not** need remote control of wallets to onboard merchants.

## SEO / AI-search writing rules

- **Answer-first:** short paragraphs; use **What / Why / How / Mistakes / Security** patterns on guides.
- **Stable anchors:** prefer linking to **`/glossary#term-id`** and **`/docs#...`** when definitions must be citeable.
- **Internal links:** connect guides ↔ docs ↔ security ↔ contact; avoid orphan pages.
- **No filler articles:** no generic crypto news, no coin price pages, no “AI slop” listicles.
- **`llms.txt`:** treat as the **non-authoritative** hint file for crawlers; canonical claims still live on HTML pages.

## Good vs bad copy (examples)

**Good**

- “Merchants initiate withdrawal requests; processing is subject to operational controls and configuration.”
- “Exact lifecycle enums depend on your approved deployment and enabled rails.”
- “Verify webhook signatures using the raw request body, then apply updates idempotently.”

**Bad**

- “SOC 2 certified crypto payment rail with instant global settlement.”
- “#1 B2B crypto gateway supporting 200+ assets with guaranteed finality.”
- “Bank-grade security audited by …” (unless you truly publish the audit pack and legal approves—default: don’t)

## Change process

1. Run **`npm run verify`** before merge/deploy.
2. If you add new marketing superlatives, update **`scripts/check-content-claims.mjs`** denylist when they are never acceptable—even negated—or tune negation rules with care.
3. Large IA changes: update **`public/sitemap.xml`**, **`public/llms.txt`** (if citation hubs move), and **`docs/DEPLOYMENT_CHECKLIST.md`**.

## Sample GitHub Actions workflow (add when a remote exists)

Save as `.github/workflows/verify.yml` after connecting GitHub:

```yaml
name: Verify

on:
  push:
    branches: [main, master]
  pull_request:

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"
      - run: npm ci
      - run: npm run verify
```

Adjust branch names and Node version to match your org standards.
