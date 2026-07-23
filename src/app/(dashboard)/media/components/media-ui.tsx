"use client";

import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { cn } from "@/lib/utils";

/**
 * Shared "cinema" design language for the Media app.
 * A dark, layered, premium surface with a warm orange accent — the same
 * language across every Media page so it reads as one product.
 */

export const ACCENT = "#f97316"; // orange-500

// Dark bordered card used for tiles / rails.
export const card = "rounded-2xl border border-white/5 bg-white/[0.02]";
export const cardHover = "transition-colors hover:bg-white/[0.04]";

const pageVariants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

/** The dark cinematic shell every Media page sits inside. */
export function Cinema({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ContentLayout title={title}>
      <motion.div
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        variants={pageVariants}
        className="pb-4"
      >
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-b from-[#101014] to-[#08080b] text-neutral-200 ring-1 ring-white/5">
          {/* ambient glows */}
          <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-orange-600/10 blur-[130px]" />
          <div className="pointer-events-none absolute top-1/2 -left-24 h-72 w-72 rounded-full bg-violet-600/10 blur-[130px]" />
          <div className={cn("relative p-5 sm:p-7", className)}>{children}</div>
        </div>
      </motion.div>
    </ContentLayout>
  );
}

/** Small uppercase section label with an optional action. */
export function Label({
  children,
  action = "See all",
  onAction,
}: {
  children: React.ReactNode;
  action?: string | null;
  onAction?: () => void;
}) {
  return (
    <div className="mb-3 flex items-center justify-between">
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">
        {children}
      </p>
      {action && (
        <button
          onClick={onAction}
          className="text-xs text-orange-500 hover:underline"
        >
          {action}
        </button>
      )}
    </div>
  );
}

/** A titled block used in the right rail. */
export function Rail({
  title,
  children,
  action = "See all",
}: {
  title: string;
  children: React.ReactNode;
  action?: string | null;
}) {
  return (
    <div>
      <Label action={action}>{title}</Label>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/** Solid orange pill button. */
export function AccentButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-600",
        className
      )}
    >
      {children}
    </button>
  );
}
