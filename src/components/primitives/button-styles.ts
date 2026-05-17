import { cn } from "@/lib/cn";

const interaction =
  "transition-[transform,box-shadow,border-color,background-color,color] duration-[var(--token-motion-hover)] ease-[var(--token-ease-out)] motion-reduce:transition-none";

export const buttonBase = cn(
  "inline-flex min-h-[2.75rem] items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
  interaction,
);

export const buttonPrimary = cn(
  "relative overflow-hidden border border-[rgb(147_197_253/0.18)]",
  "bg-gradient-to-b from-[#4a8af4] via-accent to-[#1d4ed8] text-inverse",
  "shadow-[inset_0_1px_0_0_rgb(255_255_255/0.14),0_8px_22px_-10px_rgb(37_99_235/0.38)]",
  "hover:from-[#528ef5] hover:via-[#3b82f6] hover:to-[#1e40af]",
  "hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.16),0_10px_26px_-10px_rgb(37_99_235/0.42)]",
  "active:translate-y-px motion-safe:active:brightness-[0.97]",
);

export const buttonSecondary = cn(
  "border border-border-subtle bg-surface-elevated text-primary shadow-elev-1",
  "hover:border-[rgb(148_163_184/0.28)] hover:bg-surface",
  "active:translate-y-px motion-safe:active:brightness-[0.98]",
);

export function buttonClass(variant: "primary" | "secondary" | "ghost") {
  if (variant === "primary") return cn(buttonBase, buttonPrimary);
  if (variant === "secondary") return cn(buttonBase, buttonSecondary);
  return cn(buttonBase, "text-primary hover:bg-surface-elevated/70");
}
