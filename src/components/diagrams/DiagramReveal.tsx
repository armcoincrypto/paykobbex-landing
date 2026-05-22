import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** One-time in-view slide for diagrams; CSS-only (no Framer). */
export function DiagramReveal({
  children,
  className,
  /** Set false on inner pages to avoid repeated in-view motion (P12 propagation). */
  settle = true,
}: {
  children: ReactNode;
  className?: string;
  settle?: boolean;
}) {
  return (
    <div className={cn(className, settle && "diagram-reveal diagram-reveal--settle")}>
      {children}
    </div>
  );
}
