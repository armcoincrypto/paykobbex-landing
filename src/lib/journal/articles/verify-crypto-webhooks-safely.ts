import type { JournalArticle } from "@/lib/journal/types";

export const verifyCryptoWebhooksSafely: JournalArticle = {
  slug: "verify-crypto-webhooks-safely",
  title: "How Merchants Should Verify Crypto Webhooks Safely",
  metaTitle: "Verify Crypto Webhooks Safely",
  metaDescription:
    "Webhook verification for crypto payment webhooks: raw-body HMAC validation, idempotency, and production handler discipline for merchant integrations.",
  category: "Webhooks & integration",
  hubSlug: "webhook-security",
  excerpt:
    "Crypto payment webhooks are control-plane traffic. Verify raw bytes before JSON, enforce idempotency, and never treat a 200 OK as durable settlement.",
  seoFocus: ["webhook verification", "crypto payment webhooks", "HMAC webhook validation"],
  keyTakeaways: [
    "Verify signatures on the exact raw request body received—before JSON parsing mutates bytes.",
    "Use constant-time comparison with equal-length buffers; reject missing or malformed signature headers early.",
    "Treat webhook delivery as at-least-once: idempotency keys and durable writes precede irreversible side effects.",
    "Separate verification middleware from business logic so security review has a narrow surface.",
    "Return 2xx only after your system can safely retry or deduplicate without double fulfillment.",
  ],
  internalLinks: [
    { href: "/guides/webhook-verification", label: "Webhook verification guide", reason: "Step-by-step integration expectations." },
    { href: "/docs", label: "Docs", reason: "Implementation references for server-side handlers." },
    { href: "/guides/server-side-api-keys", label: "Server-side API keys", reason: "Keep secrets off clients and browsers." },
    { href: "/security", label: "Security", reason: "Boundary expectations for reviewed merchants." },
  ],
  faq: [
    {
      question: "Should verification happen before or after JSON parsing?",
      answer: "Before. Parsing first can change whitespace or encoding assumptions. Compute HMAC on the raw body your framework received, using the documented algorithm and secret rotation plan.",
    },
    {
      question: "What if my framework parses JSON automatically?",
      answer: "Use a raw-body capture path for the webhook route, or framework hooks that preserve the original buffer. Document the approach in your integration spec so audits are repeatable.",
    },
    {
      question: "Is timestamp tolerance part of verification?",
      answer: "Many providers include timestamps to limit replay windows. Combine signature validation with clock-skew policy appropriate to your risk model—without substituting timestamps for HMAC.",
    },
    {
      question: "Does a verified webhook mean the payment is final?",
      answer: "It means the event authentically originated from your provider per shared secrets. Finality for fulfillment and accounting still follows your lifecycle and treasury policy.",
    },
  ],
  blocks: [
    {
      type: "p",
      text: "Crypto payment webhooks carry the events your systems use to mark invoices paid, release digital goods, or enqueue treasury workflows. They are also unauthenticated HTTP posts unless you make them otherwise. Merchants who verify crypto webhooks inconsistently—parsing JSON first, comparing signatures with string equality, or returning 200 before durable writes—build incidents that look like fraud but are often integration debt.",
    },
    {
      type: "p",
      text: "HMAC webhook validation is the baseline pattern: a shared secret known only to your servers and the provider, a MAC over the raw body, and a header or query parameter carrying the digest. Variations exist—timestamp prefixes, multiple secrets, versioned algorithms—but the invariant is the same: verify bytes before trusting JSON. Payment operators should treat webhook endpoints as production control planes with the same change management as database schema updates.",
    },
    {
      type: "p",
      text: "Webhook verification is not a checkbox on a security questionnaire. It is the control that binds an HTTP payload to a shared secret known only to your servers and the payment infrastructure. For B2B integrations, that discipline separates operational crypto systems from demo-grade callbacks that anyone can forge with curl.",
    },
    {
      type: "h2",
      id: "threat-model",
      text: "A practical threat model for payment webhooks",
    },
    {
      type: "p",
      text: "Assume your endpoint is public. Attackers can replay old bodies, craft plausible JSON, or flood handlers to exhaust workers. Insiders are not the primary threat on day one—opportunistic forgery and accidental double-processing are. Verification reduces forged events; idempotency and state machines reduce duplicate processing when the provider legitimately retries.",
    },
    {
      type: "h2",
      id: "raw-body",
      text: "HMAC webhook validation starts on raw bytes",
    },
    {
      type: "definition",
      term: "Webhook verification",
      text: "Proving callback authenticity over raw request bytes with server-side secret material—before any lifecycle or ledger mutation.",
    },
    {
      type: "p",
      text: "HMAC webhook validation must use the exact bytes received on the wire (or the exact buffer your edge preserved). Middleware that reformats JSON, strips whitespace, or re-encodes Unicode before verification will eventually disagree with the provider’s signer. Document the algorithm—commonly HMAC-SHA256 over the raw body with a server-side secret—and version it when rotating secrets.",
    },
    {
      type: "h3",
      id: "constant-time",
      text: "Compare signatures safely",
    },
    {
      type: "p",
      text: "Use constant-time comparison with equal-length digests. Reject missing headers, wrong prefixes, or hex/base64 mismatches without branching on byte differences in ways that leak timing information. Log verification failures with correlation IDs, not with secret material or full payloads in shared logging systems.",
    },
    {
      type: "h2",
      id: "handler-shape",
      text: "Handler shape that survives production",
    },
    {
      type: "ol",
      items: [
        "Authenticate the request (signature, optional timestamp skew check).",
        "Parse JSON only after verification succeeds.",
        "Map event type to lifecycle transition rules agreed with finance.",
        "Persist idempotency outcome before irreversible side effects.",
        "Return 2xx when safe to stop retries; otherwise use deliberate retry semantics.",
      ],
    },
    {
      type: "callout",
      title: "Common anti-pattern",
      text: "Returning 200 OK while work is still on an in-memory queue tells the provider you are done—then a process crash creates silent loss. Prefer durable enqueue with idempotent consumers.",
    },
    {
      type: "h2",
      id: "signature-formats",
      text: "Signature formats and secret rotation",
    },
    {
      type: "p",
      text: "Document whether signatures are hex, base64, or prefixed strings—and which headers carry them. Rotation should support overlapping secrets: verify with any active secret, retire old secrets on a published schedule. Emergency rotation runbooks belong next to deployment guides, not in a private wiki engineers cannot find during incidents.",
    },
    {
      type: "p",
      text: "Never log preimages or full HMAC outputs alongside payloads in shared tools. If debugging requires signature replay, use redacted fixtures in isolated environments. Compliance reviews increasingly ask for evidence that webhook secrets never appeared in client bundles or mobile builds—verify your CI guards that boundary.",
    },
    {
      type: "h2",
      id: "idempotency",
      text: "Idempotency is part of verification discipline",
    },
    {
      type: "p",
      text: "Providers retry on timeouts. Your handler will see duplicates even when signatures are perfect. Store event IDs or composite keys (payment ID + type + effective time bucket) in a datastore with a uniqueness constraint. Business logic should read idempotency state before shipping goods or posting ledger entries.",
    },
    {
      type: "h2",
      id: "separation",
      text: "Separate verification from business rules",
    },
    {
      type: "p",
      text: "Security review is faster when verification middleware is narrow: validate signature, attach authenticated context, pass to application code. Mixing treasury rules into the same function encourages shortcuts during incidents. Payment operators benefit when verification logs are searchable independently from fulfillment logs.",
    },
    {
      type: "h2",
      id: "fulfillment-gates",
      text: "Fulfillment gates after verification",
    },
    {
      type: "p",
      text: "Verification authenticates origin; it does not prove you should ship. Separate middleware that marks a request authenticated from services that evaluate business rules: amount tolerance, sanctions screening outcomes, or finance holds. Crypto payment webhooks that jump straight from verified to fulfilled are a common source of costly reversals.",
    },
    {
      type: "p",
      text: "Payment operators should define which events may trigger customer-visible side effects. A detected transfer might notify treasury but must not release high-value digital goods until Confirmed under documented policy. Encoding those rules in configuration makes audits repeatable.",
    },
    {
      type: "h2",
      id: "observability",
      text: "Observability without leaking secrets",
    },
    {
      type: "p",
      text: "Metrics: verification failures, latency to durable write, retry counts, stuck lifecycle states. Avoid logging full secrets, pre-images, or complete card-like payloads. For crypto payment webhooks, include rail, asset, and payment reference fields your finance team already uses—so support can trace a ticket without disabling controls.",
    },
    {
      type: "h2",
      id: "compliance",
      text: "Compliance-aware retention and access",
    },
    {
      type: "p",
      text: "Webhook logs can contain PII and payment references. Retention policies should align with legal and security requirements—avoid indefinite storage of raw bodies in unsecured buckets. Role-based access to replay tools prevents casual reprocessing of production events in development laptops.",
    },
    {
      type: "p",
      text: "For merchants under regulatory scrutiny, demonstrate that verification and idempotency controls are tested in CI and monitored in production. Auditors care less about algorithm names than about evidence that unauthorized payloads cannot change financial state.",
    },
    {
      type: "h2",
      id: "environments",
      text: "Sandbox versus production secrets",
    },
    {
      type: "p",
      text: "Rotate webhook secrets per environment. Never share production secrets with staging tools. CI fixtures should use synthetic keys. Merchant crypto processing maturity shows up in how cleanly environments are isolated when marketing demos borrow engineering credentials.",
    },
    {
      type: "h2",
      id: "routing",
      text: "Route isolation and framework pitfalls",
    },
    {
      type: "p",
      text: "Mount webhook endpoints on dedicated routes without shared JSON parsers that mutate bodies. In many frameworks, global middleware runs before your handler—document the order explicitly. Reverse proxies may buffer or decompress bodies; verification must use the bytes your application sees. Staging environments should replay captured payloads with known signatures to detect framework upgrades that silently break verification.",
    },
    {
      type: "p",
      text: "Avoid exposing webhook URLs on the same host as marketing sites without rate limits. Payment webhooks are high-value targets for noise attacks. Edge rate limiting, IP allowlists where feasible, and aggressive failure logging reduce operational drag without substituting for HMAC.",
    },
    {
      type: "h2",
      id: "lifecycle-mapping",
      text: "Mapping events to lifecycle without overloading handlers",
    },
    {
      type: "p",
      text: "Each verified event should translate to a named transition with preconditions: allowed source states, required fields, and side effects permitted. Keep transition tables in version control so changes are reviewed like schema migrations. When product requests a new shortcut state, finance should see the proposed mapping before code ships.",
    },
    {
      type: "h3",
      id: "out-of-order",
      text: "Out-of-order delivery",
    },
    {
      type: "p",
      text: "Networks and queues reorder events. A Confirmed callback may arrive before a Paid callback during incidents. Handlers must either buffer with ordering rules or no-op safely when prerequisites are missing—never crash-loop retries that exhaust provider retry budgets.",
    },
    {
      type: "h2",
      id: "testing",
      text: "Testing verification like production",
    },
    {
      type: "ol",
      items: [
        "Fixture tests with golden raw bodies and expected signature headers.",
        "Negative tests: tampered body, wrong secret, truncated signature, empty body.",
        "Load tests on idempotency store under duplicate delivery bursts.",
        "Chaos tests: database unavailable after verification—ensure non-2xx or queued retry behavior is intentional.",
      ],
    },
    {
      type: "h2",
      id: "vendor-evaluation",
      text: "Evaluating infrastructure webhook design",
    },
    {
      type: "p",
      text: "Ask providers how signatures are documented, how rotation works, and whether event catalogs map to explicit lifecycle states. Request sample payloads for every event type in sandbox, including failure and expiration paths—not only success.",
    },
    {
      type: "p",
      text: "Kobbopay’s public materials emphasize signed webhooks and server-side integration patterns—useful signals when comparing crypto payment infrastructure vendors, provided you validate details against your environment configuration rather than marketing summaries alone.",
    },
    {
      type: "p",
      text: "Webhook verification is the front door to your payment state machine. Treat it as control-plane code: narrow surface, explicit contracts, durable writes, and metrics that fail loudly when verification drifts. Merchants who verify crypto webhooks safely spend less time disputing whether a payment was real—and more time resolving genuine operational exceptions with finance-aligned evidence.",
    },
  ],
};
