"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, PackageCheck, Truck, Warehouse, CircleDot, Clock, Weight } from "lucide-react";

const timeline = [
  { icon: PackageCheck, title: "Order picked up", place: "Los Angeles, CA", time: "Feb 27, 8:00 AM", done: true },
  { icon: Warehouse, title: "Arrived at sorting hub", place: "Bakersfield, CA", time: "Feb 27, 2:15 PM", done: true },
  { icon: Truck, title: "In transit", place: "Fresno, CA", time: "Feb 28, 9:40 AM", done: true, active: true },
  { icon: Warehouse, title: "Out for delivery", place: "Thousand Oaks, CA", time: "Est. Feb 28, 4:00 PM", done: false },
  { icon: MapPin, title: "Delivered", place: "2401 Thousand Oaks Blvd", time: "Est. Feb 28, 6:00 PM", done: false },
];

export default function Tracking() {
  return (
    <ContentLayout title="Tracking">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Track shipment</h2>
            <p className="mt-1 text-muted-foreground">Load #9835 · Delivery</p>
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Enter tracking number…" className="border-none bg-muted pl-9" />
          </div>
        </div>

        {/* detail chips */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: Truck, l: "Carrier", v: "SwiftHaul · TRK-9835" },
            { icon: Weight, l: "Weight", v: "1,240 kg · 18 pallets" },
            { icon: Clock, l: "ETA", v: "Feb 28, 6:00 PM", accent: true },
          ].map((d) => (
            <div key={d.l} className={`${surface} flex items-center gap-3 p-4`}>
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${d.accent ? "bg-emerald-500/10 text-emerald-600" : "bg-muted text-muted-foreground"}`}>
                <d.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{d.l}</p>
                <p className="text-sm font-medium">{d.v}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* map */}
          <div className={`relative overflow-hidden ${surface}`}>
            <div className="relative h-[460px] w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://picsum.photos/seed/logi-map/900/900" alt="Map" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              {/* route markers */}
              <span className="absolute left-[18%] top-[30%] flex h-4 w-4 items-center justify-center rounded-full bg-white shadow"><span className="h-2 w-2 rounded-full bg-slate-800" /></span>
              <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg ring-4 ring-emerald-500/30">
                <Truck className="h-5 w-5" />
              </span>
              <span className="absolute right-[16%] bottom-[22%] flex h-4 w-4 items-center justify-center rounded-full bg-white shadow"><MapPin className="h-3 w-3 text-rose-500" /></span>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl bg-background/90 p-4 backdrop-blur">
                <div>
                  <p className="text-sm font-medium">On the way to Thousand Oaks</p>
                  <p className="text-xs text-muted-foreground">142 km remaining · ~2h 10m</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600">On time</span>
              </div>
            </div>
          </div>

          {/* timeline */}
          <div className={`${surface} p-6`}>
            <SectionTitle title="Progress" />
            <div className="relative mt-5 space-y-6 pl-2">
              {timeline.map((t, i) => (
                <div key={t.title} className="relative flex gap-4">
                  {i < timeline.length - 1 && (
                    <span className={`absolute left-[19px] top-10 h-[calc(100%-8px)] w-0.5 ${t.done ? "bg-emerald-500" : "bg-border"}`} />
                  )}
                  <div className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${t.done ? "bg-emerald-500 text-white" : "bg-muted text-muted-foreground"}`}>
                    <t.icon className="h-4 w-4" />
                  </div>
                  <div className="pt-1">
                    <p className="flex items-center gap-2 text-sm font-medium">
                      {t.title}
                      {t.active && <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-1xs text-emerald-600"><CircleDot className="h-3 w-3" /> Now</span>}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.place}</p>
                    <p className="text-xs text-muted-foreground">{t.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-6 w-full rounded-full">Contact driver</Button>
          </div>
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
