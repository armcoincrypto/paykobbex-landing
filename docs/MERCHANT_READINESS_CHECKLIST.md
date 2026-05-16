# Merchant readiness checklist (internal)

Use this before announcing a merchant as “integration-complete” or expanding production scope.

## Documentation

- [ ] Merchant has the **integration overview** (`/docs`) and relevant **guides** for their flow.
- [ ] **Onboarding expectations** (`/onboarding`) were shared when helpful for stakeholder alignment.
- [ ] **Security page** reviewed if the merchant runs vendor questionnaires.

## Security review readiness

- [ ] **No secrets in email** policy acknowledged (API keys, webhook secrets, keys, seeds).
- [ ] **Webhook verification** approach understood (raw body, signature contract).
- [ ] **Key custody** confirmed as merchant-side only for API usage patterns described on the marketing site.

## Webhook readiness

- [ ] **HTTPS endpoint** ready with stable TLS.
- [ ] **Idempotent** handler design agreed (stable payment identifiers).
- [ ] **Retry strategy** understood (backoff, dead-letter handling).

## Onboarding response readiness

- [ ] Intake mailbox or CRM queue **monitored** with ownership.
- [ ] Internal **SLA** for first response documented (even if not public).
- [ ] **Decline / defer** templates prepared to reduce ambiguous back-and-forth.

## Support process

- [ ] **Support channel** defined for approved merchants (email, ticket, or chat).
- [ ] **Scope boundaries** documented (integration vs custody vs chain issues).
- [ ] **Phishing** guidance shared (no “verify wallet” links).

## Analytics visibility

- [ ] **Privacy-safe analytics** configured (`docs/ANALYTICS.md`) for funnel visibility: `request_access_click`, `docs_view`, `guides_view`, `contact_click`, `merchant_login_click`.
- [ ] Team knows these events are **intent signals**, not revenue attribution.

## Uptime expectations

- [ ] **No public SLA** promised from the marketing site unless commercially approved.
- [ ] **Status / incident** communications path agreed for production merchants.

## Escalation contacts

- [ ] **Engineering escalation** for integration defects (name + channel).
- [ ] **Risk / compliance escalation** for suspected fraud or sanctions hits.
- [ ] **Executive / partnerships** path for commercial exceptions (only if applicable).
