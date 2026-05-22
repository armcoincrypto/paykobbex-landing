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
        "ui-surface-card",
        interactive && "ui-surface-card--interactive",
        className,
      )}
      {...(interactive ? { tabIndex: 0 } : {})}
    >
      {children}
    </div>
  );
}
