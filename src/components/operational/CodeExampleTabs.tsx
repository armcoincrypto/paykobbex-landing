"use client";

import { useId, useState } from "react";
import { CodePanel } from "@/components/primitives/CodePanel";
import { cn } from "@/lib/cn";

export type CodeExampleTabId = "curl" | "node" | "checklist";

export type CodeExampleTab = {
  id: CodeExampleTabId;
  label: string;
  /** Shown when id is curl or node */
  code?: string;
  /** Shown when id is checklist */
  checklist?: string[];
};

export function CodeExampleTabs({
  tabs,
  defaultTab = "curl",
  className,
}: {
  tabs: CodeExampleTab[];
  defaultTab?: CodeExampleTabId;
  className?: string;
}) {
  const baseId = useId();
  const initial = tabs.some((t) => t.id === defaultTab) ? defaultTab : tabs[0]?.id ?? "curl";
  const [active, setActive] = useState<CodeExampleTabId>(initial);
  const activeTab = tabs.find((t) => t.id === active) ?? tabs[0];

  if (!activeTab) {
    return null;
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div
        role="tablist"
        aria-label="Example format"
        className="flex flex-wrap gap-1.5 border-b border-border-subtle/80 pb-2"
      >
        {tabs.map((tab) => {
          const selected = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              onKeyDown={(e) => {
                const idx = tabs.findIndex((t) => t.id === tab.id);
                if (e.key === "ArrowRight") {
                  e.preventDefault();
                  setActive(tabs[(idx + 1) % tabs.length]!.id);
                }
                if (e.key === "ArrowLeft") {
                  e.preventDefault();
                  setActive(tabs[(idx - 1 + tabs.length) % tabs.length]!.id);
                }
              }}
              className={cn(
                "min-h-10 rounded-md px-3 py-2 text-xs font-medium transition-[color,background-color,box-shadow] duration-[var(--token-motion-hover)] ease-[var(--token-ease-out)] motion-reduce:transition-none",
                selected
                  ? "bg-surface-elevated/90 text-primary shadow-elev-1 ring-1 ring-inset ring-[var(--token-glass-highlight)]"
                  : "text-muted hover:bg-canvas/60 hover:text-primary",
              )}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${activeTab.id}`}
        aria-labelledby={`${baseId}-tab-${activeTab.id}`}
        className="motion-safe:transition-opacity motion-safe:duration-[var(--token-motion-fast)] motion-reduce:transition-none"
      >
        {activeTab.id === "checklist" && activeTab.checklist ? (
          <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted">
            {activeTab.checklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : activeTab.code ? (
          <CodePanel title="" code={activeTab.code} />
        ) : null}
      </div>
    </div>
  );
}
