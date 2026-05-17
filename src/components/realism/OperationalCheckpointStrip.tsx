import { cn } from "@/lib/cn";

/** Horizontal checkpoint strip — procedural sequencing without metrics. */
export function OperationalCheckpointStrip({
  checkpoints,
  className,
}: {
  checkpoints: string[];
  className?: string;
}) {
  return (
    <ol
      className={cn(
        "flex flex-wrap gap-2 list-none p-0 m-0",
        className,
      )}
      aria-hidden="true"
    >
      {checkpoints.map((label, i) => (
        <li key={label} className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-accent/70">{String(i + 1).padStart(2, "0")}</span>
          <span className="rounded-md border border-border-subtle/90 bg-canvas/50 px-2 py-1 text-[10px] font-medium text-primary">
            {label}
          </span>
          {i < checkpoints.length - 1 ? (
            <span className="hidden text-muted/50 sm:inline" aria-hidden="true">
              →
            </span>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
