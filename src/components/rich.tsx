"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Small shared building blocks for richer, theme-aware app pages.
 */

export function FadeIn({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(10px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn("space-y-6 py-6 lg:px-4", className)}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  title,
  subtitle,
  action,
}: {
  title: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/** Flat, theme-aware surface. */
export const surface = "rounded-2xl border bg-card";
