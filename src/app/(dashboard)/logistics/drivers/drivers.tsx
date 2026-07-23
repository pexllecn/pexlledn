"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Star, Phone, Plus, Truck, Trophy, MapPin } from "lucide-react";

const top = {
  name: "David Chen", id: "DRV-203", trips: 611, rating: 5.0, onTime: "99%", km: "182,400", avatar: "/avatar-40-03.jpg",
};

const drivers = [
  { name: "Miguel Santos", id: "DRV-201", trips: 482, rating: 4.9, status: "On route", vehicle: "TRK-9835", avatar: "/avatar-40-01.jpg", tint: "text-emerald-600 bg-emerald-500/10" },
  { name: "Anna Kowalski", id: "DRV-202", trips: 356, rating: 4.8, status: "Available", vehicle: "TRK-9834", avatar: "/avatar-40-02.jpg", tint: "text-sky-600 bg-sky-500/10" },
  { name: "Sara Lopez", id: "DRV-204", trips: 289, rating: 4.7, status: "On route", vehicle: "TRK-9831", avatar: "/avatar-40-04.jpg", tint: "text-emerald-600 bg-emerald-500/10" },
  { name: "Tom Becker", id: "DRV-205", trips: 174, rating: 4.6, status: "Off duty", vehicle: "—", avatar: "/avatar-40-05.jpg", tint: "bg-muted text-muted-foreground" },
  { name: "Priya Patel", id: "DRV-206", trips: 402, rating: 4.9, status: "Available", vehicle: "TRK-9830", avatar: "/avatar-32-01.jpg", tint: "text-sky-600 bg-sky-500/10" },
];

export default function Drivers() {
  return (
    <ContentLayout title="Drivers">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Drivers</h2>
            <p className="mt-1 text-muted-foreground">6 drivers · 4 currently on route</p>
          </div>
          <Button><Plus className="mr-2 h-4 w-4" /> Add driver</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {/* top driver spotlight */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white">
            <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
            <div className="relative">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
                <Trophy className="h-3.5 w-3.5" /> Driver of the month
              </span>
              <div className="mt-4 flex items-center gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={top.avatar} alt={top.name} className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/40" />
                <div>
                  <p className="text-xl font-semibold">{top.name}</p>
                  <p className="text-sm text-white/80">{top.id}</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-4 gap-3">
                {[
                  { v: top.trips, l: "Trips" },
                  { v: top.rating, l: "Rating" },
                  { v: top.onTime, l: "On-time" },
                  { v: top.km, l: "km" },
                ].map((s) => (
                  <div key={s.l} className="rounded-xl bg-white/10 p-3 text-center">
                    <p className="text-lg font-semibold tabular-nums">{s.v}</p>
                    <p className="text-1xs text-white/70">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* leaderboard */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="All drivers" />
            <div className="mt-4 space-y-2">
              {drivers.map((d, i) => (
                <div key={d.id} className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/50">
                  <span className="w-5 text-center text-sm font-bold text-muted-foreground tabular-nums">{i + 1}</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.avatar} alt={d.name} className="h-10 w-10 rounded-full object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{d.name}</p>
                    <p className="flex items-center gap-1 text-xs text-muted-foreground"><Truck className="h-3 w-3" /> {d.vehicle}</p>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-amber-500"><Star className="h-3.5 w-3.5 fill-current" /> {d.rating}</span>
                  <span className="hidden text-sm text-muted-foreground tabular-nums sm:inline">{d.trips}</span>
                  <span className={`rounded-full px-2.5 py-1 text-1xs ${d.tint}`}>{d.status}</span>
                  <Button size="icon" variant="ghost" className="h-8 w-8"><Phone className="h-4 w-4" /></Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
