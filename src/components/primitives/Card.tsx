import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  /** Subtle border/shadow shift on hover — no lift (P13). */
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[var(--token-glass-border)] bg-[var(--token-glass-bg)] p-[var(--ui-pad-card)] shadow-card backdrop-blur-md sm:p-8",
        "ring-1 ring-inset ring-[var(--token-glass-highlight)]",
        "transition-[box-shadow,border-color,background-color] duration-[var(--token-motion-base)] ease-[var(--token-ease-out)] motion-reduce:transition-none",
        interactive &&
          "motion-safe:hover:border-[rgb(var(--token-accent-rgb)/0.22)] motion-safe:hover:bg-surface-elevated/88 motion-safe:hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-[var(--token-focus-offset)] focus-visible:ring-offset-canvas",
        className,
      )}
      {...(interactive ? { tabIndex: 0 } : {})}
    >
      {children}
    </div>
  );
}
