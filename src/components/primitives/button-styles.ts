import { cn } from "@/lib/cn";

const interaction =
  "transition-[transform,box-shadow,border-color,background-color,color] duration-[var(--token-motion-hover)] ease-[var(--token-ease-out)] motion-reduce:transition-none";

export const buttonBase = cn(
  "inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
  interaction,
);

export const buttonPrimary = cn(
  "border border-[rgb(var(--token-accent-rgb)/0.32)] bg-accent text-inverse",
  "shadow-[inset_0_1px_0_rgb(255_255_255/0.14),var(--token-shadow-1)]",
  "hover:border-[rgb(var(--token-accent-bright-rgb)/0.42)] hover:bg-accent-hover",
  "hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.16),0_10px_24px_-12px_rgb(var(--token-accent-rgb)/0.28)]",
  "active:translate-y-px motion-safe:active:brightness-[0.96]",
);

export const buttonSecondary = cn(
  "border border-[var(--token-glass-border)] bg-[var(--token-glass-bg)] text-primary shadow-card backdrop-blur-md",
  "hover:border-[rgb(var(--token-accent-rgb)/0.22)] hover:bg-surface-elevated/90",
  "active:translate-y-px motion-safe:active:brightness-[0.98]",
);

export function buttonClass(variant: "primary" | "secondary" | "ghost") {
  if (variant === "primary") return cn(buttonBase, buttonPrimary);
  if (variant === "secondary") return cn(buttonBase, buttonSecondary);
  return cn(buttonBase, "text-primary hover:bg-surface-elevated/70");
}
