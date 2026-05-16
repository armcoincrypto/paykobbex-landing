import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function FlowStep({
  title,
  subtitle,
  className,
  children,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "min-w-[4.5rem] rounded-lg border border-border-strong/50 bg-canvas/70 px-2.5 py-2 text-center shadow-elev-1 sm:min-w-[5.75rem] sm:px-3 sm:py-2.5",
        className,
      )}
    >
      <p className="text-[10px] font-semibold tracking-tight text-primary sm:text-xs">{title}</p>
      {subtitle ? (
        <p className="mt-1 text-[9px] leading-snug text-muted sm:text-[10px]">{subtitle}</p>
      ) : null}
      {children}
    </div>
  );
}
