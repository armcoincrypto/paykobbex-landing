import NextLink from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/primitives/button-styles";
import type { ConversionEventName } from "@/lib/conversion-events";

const textBase =
  "underline decoration-[rgb(148_163_184/0.35)] underline-offset-[0.22em] transition-[color,text-decoration-color] duration-[var(--token-motion-hover)] ease-[var(--token-ease-out)] motion-safe:hover:text-accent motion-safe:hover:decoration-accent/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus focus-visible:ring-offset-[var(--token-focus-offset)] focus-visible:ring-offset-canvas rounded-sm motion-reduce:transition-none";

export type AppLinkProps = ComponentProps<typeof NextLink> & {
  muted?: boolean;
  variant?: "text" | "button-primary" | "button-secondary";
  /** Optional conversion label for privacy-safe analytics when enabled at build time. */
  conv?: ConversionEventName;
};

export function Link({
  className,
  muted,
  variant = "text",
  conv,
  ...props
}: AppLinkProps) {
  const variantClass =
    variant === "button-primary"
      ? buttonClass("primary")
      : variant === "button-secondary"
        ? buttonClass("secondary")
        : cn(
            textBase,
            muted ? "text-muted hover:text-primary" : "text-primary",
          );

  return (
    <NextLink
      className={cn(variantClass, className)}
      {...(conv ? { "data-conv": conv } : {})}
      {...props}
    />
  );
}
