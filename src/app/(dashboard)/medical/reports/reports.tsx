"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { TrendingUp, TrendingDown, Users, Activity, DollarSign, Clock } from "lucide-react";

const kpis = [
  { label: "Patient visits", value: "1,842", delta: "+12%", up: true, icon: Users },
  { label: "Avg wait time", value: "14 min", delta: "-3 min", up: true, icon: Clock },
  { label: "Bed occupancy", value: "78%", delta: "+4%", up: false, icon: Activity },
  { label: "Revenue", value: "$248k", delta: "+9%", up: true, icon: DollarSign },
];

const months = [
  { m: "Oct", v: 62 }, { m: "Nov", v: 78 }, { m: "Dec", v: 54 },
  { m: "Jan", v: 88 }, { m: "Feb", v: 71 }, { m: "Mar", v: 96 },
];

const departments = [
  { name: "Cardiology", pct: 34, color: "#f43f5e" },
  { name: "Neurology", pct: 24, color: "#8b5cf6" },
  { name: "Orthopedics", pct: 20, color: "#0ea5e9" },
  { name: "Pediatrics", pct: 12, color: "#10b981" },
  { name: "General", pct: 10, color: "#f59e0b" },
];

const procedures = [
  { name: "Blood test", count: 428, c: "bg-rose-500" },
  { name: "X-Ray", count: 312, c: "bg-violet-500" },
  { name: "MRI scan", count: 186, c: "bg-sky-500" },
  { name: "Vaccination", count: 542, c: "bg-emerald-500" },
];

export default function Reports() {
  const max = Math.max(...months.map((x) => x.v));
  // build conic-gradient for donut
  let acc = 0;
  const stops = departments
    .map((d) => {
      const start = acc;
      acc += d.pct;
      return `${d.color} ${start}% ${acc}%`;
    })
    .join(", ");

  return (
    <ContentLayout title="Reports">
      <FadeIn>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Reports &amp; analytics</h2>
          <p className="mt-1 text-muted-foreground">Performance over the last 6 months</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className={`${surface} p-5`}>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">{k.label}</p>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <k.icon className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-2 text-3xl font-semibold tabular-nums">{k.value}</p>
              <p className={`mt-1 flex items-center gap-1 text-xs ${k.up ? "text-emerald-600" : "text-rose-600"}`}>
                {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {k.delta} vs last month
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          {/* bar chart */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="Monthly visits" subtitle="Patients seen per month" />
            <div className="mt-6 flex h-56 items-end justify-between gap-3">
              {months.map((x) => (
                <div key={x.m} className="group flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-medium tabular-nums text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">{x.v}</span>
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-sky-600 to-cyan-400 transition-opacity hover:opacity-90"
                    style={{ height: `${(x.v / max) * 100}%` }}
                  />
                  <span className="text-xs text-muted-foreground">{x.m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* donut */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="By department" />
            <div className="mt-4 flex items-center gap-6">
              <div className="relative h-32 w-32 shrink-0">
                <div className="h-full w-full rounded-full" style={{ background: `conic-gradient(${stops})` }} />
                <div className="absolute inset-[18%] flex items-center justify-center rounded-full bg-card">
                  <span className="text-sm font-semibold">100%</span>
                </div>
              </div>
              <div className="flex-1 space-y-2">
                {departments.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="flex-1">{d.name}</span>
                    <span className="text-muted-foreground tabular-nums">{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* procedures */}
        <div className={`${surface} p-6`}>
          <SectionTitle title="Top procedures" subtitle="This month" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {procedures.map((p) => (
              <div key={p.name} className="rounded-xl bg-muted/40 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{p.name}</p>
                  <span className={`h-2.5 w-2.5 rounded-full ${p.c}`} />
                </div>
                <p className="mt-2 text-2xl font-semibold tabular-nums">{p.count}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
