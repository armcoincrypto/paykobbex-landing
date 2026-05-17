import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Docs / security section block — editorial rhythm with optional instrument slot. */
export function OperationalProseSection({
  id,
  title,
  tone = "default",
  children,
  instrument,
  className,
}: {
  id?: string;
  title: string;
  tone?: "default" | "muted";
  children: ReactNode;
  instrument?: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "ops-prose-section scroll-mt-24 py-10 sm:py-12 lg:py-14",
        tone === "muted" && "ops-prose-section-muted",
        className,
      )}
    >
      <div className="space-y-6">
        <h2 className="text-h2 font-semibold text-primary">{title}</h2>
        {instrument ? <div className="ops-section-instrument">{instrument}</div> : null}
        <div className="ops-prose space-y-6">{children}</div>
      </div>
    </section>
  );
}
