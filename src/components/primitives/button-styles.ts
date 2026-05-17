import { cn } from "@/lib/cn";

const interaction =
  "transition-[transform,box-shadow,border-color,background-color,color] duration-[var(--token-motion-hover)] ease-[var(--token-ease-out)] motion-reduce:transition-none";

export const buttonBase = cn(
  "inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium tracking-[-0.01em]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-[var(--token-focus-offset)] focus-visible:ring-offset-canvas",
  interaction,
);

export const buttonPrimary = cn(
  "border border-[rgb(var(--token-accent-rgb)/0.36)] bg-accent text-inverse",
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.16),var(--token-shadow-1)]",
  "motion-safe:hover:border-[rgb(var(--token-accent-bright-rgb)/0.48)] motion-safe:hover:bg-accent-hover",
  "motion-safe:hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.18),0_12px_28px_-14px_rgb(var(--token-accent-rgb)/0.32)]",
  "motion-safe:active:translate-y-px motion-safe:active:brightness-[0.96]",
);

export const buttonSecondary = cn(
  "border border-[var(--token-glass-border)] bg-[var(--token-glass-bg)] text-primary shadow-card backdrop-blur-md",
  "ring-1 ring-inset ring-[var(--token-glass-highlight)]",
  "motion-safe:hover:border-[rgb(var(--token-accent-rgb)/0.24)] motion-safe:hover:bg-surface-elevated/92",
  "motion-safe:active:translate-y-px motion-safe:active:brightness-[0.98]",
);

export function buttonClass(variant: "primary" | "secondary" | "ghost") {
  if (variant === "primary") return cn(buttonBase, buttonPrimary);
  if (variant === "secondary") return cn(buttonBase, buttonSecondary);
  return cn(buttonBase, "text-primary hover:bg-surface-elevated/70");
}
