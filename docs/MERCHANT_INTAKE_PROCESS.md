# Merchant intake process (internal)

Operational runbook for moving a prospect from first touch to an approved merchant account. This document is **not** legal advice and does not replace your commercial agreements or risk policy.

## 1. Inquiry intake

- **Sources**: Structured email from the marketing site mailto template, direct email to the monitored intake mailbox, or (if adopted later) a CRM form.
- **Minimum fields**: Company or project, website, use case, rough volume, required rails, technical contact, Telegram or email for follow-up.
- **Never collect via email**: Private keys, seed phrases, API keys, webhook secrets, wallet export files, or “screenshots for verification” that expose credentials.
- **Triage SLA**: Define an internal first-response target (for example business days); publish only what you can keep on the marketing site.

## 2. Qualification

- Confirm **B2B server-to-server** fit versus unsupported consumer-wallet flows.
- Map **geography and product model** to your risk appetite (high-risk categories, sanctions, and local law remain merchant responsibilities).
- Validate **rails ask** against what can be enabled per environment; flag unsupported combinations early.

## 3. Risk review

- **Business risk**: Chargeback-like disputes, refund policy, counterparties, and source-of-funds posture at a high level.
- **Operational risk**: Whether the merchant can plausibly operate webhook verification, secret handling, and reconciliation discipline.
- **Fraud / abuse**: Velocity, collusion patterns, and incentive misalignment (marketplaces, resellers, high-risk verticals).
- **Decision**: Approve, approve with scope limits, defer pending information, or decline. Document rationale for auditability.

## 4. Technical review

- **Integration surface**: Payment creation, lifecycle reads, idempotency, and webhook consumer design.
- **Security posture**: No browser-held API keys; raw-body webhook verification; secret rotation story.
- **Observability**: Logging without sensitive payloads; alerting on webhook failures.

## 5. Onboarding

- Issue or confirm **non-production access** first when your program uses staged environments.
- Share **environment-specific** hosts, headers, and test expectations only after approval alignment.
- Align on **rail enablement** and what remains unsupported.

## 6. Integration support

- Time-box **office hours** or async channels; escalate integration bugs separately from account servicing.
- Reinforce **no-secret** policy in every thread (phishing resistance).

## 7. Approval / rejection flow

- **Approved**: Communicate scope of rails, environments, and next operational steps (keys, webhooks, go-live checklist).
- **Deferred**: List missing artifacts or decisions; set a follow-up date.
- **Rejected**: Provide a concise, non-defamatory reason where policy allows; avoid debate in unsecured channels.

## 8. Handoff to operations

- Confirm **merchant readiness checklist** items (see `MERCHANT_READINESS_CHECKLIST.md`) before marketing “live” status internally.
- Ensure **escalation contacts** and on-call ownership are visible to the merchant for production-impacting incidents.
