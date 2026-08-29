"use client";

import * as React from "react";
import {
  AppleShell,
  A,
  Hair,
  Segmented,
  Stat,
  Surface,
  UnderlineTabs,
} from "../components/apple-ui";
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
      <span className="ml-1 text-[11px] tabular-nums text-muted-foreground">
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
        <div className="relative overflow-hidden rounded-[22px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://picsum.photos/seed/${featured.seed}/1400/520`}
            alt={featured.title}
            className="h-[300px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-7">
            <p className="text-[12px] font-semibold uppercase tracking-wider text-white/70">
              {featured.kicker}
            </p>
            <h2 className="mt-2 text-[36px] font-semibold leading-none tracking-[-0.03em] text-white">
              {featured.title}
            </h2>
            <p className="mt-2 max-w-md text-[14px] text-white/75">{featured.sub}</p>
            <button className="mt-5 rounded-full bg-white px-5 py-2 text-[13px] font-semibold text-neutral-900 transition-opacity hover:opacity-90">
              Get
            </button>
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
            <Surface
              key={c.label}
              className="flex items-center gap-3 p-4 transition-colors hover:bg-black/[0.015] dark:hover:bg-white/[0.05]"
            >
              <span
                className="flex h-9 w-9 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: c.tint }}
              >
                {c.icon}
              </span>
              <span className="truncate text-[13px] font-medium text-foreground">
                {c.label}
              </span>
            </Surface>
          ))}
        </div>

        {/* Apps + charts */}
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
          <Surface className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">
                Essential apps
              </p>
              <button className="text-[13px] font-medium text-[#0A6CFF] hover:underline">
                See all
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {apps.map((a) => (
                <div key={a.seed} className="group">
                  <div className="overflow-hidden rounded-[20px]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${a.seed}/300/300`}
                      alt={a.name}
                      className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-2.5 truncate text-[14px] font-medium text-foreground">
                    {a.name}
                  </p>
                  <p className="truncate text-[12px] text-muted-foreground">{a.cat}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <Stars rating={a.rating} />
                    <button className="rounded-full bg-black/[0.06] px-3 py-1 text-[12px] font-semibold text-[#0A6CFF] transition-colors hover:bg-black/[0.1] dark:bg-white/[0.08] dark:hover:bg-white/[0.14]">
                      {a.price}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Surface>

          <div className="min-w-0 space-y-4">
            <Surface className="p-5">
              <UnderlineTabs tabs={["Top Free", "Top Paid"]}>
                {() => (
                  <div className="mt-3">
                    {charts.map((c, i) => (
                      <React.Fragment key={c.name}>
                        {i > 0 && <Hair className="ml-11" />}
                        <div className="flex items-center gap-3 py-2.5">
                          <span className="w-4 text-[13px] tabular-nums text-muted-foreground">
                            {c.n}
                          </span>
                          <span
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] text-white"
                            style={{ backgroundColor: c.tint }}
                          >
                            <Sparkles className="h-4 w-4" />
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[14px] font-medium text-foreground">
                              {c.name}
                            </p>
                            <p className="truncate text-[12px] text-muted-foreground">
                              {c.cat}
                              {c.inApp ? " · In-App Purchases" : ""}
                            </p>
                          </div>
                          <button className="shrink-0 rounded-full bg-black/[0.06] px-3 py-1 text-[12px] font-semibold text-[#0A6CFF] transition-colors hover:bg-black/[0.1] dark:bg-white/[0.08] dark:hover:bg-white/[0.14]">
                            {c.price}
                          </button>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                )}
              </UnderlineTabs>
            </Surface>

            <Surface className="overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <p className="text-[14px] font-medium text-foreground">
                  Available updates
                </p>
                <button className="text-[13px] font-medium text-[#0A6CFF] hover:underline">
                  Update all
                </button>
              </div>
              <Hair />
              {updates.map((u, i) => (
                <React.Fragment key={u.name}>
                  {i > 0 && <Hair className="ml-16" />}
                  <div className="flex gap-3 px-5 py-3.5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://picsum.photos/seed/${u.seed}/120/120`}
                      alt=""
                      className="h-11 w-11 shrink-0 rounded-[11px] object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <p className="truncate text-[14px] font-medium text-foreground">
                          {u.name}
                        </p>
                        <span className="shrink-0 text-[11px] tabular-nums text-muted-foreground">
                          {u.size}
                        </span>
                      </div>
                      <p className="mt-0.5 line-clamp-2 text-[12px] leading-snug text-muted-foreground">
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
            </Surface>
          </div>
        </div>
      </div>
    </AppleShell>
  );
}
