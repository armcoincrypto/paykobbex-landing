import { cn } from "@/lib/cn";

export function FlowArrow({
  direction = "right",
  className,
}: {
  direction?: "right" | "down";
  className?: string;
}) {
  const down = direction === "down";
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center text-accent/90",
        down ? "py-0.5" : "px-0.5",
        className,
      )}
      aria-hidden="true"
    >
      {down ? (
        <svg width="18" height="28" viewBox="0 0 18 28" fill="none" className="overflow-visible">
          <path
            d="M9 0V22M4 17L9 24L14 17"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg width="32" height="18" viewBox="0 0 32 18" fill="none" className="overflow-visible">
          <path
            d="M0 9H26M20 3L28 9L20 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
}
