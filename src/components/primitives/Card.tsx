import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  children,
  className,
  interactive = false,
}: {
  children: ReactNode;
  className?: string;
  /** Subtle lift on hover (respects motion-safe). */
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border-subtle/90 bg-surface-elevated p-6 sm:p-7 shadow-card transition-[box-shadow,border-color,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        interactive &&
          "motion-safe:hover:-translate-y-px hover:border-border-strong hover:shadow-card-hover",
        className,
      )}
    >
      {children}
    </div>
  );
}
