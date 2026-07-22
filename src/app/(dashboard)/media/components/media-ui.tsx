"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { cn } from "@/lib/utils";

/**
 * Shared design language for the Media app.
 * A cohesive, modern 2026 aesthetic: ambient gradient meshes, glassmorphic
 * surfaces, soft depth and gradient accents — consistent across every page.
 */

// Glassmorphic surface — theme-aware, works in light & dark.
export const glass =
  "rounded-3xl border border-border/60 bg-card/70 backdrop-blur-xl shadow-[0_1px_0_0_hsl(var(--border))]";

export const glassHover =
  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-20px_rgba(0,0,0,0.35)] hover:border-border";

// The signature Media gradient.
export const brand = "from-violet-500 via-fuchsia-500 to-pink-500";

const pageVariants = {
  hidden: { filter: "blur(12px)", opacity: 0, y: 8 },
  visible: { filter: "blur(0px)", opacity: 1, y: 0 },
};

export function GradientText({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent",
        className
      )}
    >
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
      <div className="relative overflow-hidden">
        {/* Ambient gradient mesh */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
        >
          <div className="absolute -top-40 -left-24 h-80 w-80 rounded-full bg-violet-500/20 blur-[120px]" />
          <div className="absolute top-16 right-0 h-72 w-72 rounded-full bg-fuchsia-500/15 blur-[120px]" />
          <div className="absolute top-[60%] left-1/3 h-80 w-80 rounded-full bg-sky-500/10 blur-[130px]" />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          variants={pageVariants}
          className="relative z-10 flex-1 space-y-8 lg:p-4 py-6"
        >
          {children}
        </motion.div>
      </div>
    </ContentLayout>
  );
}
