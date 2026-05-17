import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Semantic section for educational guides — editorial operational rhythm. */
export function GuideSection({
  id,
  title,
  index,
  children,
  className,
}: {
  id: string;
  title: string;
  index?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("ops-section scroll-mt-28 space-y-3", className)}>
      {index ? <p className="proof-workflow-index">{index}</p> : null}
      <h2 className="text-h2 font-semibold text-primary">{title}</h2>
      {children}
    </section>
  );
}
