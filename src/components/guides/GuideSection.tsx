import type { ReactNode } from "react";

/** Semantic section for educational guides (answer-first IA). */
export function GuideSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-3">
      <h2 className="text-h2 font-semibold text-primary">{title}</h2>
      {children}
    </section>
  );
}
