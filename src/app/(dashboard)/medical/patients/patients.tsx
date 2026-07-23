"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Phone, Mail, MoreHorizontal, UserPlus, Activity, HeartPulse, Users } from "lucide-react";

const stats = [
  { label: "Total patients", value: "1,284", icon: Users, accent: "from-sky-500 to-cyan-500" },
  { label: "New this month", value: "48", icon: UserPlus, accent: "from-violet-500 to-fuchsia-500" },
  { label: "Active cases", value: "126", icon: Activity, accent: "from-amber-500 to-orange-500" },
  { label: "Critical", value: "6", icon: HeartPulse, accent: "from-rose-500 to-red-500" },
];

const critical = [
  { name: "William Chen", cond: "Post-op recovery", room: "ICU-3", avatar: "/avatar-40-04.jpg" },
  { name: "Emma Rodriguez", cond: "Cardiac watch", room: "CCU-1", avatar: "/avatar-40-05.jpg" },
  { name: "Olivia Bennett", cond: "Hypertension", room: "Ward-7", avatar: "/avatar-40-01.jpg" },
];

const patients = [
  { name: "Olivia Bennett", id: "PT-1042", age: 34, gender: "Female", condition: "Hypertension", status: "Active", last: "2 days ago", avatar: "/avatar-40-01.jpg" },
  { name: "James Carter", id: "PT-1043", age: 52, gender: "Male", condition: "Diabetes Type 2", status: "Active", last: "5 days ago", avatar: "/avatar-40-02.jpg" },
  { name: "Sophia Nguyen", id: "PT-1044", age: 28, gender: "Female", condition: "Asthma", status: "Stable", last: "1 week ago", avatar: "/avatar-40-03.jpg" },
  { name: "William Chen", id: "PT-1045", age: 41, gender: "Male", condition: "Post-op recovery", status: "Monitoring", last: "Yesterday", avatar: "/avatar-40-04.jpg" },
  { name: "Emma Rodriguez", id: "PT-1046", age: 63, gender: "Female", condition: "Arthritis", status: "Active", last: "3 days ago", avatar: "/avatar-40-05.jpg" },
];

const tint: Record<string, string> = {
  Active: "bg-emerald-500/10 text-emerald-600",
  Stable: "bg-sky-500/10 text-sky-600",
  Monitoring: "bg-amber-500/10 text-amber-600",
};

export default function Patients() {
  return (
    <ContentLayout title="Patients">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Patients</h2>
            <p className="mt-1 text-muted-foreground">Manage patient records</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search patients…" className="border-none bg-muted pl-9" />
            </div>
            <Button><Plus className="mr-2 h-4 w-4" /> Add patient</Button>
          </div>
        </div>

        {/* stat cards with gradient accent */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className={`relative overflow-hidden ${surface} p-5`}>
              <div className={`absolute right-0 top-0 h-20 w-20 rounded-full bg-gradient-to-br ${s.accent} opacity-15 blur-2xl`} />
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${s.accent} text-white`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-3xl font-semibold tabular-nums">{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Table */}
          <div className={`overflow-hidden ${surface}`}>
            <div className="flex items-center justify-between p-5">
              <SectionTitle title="All patients" />
            </div>
            <div className="hidden grid-cols-[2fr,1fr,1.5fr,1fr,1fr,auto] gap-4 border-y px-5 py-3 text-xs font-medium text-muted-foreground lg:grid">
              <span>Patient</span><span>Age / Gender</span><span>Condition</span><span>Status</span><span>Last visit</span><span></span>
            </div>
            {patients.map((p) => (
              <div key={p.id} className="grid grid-cols-1 gap-4 border-b px-5 py-4 transition-colors last:border-0 hover:bg-muted/40 lg:grid-cols-[2fr,1fr,1.5fr,1fr,1fr,auto] lg:items-center">
                <div className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.avatar} alt={p.name} className="h-9 w-9 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.id}</p>
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{p.age} · {p.gender}</span>
                <span className="text-sm">{p.condition}</span>
                <span><span className={`rounded-full px-2.5 py-1 text-1xs ${tint[p.status]}`}>{p.status}</span></span>
                <span className="text-sm text-muted-foreground">{p.last}</span>
                <div className="flex items-center gap-1">
                  <Button size="icon" variant="ghost" className="h-8 w-8"><Phone className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8"><Mail className="h-4 w-4" /></Button>
                  <Button size="icon" variant="ghost" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>

          {/* Right rail */}
          <aside className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-600 to-red-600 p-5 text-white">
              <div className="flex items-center gap-2">
                <HeartPulse className="h-5 w-5" />
                <p className="font-semibold">Critical watch</p>
              </div>
              <div className="mt-4 space-y-3">
                {critical.map((c) => (
                  <div key={c.name} className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.avatar} alt={c.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-white/30" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{c.name}</p>
                      <p className="truncate text-xs text-white/70">{c.cond}</p>
                    </div>
                    <span className="rounded-full bg-white/15 px-2 py-0.5 text-1xs">{c.room}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${surface} p-5`}>
              <SectionTitle title="By department" />
              <div className="mt-4 space-y-3">
                {[
                  { n: "Cardiology", v: 42, c: "bg-rose-500" },
                  { n: "Neurology", v: 31, c: "bg-violet-500" },
                  { n: "Orthopedics", v: 28, c: "bg-sky-500" },
                  { n: "Pediatrics", v: 25, c: "bg-emerald-500" },
                ].map((d) => (
                  <div key={d.n}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>{d.n}</span><span className="text-muted-foreground">{d.v}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div className={`h-full rounded-full ${d.c}`} style={{ width: `${d.v}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
