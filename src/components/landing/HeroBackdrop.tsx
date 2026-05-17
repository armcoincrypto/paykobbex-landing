"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Ambient hero depth — one slow settle, no looping distraction.
 * Respects prefers-reduced-motion (static layout only).
 */
export function HeroBackdrop() {
  const reduce = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div className="hero-grid absolute inset-0 opacity-[0.45]" />
      <div className="hero-aurora absolute -right-[20%] top-0 h-[min(85%,520px)] w-[min(85vw,720px)] rounded-full blur-3xl" />
      {!reduce ? (
        <>
          <motion.div
            className="absolute right-[8%] top-[18%] h-40 w-40 rounded-full bg-accent/15 blur-2xl"
            initial={{ opacity: 0.25, scale: 0.92 }}
            animate={{ opacity: 0.5, scale: 1 }}
            transition={{ duration: 16, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.div
            className="absolute bottom-[6%] left-[4%] h-32 w-56 rounded-full bg-[rgb(96_165_250/0.08)] blur-2xl"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 14, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      ) : (
        <div className="absolute right-[8%] top-[18%] h-40 w-40 rounded-full bg-accent/12 blur-2xl" />
      )}
      <div className="hero-vignette absolute inset-0" />
    </div>
  );
}
