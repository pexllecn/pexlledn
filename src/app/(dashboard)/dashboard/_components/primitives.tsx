"use client";

/**
 * The shared furniture for the Apple design pass. Every screen in the pass
 * builds from these three pieces, so section rhythm, card treatment and the
 * page masthead stay identical across dashboard, board, messages and mail.
 */

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE_OUT, rise, stagger } from "@/lib/apple-motion";

/**
 * The page masthead. Apple sets a page's identity in one large, tightly
 * tracked line with the controls pushed to the far edge, rather than in a
 * toolbar of equals.
 */
export function PageHead({
  eyebrow,
  title,
  actions,
}: {
  eyebrow?: string;
  title: string;
  actions?: React.ReactNode;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE_OUT }}
      className="flex flex-wrap items-end justify-between gap-4"
    >
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h1>
      </div>

      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </motion.header>
  );
}

/**
 * A surface. Deliberately quieter than the stock card: a hairline instead of a
 * heavy border, and shadow only on hover, so a dense grid of these reads as one
 * sheet of paper rather than a pile of boxes.
 */
export const Surface = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
>(({ className, inset = true, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground",
      "transition-shadow duration-300",
      inset && "p-5",
      className,
    )}
    {...props}
  />
));
Surface.displayName = "Surface";

/** A titled block inside a Surface. Keeps every card header identical. */
export function SectionHead({
  title,
  hint,
  action,
  className,
}: {
  title: string;
  hint?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-3", className)}>
      <div className="min-w-0">
        <h2 className="text-lg font-semibold tracking-tight">{title}</h2>

        {hint && (
          <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
        )}
      </div>

      {action}
    </div>
  );
}

/** Wraps a group whose children should cascade in rather than land at once. */
export function Cascade({
  children,
  className,
  each,
}: {
  children: React.ReactNode;
  className?: string;
  each?: number;
}) {
  return (
    <motion.div
      variants={stagger(each)}
      initial="hidden"
      animate="show"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** One member of a Cascade. */
export function CascadeItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={rise} className={className}>
      {children}
    </motion.div>
  );
}
