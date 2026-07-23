"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, Target, TrendingUp, Users } from "lucide-react";

const summary = [
  { label: "Pipeline value", value: "$256k", icon: DollarSign, c: "from-emerald-500 to-teal-500" },
  { label: "Open deals", value: "9", icon: Target, c: "from-sky-500 to-cyan-500" },
  { label: "Win rate", value: "34%", icon: TrendingUp, c: "from-violet-500 to-fuchsia-500" },
  { label: "New leads", value: "18", icon: Users, c: "from-amber-500 to-orange-500" },
];

const columns = [
  { name: "New", total: "$42k", accent: "bg-sky-500", cards: [
    { company: "Acme Co.", contact: "Jerome Bell", value: "$12,000", avatar: "/avatar-40-01.jpg", pct: 20 },
    { company: "Globex", contact: "Dianne Russell", value: "$8,500", avatar: "/avatar-40-02.jpg", pct: 15 },
    { company: "Initech", contact: "Cody Fisher", value: "$21,500", avatar: "/avatar-40-03.jpg", pct: 25 },
  ]},
  { name: "Qualified", total: "$68k", accent: "bg-violet-500", cards: [
    { company: "Umbrella", contact: "Kristin Watson", value: "$34,000", avatar: "/avatar-40-04.jpg", pct: 45 },
    { company: "Soylent", contact: "Guy Hawkins", value: "$34,000", avatar: "/avatar-40-05.jpg", pct: 50 },
  ]},
  { name: "Proposal", total: "$55k", accent: "bg-amber-500", cards: [
    { company: "Hooli", contact: "Robert Fox", value: "$28,000", avatar: "/avatar-32-01.jpg", pct: 70 },
    { company: "Pied Piper", contact: "Jane Cooper", value: "$27,000", avatar: "/avatar-40-01.jpg", pct: 65 },
  ]},
  { name: "Won", total: "$91k", accent: "bg-emerald-500", cards: [
    { company: "Stark Ind.", contact: "Wade Warren", value: "$61,000", avatar: "/avatar-40-02.jpg", pct: 100 },
    { company: "Wayne Ent.", contact: "Esther Howard", value: "$30,000", avatar: "/avatar-40-03.jpg", pct: 100 },
  ]},
];

export default function Pipeline() {
  return (
    <ContentLayout title="Pipeline">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Pipeline</h2>
            <p className="mt-1 text-muted-foreground">$256k across 9 deals</p>
          </div>
          <Button><Plus className="mr-2 h-4 w-4" /> New deal</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {summary.map((s) => (
            <div key={s.label} className={`relative overflow-hidden ${surface} p-5`}>
              <div className={`absolute right-0 top-0 h-16 w-16 rounded-full bg-gradient-to-br ${s.c} opacity-15 blur-2xl`} />
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.c} text-white`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-2xl font-semibold tabular-nums">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.name} className="rounded-2xl bg-muted/50 p-3">
              <div className="mb-3 flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${col.accent}`} />
                  <span className="text-sm font-medium">{col.name}</span>
                  <span className="text-xs text-muted-foreground">{col.cards.length}</span>
                </div>
                <span className="text-xs font-medium tabular-nums text-muted-foreground">{col.total}</span>
              </div>
              <div className="space-y-2">
                {col.cards.map((c) => (
                  <div key={c.company} className="rounded-xl border bg-card p-3 shadow-sm transition-shadow hover:shadow-md">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{c.company}</p>
                      <span className="text-sm font-semibold tabular-nums">{c.value}</span>
                    </div>
                    <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${col.accent}`} style={{ width: `${c.pct}%` }} />
                    </div>
                    <div className="mt-2.5 flex items-center gap-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={c.avatar} alt={c.contact} className="h-6 w-6 rounded-full object-cover" />
                      <span className="text-xs text-muted-foreground">{c.contact}</span>
                    </div>
                  </div>
                ))}
                <button className="w-full rounded-xl border border-dashed py-2 text-xs text-muted-foreground transition-colors hover:bg-card">+ Add deal</button>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
