"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * Apple Design — composition layer.
 *
 * Everything here is built FROM the repo's own primitives (Card, Button,
 * Badge, Tabs, Switch, Progress, Separator, Table, Input, Avatar). Nothing
 * in this file re-implements a component that already exists in
 * `src/components/ui`. Radius comes from --radius via rounded-lg/md/full,
 * and chrome uses the semantic tokens (border, card, muted, primary) so
 * the app follows the active theme and accent colour.
 * ------------------------------------------------------------------ */

/**
 * Categorical palette for data series only — never for chrome.
 * Charts need stable, distinguishable hues that survive a theme swap;
 * every border, surface and label around them uses the semantic tokens.
 */
export const A = {
  blue: "#0A6CFF",
  lime: "#A3E635",
  green: "#34C759",
  teal: "#2BD4C0",
  purple: "#8E5BF6",
  violet: "#7C3AED",
  pink: "#F2529B",
  orange: "#FF9F0A",
  red: "#FF3B30",
  gray: "#8E8E93",
};

/* ---------------------------------- shell -------------------------------- */

// The blur-in every other page in the dashboard uses — no translate.
const pageVariants = {
  hidden: { filter: "blur(10px)", opacity: 0 },
  visible: { filter: "blur(0px)", opacity: 1 },
};

/**
 * The page shell: title on the left, notification / filter / primary-action
 * cluster on the right. The action is a plain `Button`, so it follows the
 * user's accent colour rather than a hard-coded blue.
 */
export function AppleShell({
  title,
  action,
  actionIcon,
  onAction,
  showFilters = true,
  aside,
  children,
}: {
  title: string;
  action?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  showFilters?: boolean;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <ContentLayout title={title}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={pageVariants}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pb-8"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-2xl font-semibold leading-none tracking-tight text-foreground">
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {aside}

            {showFilters && (
              <Button variant="outline" className="h-9 gap-2 rounded-full">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </Button>
            )}

            {action && (
              <Button onClick={onAction} className="h-9 gap-1.5 rounded-full">
                {actionIcon ?? <Plus className="h-4 w-4" />}
                {action}
              </Button>
            )}
          </div>
        </div>

        {children}
      </motion.div>
    </ContentLayout>
  );
}



/* ---------------------------------- tone ---------------------------------- */

/**
 * Card tones.
 *
 * `plain` is the default surface: muted fill, no border. It is for scaffolding
 * — KPI tiles, side rails, navigational lists — the things you read at a
 * glance. `panel` keeps Card's own white-and-border and is reserved for
 * surfaces that hold the actual content: a chart, a table, a reading pane.
 * Mixing the two is what gives a page a foreground and a background.
 */
export const tone = {
  plain: "border-0 bg-muted",
  panel: "",
} as const;

/* --------------------------------- motion --------------------------------- */

/**
 * The same springs the Dynamic Island uses, so motion feels consistent
 * across the app. `snappy` moves shells and surfaces; `quick` is a touch
 * faster and carries content.
 */
export const snappy = {
  type: "spring" as const,
  stiffness: 400,
  damping: 30,
  mass: 1.1,
};

export const quick = {
  type: "spring" as const,
  stiffness: 500,
  damping: 34,
  mass: 0.7,
};

/** Blur-and-scale entrance — the island's content transition. */
export const pop = {
  hidden: { opacity: 0, filter: "blur(6px)", scale: 0.96 },
  visible: { opacity: 1, filter: "blur(0px)", scale: 1 },
};

/** Parent that releases its children in sequence. */
export const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045 } },
};

/** Press feedback for anything tappable. */
export const press = { scale: 0.97 };

/* --------------------------------- pieces -------------------------------- */

/** Change pill — the repo's Badge in its success / decline variants. */
export function Delta({ value, className }: { value: number; className?: string }) {
  return (
    <Badge
      variant={value >= 0 ? "success" : "decline"}
      className={cn("tabular-nums", className)}
    >
      {value >= 0 ? "+" : ""}
      {value}%
    </Badge>
  );
}

/** Icon tile + label + figure + delta. The KPI card of the app. */
export function Stat({
  icon,
  label,
  value,
  delta,
  hint,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  className?: string;
}) {
  return (
    <motion.div variants={pop} transition={snappy} whileHover={{ y: -2 }}>
      <Card className={cn("h-full p-5", tone.plain, className)}>
      <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-2xl font-semibold leading-none tracking-tight tabular-nums text-foreground">
          {value}
        </span>
        {delta !== undefined && <Delta value={delta} />}
      </div>
      {hint && <p className="mt-2 text-xs text-muted-foreground">{hint}</p>}
      </Card>
    </motion.div>
  );
}

/** Compact figure tile — the "9B / Lifetime tokens" block. */
export function MiniStat({
  value,
  label,
  className,
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <motion.div variants={pop} transition={snappy}>
      <Card className={cn("rounded-md px-4 py-3", tone.plain, className)}>
      <p className="text-base font-semibold tracking-tight tabular-nums text-foreground">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
      </Card>
    </motion.div>
  );
}

/** Section header inside a Card. */
export function CardHead({
  title,
  value,
  delta,
  right,
  className,
}: {
  title: string;
  value?: string;
  delta?: number;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-start justify-between gap-x-3 gap-y-2",
        className
      )}
    >
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        {value && (
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-semibold leading-none tracking-tight tabular-nums text-foreground">
              {value}
            </span>
            {delta !== undefined && <Delta value={delta} />}
          </div>
        )}
      </div>
      {right}
    </div>
  );
}

/**
 * Weekly / Monthly / Yearly control — the repo's Tabs, which already renders
 * a pill track with an animated active background. Not a new control.
 */
export function Segmented({
  options,
  value,
  onChange,
  className,
}: {
  options: string[];
  value?: string;
  onChange?: (v: string) => void;
  className?: string;
}) {
  return (
    <Tabs defaultValue={value ?? options[0]} onValueChange={onChange}>
      <TabsList className={cn("h-9", className)}>
        {options.map((o) => (
          <TabsTrigger key={o} value={o} className="text-xs">
            {o}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

/** "Last 30 days" range control. */
export function RangePill({
  label = "Last 30 days",
  icon = <CalendarDays className="h-3.5 w-3.5" />,
  className,
}: {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      variant="outline"
      className={cn("h-9 gap-2 rounded-full text-xs", className)}
    >
      <span className="text-muted-foreground">{icon}</span>
      {label}
    </Button>
  );
}

/** Left/right stepper — "‹ December ›". */
export function Stepper({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-9 items-center gap-1 rounded-full border border-input px-1.5",
        className
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        aria-label="Previous"
        className="h-6 w-6 rounded-full"
      >
        <ChevronLeft className="h-3.5 w-3.5 text-muted-foreground" />
      </Button>
      <span className="px-1 text-xs font-medium text-foreground">{label}</span>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Next"
        className="h-6 w-6 rounded-full"
      >
        <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
      </Button>
    </div>
  );
}

/** Ranked row with the bar drawn behind the label. */
export function ChannelRow({
  icon,
  label,
  pct,
  color = A.blue,
  muted = false,
}: {
  icon?: React.ReactNode;
  label: string;
  pct: number;
  color?: string;
  muted?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-9 flex-1 overflow-hidden rounded-xl">
        <div
          className="absolute inset-y-0 left-0 rounded-xl"
          style={{
            width: `${pct}%`,
            backgroundColor: color,
            opacity: muted ? 0.07 : 0.14,
          }}
        />
        <div className="relative flex h-full items-center gap-2 px-2.5">
          {icon && (
            <span className={cn("shrink-0", muted && "opacity-50")}>{icon}</span>
          )}
          <span
            className={cn(
              "truncate text-xs font-medium text-foreground",
              muted && "text-muted-foreground"
            )}
          >
            {label}
          </span>
        </div>
      </div>
      <span className="w-10 shrink-0 text-right text-xs font-medium tabular-nums text-muted-foreground">
        {pct}%
      </span>
    </div>
  );
}

/** Colour key shown under a chart. */
export function Legend({
  items,
  className,
}: {
  items: { label: string; value?: string; color: string }[];
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-1.5 text-xs">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: i.color }}
          />
          <span className="text-muted-foreground">{i.label}</span>
          {i.value && (
            <span className="font-semibold tabular-nums text-foreground">
              {i.value}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

/** Grouped-list row — the backbone of the settings-style screens. */
export function Row({
  icon,
  tint,
  title,
  subtitle,
  right,
  interactive = false,
  className,
}: {
  icon?: React.ReactNode;
  tint?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  /** Only for rows that navigate. Display rows stay inert. */
  interactive?: boolean;
  className?: string;
}) {
  // A row that only displays a value (or carries its own control, like a
  // Switch) is not a target: no hover, no press, no focus ring. Framer's tap
  // gestures also add tabindex, which is why press feedback here made every
  // settings row focusable. Only pass `interactive` when the row navigates.
  const Wrapper = interactive ? motion.div : "div";
  const motionProps = interactive
    ? { whileTap: press, transition: quick }
    : {};

  return (
    <Wrapper
      {...motionProps}
      className={cn(
        "flex items-center gap-3 px-4 py-3",
        interactive && "cursor-pointer transition-colors hover:bg-foreground/5",
        className
      )}
    >
      {icon && (
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl text-white"
          style={{ backgroundColor: tint ?? A.gray }}
        >
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>
        {subtitle && (
          <p className="truncate text-xs text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </Wrapper>
  );
}

/* --------------------------------- helpers -------------------------------- */

/** Deterministic PRNG so server and client render the same demo data. */
export function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Catmull-Rom → cubic bezier, for the soft curves in every line chart. */
export function smoothPath(points: { x: number; y: number }[], t = 0.2) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    d += ` C ${p1.x + (p2.x - p0.x) * t} ${p1.y + (p2.y - p0.y) * t}, ${
      p2.x - (p3.x - p1.x) * t
    } ${p2.y - (p3.y - p1.y) * t}, ${p2.x} ${p2.y}`;
  }
  return d;
}

/** Point on a circle, angles in degrees, 0° = 3 o'clock. */
export function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

/** SVG arc path between two angles. */
export function arcPath(
  cx: number,
  cy: number,
  r: number,
  from: number,
  to: number
) {
  const a = polar(cx, cy, r, from);
  const b = polar(cx, cy, r, to);
  const large = Math.abs(to - from) > 180 ? 1 : 0;
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${large} 1 ${b.x} ${b.y}`;
}

/** Two-letter initials for an Avatar fallback when the image can't load. */
export function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}
