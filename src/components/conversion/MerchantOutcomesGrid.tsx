import { Card } from "@/components/primitives/Card";
import { Link } from "@/components/primitives/link";

const outcomes = [
  {
    title: "Ship with explicit lifecycles",
    body: "Map Pending, Paid, and Confirmed to your commerce and finance controls — not a single ambiguous paid flag.",
    href: "/guides/payment-lifecycle",
    linkLabel: "Lifecycle guide",
  },
  {
    title: "Verify webhooks server-side",
    body: "Signed events on raw bytes, idempotent handlers, and replay-safe consumers — integration patterns your security team can review.",
    href: "/guides/webhook-verification",
    linkLabel: "Webhook verification",
  },
  {
    title: "Reconcile across three planes",
    body: "Commerce, provider, and finance alignment with exception queues — operational discipline finance teams expect.",
    href: "/guides/reconciliation-checklist",
    linkLabel: "Reconciliation checklist",
  },
  {
    title: "Onboard through reviewed enablement",
    body: "Merchant approval, selected rails, and scoped environments — structured access rather than anonymous production keys.",
    href: "/onboarding",
    linkLabel: "Onboarding expectations",
  },
] as const;

export function MerchantOutcomesGrid() {
  return (
    <ul className="conversion-outcomes grid gap-4 sm:grid-cols-2 lg:gap-5" role="list">
      {outcomes.map((item) => (
        <li key={item.title} role="listitem">
          <Card interactive className="conversion-outcomes__card h-full p-5 sm:p-6">
            <h3 className="text-h3 font-semibold text-primary">{item.title}</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted">{item.body}</p>
            <p className="mt-4 text-sm font-medium">
              <Link href={item.href}>{item.linkLabel} →</Link>
            </p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
