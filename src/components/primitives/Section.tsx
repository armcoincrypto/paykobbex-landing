"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Tone = "default" | "muted";

const tones: Record<Tone, string> = {
  default: "bg-canvas",
  muted: "bg-surface",
};

export function Section({
  id,
  children,
  tone = "default",
  className,
}: {
  id?: string;
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.section
      id={id}
      className={cn(
        "py-12 sm:py-[var(--token-section-default)] lg:py-[var(--token-section-loose)]",
        tones[tone],
        className,
      )}
      /* Keep opacity at 1 for static export / no-JS: never hide primary content behind opacity:0. */
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 1, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -12% 0px", amount: 0.2 }}
      transition={{
        duration: reduce ? 0 : 0.42,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.section>
  );
}
