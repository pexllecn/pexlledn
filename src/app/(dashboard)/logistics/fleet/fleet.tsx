"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Truck, Fuel, Gauge, Wrench, Plus, MapPin, Navigation } from "lucide-react";

const stats = [
  { label: "Total vehicles", value: "48", icon: Truck },
  { label: "On route", value: "31", icon: Navigation },
  { label: "In maintenance", value: "4", icon: Wrench },
  { label: "Avg fuel", value: "72%", icon: Fuel },
];

const fleet = [
  { id: "TRK-9835", model: "Volvo FH16", driver: "Miguel Santos", status: "On route", fuel: 82, mileage: "142,500 km", tint: "text-emerald-600 bg-emerald-500/10", ring: "stroke-emerald-500" },
  { id: "TRK-9834", model: "Scania R500", driver: "Anna Kowalski", status: "Idle", fuel: 45, mileage: "98,200 km", tint: "text-amber-600 bg-amber-500/10", ring: "stroke-amber-500" },
  { id: "TRK-9833", model: "MAN TGX", driver: "Unassigned", status: "Maintenance", fuel: 20, mileage: "210,800 km", tint: "text-rose-600 bg-rose-500/10", ring: "stroke-rose-500" },
  { id: "TRK-9832", model: "Mercedes Actros", driver: "David Chen", status: "On route", fuel: 91, mileage: "56,400 km", tint: "text-emerald-600 bg-emerald-500/10", ring: "stroke-emerald-500" },
  { id: "TRK-9831", model: "DAF XF", driver: "Sara Lopez", status: "On route", fuel: 63, mileage: "121,900 km", tint: "text-emerald-600 bg-emerald-500/10", ring: "stroke-emerald-500" },
  { id: "TRK-9830", model: "Iveco S-Way", driver: "Unassigned", status: "Idle", fuel: 38, mileage: "88,000 km", tint: "text-amber-600 bg-amber-500/10", ring: "stroke-amber-500" },
];

function Gaugelet({ value, ring }: { value: number; ring: string }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-14 w-14 shrink-0">
      <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90">
        <circle cx="24" cy="24" r={r} className="fill-none stroke-muted" strokeWidth="5" />
        <circle cx="24" cy="24" r={r} className={`fill-none ${ring}`} strokeWidth="5" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (value / 100) * c} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold tabular-nums">{value}</span>
    </div>
  );
}

export default function Fleet() {
  return (
    <ContentLayout title="Fleet">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Fleet</h2>
            <p className="mt-1 text-muted-foreground">Manage your vehicles</p>
          </div>
          <Button><Plus className="mr-2 h-4 w-4" /> Add vehicle</Button>
        </div>

        {/* live overview hero */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 p-6 text-white sm:p-8 dark:from-slate-900 dark:to-black">
          <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_85%_30%,#38bdf8,transparent_40%),radial-gradient(circle_at_15%_80%,#22c55e,transparent_35%)]" />
          <div className="relative flex flex-wrap items-center justify-between gap-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs">
                <MapPin className="h-3.5 w-3.5 text-sky-300" /> Live · updated 12s ago
              </span>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">31 vehicles on the road</h3>
              <p className="mt-1 text-sm text-white/70">Covering 8 regions · 142 active deliveries today</p>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <s.icon className="h-4 w-4" />
                  </div>
                  <p className="mt-2 text-xl font-semibold tabular-nums">{s.value}</p>
                  <p className="text-1xs text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionTitle title="Vehicles" subtitle="48 in the fleet" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {fleet.map((f) => (
            <div key={f.id} className={`${surface} p-5`}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">{f.id}</p>
                    <p className="text-xs text-muted-foreground">{f.model}</p>
                  </div>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-1xs ${f.tint}`}>{f.status}</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <Gaugelet value={f.fuel} ring={f.ring} />
                <div className="flex-1">
                  <p className="flex items-center gap-1 text-xs text-muted-foreground"><Fuel className="h-3.5 w-3.5" /> Fuel level</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><Gauge className="h-3.5 w-3.5" /> {f.mileage}</p>
                  <p className="mt-1 text-sm font-medium">{f.driver}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
