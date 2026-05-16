"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";
import { buttonClass } from "@/components/primitives/button-styles";
import { cn } from "@/lib/cn";

export type ButtonProps = Omit<HTMLMotionProps<"button">, "children"> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  const reduce = useReducedMotion();

  return (
    <motion.button
      type={type}
      className={cn(buttonClass(variant), className)}
      whileHover={
        reduce
          ? undefined
          : variant === "primary"
            ? {
                scale: 1.012,
                boxShadow: "0 18px 44px -10px rgba(37, 99, 235, 0.38)",
              }
            : { scale: 1.006 }
      }
      whileTap={reduce ? undefined : { scale: 0.985 }}
      transition={{ type: "tween", duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
