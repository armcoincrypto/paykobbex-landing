import { cn } from "@/lib/cn";

/**
 * Kobbopay monogram — bold K intersecting a settlement corridor inside a control boundary.
 * Filled silhouette for 26–30px legibility; inline SVG only.
 */
export function BrandMark({
  className,
  size = 30,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("brand-mark", className)}
      aria-hidden="true"
    >
      <rect className="brand-mark__plate" x="1.5" y="1.5" width="29" height="29" rx="8" />
      <rect className="brand-mark__corridor" x="4" y="13.5" width="24" height="4" rx="1.2" />
      <path
        className="brand-mark__k"
        d="M10 6.75h3.75v7.35l8.85-7.35h4.15l-8.55 7.05 9.35 9.85H16.1l-8.35-7.75v7.75H10V6.75z"
      />
    </svg>
  );
}
