import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Decorative SVG container + visible caption (meaning is duplicated in surrounding prose). */
export function DiagramFrame({
  caption,
  className,
  /** Optional id of a visible heading (e.g. section `h2`) for `aria-labelledby` + `role="group"`. */
  labelledBy,
  children,
}: {
  caption: string;
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <figure
      role={labelledBy ? "group" : undefined}
      aria-labelledby={labelledBy}
      className={cn(
        "rounded-xl border border-border-subtle/90 bg-surface-elevated/50 p-4 shadow-card ring-1 ring-inset ring-white/[0.04] sm:p-6",
        className,
      )}
    >
      <div aria-hidden="true">{children}</div>
      <figcaption className="mt-4 text-center text-xs leading-relaxed text-muted sm:text-sm">
        {caption}
      </figcaption>
    </figure>
  );
}
