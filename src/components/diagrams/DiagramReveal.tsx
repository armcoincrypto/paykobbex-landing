"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** One-time in-view fade/slide for diagrams; disabled when reduced motion is requested. */
export function DiagramReveal({
  children,
  className,
  /** Set false on inner pages to avoid repeated in-view motion (P12 propagation). */
  settle = true,
}: {
  children: ReactNode;
  className?: string;
  settle?: boolean;
}) {
  const reduce = useReducedMotion();

  if (!settle || reduce) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      /* Opacity stays 1 for static export / no-JS readability; motion is translate-only. */
      initial={reduce ? false : { opacity: 1, y: 6 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-6% 0px" }}
      transition={{
        duration: reduce ? 0 : 0.36,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
