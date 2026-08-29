"use client";

import * as React from "react";
import {
  Area as RcArea,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { Progress } from "@/components/ui/progress";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { A, arcPath, polar, seeded } from "./apple-ui";

/* ------------------------------------------------------------------ *
 * Charts.
 *
 * The funnel, gauge and heatmap stay hand-drawn: they are shapes the
 * reference design calls for that no charting library produces. Everything
 * else is Recharts through the repo's ChartContainer, so bars, areas and
 * lines carry real axes, cursors and tooltips.
 * ------------------------------------------------------------------ */

/* --------------------------------- funnel -------------------------------- */

/**
 * Acquisition funnel. Each stage is a bezier trapezoid; a taller, softer
 * copy sits behind it so the shape looks like it is spilling light.
 */
export function Funnel({
  stages,
  className,
}: {
  stages: { label: string; pct: number; color: string }[];
  className?: string;
}) {
  const W = 480;
  const H = 200;
  const cy = H / 2;
  const n = stages.length;
  const sw = W / n;

  // Boundary half-heights: the left edge of stage i, plus a final right edge.
  // The floor keeps a 5% stage visible instead of collapsing it to a sliver.
  const edges = stages.map((s) => (s.pct / 100) * 74 + 16);
  edges.push(edges[edges.length - 1] * 0.74);

  const band = (i: number, scale: number) => {
    const x0 = i * sw;
    const x1 = x0 + sw;
    const h0 = edges[i] * scale;
    const h1 = edges[i + 1] * scale;
    const c = sw * 0.45;
    return [
      `M ${x0} ${cy - h0}`,
      `C ${x0 + c} ${cy - h0}, ${x1 - c} ${cy - h1}, ${x1} ${cy - h1}`,
      `L ${x1} ${cy + h1}`,
      `C ${x1 - c} ${cy + h1}, ${x0 + c} ${cy + h0}, ${x0} ${cy + h0}`,
      "Z",
    ].join(" ");
  };

  return (
    <div className={cn("relative", className)}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img">
        {/* soft spill behind each stage */}
        {stages.map((s, i) => (
          <path
            key={`glow-${s.label}`}
            d={band(i, 1.22)}
            fill={s.color}
            opacity={0.16}
          />
        ))}
        {stages.map((s, i) => (
          <path key={s.label} d={band(i, 1)} fill={s.color} />
        ))}
      </svg>

      {/* percentage capsules ride on top of the shape */}
      <div className="pointer-events-none absolute inset-0 flex items-center">
        {stages.map((s) => (
          <div key={s.label} className="flex flex-1 justify-center">
            <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold tabular-nums text-foreground shadow-sm">
              {s.pct}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------------- gauge --------------------------------- */

/**
 * Half-donut. Segments meet flush, rounded only at the two outer ends — the
 * "spend by channel" dial.
 */
export function Gauge({
  segments,
  value,
  caption,
  className,
}: {
  segments: { label: string; pct: number; color: string }[];
  value: string;
  caption: string;
  className?: string;
}) {
  const size = 260;
  const cx = size / 2;
  const cy = size / 2 + 26;
  const r = 92;
  const stroke = 34;

  // Round caps overhang stroke/2 past each end -- about 10 degrees here, more
  // than a small segment's whole sweep. So segments use butt caps separated by
  // a real gap, and the dial's two outer ends are rounded separately below.
  const gap = 4;
  const total = segments.reduce((s, x) => s + x.pct, 0) || 1;
  let cursor = 172;
  const arcs = segments.map((s) => {
    const sweep = (s.pct / total) * 196;
    const from = cursor + gap / 2;
    const to = Math.max(cursor + sweep - gap / 2, from + 0.01);
    cursor += sweep;
    return { ...s, from, to };
  });
  const first = arcs[0];
  const last = arcs[arcs.length - 1];

  return (
    <div className={cn("relative", className)}>
      <svg viewBox={`0 0 ${size} ${size * 0.72}`} className="w-full" role="img">
        {arcs.map((a) => (
          <path
            key={a.label}
            d={arcPath(cx, cy, r, a.from, a.to)}
            stroke={a.color}
            strokeWidth={stroke}
            strokeLinecap="butt"
            fill="none"
          />
        ))}
        {/* Zero-length round-capped arcs: they render as a dot the width of
            the stroke, rounding just the two ends of the dial. */}
        {first && (
          <path
            d={arcPath(cx, cy, r, first.from, first.from + 0.01)}
            stroke={first.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
          />
        )}
        {last && (
          <path
            d={arcPath(cx, cy, r, last.to - 0.01, last.to)}
            stroke={last.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
          />
        )}
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-[14%] flex flex-col items-center">
        <span className="text-[34px] font-semibold leading-none tracking-[-0.03em] tabular-nums text-foreground">
          {value}
        </span>
        <span className="mt-1.5 text-sm text-muted-foreground">{caption}</span>
      </div>
    </div>
  );
}

/* ------------------------------- column chart ---------------------------- */

/**
 * Rounded columns on a ghost track. `highlight` frames one column the way
 * the monthly earnings card does.
 */
/* ------------------------------------------------------------------ *
 * From here down the charts are Recharts, wrapped in the repo's own
 * ChartContainer/ChartTooltip (src/components/ui/chart.tsx). They carry
 * real axes, hover cursors and tooltips; the palette stays the one the
 * reference design uses.
 * ------------------------------------------------------------------ */

/** Build a one-series ChartConfig. */
function cfg(key: string, label: string, color: string): ChartConfig {
  return { [key]: { label, color } };
}

const axis = {
  tickLine: false,
  axisLine: false,
  tickMargin: 8,
} as const;

/** Rounded columns on a muted track. `highlight` tints one bar. */
export function Columns({
  data,
  color = A.lime,
  highlight,
  height = 240,
  label = "Value",
  format,
  className,
}: {
  data: { label: string; value: number }[];
  color?: string;
  highlight?: number;
  height?: number;
  label?: string;
  format?: (v: number) => string;
  className?: string;
}) {
  return (
    <ChartContainer
      config={cfg("value", label, color)}
      className={cn("aspect-auto w-full", className)}
      style={{ height }}
    >
      <BarChart accessibilityLayer data={data} margin={{ left: 4, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" {...axis} interval="preserveStartEnd" />
        <YAxis {...axis} width={44} tickFormatter={format} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar
          dataKey="value"
          radius={8}
          background={{ fill: "hsl(var(--muted))", radius: 8 }}
        >
          {data.map((d, i) => (
            <Cell
              key={d.label}
              fill={color}
              fillOpacity={highlight === undefined || highlight === i ? 1 : 0.55}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}

/** Columns with a trend line on a second axis — spend against ROAS. */
export function ColumnsWithLine({
  data,
  barColor = A.lime,
  lineColor = A.blue,
  barLabel = "Spend",
  lineLabel = "ROAS",
  height = 240,
  formatBar,
  formatLine,
  className,
}: {
  data: { label: string; bar: number; line: number }[];
  barColor?: string;
  lineColor?: string;
  barLabel?: string;
  lineLabel?: string;
  height?: number;
  formatBar?: (v: number) => string;
  formatLine?: (v: number) => string;
  className?: string;
}) {
  return (
    <ChartContainer
      config={{
        bar: { label: barLabel, color: barColor },
        line: { label: lineLabel, color: lineColor },
      }}
      className={cn("aspect-auto w-full", className)}
      style={{ height }}
    >
      <ComposedChart accessibilityLayer data={data} margin={{ left: 4, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" {...axis} interval="preserveStartEnd" />
        <YAxis yAxisId="left" {...axis} width={48} tickFormatter={formatBar} />
        <YAxis
          yAxisId="right"
          orientation="right"
          {...axis}
          width={44}
          tickFormatter={formatLine}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar yAxisId="left" dataKey="bar" fill={barColor} radius={6} />
        <Line
          yAxisId="right"
          dataKey="line"
          type="monotone"
          stroke={lineColor}
          strokeWidth={2.5}
          dot={{ r: 3, fill: "hsl(var(--background))", strokeWidth: 2 }}
          activeDot={{ r: 5 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
}

/** Single smooth area with a fading gradient. */
export function Area({
  data,
  labels,
  color = A.lime,
  height = 240,
  label = "Value",
  format,
  className,
}: {
  data: number[];
  labels?: string[];
  color?: string;
  height?: number;
  label?: string;
  format?: (v: number) => string;
  className?: string;
}) {
  const id = React.useId().replace(/:/g, "");
  const rows = data.map((value, i) => ({ label: labels?.[i] ?? `${i + 1}`, value }));
  return (
    <ChartContainer
      config={cfg("value", label, color)}
      className={cn("aspect-auto w-full", className)}
      style={{ height }}
    >
      <AreaChart accessibilityLayer data={rows} margin={{ left: 4, right: 12 }}>
        <defs>
          <linearGradient id={`ar-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0.04} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" {...axis} interval="preserveStartEnd" />
        <YAxis {...axis} width={48} tickFormatter={format} domain={["auto", "auto"]} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <RcArea
          dataKey="value"
          type="monotone"
          stroke={color}
          strokeWidth={2.5}
          fill={`url(#ar-${id})`}
          activeDot={{ r: 4 }}
        />
      </AreaChart>
    </ChartContainer>
  );
}

/** Stacked smooth areas — traffic split by source. */
export function StackedArea({
  series,
  labels,
  height = 240,
  format,
  className,
}: {
  series: { name: string; color: string; data: number[] }[];
  labels?: string[];
  height?: number;
  format?: (v: number) => string;
  className?: string;
}) {
  const id = React.useId().replace(/:/g, "");
  const rows = (series[0]?.data ?? []).map((_, i) => {
    const row: Record<string, string | number> = {
      label: labels?.[i] ?? `${i + 1}`,
    };
    series.forEach((s) => (row[s.name] = s.data[i]));
    return row;
  });
  const config: ChartConfig = Object.fromEntries(
    series.map((s) => [s.name, { label: s.name, color: s.color }])
  );
  return (
    <ChartContainer
      config={config}
      className={cn("aspect-auto w-full", className)}
      style={{ height }}
    >
      <AreaChart accessibilityLayer data={rows} margin={{ left: 4, right: 12 }}>
        <defs>
          {series.map((s, i) => (
            <linearGradient key={s.name} id={`sa-${id}-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={s.color} stopOpacity={0.55} />
              <stop offset="100%" stopColor={s.color} stopOpacity={0.08} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" {...axis} interval="preserveStartEnd" />
        <YAxis {...axis} width={48} tickFormatter={format} />
        <ChartTooltip content={<ChartTooltipContent />} />
        {series.map((s, i) => (
          <RcArea
            key={s.name}
            dataKey={s.name}
            type="monotone"
            stackId="a"
            stroke={s.color}
            strokeWidth={2}
            fill={`url(#sa-${id}-${i})`}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}

/** Weekly columns on a muted track — step counts and similar. */
export function WeekBars({
  data,
  color = A.teal,
  height = 200,
  label = "Steps",
  className,
}: {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  label?: string;
  className?: string;
}) {
  return (
    <ChartContainer
      config={cfg("value", label, color)}
      className={cn("aspect-auto w-full", className)}
      style={{ height }}
    >
      <BarChart accessibilityLayer data={data} margin={{ left: 4, right: 12 }}>
        <XAxis dataKey="label" {...axis} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar
          dataKey="value"
          fill={color}
          radius={10}
          background={{ fill: "hsl(var(--muted))", radius: 10 }}
        />
      </BarChart>
    </ChartContainer>
  );
}

/** Inline trend line for list rows. */
export function Spark({
  data,
  color = A.green,
  className,
}: {
  data: number[];
  color?: string;
  className?: string;
}) {
  const rows = data.map((value, i) => ({ i, value }));
  return (
    <ChartContainer
      config={cfg("value", "Value", color)}
      className={cn("aspect-auto h-8 w-24", className)}
    >
      <LineChart data={rows} margin={{ top: 4, bottom: 4, left: 2, right: 2 }}>
        <Line
          dataKey="value"
          type="monotone"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ChartContainer>
  );
}


/* -------------------------------- heatmap -------------------------------- */

/** Contribution grid — 7 rows of rounded cells on a violet scale. */
export function Heatmap({
  weeks = 52,
  seed = 7,
  labels,
  className,
}: {
  weeks?: number;
  seed?: number;
  labels?: string[];
  className?: string;
}) {
  const rand = React.useMemo(() => seeded(seed), [seed]);
  const cells = React.useMemo(
    () =>
      Array.from({ length: weeks * 7 }, () => {
        const r = rand();
        if (r < 0.42) return 0;
        if (r < 0.62) return 1;
        if (r < 0.8) return 2;
        if (r < 0.93) return 3;
        return 4;
      }),
    [weeks, rand]
  );

  const tone = [
    "bg-muted",
    "bg-[#8E5BF6]/20",
    "bg-[#8E5BF6]/40",
    "bg-[#8E5BF6]/70",
    "bg-[#7C3AED]",
  ];

  return (
    <div className={cn("min-w-0", className)}>
      <div className="overflow-x-auto">
        <div
          className="grid min-w-[560px] grid-flow-col gap-[3px]"
          style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}
        >
          {cells.map((c, i) => (
            <span
              key={i}
              className={cn("h-[11px] w-[11px] rounded", tone[c])}
            />
          ))}
        </div>
        {labels && (
          <div className="flex min-w-[560px] justify-between pt-2 text-xs text-muted-foreground">
            {labels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------ activity rings --------------------------- */

/**
 * Concentric progress rings with rounded caps — Move / Exercise / Stand.
 * Values above 100 wrap, exactly like the Fitness app.
 */
export function Rings({
  values,
  colors = [A.pink, A.lime, A.blue],
  size = 190,
  stroke,
  className,
  children,
}: {
  values: number[];
  colors?: string[];
  size?: number;
  stroke?: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const cx = size / 2;
  const cy = size / 2;
  // Fit n rings inside the radius, leaving a hole in the middle: the stroke
  // has to shrink as rings are added or the innermost radius goes negative.
  const n = Math.max(values.length, 1);
  const gapRatio = 0.45;
  const hole = cx * 0.28;
  const sw = stroke ?? (cx - hole) / (1 + (1 + gapRatio) * (n - 1));
  const gapBetween = sw * gapRatio;

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} role="img">
        <g transform={`rotate(-90 ${cx} ${cy})`}>
          {values.map((v, i) => {
            const r = Math.max(cx - sw / 2 - i * (sw + gapBetween), sw / 2);
            const c = 2 * Math.PI * r;
            const pct = Math.min(v, 100) / 100;
            return (
              <g key={i}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={colors[i % colors.length]}
                  strokeWidth={sw}
                  opacity={0.2}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill="none"
                  stroke={colors[i % colors.length]}
                  strokeWidth={sw}
                  strokeLinecap="round"
                  strokeDasharray={`${c * pct} ${c}`}
                />
              </g>
            );
          })}
        </g>
      </svg>
      {children && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}

/** Segmented score donut with the figure in the middle. */
export function ScoreRing({
  segments,
  value,
  size = 150,
  className,
}: {
  segments: { pct: number; color: string }[];
  value: string | number;
  size?: number;
  className?: string;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = cx - 14;
  const sw = 15;
  const total = segments.reduce((s, x) => s + x.pct, 0) || 1;
  let cursor = -90;
  const gap = 6;
  // Same cap correction as Gauge: without it a 6px cap on a 61px radius eats
  // roughly 7 degrees at each end and the segments run into one another.
  const capDeg = ((sw / 2) / r) * (180 / Math.PI);

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} role="img">
        {segments.map((s, i) => {
          const sweep = (s.pct / total) * 360;
          const inset = capDeg + gap / 2;
          const from = cursor + inset;
          const to = Math.max(cursor + sweep - inset, from + 0.01);
          cursor += sweep;
          return (
            <path
              key={i}
              d={arcPath(cx, cy, r, from, to)}
              stroke={s.color}
              strokeWidth={sw}
              strokeLinecap="round"
              fill="none"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-[30px] font-semibold tracking-[-0.03em] tabular-nums text-foreground">
          {value}
        </span>
      </div>
    </div>
  );
}

/** Ring small enough to sit inside a calendar cell. */
export function MiniRings({
  values,
  size = 26,
  colors = [A.pink, A.lime, A.blue],
  dim = false,
}: {
  values: number[];
  size?: number;
  colors?: string[];
  dim?: boolean;
}) {
  const cx = size / 2;
  const n = Math.max(values.length, 1);
  const gapRatio = 0.4;
  const hole = cx * 0.26;
  const sw = (cx - hole) / (1 + (1 + gapRatio) * (n - 1));
  const gapBetween = sw * gapRatio;
  return (
    <svg
      width={size}
      height={size}
      style={{ opacity: dim ? 0.28 : 1 }}
      role="img"
    >
      <g transform={`rotate(-90 ${cx} ${cx})`}>
        {values.map((v, i) => {
          const r = Math.max(cx - sw / 2 - i * (sw + gapBetween), sw / 2);
          const c = 2 * Math.PI * r;
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cx}
                r={r}
                fill="none"
                stroke={colors[i]}
                strokeWidth={sw}
                opacity={0.22}
              />
              <circle
                cx={cx}
                cy={cx}
                r={r}
                fill="none"
                stroke={colors[i]}
                strokeWidth={sw}
                strokeLinecap="round"
                strokeDasharray={`${(c * Math.min(v, 100)) / 100} ${c}`}
              />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** Battery / storage style progress ring with a label in the middle. */
export function Donut({
  pct,
  color = A.green,
  size = 92,
  label,
  className,
}: {
  pct: number;
  color?: string;
  size?: number;
  label?: React.ReactNode;
  className?: string;
}) {
  const cx = size / 2;
  const sw = Math.max(size * 0.09, 3);
  const r = Math.max(cx - sw / 2 - 1, sw / 2);
  const c = 2 * Math.PI * r;
  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} role="img">
        <g transform={`rotate(-90 ${cx} ${cx})`}>
          <circle
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            opacity={0.16}
          />
          <circle
            cx={cx}
            cy={cx}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={`${(c * pct) / 100} ${c}`}
          />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums text-foreground">
        {label ?? `${pct}%`}
      </div>
    </div>
  );
}

/**
 * Horizontal meter — the repo's `Progress`, tinted per data series through a
 * CSS variable so the indicator can carry a series colour without forking
 * the component.
 */
export function Meter({
  pct,
  color = A.blue,
  className,
}: {
  pct: number;
  color?: string;
  className?: string;
}) {
  return (
    <Progress
      value={Math.min(100, Math.max(0, pct))}
      style={{ ["--meter" as string]: color } as React.CSSProperties}
      className={cn("h-1.5 bg-foreground/10 [&>div]:bg-[var(--meter)]", className)}
    />
  );
}


export { polar };
