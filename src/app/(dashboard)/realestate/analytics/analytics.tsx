"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { TrendingUp, TrendingDown, Home, DollarSign, Clock, Percent } from "lucide-react";

const kpis = [
  { label: "Listings sold", value: "312", delta: "+18", up: true, icon: Home },
  { label: "Avg days on market", value: "28", delta: "-4 days", up: true, icon: Clock },
  { label: "List-to-sale ratio", value: "98.4%", delta: "-0.3%", up: false, icon: Percent },
];

const months = [
  { m: "Oct", v: 58 }, { m: "Nov", v: 71 }, { m: "Dec", v: 49 },
  { m: "Jan", v: 82 }, { m: "Feb", v: 66 }, { m: "Mar", v: 94 },
];

const types = [
  { name: "Single-family", pct: 46, color: "#0ea5e9" },
  { name: "Condos", pct: 27, color: "#8b5cf6" },
  { name: "Townhouses", pct: 18, color: "#10b981" },
  { name: "Commercial", pct: 9, color: "#f59e0b" },
];

const neighborhoods = [
  { name: "Waterfront", price: "$1.2M", change: "+8.1%", up: true },
  { name: "Downtown", price: "$820k", change: "+5.4%", up: true },
  { name: "Midtown", price: "$610k", change: "+2.1%", up: true },
  { name: "Suburban North", price: "$540k", change: "-1.2%", up: false },
];

export default function Analytics() {
  const max = Math.max(...months.map((x) => x.v));
  let acc = 0;
  const stops = types.map((d) => { const s = acc; acc += d.pct; return `${d.color} ${s}% ${acc}%`; }).join(", ");

  return (
    <ContentLayout title="Analytics">
      <FadeIn>
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">Market analytics</h2>
          <p className="mt-1 text-muted-foreground">Portfolio performance overview</p>
        </div>

        {/* hero metric + kpis */}
        <div className="grid gap-4 lg:grid-cols-[1.2fr_2fr]">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-600 p-6 text-white">
            <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full bg-white/15 blur-2xl" />
            <div className="flex items-center gap-2 text-white/80"><DollarSign className="h-4 w-4" /> <span className="text-sm">Avg sale price</span></div>
            <p className="mt-2 text-4xl font-semibold tabular-nums">$684k</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-emerald-200"><TrendingUp className="h-4 w-4" /> +6.2% vs last month</p>
            <div className="mt-6 flex h-16 items-end gap-1.5">
              {months.map((x) => (
                <div key={x.m} className="flex-1 rounded-t bg-white/30" style={{ height: `${(x.v / max) * 100}%` }} />
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {kpis.map((k) => (
              <div key={k.label} className={`${surface} flex flex-col justify-between p-5`}>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">{k.label}</p>
                  <k.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="mt-4 text-3xl font-semibold tabular-nums">{k.value}</p>
                  <p className={`mt-1 flex items-center gap-1 text-xs ${k.up ? "text-emerald-600" : "text-rose-600"}`}>
                    {k.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {k.delta}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <div className={`${surface} p-6`}>
            <SectionTitle title="Sales volume" subtitle="Homes sold per month" />
            <div className="mt-6 flex h-56 items-end justify-between gap-3">
              {months.map((x) => (
                <div key={x.m} className="group flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-xs font-medium tabular-nums text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">{x.v}</span>
                  <div className="w-full rounded-t-lg bg-gradient-to-t from-violet-600 to-indigo-400" style={{ height: `${(x.v / max) * 100}%` }} />
                  <span className="text-xs text-muted-foreground">{x.m}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`${surface} p-6`}>
            <SectionTitle title="Property types" />
            <div className="mt-4 flex items-center gap-6">
              <div className="relative h-32 w-32 shrink-0">
                <div className="h-full w-full rounded-full" style={{ background: `conic-gradient(${stops})` }} />
                <div className="absolute inset-[18%] flex items-center justify-center rounded-full bg-card text-sm font-semibold">100%</div>
              </div>
              <div className="flex-1 space-y-2">
                {types.map((d) => (
                  <div key={d.name} className="flex items-center gap-2 text-sm">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="flex-1">{d.name}</span>
                    <span className="tabular-nums text-muted-foreground">{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className={`overflow-hidden ${surface}`}>
          <div className="p-5"><SectionTitle title="By neighborhood" /></div>
          {neighborhoods.map((n) => (
            <div key={n.name} className="flex items-center justify-between border-t px-5 py-4 transition-colors hover:bg-muted/40">
              <span className="text-sm font-medium">{n.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold tabular-nums">{n.price}</span>
                <span className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-1xs ${n.up ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-600"}`}>
                  {n.up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />} {n.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
