import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Shared editorial page header — consistent eyebrow, title, lead rhythm. */
export function OperationalPageHeader({
  eyebrow,
  title,
  lead,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  lead: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("ops-page-header", className)}>
      <p className="ops-eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-display font-semibold tracking-[-0.02em] text-primary">{title}</h1>
      <p className="mt-4 max-w-2xl text-body leading-[1.65] text-muted">{lead}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </header>
  );
}
