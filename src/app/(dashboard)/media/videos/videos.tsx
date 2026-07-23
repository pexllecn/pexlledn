"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Play,
  Share2,
  ThumbsDown,
  ThumbsUp,
  Bookmark,
  CheckCircle2,
} from "lucide-react";
import { MediaPage, SectionHeading, glass } from "../components/media-ui";

const chips = [
  "All",
  "Music",
  "Live",
  "Gaming",
  "Nature",
  "Coding",
  "Travel",
  "Podcasts",
  "News",
  "Design",
];

const main = {
  title: "Aurora Borealis in 4K — A Night Under the Northern Lights",
  channel: "Wild Frame",
  subs: "2.4M",
  views: "1,284,552",
  when: "3 days ago",
  seed: "vid-main",
  avatar: "/avatar-40-01.jpg",
};

const upNext = [
  { title: "Milky Way Timelapse over the Alps", channel: "Wild Frame", views: "842K", len: "12:04", when: "1 week ago", seed: "vid-1" },
  { title: "Lofi Beats to Focus — 3 Hour Mix", channel: "Neon Fields", views: "5.1M", len: "3:02:10", when: "2 months ago", seed: "vid-2" },
  { title: "How Great Interfaces Are Built", channel: "Designly", views: "312K", len: "18:47", when: "5 days ago", seed: "vid-3" },
  { title: "Coastal Drone Cinematics", channel: "SkyLine", views: "998K", len: "08:22", when: "3 weeks ago", seed: "vid-4" },
  { title: "The Art of Slow Living", channel: "Kinfolk", views: "221K", len: "22:15", when: "1 month ago", seed: "vid-5" },
  { title: "Deep Ocean — Bioluminescence", channel: "BlueWorld", views: "1.9M", len: "15:33", when: "6 days ago", seed: "vid-6" },
];

const recommended = [
  { title: "Sunrise over Patagonia", channel: "SkyLine", views: "421K", len: "09:12", seed: "vid-r1" },
  { title: "Building a Design System", channel: "Designly", views: "188K", len: "24:03", seed: "vid-r2" },
  { title: "Rainforest Sounds — 2 Hours", channel: "BlueWorld", views: "2.3M", len: "2:00:00", seed: "vid-r3" },
  { title: "Street Food in Tokyo", channel: "Kinfolk", views: "760K", len: "16:40", seed: "vid-r4" },
  { title: "Northern Lights Explained", channel: "Wild Frame", views: "512K", len: "11:27", seed: "vid-r5" },
  { title: "Analog Photography Guide", channel: "Frame & Grain", views: "143K", len: "19:55", seed: "vid-r6" },
  { title: "A Quiet Morning Routine", channel: "Slow", views: "298K", len: "07:33", seed: "vid-r7" },
  { title: "Cities at Night — 4K", channel: "SkyLine", views: "1.1M", len: "13:18", seed: "vid-r8" },
];

export default function Videos() {
  const [chip, setChip] = useState("All");
  const [liked, setLiked] = useState(false);
  const [sub, setSub] = useState(false);

  return (
    <MediaPage title="Videos">
      {/* Category chips */}
      <div className="no-scrollbar -mt-2 flex gap-2 overflow-x-auto pb-1">
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setChip(c)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              chip === c
                ? "bg-violet-600 text-white"
                : "border bg-card hover:bg-muted"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main player */}
        <div className="lg:col-span-2 space-y-4">
          <div className="group relative aspect-video overflow-hidden rounded-2xl bg-black border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${main.seed}/1280/720`}
              alt={main.title}
              className="h-full w-full object-cover opacity-90"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-black transition-transform group-hover:scale-105">
                <Play className="h-8 w-8 fill-current" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="h-1.5 w-full rounded-full bg-white/30">
                <div className="h-full w-1/3 rounded-full bg-red-500" />
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-semibold leading-snug tracking-tight">
              {main.title}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {main.views} views · {main.when}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-11 w-11">
                <AvatarImage src={main.avatar} alt={main.channel} />
                <AvatarFallback>WF</AvatarFallback>
              </Avatar>
              <div>
                <p className="flex items-center gap-1 text-sm font-semibold">
                  {main.channel}
                  <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                </p>
                <p className="text-xs text-muted-foreground">
                  {main.subs} subscribers
                </p>
              </div>
              <Button
                onClick={() => setSub((s) => !s)}
                className={
                  sub
                    ? "ml-2 rounded-full bg-muted text-foreground hover:bg-muted/70"
                    : "ml-2 rounded-full bg-rose-500 text-white hover:bg-rose-600"
                }
              >
                {sub ? (
                  <>
                    <Bell className="mr-2 h-4 w-4" /> Subscribed
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-full border bg-card">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLiked((l) => !l)}
                  className="rounded-l-full"
                >
                  <ThumbsUp className={`mr-1.5 h-4 w-4 ${liked ? "fill-current" : ""}`} />
                  12K
                </Button>
                <div className="h-5 w-px bg-border" />
                <Button variant="ghost" size="sm" className="rounded-r-full">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
              <Button variant="ghost" size="sm" className="rounded-full border bg-card">
                <Share2 className="mr-1.5 h-4 w-4" /> Share
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full border bg-card">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className={`${glass} p-4`}>
            <div className="mb-2 flex flex-wrap gap-2">
              <Badge variant="secondary" className="rounded-full">#nature</Badge>
              <Badge variant="secondary" className="rounded-full">#4k</Badge>
              <Badge variant="secondary" className="rounded-full">#relax</Badge>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Filmed across three nights in the Arctic Circle, this is a quiet
              celebration of the northern lights. Shot in 4K with no music —
              just the wind and the sky. Grab a warm drink and breathe.
            </p>
          </div>

          {/* Comments */}
          <div className={`${glass} p-4`}>
            <p className="mb-3 text-sm font-semibold">1,204 comments</p>
            {[
              { u: "mika", a: "/avatar-40-02.jpg", t: "The colours at 4:12 are unreal.", l: "342" },
              { u: "leo", a: "/avatar-40-03.jpg", t: "Watching this on repeat while I work.", l: "128" },
              { u: "sana", a: "/avatar-40-05.jpg", t: "What lens did you shoot this on?", l: "54" },
            ].map((c) => (
              <div key={c.u} className="flex gap-3 py-2.5">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={c.a} alt={c.u} />
                  <AvatarFallback>{c.u[0].toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">@{c.u}</p>
                  <p className="text-sm">{c.t}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <ThumbsUp className="h-3 w-3" /> {c.l}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Up next */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">Up next</h3>
          {upNext.map((v) => (
            <div
              key={v.seed}
              className="group flex cursor-pointer gap-3 rounded-xl p-1.5 transition-colors hover:bg-muted/50"
            >
              <div className="relative aspect-video w-40 shrink-0 overflow-hidden rounded-lg">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${v.seed}/320/180`}
                  alt={v.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1 py-0.5 text-1xs text-white tabular-nums">
                  {v.len}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="line-clamp-2 text-sm font-medium leading-snug">
                  {v.title}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{v.channel}</p>
                <p className="text-xs text-muted-foreground">
                  {v.views} views · {v.when}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended grid */}
      <div className="space-y-4">
        <SectionHeading title="Recommended for you" subtitle="More like this" />
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {recommended.map((v) => (
            <div key={v.seed} className="group cursor-pointer">
              <div className="relative aspect-video overflow-hidden rounded-xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://picsum.photos/seed/${v.seed}/400/225`}
                  alt={v.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 py-0.5 text-1xs text-white tabular-nums">
                  {v.len}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-medium leading-snug">
                {v.title}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {v.channel} · {v.views} views
              </p>
            </div>
          ))}
        </div>
      </div>
    </MediaPage>
  );
}
