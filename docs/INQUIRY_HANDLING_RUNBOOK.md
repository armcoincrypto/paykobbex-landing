# Inquiry handling runbook (internal)

How the team handles merchant and integration inquiries that arrive via **hello@kobbex.com** (or your configured `CONTACT_EMAIL`) from the marketing site mailto template and related channels.

## 1. Inbox tagging

Use consistent labels or folders so weekly funnel review is possible:

| Tag / folder | Meaning |
| --- | --- |
| `lead-new` | First touch; not yet triaged |
| `lead-triaged` | Fit/volume/rails sanity-checked |
| `lead-qualified` | Ready for risk or technical follow-up |
| `lead-waiting-on-them` | We asked questions; pending merchant reply |
| `lead-approved` | Approved path started (environment / contract as applicable) |
| `lead-declined` | Final no (or not a fit right now) |
| `lead-spam` | Obvious abuse / irrelevant |

**Subject line:** marketing mailto uses `Kobbopay — merchant access inquiry`. Filter on that string plus your domain for priority routing.

## 2. Response SLA target (internal)

Set a **first human acknowledgment** target your team can keep (for example **2 business days** for `lead-new`). Do not publish a public SLA on the marketing site unless commercially approved.

If you miss the target, still reply with a short status note rather than going silent.

## 3. Qualification questions (first pass)

Ask only what you need for fit — never secrets:

- What are they selling / who pays whom?
- Countries and counterparties (high level).
- Expected monthly volume band and largest typical ticket.
- Required rails (chains/assets) and whether they need non-custodial payer flows only.
- Engineering owner and preferred follow-up channel (already in template).
- Whether they already have PCI / fraud / sanctions workflows (if relevant).

## 4. Approval language (templates)

**Defer / more info**

> Thanks for the detail on [X]. Before we can scope rails or environments, we need [Y]. Reply on-thread when you have it — please do not send API keys, webhook secrets, private keys, or seed phrases.

**Decline (polite, non-defamatory)**

> Thanks for your interest in Kobbopay. Based on [high-level reason: geography / model / rails / capacity], we are not able to move forward right now. If your situation changes materially, you are welcome to reach out again with an updated summary.

**Approve (scoped)**

> Thanks — we can proceed toward onboarding for [scope]. Next steps: [concrete actions]. Reminder: keep API keys and webhook secrets on your servers only; we will not ask you to paste them in email.

## 5. Rejection language

Mirror **decline** above. Avoid arguing in email threads; offer one clarification round if the decline was based on a misunderstanding.

## 6. What never to request

Never ask the prospect to send:

- Private keys, seed phrases, or wallet recovery material  
- API keys, webhook signing secrets, or raw HMAC keys  
- Session cookies, MFA codes, or “screenshots of your dashboard” that expose secrets  
- Remote desktop access to wallets or merchant machines  

If integration debugging needs secrets, use approved secure channels and processes **outside** cold email.

## 7. When to escalate

| Signal | Escalate to |
| --- | --- |
| Suspected phishing / impersonation | Security / fraud lead |
| Sanctions, PEP, or high-risk jurisdiction questions | Compliance / legal per policy |
| Deep webhook or signing contract ambiguity | Engineering integration owner |
| Production outage or incident reports | On-call / incident channel (not the marketing inbox) |

## 8. Manual lead status (no CRM yet)

Minimum tracking in a spreadsheet or shared doc:

- Date received  
- Company / website / contact channel  
- Tag (see above)  
- Owner  
- Next action + date  
- Outcome  

Sync with **Plausible** goals weekly (`docs/WEEKLY_FUNNEL_REVIEW.md`) to see top-of-funnel vs replies.
