"use client";

import { useState } from "react";
import { Cinema, Label, card } from "../components/media-ui";
import {
  Play,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
  Bell,
  CheckCircle2,
} from "lucide-react";

const chips = ["All", "Music", "Live", "Gaming", "Nature", "Coding", "Travel", "Podcasts", "News"];

const main = {
  title: "Aurora Borealis in 4K — A Night Under the Northern Lights",
  channel: "Wild Frame",
  subs: "2.4M",
  views: "1,284,552",
  when: "3 days ago",
  seed: "vid-main",
};

const upNext = [
  { title: "Milky Way Timelapse over the Alps", channel: "Wild Frame", views: "842K", len: "12:04", seed: "vid-1" },
  { title: "Lofi Beats to Focus — 3 Hour Mix", channel: "Neon Fields", views: "5.1M", len: "3:02:10", seed: "vid-2" },
  { title: "How Great Interfaces Are Built", channel: "Designly", views: "312K", len: "18:47", seed: "vid-3" },
  { title: "Coastal Drone Cinematics", channel: "SkyLine", views: "998K", len: "08:22", seed: "vid-4" },
  { title: "The Art of Slow Living", channel: "Kinfolk", views: "221K", len: "22:15", seed: "vid-5" },
  { title: "Deep Ocean — Bioluminescence", channel: "BlueWorld", views: "1.9M", len: "15:33", seed: "vid-6" },
];

const more = [
  { title: "Sunrise over Patagonia", channel: "SkyLine", views: "421K", len: "09:12", seed: "vid-r1" },
  { title: "Building a Design System", channel: "Designly", views: "188K", len: "24:03", seed: "vid-r2" },
  { title: "Rainforest Sounds — 2 Hours", channel: "BlueWorld", views: "2.3M", len: "2:00:00", seed: "vid-r3" },
  { title: "Street Food in Tokyo", channel: "Kinfolk", views: "760K", len: "16:40", seed: "vid-r4" },
];

export default function Videos() {
  const [chip, setChip] = useState("All");
  const [liked, setLiked] = useState(false);
  const [sub, setSub] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <Cinema title="Videos">
      {/* chips */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setChip(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              chip === c
                ? "bg-orange-500 text-white"
                : "border border-border text-muted-foreground hover:bg-muted dark:hover:bg-white/5"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* theater (always-dark media) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="group relative aspect-video overflow-hidden rounded-3xl bg-black">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${main.seed}/1280/720`}
              alt={main.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
              <span className="select-none text-3xl font-extrabold uppercase tracking-tight text-white/10 sm:text-5xl">
                Northern Lights
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={() => setPlaying((p) => !p)}
                className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 text-black shadow-2xl transition-transform group-hover:scale-105"
              >
                <Play className="ml-1 h-8 w-8 fill-current" />
              </button>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="h-1.5 w-full rounded-full bg-white/25">
                <div className="h-full w-1/3 rounded-full bg-orange-500" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-semibold leading-snug tracking-tight text-foreground">
              {main.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {main.views} views · {main.when}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/avatar-40-01.jpg" alt={main.channel} className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-semibold text-foreground">
                  {main.channel}
                  <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                </p>
                <p className="text-xs text-muted-foreground">{main.subs} subscribers</p>
              </div>
              <button
                onClick={() => setSub((s) => !s)}
                className={`ml-2 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                  sub ? "bg-muted text-foreground hover:bg-muted/70 dark:bg-white/10 dark:hover:bg-white/20" : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
              >
                {sub ? (
                  <span className="flex items-center gap-2">
                    <Bell className="h-4 w-4" /> Subscribed
                  </span>
                ) : (
                  "Subscribe"
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-full border border-border">
                <button
                  onClick={() => setLiked((l) => !l)}
                  className="flex items-center gap-1.5 rounded-l-full px-4 py-2 text-sm text-foreground hover:bg-muted dark:hover:bg-white/5"
                >
                  <ThumbsUp className={`h-4 w-4 ${liked ? "fill-orange-500 text-orange-500" : ""}`} /> 12K
                </button>
                <span className="h-5 w-px bg-border" />
                <button className="rounded-r-full px-3 py-2 text-foreground hover:bg-muted dark:hover:bg-white/5">
                  <ThumbsDown className="h-4 w-4" />
                </button>
              </div>
              <button className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground hover:bg-muted dark:hover:bg-white/5">
                <Share2 className="h-4 w-4" /> Share
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted dark:hover:bg-white/5">
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className={`${card} p-4`}>
            <div className="mb-2 flex flex-wrap gap-2">
              {["#nature", "#4k", "#relax"].map((t) => (
                <span key={t} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground dark:bg-white/5">
                  {t}
                </span>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Filmed across three nights in the Arctic Circle — a quiet
              celebration of the northern lights. Shot in 4K with no music,
              just the wind and the sky.
            </p>
          </div>
        </div>

        {/* up next */}
        <div>
          <Label action={null}>Up next</Label>
          <div className="space-y-3">
            {upNext.map((v) => (
              <div key={v.seed} className="group flex cursor-pointer gap-3 rounded-xl p-1.5 transition-colors hover:bg-muted/60 dark:hover:bg-white/[0.03]">
                <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://picsum.photos/seed/${v.seed}/320/180`}
                    alt={v.title}
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-1xs tabular-nums text-white">
                    {v.len}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-sm font-medium leading-snug text-foreground">{v.title}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{v.channel}</p>
                  <p className="text-xs text-muted-foreground">{v.views} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* recommendations */}
      <div className="mt-8">
        <Label action="See all">Recommended for you</Label>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {more.map((v) => (
            <div key={v.seed} className="group cursor-pointer">
              <div className="relative aspect-video overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${v.seed}/400/225`}
                  alt={v.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 py-0.5 text-1xs tabular-nums text-white">
                  {v.len}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug text-foreground">{v.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{v.channel} · {v.views} views</p>
            </div>
          ))}
        </div>
      </div>
    </Cinema>
  );
}
