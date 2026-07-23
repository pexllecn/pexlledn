"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { cn } from "@/lib/utils";

/**
 * Shared design language for the Media app.
 * Flat & modern: plain background, bordered surfaces, minimal shadow,
 * a single solid violet accent (no gradients). Consistent across pages.
 */

// Flat bordered surface — theme-aware, no blur, no heavy shadow.
export const glass = "rounded-2xl border bg-card";

// Subtle, flat hover — just a background tint, no lift or shadow.
export const glassHover = "transition-colors hover:bg-muted/40";

// Solid accent used for primary actions & highlights.
export const accent = "bg-violet-600 text-white hover:bg-violet-700";
export const accentSoft = "bg-violet-500/10 text-violet-600 dark:text-violet-400";

const pageVariants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

// A solid accent-colored span (kept as a component so headings stay consistent).
export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("text-violet-600 dark:text-violet-400", className)}>
      {children}
    </span>
  );
}

export function SectionHeading({
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
          <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

export function MediaPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <ContentLayout title={title}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        variants={pageVariants}
        className="flex-1 space-y-8 lg:p-4 py-6"
      >
        {children}
      </motion.div>
    </ContentLayout>
  );
}
