"use client";

import * as React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { A, arcPath, polar, seeded, smoothPath } from "./apple-ui";

/* ------------------------------------------------------------------ *
 * Charts, drawn by hand in SVG.
 *
 * Everything here is deliberately not a charting library: the shapes in
 * this design language (the spilled funnel, the capsule gauge, the
 * activity rings) need exact control over caps, gaps and easing.
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
 * Half-donut with rounded caps and a gap between segments — the
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
  const gap = 5; // degrees

  const total = segments.reduce((s, x) => s + x.pct, 0) || 1;
  let cursor = 172;
  const arcs = segments.map((s) => {
    const sweep = (s.pct / total) * 196;
    const from = cursor + gap / 2;
    const to = cursor + sweep - gap / 2;
    cursor += sweep;
    return { ...s, from, to: Math.max(to, from + 0.1) };
  });

  return (
    <div className={cn("relative", className)}>
      <svg viewBox={`0 0 ${size} ${size * 0.72}`} className="w-full" role="img">
        {arcs.map((a) => (
          <path
            key={a.label}
            d={arcPath(cx, cy, r, a.from, a.to)}
            stroke={a.color}
            strokeWidth={stroke}
            strokeLinecap="round"
            fill="none"
          />
        ))}
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
export function Columns({
  data,
  max,
  color = A.lime,
  highlight,
  height = 240,
  ticks,
  className,
}: {
  data: { label: string; value: number }[];
  max?: number;
  color?: string;
  highlight?: number;
  height?: number;
  ticks?: string[];
  className?: string;
}) {
  const peak = max ?? Math.max(...data.map((d) => d.value)) * 1.12;

  return (
    <div className={cn("flex gap-3", className)}>
      {ticks && (
        <div
          className="flex flex-col justify-between pb-6 text-right text-xs tabular-nums text-muted-foreground"
          style={{ height }}
        >
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
      <div className="flex min-w-0 flex-1 items-end gap-1.5" style={{ height }}>
        {data.map((d, i) => (
          <div
            key={d.label + i}
            className={cn(
              "flex h-full min-w-0 flex-1 flex-col rounded-lg",
              highlight === i && "bg-muted p-1"
            )}
          >
            <div className="relative min-h-0 flex-1">
              <div className="absolute inset-0 rounded-xl bg-muted" />
              <div
                className="absolute inset-x-0 bottom-0 rounded-xl transition-[height] duration-500"
                style={{
                  height: `${Math.min(100, (d.value / peak) * 100)}%`,
                  backgroundColor: color,
                }}
              />
            </div>
            <span className="truncate pt-2 text-center text-xs text-muted-foreground">
              {d.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- columns + trend line ------------------------ */

/** Columns with a line riding over them — spend against ROAS. */
export function ColumnsWithLine({
  data,
  barColor = A.lime,
  lineColor = A.blue,
  leftTicks,
  rightTicks,
  height = 230,
  className,
}: {
  data: { label: string; bar: number; line: number }[];
  barColor?: string;
  lineColor?: string;
  leftTicks?: string[];
  rightTicks?: string[];
  height?: number;
  className?: string;
}) {
  const barMax = Math.max(...data.map((d) => d.bar)) * 1.15;
  const lineMax = Math.max(...data.map((d) => d.line)) * 1.5;
  const lineMin = Math.min(...data.map((d) => d.line)) * 0.4;

  const W = 600;
  const H = 200;
  const step = W / data.length;
  const points = data.map((d, i) => ({
    x: step * i + step / 2,
    y: H - ((d.line - lineMin) / (lineMax - lineMin)) * H,
  }));

  return (
    <div className={cn("flex gap-3", className)}>
      {leftTicks && (
        <div
          className="flex flex-col justify-between pb-6 text-right text-xs tabular-nums text-muted-foreground"
          style={{ height }}
        >
          {leftTicks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}

      <div className="relative min-w-0 flex-1">
        <div className="flex items-end gap-1.5" style={{ height }}>
          {data.map((d) => (
            <div key={d.label} className="flex h-full min-w-0 flex-1 flex-col">
              <div className="relative min-h-0 flex-1">
                <div
                  className="absolute inset-x-0 bottom-0 rounded-xl"
                  style={{
                    height: `${(d.bar / barMax) * 100}%`,
                    backgroundColor: barColor,
                  }}
                />
              </div>
              <span className="pt-2 text-center text-xs text-muted-foreground">
                {d.label}
              </span>
            </div>
          ))}
        </div>

        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 w-full"
          style={{ height: height - 24 }}
        >
          <path
            d={smoothPath(points)}
            fill="none"
            stroke={lineColor}
            strokeWidth={5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 top-0 w-full"
          style={{ height: height - 24 }}
        >
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={3}
              fill="hsl(var(--background))"
              stroke={lineColor}
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      </div>

      {rightTicks && (
        <div
          className="flex flex-col justify-between pb-6 text-xs tabular-nums text-muted-foreground"
          style={{ height }}
        >
          {rightTicks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
    </div>
  );
}

/* --------------------------------- areas --------------------------------- */

/** Single smooth area with a fading gradient — the revenue curve. */
export function Area({
  data,
  color = A.lime,
  height = 220,
  labels,
  ticks,
  className,
}: {
  data: number[];
  color?: string;
  height?: number;
  labels?: string[];
  ticks?: string[];
  className?: string;
}) {
  const id = React.useId().replace(/:/g, "");
  const W = 600;
  const H = 200;
  const max = Math.max(...data) * 1.25;
  const min = Math.min(...data) * 0.6;
  const step = W / (data.length - 1 || 1);
  const points = data.map((v, i) => ({
    x: i * step,
    y: H - ((v - min) / (max - min)) * H,
  }));
  const line = smoothPath(points);

  return (
    <div className={cn("flex gap-3", className)}>
      {ticks && (
        <div
          className="flex flex-col justify-between pb-6 text-right text-xs tabular-nums text-muted-foreground"
          style={{ height }}
        >
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{ height: height - 24 }}
          className="w-full"
          role="img"
        >
          <defs>
            <linearGradient id={`ar-${id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <path d={`${line} L ${W} ${H} L 0 ${H} Z`} fill={`url(#ar-${id})`} />
          <path
            d={line}
            fill="none"
            stroke={color}
            strokeWidth={2.5}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        {labels && (
          <div className="flex justify-between pt-2 text-xs text-muted-foreground">
            {labels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Stacked smooth areas — the visitors chart. */
export function StackedArea({
  series,
  height = 220,
  labels,
  ticks,
  className,
}: {
  series: { name: string; color: string; data: number[] }[];
  height?: number;
  labels?: string[];
  ticks?: string[];
  className?: string;
}) {
  const id = React.useId().replace(/:/g, "");
  const W = 600;
  const H = 200;
  const len = series[0]?.data.length ?? 0;
  const step = W / (len - 1 || 1);

  // Cumulative totals so the bands stack instead of overlapping.
  const cumulative: number[][] = [];
  for (let s = 0; s < series.length; s++) {
    cumulative.push(
      series[s].data.map(
        (v, i) => v + (s === 0 ? 0 : cumulative[s - 1][i])
      )
    );
  }
  const max = Math.max(...cumulative[cumulative.length - 1]) * 1.18;
  const toPts = (arr: number[]) =>
    arr.map((v, i) => ({ x: i * step, y: H - (v / max) * H }));

  return (
    <div className={cn("flex gap-3", className)}>
      {ticks && (
        <div
          className="flex flex-col justify-between pb-6 text-right text-xs tabular-nums text-muted-foreground"
          style={{ height }}
        >
          {ticks.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          style={{ height: height - 24 }}
          className="w-full"
          role="img"
        >
          <defs>
            {series.map((s, i) => (
              <linearGradient
                key={s.name}
                id={`sa-${id}-${i}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor={s.color} stopOpacity={0.5} />
                <stop offset="100%" stopColor={s.color} stopOpacity={0.08} />
              </linearGradient>
            ))}
          </defs>
          {/* draw top band first so lower bands paint over its skirt */}
          {series
            .map((s, i) => ({ s, i }))
            .reverse()
            .map(({ s, i }) => {
              const pts = toPts(cumulative[i]);
              const line = smoothPath(pts);
              return (
                <g key={s.name}>
                  <path
                    d={`${line} L ${W} ${H} L 0 ${H} Z`}
                    fill={`url(#sa-${id}-${i})`}
                  />
                  <path
                    d={line}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={2}
                    vectorEffect="non-scaling-stroke"
                  />
                </g>
              );
            })}
        </svg>
        {labels && (
          <div className="flex justify-between pt-2 text-xs text-muted-foreground">
            {labels.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/** Tiny inline trend line for list rows. */
export function Spark({
  data,
  color = A.green,
  className,
}: {
  data: number[];
  color?: string;
  className?: string;
}) {
  const W = 100;
  const H = 32;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const step = W / (data.length - 1 || 1);
  const pts = data.map((v, i) => ({
    x: i * step,
    y: H - ((v - min) / (max - min || 1)) * (H - 4) - 2,
  }));
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("h-8 w-24", className)} role="img">
      <path
        d={smoothPath(pts)}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
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

  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} role="img">
        {segments.map((s, i) => {
          const sweep = (s.pct / total) * 360;
          const from = cursor + gap / 2;
          const to = cursor + sweep - gap / 2;
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
      className={cn("h-1.5 bg-muted [&>div]:bg-[var(--meter)]", className)}
    />
  );
}

/** Vertical bars used for the weekly step counts. */
export function WeekBars({
  data,
  color = A.teal,
  height = 200,
  className,
}: {
  data: { label: string; value: number }[];
  color?: string;
  height?: number;
  className?: string;
}) {
  const max = Math.max(...data.map((d) => d.value)) * 1.1;
  return (
    <div className={cn("flex items-end gap-2", className)} style={{ height }}>
      {data.map((d) => (
        <div key={d.label} className="flex h-full min-w-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1">
            <div className="absolute inset-0 rounded-xl bg-muted" />
            <div
              className="absolute inset-x-0 bottom-0 rounded-xl"
              style={{
                height: `${(d.value / max) * 100}%`,
                backgroundColor: color,
              }}
            />
          </div>
          <span className="pt-2 text-center text-xs text-muted-foreground">
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export { polar };
