"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { cn } from "@/lib/utils";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Plus,
  SlidersHorizontal,
} from "lucide-react";

/* ------------------------------------------------------------------ *
 * Apple Design — one shared visual language for the whole app.
 *
 * The rules the screens are built from:
 *   • soft, deeply rounded surfaces on a quiet neutral ground
 *   • hairline borders instead of shadows
 *   • one tight type scale, tabular numerals for every figure
 *   • a small saturated palette used only inside data, never as chrome
 * ------------------------------------------------------------------ */

/** The system font stack — SF on Apple hardware, graceful elsewhere. */
export const SF =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", "Inter", system-ui, sans-serif';

/** Data palette. Chrome stays neutral; colour lives in the charts. */
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

/* -------------------------------- surfaces ------------------------------- */

// min-w-0: grid and flex items default to min-width:auto, which lets wide
// content (tables, the heatmap) stretch its track past the viewport.
export const surface =
  "min-w-0 rounded-[22px] border border-black/[0.06] bg-white dark:border-white/[0.07] dark:bg-white/[0.03]";

export function Surface({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn(surface, className)} {...rest}>
      {children}
    </div>
  );
}

/** Inset panel — used for tiles nested inside a Surface. */
export function Inset({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-black/[0.035] p-4 dark:bg-white/[0.04]",
        className
      )}
    >
      {children}
    </div>
  );
}

/* ---------------------------------- shell -------------------------------- */

const shellVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
};

/**
 * Every Apple Design page sits in this shell: a large tracking-tight title
 * on the left, and the notification / filter / primary-action cluster on
 * the right.
 */
export function AppleShell({
  title,
  action,
  actionIcon,
  onAction,
  notifications = 5,
  showFilters = true,
  aside,
  children,
}: {
  title: string;
  action?: string;
  actionIcon?: React.ReactNode;
  onAction?: () => void;
  notifications?: number;
  showFilters?: boolean;
  aside?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <ContentLayout title={title}>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={shellVariants}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        style={{ fontFamily: SF }}
        className="pb-8"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-[26px] font-semibold leading-none tracking-[-0.02em] text-foreground">
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {aside}
            <button
              type="button"
              aria-label={`${notifications} notifications`}
              className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/[0.07] bg-white transition-colors hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
            >
              <Bell className="h-4 w-4 text-foreground/70" />
              {notifications > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#FF3B30] px-1 text-[10px] font-semibold leading-none text-white">
                  {notifications}
                </span>
              )}
            </button>

            {showFilters && (
              <button
                type="button"
                className="flex h-9 items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3.5 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-black/[0.03] dark:border-white/[0.08] dark:bg-white/[0.04] dark:hover:bg-white/[0.07]"
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </button>
            )}

            {action && (
              <button
                type="button"
                onClick={onAction}
                style={{ backgroundColor: A.blue }}
                className="flex h-9 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold text-white transition-opacity hover:opacity-90"
              >
                {actionIcon ?? <Plus className="h-4 w-4" />}
                {action}
              </button>
            )}
          </div>
        </div>

        {children}
      </motion.div>
    </ContentLayout>
  );
}

/* --------------------------------- pieces -------------------------------- */

/** Green / red change pill that sits beside a figure. */
export function Delta({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-1.5 py-0.5 text-[12px] font-medium tabular-nums",
        up
          ? "bg-[#34C759]/12 text-[#248A3D] dark:bg-[#34C759]/15 dark:text-[#5CE07E]"
          : "bg-[#FF3B30]/12 text-[#C6362E] dark:bg-[#FF3B30]/15 dark:text-[#FF7A72]",
        className
      )}
    >
      {up ? "+" : ""}
      {value}%
    </span>
  );
}

/** Icon-square + label + figure + delta. The KPI card of the system. */
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
    <Surface className={cn("p-5", className)}>
      <div className="mb-6 flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.05] text-foreground/70 dark:bg-white/[0.07]">
        {icon}
      </div>
      <p className="text-[13px] text-muted-foreground">{label}</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-[28px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground">
          {value}
        </span>
        {delta !== undefined && <Delta value={delta} />}
      </div>
      {hint && <p className="mt-2 text-[12px] text-muted-foreground">{hint}</p>}
    </Surface>
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
    <div
      className={cn(
        "rounded-2xl border border-black/[0.06] px-4 py-3 dark:border-white/[0.07]",
        className
      )}
    >
      <p className="text-[15px] font-semibold tracking-[-0.01em] tabular-nums text-foreground">
        {value}
      </p>
      <p className="mt-0.5 text-[12px] text-muted-foreground">{label}</p>
    </div>
  );
}

/** Section header inside a Surface. */
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
        <p className="text-[13px] text-muted-foreground">{title}</p>
        {value && (
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-[24px] font-semibold leading-none tracking-[-0.02em] tabular-nums text-foreground">
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

/** Weekly / Monthly / Yearly segmented control. */
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
  const [internal, setInternal] = React.useState(value ?? options[0]);
  const active = value ?? internal;
  return (
    <div
      className={cn(
        "inline-flex max-w-full flex-wrap items-center gap-0.5 rounded-full bg-black/[0.045] p-0.5 dark:bg-white/[0.06]",
        className
      )}
    >
      {options.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => {
            setInternal(o);
            onChange?.(o);
          }}
          className={cn(
            "rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
            active === o
              ? "bg-white text-foreground shadow-sm dark:bg-white/[0.14]"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {o}
        </button>
      ))}
    </div>
  );
}

/** "Last 30 days" date-range pill. */
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
    <button
      type="button"
      className={cn(
        "flex h-8 items-center gap-2 rounded-full border border-black/[0.07] px-3 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-black/[0.03] dark:border-white/[0.08] dark:hover:bg-white/[0.06]",
        className
      )}
    >
      <span className="text-muted-foreground">{icon}</span>
      {label}
      <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
    </button>
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
        "flex h-8 items-center gap-1 rounded-full border border-black/[0.07] px-1.5 dark:border-white/[0.08]",
        className
      )}
    >
      <button
        type="button"
        aria-label="Previous"
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
      >
        <ChevronDown className="h-3.5 w-3.5 rotate-90" />
      </button>
      <span className="px-1 text-[13px] font-medium text-foreground">{label}</span>
      <button
        type="button"
        aria-label="Next"
        className="flex h-6 w-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-black/[0.05] dark:hover:bg-white/[0.08]"
      >
        <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
      </button>
    </div>
  );
}

/** Underlined tab row with an optional trailing label. */
export function UnderlineTabs({
  tabs,
  right,
  onChange,
  children,
}: {
  tabs: string[];
  right?: React.ReactNode;
  onChange?: (v: string) => void;
  children?: (active: string) => React.ReactNode;
}) {
  const [active, setActive] = React.useState(tabs[0]);
  return (
    <div>
      <div className="flex items-center justify-between gap-3 border-b border-black/[0.07] px-1 dark:border-white/[0.07]">
        <div className="flex items-center gap-5">
          {tabs.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setActive(t);
                onChange?.(t);
              }}
              className={cn(
                "relative -mb-px border-b-2 pb-2.5 pt-1 text-[13px] font-medium transition-colors",
                active === t
                  ? "border-[#0A6CFF] text-[#0A6CFF]"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {t}
            </button>
          ))}
        </div>
        {right && (
          <span className="pb-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {right}
          </span>
        )}
      </div>
      {children?.(active)}
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
      <div className="relative h-9 flex-1 overflow-hidden rounded-lg">
        <div
          className="absolute inset-y-0 left-0 rounded-lg"
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
              "truncate text-[13px] font-medium text-foreground",
              muted && "text-muted-foreground"
            )}
          >
            {label}
          </span>
        </div>
      </div>
      <span className="w-10 shrink-0 text-right text-[13px] font-medium tabular-nums text-muted-foreground">
        {pct}%
      </span>
    </div>
  );
}

/** Small colour key used under the charts. */
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
        <span key={i.label} className="flex items-center gap-1.5 text-[13px]">
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

/** iOS settings toggle. */
export function Toggle({
  checked: controlled,
  onChange,
}: {
  checked?: boolean;
  onChange?: (v: boolean) => void;
}) {
  const [internal, setInternal] = React.useState(controlled ?? false);
  const on = controlled ?? internal;
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => {
        setInternal(!on);
        onChange?.(!on);
      }}
      className={cn(
        "relative h-[26px] w-[44px] shrink-0 rounded-full transition-colors duration-200",
        on ? "bg-[#34C759]" : "bg-black/15 dark:bg-white/20"
      )}
    >
      {/* left is pinned: an absolutely positioned span inside a button would
          otherwise take its static position from the button's centred text. */}
      <span
        className={cn(
          "absolute left-[2px] top-[2px] h-[22px] w-[22px] rounded-full bg-white shadow-sm transition-transform duration-200",
          on ? "translate-x-[18px]" : "translate-x-0"
        )}
      />
    </button>
  );
}

/** Grouped-list row, the backbone of the Settings-style screens. */
export function Row({
  icon,
  tint,
  title,
  subtitle,
  right,
  className,
}: {
  icon?: React.ReactNode;
  tint?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 px-4 py-3 transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]",
        className
      )}
    >
      {icon && (
        <span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] text-white"
          style={{ backgroundColor: tint ?? A.gray }}
        >
          {icon}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px] font-medium text-foreground">{title}</p>
        {subtitle && (
          <p className="truncate text-[12px] text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {right && <div className="shrink-0">{right}</div>}
    </div>
  );
}

/** Hairline divider matched to the list rows. */
export function Hair({ className }: { className?: string }) {
  return (
    <div className={cn("h-px bg-black/[0.06] dark:bg-white/[0.07]", className)} />
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
