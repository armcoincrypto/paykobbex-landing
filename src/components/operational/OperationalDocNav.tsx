"use client";

import { useEffect, useMemo, useState } from "react";
import { Link } from "@/components/primitives/link";
import { VerificationFramePanel } from "@/components/proof/VerificationFramePanel";
import { cn } from "@/lib/cn";

export type DocNavItem = { href: string; label: string };

function hashFromHref(href: string): string | null {
  const idx = href.indexOf("#");
  if (idx === -1) {
    return null;
  }
  const hash = href.slice(idx + 1);
  return hash.length > 0 ? hash : null;
}

/** Sticky documentation index with progressive active-section highlighting. */
export function OperationalDocNav({ items }: { items: DocNavItem[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const inPageItems = useMemo(
    () =>
      items
        .map((item) => ({ ...item, sectionId: hashFromHref(item.href) }))
        .filter((item) => item.sectionId && item.href.startsWith("/docs#")),
    [items],
  );

  useEffect(() => {
    const elements = inPageItems
      .map((item) => document.getElementById(item.sectionId!))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) {
      return;
    }

    const visible = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) {
            visible.set(id, entry.intersectionRatio);
          } else {
            visible.delete(id);
          }
        }

        if (visible.size === 0) {
          return;
        }

        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }

        if (bestId) {
          setActiveId(bestId);
        }
      },
      {
        root: null,
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0, 0.12, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, [inPageItems]);

  return (
    <VerificationFramePanel label="Documentation index" sublabel="On this page" className="ops-doc-nav">
      <nav aria-label="Documentation sections">
        <ul className="space-y-1.5 text-sm">
          {items.map((item) => {
            const sectionId = hashFromHref(item.href);
            const isActive = sectionId !== null && sectionId === activeId;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "block rounded-md px-2.5 py-2 no-underline decoration-transparent transition-[color,background-color] duration-[var(--token-motion-hover)] ease-[var(--token-ease-out)] motion-reduce:transition-none",
                    isActive
                      ? "bg-surface-elevated/90 font-medium text-primary ring-1 ring-inset ring-[var(--token-glass-highlight)]"
                      : "text-muted hover:bg-canvas/50 hover:text-primary hover:decoration-transparent",
                  )}
                  muted={!isActive}
                  aria-current={isActive ? "location" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </VerificationFramePanel>
  );
}
