"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  Segmented,
  Stat,
} from "../components/apple-ui";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Meter } from "../components/apple-charts";
import {
  Download,
  Gamepad2,
  Layers,
  Pencil,
  Star,
  Sparkles,
  TrendingUp,
  Wrench,
} from "lucide-react";

const featured = {
  seed: "ap-store-hero",
  kicker: "App of the Day",
  title: "Rings",
  sub: "Activity, redesigned around one gesture",
};

const apps = [
  { seed: "ap-a1", name: "Halide Mark III", cat: "Photo & Video", price: "$19.99", rating: 4.8, tint: A.blue },
  { seed: "ap-a2", name: "Craft Docs", cat: "Productivity", price: "Get", rating: 4.7, tint: A.purple },
  { seed: "ap-a3", name: "Bear Notes", cat: "Productivity", price: "Get", rating: 4.9, tint: A.pink },
  { seed: "ap-a4", name: "Procreate Dreams", cat: "Graphics", price: "$24.99", rating: 4.6, tint: A.orange },
  { seed: "ap-a5", name: "Things 3", cat: "Productivity", price: "$9.99", rating: 4.8, tint: A.teal },
  { seed: "ap-a6", name: "Overcast", cat: "Podcasts", price: "Get", rating: 4.5, tint: A.lime },
];

const charts = [
  { n: 1, name: "Rings", cat: "Health & Fitness", price: "Get", inApp: true, tint: A.pink },
  { n: 2, name: "Motion Kit", cat: "Developer Tools", price: "$14.99", tint: A.purple },
  { n: 3, name: "Tokens", cat: "Design", price: "Get", inApp: true, tint: A.blue },
  { n: 4, name: "Field Notes", cat: "Productivity", price: "$4.99", tint: A.orange },
  { n: 5, name: "Tide", cat: "Weather", price: "Get", tint: A.teal },
  { n: 6, name: "Grain", cat: "Photo & Video", price: "$7.99", tint: A.lime },
];

const categories = [
  { icon: <Sparkles className="h-4 w-4" />, label: "Discover", tint: A.purple },
  { icon: <Gamepad2 className="h-4 w-4" />, label: "Games", tint: A.blue },
  { icon: <Pencil className="h-4 w-4" />, label: "Create", tint: A.pink },
  { icon: <Wrench className="h-4 w-4" />, label: "Work", tint: A.orange },
  { icon: <Layers className="h-4 w-4" />, label: "Design", tint: A.teal },
  { icon: <TrendingUp className="h-4 w-4" />, label: "Trending", tint: A.lime },
];

const updates = [
  { seed: "ap-u1", name: "Rings", version: "3.2.0", note: "Rounded ring caps, wrap-around goals, and a redesigned weekly summary.", size: "48.2 MB", progress: 68 },
  { seed: "ap-u2", name: "Motion Kit", version: "1.9.4", note: "New spring presets and a curve editor that respects reduced motion.", size: "22.6 MB", progress: 100 },
  { seed: "ap-u3", name: "Tokens", version: "3.0.1", note: "Dark-mode ramp fixes and a smaller runtime.", size: "12.1 MB", progress: 24 },
];

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3 w-3 ${
            s <= Math.round(rating)
              ? "fill-[#FF9F0A] text-[#FF9F0A]"
              : "text-muted-foreground/40"
          }`}
        />
      ))}
      <span className="ml-1 text-xs tabular-nums text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export default function Store() {
  return (
    <AppleShell
      title="App Store"
      action="Redeem"
      actionIcon={<Download className="h-4 w-4" />}
      aside={<Segmented options={["Today", "Apps", "Arcade"]} value="Today" />}
    >
      <div className="min-w-0 space-y-4">
        {/* Hero */}
        <div className="relative overflow-hidden rounded-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/${featured.seed}/1400/520`}
            alt={featured.title}
            className="h-[300px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
              {featured.kicker}
            </p>
            <h2 className="mt-2 text-4xl font-semibold leading-none tracking-tight text-white">
              {featured.title}
            </h2>
            <p className="mt-2 max-w-md text-base text-white/75">{featured.sub}</p>
            <Button variant="outline3" className="mt-5 rounded-full bg-white px-5 py-2 text-neutral-900">
              Get
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Stat icon={<Download className="h-4 w-4" />} label="Installs" value="128" delta={9.6} />
          <Stat icon={<Star className="h-4 w-4" />} label="Average rating" value="4.7" delta={1.4} />
          <Stat icon={<Layers className="h-4 w-4" />} label="Subscriptions" value="6" hint="$38.94 / month" />
          <Stat icon={<TrendingUp className="h-4 w-4" />} label="Updates ready" value="3" hint="82.9 MB total" />
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {categories.map((c) => (
            <Card
              key={c.label}
              className="flex items-center gap-3 p-4 transition-colors hover:bg-muted/50"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: c.tint }}
              >
                {c.icon}
              </span>
              <span className="truncate text-sm font-medium text-foreground">
                {c.label}
              </span>
            </Card>
          ))}
        </div>

        {/* Apps + charts */}
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <Card className="min-w-0 p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-base font-semibold tracking-tight text-foreground">
                Essential apps
              </p>
              <Button variant="link" className="text-primary">
                See all
              </Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {apps.map((a) => (
                <div key={a.seed} className="group">
                  <div className="overflow-hidden rounded-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${a.seed}/300/300`}
                      alt={a.name}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2.5 truncate text-base font-medium text-foreground">
                    {a.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">{a.cat}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <Stars rating={a.rating} />
                    <Button variant="secondary" className="rounded-full px-3 py-1 text-primary">
                      {a.price}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="min-w-0 space-y-4">
            <Card className="min-w-0 p-5">
              <Tabs defaultValue="Top Free">
                <TabsList className="mb-3 h-9">
                  {["Top Free", "Top Paid"].map((t) => (
                    <TabsTrigger key={t} value={t} className="text-xs">
                      {t}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {["Top Free", "Top Paid"].map((t) => (
                  <TabsContent key={t} value={t}>
                    {charts.map((c, i) => (
                      <React.Fragment key={c.name}>
                        {i > 0 && <Separator className="ml-11 w-auto" />}
                        <div className="flex items-center gap-3 py-2.5">
                          <span className="w-4 text-sm tabular-nums text-muted-foreground">
                            {c.n}
                          </span>
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white"
                            style={{ backgroundColor: c.tint }}
                          >
                            <Sparkles className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-base font-medium text-foreground">
                              {c.name}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                              {c.cat}
                              {c.inApp ? " · In-App Purchases" : ""}
                            </p>
                          </div>
                          <Button variant="secondary" className="shrink-0 rounded-full px-3 py-1 text-primary">
                            {c.price}
                          </Button>
                        </div>
                      </React.Fragment>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </Card>

            <Card className="min-w-0 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <p className="text-base font-medium text-foreground">
                  Available updates
                </p>
                <Button variant="link" className="text-primary">
                  Update all
                </Button>
              </div>
              <Separator />
              {updates.map((u, i) => (
                <React.Fragment key={u.name}>
                  {i > 0 && <Separator className="ml-16 w-auto" />}
                  <div className="flex gap-3 px-5 py-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${u.seed}/120/120`}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-base font-medium text-foreground">
                          {u.name}
                        </p>
                        <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                          {u.size}
                        </span>
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-xs leading-snug text-muted-foreground">
                        Version {u.version} — {u.note}
                      </p>
                      <Meter
                        className="mt-2"
                        pct={u.progress}
                        color={u.progress === 100 ? A.green : A.blue}
                      />
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </AppleShell>
  );
}
