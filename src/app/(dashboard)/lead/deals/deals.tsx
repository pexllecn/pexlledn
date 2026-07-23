"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus, TrendingUp, DollarSign, Target } from "lucide-react";

const stats = [
  { label: "Open deals", value: "$256k", icon: DollarSign },
  { label: "Win rate", value: "34%", icon: Target },
  { label: "Avg deal size", value: "$28.4k", icon: TrendingUp },
];

const forecast = [
  { m: "Apr", v: 40 }, { m: "May", v: 65 }, { m: "Jun", v: 52 },
  { m: "Jul", v: 88 }, { m: "Aug", v: 74 }, { m: "Sep", v: 96 },
];

const deals = [
  { name: "Enterprise plan — Acme Co.", owner: "Jerome Bell", value: "$61,000", stage: "Won", prob: 100, close: "Mar 8", avatar: "/avatar-40-01.jpg", tint: "text-emerald-600 bg-emerald-500/10" },
  { name: "Annual license — Umbrella", owner: "Kristin Watson", value: "$34,000", stage: "Proposal", prob: 70, close: "Mar 21", avatar: "/avatar-40-04.jpg", tint: "text-amber-600 bg-amber-500/10" },
  { name: "Pilot — Initech", owner: "Cody Fisher", value: "$21,500", stage: "Qualified", prob: 45, close: "Apr 2", avatar: "/avatar-40-03.jpg", tint: "text-violet-600 bg-violet-500/10" },
  { name: "Renewal — Hooli", owner: "Robert Fox", value: "$28,000", stage: "Proposal", prob: 65, close: "Mar 30", avatar: "/avatar-32-01.jpg", tint: "text-amber-600 bg-amber-500/10" },
  { name: "New logo — Globex", owner: "Dianne Russell", value: "$8,500", stage: "New", prob: 20, close: "Apr 15", avatar: "/avatar-40-02.jpg", tint: "text-sky-600 bg-sky-500/10" },
];

export default function Deals() {
  const max = Math.max(...forecast.map((f) => f.v));
  return (
    <ContentLayout title="Deals">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Deals</h2>
            <p className="mt-1 text-muted-foreground">Your active opportunities</p>
          </div>
          <Button><Plus className="mr-2 h-4 w-4" /> New deal</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* forecast */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-600 p-6 text-white">
            <p className="text-sm text-white/80">Forecast revenue</p>
            <p className="mt-1 text-3xl font-semibold tabular-nums">$412,000</p>
            <div className="mt-6 flex h-32 items-end justify-between gap-2">
              {forecast.map((f) => (
                <div key={f.m} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div className="w-full rounded-t-md bg-white/80" style={{ height: `${(f.v / max) * 100}%` }} />
                  <span className="text-1xs text-white/70">{f.m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className={`${surface} flex flex-col justify-between p-5`}>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-6">
                  <p className="text-2xl font-semibold tabular-nums">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* deal list */}
        <div className={`overflow-hidden ${surface}`}>
          <div className="p-5"><SectionTitle title="All deals" /></div>
          {deals.map((d) => (
            <div key={d.name} className="grid grid-cols-1 gap-3 border-t px-5 py-4 transition-colors hover:bg-muted/40 lg:grid-cols-[2.2fr,1.4fr,1fr,1fr] lg:items-center">
              <div>
                <p className="text-sm font-medium">{d.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.avatar} alt={d.owner} className="h-5 w-5 rounded-full object-cover" />
                  <span className="text-xs text-muted-foreground">{d.owner}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Progress value={d.prob} className="h-2 flex-1" />
                <span className="text-xs tabular-nums text-muted-foreground">{d.prob}%</span>
              </div>
              <span className={`w-fit rounded-full px-2.5 py-1 text-1xs ${d.tint}`}>{d.stage}</span>
              <div className="flex items-center justify-between lg:justify-end lg:gap-6">
                <span className="text-xs text-muted-foreground">Close {d.close}</span>
                <span className="text-sm font-semibold tabular-nums">{d.value}</span>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
