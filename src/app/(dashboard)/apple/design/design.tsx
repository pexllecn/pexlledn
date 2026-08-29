"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  AppleShell,
  A,
  ChannelRow,
  Delta,
  Legend,
  MiniStat,
  RangePill,
  Row,
  Segmented,
  Stat,
  Stepper,
  stagger,
} from "../components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  Area,
  Columns,
  Donut,
  Funnel,
  Gauge,
  Heatmap,
  Meter,
  MiniRings,
  Rings,
  ScoreRing,
  Spark,
  StackedArea,
  WeekBars,
} from "../components/apple-charts";
import { Bell, Layers, Ruler, Sparkles, Type } from "lucide-react";

const typeScale = [
  { name: "Title", size: "26 / -0.02em", cls: "text-3xl font-semibold tracking-tight" },
  { name: "Figure", size: "28 / -0.02em", cls: "text-3xl font-semibold tracking-tight tabular-nums" },
  { name: "Section", size: "20 / -0.02em", cls: "text-2xl font-semibold tracking-tight" },
  { name: "Row title", size: "14 / medium", cls: "text-base font-medium" },
  { name: "Body", size: "13 / regular", cls: "text-sm" },
  { name: "Caption", size: "12 / regular", cls: "text-xs text-muted-foreground" },
  { name: "Micro", size: "11 / regular", cls: "text-xs text-muted-foreground" },
];

const palette = [
  { name: "Blue", value: A.blue, use: "Primary action, links, selection" },
  { name: "Lime", value: A.lime, use: "First data series, positive volume" },
  { name: "Green", value: A.green, use: "Success, positive delta" },
  { name: "Teal", value: A.teal, use: "Fourth series, steps" },
  { name: "Purple", value: A.purple, use: "Third series, contribution scale" },
  { name: "Pink", value: A.pink, use: "Move ring, fourth series" },
  { name: "Orange", value: A.orange, use: "Warnings, budget pressure" },
  { name: "Red", value: A.red, use: "Destructive, negative delta" },
];

// Radius comes from --radius (1.5rem) via the Tailwind scale — no literals.
const radii = [
  { name: "rounded-lg", note: "--radius", cls: "rounded-lg" },
  { name: "rounded-md", note: "−2px", cls: "rounded-md" },
  { name: "rounded-sm", note: "−4px", cls: "rounded-sm" },
  { name: "rounded-full", note: "pills", cls: "rounded-full" },
];

const rules = [
  "Every control is the repo's own: Card, Button, Badge, Tabs, Switch, Progress, Separator, Table, Input, Avatar.",
  "Nothing here re-implements a component that already exists in src/components/ui.",
  "Radius comes from --radius via rounded-lg / md / sm / full — never a pixel literal.",
  "Chrome uses the semantic tokens, so the app follows the active theme and accent.",
  "Colour belongs to the data; only charts introduce a hue of their own.",
];

const demoArea = [18, 25, 26, 24, 29, 39, 34, 32, 46, 38, 36, 56];
const demoColumns = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
  (label, i) => ({ label, value: [54, 72, 38, 64, 81, 46, 69][i] })
);

export default function Design() {
  return (
    <AppleShell title="Design" showFilters={false}>
      <div className="min-w-0 space-y-4">
        {/* Intro */}
        <Card className="min-w-0 p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              The language
            </p>
          </div>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-foreground">
            Built from the design system, not beside it.
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every screen is assembled from the repo's existing component library.
            This page is the reference: the scale, the palette, and each shared
            piece rendered at the size it ships at.
          </p>

          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {rules.map((r) => (
              <div
                key={r}
                className="rounded-lg bg-muted p-4 text-sm leading-relaxed text-muted-foreground"
              >
                {r}
              </div>
            ))}
          </div>
        </Card>

        {/* Type + colour + radius */}
        <div className="grid gap-4 xl:grid-cols-3">
          <Card className="min-w-0 p-5">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4 text-muted-foreground" />
              <p className="text-base font-medium text-foreground">Type scale</p>
            </div>
            <div className="mt-4 space-y-3">
              {typeScale.map((t) => (
                <div key={t.name} className="flex items-baseline justify-between gap-3">
                  <span className={`${t.cls} truncate text-foreground`}>{t.name}</span>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    {t.size}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="min-w-0 p-5">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-muted-foreground" />
              <p className="text-base font-medium text-foreground">Palette</p>
            </div>
            <div className="mt-4 space-y-2">
              {palette.map((p) => (
                <div key={p.name} className="flex items-center gap-3">
                  <span
                    className="h-7 w-7 shrink-0 rounded-lg"
                    style={{ backgroundColor: p.value }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {p.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">{p.use}</p>
                  </div>
                  <span className="shrink-0 text-xs uppercase tabular-nums text-muted-foreground">
                    {p.value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <div className="min-w-0 space-y-4">
            <Card className="min-w-0 p-5">
              <div className="flex items-center gap-2">
                <Ruler className="h-4 w-4 text-muted-foreground" />
                <p className="text-base font-medium text-foreground">Radius</p>
              </div>
              <div className="mt-4 flex items-end gap-3">
                {radii.map((r) => (
                  <div key={r.name} className="flex flex-1 flex-col items-center gap-2">
                    <div
                      className={`h-14 w-full border border-border bg-muted ${r.cls}`}
                    />
                    <span className="text-center text-xs text-muted-foreground">
                      {r.name}
                      <br />
                      {r.note}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="min-w-0 p-5">
              <p className="text-base font-medium text-foreground">Deltas</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Delta value={8.4} />
                <Delta value={12.6} />
                <Delta value={-3.1} />
                <Delta value={-7.4} />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                Green reads as movement in the intended direction, red against it.
                The pill never carries an arrow — the sign does that work.
              </p>
            </Card>
          </div>
        </div>

        {/* Controls */}
        <Card className="min-w-0 p-5">
          <p className="text-base font-medium text-foreground">Controls</p>
          <div className="mt-4 grid gap-6 lg:grid-cols-2">
            <div className="space-y-5">
              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                  Segmented
                </p>
                <div className="flex flex-wrap gap-3">
                  <Segmented options={["Weekly", "Monthly", "Yearly"]} />
                  <Segmented options={["Day", "Week", "Month"]} value="Week" />
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                  Pills & steppers
                </p>
                <div className="flex flex-wrap gap-3">
                  <RangePill />
                  <RangePill label="This year" />
                  <Stepper label="December" />
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                  Buttons
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <Button className="h-9 rounded-full px-4">
                    Primary
                  </Button>
                  <Button variant="outline" className="h-9 rounded-full px-4">
                    Secondary
                  </Button>
                  <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-full">
                    <Bell className="h-4 w-4 text-foreground/70" />
                    <span className="absolute -right-0.5 -top-0.5 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#FF3B30] px-1 text-1xs font-semibold text-white">
                      5
                    </span>
                  </Button>
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                  Toggles & meters
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <Switch defaultChecked />
                  <Switch />
                  <div className="w-40 space-y-2">
                    <Meter pct={72} color={A.blue} />
                    <Meter pct={42} color={A.lime} />
                    <Meter pct={18} color={A.pink} />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                  Tabs
                </p>
                <Tabs defaultValue="Channels">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <TabsList className="h-9">
                      {["Channels", "Campaigns", "Landing"].map((t) => (
                        <TabsTrigger key={t} value={t} className="text-xs">
                          {t}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <span className="text-1xs font-medium uppercase tracking-wider text-muted-foreground">
                      Sessions
                    </span>
                  </div>
                  {["Channels", "Campaigns", "Landing"].map((t) => (
                    <TabsContent key={t} value={t} className="space-y-1.5">
                      <ChannelRow label={`${t} · first`} pct={42} color={A.blue} />
                      <ChannelRow label={`${t} · second`} pct={28} color={A.blue} />
                      <ChannelRow label={`${t} · third`} pct={14} color={A.blue} muted />
                    </TabsContent>
                  ))}
                </Tabs>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                  Grouped rows
                </p>
                <div className="overflow-hidden rounded-lg border border-border">
                  <Row
                    icon={<Sparkles className="h-3.5 w-3.5" />}
                    tint={A.purple}
                    title="With a toggle"
                    subtitle="Secondary line"
                    right={<Switch defaultChecked />}
                  />
                  <Separator className="ml-14 w-auto" />
                  <Row
                    icon={<Layers className="h-3.5 w-3.5" />}
                    tint={A.blue}
                    title="With a trend"
                    subtitle="Secondary line"
                    right={<Spark data={[4, 6, 5, 9, 8, 12, 14]} />}
                  />
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs uppercase tracking-wide text-muted-foreground">
                  Figure tiles
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <MiniStat value="9B" label="Lifetime" />
                  <MiniStat value="562.7M" label="Peak" />
                  <MiniStat value="12h 54m" label="Longest" />
                  <MiniStat value="62 days" label="Streak" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stat cards */}
        <motion.div
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
          <Stat icon={<Sparkles className="h-4 w-4" />} label="Positive delta" value="$24,380" delta={8.4} />
          <Stat icon={<Layers className="h-4 w-4" />} label="Negative delta" value="$1.24" delta={-3.1} />
          <Stat icon={<Type className="h-4 w-4" />} label="With a hint" value="4.7" hint="average across 128 apps" />
          <Stat icon={<Ruler className="h-4 w-4" />} label="Plain figure" value="56" />
        </motion.div>

        {/* Charts */}
        <div className="grid gap-4 xl:grid-cols-3">
          <Card className="min-w-0 p-5">
            <p className="text-base font-medium text-foreground">Funnel</p>
            <Funnel
              className="mt-4"
              stages={[
                { label: "Visits", pct: 100, color: A.lime },
                { label: "Sign-ups", pct: 40, color: A.blue },
                { label: "Trials", pct: 15, color: A.purple },
                { label: "Customers", pct: 5, color: A.pink },
              ]}
            />
          </Card>

          <Card className="min-w-0 p-5">
            <p className="text-base font-medium text-foreground">Gauge</p>
            <Gauge
              className="mt-2"
              segments={[
                { label: "A", pct: 46, color: A.lime },
                { label: "B", pct: 31, color: A.blue },
                { label: "C", pct: 13, color: A.purple },
                { label: "D", pct: 10, color: A.pink },
              ]}
              value="46%"
              caption="Largest share"
            />
          </Card>

          <Card className="min-w-0 p-5">
            <p className="text-base font-medium text-foreground">Rings</p>
            <div className="mt-4 flex items-center justify-around">
              <Rings values={[88, 74, 62]} size={130} />
              <ScoreRing
                segments={[
                  { pct: 50, color: A.purple },
                  { pct: 30, color: A.pink },
                  { pct: 20, color: A.blue },
                ]}
                value={98}
                size={120}
              />
            </div>
            <div className="mt-4 flex items-center justify-center gap-3">
              {[
                [90, 70, 50],
                [60, 80, 40],
                [30, 40, 90],
              ].map((v, i) => (
                <MiniRings key={i} values={v} size={30} dim={i === 2} />
              ))}
              <Donut pct={64} color={A.blue} size={62} />
            </div>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="min-w-0 p-5">
            <p className="text-base font-medium text-foreground">Area & stacked area</p>
            <Area className="mt-4" data={demoArea} height={170} />
            <StackedArea
              className="mt-4"
              height={170}
              series={[
                { name: "Direct", color: A.lime, data: [42, 44, 43, 46, 48, 47, 50, 53] },
                { name: "Organic", color: A.blue, data: [28, 30, 29, 33, 35, 34, 38, 40] },
                { name: "Referral", color: A.purple, data: [14, 16, 15, 18, 19, 21, 22, 24] },
              ]}
            />
            <Legend
              className="mt-3"
              items={[
                { label: "Direct", color: A.lime },
                { label: "Organic", color: A.blue },
                { label: "Referral", color: A.purple },
              ]}
            />
          </Card>

          <Card className="min-w-0 p-5">
            <p className="text-base font-medium text-foreground">Columns & heatmap</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Columns data={demoColumns} highlight={4} height={170} />
              <WeekBars data={demoColumns} height={170} />
            </div>
            <Heatmap className="mt-5" weeks={40} seed={3} />
          </Card>
        </div>
      </div>
    </AppleShell>
  );
}
