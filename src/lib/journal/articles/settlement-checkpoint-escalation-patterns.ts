import type { JournalArticle } from "@/lib/journal/types";

export const settlementCheckpointEscalationPatterns: JournalArticle = {
  slug: "settlement-checkpoint-escalation-patterns",
  title: "Settlement Checkpoint Escalation Patterns",
  metaTitle: "Settlement Checkpoint Escalation Patterns",
  metaDescription:
    "Escalation patterns when crypto payments fail settlement checkpoints—human review gates, finance holds, and provider ambiguity without informal overrides.",
  category: "Settlement & confirmations",
  hubSlug: "settlement-operations",
  excerpt:
    "Checkpoints fail loudly or they fail silently. Escalation patterns define who decides, what evidence they need, and which transitions remain forbidden.",
  seoFocus: ["settlement checkpoint", "payment escalation workflow", "operational finality"],
  keyTakeaways: [
    "Each checkpoint should have a named owner and forbidden bypass list.",
    "Escalation is not failure—it is how policy handles ambiguity.",
    "Dual control belongs at treasury and high-materiality confirmation gates.",
    "Engineering escalations differ from finance escalations—keep runbooks separate.",
    "Post-escalation transitions must still emit provider-plane evidence where possible.",
  ],
  internalLinks: [
    { href: "/references/settlement-checkpoint-model", label: "Settlement checkpoint model", reason: "Checkpoint types." },
    { href: "/playbooks/confirmation-policy-escalation", label: "Confirmation escalation playbook", reason: "Procedure." },
  ],
  faq: [
    {
      question: "When should checkpoints block fulfillment?",
      answer: "When policy says high-risk SKUs or amounts require Confirmed or finance reconciliation before customer-visible completion—document per SKU tier.",
    },
    {
      question: "Can support bypass a checkpoint?",
      answer: "Only through documented escalation with audit metadata—not ad hoc UI overrides without payment_id references.",
    },
    {
      question: "How do checkpoints relate to webhooks?",
      answer: "Verified events trigger checkpoint evaluation; checkpoints decide whether business rules may mutate commerce or finance planes.",
    },
    {
      question: "Does Kobbopay enforce checkpoints for merchants?",
      answer: "Public materials describe lifecycle semantics and operational discipline; checkpoint enforcement remains merchant-configured.",
    },
  ],
  blocks: [
    {
      type: "p",
      text: "Settlement checkpoints translate policy into system gates. When a payment cannot pass a gate automatically, escalation patterns prevent two failure modes: paralysis (nothing moves) and silent bypass (everything moves without audit).",
    },
    {
      type: "h2",
      id: "patterns",
      text: "Common escalation patterns",
    },
    {
      type: "ol",
      items: [
        "Amount tier escalation — auto below threshold, human review above.",
        "Reference ambiguity escalation — missing or corrupted memos route to support with commerce context.",
        "Rail instability escalation — freeze auto-posting, manual verification for affected window.",
        "Finance hold escalation — Confirmed allowed, treasury posting blocked pending reconciliation.",
        "Policy exception escalation — controller approval with time-bounded override.",
      ],
    },
    {
      type: "h2",
      id: "evidence",
      text: "Evidence required at escalation",
    },
    {
      type: "p",
      text: "Escalation without payment_id, rail context, and current lifecycle state recreates drift. Require structured notes and resolution codes aligned to exception taxonomy.",
    },
    {
      type: "callout",
      title: "Anti-pattern",
      text: "Confirming in chat while provider plane remains Paid—finance and support see different truth.",
    },
    {
      type: "h2",
      id: "recovery",
      text: "After escalation resolves",
    },
    {
      type: "p",
      text: "Apply transitions through normal provider flows when possible so webhooks and audit logs align. If manual correction is unavoidable, backfill provider plane reads and document matcher re-runs.",
    },
  ],
};
