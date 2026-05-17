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
        "rounded-lg border border-border-subtle/80 bg-surface-elevated p-6 sm:p-7 shadow-card",
        "transition-[box-shadow,border-color] duration-[var(--token-motion-base)] ease-[var(--token-ease-out)] motion-reduce:transition-none",
        interactive &&
          "motion-safe:hover:border-[rgb(148_163_184/0.22)] motion-safe:hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
