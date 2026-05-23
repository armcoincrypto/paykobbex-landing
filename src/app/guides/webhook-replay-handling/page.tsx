import { Link } from "@/components/primitives/link";
import { GuideRelatedLinks } from "@/components/guides/GuideRelatedLinks";
import { ProductionRealityNote } from "@/components/realism";
import { GuideSection } from "@/components/guides/GuideSection";
import { GuideLayout } from "@/components/operational/GuideLayout";
import { JsonLd } from "@/components/seo/JsonLd";
import { guideBreadcrumbJsonLd, guideMetadata } from "@/lib/guides-meta";

export const metadata = guideMetadata("webhook-replay-handling");

export default function GuideWebhookReplayHandlingPage() {
  return (
    <>
      <JsonLd
        id="ld-json-guide-webhook-replay-bc"
        data={guideBreadcrumbJsonLd("webhook-replay-handling", "Webhook replay handling")}
      />

      <GuideLayout
        slug="webhook-replay-handling"
        title="Webhook replay and ordering"
        lead={
          <>
            At-least-once delivery is normal. This guide covers replay windows, duplicate suppression,
            and ordering—after raw-body verification succeeds.
          </>
        }
        definitions={
          <p className="text-sm text-muted">
            Definitions: <Link href="/glossary#replay-protection">Replay protection</Link> ·{" "}
            <Link href="/glossary#idempotent-processing">Idempotent processing</Link> ·{" "}
            <Link href="/glossary#webhook-replay-window">Webhook replay window</Link>
          </p>
        }
      >
        <GuideSection id="worked-example" title="Illustrative verification walkthrough" index="01">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            The following is a structural example—not a live API contract. Replace header names,
            algorithms, and event ids with your environment documentation.
          </p>
          <pre className="mt-4 overflow-x-auto rounded-lg border border-border/60 bg-surface-muted/40 p-4 font-mono text-xs leading-relaxed text-primary">
{`// 1. Read raw body bytes before JSON parsing
const rawBody = await readRawBody(request)

// 2. Verify signature (algorithm per your docs)
const expected = hmacSha256(WEBHOOK_SECRET, rawBody)
if (!timingSafeEqual(expected, headerSignature)) {
  return Response.json({ error: "invalid_signature" }, { status: 401 })
}

// 3. Optional replay window on provider timestamp
if (Math.abs(now - eventTimestamp) > REPLAY_WINDOW_MS) {
  return Response.json({ error: "stale_event" }, { status: 400 })
}

// 4. Idempotency: provider event id + type
const key = \`\${payload.event_id}:\${payload.type}\`
if (await store.alreadyApplied(key)) {
  return Response.json({ ok: true, duplicate: true }, { status: 200 })
}

// 5. Parse JSON and apply lifecycle transition rules
const event = JSON.parse(rawBody)
await applyTransition(event)
await store.markApplied(key)
return Response.json({ ok: true }, { status: 200 })`}
          </pre>
          <p className="mt-3 text-xs text-muted">
            Never ship webhook secrets to clients. Validate exact signing rules against your merchant
            environment—not this illustration alone.
          </p>
        </GuideSection>

        <GuideSection id="ordering" title="Out-of-order delivery" index="02">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Transition tables should no-op or buffer when prerequisites are missing—Confirmed before
            Paid should not crash-loop provider retries. Document which events are terminal per
            payment_id.
          </p>
        </GuideSection>

        <GuideSection id="retries" title="Provider retry semantics" index="03">
          <p className="text-sm leading-relaxed text-muted sm:text-body">
            Return 2xx only when work is durable or safely skipped as duplicate. Timeouts cause retries;
            ambiguous 5xx responses can amplify load during incidents.
          </p>
          <p className="text-sm text-muted">
            Read: <Link href="/guides/webhook-verification">Webhook verification guide</Link>,{" "}
            <Link href="/blog/webhook-replay-ordering-controls">Replay and ordering controls</Link>.
          </p>
        </GuideSection>

        <ProductionRealityNote compact />
        <GuideRelatedLinks />
      </GuideLayout>
    </>
  );
}
