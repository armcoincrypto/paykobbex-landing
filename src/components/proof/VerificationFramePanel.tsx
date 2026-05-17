import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Verification Frame — signature enclosure for operational visuals.
 * Decorative; meaning is always duplicated in visible prose nearby.
 */
export function VerificationFramePanel({
  label,
  sublabel,
  children,
  className,
  labelledBy,
}: {
  label?: string;
  sublabel?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <div
      role={labelledBy ? "group" : undefined}
      aria-labelledby={labelledBy}
      className={cn("vf-frame", className)}
    >
      {(label || sublabel) && (
        <div className="vf-frame-rail" aria-hidden="true">
          {label ? (
            <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
              {label}
            </span>
          ) : null}
          {sublabel ? <span className="text-[10px] text-muted/80">{sublabel}</span> : null}
        </div>
      )}
      <div className="vf-frame-body">{children}</div>
      <span className="vf-frame-corner vf-frame-corner-tl" aria-hidden="true" />
      <span className="vf-frame-corner vf-frame-corner-tr" aria-hidden="true" />
      <span className="vf-frame-corner vf-frame-corner-bl" aria-hidden="true" />
      <span className="vf-frame-corner vf-frame-corner-br" aria-hidden="true" />
    </div>
  );
}
