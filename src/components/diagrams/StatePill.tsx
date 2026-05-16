import { cn } from "@/lib/cn";

const styles = {
  Pending: "border-amber-400/35 bg-amber-500/10 text-amber-50",
  Paid: "border-accent/35 bg-accent/10 text-accent",
  Confirmed: "border-emerald-400/35 bg-emerald-500/10 text-emerald-50",
  Expired: "border-border-strong bg-surface text-muted",
} as const;

export type StatePillLabel = keyof typeof styles;

/** Lifecycle labels use exact product wording (conceptual, deployment-specific). */
export function StatePill({
  label,
  className,
}: {
  label: StatePillLabel;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-tight sm:text-xs",
        styles[label],
        className,
      )}
    >
      {label}
    </span>
  );
}
