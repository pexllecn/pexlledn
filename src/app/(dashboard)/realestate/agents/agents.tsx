"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { FadeIn, SectionTitle, surface } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Star, Home, Phone, Mail, Plus, Trophy, DollarSign } from "lucide-react";

const top = {
  name: "Jenny Wilson", area: "Waterfront", listings: 31, sold: 176, rating: 5.0, volume: "$48M", avatar: "/avatar-40-03.jpg",
};

const agents = [
  { name: "Savannah Nguyen", area: "Downtown & Midtown", listings: 24, sold: 142, rating: 4.9, avatar: "/avatar-40-01.jpg", tag: "Top producer", tint: "text-amber-600 bg-amber-500/10" },
  { name: "Ralph Edwards", area: "Suburban North", listings: 18, sold: 98, rating: 4.7, avatar: "/avatar-40-02.jpg", tag: "Luxury", tint: "text-violet-600 bg-violet-500/10" },
  { name: "Devon Lane", area: "Commercial", listings: 12, sold: 64, rating: 4.6, avatar: "/avatar-40-04.jpg", tag: "Commercial", tint: "text-sky-600 bg-sky-500/10" },
  { name: "Courtney Henry", area: "East Side", listings: 27, sold: 121, rating: 4.8, avatar: "/avatar-40-05.jpg", tag: "Rentals", tint: "text-emerald-600 bg-emerald-500/10" },
  { name: "Marvin McKinney", area: "Historic District", listings: 15, sold: 87, rating: 4.7, avatar: "/avatar-32-01.jpg", tag: "Luxury", tint: "text-violet-600 bg-violet-500/10" },
];

export default function Agents() {
  return (
    <ContentLayout title="Agents">
      <FadeIn>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Agents</h2>
            <p className="mt-1 text-muted-foreground">Your brokerage team · 6 agents</p>
          </div>
          <Button><Plus className="mr-2 h-4 w-4" /> Add agent</Button>
        </div>

        {/* top agent */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 to-pink-600 p-6 text-white sm:p-8">
          <div className="pointer-events-none absolute -right-8 -top-8 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
          <div className="relative flex flex-wrap items-center gap-6">
            <img src={top.avatar} alt={top.name} className="h-20 w-20 rounded-2xl object-cover ring-2 ring-white/40" />
            <div className="min-w-0 flex-1">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium"><Trophy className="h-3.5 w-3.5" /> Top agent</span>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight">{top.name}</h3>
              <p className="text-sm text-white/80">{top.area}</p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[
                { v: top.rating, l: "Rating" },
                { v: top.listings, l: "Active" },
                { v: top.sold, l: "Sold" },
                { v: top.volume, l: "Volume" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-white/10 p-3 text-center">
                  <p className="text-lg font-semibold tabular-nums">{s.v}</p>
                  <p className="text-1xs text-white/70">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <SectionTitle title="All agents" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((a) => (
            <div key={a.name} className={`${surface} p-6 text-center`}>
              <div className="relative mx-auto w-fit">
                <img src={a.avatar} alt={a.name} className="h-20 w-20 rounded-2xl object-cover" />
                <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-2.5 py-0.5 text-1xs font-medium ${a.tint}`}>{a.tag}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold">{a.name}</h3>
              <p className="text-sm text-muted-foreground">{a.area}</p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="rounded-lg bg-muted/50 py-2">
                  <p className="flex items-center justify-center gap-1 text-sm font-semibold"><Home className="h-3.5 w-3.5" /> {a.listings}</p>
                  <p className="text-1xs text-muted-foreground">Active</p>
                </div>
                <div className="rounded-lg bg-muted/50 py-2">
                  <p className="flex items-center justify-center gap-1 text-sm font-semibold"><DollarSign className="h-3.5 w-3.5" /> {a.sold}</p>
                  <p className="text-1xs text-muted-foreground">Sold</p>
                </div>
                <div className="rounded-lg bg-muted/50 py-2">
                  <p className="flex items-center justify-center gap-1 text-sm font-semibold text-amber-500"><Star className="h-3.5 w-3.5 fill-current" /> {a.rating}</p>
                  <p className="text-1xs text-muted-foreground">Rating</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="outline" className="flex-1 rounded-full"><Phone className="mr-1.5 h-4 w-4" /> Call</Button>
                <Button size="sm" variant="outline" className="flex-1 rounded-full"><Mail className="mr-1.5 h-4 w-4" /> Email</Button>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>
    </ContentLayout>
  );
}
