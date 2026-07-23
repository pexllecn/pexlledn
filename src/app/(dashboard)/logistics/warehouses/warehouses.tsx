"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Warehouse, MapPin, Package, Plus, Users, Boxes } from "lucide-react";

const totals = [
  { label: "Facilities", value: "4", icon: Warehouse },
  { label: "Items stored", value: "44,730", icon: Boxes },
  { label: "Staff", value: "144", icon: Users },
  { label: "Avg capacity", value: "64%", icon: Package },
];

const warehouses = [
  { name: "West Hub", city: "Los Angeles, CA", capacity: 78, items: "12,480", staff: 42, seed: "wh-1", status: "Operational", tint: "text-emerald-600 bg-emerald-500/10", ring: "stroke-emerald-500" },
  { name: "Central Depot", city: "Denver, CO", capacity: 54, items: "8,210", staff: 28, seed: "wh-2", status: "Operational", tint: "text-emerald-600 bg-emerald-500/10", ring: "stroke-sky-500" },
  { name: "North Terminal", city: "Portland, OR", capacity: 91, items: "18,900", staff: 55, seed: "wh-3", status: "Near full", tint: "text-amber-600 bg-amber-500/10", ring: "stroke-amber-500" },
  { name: "East Yard", city: "Newark, NJ", capacity: 33, items: "5,140", staff: 19, seed: "wh-4", status: "Operational", tint: "text-emerald-600 bg-emerald-500/10", ring: "stroke-violet-500" },
];

function Radial({ value, ring }: { value: number; ring: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={r} className="fill-none stroke-muted" strokeWidth="6" />
        <circle cx="32" cy="32" r={r} className={`fill-none ${ring}`} strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c - (value / 100) * c} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold tabular-nums">{value}%</span>
    </div>
  );
}

export default function Warehouses() {
  return (
    <ContentLayout title="Warehouses">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Warehouses</h2>
            <p className="mt-1 text-muted-foreground">4 facilities · 44,730 items stored</p>
          </div>
          <Button><Plus className="mr-2 h-4 w-4" /> Add facility</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {totals.map((s) => (
            <div key={s.label} className={`${surface} flex items-center gap-3 p-5`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-semibold leading-none tabular-nums">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        <SectionTitle title="Facilities" />
        <div className="grid gap-6 md:grid-cols-2">
          {warehouses.map((w) => (
            <div key={w.name} className={`overflow-hidden ${surface}`}>
              <div className="flex">
                <div className="relative w-36 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://picsum.photos/seed/${w.seed}/240/360`} alt={w.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="flex items-center gap-2 font-semibold"><Warehouse className="h-4 w-4" /> {w.name}</p>
                      <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="h-3 w-3" /> {w.city}</p>
                    </div>
                    <span className={`rounded-full px-2.5 py-1 text-1xs ${w.tint}`}>{w.status}</span>
                  </div>
                  <div className="mt-4 flex items-center gap-4">
                    <Radial value={w.capacity} ring={w.ring} />
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p className="flex items-center gap-1.5"><Package className="h-4 w-4" /> {w.items} items</p>
                      <p className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {w.staff} staff</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
