import { cn } from "@/lib/cn";

export function CodePanel({
  title,
  code,
  className,
}: {
  title: string;
  code: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "overflow-hidden rounded-lg border border-border-subtle/90 bg-code-panel shadow-card ring-1 ring-inset ring-white/[0.03]",
        className,
      )}
    >
      <figcaption className="border-b border-border-subtle/80 bg-surface-elevated/40 px-4 py-2.5 text-xs font-medium tracking-wide text-muted">
        {title}
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-primary sm:text-sm">
        <code>{code.trimEnd()}</code>
      </pre>
    </figure>
  );
}
