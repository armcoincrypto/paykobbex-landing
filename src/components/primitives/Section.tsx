import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "muted";

const tones: Record<Tone, string> = {
  default: "bg-canvas",
  muted: "bg-surface",
};

/**
 * Page section — static layout only (P13: no scroll-reveal; avoids motion fatigue sitewide).
 */
export function Section({
  id,
  children,
  tone = "default",
  className,
}: {
  id?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-[var(--token-section-tight)] sm:py-[var(--token-section-default)] lg:py-[var(--token-section-loose)]",
        tones[tone],
        className,
      )}
    >
      {children}
    </section>
  );
}
