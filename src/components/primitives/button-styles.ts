import { cn } from "@/lib/cn";

export const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

export const buttonPrimary =
  "relative overflow-hidden border border-[rgb(147_197_253/0.22)] bg-gradient-to-b from-[#4d8df5] via-accent to-[#1d4ed8] text-inverse shadow-[inset_0_1px_0_0_rgb(255_255_255/0.16),0_10px_28px_-8px_rgb(37_99_235/0.42)] hover:from-[#5a96f7] hover:via-[#3b82f6] hover:to-[#1e40af] hover:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.2),0_14px_36px_-10px_rgb(37_99_235/0.48)] active:translate-y-px motion-safe:active:scale-[0.99]";

export const buttonSecondary =
  "border border-border-strong bg-surface-elevated text-primary shadow-elev-1 hover:border-[rgb(148_163_184/0.35)] hover:bg-surface hover:shadow-card active:translate-y-px motion-safe:active:scale-[0.99]";

export function buttonClass(variant: "primary" | "secondary" | "ghost") {
  if (variant === "primary") return cn(buttonBase, buttonPrimary);
  if (variant === "secondary") return cn(buttonBase, buttonSecondary);
  return cn(buttonBase, "text-primary hover:bg-surface-elevated/80");
}
