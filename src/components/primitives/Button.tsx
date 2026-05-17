"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonClass } from "@/components/primitives/button-styles";
import { cn } from "@/lib/cn";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

/** CSS-driven interaction — no Framer hover scale (P13 precision). */
export function Button({
  variant = "primary",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={cn(buttonClass(variant), className)} {...props}>
      {children}
    </button>
  );
}
