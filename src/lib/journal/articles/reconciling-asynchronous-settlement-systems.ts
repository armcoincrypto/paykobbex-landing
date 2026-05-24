import type { JournalArticle } from "@/lib/journal/types";

export const reconcilingAsynchronousSettlementSystems: JournalArticle = {
  slug: "reconciling-asynchronous-settlement-systems",
  title: "Reconciling Asynchronous Settlement Systems",
  metaTitle: "Reconciling Asynchronous Settlement Systems",
  metaDescription:
    "How to reconcile crypto payments when detection, confirmation, and treasury posting occur on different clocks—intermediate states, timing skew, and finance holds.",
  category: "Reconciliation & operations",
  hubSlug: "reconciliation",
  excerpt:
    "Async settlement is normal. Reconciliation breaks when intermediate states are invisible or when teams pretend one paid flag means everything is final.",
  seoFocus: ["asynchronous settlement reconciliation", "crypto payment timing", "three-plane reconciliation"],
  keyTakeaways: [
    "Model async settlement with explicit intermediate states on provider and finance planes.",
    "Timing-skew exceptions are expected—not a sign the integration is broken.",
    "Commerce fulfillment policy may diverge from treasury posting policy when documented.",
    "Matchers need time windows—not instant equality between planes.",
    "Period close must treat async week as first-class, not edge case.",
  ],
  internalLinks: [
    { href: "/references/asynchronous-settlement-lifecycle", label: "Async settlement lifecycle model", reason: "Reference model." },
    { href: "/playbooks/delayed-settlement-recovery", label: "Delayed settlement recovery", reason: "Operator workflow." },
  ],
  faq: [
    {
      question: "Should Paid mean books-ready?",
      answer: "Only if finance policy explicitly says so. Many merchants allow Paid for low-risk signals while treasury waits for Confirmed and reconciliation matchers.",
    },
    {
      question: "How do matchers handle delays?",
      answer: "Use time-bounded windows and timing-skew exception classes rather than failing hard immediately on first mismatch.",
    },
    {
      question: "What about customer refunds during delay?",
      answer: "Refund policy should reference lifecycle state and exception ownership—avoid refunds that contradict later Confirmed events without investigation.",
    },
    {
      question: "Does Kobbopay guarantee confirmation times?",
      answer: "No. Public materials describe lifecycle semantics bounded to configured rails—timing remains environment and policy specific.",
    },
  ],
  blocks: [
    {
      type: "p",
      text: "Asynchronous settlement separates detection, policy confirmation, and treasury recognition in time. Reconciliation systems that only compare end states will misclassify healthy delays as errors—and healthy errors as matched payments.",
    },
    {
      type: "definition",
      term: "Asynchronous settlement",
      text: "Settlement outcomes that complete after initial detection—requiring intermediate lifecycle truth rather than a single paid flag.",
    },
    {
      type: "h2",
      id: "intermediate",
      text: "Represent intermediate truth",
    },
    {
      type: "p",
      text: "Provider plane should expose states finance recognizes: detected, policy-pending, confirmed, failed, expired. Finance plane should expose unrecognized, recognized, posted, held. Commerce should not claim fulfilled-at-paid unless policy allows.",
    },
    {
      type: "h2",
      id: "timing-skew",
      text: "Timing-skew as a first-class exception",
    },
    {
      type: "p",
      text: "When Confirmed arrives before Paid during incidents, handlers must no-op safely. When Paid sits without Confirmed beyond threshold, open timing-skew—not silent support overrides.",
    },
    {
      type: "h2",
      id: "close",
      text: "Closing periods with async volume",
    },
    {
      type: "p",
      text: "Month-end close should include aging analysis on intermediate states. Carry forward timing-skew with evidence rather than forcing match to hit an arbitrary deadline.",
    },
  ],
};
